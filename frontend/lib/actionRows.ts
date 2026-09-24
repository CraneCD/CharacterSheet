/**
 * The sheet's Actions card: every row is built from the character (equipped weapons, prepared
 * spells, class resources) except custom and magic-item actions, which are stored in data.actions.
 * Copies the app used to store for spells, weapon attacks and weapon mastery are hidden.
 */
import { CharacterAction, ClassResources } from './types';
import { WeaponAttack } from './attacks';
import { MASTERY_INFO, getMasteryForWeapon } from './weaponMastery';
import { findActionSpell, SpellActionSource } from './spellActions';

export type ActionTiming = 'action' | 'bonus' | 'reaction' | 'other';
export type ActionSource = 'weapon' | 'spell' | 'feature' | 'item' | 'custom' | 'basic';

export const ACTION_TIMINGS: { id: ActionTiming; label: string; title: string }[] = [
    { id: 'action', label: 'Action', title: 'Actions' },
    { id: 'bonus', label: 'Bonus', title: 'Bonus Actions' },
    { id: 'reaction', label: 'Reaction', title: 'Reactions' },
    { id: 'other', label: 'Other', title: 'Other' },
];

export interface ActionEffect {
    dice: string;
    modifier: number;
    kind: 'damage' | 'healing';
    type?: string;
}

export interface ActionRow {
    /** Stable React key */
    key: string;
    timing: ActionTiming;
    name: string;
    source: ActionSource;
    /** Shown on the row's label: "Weapon", "Level 1", "Cantrip", "Feature", ... */
    sourceLabel: string;
    /** Attack roll bonus (weapon or spell attack) */
    toHit?: number;
    /** The saving throw the target makes */
    save?: { dc: number; ability: string };
    effect?: ActionEffect;
    mastery?: { name: string; description: string };
    concentration?: boolean;
    spellLevel?: number;
    /** Remaining uses, e.g. "2 / 3" */
    uses?: string;
    /** One line under the name, e.g. when a reaction triggers */
    note?: string;
    description: string;
    facts?: [string, string][];
    /** Index in data.actions, for custom and item rows (so they can be removed) */
    storedIndex?: number;
}

export interface CastableSpell {
    id: string;
    /** "Subclass", "Species", "Magic Initiate", ... when the spell doesn't come from your class list */
    grantedBy?: string;
}

/** What the spell list can cast right now, and the slots left (reported by SpellManager). */
export interface CastableSummary {
    spells: CastableSpell[];
    /** Slots per spell level (index 0 = level 1) */
    maxSlots: number[];
    slotsUsed: Record<number, number>;
    pact: { count: number; slotLevel: number; used: number } | null;
}

export interface SpellcastingNumbers {
    attack: number;
    dc: number;
    /** Spellcasting ability modifier (added to healing like Cure Wounds) */
    modifier: number;
}

