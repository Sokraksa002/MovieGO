<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;
use App\Models\User;
use App\Models\Media;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();
        $media = Media::all();
        
        // Seed realistic ratings for popular movies and shows
        $ratings = [
            // Each user rates a few random media items
            ['user_id' => 1, 'media_id' => 1, 'rating' => 5], // Admin loves Shawshank
            ['user_id' => 1, 'media_id' => 3, 'rating' => 5], // Admin loves Dark Knight
            ['user_id' => 1, 'media_id' => 6, 'rating' => 4], // Admin likes Inception
            ['user_id' => 1, 'media_id' => 11, 'rating' => 5], // Admin loves Breaking Bad
            
            ['user_id' => 2, 'media_id' => 2, 'rating' => 5], // John loves Godfather
            ['user_id' => 2, 'media_id' => 5, 'rating' => 4], // John likes LOTR
            ['user_id' => 2, 'media_id' => 9, 'rating' => 3], // John thinks Matrix is okay
            ['user_id' => 2, 'media_id' => 12, 'rating' => 4], // John likes Game of Thrones
            
            ['user_id' => 3, 'media_id' => 4, 'rating' => 5], // Jane loves Pulp Fiction
            ['user_id' => 3, 'media_id' => 7, 'rating' => 4], // Jane likes Fight Club
            ['user_id' => 3, 'media_id' => 10, 'rating' => 5], // Jane loves Spirited Away
            ['user_id' => 3, 'media_id' => 15, 'rating' => 3], // Jane thinks Friends is okay
            
            ['user_id' => 4, 'media_id' => 1, 'rating' => 4], // Michael likes Shawshank
            ['user_id' => 4, 'media_id' => 8, 'rating' => 5], // Michael loves Forrest Gump
            ['user_id' => 4, 'media_id' => 13, 'rating' => 4], // Michael likes Stranger Things
            ['user_id' => 4, 'media_id' => 14, 'rating' => 5], // Michael loves The Office
            
            ['user_id' => 5, 'media_id' => 3, 'rating' => 5], // Emily loves Dark Knight
            ['user_id' => 5, 'media_id' => 6, 'rating' => 5], // Emily loves Inception
            ['user_id' => 5, 'media_id' => 9, 'rating' => 4], // Emily likes Matrix
            ['user_id' => 5, 'media_id' => 11, 'rating' => 4], // Emily likes Breaking Bad
            
            ['user_id' => 6, 'media_id' => 2, 'rating' => 4], // Robert likes Godfather
            ['user_id' => 6, 'media_id' => 5, 'rating' => 5], // Robert loves LOTR
            ['user_id' => 6, 'media_id' => 12, 'rating' => 5], // Robert loves Game of Thrones
            ['user_id' => 6, 'media_id' => 13, 'rating' => 3], // Robert thinks Stranger Things is okay
            
            ['user_id' => 7, 'media_id' => 4, 'rating' => 4], // Sarah likes Pulp Fiction
            ['user_id' => 7, 'media_id' => 7, 'rating' => 5], // Sarah loves Fight Club
            ['user_id' => 7, 'media_id' => 10, 'rating' => 4], // Sarah likes Spirited Away
            ['user_id' => 7, 'media_id' => 14, 'rating' => 3], // Sarah thinks The Office is okay
            
            ['user_id' => 8, 'media_id' => 1, 'rating' => 5], // David loves Shawshank
            ['user_id' => 8, 'media_id' => 3, 'rating' => 4], // David likes Dark Knight
            ['user_id' => 8, 'media_id' => 8, 'rating' => 4], // David likes Forrest Gump
            ['user_id' => 8, 'media_id' => 15, 'rating' => 5], // David loves Friends
            
            ['user_id' => 9, 'media_id' => 5, 'rating' => 5], // Jessica loves LOTR
            ['user_id' => 9, 'media_id' => 6, 'rating' => 4], // Jessica likes Inception
            ['user_id' => 9, 'media_id' => 10, 'rating' => 5], // Jessica loves Spirited Away
            ['user_id' => 9, 'media_id' => 11, 'rating' => 3], // Jessica thinks Breaking Bad is okay
            
            ['user_id' => 10, 'media_id' => 2, 'rating' => 5], // Christopher loves Godfather
            ['user_id' => 10, 'media_id' => 7, 'rating' => 3], // Christopher thinks Fight Club is okay
            ['user_id' => 10, 'media_id' => 9, 'rating' => 5], // Christopher loves Matrix
            ['user_id' => 10, 'media_id' => 12, 'rating' => 4], // Christopher likes Game of Thrones
            
            ['user_id' => 11, 'media_id' => 4, 'rating' => 3], // Amanda thinks Pulp Fiction is okay
            ['user_id' => 11, 'media_id' => 8, 'rating' => 5], // Amanda loves Forrest Gump
            ['user_id' => 11, 'media_id' => 13, 'rating' => 5], // Amanda loves Stranger Things
            ['user_id' => 11, 'media_id' => 15, 'rating' => 4], // Amanda likes Friends
        ];
        
        foreach ($ratings as $rating) {
            Rating::create($rating);
        }
    }
}
