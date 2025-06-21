<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminMediaController extends Controller
{
    // Get all media (movies + TV shows) with pagination
    public function index(Request $request)
    {
        try {
            $query = Media::with('genres');

            // Filter by type if specified
            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            // Search functionality
            if ($request->has('search') && $request->search) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }

            $media = $query->orderBy('created_at', 'desc')->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $media
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch media: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create new media
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'year' => 'nullable|string|max:4',
                'duration' => 'nullable|integer|min:1',
                'type' => 'required|in:movie,tv_show',
                'poster_url' => 'nullable|string',
                'backdrop_url' => 'nullable|string', 
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|min:0|max:10',
                'first_air_date' => 'nullable|date',
                'last_air_date' => 'nullable|date',
                'status' => 'nullable|in:returning,ended,canceled,in_production',
                'seasons_count' => 'nullable|integer|min:1',
                'episodes_count' => 'nullable|integer|min:1',
                'genres' => 'nullable|array',
                'genres.*' => 'exists:genres,id',
                'poster_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'backdrop_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            DB::beginTransaction();

            // Handle poster image upload
            if ($request->hasFile('poster_image')) {
                $posterPath = $request->file('poster_image')->store('media/posters', 'public');
                $validated['poster_url'] = Storage::url($posterPath);
            }

            // Handle backdrop image upload  
            if ($request->hasFile('backdrop_image')) {
                $backdropPath = $request->file('backdrop_image')->store('media/backdrops', 'public');
                $validated['backdrop_url'] = Storage::url($backdropPath);
            }

            // Remove file inputs from validated data
            unset($validated['poster_image'], $validated['backdrop_image']);

            $media = Media::create($validated);

            // Attach genres if provided
            if (!empty($validated['genres'])) {
                $media->genres()->sync($validated['genres']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Media created successfully',
                'data' => $media->load('genres')
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create media: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get single media with details
    public function show(Media $media)
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $media->load(['genres', 'episodes'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch media: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update media
    public function update(Request $request, Media $media)
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'year' => 'nullable|string|max:4',
                'duration' => 'nullable|integer|min:1',
                'type' => 'sometimes|required|in:movie,tv_show',
                'poster_url' => 'nullable|string',
                'backdrop_url' => 'nullable|string',
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|min:0|max:10',
                'first_air_date' => 'nullable|date',
                'last_air_date' => 'nullable|date',
                'status' => 'nullable|in:returning,ended,canceled,in_production',
                'seasons_count' => 'nullable|integer|min:1',
                'episodes_count' => 'nullable|integer|min:1',
                'genres' => 'nullable|array',
                'genres.*' => 'exists:genres,id',
                'poster_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'backdrop_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                // TMDB fields
                'tmdb_id' => 'nullable|integer',
                'imdb_id' => 'nullable|string',
                'tmdb_poster_path' => 'nullable|string',
                'tmdb_backdrop_path' => 'nullable|string',
                'tmdb_vote_average' => 'nullable|numeric|min:0|max:10',
                'tmdb_vote_count' => 'nullable|integer|min:0',
                'tmdb_popularity' => 'nullable|numeric|min:0',
                'tmdb_original_language' => 'nullable|string|max:10',
                'tmdb_adult' => 'nullable|boolean'
            ]);

            DB::beginTransaction();

            // Handle poster image upload
            if ($request->hasFile('poster_image')) {
                // Delete old poster if exists and is local
                if ($media->poster_url && Str::startsWith($media->poster_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $media->poster_url);
                    Storage::disk('public')->delete($oldPath);
                }
                
                $posterPath = $request->file('poster_image')->store('media/posters', 'public');
                $validated['poster_url'] = Storage::url($posterPath);
            }

            // Handle backdrop image upload
            if ($request->hasFile('backdrop_image')) {
                // Delete old backdrop if exists and is local
                if ($media->backdrop_url && Str::startsWith($media->backdrop_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $media->backdrop_url);
                    Storage::disk('public')->delete($oldPath);
                }
                
                $backdropPath = $request->file('backdrop_image')->store('media/backdrops', 'public');
                $validated['backdrop_url'] = Storage::url($backdropPath);
            }

            // Remove file inputs from validated data
            unset($validated['poster_image'], $validated['backdrop_image']);

            $media->update($validated);

            // Update genres if provided
            if (array_key_exists('genres', $validated)) {
                $media->genres()->sync($validated['genres'] ?? []);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Media updated successfully',
                'data' => $media->fresh(['genres'])
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update media: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete media
    public function destroy(Media $media)
    {
        try {
            DB::beginTransaction();

            // Delete associated images if they are local uploads
            if ($media->poster_url && Str::startsWith($media->poster_url, '/storage/')) {
                $posterPath = str_replace('/storage/', '', $media->poster_url);
                Storage::disk('public')->delete($posterPath);
            }

            if ($media->backdrop_url && Str::startsWith($media->backdrop_url, '/storage/')) {
                $backdropPath = str_replace('/storage/', '', $media->backdrop_url);
                Storage::disk('public')->delete($backdropPath);
            }

            // Delete media record (this will also delete related records due to foreign key constraints)
            $media->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Media deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete media: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get all genres for dropdown/selection
    public function getGenres()
    {
        try {
            $genres = Genre::select('id', 'name')->orderBy('name')->get();
            
            return response()->json([
                'success' => true,
                'data' => $genres
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch genres: ' . $e->getMessage()
            ], 500);
        }
    }
}