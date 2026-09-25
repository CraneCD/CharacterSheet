'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { displayName } from '@/lib/characterTransfer';
import { Button, describeError, Modal, Skeleton } from '@/app/components/ui';

interface MyCharacter {
    id: string;
    name: string;
    class: string;
    level: number;
    campaign?: { id: string; name: string } | null;
}

interface BringCharacterDialogProps {
    campaignId: string;
    campaignName: string;
    onClose: () => void;
    onSaved: () => void;
}

/**
 * Pick which of your characters plays in this campaign. Choosing one moves it
 * out of any other campaign; your current character here leaves this one.
 */
export default function BringCharacterDialog({ campaignId, campaignName, onClose, onSaved }: BringCharacterDialogProps) {
    const [characters, setCharacters] = useState<MyCharacter[] | null>(null);
    const [choice, setChoice] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const groupId = useId();

    useEffect(() => {
        api.get('/characters')
            .then((list: MyCharacter[]) => {
                setCharacters(list);
                setChoice(list.find((c) => c.campaign?.id === campaignId)?.id ?? '');
            })
            .catch((err) => {
                setCharacters([]);
                setError(describeError("Couldn't load your characters", err));
            });
    }, [campaignId]);

    const current = characters?.find((c) => c.campaign?.id === campaignId);
    const chosen = characters?.find((c) => c.id === choice);

    const save = async () => {
        setSaving(true);
        setError('');
        try {
            if (current && current.id !== choice) {
                await api.put('/campaigns/assign-character', { characterId: current.id, campaignId: null });
            }
            if (choice && choice !== current?.id) {
                await api.put('/campaigns/assign-character', { characterId: choice, campaignId });
            }
            onSaved();
        } catch (err) {
            setError(describeError("Couldn't update your character", err));
            setSaving(false);
        }
    };

    return (
        <Modal
            title="Your character"
            size="sm"
            onClose={onClose}
            dismissible={!saving}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button onClick={save} loading={saving} disabled={characters === null || choice === (current?.id ?? '')}>Save</Button>
                </>
            }
        >
            <p id={groupId} style={{ marginTop: 0 }}>Who are you playing in {campaignName}?</p>
            {characters === null ? (
                <Skeleton height="4rem" />
            ) : characters.length === 0 ? (
                <p className="empty-note">You don&apos;t have any characters yet. <Link href="/create">Create one</Link>, then come back.</p>
            ) : (
                <div className="radio-list" role="radiogroup" aria-labelledby={groupId}>
                    {characters.map((c) => (
                        <label key={c.id} className="radio-row">
                            <input type="radio" name="character" value={c.id} checked={choice === c.id} onChange={() => setChoice(c.id)} />
                            <span>
                                {c.name} <small>Level {c.level} {displayName(c.class)}{c.campaign && c.campaign.id !== campaignId ? ` · in ${c.campaign.name}` : ''}</small>
                            </span>
                        </label>
                    ))}
                    {current && (
                        <label className="radio-row">
                            <input type="radio" name="character" value="" checked={choice === ''} onChange={() => setChoice('')} />
                            <span>No character for now</span>
                        </label>
                    )}
                </div>
            )}
            {chosen?.campaign && chosen.campaign.id !== campaignId && (
                <p className="field-hint">{chosen.name} will leave {chosen.campaign.name}.</p>
            )}
            {error && <div className="form-error" role="alert">{error}</div>}
        </Modal>
    );
}
