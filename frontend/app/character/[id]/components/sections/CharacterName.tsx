'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/app/components/ui';

export const MAX_NAME_LENGTH = 200;

/** Trims and collapses runs of whitespace, so "  Mira   Thornwood " saves as "Mira Thornwood". */
export function cleanCharacterName(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
}

interface CharacterNameProps {
    name: string;
    /** Saves the new (cleaned, changed, non-empty) name; the caller updates the sheet optimistically */
    onRename: (name: string) => void;
}

/** The character's name as the sheet's heading, with a pencil button to rename it in place. */
export default function CharacterName({ name, onRename }: CharacterNameProps) {
    const [draft, setDraft] = useState<string | null>(null);
    const [returnFocus, setReturnFocus] = useState(false);
    const editButton = useRef<HTMLButtonElement>(null);
    const inputId = useId();
    const cleaned = draft === null ? '' : cleanCharacterName(draft);

    // Back on the pencil once the field closes, so keyboard users keep their place
    useEffect(() => {
        if (draft === null && returnFocus) {
            editButton.current?.focus();
            setReturnFocus(false);
        }
    }, [draft, returnFocus]);
    const close = () => {
        setDraft(null);
        setReturnFocus(true);
    };

    if (draft === null) {
        return (
            <div className="sheet-name">
                <h1 className="heading sheet-name-text">{name}</h1>
                <Button
                    ref={editButton}
                    variant="ghost"
                    size="sm"
                    className="sheet-name-edit no-print"
                    onClick={() => setDraft(name)}
                    aria-label="Rename character"
                    title="Rename character"
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <path d="M11.2 2.3a1.5 1.5 0 0 1 2.1 2.1L5.5 12.2 2.5 13l.8-3z" />
                    </svg>
                </Button>
            </div>
        );
    }

    const save = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cleaned) return;
        if (cleaned !== name) onRename(cleaned);
        close();
    };

    return (
        <form className="sheet-name sheet-name-form" onSubmit={save}>
            <label className="visually-hidden" htmlFor={inputId}>Character name</label>
            <input
                id={inputId}
                className="input heading sheet-name-input"
                value={draft}
                maxLength={MAX_NAME_LENGTH}
                autoComplete="off"
                spellCheck={false}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        close();
                    }
                }}
            />
            <div className="sheet-name-buttons">
                <Button type="submit" size="sm" disabled={!cleaned}>Save</Button>
                <Button variant="ghost" size="sm" onClick={close}>Cancel</Button>
            </div>
        </form>
    );
}
