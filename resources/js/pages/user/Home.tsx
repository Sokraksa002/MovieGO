import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../../components/users/Navbar';
import Banner from '../../components/users/Banner';
import MovieSection from '../../components/users/MovieSection';
import TVShowSection from '../../components/users/TVShowSection';
import Footer from '../../components/users/Footer';
import { HomePageProps } from '../../types';

const Home: React.FC = () => {
  const { 
    featuredMovies = [], 
    popularMovies = [], 
    latestMovies = [], 
    popularTVShows = [],
    trendingToday = []
  } = usePage<HomePageProps>().props;

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <Banner featuredMovies={featuredMovies} />
      
      {/* Content Sections */}
      <main className="relative -mt-32 z-10">
        {/* Trending Today */}
        {trendingToday.length > 0 && (
          <MovieSection
            title="Trending Today"
            movies={trendingToday}
            viewAllLink="/trending"
            className="mb-8"
          />
        )}

        {/* Popular Movies */}
        {popularMovies.length > 0 && (
          <MovieSection
            title="Popular Movies"
            movies={popularMovies}
            viewAllLink="/movies/popular"
            className="mb-8"
          />
        )}

        {/* Latest Movies */}
        {latestMovies.length > 0 && (
          <MovieSection
            title="Latest Releases"
            movies={latestMovies}
            viewAllLink="/movies/latest"
            className="mb-8"
          />
        )}

        {/* Popular TV Shows */}
        {popularTVShows.length > 0 && (
          <TVShowSection
            title="Popular TV Shows"
            shows={popularTVShows}
            seeAllLink="/tv-shows"
            className="mb-8"
          />
        )}

        {/* Continue Watching - Only show for authenticated users */}
        <section className="py-8 mb-8">
          <div className="px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Continue Watching</h2>
            <div className="text-gray-400 text-center py-12">
              <div className="text-6xl mb-4">📺</div>
              <p>Start watching something to see it here</p>
            </div>
          </div>
        </section>

        {/* Your Watchlist - Only show for authenticated users */}
        <section className="py-8 mb-8">
          <div className="px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">My Watchlist</h2>
            <div className="text-gray-400 text-center py-12">
              <div className="text-6xl mb-4">💾</div>
              <p>Add movies and shows to your watchlist to see them here</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;