/**
 * Limited uses of species traits, feats and subclass features (2024 rules): Breath Weapon, Luck
 * Points, Portent, ... They're kept with the class resources in `data.classResources`, so the rest
 * flow, the Actions card and the Limited Uses card handle them like Rage or Channel Divinity.
 */
import type { ActionTiming } from './actionRows';
import type { ClassResource, ClassResources, ResourceSource } from './types';

type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface UsesContext {
    level: number;
    proficiencyBonus: number;
    modifiers: Partial<Record<AbilityKey, number>>;
    /** Lower-cased names of every feature, trait and feat the character has */
    has: (name: string) => boolean;
}

export interface FeatureUsesRule {
    source: Exclude<ResourceSource, 'class' | 'custom'>;
    /** Counter name when it isn't the feature's (Lucky → "Luck Points") */
    resource?: string;
    /** Proficiency Bonus, an ability modifier (minimum 1), a number, or computed */
    max: 'pb' | AbilityKey | number | ((ctx: UsesContext) => number);
    /** 'short' regains all uses on a Short or Long Rest */
    reset: 'short' | 'long';
    /** Species traits that start at a character level (Draconic Flight: 5) */
    minLevel?: number;
    /** When it's used, for the Actions card; left out for passive or out-of-turn uses */
    timing?: ActionTiming;
    /** Shown on the counter */
    summary: string;
}

const pbLong = (summary: string, timing?: ActionTiming): FeatureUsesRule => ({ source: 'species', max: 'pb', reset: 'long', timing, summary });
const once = (source: FeatureUsesRule['source'], reset: 'short' | 'long', summary: string, timing?: ActionTiming): FeatureUsesRule => ({ source, max: 1, reset, timing, summary });
const subclassMod = (max: AbilityKey, summary: string, timing?: ActionTiming): FeatureUsesRule => ({ source: 'subclass', max, reset: 'long', timing, summary });

