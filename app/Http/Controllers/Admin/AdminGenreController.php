<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminGenreController extends Controller
{
    // Get all genres
    public function index()
    {
        return Genre::all();
    }

    // Create new genre
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:genres,name',
            'color' => 'nullable|string|max:32',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $genre = Genre::create($validated);
        return response()->json($genre, 201);
    }

    // Update genre
    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:genres,name,'.$genre->id,
            'color' => 'nullable|string|max:32',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $genre->update($validated);
        return response()->json($genre);
    }

    // Delete genre
    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->json(null, 204);
    }
}