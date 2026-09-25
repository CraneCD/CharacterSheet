import { partyBudget, rateEncounter, xpPerCharacter } from '@/lib/encounterDifficulty';
import {
    addCombatants, Combatant, customCombatant, damageCombatant, EncounterState, encounterXp, healCombatant,
    monsterCombatant, nextCombatantName, nextTurn, normalizeEncounter, partyCombatant, previousTurn,
    removeCombatant, rollInitiatives, setInitiative, sortByInitiative, startCombat,
} from '@/lib/initiative';
import {
    averageRoll, crValue, filterMonsters, formatBonusList, formatSaves, Monster, monsterInitiative, monsterXp,
    parseBonusList, parseSaves, rollMonsterHp, xpForCr,
} from '@/lib/monsters';
import { buildDerivedStats, derivedStatsChanged, formatJoinCode, formatSessionDate, partyStats, PartyMemberDm } from '@/lib/campaigns';

const goblin: Monster = {
    id: 'goblin-warrior', name: 'Goblin Warrior', size: 'Small', type: 'Fey (Goblinoid)', ac: 15, hp: 10, hitDice: '3d6',
    speed: '30 ft.', initiative: 2, abilities: { str: 8, dex: 15, con: 10, int: 10, wis: 8, cha: 8 }, cr: '1/4',
};
const ogre: Monster = { ...goblin, id: 'ogre', name: 'Ogre', type: 'Giant', ac: 11, hp: 68, hitDice: '8d10+24', initiative: undefined, abilities: { ...goblin.abilities, dex: 8 }, cr: '2' };

/** Fixed sequence of "random" numbers for dice. */
const seq = (...values: number[]) => { let i = 0; return () => values[i++ % values.length]; };
const c = (name: string, initiative: number | null, extra: Partial<Combatant> = {}): Combatant =>
    ({ id: name, kind: 'monster', name, initiative, initiativeBonus: 0, ...extra });

describe('monsters', () => {
    it('reads CR, XP and initiative', () => {
        expect(crValue('1/4')).toBe(0.25);
        expect(crValue('10')).toBe(10);
        expect(xpForCr('1/4')).toBe(50);
        expect(xpForCr('17')).toBe(18000);
        expect(monsterXp({ cr: '0', xp: 0 })).toBe(0);
        expect(monsterInitiative(goblin)).toBe(2);
        expect(monsterInitiative(ogre)).toBe(-1);
    });

    it('averages and rolls hit dice', () => {
        expect(averageRoll('8d10+24')).toBe(68);
        expect(averageRoll('3d6')).toBe(10);
        expect(rollMonsterHp(goblin, () => 0)).toBe(3);
        expect(rollMonsterHp(goblin, () => 0.999)).toBe(18);
        expect(rollMonsterHp({ hp: 7 })).toBe(7);
    });

    it('filters by name or type and CR, lowest CR first, without legacy entries', () => {
        const list = [ogre, goblin, { ...goblin, id: 'old', name: 'Old Goblin', legacy: true }];
        expect(filterMonsters(list).map((m) => m.id)).toEqual(['goblin-warrior', 'ogre']);
        expect(filterMonsters(list, { query: 'giant' }).map((m) => m.id)).toEqual(['ogre']);
        expect(filterMonsters(list, { minCr: 1 }).map((m) => m.id)).toEqual(['ogre']);
    });
});

describe('encounter difficulty (2024)', () => {
    it('adds up each character\'s budget', () => {
        expect(partyBudget([1, 1, 1, 1])).toEqual({ low: 200, moderate: 300, high: 400 });
        expect(partyBudget([5, 3])).toEqual({ low: 650, moderate: 975, high: 1500 });
        // Out-of-range levels are clamped
        expect(partyBudget([0, 25])).toEqual({ low: 50 + 6400, moderate: 75 + 13200, high: 100 + 22000 });
    });

    it('rates the monsters against the budget', () => {
        const budget = partyBudget([3, 3, 3, 3]); // 600 / 900 / 1600
        expect(rateEncounter(0, budget)).toBe('none');
        expect(rateEncounter(600, budget)).toBe('low');
        expect(rateEncounter(700, budget)).toBe('moderate');
        expect(rateEncounter(1600, budget)).toBe('high');
        expect(rateEncounter(1601, budget)).toBe('beyond');
    });

    it('splits XP between the party', () => {
        expect(xpPerCharacter(1000, 3)).toBe(333);
        expect(xpPerCharacter(1000, 0)).toBe(0);
    });
});

