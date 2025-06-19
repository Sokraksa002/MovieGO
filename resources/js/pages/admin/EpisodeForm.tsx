import React from 'react';
import { useForm } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FormField, TextInput, Textarea } from '../../components/admins/FormField';

interface Episode {
  id: number;
  name: string;
  still_path: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number;
  overview: string;
}

interface EpisodeFormProps {
  episode: Episode | null;
  tvshowId: number;
  onClose: () => void;
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({ episode, tvshowId, onClose }) => {
  const { data, setData, errors, post, put, processing, progress } = useForm({
    id: episode?.id || '',
    name: episode?.name || '',
    overview: episode?.overview || '',
    still_path: episode?.still_path || '',
    season_number: episode?.season_number || 1,
    episode_number: episode?.episode_number || 1,
    air_date: episode?.air_date || '',
    runtime: episode?.runtime || 30,
    still: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (episode) {
      put(route('admin.episodes.update', [tvshowId, episode.id]), {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      post(route('admin.episodes.store', tvshowId), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('still', file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'name') {
      setData('name', value);
    } else if (name === 'overview') {
      setData('overview', value);
    } else if (name === 'still_path') {
      setData('still_path', value);
    } else if (name === 'season_number') {
      setData('season_number', type === 'number' ? Number(value) : parseInt(value) || 1);
    } else if (name === 'episode_number') {
      setData('episode_number', type === 'number' ? Number(value) : parseInt(value) || 1);
    } else if (name === 'air_date') {
      setData('air_date', value);
    } else if (name === 'runtime') {
      setData('runtime', type === 'number' ? Number(value) : parseInt(value) || 30);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {episode ? 'Edit Episode' : 'Add New Episode'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField label="Episode Title" name="name" required error={errors.name}>
                <TextInput
                  name="name"
                  value={data.name}
                  handleChange={handleChange}
                  required
                />
              </FormField>

              <FormField label="Season" name="season_number" required error={errors.season_number}>
                <TextInput
                  name="season_number"
                  type="number"
                  value={data.season_number}
                  handleChange={handleChange}
                  required
                />
              </FormField>

              <FormField label="Episode" name="episode_number" required error={errors.episode_number}>
                <TextInput
                  name="episode_number"
                  type="number"
                  value={data.episode_number}
                  handleChange={handleChange}
                  required
                />
              </FormField>

              <FormField label="Overview" name="overview" error={errors.overview}>
                <Textarea
                  name="overview"
                  value={data.overview}
                  handleChange={handleChange}
                  rows={5}
                />
              </FormField>
            </div>

            <div>
              <FormField label="Episode Still" name="still_path" error={errors.still_path}>
                <div className="mb-2">
                  {data.still_path && (
                    <img
                      src={data.still ? URL.createObjectURL(data.still as Blob) : data.still_path}
                      alt="Episode still"
                      className="h-32 w-full object-cover rounded"
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="still"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {progress && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                )}
              </FormField>

              <FormField label="Air Date" name="air_date" error={errors.air_date}>
                <TextInput
                  name="air_date"
                  type="date"
                  value={data.air_date}
                  handleChange={handleChange}
                />
              </FormField>

              <FormField label="Runtime (minutes)" name="runtime" error={errors.runtime}>
                <TextInput
                  name="runtime"
                  type="number"
                  value={data.runtime}
                  handleChange={handleChange}
                />
              </FormField>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Saving...' : episode ? 'Update Episode' : 'Add Episode'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EpisodeForm;