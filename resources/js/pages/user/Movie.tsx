import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MovieCard from '../../components/users/MovieCard';
import { Movie, Genre } from '../../types';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface MoviePageProps extends PageProps {
  movies: Movie[];
  popularMovies: Movie[];
  latestMovies: Movie[];
  topRatedMovies: Movie[];
  tvShows: Movie[];
  genres: Genre[];
  error?: string;
}

const MoviePage = () => {
  const { 
    movies = [], 
    popularMovies = [], 
    latestMovies = [], 
    topRatedMovies = [], 
    genres = [],
    error
  } = usePage<MoviePageProps>().props;
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [displayMovies, setDisplayMovies] = useState<Movie[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial loading state
    setIsLoading(true);
    
    // Get the base movie list based on the selected category
    let filteredMovies: Movie[] = [];
    switch (selectedCategory) {
      case 'popular':
        filteredMovies = Array.isArray(popularMovies) ? popularMovies : [];
        break;
      case 'latest':
        filteredMovies = Array.isArray(latestMovies) ? latestMovies : [];
        break;
      case 'topRated':
        filteredMovies = Array.isArray(topRatedMovies) ? topRatedMovies : [];
        break;
      default:
        filteredMovies = Array.isArray(movies) ? movies : [];
    }
    
    // Ensure we only show movies (not TV shows) by checking the type field
    // This is a backup check - the backend should already filter these,
    // but this ensures UI consistency even if backend filtering changes
    filteredMovies = filteredMovies.filter(movie => 
      !movie.type || movie.type === 'movie'
    );
    
    // Apply genre filter if selected
    if (selectedGenre !== null) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genres?.some(genre => genre.id === selectedGenre)
      );
    }
    
    // Update displayed movies
    setDisplayMovies(filteredMovies);
    
    // End loading after a short delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedGenre, movies, popularMovies, latestMovies, topRatedMovies]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
  };
  
  // Handle genre change
  const handleGenreChange = (genreId: string) => {
    setIsLoading(true);
    const parsedId = genreId === 'all' ? null : parseInt(genreId);
    setSelectedGenre(parsedId);
  };

  // Toggle the filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg mb-6">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Movies</h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <button 
                onClick={toggleFilters}
                className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filter</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-800 rounded-lg shadow-lg p-4 z-10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full bg-zinc-700 rounded-md p-2 text-white"
                      >
                        <option value="all">All Movies</option>
                        <option value="popular">Popular</option>
                        <option value="latest">Latest</option>
                        <option value="topRated">Top Rated</option>
                      </select>
                    </div>
                    
                    {genres.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Genre</label>
                        <select 
                          value={selectedGenre === null ? 'all' : selectedGenre.toString()}
                          onChange={(e) => handleGenreChange(e.target.value)}
                          className="w-full bg-zinc-700 rounded-md p-2 text-white"
                        >
                          <option value="all">All Genres</option>
                          {genres.map((genre) => (
                            <option key={genre.id} value={genre.id.toString()}>
                              {genre.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div 
                key={index} 
                className="w-full rounded-lg bg-zinc-800/40 animate-pulse"
                style={{ height: '320px' }}
              />
            ))}
          </div>
        ) : displayMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                size="medium"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No movies found</p>
            <p className="text-gray-500 mt-2">Try changing your filter settings</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MoviePage;