describe('initiative tracker', () => {
    it('numbers repeated monsters', () => {
        expect(nextCombatantName('Goblin', [])).toBe('Goblin');
        expect(nextCombatantName('Goblin', [{ name: 'Goblin' }])).toBe('Goblin 2');
        expect(nextCombatantName('Goblin', [{ name: 'Goblin' }, { name: 'Goblin 3' }, { name: 'Goblin Boss' }])).toBe('Goblin 4');
    });

    it('builds monster combatants from a stat block', () => {
        const m = monsterCombatant(goblin, [], { rollHp: false });
        expect(m).toMatchObject({ kind: 'monster', name: 'Goblin Warrior', ac: 15, hp: { current: 10, max: 10, temp: 0 }, initiativeBonus: 2, xp: 50, monsterSource: 'srd' });
        expect(monsterCombatant({ ...goblin, source: 'custom' }, []).monsterSource).toBe('custom');
        expect(monsterCombatant(goblin, [], { rollHp: true, random: () => 0 }).hp).toEqual({ current: 3, max: 3, temp: 0 });
    });

    it('sorts by initiative, then bonus, then party first, unrolled last', () => {
        const order = sortByInitiative([
            c('Unrolled', null),
            c('Low', 5),
            c('Tie monster', 12, { initiativeBonus: 1 }),
            c('Tie hero', 12, { kind: 'pc', initiativeBonus: 1 }),
            c('Tie fast', 12, { initiativeBonus: 3 }),
        ]);
        expect(order.map((x) => x.name)).toEqual(['Tie fast', 'Tie hero', 'Tie monster', 'Low', 'Unrolled']);
    });

    it('rolls for monsters but leaves party members to roll their own', () => {
        const state: EncounterState = { combatants: [partyCombatant({ id: 'p', name: 'Hero' }), c('Goblin', null, { initiativeBonus: 2 }), c('Set', 7)], round: 0, turn: 0 };
        const rolled = rollInitiatives(state, { random: () => 0.5 }); // d20 = 11
        expect(rolled.combatants.map((x) => x.initiative)).toEqual([null, 13, 7]);
        expect(rollInitiatives(state, { includeParty: true, random: () => 0 }).combatants[0].initiative).toBe(1);
    });

    it('runs turns and rounds, skipping the defeated', () => {
        let s = startCombat({ combatants: [c('B', 10), c('A', 15), c('C', 5, { defeated: true })], round: 0, turn: 0 });
        expect(s.combatants.map((x) => x.name)).toEqual(['A', 'B', 'C']);
        expect(s).toMatchObject({ round: 1, turn: 0 });
        s = nextTurn(s);
        expect(s).toMatchObject({ round: 1, turn: 1 });
        s = nextTurn(s); // C is defeated: back to A in round 2
        expect(s).toMatchObject({ round: 2, turn: 0 });
        s = previousTurn(s);
        expect(s).toMatchObject({ round: 1, turn: 1 });
        s = previousTurn(previousTurn(s));
        expect(s).toMatchObject({ round: 1, turn: 0 }); // can't go before the start
    });

    it("keeps whose turn it is when initiatives change or combatants join and leave", () => {
        let s = startCombat({ combatants: [c('A', 15), c('B', 10), c('C', 5)], round: 0, turn: 0 });
        s = nextTurn(s); // B's turn
        s = setInitiative(s, 'C', 20);
        expect(s.combatants.map((x) => x.name)).toEqual(['C', 'A', 'B']);
        expect(s.combatants[s.turn].name).toBe('B');
        s = addCombatants(s, [c('D', 12)]);
        expect(s.combatants[s.turn].name).toBe('B');
        s = removeCombatant(s, 'C');
        expect(s.combatants[s.turn].name).toBe('B');
        s = removeCombatant(s, 'B'); // B was last in order: the turn passes to the top of a new round
        expect(s.combatants[s.turn].name).toBe('A');
        expect(s.round).toBe(2);
    });

    it('damages through temp HP and marks monsters defeated at 0; healing brings them back', () => {
        const m = customCombatant({ name: 'Bandit', hp: 11, ac: 12, initiativeBonus: 1 });
        const hit = damageCombatant({ ...m, hp: { current: 11, max: 11, temp: 3 } }, 5);
        expect(hit.hp).toEqual({ current: 9, max: 11, temp: 0 });
        const down = damageCombatant(hit, 50);
        expect(down).toMatchObject({ hp: { current: 0 }, defeated: true });
        expect(healCombatant(down, 30)).toMatchObject({ hp: { current: 11 }, defeated: false });
    });

    it('totals XP for monsters only', () => {
        expect(encounterXp([c('A', 1, { xp: 50 }), c('B', 1, { xp: 450 }), { ...partyCombatant({ id: 'p', name: 'P' }), xp: 999 }])).toBe(500);
    });

    it('reads stored data defensively', () => {
        expect(normalizeEncounter(null)).toEqual({ combatants: [], round: 0, turn: 0 });
        expect(normalizeEncounter({ combatants: [c('A', 1), 'junk'], round: 2, turn: 9 })).toEqual({ combatants: [c('A', 1)], round: 2, turn: 0 });
    });
});