const ABILITY_ABBR: Record<string, string> = {
    strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Which part of your turn a casting time uses. "1 reaction, which you take when ..." is a reaction. */
export function castingTimeToTiming(castingTime: string): ActionTiming {
    const time = (castingTime || '').toLowerCase();
    if (time.includes('bonus action')) return 'bonus';
    if (time.includes('reaction')) return 'reaction';
    if (/^\s*1 action\b/.test(time) || time === 'action') return 'action';
    return 'other';
}

/** The trigger in a casting time ("..., which you take when you are hit by an attack roll") as its own sentence. */
function castingTrigger(castingTime: string): string | undefined {
    const m = /which you take (.+)$/i.exec(castingTime || '');
    return m ? `${capitalize(m[1].trim()).replace(/\.$/, '')}.` : undefined;
}

/**
 * Reads what a spell does from its (SRD 5.2) text: spell attack or saving throw, damage or
 * healing dice, and cantrip dice at the character's level. Anything it can't read is left out.
 */
export function readSpellEffect(description: string, spellLevel: number, characterLevel: number, spellModifier: number): {
    attack: boolean;
    saveAbility?: string;
    effect?: ActionEffect;
} {
    const text = description || '';
    const attack = /\bspell attack\b/i.test(text);
    const save = /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i.exec(text);

    let effect: ActionEffect | undefined;
    const heal = /regains?[^.]*?Hit Points equal to (\d+d\d+)( plus your spellcasting ability modifier)?/i.exec(text);
    const damage = /(\d+d\d+)(?:\s*\+\s*(\d+))?\s+([A-Za-z]+)\s+damage/.exec(text);
    if (heal) {
        effect = { dice: heal[1], modifier: heal[2] ? spellModifier : 0, kind: 'healing' };
    } else if (damage) {
        effect = { dice: damage[1], modifier: damage[2] ? Number(damage[2]) : 0, kind: 'damage', type: damage[3].toLowerCase() };
    }

    // Cantrip Upgrade: "... increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10)."
    if (effect && spellLevel === 0) {
        const upgrade = /levels 5 \((\d+d\d+)\), 11 \((\d+d\d+)\), and 17 \((\d+d\d+)\)/.exec(text);
        if (upgrade) {
            effect.dice = characterLevel >= 17 ? upgrade[3] : characterLevel >= 11 ? upgrade[2] : characterLevel >= 5 ? upgrade[1] : effect.dice;
        }
    }

    return { attack, saveAbility: save ? ABILITY_ABBR[save[1].toLowerCase()] : undefined, effect };
}

export interface SpellSource extends SpellActionSource {
    level: number;
}

export function spellRow(spell: SpellSource, castable: CastableSpell, characterLevel: number, numbers: SpellcastingNumbers | null): ActionRow {
    const timing = castingTimeToTiming(spell.castingTime);
    const read = readSpellEffect(spell.description, spell.level, characterLevel, numbers?.modifier ?? 0);
    const facts: [string, string][] = [];
    if (timing === 'other') facts.push(['Casting time', spell.castingTime]);
    facts.push(['Range', spell.range], ['Duration', spell.duration], ['Components', spell.components]);
    if (castable.grantedBy) facts.push(['From', castable.grantedBy]);
    return {
        key: `spell:${spell.id}`,
        timing,
        name: spell.name,
        source: 'spell',
        sourceLabel: spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`,
        toHit: read.attack && numbers ? numbers.attack : undefined,
        save: read.saveAbility && numbers ? { dc: numbers.dc, ability: read.saveAbility } : undefined,
        effect: read.effect,
        concentration: /^concentration/i.test(spell.duration || ''),
        spellLevel: spell.level,
        note: timing === 'reaction' || timing === 'bonus' ? castingTrigger(spell.castingTime) : undefined,
        description: spell.description,
        facts,
    };
}

export function weaponRow(attack: WeaponAttack, index: number, hasWeaponMastery: boolean, masteryWeapons: string[] | null): ActionRow {
    const masteryId = hasWeaponMastery && (!masteryWeapons || masteryWeapons.includes(attack.name.trim().toLowerCase()))
        ? getMasteryForWeapon(attack.name, attack.mastery)
        : undefined;
    const mastery = masteryId ? MASTERY_INFO[masteryId] : undefined;
    const facts: [string, string][] = [];
    if (attack.properties.length > 0) facts.push(['Properties', attack.properties.join(', ')]);
    if (attack.gwf) facts.push(['Great Weapon Fighting', 'Treat any 1 or 2 on a damage die as a 3']);
    return {
        key: `weapon:${index}:${attack.name}`,
        timing: 'action',
        name: attack.name,
        source: 'weapon',
        sourceLabel: 'Weapon',
        toHit: attack.toHit,
        effect: { dice: attack.damage, modifier: attack.damageMod, kind: 'damage', type: attack.damageType },
        mastery: mastery ? { name: mastery.name, description: mastery.description } : undefined,
        note: attack.sneakAttackDice > 0 ? `+${attack.sneakAttackDice}d6 Sneak Attack once per turn, with Advantage or an ally next to the target.` : undefined,
        description: attack.ranged ? 'Ranged weapon attack.' : 'Melee weapon attack.',
        facts,
    };
}

/** Opportunity Attack, from the first equipped melee weapon. */
export function opportunityAttackRow(attacks: WeaponAttack[]): ActionRow | null {
    const melee = attacks.find((a) => !a.ranged);
    if (!melee) return null;
    return {
        key: 'basic:opportunity-attack',
        timing: 'reaction',
        name: 'Opportunity Attack',
        source: 'basic',
        sourceLabel: melee.name,
        toHit: melee.toHit,
        effect: { dice: melee.damage, modifier: melee.damageMod, kind: 'damage', type: melee.damageType },
        note: 'When a creature you can see leaves your reach.',
        description: `Make one melee attack against the creature with your ${melee.name}, using your Reaction.`,
    };
}

/** Class resources you spend as part of your turn, and when (2024 rules). Others (Arcane Recovery, ...) aren't turn actions. */
const RESOURCE_TIMING: Record<string, ActionTiming> = {
    'Rage': 'bonus',
    'Second Wind': 'bonus',
    'Bardic Inspiration': 'bonus',
    'Lay on Hands': 'bonus',
    'Wild Shape': 'bonus',
    'Innate Sorcery': 'bonus',
    'War Priest': 'bonus',
    'Focus Points': 'bonus',
    'Favored Enemy': 'bonus',
    'Blessing of the Raven Queen': 'bonus',
    'Warding Flare': 'reaction',
    'Action Surge': 'other',
    'Indomitable': 'other',
    'Stroke of Luck': 'other',
    'Superiority Dice': 'other',
    'Sorcery Points': 'other',
    'Heroic Inspiration': 'other',
    'Psionic Energy Dice': 'other',
};

export function featureRows(resources: ClassResources | undefined, primaryClass: string): ActionRow[] {
    return Object.values(resources || {})
        .filter((r) => r && (RESOURCE_TIMING[r.name] || r.name === 'Channel Divinity'))
        .map((r) => ({
            key: `feature:${r.name}`,
            // Paladins' Channel Divinity options are Bonus Actions (Divine Sense); Clerics' are Magic actions
            timing: r.name === 'Channel Divinity' ? (primaryClass === 'paladin' ? 'bonus' : 'action') : RESOURCE_TIMING[r.name],
            name: r.name,
            source: 'feature' as const,
            sourceLabel: 'Feature',
            uses: `${r.current} / ${r.max}`,
            description: r.description || '',
        }));
}

/** Stored actions the app generated (spell casts, weapon attacks, mastery); the live rows replace them. */
export function isGeneratedAction(action: CharacterAction, spells: SpellActionSource[]): boolean {
    const name = action.name || '';
    if (name.endsWith(' Attack')) return true;
    if (action.spellId || findActionSpell(action, spells)) return true;
    return Object.values(MASTERY_INFO).some((m) => action.description === m.description && name.endsWith(`(${m.name})`));
}

/** Custom and magic-item actions saved on the character ("Use Wand of Webs" is an item action). */
export function storedRows(actions: CharacterAction[], spells: SpellActionSource[]): ActionRow[] {
    return (Array.isArray(actions) ? actions : []).flatMap((action, index) => {
        if (!action || isGeneratedAction(action, spells)) return [];
        const isItem = /^Use /.test(action.name || '');
        return [{
            key: `stored:${index}:${action.name}`,
            timing: (['action', 'bonus', 'reaction', 'other'] as const).includes(action.type) ? action.type : 'other',
            name: isItem ? action.name.replace(/^Use /, '').replace(/ \(Bonus\)$/, '') : action.name,
            source: isItem ? 'item' as const : 'custom' as const,
            sourceLabel: isItem ? 'Item' : 'Custom',
            description: action.description || '',
            storedIndex: index,
        }];
    });
}

export interface BuildActionRowsInput {
    attacks: WeaponAttack[];
    hasWeaponMastery: boolean;
    masteryWeapons: string[] | null;
    castable: CastableSpell[];
    spells: SpellSource[];
    spellcasting: SpellcastingNumbers | null;
    characterLevel: number;
    resources?: ClassResources;
    primaryClass: string;
    storedActions: CharacterAction[];
}

const SOURCE_ORDER: ActionSource[] = ['weapon', 'basic', 'feature', 'spell', 'item', 'custom'];

/** Every row for the Actions card, grouped later by timing. Weapons first, then features, spells (by level), items and custom. */
export function buildActionRows(input: BuildActionRowsInput): ActionRow[] {
    const spellById = new Map(input.spells.map((s) => [s.id, s]));
    const rows: ActionRow[] = [
        ...input.attacks.map((a, i) => weaponRow(a, i, input.hasWeaponMastery, input.masteryWeapons)),
        ...[opportunityAttackRow(input.attacks)].filter((r): r is ActionRow => !!r),
        ...featureRows(input.resources, input.primaryClass),
        ...input.castable
            .filter((c, i, all) => all.findIndex((o) => o.id === c.id) === i)
            .flatMap((c) => {
                const spell = spellById.get(c.id);
                return spell ? [spellRow(spell, c, input.characterLevel, input.spellcasting)] : [];
            }),
        ...storedRows(input.storedActions, input.spells),
    ];
    return rows
        .map((row, i) => ({ row, i }))
        .sort((a, b) =>
            SOURCE_ORDER.indexOf(a.row.source) - SOURCE_ORDER.indexOf(b.row.source)
            || (a.row.spellLevel ?? 0) - (b.row.spellLevel ?? 0)
            || a.i - b.i)
        .map(({ row }) => row);
}

/** The actions any character can take (2024 rules). */
export const BASIC_ACTIONS: { name: string; description: string }[] = [
    { name: 'Dash', description: 'Gain extra movement equal to your Speed for the rest of the turn.' },
    { name: 'Disengage', description: 'Your movement doesn’t provoke Opportunity Attacks for the rest of the turn.' },
    { name: 'Dodge', description: 'Until the start of your next turn, attack rolls against you have Disadvantage and you have Advantage on Dexterity saving throws.' },
    { name: 'Help', description: 'Give an ally Advantage on their next ability check, or on their next attack roll against an enemy within 5 feet of you.' },
    { name: 'Hide', description: 'Make a DC 15 Dexterity (Stealth) check while Heavily Obscured or behind Three-Quarters or Total Cover and out of sight.' },
    { name: 'Influence', description: 'Make a Charisma or Wisdom check to alter a creature’s attitude.' },
    { name: 'Magic', description: 'Cast a spell, use a magic item, or use a magical feature.' },
    { name: 'Ready', description: 'Choose a trigger and an action (or movement) to take with your Reaction when it happens.' },
    { name: 'Search', description: 'Make a Wisdom check to find something.' },
    { name: 'Study', description: 'Make an Intelligence check to recall or work something out.' },
    { name: 'Utilize', description: 'Use a nonmagical object.' },
];
