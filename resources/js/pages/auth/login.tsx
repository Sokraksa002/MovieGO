import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

// Define the structure of the form data
type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login({ status }: { status?: string }) {
    // Initialize the form with useForm hook
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    // Reset the password field when the component unmounts
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, );

    // Handle form submission
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Post the form data to the 'login' route
        post(route('login'));
    };

    return (
        <AuthLayout
            title="Welcome back"
            description="Enter your credentials to access your account"
        >
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form className="flex flex-col gap-y-6" onSubmit={submit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        tabIndex={1}
                        disabled={processing}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <TextLink href={route('password.request')} tabIndex={5}>
                            Forgot password?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        tabIndex={2}
                        disabled={processing}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center gap-x-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', !!checked)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <Label htmlFor="remember" className="text-sm">
                        Remember me
                    </Label>
                </div>

                <Button type="submit" className="w-full" disabled={processing} tabIndex={4}>
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Log in
                </Button>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={6}>
                        Sign up
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
