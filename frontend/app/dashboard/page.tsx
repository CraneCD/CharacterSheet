'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { buttonClass, ConfirmDialog, describeError, Skeleton, useToast } from '@/app/components/ui';

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
    const [loadError, setLoadError] = useState('');
    const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast();

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
            toast.success(`Imported "${created.name}".`);
        } catch (err: any) {
            console.error('Failed to import character JSON', err);
            toast.error(describeError("Couldn't import character", err));
        } finally {
            setImporting(false);
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    const loadCharacters = () => {
        setLoading(true);
        setLoadError('');
        api.get('/characters')
            .then(setCharacters)
            .catch((err) => {
                console.error('Failed to load characters', err);
                setLoadError(describeError("Couldn't load your characters", err));
            })
            .finally(() => setLoading(false));
    };

    useEffect(loadCharacters, []);

    const handleDelete = async () => {
        if (!characterToDelete) return;
        const char = characterToDelete;
        setDeleting(true);
        try {
            await api.delete(`/characters/${char.id}`);
            setCharacters((prev) => prev.filter(c => c.id !== char.id));
            setCharacterToDelete(null);
            toast.success(`Deleted "${char.name}".`);
        } catch (err: any) {
            console.error('Failed to delete character', err);
            toast.error(describeError(`Couldn't delete "${char.name}"`, err));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="heading" style={{ marginBottom: 0 }}>My Characters</h1>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        className="btn btn-secondary"
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
                    <Link href="/create" className={buttonClass()}>Create New Character</Link>
                </div>
            </div>

            {loadError && !loading && (
                <div className="form-error" role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <span>{loadError}</span>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={loadCharacters}>Try again</button>
                </div>
            )}

            {loading ? (
                <div aria-busy="true" aria-label="Loading characters" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
                    {[0, 1, 2].map(i => (
                        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <Skeleton width={120} height={160} />
                            <Skeleton width="60%" height="1.25rem" />
                            <Skeleton width="80%" />
                        </div>
                    ))}
                </div>
            ) : loadError ? null : (
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
                                    color: 'var(--error)',
                                    fontSize: '1.25rem',
                                    cursor: 'pointer',
                                    lineHeight: 1
                                }}
                                title="Delete character"
                                aria-label={`Delete ${char.name}`}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    {characters.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: '0.5rem' }}>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>You haven&apos;t created any characters yet.</p>
                            <Link href="/create" className={buttonClass()}>Create Your First Character</Link>
                        </div>
                    )}
                </div>
            )}

            {characterToDelete && (
                <ConfirmDialog
                    title="Delete character?"
                    confirmLabel="Delete"
                    danger
                    busy={deleting}
                    onConfirm={handleDelete}
                    onCancel={() => setCharacterToDelete(null)}
                >
                    <p style={{ margin: 0 }}>
                        <strong style={{ color: 'var(--text)' }}>{characterToDelete.name}</strong>{' '}will be permanently deleted. This can&apos;t be undone.
                    </p>
                </ConfirmDialog>
            )}
        </div>
    );
}
