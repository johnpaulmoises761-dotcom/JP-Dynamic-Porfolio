import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '../../Components/forms/TextInput';
import InputError from '../../Components/ui/InputError';
import useGlassGlow from '../../hooks/useGlassGlow';

/** Admin login (bonus). Only the admin account can open the project manager. */
export default function Login() {
    useGlassGlow();

    const form = useForm({ email: '', password: '', remember: false });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        form.post('/login', { preserveScroll: true });   // password is intentionally NOT cleared on error
    };

    return (
        <>
            <Head title="Admin login" />
            <div className="bg" role="presentation" />
            <main className="min-h-screen grid place-items-center px-5 py-16">
                <div className="w-full max-w-md">
                    <p className="lbl">// Admin access</p>
                    <h1 className="h2 mt-2">Log in to manage projects</h1>
                    <span className="bar" />

                    <form onSubmit={submit} noValidate className="glass p-6 sm:p-8 mt-8 space-y-5">
                        <TextInput
                            id="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            error={form.errors.email}
                        />
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-[var(--mute)]">Password</label>
                            <div className="relative mt-1.5">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`fld !mt-0 pr-20 ${form.errors.password ? 'fld-error' : ''}`}
                                    autoComplete="current-password"
                                    value={form.data.password}
                                    onChange={(e) => form.setData('password', e.target.value)}
                                    aria-invalid={form.errors.password ? 'true' : undefined}
                                    aria-describedby={form.errors.password ? 'password-error' : undefined}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 text-xs text-[var(--acc2)]"
                                    onClick={() => setShowPassword((isVisible) => !isVisible)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <InputError id="password-error" message={form.errors.password} />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-[var(--mute)]">
                            <input type="checkbox" checked={form.data.remember} onChange={(e) => form.setData('remember', e.target.checked)} />
                            Remember me
                        </label>
                        <button type="submit" className="btn btn-p w-full" disabled={form.processing}>
                            {form.processing ? 'Logging in…' : 'Log in'}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs">
                        <Link href="/" className="ln">← Back to portfolio</Link>
                    </p>
                </div>
            </main>
        </>
    );
}
