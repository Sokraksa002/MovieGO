import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { PlayIcon, HeartIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { TVShow } from '../../types';

interface TVShowCardProps {
  show: TVShow;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  className?: string;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ 
  show, 
  size = 'medium',
  showDetails = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-40 h-60',
    medium: 'w-56 h-80',
    large: 'w-64 h-96'
  };

  // Get the title - handle both name and title properties
  const title = show.name || show.title || 'Unknown Show';

  // Handle different rating formats and ensure it's numeric
  const rating = show.vote_average || (show.rating ? parseFloat(show.rating.toString()) : 0);
  
  // Get year from first air date
  const year = show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : '';
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // Here you would implement actual favorite functionality
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If show has a trailer URL, use it
    if (show.trailer_url) {
      window.open(show.trailer_url, '_blank');
    } else {
      // Fallback: Search for trailer on YouTube
      const searchQuery = encodeURIComponent(`${show.name} trailer ${year}`);
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  // Determine poster URL
  const posterUrl = show.poster_url || show.poster_path || '/placeholder-poster.svg';

  return (
    <div 
      className={`group relative ${sizeClasses[size]} ${className} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/tv-shows/${show.id}`} className="block h-full bg-gray-900">
        {/* Show Poster */}
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
                <div className="text-5xl mb-3">📺</div>
                <p className="text-sm font-medium px-4">{title}</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay - Always visible but stronger on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Rating Badge */}
          {rating > 0 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm transition-transform duration-300 transform group-hover:scale-110 border border-yellow-500/30">
              <div className="flex items-center space-x-1">
                <StarSolidIcon className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs font-bold">{rating.toFixed(1)}</span>
              </div>
            </div>
          )}
          
          {/* TV Show Badge */}
          <div className="absolute top-3 left-3 bg-blue-600/80 text-white px-2 py-0.5 rounded-md backdrop-blur-sm text-xs font-semibold">
            TV
          </div>

          {/* Action Buttons - Show on hover with fade in */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-3">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/tv-shows/${show.id}`;
                }}
                className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-all duration-200 transform hover:scale-110 shadow-lg cursor-pointer"
                title="Watch TV Show"
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
                className="bg-gray-800/90 text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg backdrop-blur-sm"
                title="Add to Favorites"
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              <button 
                className="bg-gray-800/90 text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg backdrop-blur-sm"
                title="Add to Watchlist"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* TV Show Details - Show at bottom with improved visibility */}
          {showDetails && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
              <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-1 group-hover:text-yellow-400 transition-colors duration-200">{title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                <span>{year}</span>
                {show.number_of_seasons && (
                  <span>{show.number_of_seasons} {show.number_of_seasons === 1 ? 'Season' : 'Seasons'}</span>
                )}
              </div>
              {show.genres && show.genres.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  {show.genres.slice(0, 2).map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs backdrop-blur-sm"
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

export default TVShowCard;
