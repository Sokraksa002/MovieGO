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
    allMovies = []
  } = usePage<HomePageProps>().props;

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <Banner featuredMovies={featuredMovies} />
      
      {/* Content Sections */}
      <main className="bg-black py-8">
        <div className="space-y-12">
          {/* Popular Movies */}
          {popularMovies.length > 0 && (
            <MovieSection
              title="Popular Movies"
              movies={popularMovies}
              viewAllLink="/movies/popular"
            />
          )}

          {/* Latest Movies */}
          {latestMovies.length > 0 && (
            <MovieSection
              title="Latest Movies"
              movies={latestMovies}
              viewAllLink="/movies/latest"
            />
          )}

          {/* All Movies */}
          {allMovies.length > 0 && (
            <MovieSection
              title="All Movies"
              movies={allMovies}
              viewAllLink="/movies"
            />
          )}

          {/* Popular TV Shows */}
          {popularTVShows.length > 0 && (
            <TVShowSection
              title="Popular TV Shows"
              shows={popularTVShows}
              seeAllLink="/tv-shows"
            />
          )}
          
          {/* No Movies Found Message */}
          {!featuredMovies.length && !popularMovies.length && !latestMovies.length && 
           !popularTVShows.length && !allMovies.length && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-400 mb-4">No Movies or TV Shows Found</h2>
              <p className="text-gray-500">
                This could be due to an empty database or a connection issue.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;