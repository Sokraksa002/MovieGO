<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class AdminMediaController extends Controller
{
    // Get all media (movies + TV shows)
    public function index()
    {
        return Media::with('genres')->get();
    }

    // Create new media
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'type' => 'required|in:movie,tv_show',
            'poster_url' => 'nullable|url',
            'backdrop_url' => 'nullable|url',
            'trailer_url' => 'nullable|url',
            'rating' => 'nullable|numeric|min:0|max:10',
        ]);

        $media = Media::create($validated);

        // Optionally attach genres if sent as array of IDs
        if ($request->has('genres')) {
            $media->genres()->sync($request->input('genres'));
        }

        return response()->json($media->load('genres'), 201);
    }

    // Get single media with details
    public function show(Media $media)
    {
        return $media->load(['genres', 'episodes']);
    }

    // Update media
    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'type' => 'sometimes|in:movie,tv_show',
            'poster_url' => 'nullable|url',
            'backdrop_url' => 'nullable|url',
            'trailer_url' => 'nullable|url',
            'rating' => 'nullable|numeric|min:0|max:10',
        ]);

        $media->update($validated);

        // Optionally update genres
        if ($request->has('genres')) {
            $media->genres()->sync($request->input('genres'));
        }

        return response()->json($media->load('genres'));
    }

    // Delete media
    public function destroy(Media $media)
    {
        $media->delete();
        return response()->json(null, 204);
    }
}