import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FormField, TextInput } from '../../components/admins/FormField';
import { useForm } from '@inertiajs/react';

interface Genre {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  [key: string]: unknown;
}

const GenreForm: React.FC<{ 
  genre: Genre | null;
  onClose: () => void;
}> = ({ genre, onClose }) => {
  const { data, setData, errors, post, put, processing } = useForm({
    name: genre?.name || '',
    slug: genre?.slug || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (genre) {
      put(route('admin.genres.update', genre.id), {
        onSuccess: () => onClose(),
      });
    } else {
      post(route('admin.genres.store'), {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{genre ? 'Edit Genre' : 'Add Genre'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField label="Name" name="name" required error={errors.name}>
            <TextInput 
              name="name" 
              value={data.name} 
              handleChange={e => setData('name', e.target.value)} 
              required 
            />
          </FormField>

          <FormField label="Slug" name="slug" error={errors.slug}>
            <TextInput 
              name="slug" 
              value={data.slug} 
              handleChange={e => setData('slug', e.target.value)} 
              placeholder="Leave empty to auto-generate" 
            />
          </FormField>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {processing ? 'Saving...' : genre ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

interface GenresProps {
  genres: PaginatedData<Genre>;
  [key: string]: unknown;
}

const Genres: React.FC = () => {
  const { genres } = usePage<GenresProps>().props;
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'slug', label: 'Slug', sortable: true },
    { 
      key: 'created_at', 
      label: 'Created', 
      sortable: true,
      render: (value: unknown) => typeof value === 'string' ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  const handleAdd = () => {
    setEditingGenre(null);
    setShowForm(true);
  };

  const handleEdit = (genre: Genre) => {
    setEditingGenre(genre);
    setShowForm(true);
  };

  const handleDelete = (genre: Genre) => {
    if (confirm(`Are you sure you want to delete the genre "${genre.name}"?`)) {
      router.delete(route('admin.genres.destroy', genre.id));
    }
  };

  return (
    <AdminLayout title="Genres">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Genres</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Genre
        </button>
      </div>
      
      <DataTable
        data={genres.data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <GenreForm
          genre={editingGenre}
          onClose={() => {
            setShowForm(false);
            setEditingGenre(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Genres;