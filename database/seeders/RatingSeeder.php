<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run()
    {
        Rating::factory()->count(30)->create();
    }
}
