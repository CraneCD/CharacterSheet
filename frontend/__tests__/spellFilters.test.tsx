import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import { EMPTY_SPELL_FILTERS, hasActiveSpellFilters, isConcentration, schoolsOf, SpellFilters, spellMatches } from '@/lib/spellFilters';
import SpellFilterBar from '@/app/character/[id]/components/SpellFilterBar';
import SlotPips from '@/app/character/[id]/components/SlotPips';

const bless = { name: 'Bless', level: 1, school: 'Enchantment', prepared: true };
const blessDetails = { duration: 'Concentration, up to 1 minute', description: 'You bless up to three creatures.', castingTime: 'Action', range: '30 feet', components: 'V, S, M' };
const detect = { name: 'Detect Magic', level: 1, school: 'Divination', prepared: false };
const detectDetails = { duration: 'Concentration, up to 10 minutes', ritual: true, description: 'You sense magic.' };
const light = { name: 'Light', level: 0, school: 'Evocation', prepared: true };

const f = (patch: Partial<SpellFilters>): SpellFilters => ({ ...EMPTY_SPELL_FILTERS, ...patch });

describe('spellMatches', () => {
    it('matches everything with no filters', () => {
        expect(hasActiveSpellFilters(EMPTY_SPELL_FILTERS)).toBe(false);
        expect(spellMatches(bless, blessDetails, EMPTY_SPELL_FILTERS)).toBe(true);
    });

    it('filters by level, school and prepared', () => {
        expect(spellMatches(light, undefined, f({ level: 0 }))).toBe(true);
        expect(spellMatches(bless, blessDetails, f({ level: 0 }))).toBe(false);
        expect(spellMatches(detect, detectDetails, f({ school: 'divination' }))).toBe(true);
        expect(spellMatches(bless, blessDetails, f({ school: 'Divination' }))).toBe(false);
        expect(spellMatches(detect, detectDetails, f({ preparedOnly: true }))).toBe(false);
    });

    it('filters by concentration and ritual from the reference spell', () => {
        expect(isConcentration(blessDetails)).toBe(true);
        expect(spellMatches(light, undefined, f({ concentration: true }))).toBe(false);
        expect(spellMatches(bless, blessDetails, f({ ritual: true }))).toBe(false);
        expect(spellMatches(detect, detectDetails, f({ ritual: true, concentration: true }))).toBe(true);
    });

    it('searches names and spell text', () => {
        expect(spellMatches(bless, blessDetails, f({ query: 'three creatures' }))).toBe(true);
        expect(spellMatches(bless, blessDetails, f({ query: '30 feet' }))).toBe(true);
        expect(spellMatches(light, undefined, f({ query: 'LIG' }))).toBe(true);
        expect(spellMatches(light, undefined, f({ query: 'fire' }))).toBe(false);
    });

    it('lists schools once, sorted', () => {
        expect(schoolsOf([bless, detect, light, { school: 'Divination' }, {}])).toEqual(['Divination', 'Enchantment', 'Evocation']);
    });
});

describe('SpellFilterBar', () => {
    function Harness() {
        const [filters, setFilters] = useState(EMPTY_SPELL_FILTERS);
        return (
            <>
                <SpellFilterBar filters={filters} onChange={setFilters} levels={[0, 1]} schools={['Divination']} shown={1} total={3} />
                <output data-testid="filters">{JSON.stringify(filters)}</output>
            </>
        );
    }

    it('updates filters from labelled controls and clears them', () => {
        render(<Harness />);
        expect(screen.getByRole('search', { name: 'Filter spells' })).toHaveTextContent('3 spells');
        fireEvent.change(screen.getByLabelText('Spell level'), { target: { value: '0' } });
        fireEvent.change(screen.getByLabelText('School'), { target: { value: 'Divination' } });
        fireEvent.click(screen.getByRole('button', { name: 'Ritual' }));
        fireEvent.change(screen.getByLabelText('Search spells'), { target: { value: 'light' } });

        expect(screen.getByRole('button', { name: 'Ritual' })).toHaveAttribute('aria-pressed', 'true');
        expect(JSON.parse(screen.getByTestId('filters').textContent!)).toMatchObject({ level: 0, school: 'Divination', ritual: true, query: 'light' });
        expect(screen.getByText('1 of 3 spells')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
        expect(JSON.parse(screen.getByTestId('filters').textContent!)).toEqual(EMPTY_SPELL_FILTERS);
    });

    it('can hide the Prepared toggle', () => {
        render(<SpellFilterBar filters={EMPTY_SPELL_FILTERS} onChange={() => {}} levels={[]} schools={[]} showPrepared={false} shown={0} total={0} />);
        expect(screen.queryByRole('button', { name: 'Prepared' })).not.toBeInTheDocument();
    });
});

describe('SlotPips', () => {
    it('uses slots up to a pip and frees the last used one', () => {
        const onChange = jest.fn();
        render(<SlotPips label="Level 1 spell slots" total={4} used={2} onChange={onChange} />);
        expect(screen.getByRole('group', { name: 'Level 1 spell slots: 2 of 4 left' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Slot 2, used' })).toHaveAttribute('aria-pressed', 'true');

        fireEvent.click(screen.getByRole('button', { name: 'Slot 4' }));
        expect(onChange).toHaveBeenLastCalledWith(4);
        fireEvent.click(screen.getByRole('button', { name: 'Slot 2, used' }));
        expect(onChange).toHaveBeenLastCalledWith(1);
        fireEvent.click(screen.getByRole('button', { name: 'Slot 1, used' }));
        expect(onChange).toHaveBeenLastCalledWith(1);
    });
});
