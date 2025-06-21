<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class VidsrcService
{
    private $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('tmdb.vidsrc_base_url');
    }

    /**
     * Get movie streaming URL
     */
    public function getMovieUrl($tmdbId)
    {
        return "{$this->baseUrl}/movie?tmdb={$tmdbId}";
    }

    /**
     * Get TV show episode streaming URL
     */
    public function getTVEpisodeUrl($tmdbId, $season, $episode)
    {
        return "{$this->baseUrl}/tv?tmdb={$tmdbId}&season={$season}&episode={$episode}";
    }

    /**
     * Get the iframe embed code for a movie
     */
    public function getMovieEmbed($tmdbId, $options = [])
    {
        $url = $this->getMovieUrl($tmdbId);
        $width = $options['width'] ?? '100%';
        $height = $options['height'] ?? '500px';
        
        // Add security attributes for production
        $sandbox = app()->environment('production') ? 'sandbox="allow-scripts allow-same-origin allow-presentation"' : '';
        $allowFullscreen = 'allowfullscreen webkitallowfullscreen mozallowfullscreen';
        
        return [
            'url' => $url,
            'embed' => "<iframe src=\"{$url}\" width=\"{$width}\" height=\"{$height}\" frameborder=\"0\" {$sandbox} {$allowFullscreen}></iframe>"
        ];
    }

    /**
     * Get the iframe embed code for a TV episode
     */
    public function getTVEpisodeEmbed($tmdbId, $season, $episode, $options = [])
    {
        $url = $this->getTVEpisodeUrl($tmdbId, $season, $episode);
        $width = $options['width'] ?? '100%';
        $height = $options['height'] ?? '500px';
        
        return [
            'url' => $url,
            'embed' => "<iframe src=\"{$url}\" width=\"{$width}\" height=\"{$height}\" frameborder=\"0\" allowfullscreen></iframe>"
        ];
    }

    /**
     * Check if streaming is available for a given TMDB ID
     */
    public function isAvailable($tmdbId, $type = 'movie', $season = null, $episode = null)
    {
        // This is a basic check - you might want to implement actual availability checking
        // by making requests to vidsrc or maintaining a database of available content
        
        if ($type === 'movie') {
            return !empty($tmdbId);
        } else {
            return !empty($tmdbId) && !empty($season) && !empty($episode);
        }
    }

    /**
     * Get streaming data for movie detail page
     */
    public function getMovieStreamingData($tmdbId)
    {
        if (!$this->isAvailable($tmdbId, 'movie')) {
            return null;
        }

        $streamingData = [
            'available' => true,
            'type' => 'movie',
            'tmdb_id' => $tmdbId,
            'streaming_url' => $this->getMovieUrl($tmdbId),
            'embed_data' => $this->getMovieEmbed($tmdbId, ['height' => '600px'])
        ];

        return $streamingData;
    }

    /**
     * Get streaming data for TV show episode
     */
    public function getTVEpisodeStreamingData($tmdbId, $season, $episode)
    {
        if (!$this->isAvailable($tmdbId, 'tv', $season, $episode)) {
            return null;
        }

        $streamingData = [
            'available' => true,
            'type' => 'tv',
            'tmdb_id' => $tmdbId,
            'season' => $season,
            'episode' => $episode,
            'streaming_url' => $this->getTVEpisodeUrl($tmdbId, $season, $episode),
            'embed_data' => $this->getTVEpisodeEmbed($tmdbId, $season, $episode, ['height' => '600px'])
        ];

        return $streamingData;
    }
}
