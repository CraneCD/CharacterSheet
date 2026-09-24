'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button, ConfirmDialog } from '@/app/components/ui';
import CoreCard from './CoreCard';

const SAVE_DELAY_MS = 800;

interface NotesCardProps {
    pages: string[];
    /** Called after typing pauses (and when the field loses focus); resolves false if the save failed */
    onSave: (pages: string[]) => Promise<boolean>;
    collapsed: boolean;
    autoCollapsed?: boolean;
    onToggle: () => void;
    className?: string;
}

/** The character's notes, in pages, saved as you type. */
export default function NotesCard({ pages: savedPages, onSave, collapsed, autoCollapsed, onToggle, className }: NotesCardProps) {
    const [pages, setPages] = useState<string[]>(() => (savedPages.length > 0 ? savedPages : ['']));
    const [active, setActive] = useState(0);
    const [status, setStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pending = useRef<string[] | null>(null);
    const onSaveRef = useRef(onSave);
    useEffect(() => {
        onSaveRef.current = onSave;
    });
    const textId = useId();

    const flush = async () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
        const toSave = pending.current;
        if (!toSave) return;
        pending.current = null;
        setStatus('saving');
        let ok = false;
        try {
            ok = await onSaveRef.current(toSave);
        } catch {
            ok = false;
        }
        // Keep the text so it saves with the next change; the caller has already told the player
        if (!ok && !pending.current) pending.current = toSave;
        setStatus(ok && !pending.current ? 'saved' : 'unsaved');
    };

    const schedule = (next: string[]) => {
        setPages(next);
        pending.current = next;
        setStatus('unsaved');
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(flush, SAVE_DELAY_MS);
    };

    // Save anything still pending when the sheet closes
    useEffect(() => () => { void flush(); }, []);

    const page = Math.min(active, pages.length - 1);
    const addPage = () => {
        schedule([...pages, '']);
        setActive(pages.length);
    };
    const deletePage = () => {
        setConfirmDelete(false);
        const next = pages.length > 1 ? pages.filter((_, i) => i !== page) : [''];
        schedule(next);
        setActive(Math.max(0, page - 1));
    };

    // Arrow keys move between pages (the tabs share one Tab stop)
    const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = { ArrowRight: page + 1, ArrowLeft: page - 1, Home: 0, End: pages.length - 1 };
        if (!(e.key in moves)) return;
        e.preventDefault();
        const next = (moves[e.key] + pages.length) % pages.length;
        setActive(next);
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
    };

    const summary = (
        <span>
            {pages.length} {pages.length === 1 ? 'page' : 'pages'}
            {pages[page]?.trim() ? ` · ${pages[page].trim().split('\n')[0].slice(0, 60)}` : ''}
        </span>
    );

    return (
        <CoreCard
            cardId="notes"
            title="Notes"
            summary={summary}
            collapsed={collapsed}
            autoCollapsed={autoCollapsed}
            onToggle={onToggle}
            className={className}
        >
            <div className="notes-pages">
                <div className="notes-page-tabs" role="tablist" aria-label="Note pages" onKeyDown={onTabKey}>
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            className="notes-page-tab"
                            aria-selected={i === page}
                            aria-controls={textId}
                            tabIndex={i === page ? 0 : -1}
                            onClick={() => setActive(i)}
                        >
                            Page {i + 1}
                        </button>
                    ))}
                </div>
                <button type="button" className="notes-page-tab" onClick={addPage} aria-label="Add a page">+</button>
            </div>
            <label className="visually-hidden" htmlFor={textId}>Notes, page {page + 1}</label>
            <textarea
                id={textId}
                className="input notes-text"
                value={pages[page] ?? ''}
                placeholder="Session notes, NPCs, loot…"
                onChange={(e) => schedule(pages.map((p, i) => (i === page ? e.target.value : p)))}
                onBlur={() => { void flush(); }}
            />
            <div className="notes-footer">
                <span className="notes-status" aria-live="polite">
                    {status === 'saving' ? 'Saving…' : status === 'unsaved' ? 'Unsaved changes' : 'Saved'}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (pages[page]?.trim() ? setConfirmDelete(true) : deletePage())}
                    disabled={pages.length === 1 && !pages[0]}
                >
                    Delete page
                </Button>
            </div>
            {confirmDelete && (
                <ConfirmDialog title={`Delete page ${page + 1}?`} confirmLabel="Delete" danger onConfirm={deletePage} onCancel={() => setConfirmDelete(false)}>
                    The text on this page will be lost.
                </ConfirmDialog>
            )}
        </CoreCard>
    );
}
