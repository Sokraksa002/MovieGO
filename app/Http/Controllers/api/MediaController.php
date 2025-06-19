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

    // Filter by title
    if ($request->filled('title')) {
        $query->where('title', 'like', '%' . $request->input('title') . '%');
    }

    // Filter by genre name
    if ($request->filled('genre')) {
        $genreName = $request->input('genre');
        $query->whereHas('genres', function ($q) use ($genreName) {
            $q->where('name', 'like', '%' . $genreName . '%');
        });
    }

    // Return 12 items per page
    return $query->paginate(12);
}
}