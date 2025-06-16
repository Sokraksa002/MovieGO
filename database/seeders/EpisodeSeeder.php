<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Episode;

class EpisodeSeeder extends Seeder
{
    public function run()
    {
        Episode::factory()->count(50)->create();
    }
}