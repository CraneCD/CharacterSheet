'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Character {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
}

export default function Dashboard() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);

    useEffect(() => {
        api.get('/characters')
            .then(setCharacters)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="nav">
                <div className="nav-brand">D&D 5.5e</div>
                <div className="nav-links">
                    <Link href="/dashboard">My Characters</Link>
                    <Link href="/campaigns">Campaigns</Link>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="heading" style={{ marginBottom: 0 }}>My Characters</h1>
                <Link href="/create" className="btn" style={{ whiteSpace: 'nowrap' }}>Create New Character</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
                    {characters.map((char) => (
                        <div key={char.id} className="card" style={{ position: 'relative' }}>
                            <Link href={`/character/${char.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', paddingRight: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{char.name}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Level {char.level} {char.race} {char.class}</p>
                            </Link>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCharacterToDelete(char);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--error, #ef4444)',
                                    fontSize: '1.25rem',
                                    cursor: 'pointer',
                                    lineHeight: 1
                                }}
                                title="Delete Character"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    {characters.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: '0.5rem' }}>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>You haven't created any characters yet.</p>
                            <Link href="/create" className="btn">Create Your First Character</Link>
                        </div>
                    )}
                </div>
            )}

            {characterToDelete && (
                <div className="modal-overlay" onClick={() => setCharacterToDelete(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Delete Character</h3>
                        <p>Are you sure you want to delete <strong>{characterToDelete.name}</strong>? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                            <button className="button secondary" onClick={() => setCharacterToDelete(null)}>Cancel</button>
                            <button className="button primary" onClick={async () => {
                                const char = characterToDelete;
                                setCharacterToDelete(null);
                                try {
                                    console.log('Attempting to delete character:', `/characters/${char.id}`);
                                    const response = await api.delete(`/characters/${char.id}`);
                                    console.log('Delete character response:', response);
                                    setCharacters(characters.filter(c => c.id !== char.id));
                                } catch (err: any) {
                                    console.error('Failed to delete character', err);
                                    const errorMessage = err?.message || 'Failed to delete character';
                                    alert(`Failed to delete character: ${errorMessage}`);
                                }
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
