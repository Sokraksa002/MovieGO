import React from 'react';
import { useForm } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FormField, TextInput, Textarea, Select } from '../../components/admins/FormField';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  status: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieFormProps {
  movie: Movie | null;
  genres: Genre[];
  onClose: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, genres, onClose }) => {
  const { data, setData, errors, post, put, processing, progress } = useForm({
    id: movie?.id || '',
    title: movie?.title || '',
    overview: movie?.overview || '',
    poster_path: movie?.poster_path || '',
    release_date: movie?.release_date || '',
    runtime: movie?.runtime || 90,
    genre_ids: movie?.genre_ids || [],
    status: movie?.status || 'draft',
    poster: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (movie) {
      put(route('admin.movies.update', movie.id), {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      post(route('admin.movies.store'), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('poster', file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'title') {
      setData('title', value);
    } else if (name === 'overview') {
      setData('overview', value);
    } else if (name === 'poster_path') {
      setData('poster_path', value);
    } else if (name === 'release_date') {
      setData('release_date', value);
    } else if (name === 'runtime') {
      setData('runtime', type === 'number' ? Number(value) : parseInt(value) || 0);
    } else if (name === 'status') {
      setData('status', value);
    }
  };

  const handleGenreChange = (genreId: number) => {
    const currentGenres = [...data.genre_ids];
    const index = currentGenres.indexOf(genreId);
    
    if (index === -1) {
      const newGenres = [...currentGenres, genreId];
      setData('genre_ids', newGenres);
    } else {
      currentGenres.splice(index, 1);
      setData('genre_ids', currentGenres);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-medium">{movie ? 'Edit Movie' : 'Add New Movie'}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <FormField label="Title" name="title" required error={errors.title}>
                <TextInput
                  name="title"
                  value={data.title}
                  handleChange={handleChange}
                  required
                />
              </FormField>
            </div>
            
            <div className="sm:col-span-2">
              <FormField label="Release Date" name="release_date" required error={errors.release_date}>
                <TextInput
                  type="date"
                  name="release_date"
                  value={data.release_date}
                  handleChange={handleChange}
                  required
                />
              </FormField>
            </div>
            
            <div className="sm:col-span-6">
              <FormField label="Overview" name="overview" error={errors.overview}>
                <Textarea
                  name="overview"
                  value={data.overview}
                  handleChange={handleChange}
                  rows={4}
                />
              </FormField>
            </div>
            
            <div className="sm:col-span-3">
              <FormField label="Poster Image" name="poster_path" error={errors.poster_path}>
                <div className="mt-1 flex items-center">
                  {data.poster_path && (
                    <div className="mr-3">
                      <img 
                        src={data.poster_path} 
                        alt="Movie poster" 
                        className="h-24 w-24 object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <TextInput
                      name="poster_path"
                      value={data.poster_path}
                      handleChange={handleChange}
                      placeholder="Enter URL or upload"
                      className="mb-2"
                    />
                    <input
                      type="file"
                      onChange={handlePosterUpload}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    {progress && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </FormField>
            </div>
            
            <div className="sm:col-span-1">
              <FormField label="Runtime (min)" name="runtime" error={errors.runtime}>
                <TextInput
                  type="number"
                  name="runtime"
                  value={data.runtime}
                  handleChange={handleChange}
                />
              </FormField>
            </div>
            
            <div className="sm:col-span-2">
              <FormField label="Status" name="status" error={errors.status}>
                <Select
                  name="status"
                  value={data.status}
                  handleChange={handleChange}
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' },
                  ]}
                />
              </FormField>
            </div>
            
            <div className="sm:col-span-6">
              <FormField label="Genres" name="genre_ids" error={errors.genre_ids}>
                <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {genres.map(genre => (
                    <div key={genre.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`genre-${genre.id}`}
                        value={genre.id}
                        checked={data.genre_ids.includes(genre.id)}
                        onChange={() => handleGenreChange(genre.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`genre-${genre.id}`} className="ml-2 block text-sm text-gray-900">
                        {genre.name}
                      </label>
                    </div>
                  ))}
                </div>
              </FormField>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {processing ? 'Saving...' : movie ? 'Update Movie' : 'Create Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;