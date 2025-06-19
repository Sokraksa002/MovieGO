import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';

interface User {
  name: string;
  email: string;
}

interface PageProps {
  auth: {
    user: User;
  };
}

const Profile = () => {
  const { auth } = usePage().props as unknown as PageProps;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          
          <div className="bg-zinc-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-6 mb-6">
              <img 
                src="/default-avatar.png" 
                alt="User Avatar" 
                className="w-24 h-24 rounded-full border-2 border-orange-400"
              />
              <div>
                <h2 className="text-2xl font-bold">{auth.user.name}</h2>
                <p className="text-gray-400">{auth.user.email}</p>
              </div>
            </div>
            
            <div className="border-t border-zinc-700 pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Name</label>
                  <div className="bg-zinc-700 rounded p-3">{auth.user.name}</div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  <div className="bg-zinc-700 rounded p-3">{auth.user.email}</div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Member Since</label>
                  <div className="bg-zinc-700 rounded p-3">June 2025</div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Subscription</label>
                  <div className="bg-zinc-700 rounded p-3">Free Account</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-zinc-700 pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-yellow-500 text-black font-medium rounded hover:bg-yellow-400 transition">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-zinc-700 text-white font-medium rounded hover:bg-zinc-600 transition">
                  Change Password
                </button>
                <button className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-500 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