/** Keyed by the feature, trait or feat name as it appears on the sheet. */
export const FEATURE_USES: Record<string, FeatureUsesRule> = {
    // Species traits
    'Resourceful': { ...once('species', 'long', 'Heroic Inspiration: Advantage on one D20 Test. Regain on a Long Rest.'), resource: 'Heroic Inspiration' },
    'Breath Weapon': pbLong('Exhale destructive energy in a Cone or Line.', 'action'),
    'Draconic Flight': { ...once('species', 'long', 'Sprout spectral wings for 10 minutes.', 'bonus'), minLevel: 5 },
    'Relentless Endurance': once('species', 'long', 'Drop to 1 Hit Point instead of 0.', 'other'),
    'Adrenaline Rush': { ...pbLong('Dash and gain Temporary Hit Points. Regain on a Short or Long Rest.', 'bonus'), reset: 'short' },
    'Healing Hands': once('species', 'long', 'Touch a creature to heal it.', 'action'),
    'Celestial Revelation': { ...once('species', 'long', 'Transform for 1 minute.', 'bonus'), minLevel: 3 },
    'Large Form': { ...once('species', 'long', 'Become Large for 10 minutes.', 'bonus'), minLevel: 5 },
    'Giant Ancestry': pbLong('Use your giant ancestry boon.', 'other'),
    "Stone's Endurance": once('species', 'short', 'Reduce damage by 1d12 + Constitution modifier.', 'reaction'),
    'Blessing of the Raven Queen': pbLong('Teleport up to 30 feet.', 'bonus'),
    'Fury of the Small': pbLong('Extra damage to a larger creature.', 'other'),
    'Saving Face': once('species', 'short', 'Add a bonus to a missed roll or failed check or save.', 'other'),
    'Hungry Jaws': pbLong('Bite and gain Temporary Hit Points.', 'bonus'),
    'Shifting': pbLong('Shift for 1 minute.', 'bonus'),
    'Hidden Step': pbLong('Become Invisible until your next turn.', 'bonus'),
    'Fey Step': pbLong('Teleport up to 30 feet.', 'bonus'),
    'Fortune from the Many': pbLong('Add a bonus die to a missed roll or failed check or save.', 'other'),
    'Kenku Recall': pbLong('Advantage on a skill check.', 'other'),
    'Draconic Cry': pbLong('Allies get Advantage against nearby enemies.', 'bonus'),
    'Merge with Stone': pbLong('Cast Blur as a Bonus Action.', 'bonus'),
    'Grovel, Cower, and Beg': once('species', 'short', 'Allies get Advantage against distracted enemies.', 'action'),
    'Svirfneblin Camouflage': pbLong('Advantage on a Stealth check.', 'other'),
    'Fey Gift': pbLong('Help as a Bonus Action.', 'bonus'),
    'Rabbit Hop': pbLong('Jump without provoking Opportunity Attacks.', 'bonus'),

    // Feats
    'Lucky': { source: 'feat', resource: 'Luck Points', max: 'pb', reset: 'long', timing: 'other', summary: 'Spend 1 for Advantage on a D20 Test, or Disadvantage on an attack against you.' },
    'Boon of Fate': { ...once('feat', 'short', 'Add or subtract 2d4 on a D20 Test. Also regained when you roll Initiative.', 'other'), resource: 'Improve Fate' },

    // Subclass features
    'Intimidating Presence': once('subclass', 'long', 'Frighten creatures around you. Or restore it with a Rage use.', 'bonus'),
    'Zealous Presence': once('subclass', 'long', 'Allies gain Advantage. Or restore it with a Rage use.', 'bonus'),
    'Rage of the Gods': once('subclass', 'long', 'Take divine warrior form when you Rage.', 'other'),
    'Beguiling Magic': once('subclass', 'long', 'Charm or frighten after an Enchantment or Illusion spell.', 'other'),
    'Mantle of Majesty': once('subclass', 'long', 'Cast Command as a Bonus Action for 1 minute.', 'bonus'),
    'Unbreakable Majesty': once('subclass', 'short', 'Attackers may miss you for 1 minute.', 'bonus'),
    'Corona of Light': subclassMod('wis', 'Emit an aura of sunlight for 1 minute.', 'action'),
    'Natural Recovery': once('subclass', 'long', 'Cast a Circle Spell without a spell slot.', 'other'),
    'Moonlight Step': subclassMod('wis', 'Teleport 30 feet with Advantage on your next attack.', 'bonus'),
    'Star Map': { ...subclassMod('wis', 'Cast Guiding Bolt without a spell slot.', 'action'), resource: 'Star Map (Guiding Bolt)' },
    'Cosmic Omen': subclassMod('wis', 'Add or subtract a d6 on a D20 Test.', 'reaction'),
    'Know Your Enemy': once('subclass', 'long', "Learn a creature's Immunities, Resistances and Vulnerabilities.", 'bonus'),
    'Telekinetic Adept': { ...once('subclass', 'short', 'Psi-Powered Leap: fly twice your Speed this turn.', 'bonus'), resource: 'Psi-Powered Leap' },
    'Bulwark of Force': once('subclass', 'long', 'Give creatures Half Cover for 1 minute.', 'bonus'),
    'Telekinetic Master': once('subclass', 'long', 'Cast Telekinesis without a spell slot.', 'action'),
    'Flurry of Healing and Harm': subclassMod('wis', 'Free Hand of Healing or Harm during Flurry of Blows.', 'other'),
    'Hand of Ultimate Mercy': once('subclass', 'long', 'Return a creature to life (5 Focus Points).', 'action'),
    'Wholeness of Body': subclassMod('wis', 'Heal Martial Arts die + Wisdom modifier.', 'bonus'),
    'Undying Sentinel': once('subclass', 'long', 'Drop to 1 Hit Point instead of 0.', 'other'),
    'Elder Champion': once('subclass', 'long', 'Empower your Aura of Protection for 1 minute.', 'bonus'),
    'Holy Nimbus': once('subclass', 'long', 'Empower your Aura of Protection for 10 minutes.', 'bonus'),
    'Glorious Defense': subclassMod('cha', 'Add your Charisma modifier to AC against an attack.', 'reaction'),
    'Living Legend': once('subclass', 'long', 'Turn misses into hits for 10 minutes.', 'bonus'),
    'Avenging Angel': once('subclass', 'long', 'Spectral wings and a frightening aura for 10 minutes.', 'bonus'),
    'Fey Reinforcements': once('subclass', 'long', 'Cast Summon Fey without a spell slot.', 'action'),
    'Misty Wanderer': subclassMod('wis', 'Cast Misty Step without a spell slot.', 'bonus'),
    'Dread Ambusher': { ...subclassMod('wis', 'Dreadful Strike: +2d6 Psychic damage on a weapon hit.', 'other'), resource: 'Dreadful Strike' },
    'Spell Thief': once('subclass', 'long', 'Negate and steal a spell cast at you.', 'reaction'),
    'Psychic Veil': once('subclass', 'long', 'Become Invisible for 1 hour.', 'action'),
    'Rend Mind': once('subclass', 'long', 'Stun the target of your Psychic Blades.', 'other'),
    'Warping Implosion': once('subclass', 'long', 'Teleport and pull nearby creatures.', 'action'),
    'Restore Balance': subclassMod('cha', 'Cancel Advantage or Disadvantage on a roll.', 'reaction'),
    'Trance of Order': once('subclass', 'long', 'Treat d20 rolls of 9 or lower as 10 for 1 minute.', 'bonus'),
    'Clockwork Cavalcade': once('subclass', 'long', 'Heal, repair and end spells in a 30-foot Cube.', 'action'),
    'Dragon Wings': once('subclass', 'long', 'Fly Speed 60 feet for 1 hour.', 'bonus'),
    'Dragon Companion': once('subclass', 'long', 'Cast Summon Dragon without a spell slot.', 'action'),
    'Tides of Chaos': once('subclass', 'long', 'Advantage on one D20 Test.', 'other'),
    'Tamed Surge': once('subclass', 'long', 'Choose your Wild Magic Surge effect.', 'other'),
    'Steps of the Fey': subclassMod('cha', 'Cast Misty Step without a spell slot.', 'bonus'),
    'Beguiling Defenses': once('subclass', 'long', 'Halve damage and turn it back on the attacker.', 'reaction'),
    'Searing Vengeance': once('subclass', 'long', 'Heal instead of a Death Saving Throw and blind enemies.', 'other'),
    "Dark One's Own Luck": subclassMod('cha', 'Add 1d10 to an ability check or saving throw.', 'other'),
    'Hurl Through Hell': once('subclass', 'long', 'Send a creature you hit through the Lower Planes.', 'other'),
    'Clairvoyant Combatant': once('subclass', 'short', 'Disadvantage for a bonded creature against you.', 'other'),
    'Portent': {
        source: 'subclass', max: (ctx) => (ctx.has('greater portent') ? 3 : 2), reset: 'long', timing: 'other',
        summary: 'Replace a D20 Test with a foretelling roll. Roll new ones after a Long Rest.',
    },
    'Phantasmal Creatures': once('subclass', 'long', 'Cast Summon Beast or Summon Fey without a spell slot.', 'action'),
    'Illusory Self': once('subclass', 'short', 'An attack against you misses automatically.', 'reaction'),
};

