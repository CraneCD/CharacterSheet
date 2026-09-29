import { computeFeatureUses, counterForFeature, FEATURE_USES, featureUsesTiming, mergeFeatureUses } from '@/lib/featureUses';
import { buildFeatureGroups, featureSummary, filterFeatureGroups } from '@/lib/featureList';
import { featureRows } from '@/lib/actionRows';
import type { ClassResources } from '@/lib/types';

const base = { level: 5, proficiencyBonus: 3, modifiers: { wis: 2, cha: -1 } };

describe('feature uses', () => {
    it('gives species traits, feats and subclass features their counters', () => {
        const uses = computeFeatureUses({
            ...base,
            features: [{ name: 'Lucky' }, { name: 'Dread Ambusher' }, { name: 'Steps of the Fey' }],
            racialTraits: ['Breath Weapon', 'Draconic Flight'],
        });
        expect(uses['Breath Weapon']).toMatchObject({ max: 3, current: 3, resetType: 'long', source: 'species', feature: 'Breath Weapon' });
        expect(uses['Draconic Flight']).toMatchObject({ max: 1, source: 'species' });
        expect(uses['Luck Points']).toMatchObject({ max: 3, source: 'feat', feature: 'Lucky' });
        expect(uses['Dreadful Strike']).toMatchObject({ max: 2, source: 'subclass', feature: 'Dread Ambusher' });
        // Ability-based uses are at least 1
        expect(uses['Steps of the Fey'].max).toBe(1);
    });

    it('waits for the level a trait starts at', () => {
        const uses = computeFeatureUses({ ...base, level: 4, proficiencyBonus: 2, features: [], racialTraits: ['Draconic Flight', 'Large Form'] });
        expect(uses).toEqual({});
    });

    it('matches lineage-suffixed traits and computed maximums', () => {
        const portent = computeFeatureUses({ ...base, features: [{ name: 'Portent' }], racialTraits: ['Giant Ancestry (Stone Giant)'] });
        expect(portent['Portent'].max).toBe(2);
        expect(portent['Giant Ancestry'].max).toBe(3);
        const greater = computeFeatureUses({ ...base, features: [{ name: 'Portent' }, { name: 'Greater Portent' }] });
        expect(greater['Portent'].max).toBe(3);
    });

    it('gives every rule a summary and a counter name that does not collide', () => {
        const names = Object.entries(FEATURE_USES).map(([name, rule]) => rule.resource ?? name);
        expect(new Set(names).size).toBe(names.length);
        for (const rule of Object.values(FEATURE_USES)) expect(rule.summary.length).toBeGreaterThan(0);
    });
});

describe('merging feature uses into stored counters', () => {
    const computed = computeFeatureUses({ ...base, features: [{ name: 'Lucky' }], racialTraits: ['Breath Weapon'] });

    it('adds new counters and leaves class and custom ones alone', () => {
        const stored: ClassResources = {
            'Rage': { name: 'Rage', current: 1, max: 3, resetType: 'long' },
            'Lucky Charm': { name: 'Lucky Charm', current: 0, max: 1, resetType: 'long', source: 'custom', feature: 'Lucky Charm' },
        };
        const { resources, changed } = mergeFeatureUses(stored, computed);
        expect(changed).toBe(true);
        expect(Object.keys(resources)).toEqual(['Rage', 'Lucky Charm', 'Breath Weapon', 'Luck Points']);
        expect(resources['Rage']).toBe(stored['Rage']);
    });

    it('follows a higher maximum, adding the new uses, unless it was edited by hand', () => {
        const stored: ClassResources = {
            'Breath Weapon': { ...computed['Breath Weapon'], max: 2, current: 1 },
            'Luck Points': { ...computed['Luck Points'], max: 7, current: 4, maxEdited: true },
        };
        const { resources } = mergeFeatureUses(stored, computed);
        expect(resources['Breath Weapon']).toMatchObject({ max: 3, current: 2 });
        expect(resources['Luck Points']).toMatchObject({ max: 7, current: 4 });
    });

    it('is stable once up to date, and drops counters of features you no longer have', () => {
        const first = mergeFeatureUses({}, computed).resources;
        expect(mergeFeatureUses(first, computed).changed).toBe(false);
        const withoutLucky = computeFeatureUses({ ...base, features: [], racialTraits: ['Breath Weapon'] });
        const { resources, changed } = mergeFeatureUses(first, withoutLucky);
        expect(changed).toBe(true);
        expect(Object.keys(resources)).toEqual(['Breath Weapon']);
    });

    it('tags Heroic Inspiration saved before counters had sources, keeping what is left', () => {
        const stored: ClassResources = { 'Heroic Inspiration': { name: 'Heroic Inspiration', current: 0, max: 1, resetType: 'long' } };
        const { resources } = mergeFeatureUses(stored, computeFeatureUses({ ...base, features: [], racialTraits: ['Resourceful'] }));
        expect(resources['Heroic Inspiration']).toMatchObject({ current: 0, max: 1, source: 'species', feature: 'Resourceful' });
    });
});

