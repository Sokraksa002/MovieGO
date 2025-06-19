<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    // Get featured movies (latest high-rated movies for banner)
    $featuredMovies = Media::where('type', 'movie')
        ->with('genres')
        ->where('rating', '>=', 7.5)
        ->orderBy('release_date', 'desc')
        ->take(3)
        ->get();

    // Get popular movies
    $popularMovies = Media::where('type', 'movie')
        ->with('genres')
        ->orderBy('rating', 'desc')
        ->take(10)
        ->get();

    // Get latest movies
    $latestMovies = Media::where('type', 'movie')
        ->with('genres')
        ->orderBy('release_date', 'desc')
        ->take(10)
        ->get();

    // Get popular TV shows
    $popularTVShows = Media::where('type', 'tv')
        ->with('genres')
        ->orderBy('rating', 'desc')
        ->take(10)
        ->get();

    // Get trending (movies with highest recent ratings)
    $trendingToday = Media::where('type', 'movie')
        ->with('genres')
        ->where('created_at', '>=', now()->subDays(30))
        ->orderBy('rating', 'desc')
        ->take(8)
        ->get();

    return Inertia::render('user/Home', [
        'featuredMovies' => $featuredMovies,
        'popularMovies' => $popularMovies,
        'latestMovies' => $latestMovies,
        'popularTVShows' => $popularTVShows,
        'trendingToday' => $trendingToday,
    ]);
})->name('home');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
        
    Route::get('/profile', function () {
        return Inertia::render('User/Profile');
    })->name('profile');
});

// Movie Routes
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

Route::get('/search', function (Request $request) {
    return Inertia::render('user/Search', [
        'query' => $request->input('q', '')
    ]);
})->name('search');

// API endpoint for search functionality
Route::get('/search/api', function (Request $request) {
    $query = $request->input('q', '');
    
    if (empty($query)) {
        return response()->json(['media' => []]);
    }
    
    $media = Media::with('genres')
        ->where('title', 'like', '%' . $query . '%')
        ->orWhereHas('genres', function ($q) use ($query) {
            $q->where('name', 'like', '%' . $query . '%');
        })
        ->get();
    
    return response()->json(['media' => $media]);
});

// API endpoint for popular media
Route::get('/popular/api', function () {
    $media = Media::with('genres')
        ->orderBy('rating', 'desc')
        ->take(10)
        ->get();
    
    return response()->json(['media' => $media]);
});

Route::get('/movies/{id}', function ($id) {
    return Inertia::render('user/MovieDetail', ['id' => $id]);
})->name('movies.detail');

Route::get('/stream/{id}', function ($id) {
    $movie = Media::with('genres')->findOrFail($id);
    
    // Add streaming URL - in a real app this would be from a CDN or streaming service
    $movie->streaming_url = "/storage/videos/movie_{$id}.mp4"; // Example path
    
    return Inertia::render('user/Streaming', [
        'movie' => $movie
    ]);
})->name('streaming');

Route::get('/tv-shows/{id}', function ($id) {
    $tvShow = Media::with('genres')->where('type', 'tv')->findOrFail($id);
    
    return Inertia::render('user/TVShowDetail', [
        'id' => $id,
        'tvShow' => $tvShow
    ]);
})->name('tvshows.detail');

Route::get('/tv-shows/{id}/stream', function ($id) {
    $tvShow = Media::with('genres')->where('type', 'tv')->findOrFail($id);
    
    // Add streaming URL - in a real app this would be from a CDN or streaming service
    $tvShow->streaming_url = "/storage/videos/tv_{$id}.mp4"; // Example path
    
    return Inertia::render('user/Streaming', [
        'movie' => $tvShow, // Using 'movie' key for compatibility with existing Streaming component
        'isTV' => true
    ]);
})->name('tvshows.streaming');

// Protected Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/favorites', function () {
        return Inertia::render('user/Favorite');
    })->name('favorites');
    
    Route::get('/history', function () {
        return Inertia::render('user/HistoryWatch');
    })->name('history');
    
    Route::get('/profile', function () {
        return Inertia::render('user/Profile');
    })->name('profile');
});

