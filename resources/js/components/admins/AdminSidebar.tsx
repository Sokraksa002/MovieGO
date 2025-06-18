// src/components/admin/AdminSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</Link>
        <Link to="/admin/media" className="block py-2 px-3 rounded hover:bg-gray-700">Media</Link>
        <Link to="/admin/episodes" className="block py-2 px-3 rounded hover:bg-gray-700">Episodes</Link>
        <Link to="/admin/genres" className="block py-2 px-3 rounded hover:bg-gray-700">Genres</Link>
        <Link to="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-700">Users</Link>
      </nav>
    </aside>
  );
};
export default AdminSidebar;