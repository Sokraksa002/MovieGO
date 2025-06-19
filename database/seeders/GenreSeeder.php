<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;
use Illuminate\Support\Str;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            ['name' => 'Action', 'color' => 'red-500'],
            ['name' => 'Adventure', 'color' => 'green-500'],
            ['name' => 'Comedy', 'color' => 'yellow-500'],
            ['name' => 'Drama', 'color' => 'blue-500'],
            ['name' => 'Horror', 'color' => 'purple-500'],
            ['name' => 'Sci-Fi', 'color' => 'indigo-500'],
            ['name' => 'Fantasy', 'color' => 'pink-500'],
            ['name' => 'Romance', 'color' => 'rose-500'],
            ['name' => 'Thriller', 'color' => 'orange-500'],
            ['name' => 'Animation', 'color' => 'lime-500'],
            ['name' => 'Crime', 'color' => 'gray-700'],
            ['name' => 'Documentary', 'color' => 'teal-500'],
            ['name' => 'Family', 'color' => 'cyan-500'],
            ['name' => 'Mystery', 'color' => 'amber-500'],
        ];

        foreach ($genres as $genre) {
            Genre::create([
                'name' => $genre['name'],
                'slug' => Str::slug($genre['name']),
                'color' => $genre['color'],
            ]);
        }
    }
}