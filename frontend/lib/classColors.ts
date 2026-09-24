import type { CSSProperties } from 'react';

/** Classes with their own hue in globals.css (--class-<id>). */
export const CLASS_COLOR_IDS = [
    'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk',
    'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard',
] as const;

/** CSS color for a class id (or display name); unknown and homebrew classes use the gold accent. */
export function classColorVar(classId: string | null | undefined): string {
    const id = (classId || '').toLowerCase().replace(/[^a-z]/g, '');
    return (CLASS_COLOR_IDS as readonly string[]).includes(id) ? `var(--class-${id})` : 'var(--primary)';
}

/** Style that sets --class-color for everything inside (portrait ring, class badge, best ability). */
export function classColorStyle(classId: string | null | undefined): CSSProperties {
    return { '--class-color': classColorVar(classId) } as CSSProperties;
}
