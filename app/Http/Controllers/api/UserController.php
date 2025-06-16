<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
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