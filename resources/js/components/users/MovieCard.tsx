import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PlayIcon, HeartIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Movie, TVShow, SharedData } from '../../types';
import axios from 'axios';

// Create a media type that can handle both movies and TV shows
type MediaItem = Movie | (TVShow & { 
  title?: string; 
  year?: string; 
  duration?: number;
  runtime?: number;
});

interface MovieCardProps {
  movie: MediaItem;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  className?: string;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
  onUpdate?: () => void; // Callback for when favorites/watchlist changes
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  size = 'medium', 
  showDetails = true,
  className = '',
  isFavorite = false,
  isInWatchlist = false,
  onUpdate
}) => {
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = auth && auth.user;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const [isWatchlisted, setIsWatchlisted] = useState(isInWatchlist);
  const [imageError, setImageError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const sizeClasses = {
    small: 'w-40 h-60',
    medium: 'w-56 h-80',
    large: 'w-64 h-96'
  };

  // Handle different rating formats
  const rating = movie.vote_average || movie.rating || 0;
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  
  // Get year from movie data - support both movie.year and TV show first_air_date
  const year = movie.year || ('first_air_date' in movie && movie.first_air_date ? movie.first_air_date.substring(0, 4) : '');
  
  // Calculate duration in hours and minutes
  const duration = movie.duration || movie.runtime || 0;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  // Get title - support both movie.title and TV show name
  const title = movie.title || ('name' in movie ? movie.name : 'Unknown Title');

  // Get the link based on media type
  const isTV = movie.type === 'tv' || movie.type === 'tv_show';
  const detailUrl = isTV ? `/tv-shows/${movie.id}` : `/movies/${movie.id}`;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/favorites', {
        media_id: movie.id,
        episode_id: null
      });
      
      setIsFavorited(response.data.status === 'added');
      
      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate();
      }
      
      // Show a toast or notification if desired
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleWatchlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/watchlist', {
        media_id: movie.id,
        episode_id: null
      });
      
      setIsWatchlisted(response.data.status === 'added');
      
      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate();
      }
      
      // Show a toast or notification if desired
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If movie has a trailer URL, use it
    if (movie.trailer_url) {
      window.open(movie.trailer_url, '_blank');
    } else {
      // Fallback: Search for trailer on YouTube
      const searchQuery = encodeURIComponent(`${title} trailer ${year}`);
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  // Determine poster URL
  // Accept both direct URLs and TMDB paths
  const posterUrl = movie.poster_url || movie.poster_path || '/placeholder-poster.svg';
  
  return (
    <div 
      className={`group relative ${sizeClasses[size]} ${className} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={detailUrl} className="block h-full bg-gray-900">
        {/* Movie Poster */}
        <div className="relative h-full">
          {!imageError ? (
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-center text-gray-300">
                <div className="text-5xl mb-3">🎬</div>
                <p className="text-sm font-medium px-4">{title}</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay - Always visible but stronger on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Rating Badge */}
          {numericRating > 0 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm transition-transform duration-300 transform group-hover:scale-110 border border-yellow-500/30">
              <div className="flex items-center space-x-1">
                <StarSolidIcon className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-bold">{numericRating.toFixed(1)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons - Show on hover with fade in */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-3">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = detailUrl;
                }}
                className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110 shadow-lg cursor-pointer"
                title={isTV ? "Watch TV Show" : "Watch Movie"}
              >
                <PlayIcon className="w-5 h-5" />
              </div>
              <button
                onClick={handleTrailerClick}
                className="bg-red-600/90 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                title="Watch Trailer"
              >
                <InformationCircleIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`${isProcessing ? 'bg-gray-600/90' : 'bg-gray-800/90'} text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg backdrop-blur-sm`}
                title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                disabled={isProcessing}
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              <button 
                onClick={handleWatchlistClick}
                className={`${isProcessing ? 'bg-gray-600/90' : 'bg-gray-800/90'} text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg backdrop-blur-sm`}
                title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                disabled={isProcessing}
              >
                {isWatchlisted ? (
                  <BookmarkSolidIcon className="w-5 h-5 text-blue-400" />
                ) : (
                  <PlusIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Movie Details - Show at bottom with improved visibility */}
          {showDetails && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
              <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors duration-200">{title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                <span>{year}</span>
                {duration > 0 && (
                  <span>{hours}h {minutes > 0 ? `${minutes}m` : ''}</span>
                )}
                {isTV && (
                  <span className="text-green-400">TV</span>
                )}
              </div>
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
