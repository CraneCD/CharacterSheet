// Integrity checks for the static reference data (src/data). These catch
// broken cross-references (a race trait with no description, a subclass spell
// that doesn't exist, ...) and pin the 2024 (5.5e) rules the sheet depends on.
import { races } from '../data/races';
import { classes } from '../data/classes';
import { backgrounds } from '../data/backgrounds';
import { spells } from '../data/spells';
import { subclasses } from '../data/subclasses';
import { classFeatures } from '../data/classFeatures';
import { feats } from '../data/feats';
import { baseItems } from '../data/baseItems';
import { traits } from '../data/traits';
import { fightingStyles, FIGHTING_STYLE_SUBCLASS_LEVELS, FIGHTING_STYLE_CLASS_LEVELS } from '../data/fightingStyles';
import { buildReferenceRows } from '../lib/referenceSeed';
import { planSync, stableStringify } from '../scripts/syncReferenceData';

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const SKILLS = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation',
    'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
    'Sleight of Hand', 'Stealth', 'Survival',
];
const SUBCLASS_LEVELS_2024: Record<string, number[]> = {
    barbarian: [3, 6, 10, 14], bard: [3, 6, 14], cleric: [3, 6, 17], druid: [3, 6, 10, 14],
    fighter: [3, 7, 10, 15, 18], monk: [3, 6, 11, 17], paladin: [3, 7, 15, 20], ranger: [3, 7, 11, 15],
    rogue: [3, 9, 13, 17], sorcerer: [3, 6, 14, 18], warlock: [3, 6, 10, 14], wizard: [3, 6, 10, 14],
};
const classIds = new Set(classes.map(c => c.id));
const spellIds = new Set(spells.map(s => s.id));
const featById = new Map(feats.map(f => [f.id, f]));

function dupes(values: string[]): string[] {
    const seen = new Set<string>();
    return values.filter(v => (seen.has(v) ? true : (seen.add(v), false)));
}

