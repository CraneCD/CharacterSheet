/**
 * The Features & Traits card's list: species traits, background, feats, class and subclass
 * features and the player's own entries, grouped by where they come from.
 */
import type { CharacterFeature } from './types';

export type FeatureKind = 'species' | 'background' | 'feat' | 'class' | 'subclass' | 'custom';

export interface FeatureEntry {
    key: string;
    name: string;
    description: string;
    kind: FeatureKind;
    /** Group id, e.g. "class:Fighter" */
    group: string;
    /** Where it comes from, shown next to the name ("Level 3", "Origin feat", ...) */
    detail?: string;
    level?: number;
    /** Position in data.features, for stored entries */
    storedIndex?: number;
    /** The player's own entry: can be edited */
    custom: boolean;
    /** Stored on the character (feats, custom entries): can be removed */
    removable: boolean;
}

export interface FeatureGroup {
    id: string;
    label: string;
    kind: FeatureKind;
    entries: FeatureEntry[];
}

interface SourcedFeature {
    name: string;
    description?: string;
    source?: string;
    level?: number;
}

export interface FeatureListInput {
    stored: CharacterFeature[];
    racialTraits: { name: string; description?: string }[];
    speciesName?: string;
    background?: { name?: string; originFeat?: string; feature?: { name?: string; description?: string } };
    classFeatures: SourcedFeature[];
    subclassFeatures: SourcedFeature[];
    /** Weapons chosen for Weapon Mastery, listed with the class features */
    masteryWeapons?: string[] | null;
    /** Live feat text by id, so admin edits show on characters that already have the feat */
    featsById?: Record<string, { name: string; description: string }>;
}

/** Class features that only point elsewhere (the feat or subclass you picked is listed itself). */
const PLACEHOLDER = /^(Ability Score Improvement|Epic Boon|\w+ Subclass)$/;

const KIND_ORDER: FeatureKind[] = ['species', 'background', 'feat', 'class', 'subclass', 'custom'];

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** "Class: Fighter" → { kind: 'class', label: 'Fighter' }; unknown sources are the player's own. */
function classifyStored(feature: CharacterFeature): { kind: FeatureKind; label?: string; detail?: string } {
    const source = String(feature.source || '').trim();
    if (feature.custom) return { kind: 'custom', detail: source && source !== 'Custom' ? source : undefined };
    if (feature.featId || /^feat$/i.test(source) || /origin feat|versatile/i.test(source)) {
        const origin = source.match(/^Background: (.+) \(Origin Feat\)$/);
        return { kind: 'feat', detail: origin ? `Origin feat (${origin[1]})` : /versatile/i.test(source) ? 'Versatile' : undefined };
    }
    const cls = source.match(/^Class: (.+)$/i);
    if (cls) return { kind: 'class', label: cls[1] };
    const sub = source.match(/^Subclass: (.+)$/i);
    if (sub) return { kind: 'subclass', label: sub[1] };
    if (/^racial|^species/i.test(source)) return { kind: 'species' };
    if (/^background/i.test(source)) return { kind: 'background' };
    return { kind: 'custom', detail: source && source !== 'Custom' ? source : undefined };
}

