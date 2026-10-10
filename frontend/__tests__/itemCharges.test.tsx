import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { detectedCharges, itemCharges, normalizeRegain, rechargeAtDawn, withCharges } from '@/lib/itemCharges';
import { actionItemName, buildActionRows, storedRows } from '@/lib/actionRows';
import { planLongRest } from '@/lib/rest';
import ItemActionDialog, { defaultActionName } from '@/app/character/components/ItemActionDialog';
import { ToastProvider } from '@/app/components/ui';
import type { CharacterItem } from '@/lib/types';

expect.extend(toHaveNoViolations);

const WAND_TEXT = "Wand\nThis wand has 7 charges. While holding it, you can expend no more than 3 charges to cast Magic Missile from it.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20.";
const wand: CharacterItem = { name: 'Wand of Magic Missiles', category: 'magic-item', description: WAND_TEXT };

describe('item charges', () => {
    it('reads charges and what they regain from the item text', () => {
        expect(detectedCharges(wand)).toEqual({ max: 7, regain: '1d6+1' });
        expect(detectedCharges({ description: 'The cube starts with 10 charges, and it regains 1d6 expended charges daily at dawn.' })).toEqual({ max: 10, regain: '1d6' });
        expect(detectedCharges({ description: 'It has 3 charges and regains all of them daily at dawn.' })).toEqual({ max: 3, regain: 'all' });
        expect(detectedCharges({ description: 'It has 3 charges. You regain 2d4 + 2 Hit Points.' })).toEqual({ max: 3, regain: '' });
        expect(detectedCharges({ description: 'A plain stick.' })).toBeNull();
        expect(normalizeRegain(' 1d6 + 1 ')).toBe('1d6+1');
        expect(normalizeRegain('All')).toBe('all');
        expect(normalizeRegain('lots')).toBe('');
    });

    it('starts read-from-text charges full, uses stored ones, and stops when not tracked', () => {
        expect(itemCharges(wand)).toEqual({ current: 7, max: 7, regain: '1d6+1' });
        expect(itemCharges({ ...wand, charges: { current: 2, max: 7, regain: '1d6+1' } })).toEqual({ current: 2, max: 7, regain: '1d6+1' });
        expect(itemCharges({ ...wand, charges: { current: 12, max: 7 } })).toEqual({ current: 7, max: 7, regain: '' });
        expect(itemCharges({ ...wand, charges: null })).toBeNull();
        expect(withCharges({ current: 2, max: 7 }, -3)).toEqual({ current: 0, max: 7 });
    });

    it('recharges at dawn: described in the preview, rolled on the rest', () => {
        const gear = [{ ...wand, charges: { current: 1, max: 7, regain: '1d6+1' } }, { name: 'Ring', charges: { current: 0, max: 3, regain: 'all' } }, 'Rope'];
        const preview = rechargeAtDawn(gear);
        expect(preview.changed).toBe(false);
        expect(preview.summary).toEqual(['Wand of Magic Missiles regains 1d6 + 1 charges (1/7 now)', 'Ring regains all its charges']);

        const rolled = rechargeAtDawn(gear, () => 0.99); // the d6 rolls 6: 1 + 7 = 8, capped at 7
        expect(rolled.changed).toBe(true);
        expect((rolled.equipment[0] as CharacterItem).charges).toEqual({ current: 7, max: 7, regain: '1d6+1' });
        expect((rolled.equipment[1] as CharacterItem).charges).toEqual({ current: 3, max: 3, regain: 'all' });
        expect(rolled.summary).toEqual(['Wand of Magic Missiles regained 6 charges (7/7)', 'Ring regained 3 charges (3/3)']);

        const plan = planLongRest({ hp: { current: 5, max: 5, temp: 0 }, equipment: gear }, { warlockLevel: 0, multiclass: false }, () => 0);
        expect((plan.updates.equipment as CharacterItem[])[0].charges).toEqual({ current: 3, max: 7, regain: '1d6+1' });
        expect(plan.summary).toContain('Wand of Magic Missiles regained 2 charges (3/7)');
        expect(planLongRest({ hp: { current: 5, max: 5, temp: 0 }, equipment: gear }, { warlockLevel: 0, multiclass: false }).updates).not.toHaveProperty('equipment');
    });
});