describe('reference data integrity', () => {
    it('has unique ids within every registry', () => {
        expect(dupes(races.map(r => r.id))).toEqual([]);
        expect(dupes(classes.map(c => c.id))).toEqual([]);
        expect(dupes(backgrounds.map(b => b.id))).toEqual([]);
        expect(dupes(spells.map(s => s.id))).toEqual([]);
        expect(dupes(subclasses.map(s => s.id))).toEqual([]);
        expect(dupes(feats.map(f => f.id))).toEqual([]);
        expect(dupes(fightingStyles.map(f => f.id))).toEqual([]);
        const rows = buildReferenceRows();
        expect(dupes(rows.map(r => `${r.type}:${r.key}`))).toEqual([]);
    });

    it('resolves every species trait (including lineage options) to a description', () => {
        for (const race of races) {
            for (const t of race.traits) {
                expect(traits[t]?.description).toBeTruthy();
            }
            for (const opt of race.lineageOptions?.options ?? []) {
                expect(traits[`${race.lineageOptions!.trait} (${opt.name})`]?.description).toBeTruthy();
            }
        }
    });

    it('uses 2024 species values', () => {
        const byId = Object.fromEntries(races.map(r => [r.id, r]));
        expect(byId.dwarf.speed).toBe(30);
        expect(byId.halfling.speed).toBe(30);
        expect(byId.gnome.speed).toBe(30);
        expect(byId.goliath.speed).toBe(35);
        expect(byId.dwarf.traits).toContain('Darkvision (120 ft.)');
        expect(byId.orc.traits).toContain('Darkvision (120 ft.)');
        expect(byId['half-elf'].legacy).toBe(true);
        expect(byId['half-orc'].legacy).toBe(true);
        // 2024: species don't grant languages beyond Common
        for (const r of races.filter(r => !r.legacy)) expect(r.languages[0]).toBe('Common');
    });

    it('gives every class 2024 core traits', () => {
        for (const c of classes) {
            expect(c.subclassLevel).toBe(3);
            expect(c.skillOptions.every(s => SKILLS.includes(s))).toBe(true);
            expect(c.skillChoices).toBeGreaterThan(0);
            expect(c.startingEquipment.length).toBeGreaterThan(0);
            expect(c.startingEquipment[0]).toMatch(/ or \d+ GP$/);
            expect(c.savingThrows.every(a => ABILITIES.includes(a))).toBe(true);
        }
        const byId = Object.fromEntries(classes.map(c => [c.id, c]));
        expect(byId.druid.armorProficiencies).not.toContain('Medium armor');
        expect(byId.sorcerer.weaponProficiencies).toEqual(['Simple weapons']);
        expect(byId.paladin.spellcaster).toBe(true);
        expect(byId.fighter.skillOptions).toContain('Persuasion');
        expect(byId.wizard.skillOptions).toContain('Nature');
    });

    it('has class features for all 20 levels with unique names', () => {
        for (const cid of classIds) {
            const list = classFeatures[cid];
            expect(list).toBeDefined();
            expect(dupes(list.map(f => f.name))).toEqual([]);
            for (const f of list) {
                expect(f.level).toBeGreaterThanOrEqual(1);
                expect(f.level).toBeLessThanOrEqual(20);
                expect(f.description.length).toBeGreaterThan(10);
            }
            expect(list.some(f => f.name === 'Epic Boon' && f.level === 19)).toBe(true);
        }
        expect(classFeatures.fighter.some(f => f.name === 'Tactical Master' && f.level === 9)).toBe(true);
        expect(classFeatures.fighter.some(f => f.name === 'Two Extra Attacks' && f.level === 11)).toBe(true);
    });

    it('keeps subclasses consistent with their class', () => {
        for (const s of subclasses) {
            expect(classIds.has(s.classId)).toBe(true);
            expect(s.features.length).toBeGreaterThan(0);
            for (const f of s.features) {
                expect(f.level).toBeGreaterThanOrEqual(3);
                expect(f.level).toBeLessThanOrEqual(20);
                if (!s.legacy) expect(SUBCLASS_LEVELS_2024[s.classId]).toContain(f.level);
            }
            for (const sp of s.spells ?? []) {
                expect(spellIds.has(sp.spellId)).toBe(true);
            }
        }
        // Every class has its four 2024 PHB subclasses
        for (const cid of classIds) {
            expect(subclasses.filter(s => s.classId === cid && !s.legacy)).toHaveLength(4);
        }
    });

    it('gives backgrounds the 2024 structure', () => {
        for (const b of backgrounds) {
            expect(b.abilityScores).toHaveLength(3);
            expect(b.abilityScores.every(a => ABILITIES.includes(a))).toBe(true);
            expect(featById.get(b.originFeat)?.category).toBe('origin');
            expect(b.skillProficiencies).toHaveLength(2);
            expect(b.skillProficiencies.every(s => SKILLS.includes(s))).toBe(true);
            expect(b.startingEquipment[0]).toMatch(/ or 50 GP$/);
            expect(b.languages).toBe(0);
        }
        expect(backgrounds.filter(b => !b.legacy)).toHaveLength(16);
    });

    it('has well-formed feats', () => {
        const categories = new Set(['origin', 'general', 'fighting-style', 'epic-boon']);
        for (const f of feats) {
            expect(categories.has(f.category)).toBe(true);
            for (const a of f.abilityScoreOptions ?? []) expect(ABILITIES).toContain(a);
            for (const c of f.prerequisites?.class ?? []) expect(classIds.has(c)).toBe(true);
            if (f.category === 'epic-boon') expect(f.prerequisites?.level).toBe(19);
            if (f.category === 'general' && !f.legacy) expect(f.prerequisites?.level).toBe(4);
        }
        expect(feats.filter(f => f.category === 'origin' && !f.legacy).map(f => f.id).sort()).toEqual(
            ['alert', 'crafter', 'healer', 'lucky', 'magic-initiate', 'musician', 'savage-attacker', 'skilled', 'tavern-brawler', 'tough']
        );
    });

    it('keeps fighting styles and their grants consistent', () => {
        for (const fs of fightingStyles) expect(featById.get(fs.id)?.category).toBe('fighting-style');
        for (const g of FIGHTING_STYLE_SUBCLASS_LEVELS) {
            expect(subclasses.some(s => s.id === g.subclassId)).toBe(true);
        }
        expect(FIGHTING_STYLE_SUBCLASS_LEVELS.find(g => g.subclassId === 'champion')?.level).toBe(7);
        for (const g of FIGHTING_STYLE_CLASS_LEVELS) expect(classIds.has(g.classId)).toBe(true);
    });

    it('has well-formed spells', () => {
        const schools = new Set(['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation']);
        for (const s of spells) {
            expect(s.level).toBeGreaterThanOrEqual(0);
            expect(s.level).toBeLessThanOrEqual(9);
            expect(schools.has(s.school)).toBe(true);
            expect(s.components.length).toBeGreaterThan(0);
            expect(s.range).not.toMatch(/Component/);
            for (const c of s.classes) expect(classIds.has(c) || c === 'artificer').toBe(true);
        }
        const byId = Object.fromEntries(spells.map(s => [s.id, s]));
        expect(byId['cure-wounds'].description).toMatch(/2d8/);
        expect(byId['healing-word'].description).toMatch(/2d4/);
        expect(byId['divine-smite'].classes).toEqual(['paladin']);
        expect(byId['feeblemind'].name).toBe('Befuddlement');
    });

    it('gives every 2024 weapon a mastery property', () => {
        const masteries = new Set(['cleave', 'graze', 'nick', 'push', 'sap', 'slow', 'topple', 'vex']);
        const srdWeapons = baseItems.filter(i => i.category === 'weapon' && i.source === 'SRD 5.2');
        expect(srdWeapons.length).toBeGreaterThanOrEqual(38);
        for (const w of srdWeapons) {
            expect(w.damage).toBeTruthy();
            expect(masteries.has(w.mastery!)).toBe(true);
        }
    });
});

