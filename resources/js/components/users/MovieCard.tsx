import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { PlayIcon, HeartIcon, PlusIcon, StarIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  size = 'medium', 
  showDetails = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-40 h-60',
    medium: 'w-48 h-72',
    large: 'w-56 h-80'
  };

  const rating = movie.vote_average || movie.rating || 0;
  const year = new Date(movie.release_date).getFullYear();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // Here you would implement actual favorite functionality
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to movie detail or streaming page
    window.location.href = `/movies/${movie.id}`;
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If movie has a trailer URL, use it
    if (movie.trailer_url) {
      window.open(movie.trailer_url, '_blank');
    } else {
      // Fallback: Search for trailer on YouTube
      const searchQuery = encodeURIComponent(`${movie.title} trailer ${year}`);
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  return (
    <div 
      className={`group relative ${sizeClasses[size]} ${className} rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${movie.id}`} className="block h-full">
        {/* Movie Poster */}
        <div className="relative h-full bg-gray-800">
          {!imageError ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-sm font-medium">{movie.title}</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          {rating > 0 && (
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium">{rating.toFixed(1)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons - Only show on hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-3">
              <button
                onClick={handlePlayClick}
                className="bg-white/90 text-black p-3 rounded-full hover:bg-white transition-colors duration-200 transform hover:scale-110"
                title="Play Movie"
              >
                <PlayIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleTrailerClick}
                className="bg-red-600/90 text-white p-3 rounded-full hover:bg-red-600 transition-colors duration-200 transform hover:scale-110"
                title="Watch Trailer"
              >
                <InformationCircleIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleFavoriteClick}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors duration-200 transform hover:scale-110 backdrop-blur-sm"
                title="Add to Favorites"
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              <button 
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors duration-200 transform hover:scale-110 backdrop-blur-sm"
                title="Add to Watchlist"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Movie Details - Show on hover */}
          {showDetails && isHovered && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{movie.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>{year}</span>
                {movie.duration && (
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                )}
              </div>
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-2 py-1 bg-white/20 rounded-full text-xs"
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
