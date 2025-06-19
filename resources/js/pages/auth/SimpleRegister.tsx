import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Submitting registration form:', data);
        post('/register', {
            onSuccess: () => console.log('Registration successful'),
            onError: (errors) => console.error('Registration failed:', errors)
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Register" />
            
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-extrabold text-white">
                        Movie<span className="text-yellow-500">GO</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
                            Sign in instead
                        </Link>
                    </p>
                </div>

                <div className="bg-zinc-800 rounded-lg shadow-lg px-8 py-10">
                    <form className="space-y-6" onSubmit={submit}>
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
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="block w-full pl-10 py-3 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    placeholder="Your name"
                                />
                            </div>
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
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
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="block w-full pl-10 py-3 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    placeholder="Email address"
                                />
                            </div>
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
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
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="block w-full pl-10 py-3 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    placeholder="Password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-300 focus:outline-none"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
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
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="block w-full pl-10 py-3 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-white"
                                    placeholder="Confirm password"
                                />
                            </div>
                            {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                            >
                                {processing ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-zinc-800 text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm bg-zinc-700 text-sm font-medium text-gray-300 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                            >
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.545,10.239V13.89h5.162c-0.206,1.307-1.554,3.829-5.162,3.829c-3.107,0-5.645-2.576-5.645-5.75
                                    c0-3.174,2.538-5.75,5.645-5.75c1.769,0,2.952,0.754,3.627,1.404l2.474-2.384c-1.589-1.484-3.646-2.389-6.102-2.389
                                    c-5.033,0-9.11,4.078-9.11,9.118s4.077,9.118,9.11,9.118c5.258,0,8.74-3.693,8.74-8.89c0-0.596-0.066-1.055-0.144-1.506
                                    H12.545z" />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
