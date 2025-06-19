import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import EpisodeForm from './EpisodeForm';

interface Episode {
  id: number;
  name: string;
  still_path: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number;
  overview: string;
  [key: string]: unknown; // Add index signature for compatibility with BaseItem
}

interface TVShow {
  id: number;
  title: string;
}

const Episodes: React.FC = () => {
  const { episodes, tvshow } = usePage<{ props: { episodes: Episode[], tvshow: TVShow } }>().props.props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

  const columns = [
    {
      key: 'still_path',
      label: 'Still',
      sortable: false,
      render: (value: unknown) => (
        value && typeof value === 'string' ? (
          <img 
            src={value} 
            alt="Episode still" 
            className="h-12 w-20 object-cover rounded" 
          />
        ) : (
          <div className="h-12 w-20 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )
      )
    },
    {
      key: 'season_number',
      label: 'Season',
      sortable: true,
    },
    {
      key: 'episode_number',
      label: 'Episode',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'air_date',
      label: 'Air Date',
      sortable: true,
      render: (value: unknown) => 
        value && typeof value === 'string' 
          ? new Date(value).toLocaleDateString() 
          : 'N/A'
    },
    {
      key: 'runtime',
      label: 'Runtime',
      sortable: true,
      render: (value: unknown) => 
        value && typeof value === 'number' 
          ? `${value} min` 
          : 'N/A'
    },
  ];

  const handleAdd = () => {
    setEditingEpisode(null);
    setIsFormOpen(true);
  };

  const handleEdit = (episode: Episode) => {
    setEditingEpisode(episode);
    setIsFormOpen(true);
  };

  const handleDelete = (episode: Episode) => {
    if (confirm(`Are you sure you want to delete "${episode.name}"?`)) {
      router.delete(route('admin.episodes.destroy', [tvshow.id, episode.id]));
    }
  };

  return (
    <AdminLayout title={`Episodes - ${tvshow.title}`}>
      <div className="mb-6">
        <Link
          href={route('admin.tvshows.index')}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back to TV Shows
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Episodes</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Episode
        </button>
      </div>
      
      <DataTable
        data={episodes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <EpisodeForm 
          episode={editingEpisode}
          tvshowId={tvshow.id}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEpisode(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

import { Link } from '@inertiajs/react';

export default Episodes;