'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Character {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    data?: { portrait?: string };
}

export default function Dashboard() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImportFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImporting(true);
        try {
            const text = await file.text();
            let parsed: any;
            try {
                parsed = JSON.parse(text);
            } catch {
                throw new Error('File is not valid JSON.');
            }

            const source = Array.isArray(parsed) ? parsed[0] : parsed;
            if (!source || typeof source !== 'object') {
                throw new Error('JSON must contain a character object.');
            }

            const name = source.name;
            const race = source.race || source.raceId;
            const charClass = source.class || source.classId;
            const level = typeof source.level === 'number' && source.level >= 1 && source.level <= 20 ? source.level : 1;
            const data = source.data || {};

            if (!name || !race || !charClass || !data) {
                throw new Error('Exported character JSON is missing required fields (name, race, class, data).');
            }

            const payload = {
                name,
                race,
                class: charClass,
                level,
                data
            };

            const created = await api.post('/characters', payload);
            setCharacters((prev) => [...prev, created]);
            alert(`Imported character "${created.name}" successfully.`);
        } catch (err: any) {
            console.error('Failed to import character JSON', err);
            const message = err?.message || 'Failed to import character JSON.';
            alert(message);
        } finally {
            setImporting(false);
            if (event.target) {
                event.target.value = '';
            }
        }
    };

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
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => {
                            if (fileInputRef.current && !importing) {
                                fileInputRef.current.click();
                            }
                        }}
                        disabled={importing}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {importing ? 'Importing...' : 'Import from JSON'}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json"
                        style={{ display: 'none' }}
                        onChange={handleImportFileChange}
                    />
                    <Link href="/create" className="btn" style={{ whiteSpace: 'nowrap' }}>Create New Character</Link>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
                    {characters.map((char) => (
                        <div key={char.id} className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                            <Link href={`/character/${char.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', maxWidth: 120, aspectRatio: '3/4', borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', marginBottom: '1rem' }}>
                                    {char.data?.portrait ? (
                                        <img src={char.data.portrait} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--text-muted)' }}>👤</div>
                                    )}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'center' }}>{char.name}</h3>
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>Level {char.level} {char.race} {char.class}</p>
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
                            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>You haven&apos;t created any characters yet.</p>
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
