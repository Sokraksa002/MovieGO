<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'external_link' => 'https://example.com/watch', 
            'type' => fake()->randomElement(['movie', 'tv_show']),
        ];
    }
}
