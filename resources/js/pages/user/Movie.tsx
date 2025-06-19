import React from 'react';

const Movie: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <p className="text-gray-600">Movie content will be displayed here.</p>
      </div>
    </div>
  );
};

export default Movie;
