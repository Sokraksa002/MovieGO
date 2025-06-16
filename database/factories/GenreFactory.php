<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Genre>
 */
class GenreFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => fake()->randomElement([
                'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'
            ]),
        ];
    }
}