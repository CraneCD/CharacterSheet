// What campaign members get to see of characters and encounters. Players see
// who is in the party (name, class, level, portrait) but never another
// player's sheet; the DM also gets the numbers they need to run the table.

type Json = Record<string, any>;

export interface CharacterRow {
    id: string;
    userId: string;
    name: string;
    race: string;
    class: string;
    level: number;
    updatedAt?: Date | string;
    data: unknown;
}

const num = (v: unknown, fallback = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);

/** Name, class, level and portrait: fine for anyone in the campaign. */
export function basicCharacterView(c: CharacterRow) {
    const data = (c.data && typeof c.data === 'object' ? c.data : {}) as Json;
    return {
        id: c.id,
        userId: c.userId,
        name: c.name,
        race: c.race,
        class: c.class,
        level: c.level,
        portrait: typeof data.portrait === 'string' ? data.portrait : undefined,
    };
}

/**
 * The DM's party view: HP, conditions and the stats the sheet last worked out
 * (`derivedStats`, saved by the owner's sheet). Ability scores and manual
 * AC/speed let the client fall back for sheets that haven't been opened since.
 */
export function dmCharacterView(c: CharacterRow) {
    const data = (c.data && typeof c.data === 'object' ? c.data : {}) as Json;
    const hp = data.hp && typeof data.hp === 'object' ? data.hp : {};
    return {
        ...basicCharacterView(c),
        updatedAt: c.updatedAt,
        hp: {
            current: num(hp.current),
            max: num(hp.max),
            temp: num(hp.temp),
            deathSaves: hp.deathSaves && typeof hp.deathSaves === 'object'
                ? { successes: num(hp.deathSaves.successes), failures: num(hp.deathSaves.failures) }
                : undefined,
        },
        conditions: Array.isArray(data.conditions) ? data.conditions.filter((x: unknown) => typeof x === 'string') : [],
        exhaustion: num(data.exhaustion),
        derivedStats: data.derivedStats && typeof data.derivedStats === 'object' ? data.derivedStats : undefined,
        abilityScores: data.abilityScores && typeof data.abilityScores === 'object' ? data.abilityScores : undefined,
        acOverride: typeof data.ac === 'number' ? data.ac : undefined,
        speedOverride: typeof data.speed === 'number' ? data.speed : undefined,
        languages: Array.isArray(data.languages) ? data.languages.filter((x: unknown) => typeof x === 'string') : [],
    };
}

export type MonsterHealth = 'healthy' | 'hurt' | 'bloodied' | 'down';

/** Coarse health players may see for a monster, like a DM describing it. */
export function describeHealth(hp: { current?: number; max?: number } | undefined): MonsterHealth | undefined {
    if (!hp || !(num(hp.max) > 0)) return undefined;
    const current = num(hp.current);
    if (current <= 0) return 'down';
    if (current <= num(hp.max) / 2) return 'bloodied';
    return current < num(hp.max) ? 'hurt' : 'healthy';
}

/**
 * The active encounter as players see it: turn order and round, no hidden
 * combatants, no monster stats. Combatants are stored in turn order and
 * `turn` indexes into that list (see frontend/lib/initiative.ts).
 */
export function playerEncounterView(encounter: { id: string; name: string; data: unknown }) {
    const data = (encounter.data && typeof encounter.data === 'object' ? encounter.data : {}) as Json;
    const combatants: Json[] = Array.isArray(data.combatants) ? data.combatants : [];
    const started = num(data.round) > 0;
    const turn = num(data.turn);
    return {
        id: encounter.id,
        name: encounter.name,
        round: num(data.round),
        combatants: combatants
            .map((c, index) => ({ c, index }))
            .filter(({ c }) => !c.hidden)
            .map(({ c, index }) => ({
                id: String(c.id),
                name: String(c.name),
                kind: c.kind === 'pc' ? 'pc' : c.kind === 'npc' ? 'npc' : 'monster',
                characterId: c.kind === 'pc' ? c.characterId : undefined,
                initiative: typeof c.initiative === 'number' ? c.initiative : null,
                isCurrent: started && index === turn,
                health: c.kind === 'pc' ? undefined : (c.defeated ? 'down' : describeHealth(c.hp)),
            })),
    };
}
