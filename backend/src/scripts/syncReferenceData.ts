// Push the reference data in src/data (spells, species, classes, ...) into an
// existing database. prisma/seed.ts only inserts rows that don't exist yet, so
// rules updates to src/data never reach a database that was already seeded;
// this script closes that gap.
//
// Admin edits win: a row whose updatedAt is later than its createdAt was
// edited through the admin panel and is left alone (and reported) unless you
// pass --force or name it in --force-keys. Rows written by this script get
// createdAt = updatedAt so later syncs still recognise them as unedited.
// Rows that exist in the database but not in src/data are reported, never
// deleted.
//
// Usage:
//   npm run sync-reference                       # dry run: report what would change
//   npm run sync-reference -- --apply            # write the changes
//   npm run sync-reference -- --apply --force-keys spell:fire-bolt,feat:alert
//   npm run sync-reference -- --emit-sql out.sql # SQL for a database you can only reach via a SQL console
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { buildReferenceRows, ReferenceRow } from '../lib/referenceSeed';

const EDIT_GRACE_MS = 1000;

type Existing = { id: string; type: string; key: string; data: unknown; createdAt: Date; updatedAt: Date };

/** JSON with sorted object keys, so key order doesn't count as a change. */
export function stableStringify(value: unknown): string {
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>;
        return '{' + Object.keys(obj).filter(k => obj[k] !== undefined).sort()
            .map(k => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}';
    }
    return JSON.stringify(value);
}

export function isAdminEdited(row: { createdAt: Date; updatedAt: Date }): boolean {
    return row.updatedAt.getTime() - row.createdAt.getTime() > EDIT_GRACE_MS;
}

export interface SyncPlan {
    insert: ReferenceRow[];
    update: ReferenceRow[];
    unchanged: number;
    skippedEdited: { type: string; key: string }[];
    orphaned: { type: string; key: string }[];
}

export function planSync(rows: ReferenceRow[], existing: Existing[], opts: { force?: boolean; forceKeys?: Set<string> } = {}): SyncPlan {
    const byKey = new Map(existing.map(e => [`${e.type}:${e.key}`, e]));
    const plan: SyncPlan = { insert: [], update: [], unchanged: 0, skippedEdited: [], orphaned: [] };
    const seen = new Set<string>();
    for (const row of rows) {
        const id = `${row.type}:${row.key}`;
        seen.add(id);
        const cur = byKey.get(id);
        if (!cur) {
            plan.insert.push(row);
            continue;
        }
        // Compare as JSON: the static data can hold `undefined` fields the database never stores.
        if (stableStringify(JSON.parse(JSON.stringify(row.data))) === stableStringify(cur.data)) {
            plan.unchanged++;
            continue;
        }
        if (isAdminEdited(cur) && !opts.force && !opts.forceKeys?.has(id)) {
            plan.skippedEdited.push({ type: row.type, key: row.key });
            continue;
        }
        plan.update.push(row);
    }
    for (const e of existing) {
        if (!seen.has(`${e.type}:${e.key}`)) plan.orphaned.push({ type: e.type, key: e.key });
    }
    return plan;
}

function sqlLiteral(value: string): string {
    return "'" + value.replace(/'/g, "''") + "'";
}

/**
 * SQL equivalent of --apply for the given rows. The upsert only overwrites a
 * row that hasn't been edited since it was last seeded/synced.
 */
export function buildSql(rows: ReferenceRow[], batchSize = 50): string[] {
    const statements: string[] = [];
    for (let i = 0; i < rows.length; i += batchSize) {
        const values = rows.slice(i, i + batchSize).map(r =>
            `(gen_random_uuid()::text, ${sqlLiteral(r.type)}, ${sqlLiteral(r.key)}, ${sqlLiteral(JSON.stringify(r.data))}::jsonb, now(), now())`
        ).join(',\n');
        statements.push(
            `INSERT INTO "ReferenceItem" ("id", "type", "key", "data", "createdAt", "updatedAt") VALUES\n${values}\n` +
            `ON CONFLICT ("type", "key") DO UPDATE SET "data" = EXCLUDED."data", "createdAt" = now(), "updatedAt" = now()\n` +
            `WHERE "ReferenceItem"."updatedAt" <= "ReferenceItem"."createdAt" + interval '${EDIT_GRACE_MS} milliseconds'\n` +
            `  AND "ReferenceItem"."data" IS DISTINCT FROM EXCLUDED."data";`
        );
    }
    return statements;
}

function summarize(plan: SyncPlan) {
    const count = (rows: { type: string }[]) => rows.reduce<Record<string, number>>((acc, r) => { acc[r.type] = (acc[r.type] || 0) + 1; return acc; }, {});
    console.log('Insert:', count(plan.insert));
    console.log('Update:', count(plan.update));
    console.log('Unchanged:', plan.unchanged);
    if (plan.skippedEdited.length) {
        console.log(`Skipped (edited by an admin; use --force-keys to overwrite): ${plan.skippedEdited.map(r => `${r.type}:${r.key}`).join(', ')}`);
    }
    if (plan.orphaned.length) {
        console.log(`In the database but not in src/data (left untouched): ${plan.orphaned.map(r => `${r.type}:${r.key}`).join(', ')}`);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const apply = args.includes('--apply');
    const force = args.includes('--force');
    const forceKeysArg = args.find((a, i) => args[i - 1] === '--force-keys');
    const forceKeys = new Set((forceKeysArg || '').split(',').map(s => s.trim()).filter(Boolean));
    const sqlOut = args.find((a, i) => args[i - 1] === '--emit-sql');

    const rows = buildReferenceRows();

    if (sqlOut) {
        // No database access needed: emit an idempotent upsert of every row.
        const statements = buildSql(rows);
        fs.writeFileSync(sqlOut, statements.join('\n\n') + '\n');
        console.log(`Wrote ${statements.length} statements for ${rows.length} rows to ${sqlOut}`);
        return;
    }

    const prisma = new PrismaClient();
    try {
        const existing = await prisma.referenceItem.findMany();
        const plan = planSync(rows, existing, { force, forceKeys });
        summarize(plan);
        if (!apply) {
            console.log('\nDry run only. Re-run with --apply to write these changes.');
            return;
        }
        const now = new Date();
        for (let i = 0; i < plan.insert.length; i += 200) {
            await prisma.referenceItem.createMany({
                data: plan.insert.slice(i, i + 200).map(r => ({ type: r.type, key: r.key, data: r.data, createdAt: now, updatedAt: now })),
                skipDuplicates: true,
            });
        }
        for (let i = 0; i < plan.update.length; i += 100) {
            await prisma.$transaction(plan.update.slice(i, i + 100).map(r => prisma.referenceItem.update({
                where: { type_key: { type: r.type, key: r.key } },
                data: { data: r.data, createdAt: now, updatedAt: now },
            })));
        }
        console.log(`\nApplied: ${plan.insert.length} inserted, ${plan.update.length} updated.`);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