/** "Hare-Trigger (Harengon)" → "hare-trigger" */
export function featureKey(name: string): string {
    return String(name || '').split('(')[0].trim().toLowerCase();
}

const RULES_BY_KEY = new Map(Object.entries(FEATURE_USES).map(([name, rule]) => [featureKey(name), { name, rule }]));

/** The uses rule for a feature, trait or feat name, if it has limited uses. */
export function featureUsesRule(name: string): { name: string; rule: FeatureUsesRule } | undefined {
    return RULES_BY_KEY.get(featureKey(name));
}

/** Timing of a counter from this table, looked up by its feature or counter name (for the Actions card). */
export function featureUsesTiming(resource: Pick<ClassResource, 'name' | 'feature'>): ActionTiming | undefined {
    const byFeature = resource.feature ? featureUsesRule(resource.feature) : undefined;
    if (byFeature) return byFeature.rule.timing;
    for (const [name, rule] of Object.entries(FEATURE_USES)) {
        if ((rule.resource ?? name) === resource.name) return rule.timing;
    }
    return undefined;
}

export interface FeatureUsesInput {
    /** Stored features and feats plus the class/subclass features for the current level */
    features: Array<{ name?: string }>;
    racialTraits?: string[];
    level: number;
    proficiencyBonus: number;
    modifiers: Partial<Record<AbilityKey, number>>;
}

