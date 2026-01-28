'use client';

import { ClassInfo } from '@/lib/types';

interface StepStartingEquipmentProps {
    selectedClass: ClassInfo | null;
    choices: string[];
    onChange: (choices: string[]) => void;
}

/** Split "A or B or C" into options, trimmed. */
function optionsFromLine(line: string): string[] {
    return line.split(/\s+or\s+/i).map((s) => s.trim()).filter(Boolean);
}

export default function StepStartingEquipment({ selectedClass, choices, onChange }: StepStartingEquipmentProps) {
    const lines = selectedClass?.startingEquipment ?? [];

    const setChoice = (index: number, value: string) => {
        const next = [...choices];
        while (next.length <= index) next.push('');
        next[index] = value;
        onChange(next);
    };

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Starting Equipment</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Choose one option per row. These will be added to your equipment.
            </p>

            {lines.length === 0 ? (
                <div className="card" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No starting equipment choices for this class.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lines.map((line, index) => {
                        const opts = optionsFromLine(line);
                        const value = choices[index] ?? '';
                        return (
                            <div key={index} className="card" style={{ padding: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    Choice {index + 1}
                                </label>
                                <select
                                    className="input"
                                    value={value}
                                    onChange={(e) => setChoice(index, e.target.value)}
                                >
                                    <option value="">Select one...</option>
                                    {opts.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
