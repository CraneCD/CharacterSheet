'use client';

import { Button, Modal } from '@/app/components/ui';
import { displayName, ImportResult } from '@/lib/characterTransfer';

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;

interface ImportPreviewDialogProps {
    fileName: string;
    result: ImportResult;
    importing: boolean;
    /** Server error from the last import attempt, shown in the dialog. */
    error?: string;
    onConfirm: () => void;
    onChooseAnother: () => void;
    onCancel: () => void;
}

function count(value: unknown): number {
    return Array.isArray(value) ? value.length : 0;
}

/** Shows what's in an exported character file before it's added to the account. */
export default function ImportPreviewDialog({ fileName, result, importing, error, onConfirm, onChooseAnother, onCancel }: ImportPreviewDialogProps) {
    if (!result.ok) {
        return (
            <Modal
                title="Can't import this file"
                size="sm"
                onClose={onCancel}
                footer={
                    <>
                        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                        <Button onClick={onChooseAnother}>Choose another file</Button>
                    </>
                }
            >
                <p className="import-file">{fileName}</p>
                <div className="form-error" role="alert" style={{ marginBottom: 0 }}>{result.error}</div>
            </Modal>
        );
    }

    const { payload, warnings } = result;
    const data = payload.data;
    const scores = data.abilityScores || {};
    const hp = data.hp;

    return (
        <Modal
            title="Import character"
            onClose={onCancel}
            dismissible={!importing}
            footer={
                <>
                    <Button variant="secondary" onClick={onCancel} disabled={importing}>Cancel</Button>
                    <Button onClick={onConfirm} loading={importing}>Import {payload.name}</Button>
                </>
            }
        >
            <p className="import-file">{fileName}</p>
            <div className="import-preview">
                <div>
                    <div className="import-preview-name">{payload.name}</div>
                    <div className="import-preview-meta">
                        Level {payload.level} {displayName(payload.race)} {displayName(payload.class)}
                    </div>
                </div>
                <dl className="import-preview-stats">
                    {hp && (
                        <div><dt>HP</dt><dd>{hp.current ?? '?'}/{hp.max ?? '?'}</dd></div>
                    )}
                    {ABILITIES.filter((a) => typeof scores[a] === 'number').map((a) => (
                        <div key={a}><dt>{a.toUpperCase()}</dt><dd>{scores[a]}</dd></div>
                    ))}
                </dl>
                <p className="import-preview-counts">
                    {count(data.spells)} spells · {count(data.equipment)} items · {count(data.features)} features
                </p>
            </div>
            {warnings.length > 0 && (
                <ul className="import-warnings" aria-label="Warnings">
                    {warnings.map((w) => <li key={w}>{w}</li>)}
                </ul>
            )}
            {error && <div className="form-error" role="alert" style={{ marginTop: 'var(--space-4)', marginBottom: 0 }}>{error}</div>}
            <p className="import-note">It will be added as a new character; nothing existing is changed.</p>
        </Modal>
    );
}