describe('reference sync planning', () => {
    const t0 = new Date('2026-01-01T00:00:00Z');
    const later = new Date('2026-01-02T00:00:00Z');
    const rows = [
        { type: 'spell' as const, key: 'a', data: { name: 'A', level: 1 } },
        { type: 'spell' as const, key: 'b', data: { name: 'B2' } },
        { type: 'spell' as const, key: 'c', data: { name: 'C2' } },
        { type: 'spell' as const, key: 'new', data: { name: 'New' } },
    ];
    const existing = [
        { id: '1', type: 'spell', key: 'a', data: { level: 1, name: 'A' }, createdAt: t0, updatedAt: t0 },
        { id: '2', type: 'spell', key: 'b', data: { name: 'B' }, createdAt: t0, updatedAt: t0 },
        { id: '3', type: 'spell', key: 'c', data: { name: 'C (admin edit)' }, createdAt: t0, updatedAt: later },
        { id: '4', type: 'spell', key: 'gone', data: { name: 'Gone' }, createdAt: t0, updatedAt: t0 },
    ];

    it('inserts new rows, updates unedited ones, and leaves admin edits alone', () => {
        const plan = planSync(rows, existing);
        expect(plan.insert.map(r => r.key)).toEqual(['new']);
        expect(plan.update.map(r => r.key)).toEqual(['b']);
        expect(plan.unchanged).toBe(1);
        expect(plan.skippedEdited).toEqual([{ type: 'spell', key: 'c' }]);
        expect(plan.orphaned).toEqual([{ type: 'spell', key: 'gone' }]);
    });

    it('overwrites admin edits only when asked', () => {
        expect(planSync(rows, existing, { forceKeys: new Set(['spell:c']) }).update.map(r => r.key)).toEqual(['b', 'c']);
        expect(planSync(rows, existing, { force: true }).skippedEdited).toEqual([]);
    });

    it('ignores key order when comparing data', () => {
        expect(stableStringify({ b: 1, a: [1, { d: 2, c: 3 }] })).toBe(stableStringify({ a: [1, { c: 3, d: 2 }], b: 1 }));
    });
});
