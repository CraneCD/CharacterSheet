'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button, buttonClass, ConfirmDialog, D20Icon, describeError, Skeleton, useToast } from '@/app/components/ui';
import { CharacterDraft, clearDraft, hasDraftProgress, loadDraft } from '@/lib/characterDraft';
import { downloadCharacterJson, ImportResult, parseCharacterImport } from '@/lib/characterTransfer';
import CharacterCard, { CharacterSummary } from './components/CharacterCard';
import DraftCard from './components/DraftCard';
import ImportPreviewDialog from './components/ImportPreviewDialog';

type SortKey = 'recent' | 'name' | 'level';

/** Search and sort only earn their space once the list gets long. */
const TOOLBAR_THRESHOLD = 6;

function sortCharacters(list: CharacterSummary[], sort: SortKey): CharacterSummary[] {
    const sorted = [...list];
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'level') sorted.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
    else sorted.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    return sorted;
}

export default function Dashboard() {
    const [characters, setCharacters] = useState<CharacterSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [characterToDelete, setCharacterToDelete] = useState<CharacterSummary | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [draft, setDraft] = useState<CharacterDraft | null>(null);
    const [confirmingDiscardDraft, setConfirmingDiscardDraft] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortKey>('recent');
    const [importFile, setImportFile] = useState<{ name: string; result: ImportResult } | null>(null);
    const [importing, setImporting] = useState(false);
    const [importError, setImportError] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast();

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

    useEffect(() => {
        const saved = loadDraft();
        setDraft(saved && hasDraftProgress(saved.formData) ? saved : null);
    }, []);

    const visibleCharacters = useMemo(() => {
        const q = search.trim().toLowerCase();
        const filtered = q
            ? characters.filter((c) => [c.name, c.race, c.class].some((v) => (v || '').toLowerCase().includes(q)))
            : characters;
        return sortCharacters(filtered, sort);
    }, [characters, search, sort]);

    const chooseImportFile = () => {
        setImportError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const handleImportFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        let text = '';
        try {
            text = await file.text();
        } catch {
            setImportFile({ name: file.name, result: { ok: false, error: "This file couldn't be read." } });
            return;
        }
        setImportError('');
        setImportFile({ name: file.name, result: parseCharacterImport(text) });
    };

    const confirmImport = async () => {
        if (!importFile?.result.ok) return;
        setImporting(true);
        setImportError('');
        try {
            const created = await api.post('/characters', importFile.result.payload);
            setCharacters((prev) => [...prev, created]);
            setImportFile(null);
            toast.success(`Imported "${created.name}".`);
        } catch (err) {
            console.error('Failed to import character', err);
            setImportError(describeError("Couldn't import this character", err));
        } finally {
            setImporting(false);
        }
    };

    const exportCharacter = async (char: CharacterSummary) => {
        try {
            // The list only carries a summary; export the full sheet
            downloadCharacterJson(await api.get(`/characters/${char.id}`));
        } catch (err) {
            console.error('Failed to export character', err);
            toast.error(describeError(`Couldn't export "${char.name}"`, err));
        }
    };

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

    const showToolbar = characters.length > TOOLBAR_THRESHOLD;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="heading" style={{ marginBottom: 0 }}>My Characters</h1>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button variant="secondary" onClick={chooseImportFile}>Import from JSON</Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json,.json"
                        style={{ display: 'none' }}
                        onChange={handleImportFileChange}
                        data-testid="import-file-input"
                    />
                    <Link href="/create" className={buttonClass()}>{draft ? 'Continue New Character' : 'Create New Character'}</Link>
                </div>
            </div>

            {draft && <DraftCard draft={draft} onDiscard={() => setConfirmingDiscardDraft(true)} />}

            {loadError && !loading && (
                <div className="form-error" role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <span>{loadError}</span>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={loadCharacters}>Try again</button>
                </div>
            )}

            {showToolbar && !loading && (
                <div className="dashboard-toolbar">
                    <input
                        type="search"
                        className="input"
                        placeholder="Search by name, species or class"
                        aria-label="Search characters"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label className="dashboard-sort">
                        <span>Sort</span>
                        <select className="input" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                            <option value="recent">Recently edited</option>
                            <option value="name">Name</option>
                            <option value="level">Level</option>
                        </select>
                    </label>
                </div>
            )}

            {loading ? (
                <div aria-busy="true" aria-label="Loading characters" className="character-grid">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Skeleton width={72} height={72} radius="var(--radius-full)" />
                            <Skeleton width="60%" height="1.5rem" />
                            <Skeleton width="70%" />
                            <Skeleton width="90%" />
                        </div>
                    ))}
                </div>
            ) : loadError ? null : (
                <div className="character-grid">
                    {visibleCharacters.map((char) => (
                        <CharacterCard
                            key={char.id}
                            character={char}
                            onExport={exportCharacter}
                            onDelete={setCharacterToDelete}
                        />
                    ))}
                    {visibleCharacters.length > 0 && !search && (
                        <Link href="/create" className="character-card-new">
                            <span className="character-card-new-icon" aria-hidden="true">+</span>
                            <span className="character-card-new-title">{draft ? 'Continue new character' : 'New character'}</span>
                            <span className="character-card-new-text">{draft ? 'Pick up where you left off' : 'Species, class and scores in a few minutes'}</span>
                        </Link>
                    )}
                    {characters.length > 0 && visibleCharacters.length === 0 && (
                        <p className="dashboard-empty-search">
                            No characters match &ldquo;{search}&rdquo;. <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSearch('')}>Clear search</button>
                        </p>
                    )}
                    {characters.length === 0 && (
                        <div className="dashboard-empty">
                            <D20Icon className="dashboard-empty-die" strokeWidth={3} />
                            <h2 className="dashboard-empty-title">Your party starts here</h2>
                            <p className="dashboard-empty-text">You haven&apos;t created any characters yet.</p>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/create" className={buttonClass()}>{draft ? 'Continue your first character' : 'Create your first character'}</Link>
                                <Button variant="secondary" onClick={chooseImportFile}>Import from JSON</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {importFile && (
                <ImportPreviewDialog
                    fileName={importFile.name}
                    result={importFile.result}
                    importing={importing}
                    error={importError}
                    onConfirm={confirmImport}
                    onChooseAnother={() => {
                        setImportFile(null);
                        chooseImportFile();
                    }}
                    onCancel={() => setImportFile(null)}
                />
            )}

            {confirmingDiscardDraft && (
                <ConfirmDialog
                    title="Discard unfinished character?"
                    confirmLabel="Discard"
                    danger
                    onConfirm={() => {
                        clearDraft();
                        setDraft(null);
                        setConfirmingDiscardDraft(false);
                    }}
                    onCancel={() => setConfirmingDiscardDraft(false)}
                >
                    The choices saved in your draft will be lost.
                </ConfirmDialog>
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