describe('item actions', () => {
    const gear = [{ ...wand, charges: { current: 4, max: 7, regain: '1d6+1' } }];

    it('show the item and its charges, and are never hidden as spell copies', () => {
        const rows = storedRows([
            { name: 'Magic Missile', type: 'action', description: 'Cast it.', item: 'Wand of Magic Missiles', charges: 2 },
            { name: 'Wand of Magic Missiles (Reaction)', type: 'reaction', description: 'Zap.', item: 'Wand of Magic Missiles' },
            { name: 'Use Wand of Magic Missiles (Bonus)', type: 'bonus', description: 'Old style.' },
        ], [{ id: 'magic-missile', name: 'Magic Missile', castingTime: '1 action', range: '120 feet', duration: 'Instantaneous', components: 'V, S', description: '' }], gear);
        expect(rows.map((r) => [r.name, r.timing, r.source, r.note, r.charges?.cost])).toEqual([
            ['Magic Missile', 'action', 'item', 'Wand of Magic Missiles', 2],
            ['Wand of Magic Missiles (Reaction)', 'reaction', 'item', 'Wand of Magic Missiles', 1],
            ['Wand of Magic Missiles', 'bonus', 'item', undefined, 1],
        ]);
        expect(rows[0].charges).toMatchObject({ index: 0, current: 4, max: 7 });
        expect(actionItemName({ name: 'Use Cloak (Reaction)', type: 'reaction', description: '' })).toBe('Cloak');
        expect(storedRows([{ name: 'Gone', type: 'action', description: '', item: 'Lost Wand' }], [], gear)[0].charges).toBeUndefined();
    });

    it('get default names that are free for each timing', () => {
        expect(defaultActionName('Wand', 'action', [])).toBe('Wand');
        expect(defaultActionName('Wand', 'reaction', ['wand'])).toBe('Wand (Reaction)');
        expect(defaultActionName('Wand', 'bonus', ['Wand', 'Wand (Bonus Action)'])).toBe('Wand (Bonus Action 2)');
    });

    it('are added from a dialog with timing, name, charges and text', async () => {
        const onSave = jest.fn().mockResolvedValue(undefined);
        const onClose = jest.fn();
        const { baseElement } = render(
            <ToastProvider>
                <ItemActionDialog item={{ ...wand, charges: { current: 4, max: 7, regain: '1d6+1' } }} existingNames={['Wand of Magic Missiles']} onSave={onSave} onClose={onClose} />
            </ToastProvider>
        );
        // The plain name is taken, so the default says when
        expect(screen.getByLabelText('Name')).toHaveValue('Wand of Magic Missiles (Action)');
        fireEvent.click(screen.getByLabelText('Reaction'));
        expect(screen.getByLabelText('Name')).toHaveValue('Wand of Magic Missiles (Reaction)');
        expect(await axe(baseElement)).toHaveNoViolations();

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'wand of magic missiles' } });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Add to Actions' })); });
        expect(screen.getByText(/already in your actions/)).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Shield Burst' } });
        fireEvent.change(screen.getByLabelText('Charges per use'), { target: { value: '3' } });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Add to Actions' })); });
        expect(onSave).toHaveBeenCalledWith({ name: 'Shield Burst', type: 'reaction', description: WAND_TEXT, item: 'Wand of Magic Missiles', charges: 3 });
        expect(onClose).toHaveBeenCalled();
    });

    it('are built into the Actions card with the gear', () => {
        const rows = buildActionRows({
            attacks: [], hasWeaponMastery: false, masteryWeapons: null, castable: [], spells: [], spellcasting: null,
            characterLevel: 1, primaryClass: 'wizard', equipment: gear,
            storedActions: [{ name: 'Magic Missile', type: 'action', description: 'x', item: 'Wand of Magic Missiles', charges: 1 }],
        });
        expect(rows[0].charges).toMatchObject({ current: 4, max: 7, cost: 1 });
    });
});
