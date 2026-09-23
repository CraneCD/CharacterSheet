import {
    findActionSpell,
    isActionForSpell,
    liveSpellAction,
    parseSpellActionName,
    spellActionDescription,
    spellActionName,
} from '@/lib/spellActions';

const spell = (id: string, name: string, extra: Partial<Record<string, string>> = {}) => ({
    id, name, castingTime: 'Action', range: '60 feet', components: 'V', duration: 'Instantaneous', description: `${name} 2024 text.`, ...extra,
});
const SPELLS = [
    spell('healing-word', 'Healing Word', { castingTime: 'Bonus Action' }),
    spell('pass-without-trace', 'Pass without Trace'),
    spell('shining-smite', 'Shining Smite'),
    spell('feeblemind', 'Befuddlement'),
    spell('power-word-stun', 'Power Word Stun'),
];
// What the app saved before (2014 wording)
const saved2014 = (name: string) => ({ name, type: 'action' as const, description: '**Casting Time:** 1 action\n**Range:** 60 feet\n**Components:** V\n**Duration:** Instantaneous\n\nOld 2014 text.' });

describe('spell action names', () => {
    it('builds and parses "Cast <spell>" names', () => {
        expect(spellActionName('Healing Word', 'bonus')).toBe('Cast Healing Word (Bonus)');
        expect(spellActionName('Shield', 'reaction')).toBe('Cast Shield (Reaction)');
        expect(spellActionName('Mending', 'other')).toBe('Cast Mending');
        expect(parseSpellActionName('Cast Healing Word (Bonus)')).toEqual({ spellName: 'Healing Word', suffix: ' (Bonus)' });
        expect(parseSpellActionName('Use Cloak of Protection')).toBeNull();
    });
});

describe('live spell actions', () => {
    it('shows the current spell text for an action with a spellId', () => {
        const action = { name: 'Cast Healing Word (Bonus)', type: 'bonus' as const, description: 'stale', spellId: 'healing-word' };
        const live = liveSpellAction(action, SPELLS);
        expect(live.description).toBe(spellActionDescription(SPELLS[0]));
        expect(live.name).toBe('Cast Healing Word (Bonus)');
        expect(live.type).toBe('bonus');
    });

    it('follows a renamed spell by spellId, keeping the saved Bonus/Reaction label', () => {
        const action = { name: 'Cast Branding Smite (Bonus)', type: 'bonus' as const, description: 'old', spellId: 'shining-smite' };
        expect(liveSpellAction(action, SPELLS).name).toBe('Cast Shining Smite (Bonus)');
    });

    it('matches older generated actions by name (case-insensitive)', () => {
        const live = liveSpellAction(saved2014('Cast Pass Without Trace'), SPELLS);
        expect(live.name).toBe('Cast Pass without Trace');
        expect(live.description).toContain('Pass without Trace 2024 text.');
    });

    it('follows 2014 names of renamed spells for older actions (ids keep the old name)', () => {
        expect(liveSpellAction(saved2014('Cast Feeblemind'), SPELLS).name).toBe('Cast Befuddlement');
        expect(liveSpellAction(saved2014('Cast Power Word: Stun'), SPELLS).name).toBe('Cast Power Word Stun');
    });

    it('leaves hand-written and unknown actions alone', () => {
        const custom = { name: 'Cast Healing Word', type: 'action' as const, description: 'My house-ruled version.' };
        expect(liveSpellAction(custom, SPELLS)).toBe(custom);
        const unknown = saved2014('Cast Homebrew Blast');
        expect(liveSpellAction(unknown, SPELLS)).toBe(unknown);
        const item = { name: 'Use Cloak of Protection', type: 'action' as const, description: '+1 AC' };
        expect(liveSpellAction(item, SPELLS)).toBe(item);
        expect(findActionSpell({ name: 'Cast Healing Word', spellId: 'gone' }, SPELLS)).toBeUndefined();
    });
});

describe('finding a spell\'s action', () => {
    it('matches by current name, or by spellId / old name with the same action type', () => {
        const hw = SPELLS[0];
        expect(isActionForSpell({ name: 'Cast Healing Word (Bonus)' }, hw, 'bonus', SPELLS)).toBe(true);
        expect(isActionForSpell({ name: 'Cast Healing Word', spellId: 'healing-word', description: 'x' }, hw, 'action', SPELLS)).toBe(true);
        expect(isActionForSpell({ name: 'Cast Healing Word', spellId: 'healing-word', description: 'x' }, hw, 'bonus', SPELLS)).toBe(false);
        expect(isActionForSpell(saved2014('Cast Pass Without Trace'), SPELLS[1], 'action', SPELLS)).toBe(true);
        expect(isActionForSpell(saved2014('Cast Pass Without Trace'), SPELLS[2], 'action', SPELLS)).toBe(false);
    });
});
