/** Export a character as a JSON file, and parse/validate one for import (preview before saving). */

export interface ImportPayload {
    name: string;
    race: string;
    class: string;
    level: number;
    data: Record<string, any>;
}

export type ImportResult =
    | { ok: true; payload: ImportPayload; warnings: string[] }
    | { ok: false; error: string };

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

/** Accepts a file from Export JSON (a character object, or an array whose first item is one). */
export function parseCharacterImport(text: string): ImportResult {
    let parsed: any;
    try {
        parsed = JSON.parse(text);
    } catch {
        return { ok: false, error: "This file isn't valid JSON. Choose a file saved with Export JSON." };
    }

    const source = Array.isArray(parsed) ? parsed[0] : parsed;
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
        return { ok: false, error: "This file doesn't contain a character." };
    }

    const name = typeof source.name === 'string' ? source.name.trim() : '';
    const race = source.race || source.raceId;
    const charClass = source.class || source.classId;
    const missing = [!name && 'name', !race && 'species', !charClass && 'class'].filter(Boolean);
    if (missing.length > 0) {
        return { ok: false, error: `This character is missing its ${missing.join(', ')}.` };
    }

    const warnings: string[] = [];
    const data = source.data && typeof source.data === 'object' && !Array.isArray(source.data) ? source.data : {};
    if (data !== source.data) warnings.push('No sheet data was found, so the character will start with an empty sheet.');

    let level = typeof source.level === 'number' ? Math.floor(source.level) : 1;
    if (level < 1 || level > 20) {
        warnings.push(`Level ${source.level} is out of range, so level 1 will be used.`);
        level = 1;
    }
    if (data === source.data) {
        if (!data.hp) warnings.push('No hit points recorded.');
        const scores = data.abilityScores;
        if (!scores || !ABILITIES.every((a) => typeof scores[a] === 'number')) warnings.push('Ability scores are incomplete.');
    }
    if (Array.isArray(parsed) && parsed.length > 1) {
        warnings.push(`The file has ${parsed.length} characters; only the first will be imported.`);
    }

    return { ok: true, payload: { name, race: String(race), class: String(charClass), level, data }, warnings };
}

/** File name for an exported character, e.g. "brienne_tarth.json". */
export function exportFileName(name: string | undefined): string {
    const base = (name || 'character').trim().replace(/\s+/g, '_').replace(/[^\w.-]/g, '').toLowerCase();
    return `${base || 'character'}.json`;
}

/** Download a character as JSON (the format parseCharacterImport accepts). */
export function downloadCharacterJson(character: { name?: string }): void {
    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFileName(character.name);
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** "half-elf" → "Half-Elf", "fighter" → "Fighter" (stored ids shown as names). */
export function displayName(id: string | undefined): string {
    return (id || '').replace(/(^|[\s_-])([a-z])/g, (_, sep, ch) => `${sep === '_' ? ' ' : sep}${ch.toUpperCase()}`);
}
