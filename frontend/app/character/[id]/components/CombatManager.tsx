'use client';

import { CharacterItem } from '@/lib/types';

interface CombatManagerProps {
    equipment: (string | CharacterItem)[];
    strMod: number;
    dexMod: number;
    profBonus: number;
    fightingStyles?: string[];
}

export default function CombatManager({ equipment, strMod, dexMod, profBonus, fightingStyles = [] }: CombatManagerProps) {
    const safeEquipment = Array.isArray(equipment) ? equipment : [];
    const equippedWeapons = safeEquipment
        .map(item => (typeof item === 'string' ? { name: item } : item))
        .filter(item => item.equipped && (item.type === 'weapon' || item.category === 'weapon')) as CharacterItem[];

    if (equippedWeapons.length === 0) return null;

    const hasArchery = fightingStyles.includes('archery');
    const hasDueling = fightingStyles.includes('dueling');
    const hasTWF = fightingStyles.includes('two-weapon-fighting');
    const hasGWF = fightingStyles.includes('great-weapon-fighting');

    const isRangedWeapon = (w: CharacterItem) =>
        w.properties?.some((p: string) => String(p).toLowerCase().includes('ammunition'));
    const isMeleeWeapon = (w: CharacterItem) => !isRangedWeapon(w);
    const isLightMelee = (w: CharacterItem) =>
        isMeleeWeapon(w) && w.properties?.some((p: string) => String(p).toLowerCase() === 'light');
    const isTwoHandedOrVersatile = (w: CharacterItem) =>
        w.properties?.some((p: string) => {
            const s = String(p).toLowerCase();
            return s === 'two-handed' || s === 'versatile';
        });

    const oneMeleeNoOther = equippedWeapons.length === 1 && isMeleeWeapon(equippedWeapons[0]);
    const twoLightMelee = equippedWeapons.length === 2 && isLightMelee(equippedWeapons[0]) && isLightMelee(equippedWeapons[1]);

    const calculateAttack = (weapon: CharacterItem, index: number) => {
        const isFinesse = weapon.properties?.some((p: string) => String(p).toLowerCase() === 'finesse');
        const isRanged = isRangedWeapon(weapon);

        let mod = strMod;
        if (isFinesse) {
            mod = Math.max(strMod, dexMod);
        } else if (isRanged) {
            mod = dexMod;
        }

        let toHit = mod + profBonus;
        if (hasArchery && isRanged) toHit += 2;

        let damageMod = mod;
        if (hasDueling && oneMeleeNoOther && isMeleeWeapon(weapon)) damageMod += 2;
        if (twoLightMelee && index === 1) damageMod = hasTWF ? mod : 0;

        const gwfNote = hasGWF && isTwoHandedOrVersatile(weapon);

        return { toHit, damageMod, gwfNote };
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Attacks
            </h3>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {equippedWeapons.map((weapon, i) => {
                    const { toHit, damageMod, gwfNote } = calculateAttack(weapon, i);
                    const sign = toHit >= 0 ? '+' : '';
                    const dmgSign = damageMod >= 0 ? '+' : '';

                    return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--surface)', borderRadius: '4px', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                                <div style={{ fontWeight: 'bold' }}>{weapon.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {weapon.properties?.join(', ')}
                                </div>
                                {gwfNote && (
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        GWF: reroll 1s, 2s on damage
                                    </div>
                                )}
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
