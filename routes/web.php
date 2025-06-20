<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    try {
        // Get featured movies (latest high-rated movies for banner)
        $featuredMovies = Media::where('type', 'movie')
            ->with('genres')
            ->where('rating', '>=', 7.5)
            ->orderBy('year', 'desc')
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
            ->orderBy('year', 'desc')
            ->take(10)
            ->get();

    // Get popular TV shows
    $popularTVShows = Media::where('type', 'tv_show')
        ->with('genres')
        ->orderBy('rating', 'desc')
        ->take(10)
        ->get()
        ->map(function ($tvShow) {
            // Ensure name field exists for TV shows (since frontend expects it)
            if (!isset($tvShow->name)) {
                $tvShow->name = $tvShow->title;
            }
            return $tvShow;
        });

        // Get all movies (mixed selection)
        $allMovies = Media::where('type', 'movie')
            ->with('genres')
            ->orderBy('created_at', 'desc')
            ->take(12)
            ->get();

        // Log the number of items retrieved
        \Log::debug('Home route data:', [
            'featuredMovies' => $featuredMovies->count(),
            'popularMovies' => $popularMovies->count(),
            'latestMovies' => $latestMovies->count(),
            'popularTVShows' => $popularTVShows->count(),
            'allMovies' => $allMovies->count(),
        ]);

        return Inertia::render('user/Home', [
            'featuredMovies' => $featuredMovies,
            'popularMovies' => $popularMovies,
            'latestMovies' => $latestMovies,
            'popularTVShows' => $popularTVShows,
            'allMovies' => $allMovies,
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in home route: ' . $e->getMessage());
        return Inertia::render('user/Home', [
            'error' => 'Failed to load data: ' . $e->getMessage(),
            'featuredMovies' => [],
            'popularMovies' => [],
            'latestMovies' => [],
            'popularTVShows' => [],
            'allMovies' => [],
        ]);
    }
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
        $user = auth()->user();
        
        // Get user's favorites with media and genre information
        $favorites = $user->favorites()->with(['media.genres'])->get()
            ->map(function ($favorite) {
                return $favorite->media;
            });
            
        // Get user's watchlist with media and genre information
        $watchlist = $user->watchlist()->with(['media.genres'])->get()
            ->map(function ($watchlistItem) {
                return $watchlistItem->media;
            });
            
        // Get user's watch history with media and genre information
        $watchHistory = $user->watchHistory()->with(['media.genres'])
            ->orderBy('watched_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($historyItem) {
                return [
                    'media' => $historyItem->media,
                    'progress' => $historyItem->progress,
                    'duration' => $historyItem->duration,
                    'watched_at' => $historyItem->watched_at
                ];
            });
        
        return Inertia::render('user/Profile', [
            'favorites' => $favorites,
            'watchlist' => $watchlist,
            'watchHistory' => $watchHistory
        ]);
    })->name('profile');
});

