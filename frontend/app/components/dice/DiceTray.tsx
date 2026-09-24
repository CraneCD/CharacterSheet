'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import D20Icon from '@/app/components/ui/D20Icon';
import { announceRoll, describeRoll, formatBonus, rollD20, rollDamage, RollMode, RollResult } from '@/lib/dice';

export interface RollRequest {
    /** e.g. "Stealth", "Wisdom save", "Longsword attack" */
    label: string;
    modifier: number;
    /** Attacks: offered as "Roll damage" after the attack roll (dice doubled on a natural 20). */
    damage?: { expression: string; modifier: number };
}

interface DiceApi {
    roll: (request: RollRequest, mode?: RollMode) => void;
}

const DiceContext = createContext<DiceApi | null>(null);

/** Null outside a DiceProvider, where modifiers render as plain text. */
export function useDice(): DiceApi | null {
    return useContext(DiceContext);
}

const ROLL_MS = 650;
const LOG_SIZE = 4;

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

interface TrayState {
    result: RollResult;
    request: RollRequest;
    /** Changes on every roll so the tumble animation restarts. */
    id: number;
}

/** Tap-to-roll for the sheet: RollButtons inside it roll a d20 and show the result in a docked dice tray. */
export function DiceProvider({ children }: { children: React.ReactNode }) {
    const [tray, setTray] = useState<TrayState | null>(null);
    const [rolling, setRolling] = useState(false);
    const [face, setFace] = useState(20);
    const [log, setLog] = useState<string[]>([]);
    const nextId = useRef(1);
    const trayRef = useRef<TrayState | null>(null);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const show = useCallback((result: RollResult, request: RollRequest) => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        const previous = trayRef.current;
        if (previous) setLog((l) => [announceRoll(previous.result), ...l].slice(0, LOG_SIZE));
        const next = { result, request, id: nextId.current++ };
        trayRef.current = next;
        setTray(next);
        if (prefersReducedMotion()) {
            setRolling(false);
            return;
        }
        // Tumble: flash a few faces before settling on the result
        setRolling(true);
        const steps = 8;
        for (let i = 0; i < steps; i++) {
            timers.current.push(setTimeout(() => setFace(((i * 7) % 20) + 1), (ROLL_MS / steps) * i));
        }
        timers.current.push(setTimeout(() => setRolling(false), ROLL_MS));
    }, []);

    const roll = useCallback((request: RollRequest, mode: RollMode = 'normal') => {
        show(rollD20(request.label, request.modifier, mode), request);
    }, [show]);

    const rollDamageFor = useCallback((request: RollRequest, critical: boolean) => {
        if (!request.damage) return;
        const result = rollDamage(`${request.label.replace(/ attack$/, '')} damage`, request.damage.expression, request.damage.modifier, critical);
        if (result) show(result, request);
    }, [show]);

    const api = useMemo(() => ({ roll }), [roll]);

    return (
        <DiceContext.Provider value={api}>
            {children}
            {tray && (
                <DiceTrayPanel
                    tray={tray}
                    rolling={rolling}
                    face={face}
                    log={log}
                    onRoll={roll}
                    onDamage={rollDamageFor}
                    onClose={() => {
                        trayRef.current = null;
                        setTray(null);
                    }}
                />
            )}
        </DiceContext.Provider>
    );
}

interface PanelProps {
    tray: TrayState;
    rolling: boolean;
    face: number;
    log: string[];
    onRoll: (request: RollRequest, mode?: RollMode) => void;
    onDamage: (request: RollRequest, critical: boolean) => void;
    onClose: () => void;
}

function DiceTrayPanel({ tray, rolling, face, log, onRoll, onDamage, onClose }: PanelProps) {
    const { result, request } = tray;
    const isD20 = result.kind === 'd20';
    const crit = isD20 && result.natural === 20;
    const fumble = isD20 && result.natural === 1;
    const state = rolling ? ' is-rolling' : crit ? ' is-crit' : fumble ? ' is-fumble' : '';
    const title = result.kind === 'd20' && result.mode !== 'normal'
        ? `${result.label} (${result.mode})`
        : result.kind === 'damage' && result.critical ? `${result.label} (critical)` : result.label;

    return (
        <section className={`dice-tray no-print${state}`} aria-label="Dice tray">
            <div className="dice-tray-main">
                {/* Keyed per roll so the tumble animation restarts */}
                <div key={tray.id} className="dice-tray-die" aria-hidden="true">
                    <D20Icon />
                    <span className="dice-tray-face">{rolling ? face : isD20 ? result.natural : result.total}</span>
                </div>
                <div className="dice-tray-result">
                    <div className="dice-tray-label">{title}</div>
                    <div className="dice-tray-total" aria-hidden="true">{rolling ? '…' : result.total}</div>
                    <div className="dice-tray-math" aria-hidden="true">{rolling ? 'Rolling' : describeRoll(result)}</div>
                    {!rolling && (crit || fumble) && <div className="dice-tray-note" aria-hidden="true">{crit ? 'Natural 20!' : 'Natural 1'}</div>}
                </div>
                <button type="button" className="dice-tray-close" aria-label="Close dice tray" onClick={onClose}>×</button>
            </div>
            {/* Announce the settled result once */}
            <p className="visually-hidden" role="status">{rolling ? '' : announceRoll(result)}</p>
            <div className="dice-tray-actions">
                {isD20 ? (
                    <>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onRoll(request, 'advantage')}>Advantage</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onRoll(request, 'disadvantage')}>Disadvantage</button>
                        {request.damage && (
                            <button type="button" className="btn btn-sm" onClick={() => onDamage(request, crit)}>
                                {crit ? 'Roll crit damage' : `Damage ${request.damage.expression}${formatBonus(request.damage.modifier)}`}
                            </button>
                        )}
                    </>
                ) : (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => onDamage(request, result.critical)}>Roll again</button>
                )}
            </div>
            {log.length > 0 && (
                <ul className="dice-tray-log" aria-label="Earlier rolls">
                    {log.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
            )}
        </section>
    );
}

interface RollButtonProps {
    label: string;
    modifier: number;
    damage?: RollRequest['damage'];
    className?: string;
    children: React.ReactNode;
}

/** A modifier you can tap to roll. Plain text when there's no DiceProvider (e.g. print previews, tests). */
export function RollButton({ label, modifier, damage, className, children }: RollButtonProps) {
    const dice = useDice();
    if (!dice) return <span className={className}>{children}</span>;
    const sign = modifier >= 0 ? `+${modifier}` : `−${Math.abs(modifier)}`;
    return (
        <button
            type="button"
            className={className ? `roll-button ${className}` : 'roll-button'}
            onClick={() => dice.roll({ label, modifier, damage })}
            aria-label={`Roll ${label}, ${sign}`}
            title={`Roll ${label}`}
        >
            {children}
        </button>
    );
}
