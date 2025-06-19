import React from 'react';
import { useForm } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FormField, TextInput } from '../../components/admins/FormField';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
}

interface UserFormProps {
  user: User | null;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const { data, setData, errors, post, put, processing } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    is_admin: user?.is_admin || false,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      put(route('admin.users.update', user.id), {
        onSuccess: () => onClose(),
      });
    } else {
      post(route('admin.users.store'), {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-medium">{user ? 'Edit User' : 'Add New User'}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <FormField label="Name" name="name" required error={errors.name}>
            <TextInput
              name="name"
              value={data.name}
              handleChange={e => setData('name', e.target.value)}
              required
            />
          </FormField>
          
          <FormField label="Email" name="email" required error={errors.email}>
            <TextInput
              type="email"
              name="email"
              value={data.email}
              handleChange={e => setData('email', e.target.value)}
              required
            />
          </FormField>
          
          <FormField label="Avatar URL" name="avatar" error={errors.avatar}>
            <TextInput
              name="avatar"
              value={data.avatar}
              handleChange={e => setData('avatar', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
            {data.avatar && (
              <div className="mt-2">
                <img 
                  src={data.avatar} 
                  alt="Avatar preview" 
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            )}
          </FormField>
          
          {!user && (
            <>
              <FormField label="Password" name="password" required={!user} error={errors.password}>
                <TextInput
                  type="password"
                  name="password"
                  value={data.password}
                  handleChange={e => setData('password', e.target.value)}
                  required={!user}
                />
              </FormField>
              
              <FormField label="Confirm Password" name="password_confirmation" required={!user} error={errors.password_confirmation}>
                <TextInput
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  handleChange={e => setData('password_confirmation', e.target.value)}
                  required={!user}
                />
              </FormField>
            </>
          )}

          <FormField label="Admin Access" name="is_admin" error={errors.is_admin}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_admin"
                name="is_admin"
                checked={data.is_admin}
                onChange={e => setData('is_admin', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-900">
                Grant admin access
              </label>
            </div>
          </FormField>

          <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {processing ? 'Saving...' : user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;