<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Episode>
 */
class EpisodeFactory extends Factory
{
    public function definition()
    {
        return [
            'media_id' => rand(1, 20),
            'title' => fake()->sentence(),
            'external_link' => 'https://example.com/watch', 
            'episode_number' => fake()->numberBetween(1, 10),
        ];
    }
}