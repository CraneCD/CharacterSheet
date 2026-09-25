/**
 * Encounter state for the DM's combat tracker. Combatants are kept in turn
 * order once combat starts, and `turn` indexes into that list (the backend's
 * player view relies on this; see backend/src/lib/campaignViews.ts).
 * Round 0 means the encounter is still being planned.
 */
import { Random, rollDie } from './dice';
import { Monster, monsterInitiative, monsterXp, rollMonsterHp } from './monsters';

export type CombatantKind = 'pc' | 'monster' | 'npc';

export interface CombatantHp {
    current: number;
    max: number;
    temp: number;
}

export interface Combatant {
    id: string;
    kind: CombatantKind;
    name: string;
    /** Party members: HP, AC and conditions come live from their sheet, not from here. */
    characterId?: string;
    monsterId?: string;
    monsterSource?: 'srd' | 'custom';
    initiative: number | null;
    initiativeBonus: number;
    ac?: number;
    hp?: CombatantHp;
    conditions?: string[];
    xp?: number;
    /** Left out of the players' view of the turn order */
    hidden?: boolean;
    defeated?: boolean;
    notes?: string;
}

export interface EncounterState {
    combatants: Combatant[];
    round: number;
    turn: number;
}

export type EncounterStatus = 'planned' | 'active' | 'completed';

export const EMPTY_ENCOUNTER: EncounterState = { combatants: [], round: 0, turn: 0 };

export function newCombatantId(random: Random = Math.random): string {
    return `c${Date.now().toString(36)}${Math.floor(random() * 36 ** 5).toString(36)}`;
}

/** "Goblin Warrior", then "Goblin Warrior 2", "Goblin Warrior 3", ... */
export function nextCombatantName(base: string, existing: Pick<Combatant, 'name'>[]): string {
    let highest = 0;
    for (const { name } of existing) {
        if (name === base) highest = Math.max(highest, 1);
        const m = name.startsWith(`${base} `) ? /^(\d+)$/.exec(name.slice(base.length + 1)) : null;
        if (m) highest = Math.max(highest, Number(m[1]));
    }
    return highest === 0 ? base : `${base} ${highest + 1}`;
}

/** Add a monster from a stat block: its own HP (rolled or average), AC, initiative bonus and XP. */
export function monsterCombatant(
    monster: Monster,
    existing: Pick<Combatant, 'name'>[],
    options: { rollHp?: boolean; random?: Random } = {}
): Combatant {
    const random = options.random ?? Math.random;
    const hp = options.rollHp ? rollMonsterHp(monster, random) : monster.hp;
    return {
        id: newCombatantId(random),
        kind: 'monster',
        name: nextCombatantName(monster.name, existing),
        monsterId: monster.id,
        monsterSource: monster.source === 'custom' ? 'custom' : 'srd',
        initiative: null,
        initiativeBonus: monsterInitiative(monster),
        ac: monster.ac,
        hp: { current: hp, max: hp, temp: 0 },
        conditions: [],
        xp: monsterXp(monster),
    };
}

export function partyCombatant(character: { id: string; name: string }, initiativeBonus = 0, random: Random = Math.random): Combatant {
    return {
        id: newCombatantId(random),
        kind: 'pc',
        name: character.name,
        characterId: character.id,
        initiative: null,
        initiativeBonus,
    };
}

/** A quick NPC or monster without a stat block. */
export function customCombatant(input: { name: string; hp: number; ac: number; initiativeBonus: number; kind?: CombatantKind }, random: Random = Math.random): Combatant {
    const hp = Math.max(1, Math.round(input.hp) || 1);
    return {
        id: newCombatantId(random),
        kind: input.kind ?? 'npc',
        name: input.name.trim() || 'Combatant',
        initiative: null,
        initiativeBonus: Math.round(input.initiativeBonus) || 0,
        ac: Math.max(0, Math.round(input.ac) || 0),
        hp: { current: hp, max: hp, temp: 0 },
        conditions: [],
    };
}

/** Highest initiative first; ties go to the higher bonus, then party members, then by name. Unrolled last. */
export function sortByInitiative(combatants: Combatant[]): Combatant[] {
    return combatants
        .map((c, index) => ({ c, index }))
        .sort((a, b) => {
            const ai = a.c.initiative, bi = b.c.initiative;
            if (ai === null && bi !== null) return 1;
            if (bi === null && ai !== null) return -1;
            if (ai !== null && bi !== null && ai !== bi) return bi - ai;
            if (a.c.initiativeBonus !== b.c.initiativeBonus) return b.c.initiativeBonus - a.c.initiativeBonus;
            const pcFirst = Number(b.c.kind === 'pc') - Number(a.c.kind === 'pc');
            if (pcFirst !== 0) return pcFirst;
            return a.c.name.localeCompare(b.c.name, undefined, { numeric: true }) || a.index - b.index;
        })
        .map(({ c }) => c);
}

/** Roll d20 + bonus for monsters and NPCs (party members roll their own unless includeParty). */
export function rollInitiatives(
    state: EncounterState,
    options: { includeParty?: boolean; onlyMissing?: boolean; random?: Random } = {}
): EncounterState {
    const { includeParty = false, onlyMissing = true, random = Math.random } = options;
    const combatants = state.combatants.map((c) => {
        if (c.kind === 'pc' && !includeParty) return c;
        if (onlyMissing && c.initiative !== null) return c;
        return { ...c, initiative: rollDie(20, random) + c.initiativeBonus };
    });
    return keepCurrent(state, combatants);
}

