<?php

// Test script to check streaming functionality
require_once 'vendor/autoload.php';

use App\Services\VidsrcService;

// Create VidsrcService instance
$vidsrcService = new VidsrcService();

// Test movie streaming (Pulp Fiction - TMDB ID 680)
echo "Testing VidsrcService for movie (TMDB ID: 680):\n";
$movieStreamingData = $vidsrcService->getMovieStreamingData(680);

if ($movieStreamingData) {
    echo "✓ Movie streaming data retrieved successfully:\n";
    echo "  Available: " . ($movieStreamingData['available'] ? 'Yes' : 'No') . "\n";
    echo "  Streaming URL: " . $movieStreamingData['streaming_url'] . "\n";
    echo "  Embed URL: " . $movieStreamingData['embed_data']['url'] . "\n";
} else {
    echo "✗ Failed to retrieve movie streaming data\n";
}

echo "\n";

// Test TV show streaming (Game of Thrones - TMDB ID 1399, Season 1, Episode 1)
echo "Testing VidsrcService for TV show (TMDB ID: 1399, S01E01):\n";
$tvStreamingData = $vidsrcService->getTVEpisodeStreamingData(1399, 1, 1);

if ($tvStreamingData) {
    echo "✓ TV episode streaming data retrieved successfully:\n";
    echo "  Available: " . ($tvStreamingData['available'] ? 'Yes' : 'No') . "\n";
    echo "  Streaming URL: " . $tvStreamingData['streaming_url'] . "\n";
    echo "  Embed URL: " . $tvStreamingData['embed_data']['url'] . "\n";
} else {
    echo "✗ Failed to retrieve TV episode streaming data\n";
}

echo "\nDone!\n";
