<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    // Show a single episode with its media
    public function show(Episode $episode)
    {
        return $episode->load('media');
    }

    // List all episodes for a given media (TV show)
    public function byMedia($mediaId)
    {
        return Episode::where('media_id', $mediaId)
            ->orderBy('season')
            ->orderBy('episode')
            ->get();
    }
}