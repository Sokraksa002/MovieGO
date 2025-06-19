import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import TVShowCard from './TVShowCard';
import { TVShow } from '../../types';

interface TVShowSectionProps {
  title: string;
  shows: TVShow[];
  seeAllLink?: string;
  className?: string;
}

const TVShowSection: React.FC<TVShowSectionProps> = ({ 
  title, 
  shows, 
  seeAllLink, 
  className = '' 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
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

  if (!shows || shows.length === 0) {
    return null;
  }

  return (
    <section className={`px-6 lg:px-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
          {title}
        </h2>
        <div className="flex items-center space-x-4">
          {seeAllLink && (
            <Link
              href={seeAllLink}
              className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors duration-200 hover:underline"
            >
              View All
            </Link>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-200 opacity-75 hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-200 opacity-75 hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Shows Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shows.map((show) => (
            <TVShowCard
              key={show.id}
              show={show}
              className="flex-none w-72"
            />
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default TVShowSection;