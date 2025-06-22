<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\VidsrcService;
use Illuminate\Http\JsonResponse;

class StreamingController extends Controller
{
    protected $vidsrcService;

    public function __construct(VidsrcService $vidsrcService)
    {
        $this->vidsrcService = $vidsrcService;
    }

    public function getMovieStreaming($movieId): JsonResponse
    {
        try {
            \Log::info('StreamingController: getMovieStreaming called', [
                'movie_id' => $movieId,
                'environment' => app()->environment(),
                'vidsrc_base_url' => config('tmdb.vidsrc_base_url')
            ]);
            
            // Check if TMDB ID is available
            if (!$movieId) {
                \Log::warning('StreamingController: No movie ID provided');
                return response()->json([
                    'available' => false,
                    'message' => 'No movie ID provided'
                ], 400);
            }
            
            // Get streaming URL using VidsrcService
            $streamingUrl = $this->vidsrcService->getMovieUrl($movieId);
            
            \Log::info('StreamingController: Generated streaming URL', [
                'movie_id' => $movieId,
                'streaming_url' => $streamingUrl
            ]);
            
            if (!$streamingUrl) {
                \Log::warning('StreamingController: No streaming URL generated', [
                    'movie_id' => $movieId
                ]);
                
                return response()->json([
                    'available' => false,
                    'message' => 'No streaming source found for this movie'
                ], 404);
            }

            $response = [
                'available' => true,
                'streaming_url' => $streamingUrl,
                'embed_data' => [
                    'url' => $streamingUrl,
                    'embed' => "<iframe src=\"{$streamingUrl}\" frameborder=\"0\" allowfullscreen></iframe>"
                ],
                'type' => 'movie',
                'tmdb_id' => $movieId
            ];

            \Log::info('StreamingController: Movie streaming data prepared', $response);
            
            return response()->json($response);
            
        } catch (\Exception $e) {
            \Log::error('StreamingController: Error getting movie streaming', [
                'movie_id' => $movieId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'available' => false,
                'message' => 'Failed to get streaming data: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function getTvShowStreaming($tvShowId): JsonResponse
    {
        try {
            $season = request('season', 1);
            $episode = request('episode', 1);
            
            \Log::info('StreamingController: getTvShowStreaming called', [
                'tv_show_id' => $tvShowId,
                'season' => $season,
                'episode' => $episode
            ]);
            
            if (!$tvShowId) {
                return response()->json([
                    'available' => false,
                    'message' => 'No TV show ID provided'
                ], 400);
            }
            
            // Get streaming URL using VidsrcService
            $streamingUrl = $this->vidsrcService->getTVEpisodeUrl($tvShowId, $season, $episode);
            
            \Log::info('StreamingController: Generated TV streaming URL', [
                'tv_show_id' => $tvShowId,
                'season' => $season,
                'episode' => $episode,
                'streaming_url' => $streamingUrl
            ]);
            
            if (!$streamingUrl) {
                return response()->json([
                    'available' => false,
                    'message' => 'No streaming source found for this TV show episode'
                ], 404);
            }

            $response = [
                'available' => true,
                'streaming_url' => $streamingUrl,
                'embed_data' => [
                    'url' => $streamingUrl,
                    'embed' => "<iframe src=\"{$streamingUrl}\" frameborder=\"0\" allowfullscreen></iframe>"
                ],
                'type' => 'tv',
                'tmdb_id' => $tvShowId,
                'season' => $season,
                'episode' => $episode
            ];

            \Log::info('StreamingController: TV show streaming data prepared', $response);
            
            return response()->json($response);
            
        } catch (\Exception $e) {
            \Log::error('StreamingController: Error getting TV show streaming', [
                'tv_show_id' => $tvShowId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'available' => false,
                'message' => 'Failed to get streaming data: ' . $e->getMessage()
            ], 500);
        }
    }
}