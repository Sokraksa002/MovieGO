<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AdminSeeder::class,
            UserSeeder::class,
            GenreSeeder::class,
            MediaSeeder::class,
            EpisodeSeeder::class,
            RatingSeeder::class,
            FavoriteSeeder::class,
            WatchHistorySeeder::class,
        ]);
    }
}