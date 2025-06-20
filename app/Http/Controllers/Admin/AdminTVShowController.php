<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminTVShowController extends Controller
{
    // Get all TV shows with pagination
    public function index(Request $request)
    {
        try {
            $query = Media::with('genres')->where('type', 'tv_show');

            // Search functionality
            if ($request->has('search') && $request->search) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }

            $tvshows = $query->orderBy('created_at', 'desc')->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $tvshows
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch TV shows: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create new TV show
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'year' => 'nullable|string|max:4',
                'first_air_date' => 'nullable|date',
                'last_air_date' => 'nullable|date',
                'status' => 'nullable|in:returning,ended,canceled,in_production',
                'poster_url' => 'nullable|string',
                'backdrop_url' => 'nullable|string', 
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|min:0|max:10',
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

            // Set type to TV show
            $validated['type'] = 'tv_show';

            $tvshow = Media::create($validated);

            // Attach genres if provided
            if (!empty($validated['genres'])) {
                $tvshow->genres()->sync($validated['genres']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'TV show created successfully',
                'data' => $tvshow->load('genres')
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
                'message' => 'Failed to create TV show: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get single TV show with details
    public function show(Media $tvshow)
    {
        try {
            // Ensure it's a TV show
            if ($tvshow->type !== 'tv_show') {
                return response()->json([
                    'success' => false,
                    'message' => 'Media is not a TV show'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $tvshow->load(['genres', 'episodes'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch TV show: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update TV show
    public function update(Request $request, Media $tvshow)
    {
        try {
            // Ensure it's a TV show
            if ($tvshow->type !== 'tv_show') {
                return response()->json([
                    'success' => false,
                    'message' => 'Media is not a TV show'
                ], 404);
            }

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'year' => 'nullable|string|max:4',
                'first_air_date' => 'nullable|date',
                'last_air_date' => 'nullable|date',
                'status' => 'nullable|in:returning,ended,canceled,in_production',
                'poster_url' => 'nullable|string',
                'backdrop_url' => 'nullable|string',
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|min:0|max:10',
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
                // Delete old poster if exists and is local
                if ($tvshow->poster_url && Str::startsWith($tvshow->poster_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $tvshow->poster_url);
                    Storage::disk('public')->delete($oldPath);
                }
                
                $posterPath = $request->file('poster_image')->store('media/posters', 'public');
                $validated['poster_url'] = Storage::url($posterPath);
            }

            // Handle backdrop image upload
            if ($request->hasFile('backdrop_image')) {
                // Delete old backdrop if exists and is local
                if ($tvshow->backdrop_url && Str::startsWith($tvshow->backdrop_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $tvshow->backdrop_url);
                    Storage::disk('public')->delete($oldPath);
                }
                
                $backdropPath = $request->file('backdrop_image')->store('media/backdrops', 'public');
                $validated['backdrop_url'] = Storage::url($backdropPath);
            }

            // Remove file inputs from validated data
            unset($validated['poster_image'], $validated['backdrop_image']);

            $tvshow->update($validated);

            // Update genres if provided
            if (array_key_exists('genres', $validated)) {
                $tvshow->genres()->sync($validated['genres'] ?? []);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'TV show updated successfully',
                'data' => $tvshow->fresh(['genres'])
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
                'message' => 'Failed to update TV show: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete TV show
    public function destroy(Media $tvshow)
    {
        try {
            // Ensure it's a TV show
            if ($tvshow->type !== 'tv_show') {
                return response()->json([
                    'success' => false,
                    'message' => 'Media is not a TV show'
                ], 404);
            }

            DB::beginTransaction();

            // Delete associated images if they are local uploads
            if ($tvshow->poster_url && Str::startsWith($tvshow->poster_url, '/storage/')) {
                $posterPath = str_replace('/storage/', '', $tvshow->poster_url);
                Storage::disk('public')->delete($posterPath);
            }

            if ($tvshow->backdrop_url && Str::startsWith($tvshow->backdrop_url, '/storage/')) {
                $backdropPath = str_replace('/storage/', '', $tvshow->backdrop_url);
                Storage::disk('public')->delete($backdropPath);
            }

            // Delete TV show record (this will also delete related records due to foreign key constraints)
            $tvshow->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'TV show deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete TV show: ' . $e->getMessage()
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
