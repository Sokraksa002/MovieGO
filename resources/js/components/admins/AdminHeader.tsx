// src/components/admin/AdminHeader.tsx
import React from 'react';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex justify-between items-center px-6 border-b">
      <h1 className="text-xl font-semibold text-gray-800">Movie Streaming Admin</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
      </div>
    </header>
  );
};

export default AdminHeader;