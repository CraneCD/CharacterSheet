import { ClassResources } from './types';
import { calculateClassResources } from './classResources';

/** classId -> subclassId for every class the character has chosen a subclass for. */
export type SubclassMap = Record<string, string>;

type SubclassRef = { id: string; classId: string };

/**
 * The character's subclass for each class. Characters saved before subclasses
 * were tracked per class only have `data.subclassId`; it is assigned to the
 * class that subclass belongs to (looked up in `allSubclasses`), or to
 * `fallbackClassId` when the subclass isn't in the reference list.
 */
export function getSubclassMap(
    data: { subclasses?: unknown; subclassId?: string } | null | undefined,
    allSubclasses: SubclassRef[] = [],
    fallbackClassId?: string
): SubclassMap {
    const map: SubclassMap = {};
    const stored = data?.subclasses;
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
        for (const [classId, subclassId] of Object.entries(stored as Record<string, unknown>)) {
            if (typeof subclassId === 'string' && subclassId) map[classId.toLowerCase()] = subclassId;
        }
    }
    const legacy = data?.subclassId;
    if (legacy && !Object.values(map).includes(legacy)) {
        const owner = (allSubclasses.find(s => s.id === legacy)?.classId || fallbackClassId || '').toLowerCase();
        if (owner && !map[owner]) map[owner] = legacy;
    }
    return map;
}

/**
 * Class levels for the character (`data.classes`), falling back to a single
 * class at the character's level for characters that predate multiclassing.
 */
export function getClassLevels(
    data: { classes?: unknown } | null | undefined,
    primaryClassId: string,
    level: number
): Record<string, number> {
    const classes = data?.classes;
    if (classes && typeof classes === 'object' && !Array.isArray(classes) && Object.keys(classes).length > 0) {
        const out: Record<string, number> = {};
        for (const [classId, lvl] of Object.entries(classes as Record<string, unknown>)) {
            out[classId.toLowerCase()] = Number(lvl) || 0;
        }
        return out;
    }
    return { [primaryClassId.toLowerCase()]: level };
}

/**
 * Subclass records for each class that has one, with the level of the class
 * they belong to (subclass features and spells key off that class level).
 */
export function getCharacterSubclasses<T extends SubclassRef>(
    subclassMap: SubclassMap,
    classLevels: Record<string, number>,
    allSubclasses: T[]
): { classId: string; classLevel: number; subclass: T }[] {
    return Object.entries(subclassMap)
        .map(([classId, subclassId]) => ({
            classId,
            classLevel: classLevels[classId] ?? 0,
            subclass: allSubclasses.find(s => s.id === subclassId),
        }))
        .filter((x): x is { classId: string; classLevel: number; subclass: T } => !!x.subclass && x.classLevel > 0);
}

/**
 * Class resources for every class the character has, each at its own class
 * level with its own subclass. When two classes grant a resource with the same
 * name (e.g. Channel Divinity), the larger pool is kept.
 */
export function calculateAllClassResources(
    classLevels: Record<string, number>,
    subclassMap: SubclassMap,
    abilityScores?: { [key: string]: number }
): ClassResources {
    const out: ClassResources = {};
    for (const [classId, classLevel] of Object.entries(classLevels)) {
        if (!classLevel) continue;
        const resources = calculateClassResources(classId, classLevel, abilityScores, subclassMap[classId]);
        for (const [name, res] of Object.entries(resources)) {
            if (!out[name] || res.max > out[name].max) out[name] = res;
        }
    }
    return out;
}

/**
 * Recalculate class resources after a level-up, keeping current values where
 * still valid (a larger pool gains the difference) and leaving resources that
 * don't come from classes (Heroic Inspiration, racial uses, custom) untouched.
 */
export function updateAllClassResources(
    classLevels: Record<string, number>,
    subclassMap: SubclassMap,
    existing: ClassResources | undefined,
    abilityScores?: { [key: string]: number }
): ClassResources {
    const computed = calculateAllClassResources(classLevels, subclassMap, abilityScores);
    const out: ClassResources = { ...(existing || {}) };
    for (const [name, res] of Object.entries(computed)) {
        const prev = existing?.[name];
        out[name] = prev
            ? { ...res, current: Math.max(0, Math.min(res.max, (prev.current ?? 0) + Math.max(0, res.max - (prev.max ?? 0)))) }
            : res;
    }
    return out;
}
