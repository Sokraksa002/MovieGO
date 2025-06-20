import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, FilmIcon } from '@heroicons/react/24/outline';

interface Movie {
  id: number;
  title: string;
  description: string;
  year: string;
  duration: number;
  type: string;
  poster_url: string;
  backdrop_url: string;
  trailer_url: string;
  rating: number;
  created_at: string;
  updated_at: string;
  genres: Genre[];
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
      key: 'poster_url',
      label: 'Poster',
      sortable: false,
      render: (value: unknown) => (
        value && typeof value === 'string' ? (
          <img 
            src={value} 
            alt="Movie poster" 
            className="h-16 w-12 object-cover rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-poster.svg';
            }}
          />
        ) : (
          <div className="h-16 w-12 bg-gray-200 flex items-center justify-center rounded">
            <FilmIcon className="h-6 w-6 text-gray-400" />
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
      key: 'year',
      label: 'Year',
      sortable: true,
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      render: (value: unknown) => value && typeof value === 'number' ? `${value} min` : 'N/A'
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value: unknown) => value && typeof value === 'number' ? `${value}/10` : 'N/A'
    },
    {
      key: 'genres',
      label: 'Genres',
      sortable: false,
      render: (value: unknown) => {
        if (Array.isArray(value) && value.length > 0) {
          return (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 2).map((genre: Genre) => (
                <span 
                  key={genre.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {genre.name}
                </span>
              ))}
              {value.length > 2 && (
                <span className="text-xs text-gray-500">+{value.length - 2} more</span>
              )}
            </div>
          );
        }
        return <span className="text-gray-500 text-sm">No genres</span>;
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

  const handleDelete = async (movie: Movie) => {
    if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      router.delete(`/admin/movies/${movie.id}`, {
        onSuccess: () => {
          // Movie deleted successfully
        },
        onError: () => {
          alert('Failed to delete movie');
        }
      });
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
      
      <div className="bg-white shadow rounded-lg">
        <DataTable
          data={movies}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
              </h3>
              <button onClick={handleCloseForm} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                {editingMovie ? 'Update movie details below.' : 'Create a new movie by filling out the form below.'}
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  {editingMovie ? 'Update Movie' : 'Create Movie'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && viewingMovie && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">Movie Details</h3>
              <button onClick={handleCloseViewModal} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  {viewingMovie.poster_url ? (
                    <img 
                      src={viewingMovie.poster_url} 
                      alt={viewingMovie.title}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-poster.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                      <FilmIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{viewingMovie.title}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="text-gray-900">{viewingMovie.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-gray-900">{viewingMovie.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rating</p>
                      <p className="text-gray-900">{viewingMovie.rating}/10</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Genres</p>
                      <div className="flex flex-wrap gap-1">
                        {viewingMovie.genres.map((genre) => (
                          <span 
                            key={genre.id}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {viewingMovie.description && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700 leading-relaxed">{viewingMovie.description}</p>
                    </div>
                  )}
                  {viewingMovie.trailer_url && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-2">Trailer</p>
                      <a 
                        href={viewingMovie.trailer_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Watch Trailer
                      </a>
                    </div>
                  )}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        handleCloseViewModal();
                        handleEdit(viewingMovie);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit Movie
                    </button>
                    <button
                      onClick={() => {
                        handleCloseViewModal();
                        handleDelete(viewingMovie);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete Movie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Movies;
