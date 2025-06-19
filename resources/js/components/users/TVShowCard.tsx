import React from 'react';
import { Link } from '@inertiajs/react';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { TVShow } from '../../types';

interface TVShowCardProps {
  show: TVShow;
  className?: string;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ show, className = '' }) => {
  const posterUrl = show.poster_path 
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : '/placeholder-poster.jpg';

  const rating = show.vote_average ? Math.round(show.vote_average * 10) / 10 : 0;
  const year = show.first_air_date ? new Date(show.first_air_date).getFullYear() : '';

  return (
    <div className={`group relative bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={show.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Link
            href={`/tv-shows/${show.id}`}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <PlayIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Watch</span>
          </Link>
          <Link
            href={`/tv-shows/${show.id}`}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <InformationCircleIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Show Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-orange-400 transition-colors duration-200">
          {show.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{year}</span>
          <span className="bg-zinc-700 px-2 py-1 rounded text-xs">TV</span>
        </div>
        
        {show.overview && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-2">
            {show.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default TVShowCard;
