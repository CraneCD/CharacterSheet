'use client';

import { useSheetReadOnly } from '../SheetReadOnly';

interface SlotPipsProps {
    /** e.g. "Level 2 spell slots" or "Pact Magic slots". */
    label: string;
    total: number;
    used: number;
    /** Called with the new number of used slots. */
    onChange: (used: number) => void;
    testIdPrefix?: string;
}

/**
 * Slot tracker: filling a pip uses slots up to it; clicking the last used pip frees it.
 * Each pip is a button, so slots can be tracked from the keyboard.
 */
export default function SlotPips({ label, total, used, onChange, testIdPrefix }: SlotPipsProps) {
    const readOnly = useSheetReadOnly();
    return (
        <div className="slot-pips" role="group" aria-label={`${label}: ${total - used} of ${total} left`}>
            {Array.from({ length: total }, (_, i) => {
                const isUsed = i < used;
                return (
                    <button
                        key={i}
                        type="button"
                        className="slot-pip"
                        aria-pressed={isUsed}
                        aria-label={`Slot ${i + 1}${isUsed ? ', used' : ''}`}
                        title={isUsed ? 'Used (click to free the last used slot)' : 'Available (click to use)'}
                        data-testid={testIdPrefix ? `${testIdPrefix}-${i}` : undefined}
                        disabled={readOnly}
                        onClick={() => onChange(isUsed && i === used - 1 ? i : i + 1)}
                    />
                );
            })}
        </div>
    );
}
