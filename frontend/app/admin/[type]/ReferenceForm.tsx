'use client';
import { useState } from 'react';
import { FIELD_CONFIGS, FieldConfig, ReferenceType } from '@/lib/adminReference';

interface ReferenceFormProps {
    type: ReferenceType;
    /** undefined when creating a new entry. */
    initialKey?: string;
    initialData?: any;
    onSubmit: (key: string | undefined, data: any) => Promise<void>;
    onCancel: () => void;
}

interface ClassFeatureRow {
    level: number;
    name: string;
    description: string;
}

function toDisplayValue(kind: FieldConfig['kind'], value: any): string {
    if (value === undefined || value === null) return '';
    if (kind === 'stringArray') return Array.isArray(value) ? value.join(', ') : '';
    if (kind === 'boolean') return value ? 'true' : 'false';
    return String(value);
}

function buildInitialSimpleValues(fields: FieldConfig[], data: any): Record<string, string> {
    const values: Record<string, string> = {};
    for (const f of fields) {
        values[f.key] = toDisplayValue(f.kind, data?.[f.key]);
    }
    return values;
}

function buildInitialOtherJson(type: ReferenceType, fields: FieldConfig[], data: any): string {
    const rest = { ...(data || {}) };
    delete rest.id; // canonical id is derived from the row's key, not stored
    if (type === 'trait') delete rest.name; // trait name is edited via the Name field, which doubles as the key
    for (const f of fields) delete rest[f.key];
    return JSON.stringify(rest, null, 2);
}

export default function ReferenceForm({ type, initialKey, initialData, onSubmit, onCancel }: ReferenceFormProps) {
    const isEditing = initialKey !== undefined;
    const fields = FIELD_CONFIGS[type];

    const [key, setKey] = useState(initialKey ?? '');
    const [simpleValues, setSimpleValues] = useState<Record<string, string>>(() => buildInitialSimpleValues(fields, initialData));
    const [otherJson, setOtherJson] = useState(() => buildInitialOtherJson(type, fields, initialData));
    const [classFeatureRows, setClassFeatureRows] = useState<ClassFeatureRow[]>(() =>
        Array.isArray(initialData) ? initialData.map((f: any) => ({ level: f.level ?? 1, name: f.name ?? '', description: f.description ?? '' })) : []
    );
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (type === 'classFeature') {
            if (!key.trim()) {
                setError('Class id is required (e.g. "wizard").');
                return;
            }
            const data = classFeatureRows.map(r => ({ level: Number(r.level) || 1, name: r.name.trim(), description: r.description.trim() }));
            setSaving(true);
            try {
                await onSubmit(key.trim(), data);
            } catch (err: any) {
                setError(err?.message || 'Failed to save');
            } finally {
                setSaving(false);
            }
            return;
        }

        let data: any;
        try {
            data = otherJson.trim() ? JSON.parse(otherJson) : {};
        } catch {
            setError('The "Other fields" box is not valid JSON.');
            return;
        }
        for (const f of fields) {
            const raw = simpleValues[f.key];
            if (f.kind === 'stringArray') {
                data[f.key] = raw.split(',').map(s => s.trim()).filter(Boolean);
            } else if (f.kind === 'number') {
                data[f.key] = raw === '' ? undefined : Number(raw);
            } else if (f.kind === 'boolean') {
                data[f.key] = raw === 'true';
            } else if (f.kind === 'select') {
                if (raw === '' && f.optional) {
                    delete data[f.key];
                } else {
                    data[f.key] = raw;
                }
            } else {
                data[f.key] = raw;
            }
        }
        if (type === 'trait') {
            // Trait key IS the name; keep them in sync so lookups by name keep working.
            data.name = key.trim();
        }

        setSaving(true);
        try {
            await onSubmit(key.trim() || undefined, data);
        } catch (err: any) {
            setError(err?.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ref-key" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {type === 'classFeature' ? 'Class Id (e.g. "wizard")' : type === 'trait' ? 'Name' : 'Key / Id'}
                </label>
                <input
                    id="ref-key"
                    type="text"
                    className="input"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    disabled={isEditing}
                    placeholder={isEditing || type === 'trait' ? undefined : 'Leave blank to auto-generate from name'}
                    style={{ width: '100%' }}
                />
            </div>

            {type === 'classFeature' ? (
                <div>
                    {classFeatureRows.map((row, i) => (
                        <div key={i} className="card" style={{ marginBottom: '0.75rem', padding: '0.75rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Level"
                                    value={row.level}
                                    onChange={e => {
                                        const rows = [...classFeatureRows];
                                        rows[i] = { ...row, level: Number(e.target.value) };
                                        setClassFeatureRows(rows);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Feature name"
                                    value={row.name}
                                    onChange={e => {
                                        const rows = [...classFeatureRows];
                                        rows[i] = { ...row, name: e.target.value };
                                        setClassFeatureRows(rows);
                                    }}
                                />
                                <button type="button" className="btn btn-ghost" style={{ color: 'var(--error)' }}
                                    onClick={() => setClassFeatureRows(classFeatureRows.filter((_, j) => j !== i))}>
                                    Remove
                                </button>
                            </div>
                            <textarea
                                className="input"
                                placeholder="Description"
                                rows={2}
                                value={row.description}
                                onChange={e => {
                                    const rows = [...classFeatureRows];
                                    rows[i] = { ...row, description: e.target.value };
                                    setClassFeatureRows(rows);
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setClassFeatureRows([...classFeatureRows, { level: 1, name: '', description: '' }])}
                        style={{ marginBottom: '1rem' }}
                    >
                        + Add Feature
                    </button>
                </div>
            ) : (
                <>
                    {fields.map(f => (
                        <div key={f.key} style={{ marginBottom: '1rem' }}>
                            <label htmlFor={`ref-field-${f.key}`} style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                {f.label}
                            </label>
                            {f.kind === 'textarea' ? (
                                <textarea
                                    id={`ref-field-${f.key}`}
                                    className="input"
                                    rows={6}
                                    value={simpleValues[f.key] ?? ''}
                                    onChange={e => setSimpleValues({ ...simpleValues, [f.key]: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            ) : f.kind === 'boolean' ? (
                                <select
                                    id={`ref-field-${f.key}`}
                                    className="input"
                                    value={simpleValues[f.key] ?? 'false'}
                                    onChange={e => setSimpleValues({ ...simpleValues, [f.key]: e.target.value })}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            ) : f.kind === 'select' ? (
                                <select
                                    id={`ref-field-${f.key}`}
                                    className="input"
                                    value={simpleValues[f.key] ?? ''}
                                    onChange={e => setSimpleValues({ ...simpleValues, [f.key]: e.target.value })}
                                >
                                    {f.optional && <option value="">(none)</option>}
                                    {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            ) : (
                                <input
                                    id={`ref-field-${f.key}`}
                                    type={f.kind === 'number' ? 'number' : 'text'}
                                    className="input"
                                    value={simpleValues[f.key] ?? ''}
                                    onChange={e => setSimpleValues({ ...simpleValues, [f.key]: e.target.value })}
                                    style={{ width: '100%' }}
                                />
                            )}
                        </div>
                    ))}

                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="ref-other-json" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Other fields (JSON) — anything not covered above (e.g. prerequisites, nested feature lists)
                        </label>
                        <textarea id="ref-other-json"
                            className="input"
                            rows={8}
                            value={otherJson}
                            onChange={e => setOtherJson(e.target.value)}
                            style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem' }}
                        />
                    </div>
                </>
            )}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" className="btn" disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
