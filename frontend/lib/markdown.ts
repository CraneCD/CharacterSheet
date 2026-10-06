/**
 * A small Markdown reader for item, action and spell text: **bold**, *italic*, `code`,
 * [links](https://...), # headings, - / 1. lists and | pipe | tables. Each line is its own
 * paragraph (reference text uses one line per paragraph). The result is a tree that
 * components/ui/Markdown renders as React elements, never as HTML, so text can't inject markup.
 */

export type MdInline =
    | { type: 'text'; text: string }
    | { type: 'strong' | 'em'; children: MdInline[] }
    | { type: 'code'; text: string }
    | { type: 'link'; href: string; children: MdInline[] };

export type MdBlock =
    | { type: 'paragraph'; children: MdInline[] }
    | { type: 'heading'; level: number; children: MdInline[] }
    | { type: 'list'; ordered: boolean; items: MdInline[][] }
    | { type: 'table'; header: MdInline[][]; rows: MdInline[][][] };

// Earliest match wins; the alternatives are tried in this order at the same position
const INLINE = new RegExp([
    /`([^`\n]+)`/.source,                                        // 1 code
    /\*\*\*(?=\S)([^*\n]+?)\*\*\*/.source,                        // 2 bold italic
    /\*\*(?=\S)(.+?)\*\*/.source,                                 // 3 bold
    /(?<![\w])__(?=\S)(.+?)__(?![\w])/.source,                    // 4 bold
    /\*(?=[^\s*])([^*\n]*?[^\s*]|[^\s*])\*/.source,               // 5 italic
    /(?<![\w])_(?=[^\s_])([^_\n]*?[^\s_]|[^\s_])_(?![\w])/.source, // 6 italic
    /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/.source,               // 7, 8 link
].map((s) => `(?:${s})`).join('|'));

export function parseInline(text: string): MdInline[] {
    const out: MdInline[] = [];
    let rest = String(text ?? '');
    while (rest) {
        const m = INLINE.exec(rest);
        if (!m) {
            out.push({ type: 'text', text: rest });
            break;
        }
        if (m.index > 0) out.push({ type: 'text', text: rest.slice(0, m.index) });
        if (m[1] !== undefined) out.push({ type: 'code', text: m[1] });
        else if (m[2] !== undefined) out.push({ type: 'strong', children: [{ type: 'em', children: parseInline(m[2]) }] });
        else if (m[3] !== undefined || m[4] !== undefined) out.push({ type: 'strong', children: parseInline((m[3] ?? m[4])!) });
        else if (m[5] !== undefined || m[6] !== undefined) out.push({ type: 'em', children: parseInline((m[5] ?? m[6])!) });
        else out.push({ type: 'link', href: m[8], children: parseInline(m[7]) });
        rest = rest.slice(m.index + m[0].length);
    }
    // Merge neighbouring text runs
    return out.reduce<MdInline[]>((acc, node) => {
        const last = acc[acc.length - 1];
        if (node.type === 'text' && last?.type === 'text') last.text += node.text;
        else acc.push(node);
        return acc;
    }, []);
}

const HEADING = /^(#{1,6})\s+(.*?)\s*#*$/;
const BULLET = /^\s*[-*+•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const TABLE_RULE = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;

const cells = (line: string) =>
    line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => parseInline(c.trim()));

export function parseMarkdown(text: string): MdBlock[] {
    const lines = String(text ?? '').replace(/\r\n?/g, '\n').split('\n');
    const blocks: MdBlock[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const heading = HEADING.exec(line.trim());
        if (heading) {
            blocks.push({ type: 'heading', level: heading[1].length, children: parseInline(heading[2]) });
            continue;
        }

        const listKind = BULLET.test(line) ? BULLET : NUMBERED.test(line) ? NUMBERED : null;
        if (listKind) {
            const items: MdInline[][] = [];
            while (i < lines.length && listKind.test(lines[i])) {
                items.push(parseInline(listKind.exec(lines[i])![1]));
                i++;
            }
            i--;
            blocks.push({ type: 'list', ordered: listKind === NUMBERED, items });
            continue;
        }

        if (line.includes('|') && i + 1 < lines.length && TABLE_RULE.test(lines[i + 1]) && lines[i + 1].includes('-')) {
            const header = cells(line);
            const rows: MdInline[][][] = [];
            i += 2;
            while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
                rows.push(cells(lines[i]));
                i++;
            }
            i--;
            blocks.push({ type: 'table', header, rows });
            continue;
        }

        blocks.push({ type: 'paragraph', children: parseInline(line.trim()) });
    }
    return blocks;
}

const inlineText = (nodes: MdInline[]): string =>
    nodes.map((n) => (n.type === 'text' || n.type === 'code' ? n.text : inlineText(n.children))).join('');

/** The text without Markdown marks, for one-line previews and search. */
export function stripMarkdown(text: string): string {
    return parseMarkdown(text).map((b) => {
        if (b.type === 'list') return b.items.map(inlineText).join('; ');
        if (b.type === 'table') return [b.header, ...b.rows].map((r) => r.map(inlineText).join(' ')).join('; ');
        return inlineText(b.children);
    }).join(' ');
}
