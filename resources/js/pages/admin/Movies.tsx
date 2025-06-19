import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import MovieForm from './MovieForm';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  status: string;
  created_at: string;
  [key: string]: unknown;
}

interface Genre {
  id: number;
  name: string;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

interface MoviesProps {
  movies: PaginatedData<Movie>;
  genres?: Genre[];
  [key: string]: unknown;
}

const Movies: React.FC = () => {
  const { movies, genres = [] } = usePage<MoviesProps>().props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingMovie, setViewingMovie] = useState<Movie | null>(null);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'poster_path',
      label: 'Poster',
      sortable: false,
      render: (value: unknown) => (
        value && typeof value === 'string' ? (
          <img 
            src={value} 
            alt="Movie poster" 
            className="h-16 w-12 object-cover rounded" 
          />
        ) : (
          <div className="h-16 w-12 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )
      )
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'release_date',
      label: 'Release Date',
      sortable: true,
      render: (value: unknown) => value && typeof value === 'string' ? new Date(value).toLocaleDateString() : 'N/A'
    },
    {
      key: 'runtime',
      label: 'Runtime',
      sortable: true,
      render: (value: unknown) => value && typeof value === 'number' ? `${value} min` : 'N/A'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: unknown) => {
        if (typeof value !== 'string') return 'N/A';
        return (
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              value === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
  ];

  const handleAdd = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleView = (movie: Movie) => {
    setViewingMovie(movie);
    setIsViewModalOpen(true);
  };

  const handleDelete = (movie: Movie) => {
    if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      router.delete(route('admin.movies.destroy', movie.id));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMovie(null);
  };

  const MovieViewModal = () => {
    if (!viewingMovie) return null;
    
    const movie = viewingMovie;
    const movieGenres = genres.filter(g => movie.genre_ids.includes(g.id));
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h3 className="text-lg font-medium text-gray-900">Movie Details</h3>
            <button 
              onClick={handleCloseViewModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-4">
                {movie.poster_path ? (
                  <img 
                    src={movie.poster_path} 
                    alt={movie.title}
                    className="w-full h-auto rounded shadow"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center rounded">
                    <FilmIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="sm:w-2/3">
                <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Release Date</p>
                    <p>{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Runtime</p>
                    <p>{movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Genres</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {movieGenres.length > 0 ? (
                        movieGenres.map(genre => (
                          <span 
                            key={genre.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {genre.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No genres assigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        movie.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {movie.status.charAt(0).toUpperCase() + movie.status.slice(1)}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Overview</p>
                    <p className="text-sm text-gray-600 mt-1">{movie.overview || 'No overview available.'}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      handleCloseViewModal();
                      handleEdit(movie);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="Movies">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Movies</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Movie
        </button>
      </div>
      
      <DataTable
        data={movies.data}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <MovieForm 
          movie={editingMovie}
          genres={genres}
          onClose={handleCloseForm}
        />
      )}
      
      {isViewModalOpen && <MovieViewModal />}
    </AdminLayout>
  );
};

import { XMarkIcon, FilmIcon } from '@heroicons/react/24/outline';

export default Movies;