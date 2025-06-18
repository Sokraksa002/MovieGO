<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GenreFactory extends Factory
{
    public function definition()
    {
        $name = $this->faker->unique()->word();

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'color' => $this->faker->safeColorName(), // or use a Tailwind color string
        ];
    }
}