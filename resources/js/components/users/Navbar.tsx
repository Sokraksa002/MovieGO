import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { FaHome, FaStar, FaHistory, FaSearch, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { SharedData } from '../../types';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth } = usePage<SharedData>().props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.visit(`/search?q=${encodeURIComponent(search)}`);
      setSearch('');
      setSearchOpen(false);
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <nav className="bg-zinc-900 text-white px-8 py-3 flex items-center justify-between shadow">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-extrabold text-xl text-white">
          Movie<span className="text-yellow-500">GO</span>
        </span>
      </div>
      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-800 font-medium hover:bg-zinc-700 transition">
          <FaHome /> Home
        </Link>
        <Link href="/movies/popular" className="hover:text-yellow-400 transition">Popular Movies</Link>
        <Link href="/movies/latest" className="hover:text-yellow-400 transition">Latest Movies</Link>
        <Link href="/tv-shows" className="hover:text-yellow-400 transition">TV Shows</Link>
        <Link href="/genres" className="hover:text-yellow-400 transition">Genres</Link>
        {/* Search Button */}
        <div className="relative" ref={searchRef}>
          <button
            className="flex items-center gap-2 hover:text-yellow-400 transition focus:outline-none"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch />
            <span className="hidden md:inline">Search</span>
          </button>
          {/* Search Input Overlay */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="absolute top-12 right-0 bg-zinc-800 rounded-lg shadow-xl flex items-center px-4 py-2 z-50 border border-gray-600"
            >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-b border-yellow-400 text-white px-2 py-1 outline-none"
              placeholder="Search movies or TV shows..."
              autoFocus
            />
            <button type="submit" className="ml-2 text-yellow-400 hover:text-yellow-300">
              <FaSearch />
            </button>
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-white"
              onClick={() => setSearchOpen(false)}
            >
              ✕
            </button>
          </form>
        )}
        </div>
        
        {/* Authentication Section */}
        {auth.user ? (
          /* User Profile Dropdown for authenticated users */
          <div className="ml-6 relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
            >
              <img
                src="/default-avatar.png"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-orange-400"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-zinc-900 rounded-lg shadow-xl z-50 border border-gray-200">
                <div className="py-2">
                  <Link 
                    href="/favorites" 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaStar className="text-orange-400" /> Favorites
                  </Link>
                  <Link 
                    href="/history" 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaHistory className="text-zinc-700" /> History Watch
                  </Link>
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser className="text-zinc-700" /> Profile
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button 
                    onClick={(e) => {
                      handleLogout(e);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Login/Register links for guests */
          <div className="ml-6 flex items-center space-x-4">
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link 
              href="/register" 
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition"
            >
              <FaUserPlus /> Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;