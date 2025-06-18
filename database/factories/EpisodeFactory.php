<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EpisodeFactory extends Factory
{
    public function definition()
    {
        return [
            'media_id' => \App\Models\Media::factory(), // or use existing media IDs
            'season' => $this->faker->numberBetween(1, 5),
            'episode' => $this->faker->numberBetween(1, 20),
            'title' => $this->faker->sentence(4),
            'duration' => $this->faker->numberBetween(20, 60),
            'video_url' => $this->faker->url,
        ];
    }
}