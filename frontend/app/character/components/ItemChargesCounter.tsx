'use client';

interface ItemChargesCounterProps {
    item: string;
    current: number;
    max: number;
    /** Charges one press of − spends (an action's cost) */
    cost?: number;
    /** Without it the count is shown read-only (DM view, print) */
    onSet?: (current: number) => void;
}

/** "− 5/7 charges +" for a magic item: spend or get back charges by hand. */
export default function ItemChargesCounter({ item, current, max, cost = 1, onSet }: ItemChargesCounterProps) {
    const empty = current === 0;
    const spend = Math.max(1, cost);
    return (
        <span className={empty ? 'item-charges is-empty' : 'item-charges'}>
            {onSet && (
                <button
                    type="button"
                    className="action-ammo-step"
                    disabled={current < spend}
                    onClick={() => onSet(current - spend)}
                    aria-label={`Spend ${spend} charge${spend === 1 ? '' : 's'} of ${item}`}
                >−</button>
            )}
            <span>{current}/{max} charges</span>
            {onSet && (
                <button
                    type="button"
                    className="action-ammo-step"
                    disabled={current >= max}
                    onClick={() => onSet(current + 1)}
                    aria-label={`Add a charge to ${item}`}
                >+</button>
            )}
        </span>
    );
}