// Movie Routes
Route::get('/movies', function (Request $request) {
    try {
        // Get genre filter if provided
        $genreId = $request->input('genre');
        
        // Base query for all movies (strictly type = 'movie')
        $movieQuery = Media::where('type', 'movie')->with('genres');
        
        // Apply genre filter if provided
        if ($genreId) {
            $movieQuery->whereHas('genres', function($q) use ($genreId) {
                $q->where('genres.id', $genreId);
            });
        }
        
        // Get all movies with the base query + filters
        $allMovies = (clone $movieQuery)
            ->orderBy('created_at', 'desc')
            ->get();

        // Get popular movies (highest rated)
        $popularMovies = (clone $movieQuery)
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get();

        // Get latest movies (most recent)
        $latestMovies = (clone $movieQuery)
            ->orderBy('year', 'desc')
            ->take(10)
            ->get();

        // Get top rated movies (rating >= 8.0)
        $topRatedMovies = (clone $movieQuery)
            ->where('rating', '>=', 8.0)
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get();

        // Get TV shows (without genre filter) - for reference only
        // Not displayed on the Movies page
        $tvShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get();
            
        // Get all genres for filter dropdown
        $genres = \App\Models\Genre::orderBy('name')->get();
        
        // Log the number of items retrieved
        \Log::debug('Movies route data:', [
            'allMovies' => $allMovies->count(),
            'popularMovies' => $popularMovies->count(),
            'latestMovies' => $latestMovies->count(),
            'topRatedMovies' => $topRatedMovies->count(),
            'genreFilter' => $genreId ?? 'none',
        ]);

        return Inertia::render('user/Movie', [
            'movies' => $allMovies,
            'popularMovies' => $popularMovies,
            'latestMovies' => $latestMovies,
            'topRatedMovies' => $topRatedMovies,
            'tvShows' => $tvShows,
            'genres' => $genres,
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in movies route: ' . $e->getMessage());
        // Get all genres even if there's an error with movies
        try {
            $genres = \App\Models\Genre::orderBy('name')->get();
        } catch (\Exception $e) {
            \Log::error('Error loading genres: ' . $e->getMessage());
            $genres = [];
        }
        
        return Inertia::render('user/Movie', [
            'movies' => [],
            'popularMovies' => [],
            'latestMovies' => [],
            'topRatedMovies' => [],
            'tvShows' => [],
            'genres' => $genres,
            'error' => 'Failed to load movies: ' . $e->getMessage()
        ]);
    }
})->name('movies');

Route::get('/movies/popular', function () {
    try {
        // Get popular movies (highest rated)
        $popularMovies = Media::where('type', 'movie')
            ->with('genres')
            ->orderBy('rating', 'desc')
            ->take(20)
            ->get();
            
        // Get all genres for filter dropdown
        $genres = \App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('user/Popular', [
            'popularMovies' => $popularMovies,
            'genres' => $genres
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in popular movies route: ' . $e->getMessage());
        
        return Inertia::render('user/Popular', [
            'popularMovies' => [],
            'genres' => [],
            'error' => 'Failed to load popular movies: ' . $e->getMessage()
        ]);
    }
})->name('movies.popular');

Route::get('/movies/latest', function () {
    try {
        // Get latest movies (most recent)
        $latestMovies = Media::where('type', 'movie')
            ->with('genres')
            ->orderBy('year', 'desc')
            ->take(20)
            ->get();
            
        // Get all genres for filter dropdown
        $genres = \App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('user/Latest', [
            'latestMovies' => $latestMovies,
            'genres' => $genres
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in latest movies route: ' . $e->getMessage());
        
        return Inertia::render('user/Latest', [
            'latestMovies' => [],
            'genres' => [],
            'error' => 'Failed to load latest movies: ' . $e->getMessage()
        ]);
    }
})->name('movies.latest');

Route::get('/tv-shows', function () {
    try {
        // Get all TV shows
        $tvShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->orderBy('created_at', 'desc')
            ->get();

        // Get popular TV shows (highest rated)
        $popularTVShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get();

        // Get latest TV shows (most recent)
        $latestTVShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->orderBy('first_air_date', 'desc')
            ->take(10)
            ->get();

        // Get top rated TV shows
        $topRatedTVShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->where('rating', '>=', 8.0)
            ->orderBy('rating', 'desc')
            ->take(10)
            ->get();

        // Get all genres for filter dropdown
        $genres = \App\Models\Genre::orderBy('name')->get();
            
        // Log the number of items retrieved
        \Log::debug('TV Shows route data:', [
            'tvShows' => $tvShows->count(),
            'popularTVShows' => $popularTVShows->count(),
            'latestTVShows' => $latestTVShows->count(),
            'topRatedTVShows' => $topRatedTVShows->count(),
        ]);

        return Inertia::render('user/TVShow', [
            'tvShows' => $tvShows,
            'popularTVShows' => $popularTVShows,
            'latestTVShows' => $latestTVShows,
            'topRatedTVShows' => $topRatedTVShows,
            'genres' => $genres,
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in TV shows route: ' . $e->getMessage());
        
        // Get all genres even if there's an error with TV shows
        try {
            $genres = \App\Models\Genre::orderBy('name')->get();
        } catch (\Exception $e) {
            \Log::error('Error loading genres: ' . $e->getMessage());
            $genres = [];
        }
        
        return Inertia::render('user/TVShow', [
            'tvShows' => [],
            'popularTVShows' => [],
            'latestTVShows' => [],
            'topRatedTVShows' => [],
            'genres' => $genres,
            'error' => 'Failed to load TV shows: ' . $e->getMessage()
        ]);
    }
})->name('tvshows');

Route::get('/genres', function () {
    try {
        // Get all genres
        $genres = \App\Models\Genre::orderBy('name')->get();
        
        // Get all media with genres
        $allMedia = Media::with('genres')->get();
        
        // Get movies
        $movies = Media::where('type', 'movie')
            ->with('genres')
            ->take(50)
            ->get();
            
        // Get TV shows
        $tvShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->take(50)
            ->get();
        
        return Inertia::render('user/Genre', [
            'genres' => $genres,
            'movies' => $movies,
            'tvShows' => $tvShows,
            'allMedia' => $allMedia
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in genres route: ' . $e->getMessage());
        
        return Inertia::render('user/Genre', [
            'genres' => [],
            'movies' => [],
            'tvShows' => [],
            'allMedia' => [],
            'error' => 'Failed to load genres and media: ' . $e->getMessage()
        ]);
    }
})->name('genres');

Route::get('/genres/{id}', function ($id) {
    try {
        // Find the genre
        $genre = \App\Models\Genre::findOrFail($id);
        
        // Get media with this genre
        $media = Media::whereHas('genres', function($query) use ($id) {
            $query->where('genres.id', $id);
        })->with('genres')->get();
        
        // Get movies with this genre
        $movies = Media::where('type', 'movie')
            ->whereHas('genres', function($query) use ($id) {
                $query->where('genres.id', $id);
            })
            ->with('genres')
            ->get();
            
        // Get TV shows with this genre
        $tvShows = Media::where('type', 'tv_show')
            ->whereHas('genres', function($query) use ($id) {
                $query->where('genres.id', $id);
            })
            ->with('genres')
            ->get();
        
        // Get all genres for navigation
        $genres = \App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('user/Genre', [
            'currentGenre' => $genre,
            'genres' => $genres,
            'movies' => $movies,
            'tvShows' => $tvShows,
            'allMedia' => $media
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in specific genre route: ' . $e->getMessage());
        
        return Inertia::render('user/Genre', [
            'genres' => [],
            'movies' => [],
            'tvShows' => [],
            'allMedia' => [],
            'error' => 'Failed to load genre data: ' . $e->getMessage()
        ]);
    }
})->name('genres.show');

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
    try {
        $movie = Media::with('genres')->where('type', 'movie')->findOrFail($id);
        
        return Inertia::render('user/MovieDetail', [
            'id' => $id,
            'movie' => $movie
        ]);
    } catch (\Exception $e) {
        \Log::error('Error retrieving movie details: ' . $e->getMessage());
        
        return Inertia::render('user/MovieDetail', [
            'id' => $id,
            'error' => 'Failed to load movie details: ' . $e->getMessage()
        ]);
    }
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
    $tvShow = Media::with('genres')->where('type', 'tv_show')->findOrFail($id);
    
    return Inertia::render('user/TVShowDetail', [
        'id' => $id,
        'tvShow' => $tvShow
    ]);
})->name('tvshows.detail');

Route::get('/tv-shows/{id}/stream', function ($id) {
    $tvShow = Media::with('genres')->where('type', 'tv_show')->findOrFail($id);
    
    // Add streaming URL - in a real app this would be from a CDN or streaming service
    $tvShow->streaming_url = "/storage/videos/tv_{$id}.mp4"; // Example path
    
    return Inertia::render('user/Streaming', [
        'movie' => $tvShow, // Using 'movie' key for compatibility with existing Streaming component
        'isTV' => true
    ]);
})->name('tvshows.streaming');

// API routes for favorites and watchlist
Route::middleware(['auth'])->group(function () {
    // Favorites
    Route::post('/api/favorites', function (Request $request) {
        $validated = $request->validate([
            'media_id' => 'required|exists:media,id',
            'episode_id' => 'nullable|integer'
        ]);
        
        $user = auth()->user();
        
        // Debug: Log what we're trying to do
        \Log::info('Favorites API called', [
            'user_id' => $user->id,
            'media_id' => $validated['media_id'],
            'episode_id' => $validated['episode_id'] ?? null
        ]);
        
        $existingFavorite = $user->favorites()
            ->where('media_id', $validated['media_id']);
            
        // Handle episode_id properly for null values
        if (isset($validated['episode_id']) && $validated['episode_id'] !== null) {
            $existingFavorite->where('episode_id', $validated['episode_id']);
        } else {
            $existingFavorite->whereNull('episode_id');
        }
        
        $existingFavorite = $existingFavorite->first();
            
        if ($existingFavorite) {
            // If it already exists, remove it (toggle)
            $existingFavorite->delete();
            \Log::info('Favorite removed');
            return response()->json(['status' => 'removed', 'message' => 'Removed from favorites']);
        } else {
            // Add to favorites
            try {
                $favorite = $user->favorites()->create([
                    'media_id' => $validated['media_id'],
                    'episode_id' => $validated['episode_id'] ?? null
                ]);
                \Log::info('Favorite added', ['favorite_id' => $favorite->id]);
                return response()->json(['status' => 'added', 'message' => 'Added to favorites']);
            } catch (\Exception $e) {
                \Log::error('Failed to add favorite', ['error' => $e->getMessage()]);
                return response()->json(['status' => 'error', 'message' => 'Failed to add to favorites: ' . $e->getMessage()], 500);
            }
        }
    });
    
    // Remove the separate delete routes since we handle toggle in the POST route
    
    // Watchlist
    Route::post('/api/watchlist', function (Request $request) {
        $validated = $request->validate([
            'media_id' => 'required|exists:media,id',
            'episode_id' => 'nullable|integer'
        ]);
        
        $user = auth()->user();
        
        // Debug: Log what we're trying to do
        \Log::info('Watchlist API called', [
            'user_id' => $user->id,
            'media_id' => $validated['media_id'],
            'episode_id' => $validated['episode_id'] ?? null
        ]);
        
        $existingItem = $user->watchlist()
            ->where('media_id', $validated['media_id'])
            ->where('episode_id', $validated['episode_id'] ?? null)
            ->first();
            
        if ($existingItem) {
            // If it already exists, remove it (toggle)
            $existingItem->delete();
            \Log::info('Watchlist item removed');
            return response()->json(['status' => 'removed', 'message' => 'Removed from watchlist']);
        } else {
            // Add to watchlist
            try {
                $watchlistItem = $user->watchlist()->create([
                    'media_id' => $validated['media_id'],
                    'episode_id' => $validated['episode_id'] ?? null
                ]);
                \Log::info('Watchlist item added', ['watchlist_id' => $watchlistItem->id ?? 'no_id']);
                return response()->json(['status' => 'added', 'message' => 'Added to watchlist']);
            } catch (\Exception $e) {
                \Log::error('Failed to add to watchlist', ['error' => $e->getMessage()]);
                return response()->json(['status' => 'error', 'message' => 'Failed to add to watchlist: ' . $e->getMessage()], 500);
            }
        }
    });
    
    // Remove the separate delete routes since we handle toggle in the POST route
    
    // Check status for favorites and watchlist
    Route::get('/api/media/{id}/status', function ($id) {
        $user = auth()->user();
        
        $isFavorite = $user->favorites()->where('media_id', $id)->exists();
        $isInWatchlist = $user->watchlist()->where('media_id', $id)->exists();
        
        return response()->json([
            'is_favorite' => $isFavorite,
            'is_in_watchlist' => $isInWatchlist
        ]);
    });
    
    // Profile update
    Route::put('/api/profile', function (Request $request) {
        $user = auth()->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'current_password' => 'nullable|required_with:password|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);
        
        // Check current password if provided
        if (isset($validated['current_password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json(['message' => 'The current password is incorrect'], 422);
            }
        }
        
        // Update basic profile info
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        
        // Update password if provided
        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        
        $user->save();
        
        return response()->json(['message' => 'Profile updated successfully']);
    });
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
        
        $genres = App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('admin/Movies', [
            'movies' => $movies,
            'genres' => $genres
        ]);
    })->name('movies');
    
    Route::get('/tvshows', function () {
        $tvShows = Media::where('type', 'tv_show')
            ->with('genres')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        $genres = App\Models\Genre::orderBy('name')->get();
        
        return Inertia::render('admin/TVShows', [
            'tvshows' => $tvShows,
            'genres' => $genres
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
            'year' => 'required|integer|min:1901|max:2155',
            'poster_url' => 'nullable|string',
            'backdrop_url' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'rating' => 'nullable|numeric|min:0|max:10',
        ]);
        
        $media = Media::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'year' => $validated['year'],
            'poster_url' => $validated['poster_url'],
            'backdrop_url' => $validated['backdrop_url'],
            'trailer_url' => $validated['trailer_url'],
            'duration' => $validated['duration'],
            'rating' => $validated['rating'] ?? 0.0,
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
            'year' => 'required|integer|min:1901|max:2155',
            'poster_url' => 'nullable|string',
            'backdrop_url' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'rating' => 'nullable|numeric|min:0|max:10',
        ]);
        
        $movie->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'year' => $validated['year'],
            'poster_url' => $validated['poster_url'],
            'backdrop_url' => $validated['backdrop_url'],
            'trailer_url' => $validated['trailer_url'],
            'duration' => $validated['duration'],
            'rating' => $validated['rating'] ?? $movie->rating,
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
            'year' => 'required|integer|min:1901|max:2155',
            'poster_url' => 'nullable|string',
            'backdrop_url' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
        ]);
        
        $media = Media::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'year' => $validated['year'],
            'poster_url' => $validated['poster_url'],
            'backdrop_url' => $validated['backdrop_url'],
            'trailer_url' => $validated['trailer_url'],
            'type' => 'tv_show',
        ]);
        
        $media->genres()->attach($validated['genre_ids']);
        
        return redirect()->route('admin.tvshows')->with('success', 'TV Show created successfully!');
    })->name('tvshows.store');
    
    Route::put('/tvshows/{tvshow}', function (Request $request, Media $tvshow) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'year' => 'required|integer|min:1901|max:2155',
            'poster_url' => 'nullable|string',
            'backdrop_url' => 'nullable|string',
            'genre_ids' => 'required|array',
            'trailer_url' => 'nullable|string',
        ]);
        
        $tvshow->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'year' => $validated['year'],
            'poster_url' => $validated['poster_url'],
            'backdrop_url' => $validated['backdrop_url'],
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

// Debug routes have been removed as they are no longer needed

// Test route to add sample data to favorites and watchlist
Route::get('/test-add-favorites', function () {
    $user = auth()->user();
    if (!$user) {
        return response()->json(['error' => 'Not authenticated'], 401);
    }
    
    // Get first few media items
    $movies = \App\Models\Media::take(3)->get();
    
    foreach ($movies as $movie) {
        // Add to favorites if not already there
        if (!$user->favorites()->where('media_id', $movie->id)->exists()) {
            $user->favorites()->create(['media_id' => $movie->id]);
        }
        
        // Add to watchlist if not already there
        if (!$user->watchlist()->where('media_id', $movie->id)->exists()) {
            $user->watchlist()->create(['media_id' => $movie->id]);
        }
    }
    
    return response()->json(['message' => 'Sample data added to favorites and watchlist']);
});

// Test route to add sample watch history
Route::get('/test-add-watch-history', function () {
    $user = auth()->user();
    if (!$user) {
        return response()->json(['error' => 'Not authenticated'], 401);
    }
    
    // Get first few media items
    $movies = \App\Models\Media::take(2)->get();
    
    foreach ($movies as $movie) {
        // Add to watch history if not already there
        if (!$user->watchHistory()->where('media_id', $movie->id)->exists()) {
            $user->watchHistory()->create([
                'media_id' => $movie->id,
                'progress' => rand(10, 80), // Random progress between 10-80 minutes
                'duration' => $movie->duration ?: 120, // Use movie duration or default 120 minutes
                'watched_at' => now()->subDays(rand(1, 7))
            ]);
        }
    }
    
    return response()->json(['message' => 'Sample watch history added']);
});

// Test route to manually test favorites API
Route::get('/test-favorites-api', function () {
    $user = auth()->user();
    if (!$user) {
        return response()->json(['error' => 'Not authenticated'], 401);
    }
    
    // Get first media item
    $media = \App\Models\Media::first();
    if (!$media) {
        return response()->json(['error' => 'No media found'], 404);
    }
    
    // Try to add to favorites
    try {
        $favorite = $user->favorites()->create([
            'media_id' => $media->id,
            'episode_id' => null
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Favorite added successfully',
            'favorite' => $favorite,
            'media_title' => $media->title
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'media_id' => $media->id,
            'user_id' => $user->id
        ]);
    }
});

// Test route to check database structure
Route::get('/test-db-structure', function () {
    try {
        $favoritesStructure = DB::select('DESCRIBE favorites');
        $watchlistStructure = DB::select('DESCRIBE watchlists');
        $mediaCount = \App\Models\Media::count();
        $userCount = \App\Models\User::count();
        
        return response()->json([
            'favorites_structure' => $favoritesStructure,
            'watchlist_structure' => $watchlistStructure,
            'media_count' => $mediaCount,
            'user_count' => $userCount
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
});

// Diagnostic route to check data flow
Route::get('/diagnostic-data', function () {
    $data = [
        'movieCount' => Media::where('type', 'movie')->count(),
        'tvShowCount' => Media::where('type', 'tv_show')->count(),
        'sampleMovie' => Media::where('type', 'movie')->with('genres')->first(),
        'sampleTVShow' => Media::where('type', 'tv_show')->with('genres')->first(),
        'databaseConnection' => DB::connection()->getPdo() ? true : false
    ];
    
    return response()->json($data);
});

// Test page with simplified movie display
Route::get('/test-page', function () {
    $movies = Media::where('type', 'movie')
        ->with('genres')
        ->orderBy('rating', 'desc')
        ->get();
    
    return Inertia::render('user/TestPage', [
        'movies' => $movies
    ]);
});