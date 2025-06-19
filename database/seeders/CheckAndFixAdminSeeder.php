<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CheckAndFixAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Look for the admin user
        $admin = User::where('email', 'admin@moviego.com')->first();
        
        if (!$admin) {
            // Admin doesn't exist, create one
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@moviego.com',
                'password' => Hash::make('password123'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]);
            $this->command->info('Admin user created!');
        } else {
            // Admin exists, make sure is_admin is set to true
            if (!$admin->is_admin) {
                $admin->is_admin = true;
                $admin->save();
                $this->command->info('Admin user fixed!');
            } else {
                $this->command->info('Admin user already exists and has admin privileges.');
            }
        }
        
        // Output all admins
        $admins = User::where('is_admin', true)->get();
        $this->command->info('All admin users:');
        foreach ($admins as $admin) {
            $this->command->info("- {$admin->name} ({$admin->email})");
        }
    }
}
