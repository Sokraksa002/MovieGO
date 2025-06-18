<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
use App\Http\Controllers\Admin;

// --- Google OAuth routes (example) ---
// Route::get('/auth/google/redirect', [Api\AuthController::class, 'redirectToGoogle']);
// Route::get('/auth/google/callback', [Api\AuthController::class, 'handleGoogleCallback']);

// Protected Routes (require Sanctum token, issued after Google OAuth)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/account', [Api\UserController::class, 'account']);

    // Media and genres
    Route::apiResource('media', Api\MediaController::class)->only(['index', 'show']);
    Route::get('/media/{media}/episodes', [Api\EpisodeController::class, 'byMedia']);
    Route::apiResource('episodes', Api\EpisodeController::class)->only(['show']);
    Route::get('/genres', [Api\GenreController::class, 'index']);

    // Ratings
    Route::post('/ratings', [Api\RatingController::class, 'store']);
    Route::get('/ratings/average', [Api\RatingController::class, 'average']);
    Route::get('/ratings/user', [Api\RatingController::class, 'userRating']);

    // Favorites
    Route::get('/favorites', [Api\FavoriteController::class, 'index']);
    Route::post('/favorites', [Api\FavoriteController::class, 'store']);
    Route::delete('/favorites/{id}', [Api\FavoriteController::class, 'destroy']);

    // Watch history
    Route::get('/watch-history', [Api\WatchHistoryController::class, 'index']);
    Route::post('/watch-history', [Api\WatchHistoryController::class, 'store']);

    // Logout
    Route::post('/logout', [Api\AuthController::class, 'logout']);
});

// Admin routes (protected by Sanctum + admin middleware)
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('media', Admin\AdminMediaController::class);
    Route::apiResource('episodes', Admin\AdminEpisodeController::class);
    Route::apiResource('genres', Admin\AdminGenreController::class)->except(['show']);
    
    // User management
    Route::get('/users', [Admin\AdminUserController::class, 'index']);
    Route::post('/users/{user}/promote', [Admin\AdminUserController::class, 'promote']);
    Route::post('/users/{user}/demote', [Admin\AdminUserController::class, 'demote']);
    Route::delete('/users/{user}', [Admin\AdminUserController::class, 'destroy']);
});