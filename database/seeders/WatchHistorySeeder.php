<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WatchHistory;
use App\Models\User;
use App\Models\Media;
use App\Models\Episode;
use Carbon\Carbon;

class WatchHistorySeeder extends Seeder
{
    public function run()
    {
        // Get all media items
        $movies = Media::where('type', 'movie')->get();
        $tvShows = Media::where('type', 'tv_show')->get();
        
        // Get Breaking Bad episodes
        $breakingBad = Media::where('title', 'Breaking Bad')->first();
        $breakingBadEp1 = null;
        $breakingBadEp2 = null;
        if ($breakingBad) {
            $breakingBadEp1 = Episode::where('media_id', $breakingBad->id)
                ->where('season', 1)
                ->where('episode', 1)
                ->first();
            $breakingBadEp2 = Episode::where('media_id', $breakingBad->id)
                ->where('season', 1)
                ->where('episode', 2)
                ->first();
        }
        
        // Get Game of Thrones episodes
        $got = Media::where('title', 'Game of Thrones')->first();
        $gotEp1 = null;
        $gotEp2 = null;
        if ($got) {
            $gotEp1 = Episode::where('media_id', $got->id)
                ->where('season', 1)
                ->where('episode', 1)
                ->first();
            $gotEp2 = Episode::where('media_id', $got->id)
                ->where('season', 1)
                ->where('episode', 2)
                ->first();
        }
        
        // Get Friends episodes
        $friends = Media::where('title', 'Friends')->first();
        $friendsEp1 = null;
        $friendsEp2 = null;
        if ($friends) {
            $friendsEp1 = Episode::where('media_id', $friends->id)
                ->where('season', 1)
                ->where('episode', 1)
                ->first();
            $friendsEp2 = Episode::where('media_id', $friends->id)
                ->where('season', 1)
                ->where('episode', 2)
                ->first();
        }
        
        // Get The Office episodes
        $theOffice = Media::where('title', 'The Office')->first();
        $theOfficeEp1 = null;
        $theOfficeEp2 = null;
        if ($theOffice) {
            $theOfficeEp1 = Episode::where('media_id', $theOffice->id)
                ->where('season', 1)
                ->where('episode', 1)
                ->first();
            $theOfficeEp2 = Episode::where('media_id', $theOffice->id)
                ->where('season', 1)
                ->where('episode', 2)
                ->first();
        }
        
        // Get Stranger Things episodes
        $strangerThings = Media::where('title', 'Stranger Things')->first();
        $strangerThingsEp1 = null;
        if ($strangerThings) {
            $strangerThingsEp1 = Episode::where('media_id', $strangerThings->id)
                ->where('season', 1)
                ->where('episode', 1)
                ->first();
        }
        
        // Create realistic watch history with a mix of completed and in-progress watches
        $watchHistories = [];
        
        // Admin's watch history - mostly completed movies
        if ($movies->where('title', 'The Shawshank Redemption')->first()) {
            $watchHistories[] = [
                'user_id' => 1,
                'media_id' => $movies->where('title', 'The Shawshank Redemption')->first()->id,
                'episode_id' => null,
                'progress' => 8520, // Completed (142 mins)
                'duration' => 8520,
                'watched_at' => Carbon::now()->subDays(5),
            ];
        }
        
        if ($movies->where('title', 'The Dark Knight')->first()) {
            $watchHistories[] = [
                'user_id' => 1,
                'media_id' => $movies->where('title', 'The Dark Knight')->first()->id,
                'episode_id' => null,
                'progress' => 9120, // Completed (152 mins)
                'duration' => 9120,
                'watched_at' => Carbon::now()->subDays(2),
            ];
        }
        
        if ($movies->where('title', 'Inception')->first()) {
            $watchHistories[] = [
                'user_id' => 1,
                'media_id' => $movies->where('title', 'Inception')->first()->id,
                'episode_id' => null,
                'progress' => 7200, // In progress (80% of 148 mins)
                'duration' => 8880,
                'watched_at' => Carbon::now()->subHours(5),
            ];
        }
        
        // Admin watching Breaking Bad
        if ($breakingBad && $breakingBadEp1) {
            $watchHistories[] = [
                'user_id' => 1,
                'media_id' => $breakingBad->id,
                'episode_id' => $breakingBadEp1->id,
                'progress' => 3480, // Completed (58 mins)
                'duration' => 3480,
                'watched_at' => Carbon::now()->subDays(7),
            ];
        }
        
        if ($breakingBad && $breakingBadEp2) {
            $watchHistories[] = [
                'user_id' => 1,
                'media_id' => $breakingBad->id,
                'episode_id' => $breakingBadEp2->id,
                'progress' => 2880, // Completed (48 mins)
                'duration' => 2880,
                'watched_at' => Carbon::now()->subDays(6),
            ];
        }
        
        // John's watch history
        if ($movies->where('title', 'The Godfather')->first()) {
            $watchHistories[] = [
                'user_id' => 2,
                'media_id' => $movies->where('title', 'The Godfather')->first()->id,
                'episode_id' => null,
                'progress' => 10500, // Completed (175 mins)
                'duration' => 10500,
                'watched_at' => Carbon::now()->subDays(10),
            ];
        }
        
        if ($got && $gotEp1) {
            $watchHistories[] = [
                'user_id' => 2,
                'media_id' => $got->id,
                'episode_id' => $gotEp1->id,
                'progress' => 3720, // Completed (62 mins)
                'duration' => 3720,
                'watched_at' => Carbon::now()->subDays(3),
            ];
        }
        
        if ($got && $gotEp2) {
            $watchHistories[] = [
                'user_id' => 2,
                'media_id' => $got->id,
                'episode_id' => $gotEp2->id,
                'progress' => 2500, // In progress (74% of 56 mins)
                'duration' => 3360,
                'watched_at' => Carbon::now()->subHours(12),
            ];
        }
        
        // Jane's watch history
        if ($movies->where('title', 'Pulp Fiction')->first()) {
            $watchHistories[] = [
                'user_id' => 3,
                'media_id' => $movies->where('title', 'Pulp Fiction')->first()->id,
                'episode_id' => null,
                'progress' => 9240, // Completed (154 mins)
                'duration' => 9240,
                'watched_at' => Carbon::now()->subDays(8),
            ];
        }
        
        if ($friends && $friendsEp1) {
            $watchHistories[] = [
                'user_id' => 3,
                'media_id' => $friends->id,
                'episode_id' => $friendsEp1->id,
                'progress' => 1320, // Completed (22 mins)
                'duration' => 1320,
                'watched_at' => Carbon::now()->subDays(1),
            ];
        }
        
        if ($friends && $friendsEp2) {
            $watchHistories[] = [
                'user_id' => 3,
                'media_id' => $friends->id,
                'episode_id' => $friendsEp2->id,
                'progress' => 1320, // Completed (22 mins)
                'duration' => 1320,
                'watched_at' => Carbon::now()->subHours(20),
            ];
        }
        
        // Michael's watch history
        if ($movies->where('title', 'Forrest Gump')->first()) {
            $watchHistories[] = [
                'user_id' => 4,
                'media_id' => $movies->where('title', 'Forrest Gump')->first()->id,
                'episode_id' => null,
                'progress' => 8520, // Completed (142 mins)
                'duration' => 8520,
                'watched_at' => Carbon::now()->subDays(4),
            ];
        }
        
        if ($theOffice && $theOfficeEp1) {
            $watchHistories[] = [
                'user_id' => 4,
                'media_id' => $theOffice->id,
                'episode_id' => $theOfficeEp1->id,
                'progress' => 1380, // Completed (23 mins)
                'duration' => 1380,
                'watched_at' => Carbon::now()->subDays(2),
            ];
        }
        
        if ($theOffice && $theOfficeEp2) {
            $watchHistories[] = [
                'user_id' => 4,
                'media_id' => $theOffice->id,
                'episode_id' => $theOfficeEp2->id,
                'progress' => 1320, // Completed (22 mins)
                'duration' => 1320,
                'watched_at' => Carbon::now()->subDays(1),
            ];
        }
        
        // Emily's watch history
        if ($movies->where('title', 'The Dark Knight')->first()) {
            $watchHistories[] = [
                'user_id' => 5,
                'media_id' => $movies->where('title', 'The Dark Knight')->first()->id,
                'episode_id' => null,
                'progress' => 9120, // Completed (152 mins)
                'duration' => 9120,
                'watched_at' => Carbon::now()->subDays(7),
            ];
        }
        
        if ($movies->where('title', 'Inception')->first()) {
            $watchHistories[] = [
                'user_id' => 5,
                'media_id' => $movies->where('title', 'Inception')->first()->id,
                'episode_id' => null,
                'progress' => 8880, // Completed (148 mins)
                'duration' => 8880,
                'watched_at' => Carbon::now()->subDays(2),
            ];
        }
        
        // A few more watch history entries for other users
        if ($movies->where('title', 'The Lord of the Rings: The Return of the King')->first()) {
            $watchHistories[] = [
                'user_id' => 6,
                'media_id' => $movies->where('title', 'The Lord of the Rings: The Return of the King')->first()->id,
                'episode_id' => null,
                'progress' => 9000, // In progress (75% of 201 mins)
                'duration' => 12060,
                'watched_at' => Carbon::now()->subHours(8),
            ];
        }
        
        if ($movies->where('title', 'Fight Club')->first()) {
            $watchHistories[] = [
                'user_id' => 7,
                'media_id' => $movies->where('title', 'Fight Club')->first()->id,
                'episode_id' => null,
                'progress' => 8340, // Completed (139 mins)
                'duration' => 8340,
                'watched_at' => Carbon::now()->subDays(3),
            ];
        }
        
        if ($strangerThings && $strangerThingsEp1) {
            $watchHistories[] = [
                'user_id' => 8,
                'media_id' => $strangerThings->id,
                'episode_id' => $strangerThingsEp1->id,
                'progress' => 2820, // Completed (47 mins)
                'duration' => 2820,
                'watched_at' => Carbon::now()->subDays(1),
            ];
        }
        
        if ($movies->where('title', 'Spirited Away')->first()) {
            $watchHistories[] = [
                'user_id' => 9,
                'media_id' => $movies->where('title', 'Spirited Away')->first()->id,
                'episode_id' => null,
                'progress' => 7500, // Completed (125 mins)
                'duration' => 7500,
                'watched_at' => Carbon::now()->subDays(6),
            ];
        }
        
        if ($movies->where('title', 'The Matrix')->first()) {
            $watchHistories[] = [
                'user_id' => 10,
                'media_id' => $movies->where('title', 'The Matrix')->first()->id,
                'episode_id' => null,
                'progress' => 8160, // Completed (136 mins)
                'duration' => 8160,
                'watched_at' => Carbon::now()->subDays(9),
            ];
        }
        
        if ($movies->where('title', 'Forrest Gump')->first()) {
            $watchHistories[] = [
                'user_id' => 11,
                'media_id' => $movies->where('title', 'Forrest Gump')->first()->id,
                'episode_id' => null,
                'progress' => 8520, // Completed (142 mins)
                'duration' => 8520,
                'watched_at' => Carbon::now()->subDays(5),
            ];
        }
        
        // Create the watch history records
        foreach ($watchHistories as $history) {
            WatchHistory::create($history);
        }
    }
}