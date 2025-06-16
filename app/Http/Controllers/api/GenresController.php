<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Genres;
use Illuminate\Http\Request;

class GenresController extends Controller
{
    public function index()
    {
        return Genres::all();
    }
}