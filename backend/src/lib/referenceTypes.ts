// The reference-data categories admins can edit and characters draw from.
export const REFERENCE_TYPES = [
    'spell',
    'race',
    'class',
    'background',
    'subclass',
    'classFeature',
    'feat',
    'baseItem',
    'trait',
    'fightingStyle',
    'monster',
] as const;

export type ReferenceType = typeof REFERENCE_TYPES[number];

export function isReferenceType(value: string): value is ReferenceType {
    return (REFERENCE_TYPES as readonly string[]).includes(value);
}

/**
 * Most resources carry their business id as a `data.id` field that should
 * always match the row's `key` (the key is canonical; `data.id` is only
 * there because these shapes originated as static arrays). classFeature rows
 * store a class's whole feature array (no top-level id) and trait rows use
 * `data.name` instead of an id, so both are left untouched.
 */
export function withCanonicalId(type: ReferenceType, key: string, data: any): any {
    if (type === 'classFeature' || type === 'trait') return data;
    return { ...data, id: key };
}
