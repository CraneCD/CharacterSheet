'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/api';
import { describePrepCounts, parsePrepFile, PrepParseResult } from '@/lib/campaignPrep';
import { Button, describeError, Modal } from '@/app/components/ui';

interface ImportPrepDialogProps {
    /** Add to this campaign; without it the file starts a new campaign */
    into?: { id: string; name: string };
    onClose: () => void;
    onImported: (result: { campaign?: { id: string; name: string }; counts: { sessions: number; encounters: number; monsters: number; items: number } }) => void;
}

/**
 * Pick a campaign prep file, see what's in it, then import it: as a new
 * campaign you DM, or into an existing one. The server checks the file too
 * and imports all of it or nothing.
 */
export default function ImportPrepDialog({ into, onClose, onImported }: ImportPrepDialogProps) {
    const [file, setFile] = useState<{ name: string; result: PrepParseResult } | null>(null);
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const choose = () => {
        setError('');
        if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
    };

    const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (!picked) return;
        setError('');
        try {
            setFile({ name: picked.name, result: parsePrepFile(await picked.text()) });
        } catch {
            setFile({ name: picked.name, result: { ok: false, error: "This file couldn't be read." } });
        }
    };

    const confirm = async () => {
        if (!file?.result.ok) return;
        setImporting(true);
        setError('');
        try {
            const result = into
                ? await api.post(`/campaigns/${into.id}/prep`, file.result.prep)
                : await api.post('/campaigns/import', file.result.prep);
            onImported(result);
        } catch (err) {
            setError(describeError("Couldn't import this file", err));
            setImporting(false);
        }
    };

    const summary = file?.result.ok ? file.result.summary : null;

    return (
        <Modal
            title={into ? `Import prep into ${into.name}` : 'New campaign from a prep file'}
            onClose={onClose}
            dismissible={!importing}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={importing}>Cancel</Button>
                    {file && <Button variant="secondary" onClick={choose} disabled={importing}>Choose another file</Button>}
                    {summary ? (
                        <Button onClick={confirm} loading={importing}>{into ? 'Import' : 'Create campaign'}</Button>
                    ) : (
                        !file && <Button onClick={choose}>Choose a file…</Button>
                    )}
                </>
            }
        >
            <input ref={inputRef} type="file" accept="application/json,.json" hidden onChange={onFile} data-testid="prep-file-input" />
            {!file && (
                <p style={{ marginTop: 0 }}>
                    A prep file holds a campaign&apos;s DM notes, planned sessions, encounters, custom monsters and loot.
                    Export one from any campaign you run (⋯ → Export prep){into ? '' : ', or get one from another DM'}.
                </p>
            )}
            {file && <p className="import-file">{file.name}</p>}
            {file && !file.result.ok && <div className="form-error" role="alert">{file.result.error}</div>}
            {summary && (
                <div className="prep-preview">
                    <p className="prep-preview-name">{summary.name}</p>
                    {summary.description && <p className="campaign-description" style={{ marginTop: 0 }}>{summary.description}</p>}
                    <p style={{ margin: 0 }}>
                        {into ? 'Adds' : 'Includes'} {describePrepCounts(summary)}{summary.hasNotes ? (into ? ', and adds its notes after yours' : ', plus DM notes') : ''}.
                    </p>
                    <p className="field-hint">
                        Encounters arrive as planned fights (add the party when you run them). Sessions and loot stay hidden from players until you share or reveal them.
                        {summary.monsters > 0 ? ' Custom monsters are added to your bestiary.' : ''}
                    </p>
                </div>
            )}
            {error && <div className="form-error" role="alert">{error}</div>}
        </Modal>
    );
}
