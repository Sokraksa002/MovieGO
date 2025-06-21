<?php

return [
    'api_key' => env('TMDB_API_KEY'),
    'base_url' => env('TMDB_BASE_URL', 'https://api.themoviedb.org/3'),
    'image_base_url' => env('TMDB_IMAGE_BASE_URL', 'https://image.tmdb.org/t/p'),
    'vidsrc_base_url' => env('VIDSRC_BASE_URL', 'https://vidsrc.xyz/embed'),
];
