'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import {
    ABILITY_KEYS, averageRoll, blankMonster, CR_OPTIONS, formatBonusList, formatSaves, Monster, parseBonusList, parseSaves, StatBlockEntry,
} from '@/lib/monsters';
import { Button, describeError, Field, Modal, TextField } from '@/app/components/ui';

type EntryKey = 'traits' | 'actions' | 'bonusActions' | 'reactions';
const ENTRY_SECTIONS: { key: EntryKey; label: string; single: string }[] = [
    { key: 'traits', label: 'Traits', single: 'trait' },
    { key: 'actions', label: 'Actions', single: 'action' },
    { key: 'bonusActions', label: 'Bonus Actions', single: 'bonus action' },
    { key: 'reactions', label: 'Reactions', single: 'reaction' },
];
const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan', 'Medium or Small'];
const ABILITY_LABELS: Record<string, string> = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' };

interface MonsterFormProps {
    /** Edit this custom monster, or start from a copy of an SRD one (no id) */
    initial?: Partial<Monster>;
    onClose: () => void;
    onSaved: (monster: Monster) => void;
}

const numberOr = (value: string, fallback: number) => (value.trim() === '' || !Number.isFinite(Number(value)) ? fallback : Math.round(Number(value)));

function EntryEditor({ label, single, entries, onChange }: { label: string; single: string; entries: StatBlockEntry[]; onChange: (next: StatBlockEntry[]) => void }) {
    const update = (i: number, patch: Partial<StatBlockEntry>) => onChange(entries.map((e, j) => (j === i ? { ...e, ...patch } : e)));
    return (
        <fieldset className="entry-editor">
            <legend>{label}</legend>
            {entries.map((entry, i) => (
                <div key={i} className="entry-editor-row">
                    <div className="form-row">
                        <TextField label="Name" value={entry.name} onChange={(e) => update(i, { name: e.target.value })} maxLength={100} />
                        <TextField
                            label="Attack bonus"
                            hint="Leave blank if it isn't an attack"
                            inputMode="numeric"
                            value={entry.attackBonus ?? ''}
                            onChange={(e) => update(i, { attackBonus: e.target.value.trim() === '' || e.target.value === '-' ? undefined : numberOr(e.target.value, 0) })}
                        />
                        <TextField label="Damage dice" hint="e.g. 1d6+2" value={entry.damage ?? ''} onChange={(e) => update(i, { damage: e.target.value.trim() || undefined })} maxLength={40} />
                    </div>
                    <Field label="Description">
                        {(p) => <textarea {...p} className="input" rows={2} maxLength={4000} value={entry.description} onChange={(e) => update(i, { description: e.target.value })} />}
                    </Field>
                    <Button variant="ghost" size="sm" onClick={() => onChange(entries.filter((_, j) => j !== i))}>Remove {entry.name || single}</Button>
                </div>
            ))}
            <Button variant="secondary" size="sm" onClick={() => onChange([...entries, { name: '', description: '' }])}>+ Add {single}</Button>
        </fieldset>
    );
}

