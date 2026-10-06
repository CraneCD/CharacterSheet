import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { parseInline, parseMarkdown, stripMarkdown } from '@/lib/markdown';
import { Markdown } from '@/app/components/ui';

expect.extend(toHaveNoViolations);

const JAVELIN = 'Weapon (Javelin)\nEach time you make an attack roll with this magic weapon and hit, you can have it deal Lightning damage instead of Piercing damage.\n**Lightning Bolt.** When you throw this weapon at a target no farther than 120 feet from you, you can forgo making a ranged attack roll.';

describe('parseInline', () => {
    it('reads bold, italic, code and links', () => {
        expect(parseInline('**Lightning Bolt.** When')).toEqual([
            { type: 'strong', children: [{ type: 'text', text: 'Lightning Bolt.' }] },
            { type: 'text', text: ' When' },
        ]);
        expect(parseInline('a *b* _c_ __d__ ***e*** `f`')).toEqual([
            { type: 'text', text: 'a ' },
            { type: 'em', children: [{ type: 'text', text: 'b' }] },
            { type: 'text', text: ' ' },
            { type: 'em', children: [{ type: 'text', text: 'c' }] },
            { type: 'text', text: ' ' },
            { type: 'strong', children: [{ type: 'text', text: 'd' }] },
            { type: 'text', text: ' ' },
            { type: 'strong', children: [{ type: 'em', children: [{ type: 'text', text: 'e' }] }] },
            { type: 'text', text: ' ' },
            { type: 'code', text: 'f' },
        ]);
        expect(parseInline('**Bold with *italic* inside**')).toEqual([{ type: 'strong', children: [
            { type: 'text', text: 'Bold with ' }, { type: 'em', children: [{ type: 'text', text: 'italic' }] }, { type: 'text', text: ' inside' },
        ] }]);
        expect(parseInline('[SRD](https://example.com/srd)')).toEqual([{ type: 'link', href: 'https://example.com/srd', children: [{ type: 'text', text: 'SRD' }] }]);
    });

    it('leaves maths, snake_case and unsafe links as text', () => {
        expect(parseInline('2 * 3 * 4')).toEqual([{ type: 'text', text: '2 * 3 * 4' }]);
        expect(parseInline('snake_case_name')).toEqual([{ type: 'text', text: 'snake_case_name' }]);
        expect(parseInline('[x](javascript:alert(1))')).toEqual([{ type: 'text', text: '[x](javascript:alert(1))' }]);
    });
});

describe('parseMarkdown', () => {
    it('makes each line a paragraph, and reads headings, lists and tables', () => {
        const blocks = parseMarkdown('# Charges\nIt has 3.\n\n- One\n- *Two*\n1. First\n2. Second\n| Spell | Cost |\n| --- | --- |\n| Shield | 1 |\n| Web | 2 |');
        expect(blocks.map((b) => b.type)).toEqual(['heading', 'paragraph', 'list', 'list', 'table']);
        expect(blocks[2]).toMatchObject({ ordered: false, items: [[{ text: 'One' }], [{ type: 'em' }]] });
        expect(blocks[3]).toMatchObject({ ordered: true });
        expect(blocks[4]).toMatchObject({ header: [[{ text: 'Spell' }], [{ text: 'Cost' }]], rows: [[[{ text: 'Shield' }], [{ text: '1' }]], [[{ text: 'Web' }], [{ text: '2' }]]] });
    });

    it('strips the marks for one-line previews', () => {
        expect(stripMarkdown('**Lightning Bolt.** When you *throw* it\n- a\n- b')).toBe('Lightning Bolt. When you throw it a; b');
    });
});

describe('<Markdown>', () => {
    it('shows bold labels and paragraphs instead of asterisks', async () => {
        const { container } = render(<main><Markdown text={JAVELIN} /></main>);
        expect(screen.getByText('Lightning Bolt.').tagName).toBe('STRONG');
        expect(container.querySelectorAll('p')).toHaveLength(3);
        expect(container.textContent).not.toContain('**');
        expect(await axe(container)).toHaveNoViolations();
    });

    it('renders HTML in the text as text', () => {
        const { container } = render(<Markdown text={'<img src=x onerror="alert(1)"> **hi**'} />);
        expect(container.querySelector('img')).toBeNull();
        expect(container.textContent).toContain('<img src=x onerror="alert(1)">');
    });

    it('renders tables with header cells and safe links', () => {
        render(<Markdown text={'| Face | Spell |\n|---|---|\n| 1 | Shield |\nSee [the SRD](https://example.com).'} />);
        expect(screen.getByRole('columnheader', { name: 'Spell' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Shield' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'the SRD' })).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
