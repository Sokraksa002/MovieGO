<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TmdbService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TmdbController extends Controller
{
    private $tmdbService;

    public function __construct(TmdbService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    /**
     * Search TMDB for movies and TV shows
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $type = $request->input('type', 'multi'); // multi, movie, tv
        $page = $request->input('page', 1);

        if (!$query) {
            return response()->json([
                'error' => 'Query parameter is required'
            ], 400);
        }

        $results = $this->tmdbService->search($query, $type, $page);

        if (!$results) {
            return response()->json([
                'error' => 'Failed to search TMDB'
            ], 500);
        }

        return response()->json($results);
    }

    /**
     * Get movie details by TMDB ID
     */
    public function getMovie($tmdbId): JsonResponse
    {
        $movie = $this->tmdbService->getMovie($tmdbId);

        if (!$movie) {
            return response()->json([
                'error' => 'Movie not found'
            ], 404);
        }

        return response()->json($movie);
    }

    /**
     * Get TV show details by TMDB ID
     */
    public function getTVShow($tmdbId): JsonResponse
    {
        $tvShow = $this->tmdbService->getTVShow($tmdbId);

        if (!$tvShow) {
            return response()->json([
                'error' => 'TV show not found'
            ], 404);
        }

        return response()->json($tvShow);
    }

    /**
     * Get TV show season details
     */
    public function getTVSeason($tmdbId, $seasonNumber): JsonResponse
    {
        $season = $this->tmdbService->getTVSeason($tmdbId, $seasonNumber);

        if (!$season) {
            return response()->json([
                'error' => 'Season not found'
            ], 404);
        }

        return response()->json($season);
    }

    /**
     * Get popular movies from TMDB
     */
    public function getPopularMovies(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $results = $this->tmdbService->getPopularMovies($page);

        if (!$results) {
            return response()->json([
                'error' => 'Failed to fetch popular movies'
            ], 500);
        }

        return response()->json($results);
    }

    /**
     * Get popular TV shows from TMDB
     */
    public function getPopularTVShows(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $results = $this->tmdbService->getPopularTVShows($page);

        if (!$results) {
            return response()->json([
                'error' => 'Failed to fetch popular TV shows'
            ], 500);
        }

        return response()->json($results);
    }
}
