import { CharacterAction } from './types';

/** The spell fields a "Cast <spell>" action is built from. */
export interface SpellActionSource {
    id: string;
    name: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
}

export type SpellActionType = CharacterAction['type'];

const SUFFIX: Record<SpellActionType, string> = { action: '', bonus: ' (Bonus)', reaction: ' (Reaction)', other: '' };

/** Action name for casting a spell ("Cast Shield (Reaction)"). */
export function spellActionName(spellName: string, type: SpellActionType): string {
    return `Cast ${spellName}${SUFFIX[type] ?? ''}`;
}

/** Action text for a spell: its casting details followed by the description. */
export function spellActionDescription(spell: SpellActionSource): string {
    return `**Casting Time:** ${spell.castingTime}\n**Range:** ${spell.range}\n**Components:** ${spell.components}\n**Duration:** ${spell.duration}\n\n${spell.description}`;
}

/** Split "Cast Healing Word (Bonus)" into the spell name and the suffix. */
export function parseSpellActionName(name: string): { spellName: string; suffix: string } | null {
    const m = /^Cast (.+?)( \((?:Bonus|Reaction)\))?$/.exec((name || '').trim());
    return m ? { spellName: m[1], suffix: m[2] || '' } : null;
}

const norm = (s: string) => s.trim().toLowerCase();
/** Spell ids are slugs of the name they were created with ("Power Word: Stun" -> "power-word-stun"). */
const slug = (s: string) => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * The spell an action casts: by its spellId, or, for actions saved before spellId
 * existed, by its "Cast <spell>" name (current or former). Name matching only applies to text the app
 * generated (it starts with the casting details), so hand-written actions are left alone.
 */
export function findActionSpell<T extends SpellActionSource>(action: Partial<CharacterAction>, spells: T[]): T | undefined {
    if (action.spellId) {
        const byId = spells.find(s => s.id === action.spellId);
        if (byId) return byId;
    }
    if (!(action.description || '').startsWith('**Casting Time:**')) return undefined;
    const parsed = parseSpellActionName(action.name || '');
    if (!parsed) return undefined;
    // By current name; failing that by id, which still carries the 2014 name of a renamed
    // spell (an action saved as "Cast Feeblemind" finds Befuddlement, id "feeblemind")
    return spells.find(s => norm(s.name) === norm(parsed.spellName))
        ?? spells.find(s => s.id === slug(parsed.spellName));
}

/**
 * The action as it should be shown: spell actions take their name and text from the
 * current spell list (so rules updates and admin edits show up), keeping the saved
 * Bonus/Reaction label. Other actions, and spells that can't be found, are unchanged.
 */
export function liveSpellAction<T extends Partial<CharacterAction>>(action: T, spells: SpellActionSource[]): T {
    const spell = findActionSpell(action, spells);
    if (!spell) return action;
    const suffix = parseSpellActionName(action.name || '')?.suffix ?? '';
    return { ...action, name: `Cast ${spell.name}${suffix}`, description: spellActionDescription(spell) };
}

/** True if the action casts this spell with this action type (by spellId or live name). */
export function isActionForSpell(action: Partial<CharacterAction>, spell: SpellActionSource, type: SpellActionType, spells: SpellActionSource[]): boolean {
    if (norm(action.name || '') === norm(spellActionName(spell.name, type))) return true;
    if (findActionSpell(action, spells)?.id !== spell.id) return false;
    return (parseSpellActionName(action.name || '')?.suffix ?? '') === (SUFFIX[type] ?? '');
}
