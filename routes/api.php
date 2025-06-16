<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;

// Public Auth Routes
Route::post('/register', [Api\AuthController::class, 'register']);
Route::post('/login', [Api\AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/account', [Api\UserController::class, 'account']);

    Route::apiResource('media', Api\MediaController::class)->only(['index', 'show']);
    Route::apiResource('episodes', Api\EpisodeController::class)->only(['show']);
    Route::get('/genres', [Api\GenresController::class, 'index']);

    Route::post('/ratings', [Api\RatingController::class, 'store']);
    Route::get('/favorites', [Api\FavoriteController::class, 'index']);
    Route::post('/favorites', [Api\FavoriteController::class, 'store']);
    Route::delete('/favorites/{id}', [Api\FavoriteController::class, 'destroy']);
    Route::get('/watch-history', [Api\WatchHistoryController::class, 'index']);
    Route::post('/watch-history', [Api\WatchHistoryController::class, 'store']);

    Route::post('/logout', [Api\AuthController::class, 'logout']);
});