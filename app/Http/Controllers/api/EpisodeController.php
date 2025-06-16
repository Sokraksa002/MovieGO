<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    public function show(Episode $episode)
    {
        return $episode->load('media');
    }
}