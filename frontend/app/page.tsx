import Link from 'next/link';
import { buttonClass } from './components/ui/Button';

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(2.25rem, 8vw, 4rem)', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                D&D 5.5e Character Sheet
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
                The ultimate tool for One D&D players. Create, manage, and play with your characters seamlessly.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/register" className={buttonClass({ size: 'lg' })}>
                    Create account
                </Link>
                <Link href="/login" className={buttonClass({ variant: 'secondary', size: 'lg' })}>
                    Log in
                </Link>
            </div>
        </div>
    );
}