export function currentCombatant(state: EncounterState): Combatant | undefined {
    return state.round > 0 ? state.combatants[state.turn] : undefined;
}

/** Everyone still in the fight (party members at 0 HP still take turns for death saves). */
const canAct = (c: Combatant) => !c.defeated;

/** Sort into turn order and begin round 1 with the first combatant who can act. */
export function startCombat(state: EncounterState): EncounterState {
    const combatants = sortByInitiative(state.combatants);
    const first = combatants.findIndex(canAct);
    return { combatants, round: 1, turn: Math.max(0, first) };
}

/** Next combatant who can act; wrapping around starts a new round. */
export function nextTurn(state: EncounterState): EncounterState {
    if (state.round === 0) return startCombat(state);
    const n = state.combatants.length;
    if (n === 0) return state;
    let round = state.round;
    for (let step = 1; step <= n; step++) {
        const index = (state.turn + step) % n;
        if (canAct(state.combatants[index])) {
            // Wrapped past the end of the order: a new round
            if (index <= state.turn) round += 1;
            return { ...state, round, turn: index };
        }
    }
    return state;
}

/** Back one turn (undo a click); stops at the first turn of round 1. */
export function previousTurn(state: EncounterState): EncounterState {
    if (state.round === 0) return state;
    const n = state.combatants.length;
    for (let step = 1; step <= n; step++) {
        const raw = state.turn - step;
        const index = ((raw % n) + n) % n;
        const round = raw < 0 ? state.round - 1 : state.round;
        if (round < 1) return state;
        if (canAct(state.combatants[index])) return { ...state, round, turn: index };
    }
    return state;
}

/**
 * Re-sort after a change without changing whose turn it is. While planning
 * (round 0) the list stays in the order things were added.
 */
function keepCurrent(state: EncounterState, combatants: Combatant[]): EncounterState {
    if (state.round === 0) return { ...state, combatants };
    const currentId = state.combatants[state.turn]?.id;
    const sorted = sortByInitiative(combatants);
    const turn = sorted.findIndex((c) => c.id === currentId);
    return { ...state, combatants: sorted, turn: turn === -1 ? Math.min(state.turn, Math.max(0, sorted.length - 1)) : turn };
}

export function setInitiative(state: EncounterState, id: string, initiative: number | null): EncounterState {
    return keepCurrent(state, state.combatants.map((c) => (c.id === id ? { ...c, initiative } : c)));
}

export function updateCombatant(state: EncounterState, id: string, patch: Partial<Combatant>): EncounterState {
    const combatants = state.combatants.map((c) => (c.id === id ? { ...c, ...patch, id: c.id } : c));
    return 'initiative' in patch || 'initiativeBonus' in patch ? keepCurrent(state, combatants) : { ...state, combatants };
}

/** Join mid-fight too: combatants without an initiative roll are sorted last until they get one. */
export function addCombatants(state: EncounterState, added: Combatant[]): EncounterState {
    return keepCurrent(state, [...state.combatants, ...added]);
}

/** Removing whoever's turn it is passes the turn to the next combatant. */
export function removeCombatant(state: EncounterState, id: string): EncounterState {
    const index = state.combatants.findIndex((c) => c.id === id);
    if (index === -1) return state;
    const combatants = state.combatants.filter((c) => c.id !== id);
    if (state.round === 0) return { ...state, combatants };
    let turn = state.turn;
    let round = state.round;
    if (index < state.turn) turn -= 1;
    else if (index === state.turn && turn >= combatants.length) {
        turn = 0;
        round += 1;
    }
    return { combatants, round, turn: Math.max(0, turn) };
}

/** Damage a monster or NPC: temporary HP first, never below 0; at 0 it's defeated. */
export function damageCombatant(c: Combatant, amount: number): Combatant {
    if (!c.hp) return c;
    const damage = Math.max(0, Math.floor(amount) || 0);
    const absorbed = Math.min(c.hp.temp, damage);
    const current = Math.max(0, c.hp.current - (damage - absorbed));
    return { ...c, hp: { ...c.hp, current, temp: c.hp.temp - absorbed }, defeated: current === 0 ? true : c.defeated };
}

/** Heal up to max HP; a defeated combatant brought above 0 is back in the fight. */
export function healCombatant(c: Combatant, amount: number): Combatant {
    if (!c.hp) return c;
    const healing = Math.max(0, Math.floor(amount) || 0);
    const current = Math.min(c.hp.max, c.hp.current + healing);
    return { ...c, hp: { ...c.hp, current }, defeated: current > 0 ? false : c.defeated };
}

/** XP of all the monsters and NPCs with a stat block. */
export function encounterXp(combatants: Combatant[]): number {
    return combatants.filter((c) => c.kind !== 'pc').reduce((sum, c) => sum + (c.xp ?? 0), 0);
}

/** Read a stored encounter defensively (older or hand-edited data). */
export function normalizeEncounter(data: unknown): EncounterState {
    const d = (data && typeof data === 'object' ? data : {}) as Partial<EncounterState>;
    const combatants = Array.isArray(d.combatants) ? d.combatants.filter((c): c is Combatant => !!c && typeof c === 'object' && typeof c.id === 'string') : [];
    const round = typeof d.round === 'number' && d.round > 0 ? Math.floor(d.round) : 0;
    const turn = typeof d.turn === 'number' ? Math.min(Math.max(0, Math.floor(d.turn)), Math.max(0, combatants.length - 1)) : 0;
    return { combatants, round, turn };
}
