// pages/admin/Dashboard.tsx
import React from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import StatCard from '../../components/admins/StatCard';
import RecentActivity from '../../components/admins/RecentActivity';
import MediaChart from '../../components/admins/MediaChart';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin! Here's what's happening with your platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Media" 
            value="1,248" 
            change="+12.5%" 
            icon="🎥"
            color="bg-blue-500"
          />
          <StatCard 
            title="Active Users" 
            value="34,892" 
            change="+8.3%" 
            icon="👥"
            color="bg-green-500"
          />
          <StatCard 
            title="Episodes" 
            value="8,742" 
            change="+5.2%" 
            icon="🎬"
            color="bg-purple-500"
          />
          <StatCard 
            title="Genres" 
            value="28" 
            change="+2" 
            icon="🏷️"
            color="bg-yellow-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Media Overview</h2>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                  Movies
                </button>
                <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-lg">
                  TV Shows
                </button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                  Both
                </button>
              </div>
            </div>
            <MediaChart />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;