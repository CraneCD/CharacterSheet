'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button, describeError, Field, Modal, TextField } from '@/app/components/ui';

interface CreateCampaignDialogProps {
    onClose: () => void;
    onCreated: (campaign: { id: string; name: string }) => void;
}

export default function CreateCampaignDialog({ onClose, onCreated }: CreateCampaignDialogProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Give the campaign a name');
            return;
        }
        setSaving(true);
        setError('');
        try {
            onCreated(await api.post('/campaigns', { name: name.trim(), description: description.trim() || undefined }));
        } catch (err) {
            setError(describeError("Couldn't create the campaign", err));
            setSaving(false);
        }
    };

    return (
        <Modal title="New campaign" onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>You&apos;ll be its Dungeon Master. Players join with a code you share.</p>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus required />
                <Field label="Description" hint="Optional. Players see this too.">
                    {(p) => <textarea {...p} className="input" rows={3} maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)} />}
                </Field>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>Create campaign</Button>
                </div>
            </form>
        </Modal>
    );
}
