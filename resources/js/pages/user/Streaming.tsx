import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ArrowLeftIcon, HeartIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import VideoPlayer from '../../components/users/VideoPlayer';
import Navbar from '../../components/users/Navbar';
import { StreamingPageProps, Movie, TVShow } from '../../types';

const Streaming: React.FC = () => {
  const { movie, isTV = false } = usePage<StreamingPageProps>().props;

  if (!movie) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isTV ? 'TV Show' : 'Movie'} not found</h1>
          <Link href="/" className="text-blue-400 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const dateString = isTV 
    ? (movie as TVShow).first_air_date 
    : (movie as Movie).release_date;
  const year = dateString ? new Date(dateString).getFullYear() : '';
  
  const duration = isTV 
    ? 0 
    : ((movie as Movie).duration || (movie as Movie).runtime || 0);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  const rating = movie.rating || movie.vote_average || 0;
  const description = movie.description || movie.overview || '';
  
  const backLink = isTV ? `/tv-shows/${movie.id}` : `/movies/${movie.id}`;
  const mediaType = isTV ? 'TV Show' : 'Movie';
  
  const title = isTV ? (movie as TVShow).name : (movie as Movie).title;

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="pt-16"> {/* Account for fixed navbar */}
        {/* Video Player */}
        <div className="relative">
          <VideoPlayer
            src={movie.streaming_url || ''}
            poster={movie.backdrop_path}
            title={title}
            className="w-full h-[70vh]"
            controls={true}
          />
          
          {/* Back Button Overlay */}
          <div className="absolute top-6 left-6 z-10">
            <Link
              href={backLink}
              className="flex items-center space-x-2 bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Details</span>
            </Link>
          </div>
        </div>

        {/* Media Information */}
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Media Poster */}
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <img
                  src={movie.poster_path}
                  alt={title}
                  className="w-48 h-72 object-cover rounded-lg mx-auto md:mx-0"
                />
              </div>

              {/* Media Details */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
                  
                  {/* Media Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{rating}</span>
                    </div>
                    <span>{year}</span>
                    {duration > 0 && !isTV && <span>{hours}h {minutes}m</span>}
                    {isTV && (movie as TVShow).number_of_seasons && (
                      <span>{(movie as TVShow).number_of_seasons} Season{(movie as TVShow).number_of_seasons !== 1 ? 's' : ''}</span>
                    )}
                    <span className="px-2 py-1 bg-orange-600 rounded text-sm font-semibold">
                      {mediaType}
                    </span>
                    <div className="flex space-x-2">
                      {movie.genres?.map((genre) => (
                        <span 
                          key={genre.id}
                          className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                      <HeartIcon className="w-5 h-5" />
                      <span>Add to Favorites</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                      <PlusIcon className="w-5 h-5" />
                      <span>Add to Watchlist</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                      <ShareIcon className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    
                    {(movie as Movie).trailer_url && (
                      <a
                        href={(movie as Movie).trailer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        <span>Watch Trailer</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaming;