export function buildFeatureGroups(input: FeatureListInput): FeatureGroup[] {
    const groups = new Map<string, FeatureGroup>();
    const seen = new Set<string>();

    const add = (entry: Omit<FeatureEntry, 'key' | 'group'>, label?: string) => {
        const group = entry.kind === 'class' || entry.kind === 'subclass' ? `${entry.kind}:${label}` : entry.kind;
        const dedupeKey = `${group}|${entry.name.toLowerCase()}|${entry.description}`;
        if (seen.has(dedupeKey)) return;
        seen.add(dedupeKey);
        if (!groups.has(group)) {
            const groupLabel = entry.kind === 'species' ? `Species${input.speciesName ? `: ${input.speciesName}` : ''}`
                : entry.kind === 'background' ? `Background${input.background?.name ? `: ${input.background.name}` : ''}`
                : entry.kind === 'feat' ? 'Feats'
                : entry.kind === 'custom' ? 'Custom'
                : entry.kind === 'subclass' ? `${label} (Subclass)`
                : label ?? 'Class';
            groups.set(group, { id: group, label: groupLabel, kind: entry.kind, entries: [] });
        }
        groups.get(group)!.entries.push({ ...entry, key: `${group}:${groups.get(group)!.entries.length}:${entry.name}`, group });
    };

    for (const trait of input.racialTraits) {
        add({ name: trait.name, description: trait.description || '', kind: 'species', custom: false, removable: false });
    }

    const storedFeatIds = new Set(input.stored.map((f) => f.featId).filter(Boolean));
    const bgFeature = input.background?.feature;
    // 2024 backgrounds carry an "Origin Feat: X" stub; the feat itself is listed once it's stored
    const isStub = !!bgFeature?.name?.startsWith('Origin Feat:');
    if (bgFeature?.name && !(isStub && input.background?.originFeat && storedFeatIds.has(input.background.originFeat))) {
        add({ name: bgFeature.name, description: bgFeature.description || '', kind: 'background', custom: false, removable: false });
    }

    // Stored entries first (feats, the player's own), so class/subclass duplicates are matched by name below
    const staticNames = new Set([...input.classFeatures, ...input.subclassFeatures].map((f) => f.name.toLowerCase()));
    const speciesNames = new Set(input.racialTraits.map((t) => t.name.toLowerCase()));
    input.stored.forEach((raw, storedIndex) => {
        if (!raw || !raw.name) return;
        const live = raw.featId ? input.featsById?.[raw.featId] : undefined;
        const feature = live ? { ...raw, name: live.name, description: live.description } : raw;
        const { kind, label, detail } = classifyStored(feature);
        const nameKey = feature.name.toLowerCase();
        // Class, subclass and species features stored at level-up are already listed from the rules
        if ((kind === 'class' || kind === 'subclass') && staticNames.has(nameKey)) return;
        if (kind === 'species' && speciesNames.has(nameKey)) return;
        if (kind === 'background' && bgFeature?.name?.toLowerCase() === nameKey) return;
        if (PLACEHOLDER.test(feature.name) && kind !== 'custom') return;
        add({
            name: feature.name,
            description: feature.description || '',
            kind,
            detail,
            level: feature.level,
            storedIndex,
            custom: kind === 'custom',
            removable: true,
        }, label);
    });

    // "Fighter Subclass" stays until a subclass is chosen, as a reminder
    const hasSubclass = input.subclassFeatures.length > 0;
    for (const f of input.classFeatures) {
        if (PLACEHOLDER.test(f.name) && (!/ Subclass$/.test(f.name) || hasSubclass)) continue;
        const label = String(f.source || '').replace(/^Class: /, '') || 'Class';
        add({ name: f.name, description: f.description || '', kind: 'class', detail: f.level ? `Level ${f.level}` : undefined, level: f.level, custom: false, removable: false }, label);
    }
    if (input.masteryWeapons && input.masteryWeapons.length > 0) {
        const firstClass = String(input.classFeatures[0]?.source || '').replace(/^Class: /, '') || 'Class';
        add({
            name: 'Weapon Mastery Weapons',
            description: `You can use the mastery properties of: ${input.masteryWeapons.map(titleCase).join(', ')}.`,
            kind: 'class',
            detail: 'Your choice',
            custom: false,
            removable: false,
        }, firstClass);
    }
    for (const f of input.subclassFeatures) {
        const label = String(f.source || '').replace(/^Subclass: /, '') || 'Subclass';
        add({ name: f.name, description: f.description || '', kind: 'subclass', detail: f.level ? `Level ${f.level}` : undefined, level: f.level, custom: false, removable: false }, label);
    }

    // Species → Background → Feats → each class → each subclass → Custom; class/subclass groups keep their order
    return Array.from(groups.values()).sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
}

/** Entries whose name, description or group match the search text (case-insensitive). */
export function filterFeatureGroups(groups: FeatureGroup[], query: string, keep: (entry: FeatureEntry) => boolean = () => true): FeatureGroup[] {
    const q = query.trim().toLowerCase();
    return groups
        .map((group) => ({
            ...group,
            entries: group.entries.filter((e) => keep(e) && (!q
                || e.name.toLowerCase().includes(q)
                || e.description.toLowerCase().includes(q)
                || group.label.toLowerCase().includes(q))),
        }))
        .filter((group) => group.entries.length > 0);
}

/** Lead-ins that say nothing on their own ("You gain the following benefits.") */
const LEAD_IN = /^(you gain the following (benefits|features)|you gain these benefits)[.:]?$/i;

/**
 * One line for the collapsed row: the first sentence, skipping a "you gain the following
 * benefits" lead-in, and keeping a benefit's own sentence after its title
 * ("Luck Points. You have..." → "Luck Points: You have...").
 */
export function featureSummary(description: string, maxLength = 110): string {
    const lines = description.split('\n').map((l) => l.replace(/^[-•]\s*/, '').trim()).filter(Boolean);
    while (lines.length > 1 && LEAD_IN.test(lines[0])) lines.shift();
    const text = (lines[0] ?? '').replace(/\s+/g, ' ');
    const titled = text.match(/^((?:[A-Z][\w'’-]*\s?){1,5})\.\s+(.+)$/);
    const body = titled ? `${titled[1].trim()}: ${titled[2]}` : text;
    const firstSentence = body.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? body;
    return firstSentence.length > maxLength ? `${firstSentence.slice(0, maxLength - 1).trimEnd()}…` : firstSentence;
}
