import React from 'react';
import { usePage } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import { 
  FilmIcon, 
  TvIcon,
  FireIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

interface MediaStats {
  totalMovies: number;
  totalTvShows: number;
  popularMovies: number;
  recentlyAdded: number;
}

interface DashboardProps {
  stats: MediaStats;
  recentMedia: Array<{
    id: number;
    type: 'movie' | 'tvshow';
    title: string;
    poster_path: string;
    created_at: string;
  }>;
}

const Dashboard: React.FC = () => {
  const { stats, recentMedia } = usePage<{ props: DashboardProps }>().props.props;

  const statCards = [
    {
      title: 'Total Movies',
      value: stats.totalMovies,
      icon: FilmIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Total TV Shows',
      value: stats.totalTvShows,
      icon: TvIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Popular Titles',
      value: stats.popularMovies,
      icon: FireIcon,
      color: 'bg-red-500',
    },
    {
      title: 'Recently Added',
      value: stats.recentlyAdded,
      icon: ClockIcon,
      color: 'bg-green-500',
    },
  ];

  return (
    <AdminLayout title="Media Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.title} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{card.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recently Added Media */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recently Added Media</h3>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {recentMedia.map((item) => (
              <li key={`${item.type}-${item.id}`} className="px-4 py-4 flex items-center hover:bg-gray-50">
                <div className="flex-shrink-0 h-16 w-12 mr-4">
                  {item.poster_path ? (
                    <img 
                      src={item.poster_path} 
                      alt={item.title}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded">
                      {item.type === 'movie' ? (
                        <FilmIcon className="h-6 w-6 text-gray-400" />
                      ) : (
                        <TvIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.type === 'movie' ? 'Movie' : 'TV Show'} • {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Link
                    href={route(`admin.${item.type === 'movie' ? 'movies.edit' : 'tvshows.edit'}`, item.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

import { Link } from '@inertiajs/react';

export default Dashboard;