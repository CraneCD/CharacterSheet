'use client';

import { useSheetReadOnly } from '../../SheetReadOnly';

interface MageArmorToggleProps {
    active: boolean;
    /** Active and counted in AC (not while wearing armor, or when another AC is better) */
    applies: boolean;
    onChange: (active: boolean) => void;
}

/** Turns Mage Armor on or off under the AC: base AC 13 + DEX while you wear no armor. Ends on a Long Rest. */
export default function MageArmorToggle({ active, applies, onChange }: MageArmorToggleProps) {
    const readOnly = useSheetReadOnly();
    const title = !active
        ? 'Mage Armor: your base AC becomes 13 + your Dexterity modifier while you wear no armor (8 hours)'
        : applies
            ? 'Mage Armor is on: base AC 13 + DEX. Tap to end it (a Long Rest ends it too)'
            : 'Mage Armor is on but not counted: it does nothing while you wear armor, or when your AC is already higher';
    return (
        <button
            type="button"
            className="effect-chip mage-armor-toggle"
            aria-pressed={active}
            title={title}
            disabled={readOnly}
            onClick={() => onChange(!active)}
        >
            Mage Armor{active && !applies ? ' (no effect)' : ''}
        </button>
    );
}
