import React, { useState } from 'react';
import { usePage, useForm, Link, router } from '@inertiajs/react';
import axios from 'axios';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MovieCard from '../../components/users/MovieCard';
import { 
  CalendarIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  UserIcon, 
  ClockIcon,
  FilmIcon,
  BookmarkIcon,
  HeartIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { ProfilePageProps, SharedData } from '../../types';

type TabType = 'profile' | 'favorites' | 'watchlist' | 'history';
type EditMode = 'none' | 'basic' | 'password';

const Profile: React.FC = () => {
  const { auth } = usePage<SharedData>().props;
  const { favorites = [], watchlist = [], watchHistory = [] } = usePage<ProfilePageProps>().props;
  
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [editMode, setEditMode] = useState<EditMode>('none');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form for basic profile information
  const { data: basicData, setData: setBasicData, errors: basicErrors, processing: basicProcessing } = useForm({
    name: auth.user.name,
    email: auth.user.email,
  });

  // Form for password change
  const { data: passwordData, setData: setPasswordData, errors: passwordErrors, processing: passwordProcessing, reset: resetPasswordForm } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  // Handle profile update
  const handleProfileUpdate = async () => {
    setFormError(null);
    setFormSuccess(null);
    
    try {
      // Update profile based on edit mode
      if (editMode === 'basic') {
        await axios.put('/api/profile', basicData);
        setFormSuccess('Profile updated successfully!');
        
        // Update auth user data in memory
        auth.user.name = basicData.name;
        auth.user.email = basicData.email;
        
        setEditMode('none');
      } else if (editMode === 'password') {
        await axios.put('/api/profile', {
          ...passwordData,
          name: auth.user.name,
          email: auth.user.email
        });
        setFormSuccess('Password updated successfully!');
        setEditMode('none');
        resetPasswordForm();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setFormError(error.response.data.message || 'Something went wrong. Please try again.');
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) return;
    
    setFormError(null);
    
    try {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // Not yet implemented - would need a backend route
        // await axios.delete('/api/profile');
        // window.location.href = '/';
        setFormError('Account deletion not implemented yet. Please contact support.');
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setFormError(error.response.data.message || 'Failed to delete account. Please try again.');
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('Failed to delete account. Please try again.');
      }
    }
  };

  // Handle refreshing profile data
  const refreshProfileData = () => {
    router.reload({ only: ['favorites', 'watchlist', 'watchHistory'] });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-zinc-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src="/default-avatar.svg" 
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full border-2 border-orange-400 mb-4"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNjM2NmYxIi8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjZmZmZmZmIi8+CjxlbGxpcHNlIGN4PSI3NSIgY3k9IjEyNSIgcng9IjQ1IiByeT0iMzAiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+';
                    }}
                  />
                  <h2 className="text-xl font-bold">{auth.user.name}</h2>
                  <p className="text-gray-400 text-sm">{auth.user.email}</p>
                </div>
                
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => {
                          setActiveTab('profile');
                          setEditMode('none');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>Profile</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('favorites')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${activeTab === 'favorites' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                      >
                        <HeartIcon className="w-5 h-5" />
                        <span>Favorites</span>
                        <span className="ml-auto bg-zinc-700 text-xs px-2 py-1 rounded-full">{favorites.length}</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('watchlist')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${activeTab === 'watchlist' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                      >
                        <BookmarkIcon className="w-5 h-5" />
                        <span>Watchlist</span>
                        <span className="ml-auto bg-zinc-700 text-xs px-2 py-1 rounded-full">{watchlist.length}</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('history')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${activeTab === 'history' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
                      >
                        <ClockIcon className="w-5 h-5" />
                        <span>Watch History</span>
                        <span className="ml-auto bg-zinc-700 text-xs px-2 py-1 rounded-full">{watchHistory.length}</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-zinc-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile Information</h1>
                    {editMode === 'none' && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setEditMode('basic')}
                          className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit Profile
                        </button>
                        <button 
                          onClick={() => setEditMode('password')}
                          className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-lg transition-colors"
                        >
                          <KeyIcon className="w-4 h-4" />
                          Change Password
                        </button>
                      </div>
                    )}
                    {editMode !== 'none' && (
                      <div className="flex gap-3">
                        <button 
                          onClick={handleProfileUpdate}
                          disabled={basicProcessing || passwordProcessing}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
                        >
                          <CheckIcon className="w-4 h-4" />
                          Save
                        </button>
                        <button 
                          onClick={() => setEditMode('none')}
                          className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-lg transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {formError && (
                    <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg mb-6">
                      <p className="font-medium">{formError}</p>
                    </div>
                  )}
                  
                  {formSuccess && (
                    <div className="bg-green-900/50 border border-green-500 text-white p-4 rounded-lg mb-6">
                      <p className="font-medium">{formSuccess}</p>
                    </div>
                  )}
                  
                  {/* Basic Profile Info */}
                  {editMode === 'basic' ? (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={basicData.name}
                          onChange={e => setBasicData('name', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {basicErrors.name && <p className="mt-1 text-red-500 text-sm">{basicErrors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={basicData.email}
                          onChange={e => setBasicData('email', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {basicErrors.email && <p className="mt-1 text-red-500 text-sm">{basicErrors.email}</p>}
                      </div>
                    </div>
                  ) : editMode === 'password' ? (
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="current_password" className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          id="current_password"
                          value={passwordData.current_password}
                          onChange={e => setPasswordData('current_password', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {passwordErrors.current_password && <p className="mt-1 text-red-500 text-sm">{passwordErrors.current_password}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input
                          type="password"
                          id="password"
                          value={passwordData.password}
                          onChange={e => setPasswordData('password', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {passwordErrors.password && <p className="mt-1 text-red-500 text-sm">{passwordErrors.password}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          id="password_confirmation"
                          value={passwordData.password_confirmation}
                          onChange={e => setPasswordData('password_confirmation', e.target.value)}
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {passwordErrors.password_confirmation && <p className="mt-1 text-red-500 text-sm">{passwordErrors.password_confirmation}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-start gap-3">
                          <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-400">Name</h3>
                            <p className="text-white">{auth.user.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start gap-3">
                          <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-400">Email</h3>
                            <p className="text-white">{auth.user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start gap-3">
                          <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-400">Member Since</h3>
                            <p className="text-white">June 2025</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start gap-3">
                          <FilmIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-400">Subscription</h3>
                            <p className="text-white">Free Account</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Delete Account Section */}
                  {editMode === 'none' && (
                    <div className="mt-12 pt-6 border-t border-zinc-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-red-500">Delete Account</h3>
                          <p className="text-gray-400 text-sm mt-1">Once you delete your account, there is no going back.</p>
                        </div>
                        
                        {!showDeleteConfirm ? (
                          <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-500 transition flex items-center gap-2"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Delete Account
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <button 
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 bg-zinc-700 text-white font-medium rounded hover:bg-zinc-600 transition"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={handleDeleteAccount}
                              className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-500 transition flex items-center gap-2"
                            >
                              <TrashIcon className="w-4 h-4" />
                              Confirm Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
                  
                  {favorites.length === 0 ? (
                    <div className="bg-zinc-800 rounded-lg p-8 text-center">
                      <HeartIcon className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                      <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                      <p className="text-gray-400 mb-6">
                        You haven't added any movies or TV shows to your favorites yet.
                      </p>
                      <Link
                        href="/movies"
                        className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Browse Movies
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {favorites.map((item) => (
                        <MovieCard 
                          key={item.id} 
                          movie={item} 
                          size="medium"
                          isFavorite={true}
                          isInWatchlist={watchlist.some(watchlistItem => watchlistItem.id === item.id)}
                          onUpdate={refreshProfileData}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Watchlist Tab */}
              {activeTab === 'watchlist' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
                  
                  {watchlist.length === 0 ? (
                    <div className="bg-zinc-800 rounded-lg p-8 text-center">
                      <BookmarkIcon className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                      <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
                      <p className="text-gray-400 mb-6">
                        Start adding movies and TV shows to watch later.
                      </p>
                      <Link
                        href="/tv-shows"
                        className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Browse TV Shows
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {watchlist.map((item) => (
                        <MovieCard 
                          key={item.id} 
                          movie={item} 
                          size="medium"
                          isInWatchlist={true}
                          isFavorite={favorites.some(favorite => favorite.id === item.id)}
                          onUpdate={refreshProfileData}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Watch History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Watch History</h1>
                  
                  {watchHistory.length === 0 ? (
                    <div className="bg-zinc-800 rounded-lg p-8 text-center">
                      <ClockIcon className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                      <h2 className="text-xl font-semibold mb-2">No watch history</h2>
                      <p className="text-gray-400 mb-6">
                        You haven't watched any movies or TV shows yet.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Link
                          href="/movies"
                          className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          Browse Movies
                        </Link>
                        <Link
                          href="/tv-shows"
                          className="inline-block bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          Browse TV Shows
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {watchHistory.map((item, index) => {
                        const media = item.media;
                        const title = 'title' in media ? media.title : ('name' in media ? media.name : 'Unknown');
                        const progress = Math.round((item.progress / item.duration) * 100);
                        const watchedDate = new Date(item.watched_at).toLocaleDateString();
                        
                        return (
                          <div key={index} className="bg-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                            <Link href={'type' in media && media.type === 'movie' ? `/movies/${media.id}` : `/tv-shows/${media.id}`} className="flex-shrink-0">
                              <img 
                                src={media.poster_url || media.poster_path 
                                  ? (media.poster_url?.startsWith('http') 
                                    ? media.poster_url 
                                    : (media.poster_path?.startsWith('http') 
                                      ? media.poster_path 
                                      : `https://image.tmdb.org/t/p/w200${media.poster_path || media.poster_url}`))
                                  : '/placeholder-poster.svg'
                                }
                                alt={title}
                                className="w-16 h-24 object-cover rounded-md"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-poster.svg';
                                }}
                              />
                            </Link>
                            <div className="flex-1">
                              <Link 
                                href={'type' in media && media.type === 'movie' ? `/movies/${media.id}` : `/tv-shows/${media.id}`}
                                className="text-lg font-semibold hover:text-orange-400 transition-colors"
                              >
                                {title}
                              </Link>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {'type' in media && (
                                  <span className="text-xs bg-zinc-700 px-2 py-1 rounded-full">
                                    {media.type === 'movie' ? 'Movie' : 'TV Show'}
                                  </span>
                                )}
                                {media.genres?.slice(0, 2).map((genre) => (
                                  <span key={genre.id} className="text-xs bg-zinc-700 px-2 py-1 rounded-full">
                                    {genre.name}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress: {progress}%</span>
                                  <span>Watched on {watchedDate}</span>
                                </div>
                                <div className="w-full bg-zinc-700 rounded-full h-2">
                                  <div 
                                    className="bg-orange-600 h-2 rounded-full" 
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
