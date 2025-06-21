import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from '../../utils/axios';

interface StreamingPlayerProps {
  tmdbId: number;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
  title: string;
  onClose?: () => void;
}

interface StreamingData {
  available: boolean;
  streaming_url: string;
  embed_data: {
    url: string;
    embed: string;
  };
}

const StreamingPlayer: React.FC<StreamingPlayerProps> = ({
  tmdbId,
  type,
  season,
  episode,
  title,
  onClose
}) => {
  const [streamingData, setStreamingData] = useState<StreamingData | null>(null);
  const [loading, setLoading] = useState(true); // Start loading immediately
  const [error, setError] = useState<string | null>(null);

  // Detect navigation attempts from iframe
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('StreamingPlayer: Page about to unload - this might be caused by iframe navigation');
      return true;
    };

    const handleNavigation = () => {
      console.log('StreamingPlayer: Navigation detected - iframe might be redirecting parent');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const fetchStreamingData = useCallback(async () => {
    console.log('StreamingPlayer: fetchStreamingData called', { tmdbId, type, season, episode });
    
    // Validate required props
    if (!tmdbId || typeof tmdbId !== 'number') {
      console.error('StreamingPlayer: Invalid tmdbId', tmdbId);
      setError('Invalid movie/show ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = `/api/streaming/${type}/${tmdbId}`;
      if (type === 'tv' && season && episode) {
        url += `/${season}/${episode}`;
      }

      console.log('StreamingPlayer: Making API request to', url);
      const response = await axios.get(url);
      console.log('StreamingPlayer: API response received', response.data);

      if (response.data && response.data.available) {
        console.log('StreamingPlayer: Setting streaming data', response.data);
        setStreamingData(response.data);
      } else {
        const errorMsg = response.data?.message || 'Streaming not available for this content';
        console.error('StreamingPlayer: Streaming not available', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error('StreamingPlayer: API request failed', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else if (error.response?.status === 404) {
          setError('Content not found');
        } else {
          setError('Failed to load streaming data');
        }
      } else {
        setError('Network error occurred');
      }
    } finally {
      console.log('StreamingPlayer: fetchStreamingData completed');
      setLoading(false);
    }
  }, [tmdbId, type, season, episode]);

  // Automatically fetch streaming data when component mounts
  useEffect(() => {
    console.log('StreamingPlayer: Component mounted with props:', { tmdbId, type, season, episode });
    fetchStreamingData();
    
    return () => {
      console.log('StreamingPlayer: Component unmounting');
    };
  }, [fetchStreamingData, tmdbId, type, season, episode]);

  useEffect(() => {
    console.log('StreamingPlayer: State changed - loading:', loading, 'error:', error, 'streamingData:', !!streamingData);
  }, [loading, error, streamingData]);

  const handleClosePlayer = () => {
    if (onClose) {
      onClose();
    }
  };

  // Show loading overlay
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading Player</h3>
            <p className="text-gray-400">Preparing your video...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error overlay
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <XMarkIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Streaming Error</h3>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={handleClosePlayer}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show video player if streaming data is available
  if (streamingData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClosePlayer}
            className="absolute top-4 right-4 z-60 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Video Title */}
          <div className="absolute top-4 left-4 z-60 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
            <h3 className="font-semibold">
              {title}
              {type === 'tv' && season && episode && ` - S${season}E${episode}`}
            </h3>
          </div>

          {/* Video Iframe */}
          <iframe
            src={streamingData.streaming_url}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={`${title} Video Player`}
            onLoad={() => console.log('StreamingPlayer: Iframe loaded successfully')}
            onError={() => console.log('StreamingPlayer: Iframe failed to load')}
          />
        </div>
      </div>
    );
  }

  // Fallback (shouldn't reach here normally)
  return null;
};

export default StreamingPlayer;
