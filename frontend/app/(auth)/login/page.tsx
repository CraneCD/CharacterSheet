'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card">
                <h2 className="heading" style={{ textAlign: 'center' }}>Welcome Back</h2>
                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link href="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
