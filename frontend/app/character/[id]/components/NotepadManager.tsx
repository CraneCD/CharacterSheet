'use client';

import { useState, useEffect } from 'react';

interface NotepadManagerProps {
    initialPages: string[];
    onClose: (pages: string[]) => void;
}

export default function NotepadManager({ initialPages, onClose }: NotepadManagerProps) {
    const [pages, setPages] = useState<string[]>(() =>
        initialPages.length > 0 ? [...initialPages] : ['']
    );
    const [activePage, setActivePage] = useState(0);

    const addPage = () => {
        setPages((p) => [...p, '']);
        setActivePage(pages.length);
    };

    const removePage = (index: number) => {
        if (pages.length <= 1) return;
        setPages((p) => p.filter((_, i) => i !== index));
        setActivePage((curr) => (curr >= index && curr > 0 ? curr - 1 : curr));
    };

    const updatePage = (index: number, value: string) => {
        setPages((p) => {
            const next = [...p];
            next[index] = value;
            return next;
        });
    };

    const handleClose = () => {
        onClose(pages);
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '700px',
                    width: '95vw',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 1.25rem',
                        borderBottom: '1px solid var(--border)',
                        flexShrink: 0
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>Notepad</h2>
                        {pages.map((_, i) => (
                            <button
                                key={i}
                                className={`button ${activePage === i ? 'primary' : 'secondary'}`}
                                onClick={() => setActivePage(i)}
                                style={{
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.5rem',
                                    minWidth: '2.5rem'
                                }}
                            >
                                Page {i + 1}
                            </button>
                        ))}
                        <button
                            className="button secondary"
                            onClick={addPage}
                            style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                            title="Add page"
                        >
                            + Page
                        </button>
                    </div>
                    <button
                        className="button primary"
                        onClick={handleClose}
                        style={{ fontSize: '0.875rem', padding: '0.35rem 0.75rem' }}
                    >
                        Close & Save
                    </button>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {pages.map((content, i) => (
                        <div
                            key={i}
                            style={{
                                display: activePage === i ? 'flex' : 'none',
                                flexDirection: 'column',
                                flex: 1,
                                minHeight: '300px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    padding: '0.25rem 1rem',
                                    gap: '0.5rem'
                                }}
                            >
                                {pages.length > 1 && (
                                    <button
                                        className="button secondary"
                                        onClick={() => removePage(i)}
                                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                                    >
                                        Delete page
                                    </button>
                                )}
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => updatePage(i, e.target.value)}
                                placeholder="Notes, reminders, session notes..."
                                style={{
                                    flex: 1,
                                    minHeight: '280px',
                                    padding: '1rem',
                                    margin: '0 1rem 1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.375rem',
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--text)',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
