import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon, ListBulletIcon } from '@heroicons/react/24/outline';

interface TVShow {
  id: number;
  title: string;
  poster_path: string;
  first_air_date: string;
  status: string;
  seasons_count: number;
  episodes_count: number;
  [key: string]: unknown;
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

interface TVShowsProps {
  tvshows: PaginatedData<TVShow>;
  [key: string]: unknown;
}

const TVShows: React.FC = () => {
  const { tvshows } = usePage<TVShowsProps>().props;

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
            alt="TV Show poster" 
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
      key: 'first_air_date',
      label: 'First Air Date',
      sortable: true,
      render: (value: unknown) => value && typeof value === 'string' ? new Date(value).toLocaleDateString() : 'N/A'
    },
    {
      key: 'episodes_count',
      label: 'Episodes',
      sortable: true,
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

  const handleDelete = (show: TVShow) => {
    if (confirm(`Are you sure you want to delete "${show.title}"?`)) {
      router.delete(route('admin.tvshows.destroy', show.id));
    }
  };

  // Define actions separately with proper typing
  const tableActions = [
    {
      name: 'Manage Episodes',
      icon: ListBulletIcon,
      onClick: (show: TVShow) => {
        router.visit(route('admin.episodes.index', show.id));
      }
    }
  ];

  return (
    <AdminLayout title="TV Shows">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage TV Shows</h1>
        <Link
          href={route('admin.tvshows.create')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add TV Show
        </Link>
      </div>
      
      <DataTable
        data={tvshows.data}
        columns={columns}
        onDelete={handleDelete}
        actions={tableActions}
      />
    </AdminLayout>
  );
};

export default TVShows;