describe('finding a feature’s counter', () => {
    const resources: ClassResources = {
        'Sorcery Points': { name: 'Sorcery Points', current: 3, max: 5, resetType: 'long' },
        'Rage': { name: 'Rage', current: 2, max: 3, resetType: 'long' },
        'Luck Points': { name: 'Luck Points', current: 3, max: 3, resetType: 'long', source: 'feat', feature: 'Lucky' },
    };

    it('by the feature it names, the same name, or a known class alias', () => {
        expect(counterForFeature(resources, 'Lucky')?.[0]).toBe('Luck Points');
        expect(counterForFeature(resources, 'Rage')?.[0]).toBe('Rage');
        expect(counterForFeature(resources, 'Font of Magic')?.[0]).toBe('Sorcery Points');
        expect(counterForFeature(resources, 'Extra Attack')).toBeUndefined();
    });

    it('puts species and subclass uses on the Actions card at the right timing', () => {
        const uses = computeFeatureUses({ ...base, features: [{ name: 'Portent' }], racialTraits: ['Breath Weapon'] });
        expect(featureUsesTiming(uses['Breath Weapon'])).toBe('action');
        const rows = featureRows(uses, 'wizard');
        expect(rows.find((r) => r.name === 'Breath Weapon')).toMatchObject({ timing: 'action', uses: '3 / 3' });
        expect(rows.find((r) => r.name === 'Portent')).toMatchObject({ timing: 'other' });
    });
});

describe('features list', () => {
    const input = {
        stored: [
            { name: 'Alert', source: 'Background: Criminal (Origin Feat)', description: 'Old text', featId: 'alert' },
            { name: 'Action Surge', source: 'Class: Fighter', description: 'Stored at level-up' },
            { name: 'Lucky Charm', source: 'Custom', description: 'Once a day, reroll a 1.' },
            { name: 'Ring of Warmth', source: 'Magic item', description: 'Cold resistance.' },
        ],
        racialTraits: [{ name: 'Resourceful', description: 'Heroic Inspiration.' }],
        speciesName: 'Human',
        background: { name: 'Criminal', originFeat: 'alert', feature: { name: 'Origin Feat: Alert', description: 'stub' } },
        classFeatures: [
            { name: 'Fighting Style', description: 'Pick a style.', source: 'Class: Fighter', level: 1 },
            { name: 'Action Surge', description: 'Take one additional action.', source: 'Class: Fighter', level: 2 },
            { name: 'Fighter Subclass', description: 'Pick a subclass.', source: 'Class: Fighter', level: 3 },
            { name: 'Ability Score Improvement', description: 'Gain a feat.', source: 'Class: Fighter', level: 4 },
        ],
        subclassFeatures: [{ name: 'Improved Critical', description: 'Crit on 19.', source: 'Subclass: Champion', level: 3 }],
        featsById: { alert: { name: 'Alert', description: 'Add your Proficiency Bonus to Initiative.' } },
    };

    it('groups by source in sheet order and hides placeholders and duplicates', () => {
        const groups = buildFeatureGroups(input);
        expect(groups.map((g) => g.label)).toEqual(['Species: Human', 'Feats', 'Fighter', 'Champion (Subclass)', 'Custom']);
        expect(groups[2].entries.map((e) => e.name)).toEqual(['Fighting Style', 'Action Surge']);
        // The origin feat stub is hidden once the feat is stored; the feat shows its live text
        expect(groups[1].entries[0]).toMatchObject({ name: 'Alert', description: 'Add your Proficiency Bonus to Initiative.', detail: 'Origin feat (Criminal)', removable: true, custom: false });
    });

    it('keeps each stored entry’s real position, even with hidden entries before it', () => {
        const custom = buildFeatureGroups(input).find((g) => g.kind === 'custom')!;
        expect(custom.entries.map((e) => [e.name, e.storedIndex, e.detail])).toEqual([
            ['Lucky Charm', 2, undefined],
            ['Ring of Warmth', 3, 'Magic item'],
        ]);
        expect(custom.entries.every((e) => e.custom && e.removable)).toBe(true);
    });

    it('keeps the subclass reminder until a subclass is chosen', () => {
        const groups = buildFeatureGroups({ ...input, subclassFeatures: [] });
        expect(groups.find((g) => g.label === 'Fighter')!.entries.map((e) => e.name)).toContain('Fighter Subclass');
    });

    it('searches names, text and group names', () => {
        const groups = buildFeatureGroups(input);
        expect(filterFeatureGroups(groups, 'reroll').flatMap((g) => g.entries.map((e) => e.name))).toEqual(['Lucky Charm']);
        expect(filterFeatureGroups(groups, 'champion').flatMap((g) => g.entries.map((e) => e.name))).toEqual(['Improved Critical']);
        expect(filterFeatureGroups(groups, '', (e) => e.custom).map((g) => g.kind)).toEqual(['custom']);
    });

    it('summarises descriptions to their first sentence', () => {
        expect(featureSummary('You gain a Fly Speed. It lasts 1 hour.')).toBe('You gain a Fly Speed.');
        expect(featureSummary('x'.repeat(200), 20)).toHaveLength(20);
    });
});

describe('feature summaries', () => {
    it('skips "you gain the following benefits" and keeps the first benefit', () => {
        expect(featureSummary('You gain the following benefits.\n- Luck Points. You have a number of Luck Points equal to your Proficiency Bonus. More.'))
            .toBe('Luck Points: You have a number of Luck Points equal to your Proficiency Bonus.');
        expect(featureSummary('You gain the following benefits.\nInitiative Proficiency. When you roll Initiative, you can add your Proficiency Bonus to the roll.'))
            .toBe('Initiative Proficiency: When you roll Initiative, you can add your Proficiency Bonus to the roll.');
        expect(featureSummary('Your lineage stems from a dragon progenitor. Choose one.')).toBe('Your lineage stems from a dragon progenitor.');
    });
});
