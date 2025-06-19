<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Media;
use App\Models\Genre;

class MediaSeeder extends Seeder
{
    public function run()
    {
        // Get all genre IDs for later assignment
        $genres = Genre::all()->keyBy('name');
        
        // Array of real movies with accurate details
        $movies = [
            [
                'title' => 'The Shawshank Redemption',
                'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                'year' => 1994,
                'duration' => 142,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=6hB3S9bIaco',
                'rating' => 9.3,
                'genres' => ['Drama']
            ],
            [
                'title' => 'The Godfather',
                'description' => 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                'year' => 1972,
                'duration' => 175,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=sY1S34973zA',
                'rating' => 9.2,
                'genres' => ['Crime', 'Drama']
            ],
            [
                'title' => 'The Dark Knight',
                'description' => 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                'year' => 2008,
                'duration' => 152,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
                'rating' => 9.0,
                'genres' => ['Action', 'Crime', 'Drama', 'Thriller']
            ],
            [
                'title' => 'Pulp Fiction',
                'description' => 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
                'year' => 1994,
                'duration' => 154,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
                'rating' => 8.9,
                'genres' => ['Crime', 'Drama', 'Thriller']
            ],
            [
                'title' => 'The Lord of the Rings: The Return of the King',
                'description' => 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
                'year' => 2003,
                'duration' => 201,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=r5X-hFf6Bwo',
                'rating' => 8.9,
                'genres' => ['Adventure', 'Fantasy', 'Action']
            ],
            [
                'title' => 'Inception',
                'description' => 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                'year' => 2010,
                'duration' => 148,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=YoHD9XEInc0',
                'rating' => 8.8,
                'genres' => ['Action', 'Sci-Fi', 'Adventure', 'Thriller']
            ],
            [
                'title' => 'Fight Club',
                'description' => 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
                'year' => 1999,
                'duration' => 139,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=qtRKdVHc-cE',
                'rating' => 8.8,
                'genres' => ['Drama', 'Thriller']
            ],
            [
                'title' => 'Forrest Gump',
                'description' => 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
                'year' => 1994,
                'duration' => 142,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/qdIMHd4sEfJSckfVJfKQvisL8hz.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=bLvqoHBptjg',
                'rating' => 8.8,
                'genres' => ['Drama', 'Romance']
            ],
            [
                'title' => 'The Matrix',
                'description' => 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                'year' => 1999,
                'duration' => 136,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
                'rating' => 8.7,
                'genres' => ['Action', 'Sci-Fi']
            ],
            [
                'title' => 'Spirited Away',
                'description' => 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
                'year' => 2001,
                'duration' => 125,
                'type' => 'movie',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=ByXuk9QqQkk',
                'rating' => 8.6,
                'genres' => ['Animation', 'Family', 'Fantasy']
            ],
            // TV Shows
            [
                'title' => 'Breaking Bad',
                'description' => 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
                'year' => 2008,
                'duration' => 45,
                'type' => 'tv_show',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=HhesaQXLuRY',
                'rating' => 9.5,
                'genres' => ['Crime', 'Drama', 'Thriller']
            ],
            [
                'title' => 'Game of Thrones',
                'description' => 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
                'year' => 2011,
                'duration' => 60,
                'type' => 'tv_show',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=KPLWWIOCOOQ',
                'rating' => 9.3,
                'genres' => ['Drama', 'Fantasy', 'Adventure']
            ],
            [
                'title' => 'Stranger Things',
                'description' => 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
                'year' => 2016,
                'duration' => 50,
                'type' => 'tv_show',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
                'rating' => 8.7,
                'genres' => ['Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi']
            ],
            [
                'title' => 'The Office',
                'description' => 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
                'year' => 2005,
                'duration' => 22,
                'type' => 'tv_show',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=gO8N3L_aERg',
                'rating' => 8.9,
                'genres' => ['Comedy']
            ],
            [
                'title' => 'Friends',
                'description' => 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
                'year' => 1994,
                'duration' => 22,
                'type' => 'tv_show',
                'poster_url' => 'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
                'backdrop_url' => 'https://image.tmdb.org/t/p/original/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=hDNNmeeJs1Q',
                'rating' => 8.5,
                'genres' => ['Comedy', 'Romance']
            ]
        ];

        // Create movies and associate genres
        foreach ($movies as $movie) {
            $movieGenres = $movie['genres'];
            unset($movie['genres']);
            
            $mediaItem = Media::create($movie);
            
            // Attach genres to the media item
            foreach ($movieGenres as $genreName) {
                if (isset($genres[$genreName])) {
                    $mediaItem->genres()->attach($genres[$genreName]->id);
                }
            }
        }
    }
}
