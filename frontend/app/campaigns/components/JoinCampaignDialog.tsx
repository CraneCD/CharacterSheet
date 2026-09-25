'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { displayName } from '@/lib/characterTransfer';
import { Button, describeError, Field, Modal, TextField } from '@/app/components/ui';

interface MyCharacter {
    id: string;
    name: string;
    class: string;
    level: number;
    campaign?: { id: string; name: string } | null;
}

interface JoinCampaignDialogProps {
    onClose: () => void;
    onJoined: (campaign: { id: string; name: string }) => void;
}

/** Join with the DM's code, optionally bringing one of your characters (moving it out of its current campaign). */
export default function JoinCampaignDialog({ onClose, onJoined }: JoinCampaignDialogProps) {
    const [code, setCode] = useState('');
    const [characters, setCharacters] = useState<MyCharacter[]>([]);
    const [characterId, setCharacterId] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/characters').then(setCharacters).catch(() => setCharacters([]));
    }, []);

    const chosen = characters.find((c) => c.id === characterId);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Enter the code your DM gave you');
            return;
        }
        setSaving(true);
        setError('');
        try {
            const result = await api.post('/campaigns/join', { joinCode: code, characterId: characterId || undefined });
            onJoined(result.campaign);
        } catch (err) {
            setError(describeError("Couldn't join", err));
            setSaving(false);
        }
    };

    return (
        <Modal title="Join a campaign" size="sm" onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <TextField
                    label="Join code"
                    hint="Six letters and numbers, from your DM"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    maxLength={12}
                    className="join-code-input"
                    autoFocus
                />
                <Field
                    label="Bring a character"
                    hint={chosen?.campaign ? `${chosen.name} will leave ${chosen.campaign.name}.` : 'You can pick one later too.'}
                >
                    {(p) => (
                        <select {...p} className="input" value={characterId} onChange={(e) => setCharacterId(e.target.value)}>
                            <option value="">Decide later</option>
                            {characters.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} (Level {c.level} {displayName(c.class)}){c.campaign ? ` · in ${c.campaign.name}` : ''}
                                </option>
                            ))}
                        </select>
                    )}
                </Field>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>Join</Button>
                </div>
            </form>
        </Modal>
    );
}
