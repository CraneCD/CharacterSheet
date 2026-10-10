'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { describeError, SectionHeader, useToast } from '@/app/components/ui';

interface NotesPanelProps {
    campaignId: string;
    initialNotes: string;
    onSaved: (notes: string) => void;
}

const SAVE_DELAY_MS = 800;

/** The DM's private notes (NPCs, plot threads, secrets). Saves as you type; players never see them. */
export default function NotesPanel({ campaignId, initialNotes, onSaved }: NotesPanelProps) {
    const [text, setText] = useState(initialNotes);
    const [status, setStatus] = useState<'saved' | 'pending' | 'saving' | 'error'>('saved');
    const savedText = useRef(initialNotes);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latest = useRef(text);
    const id = useId();
    const toast = useToast();
    latest.current = text;

    const save = async () => {
        const value = latest.current;
        if (value === savedText.current) {
            setStatus('saved');
            return;
        }
        setStatus('saving');
        try {
            await api.patch(`/campaigns/${campaignId}`, { notes: value });
            savedText.current = value;
            onSaved(value);
            setStatus(latest.current === value ? 'saved' : 'pending');
        } catch (err) {
            setStatus('error');
            toast.error(describeError("Couldn't save your notes", err));
        }
    };

    const schedule = () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(save, SAVE_DELAY_MS);
    };

    // Save anything still pending when leaving the tab
    useEffect(() => () => {
        if (timer.current) {
            clearTimeout(timer.current);
            if (latest.current !== savedText.current) {
                api.patch(`/campaigns/${campaignId}`, { notes: latest.current }).catch(() => undefined);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const statusText = { saved: 'Saved', pending: 'Unsaved changes', saving: 'Saving…', error: "Couldn't save. Keep typing to retry." }[status];

    return (
        <section className="card" aria-labelledby={`${id}-title`}>
            <SectionHeader title="DM notes" id={`${id}-title`} as="h2" actions={<span className="notes-status" aria-live="polite">{statusText}</span>} />
            <label htmlFor={`${id}-text`} className="visually-hidden">DM notes</label>
            <textarea
                id={`${id}-text`}
                className="input campaign-notes"
                value={text}
                placeholder="NPCs, locations, plot threads, secrets… Only you can see these."
                maxLength={50000}
                onChange={(e) => {
                    setText(e.target.value);
                    setStatus('pending');
                    schedule();
                }}
                onBlur={() => {
                    if (timer.current) clearTimeout(timer.current);
                    void save();
                }}
            />
        </section>
    );
}
