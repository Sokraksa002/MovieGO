import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Head title="Register" />
            <Navbar />
            
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="bg-zinc-800 rounded-lg shadow-lg px-8 py-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                    Full Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-500" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 bg-zinc-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Enter your full name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>
                                {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-500" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 bg-zinc-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Enter your email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-600 bg-zinc-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Enter your password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                                        ) : (
                                            <FaEye className="text-gray-500 hover:text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-500" />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-600 bg-zinc-700 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Confirm your password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                                        ) : (
                                            <FaEye className="text-gray-500 hover:text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && <p className="mt-2 text-sm text-red-400">{errors.password_confirmation}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
