'use client';
import { useEffect, useId, useRef, useState } from 'react';

interface StatProps {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Small line under the value, e.g. "+10 from features". */
    sublabel?: React.ReactNode;
    highlight?: boolean;
    className?: string;
}

/** Read-only header stat (Proficiency Bonus, Initiative, ...). */
export function Stat({ label, value, sublabel, highlight = false, className }: StatProps) {
    return (
        <div className={['stat-box', highlight && 'highlight', className].filter(Boolean).join(' ')}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">
                {value}
                {sublabel && <span className="stat-sublabel">{sublabel}</span>}
            </div>
        </div>
    );
}

interface EditableNumberProps {
    /** Accessible name, e.g. "AC" or "Strength score". */
    label: string;
    value: number;
    /** How the value is shown when not editing (defaults to the number). */
    display?: React.ReactNode;
    sublabel?: React.ReactNode;
    /** Where the value comes from (e.g. an AC breakdown): tooltip + screen reader description. */
    description?: string;
    min: number;
    max: number;
    /** Show a faint "✎ edit" cue in the corner on hover/focus (stat boxes). */
    showHint?: boolean;
    className?: string;
    /** Called with a valid, changed value. The caller saves it (and handles failures). */
    onSave: (value: number) => void;
}

/**
 * A number you can click (or focus + Enter) to edit. Enter saves, Escape cancels,
 * leaving the field saves a valid value and discards an invalid one.
 */
export function EditableNumber({ label, value, display, sublabel, description, min, max, showHint = false, className, onSave }: EditableNumberProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState('');
    const [error, setError] = useState('');
    const editingRef = useRef(false);
    const wasEditing = useRef(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const id = useId();
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    useEffect(() => {
        // Return focus to the value after editing so keyboard users keep their place.
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

    if (editing) {
        return (
            <span className="editable-number-editing">
                <input
                    className="stat-edit-input"
                    type="text"
                    inputMode="numeric"
                    aria-label={label}
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
                {error && <span className="field-error" id={errorId} role="alert">{error}</span>}
            </span>
        );
    }

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className={className ? `stat-edit-button ${className}` : 'stat-edit-button'}
                onClick={start}
                aria-label={`${label}: ${value}. Edit`}
                aria-describedby={description ? descriptionId : undefined}
                title={description ? `${description}\nClick to edit` : `Edit ${label}`}
            >
                <span>{display ?? value}</span>
                {sublabel && <span className="stat-sublabel">{sublabel}</span>}
                {showHint && <span className="stat-edit-hint" aria-hidden="true">✎ edit</span>}
            </button>
            {description && <span id={descriptionId} className="visually-hidden">{description}</span>}
        </>
    );
}

interface EditableStatProps extends Omit<EditableNumberProps, 'showHint' | 'className'> {
    highlight?: boolean;
    /** Shown while the value is a manual override: puts the calculated default back. */
    onReset?: () => void;
    /** Accessible name and tooltip of the reset button, e.g. "Reset AC to calculated 13". */
    resetLabel?: string;
}

/** A header stat (Speed, AC) that can be edited in place, and reset when overridden. */
export function EditableStat({ highlight = false, onReset, resetLabel, ...props }: EditableStatProps) {
    const resetName = resetLabel ?? `Reset ${props.label}`;
    return (
        <div className={highlight ? 'stat-box highlight' : 'stat-box'}>
            <div className="stat-label" aria-hidden="true">{props.label}</div>
            <div className="stat-value">
                <EditableNumber {...props} showHint />
            </div>
            {onReset && (
                <button type="button" className="stat-reset no-print" onClick={onReset} aria-label={resetName} title={resetName}>
                    <span aria-hidden="true">↺</span>
                    <span className="stat-reset-text" aria-hidden="true">reset</span>
                </button>
            )}
        </div>
    );
}
