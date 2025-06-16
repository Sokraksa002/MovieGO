<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WatchHistory;
use Illuminate\Http\Request;

class WatchHistoryController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->watchHistory()->with(['media', 'episode'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
        ]);

        $validated['user_id'] = $request->user()->id;

        $history = WatchHistory::create($validated);
        return response()->json($history, 201);
    }
}