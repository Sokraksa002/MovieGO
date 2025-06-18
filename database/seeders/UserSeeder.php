<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->admin()->create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
    ]);

    // Then create 10 users (factory will generate unique emails)
    User::factory()->count(10)->create();
    }
}