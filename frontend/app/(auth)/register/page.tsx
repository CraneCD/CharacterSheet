'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password, name });
            router.push('/login');
        } catch (err: any) {
            setError('Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card">
                <h2 className="heading" style={{ textAlign: 'center' }}>Create Account</h2>
                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn" style={{ width: '100%' }}>Sign Up</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