/** The counters the character's traits, feats and subclass features give, all uses available. */
export function computeFeatureUses(input: FeatureUsesInput): ClassResources {
    const names = new Set<string>();
    for (const f of input.features) if (f?.name) names.add(featureKey(f.name));
    for (const t of input.racialTraits || []) names.add(featureKey(t));
    const ctx: UsesContext = {
        level: input.level,
        proficiencyBonus: input.proficiencyBonus,
        modifiers: input.modifiers,
        has: (name) => names.has(featureKey(name)),
    };

    const out: ClassResources = {};
    for (const [feature, rule] of Object.entries(FEATURE_USES)) {
        if (!names.has(featureKey(feature))) continue;
        if (rule.minLevel && input.level < rule.minLevel) continue;
        const max = typeof rule.max === 'number' ? rule.max
            : typeof rule.max === 'function' ? rule.max(ctx)
            : rule.max === 'pb' ? input.proficiencyBonus
            : Math.max(1, input.modifiers[rule.max] ?? 0);
        const name = rule.resource ?? feature;
        out[name] = {
            name,
            current: max,
            max,
            resetType: rule.reset,
            description: rule.summary,
            source: rule.source,
            feature,
        };
    }
    return out;
}

const AUTO_SOURCES: (ResourceSource | undefined)[] = ['species', 'feat', 'subclass'];

/**
 * Brings the stored counters in line with the computed feature uses: adds new ones (all uses
 * available), follows maximum changes (level-ups, a higher Proficiency Bonus) unless the player
 * set the maximum by hand, and drops counters of features the character no longer has.
 * Class resources and custom counters are left alone.
 */
export function mergeFeatureUses(stored: ClassResources, computed: ClassResources): { resources: ClassResources; changed: boolean } {
    const resources: ClassResources = {};
    let changed = false;
    for (const [name, res] of Object.entries(stored)) {
        if (AUTO_SOURCES.includes(res?.source) && !computed[name]) {
            changed = true;
            continue;
        }
        resources[name] = res;
    }
    for (const [name, next] of Object.entries(computed)) {
        const prev = resources[name];
        if (!prev) {
            resources[name] = next;
            changed = true;
            continue;
        }
        const max = prev.maxEdited ? prev.max : next.max;
        // A higher maximum adds the new uses; a lower one caps what's left
        const current = Math.max(0, Math.min(max, prev.current + Math.max(0, max - prev.max)));
        const merged: ClassResource = {
            ...prev,
            max,
            current,
            resetType: next.resetType,
            description: prev.description || next.description,
            source: next.source,
            feature: next.feature,
        };
        if (merged.max !== prev.max || merged.current !== prev.current || merged.resetType !== prev.resetType
            || merged.source !== prev.source || merged.feature !== prev.feature || merged.description !== prev.description) {
            changed = true;
        }
        resources[name] = merged;
    }
    return { resources, changed };
}

/** Class features whose counter has another name */
const CLASS_FEATURE_COUNTERS: Record<string, string> = {
    'font of magic': 'Sorcery Points',
    "monk's focus": 'Focus Points',
    'psionic power': 'Psionic Energy Dice',
    'combat superiority': 'Superiority Dice',
};

/** The counter that tracks a feature's uses (by the feature it names, or the same name), if any. */
export function counterForFeature(resources: ClassResources, featureName: string): [string, ClassResource] | undefined {
    const key = featureKey(featureName);
    const entries = Object.entries(resources);
    return entries.find(([, r]) => r?.feature && featureKey(r.feature) === key)
        ?? entries.find(([name, r]) => !r?.feature && featureKey(name) === key)
        ?? (CLASS_FEATURE_COUNTERS[key] ? entries.find(([name]) => name === CLASS_FEATURE_COUNTERS[key]) : undefined);
}