// Admin Routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/Dashboard');
    })->name('dashboard');
    
    Route::get('/movies', function () {
        $movies = Media::where('type', 'movie')
            ->with('genres')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('admin/Movies', [
            'movies' => $movies
        ]);
    })->name('movies');
    
    Route::get('/tvshows', function () {
        $tvShows = Media::where('type', 'tv')
            ->with('genres')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return Inertia::render('admin/TVShows', [
            'tvshows' => $tvShows  // Make sure the key matches what the component expects
        ]);
    })->name('tvshows');
    
    Route::get('/users', function () {
        $users = App\Models\User::orderBy('created_at', 'desc')->paginate(10);
        
        return Inertia::render('admin/Users', [
            'users' => $users
        ]);
    })->name('users');
    
    Route::get('/genres', function () {
        $genres = App\Models\Genre::orderBy('name')->paginate(10);
        
        return Inertia::render('admin/Genres', [
            'genres' => $genres
        ]);
    })->name('genres');
    
    // Genre CRUD routes
    Route::post('/genres', function (Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
            'slug' => 'required|string|max:255|unique:genres',
        ]);
        
        App\Models\Genre::create($validated);
        
        return redirect()->route('admin.genres')->with('success', 'Genre created successfully!');
    })->name('genres.store');
    
    Route::put('/genres/{genre}', function (Request $request, App\Models\Genre $genre) {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'slug' => 'required|string|max:255|unique:genres,slug,' . $genre->id,
        ]);
        
        $genre->update($validated);
        
        return redirect()->route('admin.genres')->with('success', 'Genre updated successfully!');
    })->name('genres.update');
    
    Route::delete('/genres/{genre}', function (App\Models\Genre $genre) {
        $genre->delete();
        
        return redirect()->route('admin.genres')->with('success', 'Genre deleted successfully!');
    })->name('genres.destroy');
    
    // User management routes
    Route::put('/users/{user}', function (Request $request, App\Models\User $user) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'is_admin' => 'boolean',
        ]);
        
        $user->update($validated);
        
        return redirect()->route('admin.users')->with('success', 'User updated successfully!');
    })->name('users.update');
    
    Route::delete('/users/{user}', function (App\Models\User $user) {
        $user->delete();
        
        return redirect()->route('admin.users')->with('success', 'User deleted successfully!');
    })->name('users.destroy');
    
    // Movie CRUD routes
    Route::get('/movies/create', function () {
        $genres = App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('admin/MovieForm', [
            'genres' => $genres
        ]);
    })->name('movies.create');
    
    Route::post('/movies', function (Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'poster_path' => 'nullable|string',
            'backdrop_path' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
            'duration' => 'required|integer|min:1',
        ]);
        
        $media = Media::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'release_date' => $validated['release_date'],
            'poster_path' => $validated['poster_path'],
            'backdrop_path' => $validated['backdrop_path'],
            'trailer_url' => $validated['trailer_url'],
            'duration' => $validated['duration'],
            'type' => 'movie',
        ]);
        
        $media->genres()->attach($validated['genre_ids']);
        
        return redirect()->route('admin.movies')->with('success', 'Movie created successfully!');
    })->name('movies.store');
    
    Route::get('/movies/{movie}/edit', function (Media $movie) {
        $genres = App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('admin/MovieForm', [
            'movie' => $movie->load('genres'),
            'genres' => $genres
        ]);
    })->name('movies.edit');
    
    Route::put('/movies/{movie}', function (Request $request, Media $movie) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'poster_path' => 'nullable|string',
            'backdrop_path' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
            'duration' => 'required|integer|min:1',
        ]);
        
        $movie->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'release_date' => $validated['release_date'],
            'poster_path' => $validated['poster_path'],
            'backdrop_path' => $validated['backdrop_path'],
            'trailer_url' => $validated['trailer_url'],
            'duration' => $validated['duration'],
        ]);
        
        $movie->genres()->sync($validated['genre_ids']);
        
        return redirect()->route('admin.movies')->with('success', 'Movie updated successfully!');
    })->name('movies.update');
    
    Route::delete('/movies/{movie}', function (Media $movie) {
        $movie->delete();
        
        return redirect()->route('admin.movies')->with('success', 'Movie deleted successfully!');
    })->name('movies.destroy');
    
    // TV Show CRUD routes
    Route::get('/tvshows/create', function () {
        $genres = App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('admin/MovieForm', [
            'genres' => $genres,
            'isTV' => true
        ]);
    })->name('tvshows.create');
    
    Route::post('/tvshows', function (Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'poster_path' => 'nullable|string',
            'backdrop_path' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
        ]);
        
        $media = Media::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'release_date' => $validated['release_date'],
            'poster_path' => $validated['poster_path'],
            'backdrop_path' => $validated['backdrop_path'],
            'trailer_url' => $validated['trailer_url'],
            'type' => 'tv',
        ]);
        
        $media->genres()->attach($validated['genre_ids']);
        
        return redirect()->route('admin.tvshows')->with('success', 'TV Show created successfully!');
    })->name('tvshows.store');
    
    Route::put('/tvshows/{tvshow}', function (Request $request, Media $tvshow) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_date' => 'required|date',
            'poster_path' => 'nullable|string',
            'backdrop_path' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
        ]);
        
        $tvshow->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'release_date' => $validated['release_date'],
            'poster_path' => $validated['poster_path'],
            'backdrop_path' => $validated['backdrop_path'],
            'trailer_url' => $validated['trailer_url'],
        ]);
        
        $tvshow->genres()->sync($validated['genre_ids']);
        
        return redirect()->route('admin.tvshows')->with('success', 'TV Show updated successfully!');
    })->name('tvshows.update');
    
    Route::delete('/tvshows/{tvshow}', function (Media $tvshow) {
        $tvshow->delete();
        
        return redirect()->route('admin.tvshows')->with('success', 'TV Show deleted successfully!');
    })->name('tvshows.destroy');
    
    // Episode routes
    Route::get('/tvshows/{id}/episodes', function ($id) {
        $tvShow = Media::findOrFail($id);
        $episodes = $tvShow->episodes()->orderBy('season')->orderBy('episode_number')->get();
        
        return Inertia::render('admin/Episode', [
            'tvShow' => $tvShow,
            'episodes' => $episodes
        ]);
    })->name('tvshows.episodes');
    
    Route::get('/tvshows/{id}/episodes/create', function ($id) {
        $tvShow = Media::findOrFail($id);
        
        return Inertia::render('admin/EpisodeForm', [
            'tvShow' => $tvShow
        ]);
    })->name('episodes.create');
});