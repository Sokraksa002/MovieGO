<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\VidsrcService;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StreamingController extends Controller
{
    private $vidsrcService;

    public function __construct(VidsrcService $vidsrcService)
    {
        $this->vidsrcService = $vidsrcService;
    }

    /**
     * Get streaming data for a movie by TMDB ID
     */
    public function getMovieStreaming($tmdbId): JsonResponse
    {
        try {
            $streamingData = $this->vidsrcService->getMovieStreamingData($tmdbId);
            
            if (!$streamingData) {
                return response()->json([
                    'available' => false,
                    'message' => 'Streaming not available for this movie'
                ], 404);
            }

            return response()->json($streamingData);
        } catch (\Exception $e) {
            return response()->json([
                'available' => false,
                'message' => 'Error fetching streaming data'
            ], 500);
        }
    }

    /**
     * Get streaming data for a TV episode by TMDB ID
     */
    public function getTVEpisodeStreaming($tmdbId, $season, $episode): JsonResponse
    {
        try {
            $streamingData = $this->vidsrcService->getTVEpisodeStreamingData($tmdbId, $season, $episode);
            
            if (!$streamingData) {
                return response()->json([
                    'available' => false,
                    'message' => 'Streaming not available for this episode'
                ], 404);
            }

            return response()->json($streamingData);
        } catch (\Exception $e) {
            return response()->json([
                'available' => false,
                'message' => 'Error fetching streaming data'
            ], 500);
        }
    }

    /**
     * Get streaming data for media by internal media ID
     * This will look up the TMDB ID from our media table
     */
    public function getMediaStreaming($mediaId, Request $request): JsonResponse
    {
        try {
            $media = Media::findOrFail($mediaId);
            
            if (!$media->tmdb_id) {
                return response()->json([
                    'available' => false,
                    'message' => 'TMDB ID not available for this media'
                ], 404);
            }

            // For TV shows, we might need season/episode info
            if ($media->type === 'tv') {
                $season = $request->input('season', 1);
                $episode = $request->input('episode', 1);
                
                return $this->getTVEpisodeStreaming($media->tmdb_id, $season, $episode);
            } else {
                return $this->getMovieStreaming($media->tmdb_id);
            }
        } catch (\Exception $e) {
            return response()->json([
                'available' => false,
                'message' => 'Media not found or error fetching streaming data'
            ], 500);
        }
    }

    /**
     * Check streaming availability for multiple media items
     */
    public function checkAvailability(Request $request): JsonResponse
    {
        $tmdbIds = $request->input('tmdb_ids', []);
        $availability = [];

        foreach ($tmdbIds as $tmdbId) {
            $availability[$tmdbId] = $this->vidsrcService->isAvailable($tmdbId);
        }

        return response()->json(['availability' => $availability]);
    }
}
