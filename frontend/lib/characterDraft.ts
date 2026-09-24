/**
 * Unfinished character creation, saved in this browser so the wizard can be left and resumed.
 * Kept per signed-in user; every storage access is wrapped because storage can be
 * unavailable (private windows, blocked site data).
 */

const KEY_PREFIX = 'characterDraft:v1:';

export interface CharacterDraft {
    /** Wizard step to reopen (1-based). */
    step: number;
    /** Furthest step reached, so earlier steps stay clickable. */
    maxStepReached: number;
    formData: Record<string, any>;
    /** Full reference objects the wizard picked (species, class, subclass, background, fighting style). */
    selections: {
        race?: any;
        classInfo?: any;
        subclass?: any;
        background?: any;
        fightingStyle?: string | null;
    };
    savedAt: string;
}

function storageKey(): string {
    let userId = 'anonymous';
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user?.id) userId = String(user.id);
    } catch {
        // Unreadable user record: fall back to the anonymous slot
    }
    return KEY_PREFIX + userId;
}

function isDraft(value: any): value is CharacterDraft {
    return !!value
        && typeof value === 'object'
        && typeof value.step === 'number'
        && typeof value.formData === 'object' && value.formData !== null
        && typeof value.savedAt === 'string';
}

export function loadDraft(): CharacterDraft | null {
    try {
        const parsed = JSON.parse(localStorage.getItem(storageKey()) || 'null');
        if (!isDraft(parsed)) return null;
        return {
            ...parsed,
            step: Math.min(6, Math.max(1, Math.floor(parsed.step))),
            maxStepReached: Math.min(6, Math.max(1, Math.floor(parsed.maxStepReached || parsed.step))),
            selections: parsed.selections || {},
        };
    } catch {
        return null;
    }
}

export function saveDraft(draft: Omit<CharacterDraft, 'savedAt'>): void {
    try {
        localStorage.setItem(storageKey(), JSON.stringify({ ...draft, savedAt: new Date().toISOString() }));
    } catch {
        // Storage full or blocked: the wizard still works, it just can't be resumed later
    }
}

export function clearDraft(): void {
    try {
        localStorage.removeItem(storageKey());
    } catch {
        // Nothing to clear
    }
}

/** Whether the user has chosen anything worth keeping. */
export function hasDraftProgress(formData: Record<string, any> | undefined): boolean {
    return !!formData && !!(formData.raceId || formData.classId || formData.name || formData.backgroundId);
}

/** "Mira, Elf Wizard" / "Elf Wizard" / "Unnamed character" for the dashboard card. */
export function describeDraft(draft: CharacterDraft): string {
    const species = draft.selections.race?.name;
    const cls = draft.selections.classInfo?.name;
    const what = [species, cls].filter(Boolean).join(' ');
    const name = (draft.formData.name || '').trim();
    if (name && what) return `${name}, ${what}`;
    return name || what || 'Unnamed character';
}
