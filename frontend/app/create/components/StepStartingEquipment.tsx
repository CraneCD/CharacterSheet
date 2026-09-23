'use client';

import { ClassInfo, Background } from '@/lib/types';
import { optionsFromLine } from '@/lib/equipmentMapping';

interface StepStartingEquipmentProps {
    selectedClass: ClassInfo | null;
    selectedBackground?: Background | null;
    choices: string[];
    onChange: (choices: string[]) => void;
    backgroundChoices?: string[];
    onBackgroundChange?: (choices: string[]) => void;
}

function EquipmentLines({ lines, choices, onChange, prefix }: { lines: string[]; choices: string[]; onChange: (c: string[]) => void; prefix: string }) {
    const setChoice = (index: number, value: string) => {
        const next = [...choices];
        while (next.length <= index) next.push('');
        next[index] = value;
        onChange(next);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lines.map((line, index) => {
                const opts = optionsFromLine(line);
                const value = choices[index] ?? '';
                return (
                    <div key={index} className="card" style={{ padding: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            Choose {opts.length > 2 ? 'A, B, or C' : 'A or B'}
                        </label>
                        <select
                            className="input"
                            data-testid={`${prefix}-equipment-${index}`}
                            value={value}
                            onChange={(e) => setChoice(index, e.target.value)}
                        >
                            <option value="">Select one...</option>
                            {opts.map((opt, i) => (
                                <option key={opt} value={opt}>({String.fromCharCode(65 + i)}) {opt}</option>
                            ))}
                        </select>
                    </div>
                );
            })}
        </div>
    );
}

export default function StepStartingEquipment({ selectedClass, selectedBackground, choices, onChange, backgroundChoices = [], onBackgroundChange }: StepStartingEquipmentProps) {
    const lines = selectedClass?.startingEquipment ?? [];
    const bgLines = selectedBackground?.startingEquipment ?? [];

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Starting Equipment</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Take your class and background equipment packages, or gold to buy your own gear.
            </p>

            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{selectedClass?.name ?? 'Class'}</h3>
            {lines.length === 0 ? (
                <div className="card" style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
                    No starting equipment choices for this class.
                </div>
            ) : (
                <EquipmentLines lines={lines} choices={choices} onChange={onChange} prefix="class" />
            )}

            {bgLines.length > 0 && onBackgroundChange && (
                <>
                    <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.5rem' }}>{selectedBackground?.name ?? 'Background'}</h3>
                    <EquipmentLines lines={bgLines} choices={backgroundChoices} onChange={onBackgroundChange} prefix="background" />
                </>
            )}
        </div>
    );
}
