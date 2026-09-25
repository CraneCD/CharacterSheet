'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CampaignSessionEntry, formatSessionDate, toDateInput } from '@/lib/campaigns';
import { Button, ConfirmDialog, describeError, Field, Modal, SectionHeader, Skeleton, TextField, useToast } from '@/app/components/ui';

interface SessionsPanelProps {
    campaignId: string;
    isDm: boolean;
}

interface SessionDraft {
    id?: string;
    title: string;
    playedOn: string;
    recap: string;
    dmNotes: string;
}

const today = () => new Date().toISOString().slice(0, 10);

function SessionForm({ draft, sessionNumber, onClose, onSaved, campaignId }: {
    draft: SessionDraft;
    sessionNumber: number;
    campaignId: string;
    onClose: () => void;
    onSaved: (session: CampaignSessionEntry) => void;
}) {
    const [value, setValue] = useState(draft);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const set = (patch: Partial<SessionDraft>) => setValue((v) => ({ ...v, ...patch }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.title.trim()) {
            setError('Give the session a title');
            return;
        }
        setSaving(true);
        setError('');
        const body = { title: value.title.trim(), playedOn: value.playedOn || null, recap: value.recap, dmNotes: value.dmNotes };
        try {
            const saved = value.id
                ? await api.put(`/campaigns/${campaignId}/sessions/${value.id}`, body)
                : await api.post(`/campaigns/${campaignId}/sessions`, body);
            onSaved(saved);
        } catch (err) {
            setError(describeError("Couldn't save the session", err));
            setSaving(false);
        }
    };

    return (
        <Modal title={value.id ? 'Edit session' : `Session ${sessionNumber}`} size="lg" onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <div className="form-row">
                    <TextField label="Title" value={value.title} onChange={(e) => set({ title: e.target.value })} maxLength={150} autoFocus />
                    <TextField label="Played on" type="date" value={value.playedOn} onChange={(e) => set({ playedOn: e.target.value })} />
                </div>
                <Field label="Recap" hint="Players can read this.">
                    {(p) => <textarea {...p} className="input" rows={6} maxLength={20000} value={value.recap} onChange={(e) => set({ recap: e.target.value })} />}
                </Field>
                <Field label="DM notes" hint="Only you see these: what's coming, loose threads, loot to hand out.">
                    {(p) => <textarea {...p} className="input" rows={4} maxLength={20000} value={value.dmNotes} onChange={(e) => set({ dmNotes: e.target.value })} />}
                </Field>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>Save session</Button>
                </div>
            </form>
        </Modal>
    );
}

/** Session log: recaps everyone can read, plus the DM's private notes per session. */
export default function SessionsPanel({ campaignId, isDm }: SessionsPanelProps) {
    const [sessions, setSessions] = useState<CampaignSessionEntry[] | null>(null);
    const [loadError, setLoadError] = useState('');
    const [editing, setEditing] = useState<SessionDraft | null>(null);
    const [deleting, setDeleting] = useState<CampaignSessionEntry | null>(null);
    const [busy, setBusy] = useState(false);
    const toast = useToast();

    const load = () => {
        setLoadError('');
        api.get(`/campaigns/${campaignId}/sessions`)
            .then(setSessions)
            .catch((err) => setLoadError(describeError("Couldn't load the session log", err)));
    };
    useEffect(load, [campaignId]);

    const remove = async () => {
        if (!deleting) return;
        setBusy(true);
        try {
            await api.delete(`/campaigns/${campaignId}/sessions/${deleting.id}`);
            setSessions((list) => (list ?? []).filter((s) => s.id !== deleting.id));
            setDeleting(null);
        } catch (err) {
            toast.error(describeError("Couldn't delete the session", err));
        } finally {
            setBusy(false);
        }
    };

    const count = sessions?.length ?? 0;

    return (
        <section className="card" aria-labelledby="sessions-title">
            <SectionHeader
                title="Session log"
                id="sessions-title"
                as="h2"
                actions={isDm ? (
                    <Button size="sm" onClick={() => setEditing({ title: `Session ${count + 1}`, playedOn: today(), recap: '', dmNotes: '' })}>
                        + Log a session
                    </Button>
                ) : undefined}
            />
            {loadError && (
                <div className="form-error" role="alert">
                    {loadError} <Button variant="secondary" size="sm" onClick={load}>Try again</Button>
                </div>
            )}
            {sessions === null && !loadError ? (
                <div aria-busy="true" aria-label="Loading sessions" className="stack"><Skeleton height="3rem" /><Skeleton height="3rem" /></div>
            ) : sessions && sessions.length === 0 ? (
                <p className="empty-note">{isDm ? 'Nothing logged yet. After each session, jot down what happened.' : 'Your DM hasn’t posted any session recaps yet.'}</p>
            ) : (
                <ol className="session-list" reversed>
                    {(sessions ?? []).map((s) => (
                        <li key={s.id} className="session-item">
                            <div className="session-item-head">
                                <h3 className="session-title">{s.title}</h3>
                                {s.playedOn && <span className="session-date">{formatSessionDate(s.playedOn)}</span>}
                                {isDm && (
                                    <span className="session-actions">
                                        <Button variant="ghost" size="sm" onClick={() => setEditing({ id: s.id, title: s.title, playedOn: toDateInput(s.playedOn), recap: s.recap, dmNotes: s.dmNotes ?? '' })}>Edit</Button>
                                        <Button variant="ghost" size="sm" onClick={() => setDeleting(s)} aria-label={`Delete ${s.title}`}>Delete</Button>
                                    </span>
                                )}
                            </div>
                            {s.recap ? <p className="session-recap">{s.recap}</p> : <p className="empty-note">No recap yet.</p>}
                            {isDm && s.dmNotes && (
                                <div className="session-dm-notes">
                                    <strong>DM notes:</strong> {s.dmNotes}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            )}

            {editing && (
                <SessionForm
                    draft={editing}
                    sessionNumber={count + 1}
                    campaignId={campaignId}
                    onClose={() => setEditing(null)}
                    onSaved={(saved) => {
                        setSessions((list) => {
                            const rest = (list ?? []).filter((s) => s.id !== saved.id);
                            return [saved, ...rest].sort((a, b) => (b.playedOn ?? '9999').localeCompare(a.playedOn ?? '9999') || b.createdAt.localeCompare(a.createdAt));
                        });
                        setEditing(null);
                    }}
                />
            )}
            {deleting && (
                <ConfirmDialog title={`Delete "${deleting.title}"?`} confirmLabel="Delete" danger busy={busy} onConfirm={remove} onCancel={() => setDeleting(null)}>
                    The recap and your notes for this session will be gone for good.
                </ConfirmDialog>
            )}
        </section>
    );
}