/** Create or edit a custom monster. Fields follow the 2024 stat block. */
export default function MonsterForm({ initial, onClose, onSaved }: MonsterFormProps) {
    const start = { ...blankMonster(), ...initial };
    const [m, setM] = useState<Omit<Monster, 'id'> & { id?: string }>(start);
    const [skillsText, setSkillsText] = useState(formatBonusList(start.skills));
    const [savesText, setSavesText] = useState(formatSaves(start.saves));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const isEdit = !!initial?.id && initial.source === 'custom';
    const set = (patch: Partial<Monster>) => setM((prev) => ({ ...prev, ...patch }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!m.name.trim()) {
            setError('Give the monster a name');
            return;
        }
        if (m.hitDice && averageRoll(m.hitDice) === null) {
            setError('Hit dice should look like 3d8 or 10d10+30');
            return;
        }
        setSaving(true);
        setError('');
        const clean = (entries?: StatBlockEntry[]) => (entries ?? []).filter((x) => x.name.trim()).map((x) => ({ ...x, name: x.name.trim() }));
        const { id: _id, source: _source, ...rest } = m as Monster;
        const body = {
            ...rest,
            name: m.name.trim(),
            hitDice: m.hitDice?.trim() || undefined,
            skills: parseBonusList(skillsText),
            saves: parseSaves(savesText),
            traits: clean(m.traits),
            actions: clean(m.actions),
            bonusActions: clean(m.bonusActions),
            reactions: clean(m.reactions),
        };
        try {
            const saved: Monster = isEdit ? await api.put(`/monsters/${initial!.id}`, body) : await api.post('/monsters', body);
            onSaved(saved);
        } catch (err) {
            setError(describeError("Couldn't save the monster", err));
            setSaving(false);
        }
    };

    return (
        <Modal title={isEdit ? `Edit ${start.name}` : initial?.name ? `New monster from ${initial.name}` : 'New monster'} size="lg" onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <div className="form-row">
                    <TextField label="Name" value={m.name} onChange={(e) => set({ name: e.target.value })} maxLength={100} autoFocus />
                    <Field label="Challenge rating">
                        {(p) => (
                            <select {...p} className="input" value={m.cr} onChange={(e) => set({ cr: e.target.value })}>
                                {CR_OPTIONS.map((cr) => <option key={cr} value={cr}>{cr}</option>)}
                            </select>
                        )}
                    </Field>
                </div>
                <div className="form-row">
                    <Field label="Size">
                        {(p) => (
                            <select {...p} className="input" value={m.size} onChange={(e) => set({ size: e.target.value })}>
                                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        )}
                    </Field>
                    <TextField label="Type" hint="e.g. Undead, Fey (Goblinoid)" value={m.type} onChange={(e) => set({ type: e.target.value })} maxLength={80} />
                    <TextField label="Alignment" value={m.alignment ?? ''} onChange={(e) => set({ alignment: e.target.value })} maxLength={60} />
                </div>
                <div className="form-row">
                    <TextField label="Armor Class" inputMode="numeric" value={m.ac} onChange={(e) => set({ ac: numberOr(e.target.value, 0) })} />
                    <TextField label="Hit points" inputMode="numeric" value={m.hp} onChange={(e) => set({ hp: Math.max(1, numberOr(e.target.value, 1)) })} />
                    <TextField
                        label="Hit dice"
                        hint={m.hitDice && averageRoll(m.hitDice) !== null ? `Average ${averageRoll(m.hitDice)}` : 'e.g. 3d8+3'}
                        value={m.hitDice ?? ''}
                        onChange={(e) => set({ hitDice: e.target.value })}
                        maxLength={40}
                    />
                    <TextField label="Speed" value={m.speed} onChange={(e) => set({ speed: e.target.value })} maxLength={300} />
                </div>
                <fieldset className="ability-editor">
                    <legend>Ability scores</legend>
                    {ABILITY_KEYS.map((a) => (
                        <TextField
                            key={a}
                            label={ABILITY_LABELS[a]}
                            inputMode="numeric"
                            value={m.abilities[a]}
                            onChange={(e) => set({ abilities: { ...m.abilities, [a]: Math.min(30, Math.max(1, numberOr(e.target.value, 10))) } })}
                        />
                    ))}
                </fieldset>
                <div className="form-row">
                    <TextField label="Saving throws" hint="e.g. Dex +5, Wis +2" value={savesText} onChange={(e) => setSavesText(e.target.value)} />
                    <TextField label="Skills" hint="e.g. Perception +4, Stealth +6" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
                </div>
                <div className="form-row">
                    <TextField label="Resistances" value={m.resistances ?? ''} onChange={(e) => set({ resistances: e.target.value })} maxLength={300} />
                    <TextField label="Immunities" value={m.immunities ?? ''} onChange={(e) => set({ immunities: e.target.value })} maxLength={300} />
                    <TextField label="Vulnerabilities" value={m.vulnerabilities ?? ''} onChange={(e) => set({ vulnerabilities: e.target.value })} maxLength={300} />
                </div>
                <div className="form-row">
                    <TextField label="Senses" hint="e.g. Darkvision 60 ft." value={m.senses ?? ''} onChange={(e) => set({ senses: e.target.value })} maxLength={300} />
                    <TextField label="Passive Perception" inputMode="numeric" value={m.passivePerception ?? ''} onChange={(e) => set({ passivePerception: e.target.value.trim() === '' ? undefined : numberOr(e.target.value, 10) })} />
                    <TextField label="Languages" value={m.languages ?? ''} onChange={(e) => set({ languages: e.target.value })} maxLength={300} />
                </div>
                {ENTRY_SECTIONS.map(({ key, label, single }) => (
                    <EntryEditor key={key} label={label} single={single} entries={m[key] ?? []} onChange={(next) => set({ [key]: next })} />
                ))}
                <Field label="Description" hint="Optional: lore, tactics, where it lairs.">
                    {(p) => <textarea {...p} className="input" rows={3} maxLength={4000} value={m.description ?? ''} onChange={(e) => set({ description: e.target.value })} />}
                </Field>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>{isEdit ? 'Save changes' : 'Create monster'}</Button>
                </div>
            </form>
        </Modal>
    );
}
