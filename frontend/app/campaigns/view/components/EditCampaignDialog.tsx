'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button, describeError, Field, Modal, TextField } from '@/app/components/ui';

interface EditCampaignDialogProps {
    campaignId: string;
    name: string;
    description: string | null;
    onClose: () => void;
    onSaved: (update: { name: string; description: string | null }) => void;
}

export default function EditCampaignDialog({ campaignId, name: initialName, description: initialDescription, onClose, onSaved }: EditCampaignDialogProps) {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription ?? '');
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
            const updated = await api.patch(`/campaigns/${campaignId}`, { name: name.trim(), description: description.trim() || null });
            onSaved({ name: updated.name, description: updated.description });
        } catch (err) {
            setError(describeError("Couldn't save the campaign", err));
            setSaving(false);
        }
    };

    return (
        <Modal title="Campaign details" onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus />
                <Field label="Description" hint="Players see this too.">
                    {(p) => <textarea {...p} className="input" rows={4} maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)} />}
                </Field>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>Save</Button>
                </div>
            </form>
        </Modal>
    );
}
