'use client';

import { useId, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { Button, ConfirmDialog, describeError, Field, Modal, SectionHeader, TextField, useToast } from '@/app/components/ui';
import type { CharacterFeature, ClassResource } from '@/lib/types';
import { FeatureEntry, FeatureGroup, featureSummary, filterFeatureGroups } from '@/lib/featureList';
import { countersForFeature } from '@/lib/featureUses';
import { useSheetLimitedUses, type LimitedUses } from './ClassResourcesSection';
import UsesTracker, { resetLabel } from '../UsesTracker';
import { useSheetReadOnly } from '../../SheetReadOnly';

type Filter = 'all' | 'uses' | 'custom';

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'uses', label: 'Limited use' },
    { id: 'custom', label: 'Custom' },
];

interface FeaturesCardProps {
    characterId: string;
    groups: FeatureGroup[];
    /** data.features as stored (indexes in `groups` point into it) */
    storedFeatures: CharacterFeature[];
    onFeaturesChange: (features: CharacterFeature[]) => void;
}

/** Species traits, background, feats, class and subclass features and your own, with their uses. */
export default function FeaturesCard({ characterId, groups, storedFeatures, onFeaturesChange }: FeaturesCardProps) {
    const uses = useSheetLimitedUses();
    const readOnly = useSheetReadOnly();
    const toast = useToast();
    const searchId = useId();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    const [editing, setEditing] = useState<FeatureEntry | 'new' | null>(null);
    const [removing, setRemoving] = useState<FeatureEntry | null>(null);
    const [busy, setBusy] = useState(false);

    const countersFor = (entry: FeatureEntry) => countersForFeature(uses.resources, entry.name);
    const visible = filterFeatureGroups(groups, query, (entry) =>
        filter === 'all' || (filter === 'custom' ? entry.custom : countersFor(entry).length > 0));
    const visibleKeys = visible.flatMap((g) => g.entries.map((e) => e.key));
    const allExpanded = visibleKeys.length > 0 && visibleKeys.every((k) => expanded.has(k));
    const total = groups.reduce((n, g) => n + g.entries.length, 0);

    const toggle = (key: string) => setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key); else next.add(key);
        return next;
    });

    const remove = async (entry: FeatureEntry) => {
        if (entry.storedIndex === undefined) return;
        setBusy(true);
        try {
            await api.delete(`/characters/${characterId}/features`, { data: { index: entry.storedIndex, name: storedFeatures[entry.storedIndex]?.name } });
            onFeaturesChange(storedFeatures.filter((_, i) => i !== entry.storedIndex));
            const counter = uses.resources[entry.name];
            if (counter?.source === 'custom') await uses.remove(entry.name);
            setRemoving(null);
        } catch (err) {
            console.error('Failed to remove feature', err);
            toast.error(describeError(`Couldn't remove ${entry.name}`, err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="card features-card">
            <SectionHeader
                title="Features & Traits"
                actions={!readOnly && <Button size="sm" onClick={() => setEditing('new')}>+ Add feature</Button>}
            />

            {total > 0 && (
                <div className="features-toolbar no-print">
                    <label htmlFor={searchId} className="visually-hidden">Search features</label>
                    <input
                        id={searchId}
                        type="search"
                        className="input features-search"
                        placeholder="Search features"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="features-filters" role="group" aria-label="Show">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                className="filter-chip"
                                aria-pressed={filter === f.id}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="features-expand-all"
                            onClick={() => setExpanded(allExpanded ? new Set() : new Set(visibleKeys))}
                            disabled={visibleKeys.length === 0}
                        >
                            {allExpanded ? 'Collapse all' : 'Expand all'}
                        </Button>
                    </div>
                </div>
            )}

            {visible.map((group) => (
                <section key={group.id} className="feature-group" aria-labelledby={`${searchId}-${group.id}`}>
                    <h4 className="feature-group-title" id={`${searchId}-${group.id}`}>
                        {group.label} <span className="feature-group-count">{group.entries.length}</span>
                    </h4>
                    <ul className="feature-list">
                        {group.entries.map((entry) => (
                            <FeatureRow
                                key={entry.key}
                                entry={entry}
                                counters={countersFor(entry)}
                                expanded={expanded.has(entry.key)}
                                onToggle={() => toggle(entry.key)}
                                onUse={(name, current) => uses.setCurrent(name, current)}
                                onEdit={!readOnly && entry.custom ? () => setEditing(entry) : undefined}
                                onRemove={!readOnly && entry.removable ? () => setRemoving(entry) : undefined}
                            />
                        ))}
                    </ul>
                </section>
            ))}

            {total === 0 && <p className="features-empty">No features recorded yet.</p>}
            {total > 0 && visible.length === 0 && (
                <p className="features-empty" role="status">
                    No features match.{' '}
                    <Button variant="ghost" size="sm" onClick={() => { setQuery(''); setFilter('all'); }}>Show all</Button>
                </p>
            )}

            {editing && (
                <CustomFeatureDialog
                    characterId={characterId}
                    entry={editing === 'new' ? null : editing}
                    storedFeatures={storedFeatures}
                    uses={uses}
                    onFeaturesChange={onFeaturesChange}
                    onClose={() => setEditing(null)}
                />
            )}
            {removing && (
                <ConfirmDialog
                    title={`Remove ${removing.name}?`}
                    confirmLabel="Remove"
                    danger
                    busy={busy}
                    onConfirm={() => remove(removing)}
                    onCancel={() => setRemoving(null)}
                >
                    {removing.custom
                        ? 'It comes off your sheet, with any uses you track for it.'
                        : 'It comes off your sheet. Rules it gives (bonuses, uses) go with it.'}
                </ConfirmDialog>
            )}
        </div>
    );
}

interface FeatureRowProps {
    entry: FeatureEntry;
    /** A trait can have several (Elven Lineage: one per free spell) */
    counters: [string, ClassResource][];
    expanded: boolean;
    onToggle: () => void;
    onUse: (counterName: string, current: number) => void;
    onEdit?: () => void;
    onRemove?: () => void;
}

function FeatureRow({ entry, counters, expanded, onToggle, onUse, onEdit, onRemove }: FeatureRowProps) {
    const descriptionId = useId();
    const summary = featureSummary(entry.description);
    return (
        <li className="feature-row" data-expanded={expanded || undefined}>
            <button type="button" className="feature-toggle" aria-expanded={expanded} aria-controls={descriptionId} onClick={onToggle}>
                <span className="feature-chevron" aria-hidden="true">{expanded ? '▾' : '▸'}</span>
                <span className="feature-title">
                    <span className="feature-name">{entry.name}</span>
                    {entry.detail && <span className="feature-detail">{entry.detail}</span>}
                </span>
                {!expanded && summary && <span className="feature-summary">{summary}</span>}
            </button>
            {counters.map(([name, counter]) => (
                <div key={name} className="feature-uses">
                    {counter.name !== entry.name && <span className="feature-uses-name">{counter.name}</span>}
                    <UsesTracker resource={counter} onChange={(current) => onUse(name, current)} />
                    <span className="reset-tag">{resetLabel(counter)}</span>
                </div>
            ))}
            <div id={descriptionId} className="feature-description" hidden={!expanded}>
                {entry.description ? <p>{entry.description}</p> : <p className="features-empty">No description.</p>}
                {(onEdit || onRemove) && (
                    <div className="feature-actions no-print">
                        {onEdit && <Button variant="secondary" size="sm" onClick={onEdit}>Edit</Button>}
                        {onRemove && <Button variant="ghost" size="sm" onClick={onRemove}>Remove</Button>}
                    </div>
                )}
            </div>
        </li>
    );
}

interface CustomFeatureDialogProps {
    characterId: string;
    /** The entry being edited, or null to add one */
    entry: FeatureEntry | null;
    storedFeatures: CharacterFeature[];
    uses: LimitedUses;
    onFeaturesChange: (features: CharacterFeature[]) => void;
    onClose: () => void;
}

/** Add or edit one of your own features, optionally with limited uses. */
function CustomFeatureDialog({ characterId, entry, storedFeatures, uses, onFeaturesChange, onClose }: CustomFeatureDialogProps) {
    const toast = useToast();
    const stored = entry?.storedIndex !== undefined ? storedFeatures[entry.storedIndex] : undefined;
    const existingCounter = entry ? uses.resources[entry.name] : undefined;
    const ownCounter = existingCounter?.source === 'custom' ? existingCounter : undefined;

    const [name, setName] = useState(stored?.name ?? '');
    const [source, setSource] = useState(stored?.source && stored.source !== 'Custom' ? stored.source : '');
    const [description, setDescription] = useState(stored?.description ?? '');
    const [hasUses, setHasUses] = useState(!!ownCounter);
    const [maxUses, setMaxUses] = useState(String(ownCounter?.max ?? 1));
    const [reset, setReset] = useState<ClassResource['resetType']>(ownCounter?.resetType ?? 'long');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const takenByOther = useMemo(() => {
        const trimmed = name.trim();
        const other = uses.resources[trimmed];
        return hasUses && !!other && !(other.source === 'custom' && trimmed === entry?.name);
    }, [name, hasUses, uses.resources, entry?.name]);

    const save = async () => {
        const trimmed = name.trim();
        const max = Number(maxUses);
        if (!trimmed) return setError('Give the feature a name.');
        if (hasUses && (!Number.isInteger(max) || max < 1 || max > 999)) return setError('Uses must be a whole number from 1 to 999.');
        if (takenByOther) return setError(`There's already a counter called ${trimmed}. Pick another name.`);
        setError('');
        setSaving(true);
        const feature: CharacterFeature = {
            ...(stored ?? {}),
            name: trimmed,
            source: source.trim() || 'Custom',
            description: description.trim(),
            custom: true,
        };
        try {
            if (entry && entry.storedIndex !== undefined) {
                await api.put(`/characters/${characterId}/features`, { index: entry.storedIndex, name: stored?.name, feature });
                onFeaturesChange(storedFeatures.map((f, i) => (i === entry.storedIndex ? feature : f)));
            } else {
                await api.post(`/characters/${characterId}/features`, { feature });
                onFeaturesChange([...storedFeatures, feature]);
            }
            // Counter: renamed, added, changed or dropped with the feature's uses
            if (ownCounter && (!hasUses || ownCounter.name !== trimmed)) await uses.remove(ownCounter.name);
            if (hasUses) {
                // Renaming or changing the maximum keeps the uses already spent
                const keep = ownCounter ? ownCounter.current : max;
                await uses.upsert({
                    name: trimmed,
                    current: Math.min(keep, max),
                    max,
                    resetType: reset,
                    source: 'custom',
                    feature: trimmed,
                    ...(feature.description && { description: featureSummary(feature.description) }),
                });
            }
            onClose();
        } catch (err) {
            console.error('Failed to save feature', err);
            toast.error(describeError(entry ? `Couldn't save ${trimmed}` : `Couldn't add ${trimmed}`, err));
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            title={entry ? `Edit ${entry.name}` : 'Add a feature'}
            onClose={onClose}
            dismissible={!saving}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button onClick={save} loading={saving}>{entry ? 'Save' : 'Add feature'}</Button>
                </>
            }
        >
            <form className="custom-feature-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus required maxLength={100} />
                <TextField label="Source" hint="Optional, e.g. Magic item, Blessing, House rule" value={source} onChange={(e) => setSource(e.target.value)} maxLength={100} />
                <Field label="Description">
                    {(p) => <textarea {...p} className="input" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={5000} />}
                </Field>
                <label className="checkbox-row">
                    <input type="checkbox" checked={hasUses} onChange={(e) => setHasUses(e.target.checked)} />
                    Has limited uses
                </label>
                {hasUses && (
                    <div className="custom-feature-uses">
                        <TextField label="Uses" type="number" inputMode="numeric" min={1} max={999} value={maxUses} onChange={(e) => setMaxUses(e.target.value)} />
                        <Field label="Regain">
                            {(p) => (
                                <select {...p} className="input" value={reset} onChange={(e) => setReset(e.target.value as ClassResource['resetType'])}>
                                    <option value="long">On a Long Rest</option>
                                    <option value="short">On a Short or Long Rest</option>
                                    <option value="none">Never (by hand)</option>
                                </select>
                            )}
                        </Field>
                    </div>
                )}
                {error && <p className="field-error" role="alert">{error}</p>}
                <button type="submit" hidden />
            </form>
        </Modal>
    );
}
