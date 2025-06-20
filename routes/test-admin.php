<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminMediaController;

// Test route without authentication for demonstration
Route::prefix('test-admin')->group(function () {
    Route::get('/media', [AdminMediaController::class, 'index']);
    Route::post('/media', [AdminMediaController::class, 'store']);
    Route::get('/media/{media}', [AdminMediaController::class, 'show']);
    Route::put('/media/{media}', [AdminMediaController::class, 'update']);
    Route::delete('/media/{media}', [AdminMediaController::class, 'destroy']);
    Route::get('/genres', [AdminMediaController::class, 'getGenres']);
});
