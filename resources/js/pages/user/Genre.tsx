import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MovieCard from '../../components/users/MovieCard';
import { Movie, TVShow, Genre as GenreType } from '../../types';
import { TvIcon, FilmIcon } from '@heroicons/react/24/outline';

interface GenrePageProps extends PageProps {
  genres: GenreType[];
  movies: Movie[];
  tvShows: TVShow[];
  allMedia: (Movie | TVShow)[];
  currentGenre?: GenreType;
  error?: string;
}

type MediaType = 'all' | 'movies' | 'tvshows';

const Genre: React.FC = () => {
  const { genres = [], movies = [], tvShows = [], allMedia = [], currentGenre, error } = usePage<GenrePageProps>().props;
  
  const selectedGenreId = currentGenre ? currentGenre.id : null;
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [displayMedia, setDisplayMedia] = useState<(Movie | TVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial loading state
    setIsLoading(true);
    
    // Initialize with all media if no genre is selected
    let filteredMedia: (Movie | TVShow)[] = [];
    
    if (selectedGenreId === null) {
      // No genre selected, show all media based on media type
      switch (mediaType) {
        case 'movies':
          filteredMedia = [...movies];
          break;
        case 'tvshows':
          filteredMedia = [...tvShows];
          break;
        default:
          filteredMedia = [...allMedia];
      }
    } else {
      // Genre is selected, filter by genre and media type
      const mediaWithGenre = allMedia.filter(item => 
        item.genres?.some(g => g.id === selectedGenreId)
      );
      
      switch (mediaType) {
        case 'movies':
          filteredMedia = mediaWithGenre.filter(item => item.type === 'movie');
          break;
        case 'tvshows':
          filteredMedia = mediaWithGenre.filter(item => item.type === 'tv_show' || item.type === 'tv');
          break;
        default:
          filteredMedia = mediaWithGenre;
      }
    }
    
    // Update displayed media
    setDisplayMedia(filteredMedia);
    
    // End loading after a short delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedGenreId, mediaType, allMedia, movies, tvShows]);

  // Handle media type change
  const handleMediaTypeChange = (type: MediaType) => {
    setIsLoading(true);
    setMediaType(type);
  };

  // Get current genre name
  const currentGenreName = selectedGenreId !== null 
    ? genres.find(g => g.id === selectedGenreId)?.name || 'Unknown Genre'
    : 'All Genres';

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {selectedGenreId !== null ? `${currentGenreName}` : 'Browse by Genre'}
          </h1>
          
          <div className="flex space-x-4">
            <div className="flex bg-zinc-800 rounded-lg overflow-hidden">
              <button 
                className={`px-4 py-2 flex items-center gap-2 ${mediaType === 'all' ? 'bg-zinc-700' : 'hover:bg-zinc-700'}`}
                onClick={() => handleMediaTypeChange('all')}
              >
                <span>All</span>
              </button>
              <button 
                className={`px-4 py-2 flex items-center gap-2 ${mediaType === 'movies' ? 'bg-zinc-700' : 'hover:bg-zinc-700'}`}
                onClick={() => handleMediaTypeChange('movies')}
              >
                <FilmIcon className="w-4 h-4" />
                <span>Movies</span>
              </button>
              <button 
                className={`px-4 py-2 flex items-center gap-2 ${mediaType === 'tvshows' ? 'bg-zinc-700' : 'hover:bg-zinc-700'}`}
                onClick={() => handleMediaTypeChange('tvshows')}
              >
                <TvIcon className="w-4 h-4" />
                <span>TV Shows</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Genre Pills */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Link
            href="/genres"
            className={`px-4 py-2 rounded-full ${selectedGenreId === null ? 'bg-orange-600 text-white font-bold' : 'bg-zinc-800 text-white'} hover:bg-orange-500 transition-colors`}
          >
            All Genres
          </Link>
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className={`px-4 py-2 rounded-full ${selectedGenreId === genre.id ? 'bg-orange-600 text-white font-bold' : 'bg-zinc-800 text-white'} hover:bg-orange-500 transition-colors`}
            >
              {genre.name}
            </Link>
          ))}
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
        ) : displayMedia.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayMedia.map((media) => (
              <MovieCard 
                key={media.id} 
                movie={media} 
                size="medium"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No media found</p>
            <p className="text-gray-500 mt-2">Try selecting a different genre or media type</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Genre;