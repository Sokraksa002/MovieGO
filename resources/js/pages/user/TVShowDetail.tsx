import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PlayIcon, StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidFilled } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkSolidFilled } from '@heroicons/react/24/solid';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import { TVShowDetailPageProps, TVShow, SharedData } from '../../types';
import axios from 'axios';

const TVShowDetail: React.FC = () => {
  const { id, tvShow, error } = usePage<TVShowDetailPageProps>().props;
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = auth && auth.user;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // If tvShow is not provided, use fallback data
  const tvShowData: TVShow = tvShow || {
    id: parseInt(id),
    name: "Loading...",
    first_air_date: "",
    genres: []
  };

  const posterUrl = tvShowData.poster_url || tvShowData.poster_path 
    ? (tvShowData.poster_url?.startsWith('http') 
      ? tvShowData.poster_url 
      : (tvShowData.poster_path?.startsWith('http') 
        ? tvShowData.poster_path 
        : `https://image.tmdb.org/t/p/w500${tvShowData.poster_path || tvShowData.poster_url}`))
    : '/placeholder-poster.svg';
    
  const backdropUrl = tvShowData.backdrop_url || tvShowData.backdrop_path 
    ? (tvShowData.backdrop_url?.startsWith('http') 
      ? tvShowData.backdrop_url 
      : (tvShowData.backdrop_path?.startsWith('http') 
        ? tvShowData.backdrop_path 
        : `https://image.tmdb.org/t/p/original${tvShowData.backdrop_path || tvShowData.backdrop_url}`))
    : '/placeholder-backdrop.jpg';

  const rating = tvShowData.vote_average || tvShowData.rating || 0;
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  const year = tvShowData.first_air_date ? new Date(tvShowData.first_air_date).getFullYear() : '';
  const description = tvShowData.overview || tvShowData.description || 'No description available.';
  
  // Get episodes and seasons count
  const seasons = tvShowData.number_of_seasons || tvShowData.seasons_count || 1;
  const episodes = tvShowData.number_of_episodes || tvShowData.episodes_count || 0;
  
  // Get show status
  const status = tvShowData.status || 'Released';
  
  // Get original language
  const language = tvShowData.original_language || 'en';

  // Load current status when component mounts
  useEffect(() => {
    const loadStatus = async () => {
      if (!isLoggedIn || !tvShowData.id) return;
      
      try {
        const response = await axios.get(`/api/media/${tvShowData.id}/status`);
        setIsFavorite(response.data.is_favorite);
        setIsInWatchlist(response.data.is_in_watchlist);
      } catch (error) {
        console.error('Failed to load media status:', error);
      }
    };
    
    loadStatus();
  }, [tvShowData.id, isLoggedIn]);

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
        media_id: tvShowData.id,
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
        media_id: tvShowData.id,
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
  
  // Handle adding to watch history
  const handleAddToWatchHistory = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      await axios.post('/api/watch-history', {
        media_id: tvShowData.id,
        episode_id: null,
        progress: 0, // Starting progress
        duration: 45, // Assume average episode length is 45 minutes
        watched_at: new Date().toISOString()
      });
      
      // Redirect to streaming page
      window.location.href = `/tv-shows/${tvShowData.id}/stream`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatusMessage({
          message: error.response.data.message || 'Failed to update watch history',
          type: 'error'
        });
      } else {
        setStatusMessage({
          message: 'An error occurred. Please try again.',
          type: 'error'
        });
      }
      setIsProcessing(false);
    }
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
            alt={tvShowData.name}
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
                alt={tvShowData.name}
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
                {tvShowData.name}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{numericRating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-5 h-5" />
                  <span>{seasons} Season{seasons !== 1 ? 's' : ''}</span>
                </div>
                <span className="bg-green-600 px-2 py-1 rounded text-xs font-semibold">
                  {status}
                </span>
              </div>
              
              {/* Genres */}
              <div className="flex gap-2 mb-6">
                {tvShowData.genres?.map((genre) => (
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
              <div className="flex gap-4">
                <Link
                  href={`/tv-shows/${tvShowData.id}/stream`}
                  onClick={handleAddToWatchHistory}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200"
                >
                  <PlayIcon className="w-6 h-6" />
                  Watch Now
                </Link>
                
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
          {/* Episodes Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Episodes & Seasons</h2>
            <div className="bg-zinc-900 rounded-lg p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {seasons}
                  </div>
                  <div className="text-gray-400">Season{seasons !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {episodes}
                  </div>
                  <div className="text-gray-400">Episodes</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Show Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Details</h2>
            <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Status</h3>
                <p className="text-white">{status}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">First Air Date</h3>
                <p className="text-white">{tvShowData.first_air_date || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Original Language</h3>
                <p className="text-white uppercase">{language}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Genres</h3>
                <p className="text-white">{tvShowData.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TVShowDetail;