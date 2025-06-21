import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from '../../utils/axios';

interface PopupStreamingPlayerProps {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
  season?: number;
  episode?: number;
  onClose: () => void;
}

const PopupStreamingPlayer: React.FC<PopupStreamingPlayerProps> = ({
  tmdbId,
  type,
  season,
  episode,
  onClose
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreamingData = useCallback(async () => {
    console.log('PopupStreamingPlayer: fetchStreamingData called', { tmdbId, type, season, episode });
    
    if (!tmdbId || typeof tmdbId !== 'number') {
      console.error('PopupStreamingPlayer: Invalid tmdbId', tmdbId);
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

      console.log('PopupStreamingPlayer: Making API request to', url);
      const response = await axios.get(url);
      console.log('PopupStreamingPlayer: API response received', response.data);

      if (response.data && response.data.available) {
        console.log('PopupStreamingPlayer: Opening streaming URL', response.data);
        
        // Open in new tab/window
        const popup = window.open(response.data.streaming_url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        if (!popup) {
          setError('Popup blocked. Please allow popups for this site and try again.');
        } else {
          console.log('PopupStreamingPlayer: Opened streaming URL in new window');
          // Close the player modal since we opened in popup
          setTimeout(() => onClose(), 1000);
        }
      } else {
        const errorMsg = response.data?.message || 'Streaming not available for this content';
        console.error('PopupStreamingPlayer: Streaming not available', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error('PopupStreamingPlayer: API request failed', error);
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
      console.log('PopupStreamingPlayer: fetchStreamingData completed');
      setLoading(false);
    }
  }, [tmdbId, type, season, episode, onClose]);

  useEffect(() => {
    fetchStreamingData();
  }, [fetchStreamingData]);

  const handleClosePlayer = () => {
    console.log('PopupStreamingPlayer: handleClosePlayer called');
    onClose();
  };

  // Show loading overlay
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Opening Video Player</h3>
            <p className="text-gray-400">Preparing streaming link...</p>
            <button
              onClick={handleClosePlayer}
              className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
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

  // If we got here, the popup should already be open
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Video Player Opened</h3>
          <p className="text-gray-400 mb-4">The video should now be playing in a new tab.</p>
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
};

export default PopupStreamingPlayer;
