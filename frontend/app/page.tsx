import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                D&D 5.5e Character Sheet
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
                The ultimate tool for One D&D players. Create, manage, and play with your characters seamlessly.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                    Get Started
                </Link>
                <Link href="/register" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                    Create Account
                </Link>
            </div>
        </div>
    );
}
