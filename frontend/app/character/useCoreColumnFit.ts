'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Left-column cards that may collapse, in the order they give way: least needed mid-fight first. */
export const CORE_FIT_ORDER = ['notes', 'proficiencies', 'senses', 'conditions'] as const;
export type CoreCardId = (typeof CORE_FIT_ORDER)[number];

type Pinned = Partial<Record<CoreCardId, boolean>>;

const storageKey = (characterId: string) => `sheetCards:v1:${characterId}`;

function loadPinned(characterId: string): Pinned {
    try {
        const raw = localStorage.getItem(storageKey(characterId));
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
}

function savePinned(characterId: string, pinned: Pinned) {
    try {
        localStorage.setItem(storageKey(characterId), JSON.stringify(pinned));
    } catch {
        // Private mode or full storage: the choice just won't survive a reload
    }
}

/** Shows or hides a card's body and summary directly in the DOM (for measuring only). */
function setCardDom(card: HTMLElement, collapsed: boolean) {
    const body = card.querySelector<HTMLElement>(':scope > .core-card-body');
    const summary = card.querySelector<HTMLElement>(':scope > .core-card-summary');
    if (body) body.hidden = collapsed;
    if (summary) summary.hidden = !collapsed;
    card.classList.toggle('is-collapsed', collapsed);
}

/**
 * Collapses the new left-column cards (Notes, Proficiencies, Senses, Conditions, in that order)
 * while the left column would run longer than the middle and right ones; Notes reopens to fill
 * leftover space when its smallest size fits. The player's own open/close choice per card wins
 * and is remembered per character. Only applies while the sheet shows three columns.
 */
export function useCoreColumnFit(characterId: string | undefined) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [pinned, setPinned] = useState<Pinned>({});
    const [auto, setAuto] = useState<CoreCardId[]>([]);
    const pinnedRef = useRef(pinned);
    useEffect(() => {
        pinnedRef.current = pinned;
    });

    useEffect(() => {
        if (characterId) setPinned(loadPinned(characterId));
    }, [characterId]);

    const fit = useCallback(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const columns = Array.from(grid.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el.classList.contains('sheet-column'));
        const style = getComputedStyle(grid);
        const threeColumns = style.display === 'grid' && style.gridTemplateColumns.split(' ').filter(Boolean).length >= 3 && columns.length >= 3;
        if (!threeColumns) {
            setAuto((prev) => (prev.length ? [] : prev));
            return;
        }
        const [left, middle, right] = columns;
        const cards = new Map<CoreCardId, HTMLElement>();
        left.querySelectorAll<HTMLElement>('[data-core-card]').forEach((el) => {
            const id = el.dataset.coreCard as CoreCardId;
            if ((CORE_FIT_ORDER as readonly string[]).includes(id)) cards.set(id, el);
        });

        // Remember what React rendered so the DOM can be put back after measuring
        const rendered = new Map(Array.from(cards).map(([id, el]) => [id, el.classList.contains('is-collapsed')]));
        const current = pinnedRef.current;
        const collapsed = new Set<CoreCardId>(CORE_FIT_ORDER.filter((id) => current[id] === false));
        const apply = () => cards.forEach((el, id) => setCardDom(el, collapsed.has(id)));

        grid.classList.add('is-measuring');
        apply();
        const height = (el: HTMLElement) => el.getBoundingClientRect().height;
        const target = Math.max(height(middle), height(right));
        const fits = () => height(left) <= target + 1;

        const autoCollapsed: CoreCardId[] = [];
        for (const id of CORE_FIT_ORDER) {
            if (fits()) break;
            if (current[id] !== undefined || !cards.has(id)) continue;
            collapsed.add(id);
            autoCollapsed.push(id);
            apply();
        }
        // Notes gave way first, but it stretches: reopen it if its smallest size still fits
        if (autoCollapsed.includes('notes')) {
            collapsed.delete('notes');
            apply();
            if (fits()) autoCollapsed.splice(autoCollapsed.indexOf('notes'), 1);
            else collapsed.add('notes');
        }

        rendered.forEach((wasCollapsed, id) => setCardDom(cards.get(id)!, wasCollapsed));
        grid.classList.remove('is-measuring');
        setAuto((prev) => (prev.length === autoCollapsed.length && prev.every((id) => autoCollapsed.includes(id)) ? prev : autoCollapsed));
    }, []);

    // Re-fit when any column's content changes size, and when the window resizes
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        let frame = 0;
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(fit);
        };
        schedule();
        if (typeof ResizeObserver === 'undefined') return () => cancelAnimationFrame(frame);
        const observer = new ResizeObserver(schedule);
        observer.observe(grid);
        grid.querySelectorAll('.card').forEach((card) => observer.observe(card));
        window.addEventListener('resize', schedule);
        document.fonts?.ready.then(schedule).catch(() => {});
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('resize', schedule);
        };
    });

    const isCollapsed = (id: CoreCardId) => pinned[id] === false || (pinned[id] === undefined && auto.includes(id));
    const isAutoCollapsed = (id: CoreCardId) => pinned[id] === undefined && auto.includes(id);
    const toggle = (id: CoreCardId) => {
        const next = { ...pinned, [id]: isCollapsed(id) };
        setPinned(next);
        if (characterId) savePinned(characterId, next);
    };

    return { gridRef, isCollapsed, isAutoCollapsed, toggle };
}
