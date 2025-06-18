<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    // Store or update a user's rating
    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
            'rating' => 'required|integer|between:1,5',
        ]);

        $validated['user_id'] = $request->user()->id;

        $rating = Rating::updateOrCreate(
            [
                'user_id' => $validated['user_id'],
                'media_id' => $validated['media_id'] ?? null,
                'episode_id' => $validated['episode_id'] ?? null,
            ],
            ['rating' => $validated['rating']]
        );

        return response()->json($rating, 201);
    }

    // Get average rating for a media or episode
    public function average(Request $request)
    {
        $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
        ]);

        $query = Rating::query();

        if ($request->filled('media_id')) {
            $query->where('media_id', $request->media_id)->whereNull('episode_id');
        } elseif ($request->filled('episode_id')) {
            $query->where('episode_id', $request->episode_id);
        }

        $average = $query->avg('rating');

        return response()->json(['average' => round($average, 2)]);
    }

    // Get the authenticated user's rating for a media or episode
    public function userRating(Request $request)
    {
        $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
        ]);

        $query = Rating::where('user_id', $request->user()->id);

        if ($request->filled('media_id')) {
            $query->where('media_id', $request->media_id)->whereNull('episode_id');
        } elseif ($request->filled('episode_id')) {
            $query->where('episode_id', $request->episode_id);
        }

        $rating = $query->first();

        return response()->json(['rating' => $rating ? $rating->rating : null]);
    }
}