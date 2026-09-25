'use client';

import { useId, useState } from 'react';
import { Button, SectionHeader } from '@/app/components/ui';
import { STANDARD_LANGUAGES } from '@/lib/wizardReference';
import { useSheetReadOnly } from '../../SheetReadOnly';

interface LanguagesCardProps {
    languages: string[];
    onAdd: (language: string) => void;
    onRemove: (language: string) => void;
}

/** Languages as removable chips, with a standard-language picker and a custom field. */
export function LanguagesEditor({ languages, onAdd, onRemove }: LanguagesCardProps) {
    const readOnly = useSheetReadOnly();
    const [custom, setCustom] = useState('');
    const id = useId();
    const available = STANDARD_LANGUAGES.filter((lang) => !languages.includes(lang));

    const addCustom = () => {
        const value = custom.trim();
        if (!value) return;
        onAdd(value);
        setCustom('');
    };

    return (
        <div className="languages-editor">
            {languages.length > 0 ? (
                <ul className="chip-list">
                    {languages.map((lang) => (
                        <li key={lang} className="chip">
                            <span>{lang}</span>
                            {!readOnly && <button
                                type="button"
                                className="chip-remove"
                                onClick={() => onRemove(lang)}
                                aria-label={`Remove ${lang}`}
                                title="Remove language"
                            >
                                &times;
                            </button>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-note">No languages recorded</p>
            )}
            {!readOnly && <div className="languages-add">
                <label className="visually-hidden" htmlFor={`${id}-standard`}>Add a standard language</label>
                <select
                    id={`${id}-standard`}
                    className="input"
                    value=""
                    onChange={(e) => {
                        if (e.target.value) onAdd(e.target.value);
                    }}
                >
                    <option value="">Add a language…</option>
                    {available.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
                <form
                    className="languages-custom"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addCustom();
                    }}
                >
                    <label className="visually-hidden" htmlFor={`${id}-custom`}>Custom language</label>
                    <input
                        id={`${id}-custom`}
                        type="text"
                        className="input"
                        placeholder="Custom language…"
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                    />
                    <Button type="submit" variant="secondary" disabled={!custom.trim()}>Add</Button>
                </form>
            </div>}
        </div>
    );
}

export default function LanguagesCard(props: LanguagesCardProps) {
    return (
        <div className="card">
            <SectionHeader title="Languages" />
            <LanguagesEditor {...props} />
        </div>
    );
}
