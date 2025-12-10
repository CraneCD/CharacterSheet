'use client';

import { CharacterItem } from '@/lib/types';

interface CombatManagerProps {
    equipment: (string | CharacterItem)[];
    strMod: number;
    dexMod: number;
    profBonus: number;
}

export default function CombatManager({ equipment, strMod, dexMod, profBonus }: CombatManagerProps) {
    const equippedWeapons = equipment
        .map(item => (typeof item === 'string' ? { name: item } : item))
        .filter(item => item.equipped && item.type === 'weapon');

    if (equippedWeapons.length === 0) return null;

    const calculateAttack = (weapon: CharacterItem) => {
        const isFinesse = weapon.properties?.includes('finesse');
        const isRanged = weapon.properties?.includes('ranged'); // simplified

        // Use Dex if Finesse and Dex > Str, or if Ranged (usually). 
        // 5e: Finesse = Choice. Ranged = Dex. Thrown = Str (unless Finesse).
        // Simplification for MVP:
        // If Finesse: max(Str, Dex)
        // If Ranged (and not Thrown/Finesse overrides): Dex
        // Else: Str

        let mod = strMod;
        if (isFinesse) {
            mod = Math.max(strMod, dexMod);
        } else if (isRanged) {
            mod = dexMod;
        }

        const toHit = mod + profBonus; // Assuming proficiency with equipped weapons
        const damageMod = mod; // Usually same mod added to damage

        return { toHit, damageMod };
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Attacks
            </h3>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {equippedWeapons.map((weapon, i) => {
                    const { toHit, damageMod } = calculateAttack(weapon);
                    const sign = toHit >= 0 ? '+' : '';
                    const dmgSign = damageMod >= 0 ? '+' : '';

                    return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--surface)', borderRadius: '4px', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                                <div style={{ fontWeight: 'bold' }}>{weapon.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {weapon.properties?.join(', ')}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                                    {sign}{toHit} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>to hit</span>
                                </div>
                                <div style={{ fontSize: '0.875rem' }}>
                                    {weapon.damage || '1d4'} {damageMod !== 0 && `${dmgSign}${damageMod}`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
