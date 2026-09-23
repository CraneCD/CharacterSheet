import { calculateClassResources } from './classResources';

/** classId -> subclassId for every class the character has chosen a subclass for. */
export type SubclassMap = Record<string, string>;

type SubclassRef = { id: string; classId: string };

/**
 * The character's subclass for each class. Characters saved before subclasses
 * were tracked per class only have `data.subclassId`; it is assigned to the
 * class that subclass belongs to, or to `fallbackClassId` when the subclass
 * isn't in the reference list.
 */
export function getSubclassMap(data: any, allSubclasses: SubclassRef[], fallbackClassId?: string): SubclassMap {
    const map: SubclassMap = {};
    const stored = data?.subclasses;
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
        for (const [classId, subclassId] of Object.entries(stored)) {
            if (typeof subclassId === 'string' && subclassId) map[classId.toLowerCase()] = subclassId;
        }
    }
    const legacy = data?.subclassId;
    if (typeof legacy === 'string' && legacy && !Object.values(map).includes(legacy)) {
        const owner = (allSubclasses.find(s => s.id === legacy)?.classId || fallbackClassId || '').toLowerCase();
        if (owner && !map[owner]) map[owner] = legacy;
    }
    return map;
}

/**
 * Store the subclass map on the character. `data.subclassId` is kept as a
 * single-subclass mirror for older clients: it keeps its current value while
 * that subclass is still chosen, otherwise it follows the primary class.
 */
export function setSubclassMap(data: any, map: SubclassMap, primaryClassId: string): void {
    data.subclasses = map;
    const values = Object.values(map);
    if (!(data.subclassId && values.includes(data.subclassId))) {
        const mirror = map[primaryClassId] ?? values[0];
        if (mirror) data.subclassId = mirror;
        else delete data.subclassId;
    }
}

/**
 * Class resources for every class, each at its own class level with its own
 * subclass. When two classes grant a resource with the same name (e.g.
 * Channel Divinity), the larger pool is kept.
 */
export function calculateAllClassResources(
    classLevels: Record<string, number>,
    subclassMap: SubclassMap,
    abilityScores?: { [key: string]: number }
) {
    const out: ReturnType<typeof calculateClassResources> = {};
    for (const [classId, classLevel] of Object.entries(classLevels)) {
        if (!classLevel) continue;
        const resources = calculateClassResources(classId, classLevel, abilityScores, subclassMap[classId]);
        for (const [name, res] of Object.entries(resources)) {
            if (!out[name] || res.max > out[name].max) out[name] = res;
        }
    }
    return out;
}
