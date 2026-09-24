import { findActionSpell, parseSpellActionName, spellActionName } from '@/lib/spellActions';

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

// The Actions card hides the "Cast <spell>" copies the app used to save; these are how it recognises them
describe('recognising saved spell actions', () => {
    it('finds the spell by spellId, even after a rename', () => {
        expect(findActionSpell({ name: 'Cast Healing Word (Bonus)', spellId: 'healing-word' }, SPELLS)?.id).toBe('healing-word');
        expect(findActionSpell({ name: 'Cast Branding Smite (Bonus)', spellId: 'shining-smite' }, SPELLS)?.name).toBe('Shining Smite');
    });

    it('matches older generated actions by name, case-insensitively and by 2014 names', () => {
        expect(findActionSpell(saved2014('Cast Pass Without Trace'), SPELLS)?.id).toBe('pass-without-trace');
        expect(findActionSpell(saved2014('Cast Feeblemind'), SPELLS)?.name).toBe('Befuddlement');
        expect(findActionSpell(saved2014('Cast Power Word: Stun'), SPELLS)?.id).toBe('power-word-stun');
    });

    it('leaves hand-written and unknown actions alone', () => {
        expect(findActionSpell({ name: 'Cast Healing Word', type: 'action', description: 'My house-ruled version.' }, SPELLS)).toBeUndefined();
        expect(findActionSpell(saved2014('Cast Homebrew Blast'), SPELLS)).toBeUndefined();
        expect(findActionSpell({ name: 'Use Cloak of Protection', description: '+1 AC' }, SPELLS)).toBeUndefined();
        expect(findActionSpell({ name: 'Cast Healing Word', spellId: 'gone' }, SPELLS)).toBeUndefined();
    });
});
