<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TmdbService
{
    private $apiKey;
    private $baseUrl;
    private $imageBaseUrl;

    public function __construct()
    {
        $this->apiKey = config('tmdb.api_key');
        $this->baseUrl = config('tmdb.base_url');
        $this->imageBaseUrl = config('tmdb.image_base_url');
    }

    /**
     * Search for movies or TV shows
     */
    public function search($query, $type = 'multi', $page = 1)
    {
        try {
            $url = "{$this->baseUrl}/search/{$type}";
            $params = [
                'api_key' => $this->apiKey,
                'query' => $query,
                'page' => $page,
                'language' => 'en-US'
            ];

            Log::info('TMDB Service Making Request', [
                'url' => $url,
                'has_api_key' => !empty($this->apiKey),
                'api_key_length' => strlen($this->apiKey ?? ''),
                'query' => $query,
                'type' => $type
            ]);

            $response = Http::get($url, $params);

            Log::info('TMDB Service Response', [
                'status' => $response->status(),
                'successful' => $response->successful(),
                'has_results' => isset($response->json()['results'])
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB Search Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB Search Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get movie details by TMDB ID
     */
    public function getMovie($tmdbId)
    {
        try {
            $response = Http::get("{$this->baseUrl}/movie/{$tmdbId}", [
                'api_key' => $this->apiKey,
                'language' => 'en-US',
                'append_to_response' => 'videos,credits,images'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB Movie Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB Movie Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get TV show details by TMDB ID
     */
    public function getTVShow($tmdbId)
    {
        try {
            $response = Http::get("{$this->baseUrl}/tv/{$tmdbId}", [
                'api_key' => $this->apiKey,
                'language' => 'en-US',
                'append_to_response' => 'videos,credits,images'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB TV Show Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB TV Show Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get TV show season details
     */
    public function getTVSeason($tmdbId, $seasonNumber)
    {
        try {
            $response = Http::get("{$this->baseUrl}/tv/{$tmdbId}/season/{$seasonNumber}", [
                'api_key' => $this->apiKey,
                'language' => 'en-US'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB TV Season Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB TV Season Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get popular movies
     */
    public function getPopularMovies($page = 1)
    {
        try {
            $response = Http::get("{$this->baseUrl}/movie/popular", [
                'api_key' => $this->apiKey,
                'page' => $page,
                'language' => 'en-US'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB Popular Movies Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB Popular Movies Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get popular TV shows
     */
    public function getPopularTVShows($page = 1)
    {
        try {
            $response = Http::get("{$this->baseUrl}/tv/popular", [
                'api_key' => $this->apiKey,
                'page' => $page,
                'language' => 'en-US'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('TMDB Popular TV Shows Error: ' . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error('TMDB Popular TV Shows Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get full image URL
     */
    public function getImageUrl($path, $size = 'w500')
    {
        if (!$path) return null;
        return $this->imageBaseUrl . '/' . $size . $path;
    }

    /**
     * Transform TMDB movie data to our media format
     */
    public function transformMovieData($tmdbData)
    {
        return [
            'tmdb_id' => $tmdbData['id'],
            'imdb_id' => $tmdbData['imdb_id'] ?? null,
            'title' => $tmdbData['title'],
            'description' => $tmdbData['overview'],
            'year' => isset($tmdbData['release_date']) ? date('Y', strtotime($tmdbData['release_date'])) : null,
            'duration' => $tmdbData['runtime'] ?? null,
            'type' => 'movie',
            'poster_url' => $this->getImageUrl($tmdbData['poster_path']),
            'backdrop_url' => $this->getImageUrl($tmdbData['backdrop_path'], 'w1280'),
            'rating' => (string) ($tmdbData['vote_average'] ?? 0),
            'vote_average' => $tmdbData['vote_average'] ?? 0,
            'vote_count' => $tmdbData['vote_count'] ?? 0,
            'original_language' => $tmdbData['original_language'] ?? null,
            'production_companies' => $tmdbData['production_companies'] ?? [],
            'production_countries' => $tmdbData['production_countries'] ?? [],
            'adult' => $tmdbData['adult'] ?? false,
        ];
    }

    /**
     * Transform TMDB TV show data to our media format
     */
    public function transformTVShowData($tmdbData)
    {
        return [
            'tmdb_id' => $tmdbData['id'],
            'title' => $tmdbData['name'],
            'description' => $tmdbData['overview'],
            'year' => isset($tmdbData['first_air_date']) ? date('Y', strtotime($tmdbData['first_air_date'])) : null,
            'type' => 'tv_show',
            'poster_url' => $this->getImageUrl($tmdbData['poster_path']),
            'backdrop_url' => $this->getImageUrl($tmdbData['backdrop_path'], 'w1280'),
            'rating' => (string) ($tmdbData['vote_average'] ?? 0),
            'vote_average' => $tmdbData['vote_average'] ?? 0,
            'vote_count' => $tmdbData['vote_count'] ?? 0,
            'original_language' => $tmdbData['original_language'] ?? null,
            'production_companies' => $tmdbData['production_companies'] ?? [],
            'production_countries' => $tmdbData['production_countries'] ?? [],
            'adult' => $tmdbData['adult'] ?? false,
            'first_air_date' => $tmdbData['first_air_date'] ?? null,
            'last_air_date' => $tmdbData['last_air_date'] ?? null,
            'status' => $tmdbData['status'] ?? null,
            'seasons_count' => $tmdbData['number_of_seasons'] ?? 0,
            'episodes_count' => $tmdbData['number_of_episodes'] ?? 0,
        ];
    }
}
