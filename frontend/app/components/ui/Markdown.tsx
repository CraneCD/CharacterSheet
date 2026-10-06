import { Fragment, useMemo } from 'react';
import { MdBlock, MdInline, parseMarkdown } from '@/lib/markdown';

function Inline({ nodes }: { nodes: MdInline[] }) {
    return (
        <>
            {nodes.map((n, i) => {
                switch (n.type) {
                    case 'text': return <Fragment key={i}>{n.text}</Fragment>;
                    case 'code': return <code key={i}>{n.text}</code>;
                    case 'strong': return <strong key={i}><Inline nodes={n.children} /></strong>;
                    case 'em': return <em key={i}><Inline nodes={n.children} /></em>;
                    case 'link': return <a key={i} href={n.href} target="_blank" rel="noopener noreferrer"><Inline nodes={n.children} /></a>;
                }
            })}
        </>
    );
}

function Block({ block }: { block: MdBlock }) {
    switch (block.type) {
        case 'paragraph':
            return <p><Inline nodes={block.children} /></p>;
        case 'heading':
            // Styled as a heading but not an <h*>: descriptions sit inside cards with their own outline
            return <p className={`md-heading md-heading-${Math.min(block.level, 3)}`}><Inline nodes={block.children} /></p>;
        case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return <List>{block.items.map((item, i) => <li key={i}><Inline nodes={item} /></li>)}</List>;
        }
        case 'table':
            return (
                <div className="md-table-wrap">
                    <table>
                        <thead><tr>{block.header.map((c, i) => <th key={i} scope="col"><Inline nodes={c} /></th>)}</tr></thead>
                        <tbody>
                            {block.rows.map((row, r) => (
                                <tr key={r}>{row.map((c, i) => <td key={i}><Inline nodes={c} /></td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
    }
}

/** Item, action and spell text with **bold**, *italic*, lists, tables and links (lib/markdown). */
export default function Markdown({ text, className }: { text: string; className?: string }) {
    const blocks = useMemo(() => parseMarkdown(text), [text]);
    return (
        <div className={className ? `markdown ${className}` : 'markdown'}>
            {blocks.map((b, i) => <Block key={i} block={b} />)}
        </div>
    );
}