describe('party stats for the DM', () => {
    const member: PartyMemberDm = {
        id: 'c', userId: 'u', name: 'Hero', race: 'human', class: 'fighter', level: 3,
        hp: { current: 20, max: 28, temp: 0 }, conditions: [], exhaustion: 0, languages: [],
        abilityScores: { dex: 14, wis: 12, int: 8 },
    };

    it("uses what the sheet saved", () => {
        const derived = buildDerivedStats({ ac: 17, speed: 30, initiative: 2, passives: { perception: 14, insight: 11, investigation: 9 }, spellSaveDc: null });
        expect(partyStats({ ...member, derivedStats: derived })).toEqual({ ...derived, estimated: false });
        expect(derived.spellSaveDc).toBeUndefined();
    });

    it('estimates from ability scores when the sheet has not saved yet', () => {
        expect(partyStats(member)).toMatchObject({ ac: 12, initiative: 2, passivePerception: 11, passiveInvestigation: 9, estimated: true });
        expect(partyStats({ ...member, acOverride: 19 }).ac).toBe(19);
    });

    it('only resaves derived stats when they changed', () => {
        const derived = buildDerivedStats({ ac: 17, speed: 30, initiative: 2, passives: { perception: 14, insight: 11, investigation: 9 }, spellSaveDc: 13 });
        expect(derivedStatsChanged(undefined, derived)).toBe(true);
        expect(derivedStatsChanged({ ...derived }, derived)).toBe(false);
        expect(derivedStatsChanged({ ...derived, ac: 16 }, derived)).toBe(true);
        expect(derivedStatsChanged({ ...derived, spellSaveDc: undefined }, { ...derived, spellSaveDc: undefined })).toBe(false);
    });

    it('formats join codes and session dates', () => {
        expect(formatJoinCode('ABC234')).toBe('ABC-234');
        expect(formatSessionDate('2026-09-25T00:00:00.000Z')).toMatch(/2026/);
        expect(formatSessionDate(null)).toBe('');
    });
});

describe('custom monster text fields', () => {
    it('reads and writes skill and save lists', () => {
        expect(parseBonusList('Perception +4, Stealth +6, junk, Arcana −1')).toEqual({ Perception: 4, Stealth: 6, Arcana: -1 });
        expect(formatBonusList({ Perception: 4, Arcana: -1 })).toBe('Perception +4, Arcana -1');
        expect(parseSaves('Dex +5, wisdom +2, Luck +9')).toEqual({ dex: 5, wis: 2 });
        expect(formatSaves({ dex: 5, wis: 2 })).toBe('Dex +5, Wis +2');
    });
});
