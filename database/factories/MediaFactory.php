<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'year' => $this->faker->year,
            'duration' => $this->faker->numberBetween(60, 180),
            'type' => $this->faker->randomElement(['movie', 'tv_show']),
            'poster_url' => $this->faker->imageUrl(300, 450, 'movies'),
            'backdrop_url' => $this->faker->imageUrl(1280, 720, 'movies'),
            'trailer_url' => $this->faker->url,
            'rating' => $this->faker->randomFloat(1, 0, 10),
        ];
    }
}