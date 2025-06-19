import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PlayIcon, StarIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import { TVShowDetailPageProps, TVShow } from '../../types';

const TVShowDetail: React.FC = () => {
  const { id } = usePage<TVShowDetailPageProps>().props;
  
  // Mock data - replace with real data from backend
  const tvShow: TVShow = {
    id: parseInt(id),
    name: "Squid Game",
    poster_path: "/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
    backdrop_path: "/backdrop.jpg",
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    first_air_date: "2021-09-17",
    genres: [
      { id: 1, name: "Thriller" },
      { id: 2, name: "Drama" },
      { id: 3, name: "Mystery" }
    ],
    vote_average: 8.7,
    number_of_episodes: 9,
    number_of_seasons: 1,
    status: "Released",
    original_language: "ko"
  };

  const posterUrl = tvShow.poster_path 
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : '/placeholder-poster.jpg';
    
  const backdropUrl = tvShow.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
    : '/placeholder-backdrop.jpg';

  const rating = tvShow.vote_average ? Math.round(tvShow.vote_average * 10) / 10 : 0;
  const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : '';

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div className="h-[70vh] relative overflow-hidden">
          <img
            src={backdropUrl}
            alt={tvShow.name}
            className="w-full h-full object-cover"
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
                alt={tvShow.name}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 flex flex-col justify-end pb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                {tvShow.name}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-5 h-5" />
                  <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                </div>
                <span className="bg-green-600 px-2 py-1 rounded text-xs font-semibold">
                  {tvShow.status}
                </span>
              </div>
              
              {/* Genres */}
              <div className="flex gap-2 mb-6">
                {tvShow.genres?.map((genre) => (
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
                {tvShow.overview}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href={`/tv-shows/${tvShow.id}/stream`}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200"
                >
                  <PlayIcon className="w-6 h-6" />
                  Watch Now
                </Link>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200">
                  <HeartOutline className="w-6 h-6" />
                  Add to Favorites
                </button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 font-semibold transition-colors duration-200">
                  <BookmarkOutline className="w-6 h-6" />
                  Watchlist
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
                    {tvShow.number_of_seasons}
                  </div>
                  <div className="text-gray-400">Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center p-4 bg-zinc-800 rounded-lg">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {tvShow.number_of_episodes}
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
                <p className="text-white">{tvShow.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">First Air Date</h3>
                <p className="text-white">{tvShow.first_air_date}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Original Language</h3>
                <p className="text-white uppercase">{tvShow.original_language}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Genres</h3>
                <p className="text-white">{tvShow.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
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