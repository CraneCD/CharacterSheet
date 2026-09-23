'use client';
import { useEffect, useId, useRef, useState } from 'react';

interface StatProps {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Small line under the value, e.g. "+10 from features". */
    sublabel?: React.ReactNode;
    highlight?: boolean;
}

/** Read-only header stat (Proficiency Bonus, Initiative, ...). */
export function Stat({ label, value, sublabel, highlight = false }: StatProps) {
    return (
        <div className={highlight ? 'stat-box highlight' : 'stat-box'}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">
                {value}
                {sublabel && <span className="stat-sublabel">{sublabel}</span>}
            </div>
        </div>
    );
}

interface EditableStatProps {
    label: string;
    value: number;
    /** How the value is shown when not editing (defaults to the number). */
    display?: React.ReactNode;
    sublabel?: React.ReactNode;
    min: number;
    max: number;
    highlight?: boolean;
    /** Called with a valid, changed value. The caller saves it (and handles failures). */
    onSave: (value: number) => void;
}

/**
 * A header stat you can click (or focus + Enter) to edit. Enter saves, Escape cancels,
 * leaving the field saves a valid value and discards an invalid one.
 */
export function EditableStat({ label, value, display, sublabel, min, max, highlight = false, onSave }: EditableStatProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState('');
    const [error, setError] = useState('');
    const editingRef = useRef(false);
    const wasEditing = useRef(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputId = useId();
    const errorId = `${inputId}-error`;

    useEffect(() => {
        // Return focus to the stat after editing so keyboard users keep their place.
        if (wasEditing.current && !editing) buttonRef.current?.focus();
        wasEditing.current = editing;
    }, [editing]);

    const start = () => {
        editingRef.current = true;
        setDraft(String(value));
        setError('');
        setEditing(true);
    };

    const stop = () => {
        editingRef.current = false;
        setEditing(false);
        setError('');
    };

    const commit = (fromBlur: boolean) => {
        if (!editingRef.current) return;
        const trimmed = draft.trim();
        const parsed = Number(trimmed);
        if (trimmed === '' || !Number.isInteger(parsed)) {
            stop();
            return;
        }
        if (parsed < min || parsed > max) {
            if (fromBlur) {
                stop();
            } else {
                setError(`${label} must be between ${min} and ${max}`);
            }
            return;
        }
        stop();
        if (parsed !== value) onSave(parsed);
    };

    return (
        <div className={highlight ? 'stat-box highlight' : 'stat-box'}>
            {editing ? (
                <>
                    <label className="stat-label" htmlFor={inputId}>{label}</label>
                    <div className="stat-value">
                        <input
                            id={inputId}
                            className="stat-edit-input"
                            type="text"
                            inputMode="numeric"
                            value={draft}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={error ? errorId : undefined}
                            onChange={(e) => {
                                const next = e.target.value;
                                if (next === '' || /^-?\d+$/.test(next)) {
                                    setDraft(next);
                                    setError('');
                                }
                            }}
                            onFocus={(e) => e.target.select()}
                            onBlur={() => commit(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    commit(false);
                                } else if (e.key === 'Escape') {
                                    e.stopPropagation();
                                    stop();
                                }
                            }}
                            autoFocus
                        />
                    </div>
                    {error && <div className="field-error" id={errorId} role="alert">{error}</div>}
                </>
            ) : (
                <>
                    <div className="stat-label" aria-hidden="true">{label}</div>
                    <button
                        ref={buttonRef}
                        type="button"
                        className="stat-edit-button stat-value"
                        onClick={start}
                        aria-label={`${label}: ${value}. Edit`}
                        title={`Edit ${label}`}
                    >
                        <span>{display ?? value}</span>
                        {sublabel && <span className="stat-sublabel">{sublabel}</span>}
                        <span className="stat-edit-hint" aria-hidden="true">✎ edit</span>
                    </button>
                </>
            )}
        </div>
    );
}
