<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Episode;
use App\Models\Media;

class EpisodeSeeder extends Seeder
{
    public function run()
    {
        // Get all TV shows
        $tvShows = Media::where('type', 'tv_show')->get();
        
        // Breaking Bad episodes
        $breakingBad = $tvShows->where('title', 'Breaking Bad')->first();
        if ($breakingBad) {
            $episodes = [
                // Season 1
                [
                    'season' => 1,
                    'episode' => 1,
                    'title' => 'Pilot',
                    'duration' => 58,
                    'video_url' => 'https://example.com/breaking-bad/s01e01',
                ],
                [
                    'season' => 1,
                    'episode' => 2,
                    'title' => 'Cat\'s in the Bag...',
                    'duration' => 48,
                    'video_url' => 'https://example.com/breaking-bad/s01e02',
                ],
                [
                    'season' => 1,
                    'episode' => 3,
                    'title' => '...And the Bag\'s in the River',
                    'duration' => 48,
                    'video_url' => 'https://example.com/breaking-bad/s01e03',
                ],
                // Season 2
                [
                    'season' => 2,
                    'episode' => 1,
                    'title' => 'Seven Thirty-Seven',
                    'duration' => 47,
                    'video_url' => 'https://example.com/breaking-bad/s02e01',
                ],
                [
                    'season' => 2,
                    'episode' => 2,
                    'title' => 'Grilled',
                    'duration' => 48,
                    'video_url' => 'https://example.com/breaking-bad/s02e02',
                ],
            ];
            
            foreach ($episodes as $episode) {
                Episode::create([
                    'media_id' => $breakingBad->id,
                    'season' => $episode['season'],
                    'episode' => $episode['episode'],
                    'title' => $episode['title'],
                    'duration' => $episode['duration'],
                    'video_url' => $episode['video_url'],
                ]);
            }
        }
        
        // Game of Thrones episodes
        $got = $tvShows->where('title', 'Game of Thrones')->first();
        if ($got) {
            $episodes = [
                // Season 1
                [
                    'season' => 1,
                    'episode' => 1,
                    'title' => 'Winter Is Coming',
                    'duration' => 62,
                    'video_url' => 'https://example.com/got/s01e01',
                ],
                [
                    'season' => 1,
                    'episode' => 2,
                    'title' => 'The Kingsroad',
                    'duration' => 56,
                    'video_url' => 'https://example.com/got/s01e02',
                ],
                [
                    'season' => 1,
                    'episode' => 3,
                    'title' => 'Lord Snow',
                    'duration' => 58,
                    'video_url' => 'https://example.com/got/s01e03',
                ],
                // Season 2
                [
                    'season' => 2,
                    'episode' => 1,
                    'title' => 'The North Remembers',
                    'duration' => 53,
                    'video_url' => 'https://example.com/got/s02e01',
                ],
                [
                    'season' => 2,
                    'episode' => 2,
                    'title' => 'The Night Lands',
                    'duration' => 54,
                    'video_url' => 'https://example.com/got/s02e02',
                ],
            ];
            
            foreach ($episodes as $episode) {
                Episode::create([
                    'media_id' => $got->id,
                    'season' => $episode['season'],
                    'episode' => $episode['episode'],
                    'title' => $episode['title'],
                    'duration' => $episode['duration'],
                    'video_url' => $episode['video_url'],
                ]);
            }
        }
        
        // Stranger Things episodes
        $strangerThings = $tvShows->where('title', 'Stranger Things')->first();
        if ($strangerThings) {
            $episodes = [
                // Season 1
                [
                    'season' => 1,
                    'episode' => 1,
                    'title' => 'The Vanishing of Will Byers',
                    'duration' => 47,
                    'video_url' => 'https://example.com/stranger-things/s01e01',
                ],
                [
                    'season' => 1,
                    'episode' => 2,
                    'title' => 'The Weirdo on Maple Street',
                    'duration' => 46,
                    'video_url' => 'https://example.com/stranger-things/s01e02',
                ],
                [
                    'season' => 1,
                    'episode' => 3,
                    'title' => 'Holly, Jolly',
                    'duration' => 51,
                    'video_url' => 'https://example.com/stranger-things/s01e03',
                ],
                // Season 2
                [
                    'season' => 2,
                    'episode' => 1,
                    'title' => 'MADMAX',
                    'duration' => 48,
                    'video_url' => 'https://example.com/stranger-things/s02e01',
                ],
                [
                    'season' => 2,
                    'episode' => 2,
                    'title' => 'Trick or Treat, Freak',
                    'duration' => 56,
                    'video_url' => 'https://example.com/stranger-things/s02e02',
                ],
            ];
            
            foreach ($episodes as $episode) {
                Episode::create([
                    'media_id' => $strangerThings->id,
                    'season' => $episode['season'],
                    'episode' => $episode['episode'],
                    'title' => $episode['title'],
                    'duration' => $episode['duration'],
                    'video_url' => $episode['video_url'],
                ]);
            }
        }
        
        // The Office episodes
        $theOffice = $tvShows->where('title', 'The Office')->first();
        if ($theOffice) {
            $episodes = [
                // Season 1
                [
                    'season' => 1,
                    'episode' => 1,
                    'title' => 'Pilot',
                    'duration' => 23,
                    'video_url' => 'https://example.com/the-office/s01e01',
                ],
                [
                    'season' => 1,
                    'episode' => 2,
                    'title' => 'Diversity Day',
                    'duration' => 22,
                    'video_url' => 'https://example.com/the-office/s01e02',
                ],
                [
                    'season' => 1,
                    'episode' => 3,
                    'title' => 'Health Care',
                    'duration' => 22,
                    'video_url' => 'https://example.com/the-office/s01e03',
                ],
                // Season 2
                [
                    'season' => 2,
                    'episode' => 1,
                    'title' => 'The Dundies',
                    'duration' => 21,
                    'video_url' => 'https://example.com/the-office/s02e01',
                ],
                [
                    'season' => 2,
                    'episode' => 2,
                    'title' => 'Sexual Harassment',
                    'duration' => 22,
                    'video_url' => 'https://example.com/the-office/s02e02',
                ],
            ];
            
            foreach ($episodes as $episode) {
                Episode::create([
                    'media_id' => $theOffice->id,
                    'season' => $episode['season'],
                    'episode' => $episode['episode'],
                    'title' => $episode['title'],
                    'duration' => $episode['duration'],
                    'video_url' => $episode['video_url'],
                ]);
            }
        }
        
        // Friends episodes
        $friends = $tvShows->where('title', 'Friends')->first();
        if ($friends) {
            $episodes = [
                // Season 1
                [
                    'season' => 1,
                    'episode' => 1,
                    'title' => 'The One Where Monica Gets a Roommate',
                    'duration' => 22,
                    'video_url' => 'https://example.com/friends/s01e01',
                ],
                [
                    'season' => 1,
                    'episode' => 2,
                    'title' => 'The One with the Sonogram at the End',
                    'duration' => 22,
                    'video_url' => 'https://example.com/friends/s01e02',
                ],
                [
                    'season' => 1,
                    'episode' => 3,
                    'title' => 'The One with the Thumb',
                    'duration' => 22,
                    'video_url' => 'https://example.com/friends/s01e03',
                ],
                // Season 2
                [
                    'season' => 2,
                    'episode' => 1,
                    'title' => 'The One with Ross\'s New Girlfriend',
                    'duration' => 22,
                    'video_url' => 'https://example.com/friends/s02e01',
                ],
                [
                    'season' => 2,
                    'episode' => 2,
                    'title' => 'The One with the Breast Milk',
                    'duration' => 22,
                    'video_url' => 'https://example.com/friends/s02e02',
                ],
            ];
            
            foreach ($episodes as $episode) {
                Episode::create([
                    'media_id' => $friends->id,
                    'season' => $episode['season'],
                    'episode' => $episode['episode'],
                    'title' => $episode['title'],
                    'duration' => $episode['duration'],
                    'video_url' => $episode['video_url'],
                ]);
            }
        }
    }
}