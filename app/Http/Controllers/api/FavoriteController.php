<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    // List all favorites for the authenticated user
    public function index(Request $request)
    {
        return $request->user()->favorites()->with(['media', 'episode'])->get();
    }

    // Add a new favorite (media or episode) for the authenticated user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
        ]);

        $validated['user_id'] = $request->user()->id;

        // Prevent duplicate favorites
        $exists = Favorite::where('user_id', $validated['user_id'])
            ->where('media_id', $validated['media_id'] ?? null)
            ->where('episode_id', $validated['episode_id'] ?? null)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already favorited'], 409);
        }

        $favorite = Favorite::create($validated);

        return response()->json($favorite, 201);
    }

    // Remove a favorite by ID for the authenticated user
    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $favorite->delete();

        return response()->noContent();
    }
}