import React, { useState, useEffect } from 'react';
import { PlayIcon, InformationCircleIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { Movie } from '../../types';

interface BannerProps {
  featuredMovies?: Movie[];
}

const Banner: React.FC<BannerProps> = ({ featuredMovies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default movies if none provided
  const defaultMovies: Movie[] = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their planet.",
      poster_path: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
      release_date: "2022-12-16",
      duration: 192,
      rating: 8.7,
      genres: [{ id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 3, name: "Sci-Fi" }],
      trailer_url: "https://www.youtube.com/embed/a8Gx8wiNbs8",
      streaming_url: "/stream/1"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      poster_path: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
      release_date: "2022-05-27",
      duration: 130,
      rating: 8.9,
      genres: [{ id: 1, name: "Action" }, { id: 4, name: "Drama" }],
      trailer_url: "https://www.youtube.com/embed/giXco2jaZ_4",
      streaming_url: "/stream/2"
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
      poster_path: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
      release_date: "2022-11-11",
      duration: 161,
      rating: 8.2,
      genres: [{ id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 5, name: "Superhero" }],
      trailer_url: "https://www.youtube.com/embed/_Z3QKkl1WyM",
      streaming_url: "/stream/3"
    }
  ];

  const movies = featuredMovies.length > 0 ? featuredMovies : defaultMovies;
  const currentMovie = movies[currentIndex];

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const handlePlayClick = () => {
    // Here you would implement actual video streaming
    if (currentMovie.streaming_url) {
      window.location.href = currentMovie.streaming_url;
    }
  };

  const handleWatchTrailer = () => {
    // If movie has a trailer URL, use it
    if (currentMovie.trailer_url) {
      window.open(currentMovie.trailer_url, '_blank');
    } else {
      // Fallback: Search for trailer on YouTube
      const searchQuery = encodeURIComponent(`${currentMovie.title} trailer ${new Date(currentMovie.release_date).getFullYear()}`);
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out transform scale-105"
        style={{
          backgroundImage: `url(${currentMovie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            {/* Movie Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {currentMovie.title}
              </h1>
              
              {/* Movie Info */}
              <div className="flex items-center space-x-6 text-sm md:text-base text-gray-300">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{currentMovie.rating}</span>
                </div>
                <span>{new Date(currentMovie.release_date).getFullYear()}</span>
                {currentMovie.duration && (
                  <span>{Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m</span>
                )}
                <div className="hidden md:flex space-x-2">
                  {currentMovie.genres?.slice(0, 2).map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
              {currentMovie.description || currentMovie.overview || 'No description available.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={handlePlayClick}
                className="flex items-center justify-center space-x-3 bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
              >
                <PlayIcon className="w-6 h-6" />
                <span>Play Now</span>
              </button>
              
              <button
                onClick={handleWatchTrailer}
                className="flex items-center justify-center space-x-3 bg-gray-600/70 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
              >
                <InformationCircleIcon className="w-6 h-6" />
                <span>Watch Trailer</span>
              </button>

              <div className="flex space-x-3">
                <button className="bg-gray-800/70 text-white p-4 rounded-full hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm">
                  <PlusIcon className="w-6 h-6" />
                </button>
                <button className="bg-gray-800/70 text-white p-4 rounded-full hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm">
                  <HeartIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 left-6 lg:left-8 flex space-x-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => prevIndex === 0 ? movies.length - 1 : prevIndex - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 backdrop-blur-sm z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 backdrop-blur-sm z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Banner;