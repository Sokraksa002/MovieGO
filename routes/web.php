<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('user/Home');
})->name('home');

Route::get('/movies', function () {
    return Inertia::render('user/Movie');
})->name('movies');

Route::get('/movies/popular', function () {
    return Inertia::render('user/Popular');
})->name('movies.popular');

Route::get('/movies/latest', function () {
    return Inertia::render('user/Latest');
})->name('movies.latest');

Route::get('/tv-shows', function () {
    return Inertia::render('user/TVShow');
})->name('tvshows');

Route::get('/genres', function () {
    return Inertia::render('user/Genre');
})->name('genres');

Route::get('/search', function () {
    return Inertia::render('user/Search');
})->name('search');

Route::get('/movies/{id}', function ($id) {
    return Inertia::render('user/MovieDetail', ['id' => $id]);
})->name('movies.detail');

Route::get('/tv-shows/{id}', function ($id) {
    return Inertia::render('user/TVShowDetail', ['id' => $id]);
})->name('tvshows.detail');

Route::get('/favorites', function () {
    return Inertia::render('user/Favorite');
})->middleware(['auth'])->name('favorites');

Route::get('/history', function () {
    return Inertia::render('user/HistoryWatch');
})->middleware(['auth'])->name('history');