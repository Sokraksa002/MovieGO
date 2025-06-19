<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Media;

class FavoriteSeeder extends Seeder
{
    public function run()
    {
        // Create realistic favorites for users
        $favorites = [
            // Admin's favorites
            ['user_id' => 1, 'media_id' => 1], // The Shawshank Redemption
            ['user_id' => 1, 'media_id' => 3], // The Dark Knight
            ['user_id' => 1, 'media_id' => 11], // Breaking Bad
            
            // John's favorites
            ['user_id' => 2, 'media_id' => 2], // The Godfather
            ['user_id' => 2, 'media_id' => 5], // The Lord of the Rings
            
            // Jane's favorites
            ['user_id' => 3, 'media_id' => 4], // Pulp Fiction
            ['user_id' => 3, 'media_id' => 10], // Spirited Away
            
            // Michael's favorites
            ['user_id' => 4, 'media_id' => 8], // Forrest Gump
            ['user_id' => 4, 'media_id' => 14], // The Office
            
            // Emily's favorites
            ['user_id' => 5, 'media_id' => 3], // The Dark Knight
            ['user_id' => 5, 'media_id' => 6], // Inception
            
            // Robert's favorites
            ['user_id' => 6, 'media_id' => 5], // The Lord of the Rings
            ['user_id' => 6, 'media_id' => 12], // Game of Thrones
            
            // Sarah's favorites
            ['user_id' => 7, 'media_id' => 7], // Fight Club
            ['user_id' => 7, 'media_id' => 10], // Spirited Away
            
            // David's favorites
            ['user_id' => 8, 'media_id' => 1], // The Shawshank Redemption
            ['user_id' => 8, 'media_id' => 15], // Friends
            
            // Jessica's favorites
            ['user_id' => 9, 'media_id' => 5], // The Lord of the Rings
            ['user_id' => 9, 'media_id' => 10], // Spirited Away
            
            // Christopher's favorites
            ['user_id' => 10, 'media_id' => 2], // The Godfather
            ['user_id' => 10, 'media_id' => 9], // The Matrix
            
            // Amanda's favorites
            ['user_id' => 11, 'media_id' => 8], // Forrest Gump
            ['user_id' => 11, 'media_id' => 13], // Stranger Things
        ];
        
        foreach ($favorites as $favorite) {
            Favorite::create($favorite);
        }
    }
}
