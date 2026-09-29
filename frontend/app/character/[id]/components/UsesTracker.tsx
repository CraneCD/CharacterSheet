'use client';

import { EditableNumber } from '@/app/components/ui';
import type { ClassResource } from '@/lib/types';
import SlotPips from './SlotPips';
import { useSheetReadOnly } from '../SheetReadOnly';

/** Counters up to this size show one pip per use; bigger pools (Lay on Hands, Sorcery Points) show a number. */
export const MAX_PIPS = 12;

export function resetLabel(resource: Pick<ClassResource, 'resetType' | 'shortRestRegain'>): string {
    if (resource.resetType === 'short') {
        return resource.shortRestRegain ? `Short Rest: ${resource.shortRestRegain}, Long Rest: all` : 'Short or Long Rest';
    }
    return resource.resetType === 'long' ? 'Long Rest' : 'Never';
}

interface UsesTrackerProps {
    resource: ClassResource;
    onChange: (current: number) => void;
}

/** Spend and regain uses of a limited-use feature: pips for small counters, − / + and a number for pools. */
export default function UsesTracker({ resource, onChange }: UsesTrackerProps) {
    const readOnly = useSheetReadOnly();
    const { name, current, max } = resource;

    if (max > 0 && max <= MAX_PIPS) {
        return (
            <div className="uses-tracker">
                <SlotPips label={`${name} uses`} unit="Use" total={max} used={max - current} onChange={(used) => onChange(max - used)} />
                <span className="uses-count" aria-hidden="true">{current}/{max}</span>
            </div>
        );
    }

    return (
        <div className="uses-tracker" role="group" aria-label={`${name}: ${current} of ${max} left`}>
            {!readOnly && (
                <button type="button" className="btn btn-secondary btn-sm uses-step" onClick={() => onChange(current - 1)} disabled={current <= 0} aria-label={`Use one ${name}`}>−</button>
            )}
            <span className="uses-count">
                {readOnly ? current : (
                    <EditableNumber label={`${name} left`} value={current} min={0} max={max} onSave={onChange} className="uses-edit" />
                )}
                <span className="uses-of"> / {max}</span>
            </span>
            {!readOnly && (
                <button type="button" className="btn btn-secondary btn-sm uses-step" onClick={() => onChange(current + 1)} disabled={current >= max} aria-label={`Regain one ${name}`}>+</button>
            )}
        </div>
    );
}
