<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WatchHistoryFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'media_id' => \App\Models\Media::factory(),
            'episode_id' => null, // or use an Episode factory if you want
            'progress' => $this->faker->numberBetween(0, 3600),
            'duration' => $this->faker->numberBetween(600, 7200), // <-- Add this line
            'watched_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}