import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

export default function Login({ status }: { status?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Submitting login form:', data);
        post('/login', {
            onSuccess: () => console.log('Login successful'),
            onError: (errors) => console.error('Login failed:', errors)
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Login" />
            
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-extrabold text-white">
                        Movie<span className="text-yellow-500">GO</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Or{' '}
                        <Link href="/register" className="font-medium text-yellow-500 hover:text-yellow-400">
                            create a new account
                        </Link>
                    </p>
                </div>

                {status && <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{status}</div>}

                <div className="bg-zinc-800 rounded-lg shadow-lg px-8 py-10">
                    <form className="space-y-6" onSubmit={submit}>
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
                                    autoComplete="current-password"
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-500 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-medium text-yellow-500 hover:text-yellow-400">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                            >
                                {processing ? 'Signing in...' : 'Sign in'}
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
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
