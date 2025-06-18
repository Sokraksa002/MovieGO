<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Return the authenticated user's account info with favorites and watch history
    public function account(Request $request)
    {
        return $request->user()->load([
            'favorites.media',
            'favorites.episode',
            'watchHistory.media',
            'watchHistory.episode',
        ]);
    }
}