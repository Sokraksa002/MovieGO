<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index(Request $request)
{
    $query = Media::with('genres');

    // Filter by title (case-insensitive, partial match)
    if ($request->filled('title')) {
        $query->where('title', 'like', '%' . $request->input('title') . '%');
    }

    // Filter by genre (expects genre_id or array of genre_ids)
    if ($request->filled('genre')) {
        $genreIds = is_array($request->genre) ? $request->genre : [$request->genre];
        $query->whereHas('genres', function ($q) use ($genreIds) {
            $q->whereIn('genres.id', $genreIds);
        });
    }

    // Optional: Add pagination
    return $query->paginate(12);
}
}