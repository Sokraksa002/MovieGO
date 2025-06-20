import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../../components/users/Layout';
import MovieCard from '../../components/users/MovieCard';
import { Movie } from '../../types';
import { PageProps } from '@inertiajs/core';

interface MovieCardTestProps extends PageProps {
  movie: Movie;
}

const MovieCardTest = () => {
  const { movie } = usePage<MovieCardTestProps>().props;
  
  console.log("Movie data:", movie);
  
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Movie Card Debug</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw Movie Data:</h2>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {JSON.stringify(movie, null, 2)}
          </pre>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Movie Card Component:</h2>
          <div className="flex justify-center">
            <MovieCard movie={movie} size="large" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieCardTest;
