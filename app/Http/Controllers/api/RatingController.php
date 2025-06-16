<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
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
}