import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
  UserIcon, FilmIcon, TvIcon, UsersIcon, 
  ChartBarIcon, TagIcon, ArrowRightOnRectangleIcon as LogoutIcon, 
  Bars3Icon as MenuIcon, XMarkIcon as XIcon 
} from '@heroicons/react/24/outline';

// Define PageProps interface for usePage generic
interface PageProps {
  auth: {
    user: {
      name: string;
      // Add other user properties if needed
    };
    // Add other auth properties if needed
  };
  // Add other props if needed
  [key: string]: unknown;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { auth } = usePage<PageProps>().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.post(route('logout'))
  };

  const navItems = [
    { name: 'Dashboard', icon: ChartBarIcon, route: 'admin.dashboard' },
    { name: 'Movies', icon: FilmIcon, route: 'admin.movies' },
    { name: 'TV Shows', icon: TvIcon, route: 'admin.tvshows' },
    { name: 'Users', icon: UsersIcon, route: 'admin.users' },
    { name: 'Genres', icon: TagIcon, route: 'admin.genres' },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 flex md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed inset-y-0 left-0 z-50 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto md:flex md:flex-col md:static`}>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">MovieGO Admin</span>
          </div>
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={route(item.route)}
              className={`${route().current(item.route) 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center px-4 py-3 text-base font-medium rounded-md`}
            >
              <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-gray-300" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{auth.user.name}</p>
              <button 
                onClick={handleLogout}
                className="text-xs font-medium text-gray-300 group flex items-center mt-1 hover:text-gray-100"
              >
                <LogoutIcon className="mr-1 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow">
          <div className="flex justify-between items-center px-4 py-4 sm:px-6 md:px-8">
            <div className="flex items-center">
              <button
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
          </div>
        </div>
        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;