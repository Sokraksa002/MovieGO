<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WatchHistory>
 */
class WatchHistoryFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => rand(1, 10),
            'media_id' => rand(1, 20),
        ];
    }
}