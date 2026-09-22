import { prisma } from './prisma';

// Reference data (spells, items, feats, ...) is now DB-backed and admin-editable,
// but still read on nearly every page load. Cache each type's full row set for a
// short window, and let admin writes invalidate it immediately so edits show up
// on the next request rather than waiting out the TTL.
const TTL_MS = 60_000;

type Row = { key: string; data: any };

const cache = new Map<string, { rows: Row[]; expiresAt: number }>();

export async function getReferenceRows(type: string): Promise<Row[]> {
    const cached = cache.get(type);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.rows;
    }
    const items = await prisma.referenceItem.findMany({ where: { type } });
    const rows = items.map((i) => ({ key: i.key, data: i.data as any }));
    cache.set(type, { rows, expiresAt: Date.now() + TTL_MS });
    return rows;
}

export function invalidateReferenceCache(type: string): void {
    cache.delete(type);
}
