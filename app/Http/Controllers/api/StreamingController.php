<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\VidsrcService;

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
            
            // Get streaming data from Vidsrc service
            $streamingData = $this->vidsrcService->getMovieStreamingData($movieId);
            
            \Log::info('StreamingController: VidsrcService response', [
                'movie_id' => $movieId,
                'has_data' => !is_null($streamingData),
                'data' => $streamingData
            ]);
            
            if (!$streamingData) {
                \Log::warning('StreamingController: No streaming data found', [
                    'movie_id' => $movieId
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'No streaming source found for this movie'
                ], 404);
            }
            
            \Log::info('StreamingController: Returning successful response', [
                'movie_id' => $movieId,
                'streaming_url' => $streamingData['streaming_url'] ?? 'N/A'
            ]);
            
            return response()->json([
                'success' => true,
                'data' => $streamingData
            ]);
            
        } catch (\Exception $e) {
            \Log::error('StreamingController: Movie streaming error', [
                'movie_id' => $movieId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to get streaming data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function getTvShowStreaming($tvShowId, Request $request): JsonResponse
    {
        try {
            $season = $request->get('season', 1);
            $episode = $request->get('episode', 1);
            
            \Log::info('StreamingController: getTvShowStreaming called', [
                'tv_show_id' => $tvShowId,
                'season' => $season,
                'episode' => $episode
            ]);
            
            // Get streaming data from Vidsrc service
            $streamingData = $this->vidsrcService->getTVEpisodeStreamingData($tvShowId, $season, $episode);
            
            if (!$streamingData) {
                return response()->json([
                    'success' => false,
                    'message' => 'No streaming source found for this TV show episode'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $streamingData
            ]);
            
        } catch (\Exception $e) {
            \Log::error('StreamingController: TV show streaming error', [
                'tv_show_id' => $tvShowId,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to get streaming data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}