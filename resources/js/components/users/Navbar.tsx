import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { FaHome, FaStar, FaHistory, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (search.trim()) {
    router.visit(`/search?q=${encodeURIComponent(search)}`);
    setSearch('');
    setSearchOpen(false);
  }
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
        <button
          className="flex items-center gap-2 hover:text-yellow-400 transition focus:outline-none"
          onClick={() => setSearchOpen((v) => !v)}
        >
          <FaSearch />
          <span className="hidden md:inline">Search</span>
        </button>
        {/* Search Input Overlay */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="absolute top-16 right-8 bg-zinc-800 rounded shadow-lg flex items-center px-4 py-2 z-50"
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
        {/* User Profile Dropdown */}
        <div className="ml-6 relative group">
          <button className="flex items-center focus:outline-none">
            <img
              src="/default-avatar.png"
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-orange-400"
            />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white text-zinc-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto z-10">
            <Link href="/favorites" className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100">
              <FaStar className="text-orange-400" /> Favorites
            </Link>
            <Link href="/history" className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100">
              <FaHistory className="text-zinc-700" /> History Watch
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-zinc-100">Profile</Link>
            <Link href="/logout" className="block px-4 py-2 hover:bg-zinc-100">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;