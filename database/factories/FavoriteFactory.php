<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => rand(1, 10),
            'media_id' => rand(1, 20),
        ];
    }
}