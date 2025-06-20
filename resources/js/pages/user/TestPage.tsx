import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import MovieCard from '../../components/users/MovieCard';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import { Movie } from '../../types';
import { PageProps } from '@inertiajs/core';

interface TestProps extends PageProps {
  movies: Movie[];
}

const TestPage: React.FC = () => {
  const { movies = [] } = usePage<TestProps>().props;

  useEffect(() => {
    console.log('Test Page Props:', { movies });
  }, [movies]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Movie Cards Test Page</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Debug Info:</h2>
          <div className="bg-gray-800 p-4 rounded">
            <p>Number of movies: {movies.length}</p>
          </div>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="bg-red-900/50 border border-red-700 p-6 rounded text-center">
            <p className="text-xl">No movies found in the database.</p>
            <p className="mt-2 text-gray-300">Check your database connection or ensure movies have been added to the database.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TestPage;
