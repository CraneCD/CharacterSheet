'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import D20Icon from '@/app/components/ui/D20Icon';
import { announceRoll, autoFailedD20, describeRoll, formatBonus, rollD20, rollDamage, RollMode, RollResult } from '@/lib/dice';
import { ActiveConditions, combineModes, isRollAffected, rollAdjustment, RollKind } from '@/lib/conditions';

export interface RollRequest {
    /** e.g. "Stealth", "Wisdom save", "Longsword attack" */
    label: string;
    modifier: number;
    /** What the roll is for, so active conditions can apply (Poisoned: Disadvantage on checks, ...) */
    kind?: RollKind;
    /** Ability used ("dex"), for conditions that affect some saves */
    ability?: string;
    /** Attacks: offered as "Roll damage" after the attack roll (dice doubled on a natural 20). */
    damage?: { expression: string; modifier: number; /** Tray title, e.g. "Cure Wounds healing" */ label?: string };
}

interface DiceApi {
    roll: (request: RollRequest, mode?: RollMode) => void;
    /** Active conditions, so roll buttons can flag numbers they change */
    conditions: ActiveConditions;
    /** Rolls request.damage straight away (damage or healing with no attack roll) */
    rollEffect: (request: RollRequest) => void;
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

const NO_CONDITIONS: ActiveConditions = { conditions: [], exhaustion: 0 };

/**
 * Tap-to-roll for the sheet: RollButtons inside it roll a d20 and show the result in a docked dice
 * tray. Active conditions and Exhaustion apply automatically (lib/conditions).
 */
export function DiceProvider({ children, conditions = NO_CONDITIONS }: { children: React.ReactNode; conditions?: ActiveConditions }) {
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

    const conditionsRef = useRef(conditions);
    conditionsRef.current = conditions;

    const roll = useCallback((request: RollRequest, mode: RollMode = 'normal') => {
        if (!request.kind) {
            show(rollD20(request.label, request.modifier, mode), request);
            return;
        }
        const adj = rollAdjustment(request.kind, request.ability, conditionsRef.current);
        if (adj.autoFail) {
            show({ ...autoFailedD20(request.label, request.modifier, adj.autoFail), notes: adj.reasons }, request);
            return;
        }
        const result = rollD20(request.label, request.modifier, combineModes(mode, adj.mode), Math.random, adj.penalty);
        const notes = [...adj.reasons];
        if (mode !== 'normal' && adj.mode !== 'normal' && mode !== adj.mode) notes.unshift(`Your ${mode} cancels the conditions' ${adj.mode}`);
        show(notes.length ? { ...result, notes } : result, request);
    }, [show]);

    const rollDamageFor = useCallback((request: RollRequest, critical: boolean) => {
        if (!request.damage) return;
        const label = request.damage.label ?? `${request.label.replace(/ attack$/, '')} damage`;
        const result = rollDamage(label, request.damage.expression, request.damage.modifier, critical);
        if (result) show(result, request);
    }, [show]);

    const rollEffect = useCallback((request: RollRequest) => rollDamageFor(request, false), [rollDamageFor]);

    const api = useMemo(() => ({ roll, rollEffect, conditions }), [roll, rollEffect, conditions]);

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
    const fumble = isD20 && (result.natural === 1 || !!result.autoFail);
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
                    <span className="dice-tray-face">{rolling ? face : isD20 ? (result.autoFail ? '—' : result.natural) : result.total}</span>
                </div>
                <div className="dice-tray-result">
                    <div className="dice-tray-label">{title}</div>
                    {isD20 && result.autoFail
                        ? <div className="dice-tray-total is-fail" aria-hidden="true">Automatic failure</div>
                        : <div className="dice-tray-total" aria-hidden="true">{rolling ? '…' : result.total}</div>}
                    <div className="dice-tray-math" aria-hidden="true">{rolling ? 'Rolling' : describeRoll(result)}</div>
                    {!rolling && isD20 && result.notes && result.notes.length > 0 && (
                        <div className="dice-tray-why" aria-hidden="true">{result.notes.join(' · ')}</div>
                    )}
                    {!rolling && (crit || (fumble && !(isD20 && result.autoFail))) && <div className="dice-tray-note" aria-hidden="true">{crit ? 'Natural 20!' : 'Natural 1'}</div>}
                </div>
                <button type="button" className="dice-tray-close" aria-label="Close dice tray" onClick={onClose}>×</button>
            </div>
            {/* Announce the settled result once */}
            <p className="visually-hidden" role="status">
                {rolling ? '' : `${announceRoll(result)}${isD20 && result.notes?.length && !result.autoFail ? `. ${result.notes.join('. ')}` : ''}`}
            </p>
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
    /** What the roll is for; lets active conditions apply and flags the number when they do */
    kind?: RollKind;
    ability?: string;
    damage?: RollRequest['damage'];
    className?: string;
    children: React.ReactNode;
}

/** A modifier you can tap to roll. Plain text when there's no DiceProvider (e.g. print previews, tests). */
export function RollButton({ label, modifier, kind, ability, damage, className, children }: RollButtonProps) {
    const dice = useDice();
    if (!dice) return <span className={className}>{children}</span>;
    const sign = modifier >= 0 ? `+${modifier}` : `−${Math.abs(modifier)}`;
    const affected = kind ? isRollAffected(kind, ability, dice.conditions) : false;
    const reasons = affected && kind ? rollAdjustment(kind, ability, dice.conditions).reasons.join(', ') : '';
    const classes = ['roll-button', className, affected && 'is-affected'].filter(Boolean).join(' ');
    return (
        <button
            type="button"
            className={classes}
            onClick={() => dice.roll({ label, modifier, damage, kind, ability })}
            aria-label={`Roll ${label}, ${sign}${reasons ? ` (${reasons})` : ''}`}
            title={reasons ? `Roll ${label}: ${reasons}` : `Roll ${label}`}
        >
            {children}
        </button>
    );
}

interface EffectRollButtonProps {
    /** Tray title, e.g. "Longsword damage" or "Cure Wounds healing" */
    label: string;
    expression: string;
    modifier: number;
    className?: string;
    children: React.ReactNode;
}

/** A damage or healing roll you can tap. Plain text without a DiceProvider. */
export function EffectRollButton({ label, expression, modifier, className, children }: EffectRollButtonProps) {
    const dice = useDice();
    if (!dice) return <span className={className}>{children}</span>;
    const full = `${expression}${formatBonus(modifier)}`;
    return (
        <button
            type="button"
            className={className ? `roll-button ${className}` : 'roll-button'}
            onClick={() => dice.rollEffect({ label, modifier: 0, damage: { expression, modifier, label } })}
            aria-label={`Roll ${label}, ${full}`}
            title={`Roll ${label}`}
        >
            {children}
        </button>
    );
}
