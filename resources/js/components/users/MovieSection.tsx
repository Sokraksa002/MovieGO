import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import MovieCard from './MovieCard';
import { Movie } from '../../types';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
  className?: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({ 
  title, 
  movies, 
  viewAllLink,
  className = '' 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate width of one movie card plus gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <span className="text-sm font-medium">View All</span>
            <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        )}
      </div>

      {/* Movies Container */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 backdrop-blur-sm"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 backdrop-blur-sm"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Movies Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-6 lg:px-8 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none">
              <MovieCard 
                movie={movie} 
                size="medium"
                showDetails={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;