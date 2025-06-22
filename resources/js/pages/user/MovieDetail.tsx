import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PlayIcon, StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidFilled } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkSolidFilled } from '@heroicons/react/24/solid';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import StreamingPlayer from '../../components/users/StreamingPlayer';
import PopupStreamingPlayer from '../../components/users/PopupStreamingPlayer';
import { MovieDetailPageProps, Movie, SharedData } from '../../types';
import axios from '../../utils/axios';

const MovieDetail: React.FC = () => {
  console.log('MovieDetail: Component rendering');
  
  const { id, movie, error } = usePage<MovieDetailPageProps>().props;
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = auth && auth.user;
  
  console.log('MovieDetail: Props received:', { id, movie: !!movie, error, isLoggedIn });
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showStreamingPlayer, setShowStreamingPlayer] = useState(false);
  const [showPopupPlayer, setShowPopupPlayer] = useState(false);
  
  // If movie is not provided, use fallback data
  const movieData: Movie = movie || {
    id: parseInt(id),
    title: "Loading...",
    genres: []
  };

  const posterUrl = movieData.poster_url || movieData.poster_path 
    ? (movieData.poster_url?.startsWith('http') 
      ? movieData.poster_url 
      : (movieData.poster_path?.startsWith('http') 
        ? movieData.poster_path 
        : `https://image.tmdb.org/t/p/w500${movieData.poster_path || movieData.poster_url}`))
    : '/placeholder-poster.svg';
    
  const backdropUrl = movieData.backdrop_url || movieData.backdrop_path 
    ? (movieData.backdrop_url?.startsWith('http') 
      ? movieData.backdrop_url 
      : (movieData.backdrop_path?.startsWith('http') 
        ? movieData.backdrop_path 
        : `https://image.tmdb.org/t/p/original${movieData.backdrop_path || movieData.backdrop_url}`))
    : '/placeholder-backdrop.jpg';

  const rating = movieData.vote_average || movieData.rating || 0;
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  const year = movieData.year || (movieData.release_date ? new Date(movieData.release_date).getFullYear() : '');
  const description = movieData.overview || movieData.description || 'No description available.';
  
  // Calculate duration in hours and minutes
  const duration = movieData.duration || movieData.runtime || 0;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = duration > 0 ? `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}` : '';

  // Load current status when component mounts
  useEffect(() => {
    const loadStatus = async () => {
      if (!isLoggedIn || !movieData.id) return;
      
      try {
        const response = await axios.get(`/api/media/${movieData.id}/status`);
        setIsFavorite(response.data.is_favorite);
        setIsInWatchlist(response.data.is_in_watchlist);
      } catch (error) {
        console.error('Failed to load media status:', error);
      }
    };
    
    loadStatus();
  }, [movieData.id, isLoggedIn]);

  // Track showStreamingPlayer changes
  useEffect(() => {
    console.log('MovieDetail: showStreamingPlayer changed to', showStreamingPlayer);
  }, [showStreamingPlayer]);

  // Handle adding to favorites
  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/favorites', {
        media_id: movieData.id,
        episode_id: null
      });
      
      setIsFavorite(response.data.status === 'added');
      setStatusMessage({
        message: response.data.message,
        type: 'success'
      });
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatusMessage({
          message: error.response.data.message || 'Failed to update favorites',
          type: 'error'
        });
      } else {
        setStatusMessage({
          message: 'An error occurred. Please try again.',
          type: 'error'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle adding to watchlist
  const handleToggleWatchlist = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/watchlist', {
        media_id: movieData.id,
        episode_id: null
      });
      
      setIsInWatchlist(response.data.status === 'added');
      setStatusMessage({
        message: response.data.message,
        type: 'success'
      });
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatusMessage({
          message: error.response.data.message || 'Failed to update watchlist',
          type: 'error'
        });
      } else {
        setStatusMessage({
          message: 'An error occurred. Please try again.',
          type: 'error'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle starting to watch (no login required)
  const handleStartWatching = async () => {
    console.log('MovieDetail: handleStartWatching called', { movieData, isProcessing });
    
    try {
      if (isProcessing) return;
      
      setIsProcessing(true);
      
      // If user is logged in, optionally update watch history
      // Temporarily disabled for debugging
      /*
      if (isLoggedIn) {
        try {
          console.log('MovieDetail: Updating watch history for logged-in user');
          await axios.post('/api/watch-history', {
            media_id: movieData.id,
            episode_id: null,
            progress: 0, // Starting progress
            duration: duration, // Total duration in minutes
            watched_at: new Date().toISOString()
          });
          console.log('MovieDetail: Watch history updated successfully');
        } catch (error) {
          // Don't block streaming if watch history fails
          console.warn('MovieDetail: Failed to update watch history:', error);
        }
      }
      */
      
      // Show streaming player regardless of login status
      console.log('MovieDetail: Setting showStreamingPlayer to true');
      setShowStreamingPlayer(true);
      setIsProcessing(false);
    } catch (error) {
      console.error('MovieDetail: Error in handleStartWatching:', error);
      setIsProcessing(false);
    }
  };

  // Handle closing streaming player
  const handleCloseStreamingPlayer = () => {
    console.log('MovieDetail: handleCloseStreamingPlayer called');
    setShowStreamingPlayer(false);
  };

  // Handle popup streaming
  const handlePopupStreaming = async () => {
    console.log('MovieDetail: handlePopupStreaming called', { movieData, isProcessing });
    
    try {
      if (isProcessing) return;
      
      setIsProcessing(true);
      
      // If user is logged in, optionally update watch history
      if (isLoggedIn) {
        try {
          console.log('MovieDetail: Updating watch history for logged-in user');
          await axios.post('/api/watch-history', {
            media_id: movieData.id,
            episode_id: null,
            progress: 0,
            duration: duration,
            watched_at: new Date().toISOString()
          });
          console.log('MovieDetail: Watch history updated successfully');
        } catch (error) {
          console.warn('MovieDetail: Failed to update watch history:', error);
        }
      }
      
      console.log('MovieDetail: Setting showPopupPlayer to true');
      setShowPopupPlayer(true);
      setIsProcessing(false);
    } catch (error) {
      console.error('MovieDetail: Error in handlePopupStreaming:', error);
      setIsProcessing(false);
    }
  };

  // Handle closing popup player
  const handleClosePopupPlayer = () => {
    console.log('MovieDetail: handleClosePopupPlayer called');
    setShowPopupPlayer(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {error && (
        <div className="max-w-7xl mx-auto p-4 mt-4">
          <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}
      
      {statusMessage && (
        <div className="max-w-7xl mx-auto p-4 mt-4">
          <div className={`${statusMessage.type === 'success' ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'} text-white p-4 rounded-lg`}>
            <p className="font-medium">{statusMessage.message}</p>
          </div>
        </div>
      )}
      
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div className="h-[70vh] relative overflow-hidden">
          <img
            src={backdropUrl}
            alt={movieData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = '/placeholder-backdrop.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={posterUrl}
                alt={movieData.title}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = '/placeholder-poster.svg';
                }}
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 flex flex-col justify-end pb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                {movieData.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{numericRating.toFixed(1)}</span>
                </div>
                {year && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{year}</span>
                  </div>
                )}
                {formattedDuration && (
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-5 h-5" />
                    <span>{formattedDuration}</span>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              <div className="flex gap-2 mb-6">
                {movieData.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                {description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleStartWatching}
                  disabled={isProcessing}
                  className={`${isProcessing ? 'bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-black px-8 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200`}
                >
                  <PlayIcon className="w-6 h-6" />
                  {isProcessing ? 'Loading...' : 'Watch (Embed)'}
                </button>
                
                <button
                  onClick={handlePopupStreaming}
                  disabled={isProcessing}
                  className={`${isProcessing ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-8 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200`}
                >
                  <PlayIcon className="w-6 h-6" />
                  {isProcessing ? 'Loading...' : 'Watch (Popup)'}
                </button>
                
                <button 
                  onClick={handleToggleFavorite}
                  disabled={isProcessing}
                  className={`${isProcessing ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-6 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200`}
                >
                  {isFavorite ? (
                    <>
                      <HeartSolidFilled className="w-6 h-6 text-red-500" />
                      Remove from Favorites
                    </>
                  ) : (
                    <>
                      <HeartOutline className="w-6 h-6" />
                      Add to Favorites
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleToggleWatchlist}
                  disabled={isProcessing}
                  className={`${isProcessing ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-6 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200`}
                >
                  {isInWatchlist ? (
                    <>
                      <BookmarkSolidFilled className="w-6 h-6 text-blue-400" />
                      Remove from Watchlist
                    </>
                  ) : (
                    <>
                      <BookmarkOutline className="w-6 h-6" />
                      Add to Watchlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Movie Technical Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">About the Movie</h2>
            <div className="bg-zinc-900 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>
              
              {movieData.trailer_url && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Trailer</h3>
                  <a 
                    href={movieData.trailer_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <PlayIcon className="w-5 h-5" />
                    Watch Trailer
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Movie Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Details</h2>
            <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Release Date</h3>
                <p className="text-white">{movieData.release_date || movieData.year || 'Unknown'}</p>
              </div>
              {formattedDuration && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Runtime</h3>
                  <p className="text-white">{formattedDuration}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Rating</h3>
                <p className="text-white">{numericRating.toFixed(1)} / 10</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Genres</h3>
                <p className="text-white">{movieData.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* DEBUG: If you see this text twice, there's still a duplicate Footer */}
      <div style={{display: 'none'}}>MovieDetail Footer Instance</div>
      
      {/* Streaming Player */}
      {showStreamingPlayer && movieData.tmdb_id && typeof movieData.tmdb_id === 'number' && (
        <StreamingPlayer
          tmdbId={movieData.tmdb_id!}
          type={movieData.type === 'tv_show' ? 'tv' : 'movie'}
          title={movieData.title}
          onClose={handleCloseStreamingPlayer}
        />
      )}
      
      {/* Popup Streaming Player */}
      {showPopupPlayer && movieData.tmdb_id && typeof movieData.tmdb_id === 'number' && (
        <PopupStreamingPlayer
          tmdbId={movieData.tmdb_id!}
          type={movieData.type === 'tv_show' ? 'tv' : 'movie'}
          title={movieData.title}
          onClose={handleClosePopupPlayer}
        />
      )}
    </div>
  );
};

export default MovieDetail;