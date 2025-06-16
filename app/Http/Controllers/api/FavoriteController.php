<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->favorites()->with(['media', 'episode'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'nullable|required_without:episode_id|exists:media,id',
            'episode_id' => 'nullable|required_without:media_id|exists:episodes,id',
        ]);

        $validated['user_id'] = $request->user()->id;

        $favorite = Favorite::create($validated);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $favorite->delete();

        return response()->noContent();
    }
}