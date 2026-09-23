'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api';
import { Button, TextField, useToast } from '@/app/components/ui';

const MIN_PASSWORD_LENGTH = 6;

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await api.post('/auth/register', { email, password, name });
            toast.success('Account created. Log in to get started.');
            router.push('/login');
        } catch (err: unknown) {
            setError(
                err instanceof ApiError && err.status < 500
                    ? err.message
                    : err instanceof ApiError
                        ? 'Something went wrong on our side. Please try again.'
                        : "Couldn't reach the server. Check your connection and try again."
            );
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card">
                <h1 className="heading" style={{ textAlign: 'center' }}>Create account</h1>
                {error && <div className="form-error" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        minLength={MIN_PASSWORD_LENGTH}
                        hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                        <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                        Show password
                    </label>
                    <Button type="submit" block loading={submitting}>
                        {submitting ? 'Creating account…' : 'Create account'}
                    </Button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
