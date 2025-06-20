import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, TvIcon } from '@heroicons/react/24/outline';

interface TVShow {
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
  first_air_date: string;
  last_air_date: string;
  status: string;
  seasons_count: number;
  episodes_count: number;
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

interface TVShowsProps {
  tvshows: PaginatedData<TVShow>;
  genres?: Genre[];
  [key: string]: unknown;
}

const TVShows: React.FC = () => {
  const { tvshows, genres = [] } = usePage<TVShowsProps>().props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<TVShow | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingShow, setViewingShow] = useState<TVShow | null>(null);

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
            alt="TV Show poster" 
            className="h-16 w-12 object-cover rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default-avatar.svg';
            }}
          />
        ) : (
          <div className="h-16 w-12 bg-gray-200 flex items-center justify-center rounded">
            <TvIcon className="h-6 w-6 text-gray-400" />
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
      key: 'seasons_count',
      label: 'Seasons',
      sortable: true,
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
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'returning': return 'bg-green-100 text-green-800';
            case 'ended': return 'bg-gray-100 text-gray-800';
            case 'canceled': return 'bg-red-100 text-red-800';
            case 'in_production': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
          }
        };
        return (
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}
          >
            {value.replace('_', ' ').charAt(0).toUpperCase() + value.replace('_', ' ').slice(1)}
          </span>
        );
      }
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
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
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
    setEditingShow(null);
    setIsFormOpen(true);
  };

  const handleEdit = (show: TVShow) => {
    setEditingShow(show);
    setIsFormOpen(true);
  };

  const handleView = (show: TVShow) => {
    setViewingShow(show);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (show: TVShow) => {
    if (confirm(`Are you sure you want to delete "${show.title}"?`)) {
      router.delete(`/admin/tvshows/${show.id}`, {
        onSuccess: () => {
          // TV show deleted successfully
        },
        onError: () => {
          alert('Failed to delete TV show');
        }
      });
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingShow(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingShow(null);
  };

  const TVShowViewModal = () => {
    if (!viewingShow) return null;
    
    const show = viewingShow;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-900">TV Show Details</h3>
            <button 
              onClick={handleCloseViewModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                {show.poster_url ? (
                  <img 
                    src={show.poster_url} 
                    alt={show.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-avatar.svg';
                    }}
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center rounded-lg">
                    <TvIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{show.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">First Air Date</p>
                    <p className="text-gray-900">{show.first_air_date ? new Date(show.first_air_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Last Air Date</p>
                    <p className="text-gray-900">{show.last_air_date ? new Date(show.last_air_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Seasons</p>
                    <p className="text-gray-900">{show.seasons_count || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Episodes</p>
                    <p className="text-gray-900">{show.episodes_count || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                    <p className="text-gray-900 capitalize">{show.status?.replace('_', ' ') || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
                    <p className="text-gray-900">{show.rating ? `${show.rating}/10` : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {show.genres && show.genres.length > 0 ? (
                      show.genres.map((genre: Genre) => (
                        <span 
                          key={genre.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {genre.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No genres assigned</span>
                    )}
                  </div>
                </div>
                
                {show.description && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">{show.description}</p>
                  </div>
                )}
                
                {show.trailer_url && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">Trailer</p>
                    <a 
                      href={show.trailer_url} 
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
                      handleEdit(show);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit TV Show
                  </button>
                  <button
                    onClick={() => {
                      handleCloseViewModal();
                      handleDelete(show);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete TV Show
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TVShowForm = ({ show, genres, onClose }: { show: TVShow | null; genres: Genre[]; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: show?.title || '',
      description: show?.description || '',
      year: show?.year || '',
      rating: show?.rating || '',
      trailer_url: show?.trailer_url || '',
      first_air_date: show?.first_air_date || '',
      last_air_date: show?.last_air_date || '',
      status: show?.status || 'returning',
      seasons_count: show?.seasons_count || '',
      episodes_count: show?.episodes_count || '',
      poster_image: null as File | null,
      backdrop_image: null as File | null,
      genres: show?.genres?.map(g => g.id) || [],
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const submitData = {
          title: formData.title,
          description: formData.description,
          year: parseInt(formData.year),
          rating: parseFloat(formData.rating.toString()),
          trailer_url: formData.trailer_url,
          poster_url: show?.poster_url || '',
          backdrop_url: show?.backdrop_url || '',
          genre_ids: formData.genres,
        };

        if (show) {
          // Update existing TV show
          router.put(`/admin/tvshows/${show.id}`, submitData, {
            onSuccess: () => {
              onClose();
            },
            onError: (errors) => {
              console.error('Validation errors:', errors);
              alert('Failed to update TV show. Please check your input.');
            },
            onFinish: () => {
              setLoading(false);
            }
          });
        } else {
          // Create new TV show
          router.post('/admin/tvshows', submitData, {
            onSuccess: () => {
              onClose();
            },
            onError: (errors) => {
              console.error('Validation errors:', errors);
              alert('Failed to create TV show. Please check your input.');
            },
            onFinish: () => {
              setLoading(false);
            }
          });
        }
      } catch (error) {
        console.error('Error saving TV show:', error);
        alert('Failed to save TV show');
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {show ? 'Edit TV Show' : 'Add New TV Show'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Air Date</label>
                <input
                  type="date"
                  value={formData.first_air_date}
                  onChange={(e) => setFormData({ ...formData, first_air_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Air Date</label>
                <input
                  type="date"
                  value={formData.last_air_date}
                  onChange={(e) => setFormData({ ...formData, last_air_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="returning">Returning</option>
                  <option value="ended">Ended</option>
                  <option value="canceled">Canceled</option>
                  <option value="in_production">In Production</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seasons Count</label>
                <input
                  type="number"
                  min="1"
                  value={formData.seasons_count}
                  onChange={(e) => setFormData({ ...formData, seasons_count: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Episodes Count</label>
                <input
                  type="number"
                  min="1"
                  value={formData.episodes_count}
                  onChange={(e) => setFormData({ ...formData, episodes_count: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trailer URL</label>
              <input
                type="url"
                value={formData.trailer_url}
                onChange={(e) => setFormData({ ...formData, trailer_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3">
                {genres.map((genre) => (
                  <label key={genre.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.genres.includes(genre.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, genres: [...formData.genres, genre.id] });
                        } else {
                          setFormData({ ...formData, genres: formData.genres.filter(id => id !== genre.id) });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{genre.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poster Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, poster_image: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backdrop Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, backdrop_image: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : show ? 'Update TV Show' : 'Create TV Show'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="TV Shows">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage TV Shows</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add TV Show
        </button>
      </div>
      
      <DataTable
        data={tvshows.data}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <TVShowForm 
          show={editingShow}
          genres={genres}
          onClose={handleCloseForm}
        />
      )}
      
      {isViewModalOpen && <TVShowViewModal />}
    </AdminLayout>
  );
};

export default TVShows;
