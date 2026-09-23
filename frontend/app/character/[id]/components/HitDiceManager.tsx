'use client';

import { memo } from 'react';
import { HitDice } from '@/lib/types';
import { Button, SectionHeader } from '@/app/components/ui';

interface HitDiceManagerProps {
    hitDice: HitDice | undefined;
    /** Opens the Short Rest dialog, where Hit Dice are spent (2024 rules). */
    onShortRest: () => void;
}

/** Hit Dice at a glance; spending happens in the Short Rest dialog and a Long Rest restores them. */
function HitDiceManager({ hitDice: stored, onShortRest }: HitDiceManagerProps) {
    const hitDice = stored || { total: 1, spent: 0, dieType: 8 };
    const available = Math.max(0, hitDice.total - hitDice.spent);

    return (
        <div className="card">
            <SectionHeader title="Hit Dice" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <div>
                    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>
                        {available} <span style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-muted)', fontWeight: 400 }}>/ {hitDice.total} d{hitDice.dieType}</span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                        {hitDice.spent > 0
                            ? `${hitDice.spent} spent · all return on a Long Rest`
                            : 'All available'}
                    </div>
                </div>
                <Button variant="secondary" className="no-print" onClick={onShortRest} disabled={available <= 0}>
                    Spend on a Short Rest…
                </Button>
            </div>
        </div>
    );
}

export default memo(HitDiceManager);
