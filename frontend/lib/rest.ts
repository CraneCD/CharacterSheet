import { CharacterData, ClassResources, HitDice, HP } from './types';
import { applyHealing } from './hp';

/**
 * Short and Long Rest (2024 rules), as pure functions so the sheet's single rest flow
 * can preview, apply and summarize them. Class resources are reset on the server by
 * PATCH /class-resources { resetType }; `resources` here mirrors that for the preview.
 */

export interface RestContext {
    /** Warlock class level (0 if none). */
    warlockLevel: number;
    /** More than one class: Pact Magic slots are tracked apart from other slots. */
    multiclass: boolean;
    /** Magic Initiate's 1st-level spell has a free casting that returns on a Long Rest. */
    hasMagicInitiateSpell: boolean;
}

export interface RestPlan {
    /** Fields to PATCH onto character data (never classResources: the server resets those). */
    updates: Partial<CharacterData>;
    /** Class resources after the rest. */
    resources: ClassResources;
    /** Whether any class resource recovers, i.e. whether to call the class-resources reset. */
    resetsResources: boolean;
    /** Human-readable list of what came back, for the confirmation toast. */
    summary: string[];
}

const DEFAULT_HP: HP = { current: 0, max: 0, temp: 0 };

function anySlotsUsed(used: CharacterData['spellSlotsUsed']): boolean {
    return !!used && Object.values(used).some((n) => Number(n) > 0);
}

function listNames(names: string[]): string {
    if (names.length <= 1) return names.join('');
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** Hit point healing from one Hit Die: the roll plus CON modifier, minimum 1. */
export function hitDieHealing(roll: number, conModifier: number): number {
    return Math.max(1, Math.floor(roll) + conModifier);
}

export function rollHitDie(dieType: number, random: () => number = Math.random): number {
    return Math.floor(random() * dieType) + 1;
}

function recoverResources(resources: ClassResources, kind: 'short' | 'long'): { resources: ClassResources; restored: string[] } {
    const next: ClassResources = {};
    const restored: string[] = [];
    for (const [key, resource] of Object.entries(resources || {})) {
        let current = resource.current;
        if (kind === 'long' && (resource.resetType === 'long' || resource.resetType === 'short')) {
            current = resource.max;
        } else if (kind === 'short' && resource.resetType === 'short') {
            current = resource.shortRestRegain != null
                ? Math.min(resource.current + resource.shortRestRegain, resource.max)
                : resource.max;
        }
        if (current !== resource.current) restored.push(resource.name || key);
        next[key] = current === resource.current ? resource : { ...resource, current };
    }
    return { resources: next, restored };
}

function resetsAny(resources: ClassResources, kind: 'short' | 'long'): boolean {
    return Object.values(resources || {}).some((r) => r.resetType === 'short' || (kind === 'long' && r.resetType === 'long'));
}

/**
 * Long Rest: full HP (temporary HP ends), all Hit Dice back, all spell slots back,
 * death saves cleared, and every short- or long-rest resource restored.
 */
export function planLongRest(data: Partial<CharacterData>, ctx: RestContext): RestPlan {
    const hp = { ...DEFAULT_HP, ...(data.hp || {}) };
    const summary: string[] = [];
    const updates: Partial<CharacterData> = {
        hp: { ...hp, current: hp.max, temp: 0, deathSaves: { successes: 0, failures: 0 } },
        spellSlotsUsed: {},
        pactSlotsUsed: 0,
    };

    if (hp.current < hp.max) summary.push(`HP restored to ${hp.max} (+${hp.max - Math.max(0, hp.current)})`);
    if (hp.temp > 0) summary.push(`${hp.temp} temporary HP ended`);

    if (data.hitDice) {
        updates.hitDice = { ...data.hitDice, spent: 0 };
        const spent = data.hitDice.spent || 0;
        if (spent > 0) summary.push(`Regained ${spent} Hit ${spent === 1 ? 'Die' : 'Dice'}`);
    }

    if (anySlotsUsed(data.spellSlotsUsed) || Number(data.pactSlotsUsed) > 0) summary.push('Spell slots restored');

    if (ctx.hasMagicInitiateSpell) {
        updates.magicInitiateSpell1Used = 1;
        if (data.magicInitiateSpell1Used === 0) summary.push('Magic Initiate spell ready');
    }

    const resources = data.classResources || {};
    const recovered = recoverResources(resources, 'long');
    if (recovered.restored.length > 0) summary.push(`${listNames(recovered.restored)} restored`);

    return { updates, resources: recovered.resources, resetsResources: resetsAny(resources, 'long'), summary };
}

/**
 * Short Rest: spend Hit Dice to heal (each roll + CON modifier, minimum 1), regain Pact Magic
 * slots, and recover short-rest resources (some, like Second Wind, regain only one use).
 */
export function planShortRest(
    data: Partial<CharacterData>,
    ctx: RestContext,
    hitDiceRolls: number[],
    conModifier: number
): RestPlan {
    const summary: string[] = [];
    const updates: Partial<CharacterData> = {};

    const hitDice: HitDice | undefined = data.hitDice;
    const available = hitDice ? Math.max(0, hitDice.total - hitDice.spent) : 0;
    const rolls = hitDiceRolls.slice(0, available);
    if (hitDice && rolls.length > 0) {
        const hp = { ...DEFAULT_HP, ...(data.hp || {}) };
        const total = rolls.reduce((sum, roll) => sum + hitDieHealing(roll, conModifier), 0);
        const healed = applyHealing(hp, total);
        updates.hitDice = { ...hitDice, spent: hitDice.spent + rolls.length };
        updates.hp = healed.hp;
        summary.push(`Spent ${rolls.length} Hit ${rolls.length === 1 ? 'Die' : 'Dice'}: healed ${healed.healed} HP`);
    }

    if (ctx.warlockLevel > 0) {
        if (ctx.multiclass) {
            if (Number(data.pactSlotsUsed) > 0) summary.push('Pact Magic slots restored');
            updates.pactSlotsUsed = 0;
        } else {
            if (anySlotsUsed(data.spellSlotsUsed)) summary.push('Pact Magic slots restored');
            updates.spellSlotsUsed = {};
        }
    }

    const resources = data.classResources || {};
    const recovered = recoverResources(resources, 'short');
    if (recovered.restored.length > 0) summary.push(`${listNames(recovered.restored)} recovered`);

    return { updates, resources: recovered.resources, resetsResources: resetsAny(resources, 'short'), summary };
}
