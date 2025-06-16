<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index()
    {
        return Media::with('genres')->get();
    }

    public function show(Media $media)
    {
        return $media->load(['genres', 'episodes']);
    }
}