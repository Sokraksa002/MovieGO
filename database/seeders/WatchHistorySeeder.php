<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WatchHistory;

class WatchHistorySeeder extends Seeder
{
    public function run()
    {
        WatchHistory::factory()->count(40)->create();
    }
}