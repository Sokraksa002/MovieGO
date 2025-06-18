<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class AdminEpisodeController extends Controller
{
    // Get all episodes
    public function index()
    {
        return Episode::with('media')->get();
    }

    // Create new episode
    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'required|exists:media,id',
            'season' => 'required|integer|min:1',
            'episode' => 'required|integer|min:1',
            'title' => 'required|string|max:255',
            'duration' => 'required|integer|min:1',
            'video_url' => 'required|url',
        ]);

        $episode = Episode::create($validated);
        return response()->json($episode, 201);
    }

    // Get single episode
    public function show(Episode $episode)
    {
        return $episode->load('media');
    }

    // Update episode
    public function update(Request $request, Episode $episode)
    {
        $validated = $request->validate([
            'media_id' => 'sometimes|required|exists:media,id',
            'season' => 'sometimes|required|integer|min:1',
            'episode' => 'sometimes|required|integer|min:1',
            'title' => 'sometimes|required|string|max:255',
            'duration' => 'sometimes|required|integer|min:1',
            'video_url' => 'sometimes|required|url',
        ]);

        $episode->update($validated);
        return response()->json($episode);
    }

    // Delete episode
    public function destroy(Episode $episode)
    {
        $episode->delete();
        return response()->json(null, 204);
    }
}