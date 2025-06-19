import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import DataTable from '../../components/admins/DataTable';
import { PlusIcon } from '@heroicons/react/24/outline';
import UserForm from './UserForm';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
  created_at: string;
  [key: string]: unknown;
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

interface UsersProps {
  users: PaginatedData<User>;
  [key: string]: unknown;
}

const Users: React.FC = () => {
  const { users } = usePage<UsersProps>().props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const columns = [
    {
      key: 'avatar',
      label: 'Avatar',
      sortable: false,
      render: (value: unknown, row: User) => {
        const avatar = typeof value === 'string' ? value : '';
        return avatar ? (
          <img 
            src={avatar} 
            alt={`${row.name}'s avatar`} 
            className="h-10 w-10 rounded-full object-cover" 
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">
              {typeof row.name === 'string' ? row.name.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
        );
      }
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'is_admin',
      label: 'Role',
      sortable: true,
      render: (value: unknown) => {
        const isAdmin = value === true;
        return (
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isAdmin
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isAdmin ? 'Admin' : 'User'}
          </span>
        );
      }
    },
    {
      key: 'created_at',
      label: 'Created At',
      sortable: true,
      render: (value: unknown) => 
        typeof value === 'string' ? new Date(value).toLocaleDateString() : 'N/A'
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      router.delete(route('admin.users.destroy', user.id));
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Users</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add User
        </button>
      </div>
      
      <DataTable
        data={users.data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <UserForm 
          user={editingUser}
          onClose={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Users;