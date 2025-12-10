'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';
import HPManager from './components/HPManager';
import EquipmentManager from './components/EquipmentManager';
import SpellManager from './components/SpellManager';
import LevelUpWizard from './components/LevelUpWizard';
import CombatManager from './components/CombatManager';
import ActionManager from './components/ActionManager';
import FeatureManager from './components/FeatureManager';
import CurrencyManager from './components/CurrencyManager';
import { CharacterData, CharacterItem } from '@/lib/types';

interface GameData {
    races: any[];
    classes: any[];
    backgrounds: any[];
    subclasses: any[];
    traits?: { [key: string]: { name: string; description: string } };
}

export default function CharacterSheet() {
    const { id } = useParams();
    const router = useRouter();
    const [character, setCharacter] = useState<any>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showLevelDownConfirm, setShowLevelDownConfirm] = useState(false);
    const [isLevelingDown, setIsLevelingDown] = useState(false);
    const [editingAbility, setEditingAbility] = useState<string | null>(null);
    const [abilityEditValue, setAbilityEditValue] = useState<string>('');
    const [editingSpeed, setEditingSpeed] = useState(false);
    const [speedEditValue, setSpeedEditValue] = useState<string>('');
    const [editingAC, setEditingAC] = useState(false);
    const [acEditValue, setAcEditValue] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [char, races, classes, backgrounds, subclasses, traits] = await Promise.all([
                    api.get(`/characters/${id}`),
                    api.get('/reference/races'),
                    api.get('/reference/classes'),
                    api.get('/reference/backgrounds'),
                    api.get('/reference/subclasses'),
                    api.get('/reference/traits')
                ]);
                setCharacter(char);
                setGameData({ races, classes, backgrounds, subclasses, traits });
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, [id, router]);

    if (!character || !gameData) return <div className="p-8 text-center">Loading character sheet...</div>;

    const data = character.data;
    const race = gameData.races.find(r => r.id === character.race) || { name: character.race, traits: [] };
    const charClass = gameData.classes.find(c => c.id.toLowerCase() === character.class.toLowerCase()) || { name: character.class };
    // Fallback for background if ID or full object is customized
    const background = gameData.backgrounds.find(b => b.id === data.backgroundId) || { name: 'Custom', feature: { name: 'Custom Feature', description: '' } };

    // Subclass
    const subclass = data.subclassId ? gameData.subclasses.find((s: any) => s.id === data.subclassId) : null;
    const classNameDisplay = subclass ? `${charClass.name} (${subclass.name})` : charClass.name;

    // Derived Stats
    const level = character.level;
    const pb = Math.ceil(level / 4) + 1;
    const mod = (score: number) => Math.floor((score - 10) / 2);
    const formatMod = (m: number) => m >= 0 ? `+${m}` : `${m}`;


    const abilityScores = data.abilityScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const modifiers: any = {
        str: mod(abilityScores.str),
        dex: mod(abilityScores.dex),
        con: mod(abilityScores.con),
        int: mod(abilityScores.int),
        wis: mod(abilityScores.wis),
        cha: mod(abilityScores.cha),
    };

    // Calculate AC (use manual override if set, otherwise calculate)
    let calculatedAC = 10 + modifiers.dex;

    // Check equipped items
    const equipment: (string | CharacterItem)[] = data.equipment || [];
    const equippedItems = equipment
        .map(item => (typeof item === 'string' ? { name: item } : item))
        .filter(item => item.equipped);

    const armor = equippedItems.find(i => (i.category === 'armor' || i.type === 'armor'));
    const shield = equippedItems.find(i => (i.category === 'shield' || i.type === 'shield'));

    if (armor && armor.baseAC) {
        if (armor.armorMethod === 'heavy') {
            calculatedAC = armor.baseAC;
        } else if (armor.armorMethod === 'medium') {
            calculatedAC = armor.baseAC + Math.min(modifiers.dex, 2);
        } else {
            // Light or undefined -> Base + Dex
            calculatedAC = armor.baseAC + modifiers.dex;
        }
    } else {
        // Unarmored Defense (Barbarian/Monk) could go here if implemented
        // For now, stick to 10 + Dex
    }

    if (shield && shield.baseAC) {
        calculatedAC += shield.baseAC;
    } else if (shield) {
        // Fallback if baseAC not set but type is shield
        calculatedAC += 2;
    }

    // Use manual AC override if set, otherwise use calculated
    const ac = data.ac !== undefined ? data.ac : calculatedAC;
    
    // Speed: use manual override if set, otherwise use race default
    const speed = data.speed !== undefined ? data.speed : (race.speed || 30);

    // Saving Throws
    const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => {
        const isProficient = charClass.savingThrows?.includes(stat);
        const total = modifiers[stat] + (isProficient ? pb : 0);
        return { stat, total, isProficient };
    });

    // Skills
    const skillsList = [
        { name: 'Acrobatics', stat: 'dex' },
        { name: 'Animal Handling', stat: 'wis' },
        { name: 'Arcana', stat: 'int' },
        { name: 'Athletics', stat: 'str' },
        { name: 'Deception', stat: 'cha' },
        { name: 'History', stat: 'int' },
        { name: 'Insight', stat: 'wis' },
        { name: 'Intimidation', stat: 'cha' },
        { name: 'Investigation', stat: 'int' },
        { name: 'Medicine', stat: 'wis' },
        { name: 'Nature', stat: 'int' },
        { name: 'Perception', stat: 'wis' },
        { name: 'Performance', stat: 'cha' },
        { name: 'Persuasion', stat: 'cha' },
        { name: 'Religion', stat: 'int' },
        { name: 'Sleight of Hand', stat: 'dex' },
        { name: 'Stealth', stat: 'dex' },
        { name: 'Survival', stat: 'wis' },
    ];

    const definedSkills = data.skills || []; // From DB
    // Merge background skills? For now assume data.skills has everything or fallback
    // Simplification: check if skill name is in data.skills (names array)
    // Or if data.skills is missing, use background proficiencies
    const proficientSkills = definedSkills.length > 0 ? definedSkills : (background?.skillProficiencies || []);

    const skills = skillsList.map(skill => {
        const isProficient = proficientSkills.includes(skill.name);
        const total = modifiers[skill.stat] + (isProficient ? pb : 0);
        return { ...skill, total, isProficient };
    });

    const handleUpdateCharacter = (updates: Partial<CharacterData>) => {
        setCharacter((prev: any) => ({
            ...prev,
            data: { ...prev.data, ...updates }
        }));
    };

    const handleAbilityScoreChange = async (stat: string, newValue: number) => {
        if (newValue < 1 || newValue > 30) {
            alert('Ability scores must be between 1 and 30');
            return;
        }

        try {
            const updatedScores = { ...abilityScores, [stat]: newValue };
            await api.put(`/characters/${character.id}`, {
                ...character,
                data: { ...character.data, abilityScores: updatedScores }
            });
            handleUpdateCharacter({ abilityScores: updatedScores });
            setEditingAbility(null);
        } catch (err) {
            console.error('Failed to update ability score', err);
            alert('Failed to update ability score');
        }
    };

    const startEditingAbility = (stat: string) => {
        setEditingAbility(stat);
        setAbilityEditValue(abilityScores[stat].toString());
    };

    const cancelEditingAbility = () => {
        setEditingAbility(null);
        setAbilityEditValue('');
    };

    const saveAbilityScore = (stat: string) => {
        const value = parseInt(abilityEditValue);
        if (!isNaN(value)) {
            handleAbilityScoreChange(stat, value);
        } else {
            cancelEditingAbility();
        }
    };

    const handleSpeedChange = async (newValue: number) => {
        if (newValue < 0 || newValue > 200) {
            alert('Speed must be between 0 and 200');
            return;
        }

        try {
            await api.put(`/characters/${character.id}`, {
                ...character,
                data: { ...character.data, speed: newValue }
            });
            handleUpdateCharacter({ speed: newValue });
            setEditingSpeed(false);
        } catch (err) {
            console.error('Failed to update speed', err);
            alert('Failed to update speed');
        }
    };

    const handleACChange = async (newValue: number) => {
        if (newValue < 0 || newValue > 50) {
            alert('AC must be between 0 and 50');
            return;
        }

        try {
            await api.put(`/characters/${character.id}`, {
                ...character,
                data: { ...character.data, ac: newValue }
            });
            handleUpdateCharacter({ ac: newValue });
            setEditingAC(false);
        } catch (err) {
            console.error('Failed to update AC', err);
            alert('Failed to update AC');
        }
    };

    const startEditingSpeed = () => {
        setEditingSpeed(true);
        setSpeedEditValue(speed.toString());
    };

    const startEditingAC = () => {
        setEditingAC(true);
        setAcEditValue(ac.toString());
    };

    const saveSpeed = () => {
        const value = parseInt(speedEditValue);
        if (!isNaN(value)) {
            handleSpeedChange(value);
        } else {
            setEditingSpeed(false);
        }
    };

    const saveAC = () => {
        const value = parseInt(acEditValue);
        if (!isNaN(value)) {
            handleACChange(value);
        } else {
            setEditingAC(false);
        }
    };

    const handleLevelUpComplete = (updatedChar: any) => {
        setCharacter(updatedChar);
        setShowLevelUp(false);
    };

    const handleLevelDown = async () => {
        if (character.level <= 1) {
            alert('Cannot level down below level 1');
            return;
        }

        setIsLevelingDown(true);
        try {
            const updated = await api.post(`/characters/${character.id}/level-down`, {});
            setCharacter(updated);
            setShowLevelDownConfirm(false);
        } catch (err: any) {
            console.error('Failed to level down', err);
            const errorMessage = err.message || 'Failed to level down';
            alert(errorMessage);
        } finally {
            setIsLevelingDown(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Header */}
            <div className="sheet-header">
                <div style={{ flex: '1 1 auto', minWidth: 0, maxWidth: '100%' }}>
                    <Link href="/dashboard" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'inline-block' }}>&larr; Back to Dashboard</Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <h1 className="heading" style={{ marginBottom: '0.25rem', flex: '1 1 auto', minWidth: 0, wordBreak: 'break-word' }}>{character.name}</h1>
                        <div className="no-print" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                                className="button primary"
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                onClick={() => setShowLevelUp(true)}
                            >
                                Level Up
                            </button>
                            {character.level > 1 && (
                                <button
                                    className="button secondary"
                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                    onClick={() => setShowLevelDownConfirm(true)}
                                    disabled={isLevelingDown}
                                >
                                    {isLevelingDown ? 'Leveling Down...' : 'Level Down'}
                                </button>
                            )}
                            <button
                                className="button secondary"
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                onClick={() => {
                                    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`;
                                    a.click();
                                }}
                            >
                                Export JSON
                            </button>
                            <button
                                className="button secondary"
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                onClick={() => window.print()}
                            >
                                Print / PDF
                            </button>
                        </div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', wordBreak: 'break-word', whiteSpace: 'normal', overflowWrap: 'break-word', lineHeight: '1.5' }}>
                        Level {level} {race.name} {classNameDisplay} • {background.name}
                    </div>
                </div>
                <div className="sheet-stats-row" style={{ flex: '0 0 auto', width: '100%', marginTop: '1rem' }}>
                    <div className="stat-box">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Prof Bonus</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>+{pb}</div>
                    </div>
                    <div className="stat-box">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Speed</div>
                        {editingSpeed ? (
                            <input
                                type="number"
                                min="0"
                                max="200"
                                value={speedEditValue}
                                onChange={(e) => setSpeedEditValue(e.target.value)}
                                onBlur={saveSpeed}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveSpeed();
                                    } else if (e.key === 'Escape') {
                                        setEditingSpeed(false);
                                    }
                                }}
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    width: '3rem',
                                    textAlign: 'center',
                                    padding: '0.125rem',
                                    border: '1px solid var(--primary)',
                                    borderRadius: '0.25rem',
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text)'
                                }}
                                autoFocus
                            />
                        ) : (
                            <div 
                                style={{ 
                                    fontSize: '1.25rem', 
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    borderRadius: '0.25rem',
                                    transition: 'background-color 0.2s'
                                }}
                                onClick={startEditingSpeed}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title="Click to edit"
                            >
                                {speed} ft.
                            </div>
                        )}
                    </div>
                    <div className="stat-box">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Initiative</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMod(modifiers.dex)}</div>
                    </div>
                    <div className="stat-box highlight">
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase' }}>AC</div>
                        {editingAC ? (
                            <input
                                type="number"
                                min="0"
                                max="50"
                                value={acEditValue}
                                onChange={(e) => setAcEditValue(e.target.value)}
                                onBlur={saveAC}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveAC();
                                    } else if (e.key === 'Escape') {
                                        setEditingAC(false);
                                    }
                                }}
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    width: '3rem',
                                    textAlign: 'center',
                                    padding: '0.125rem',
                                    border: '1px solid var(--primary)',
                                    borderRadius: '0.25rem',
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text)'
                                }}
                                autoFocus
                            />
                        ) : (
                            <div 
                                style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    borderRadius: '0.25rem',
                                    transition: 'background-color 0.2s'
                                }}
                                onClick={startEditingAC}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title="Click to edit"
                            >
                                {ac}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showLevelUp && (
                <LevelUpWizard
                    character={{ ...character, classInfo: charClass }}
                    onComplete={handleLevelUpComplete}
                    onCancel={() => setShowLevelUp(false)}
                />
            )}

            {showLevelDownConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            Level Down: {character.level} → {character.level - 1}
                        </h2>
                        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            Are you sure you want to level down? This will:
                        </p>
                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li>Reduce your level by 1</li>
                            <li>Remove HP gained at this level</li>
                            <li>Remove features gained at this level</li>
                            <li>Remove spells learned at this level</li>
                            <li>Reverse ability score improvements from this level</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--error)', fontWeight: 'bold' }}>
                            This action cannot be undone automatically. Make sure you want to proceed.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="button secondary"
                                onClick={() => setShowLevelDownConfirm(false)}
                                disabled={isLevelingDown}
                            >
                                Cancel
                            </button>
                            <button
                                className="button primary"
                                onClick={handleLevelDown}
                                disabled={isLevelingDown}
                                style={{ backgroundColor: isLevelingDown ? 'var(--text-muted)' : 'var(--error)' }}
                            >
                                {isLevelingDown ? 'Leveling Down...' : 'Confirm Level Down'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="sheet-grid">
                {/* Left Column: Stats & Saves */}
                <div className="sheet-column">
                    {/* Ability Scores */}
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ability Scores</h3>
                        <div>
                            {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => (
                                <div key={stat} className="ability-row">
                                    <div style={{ textAlign: 'center', width: '3rem' }}>
                                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{stat}</div>
                                        {editingAbility === stat ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="30"
                                                    value={abilityEditValue}
                                                    onChange={(e) => setAbilityEditValue(e.target.value)}
                                                    onBlur={() => saveAbilityScore(stat)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            saveAbilityScore(stat);
                                                        } else if (e.key === 'Escape') {
                                                            cancelEditingAbility();
                                                        }
                                                    }}
                                                    style={{
                                                        width: '2.5rem',
                                                        textAlign: 'center',
                                                        fontSize: '1.125rem',
                                                        fontWeight: 'bold',
                                                        padding: '0.125rem',
                                                        border: '1px solid var(--primary)',
                                                        borderRadius: '0.25rem',
                                                        backgroundColor: 'var(--surface)',
                                                        color: 'var(--text)'
                                                    }}
                                                    autoFocus
                                                />
                                            </div>
                                        ) : (
                                            <div 
                                                style={{ 
                                                    fontWeight: 'bold', 
                                                    fontSize: '1.125rem',
                                                    cursor: 'pointer',
                                                    padding: '0.25rem',
                                                    borderRadius: '0.25rem',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onClick={() => startEditingAbility(stat)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Click to edit"
                                            >
                                                {abilityScores[stat]}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.25rem', width: '3rem', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '0.25rem', padding: '0.25rem 0' }}>
                                        {formatMod(modifiers[stat])}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Saving Throws */}
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Saving Throws</h3>
                        <div>
                            {saves.map(save => (
                                <div key={save.stat} className="save-row">
                                    <span style={{ textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                        <span className="proficient-dot" style={{ backgroundColor: save.isProficient ? 'var(--primary)' : 'transparent', border: '1px solid var(--text-muted)' }}></span>
                                        {save.stat}
                                    </span>
                                    <span style={{ fontWeight: 'bold' }}>{formatMod(save.total)}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Middle Column: Skills & Health */}
                <div className="sheet-column">
                    {/* Health & Hit Dice */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <HPManager
                            characterId={character.id}
                            initialHP={data.hp || { current: 0, max: 0, temp: 0 }}
                            onUpdate={(newHP) => handleUpdateCharacter({ hp: newHP })}
                        />
                    </div>

                    {/* Attacks */}
                    <div style={{ marginBottom: '0.5rem' }}>
                        <CombatManager
                            equipment={equipment}
                            strMod={modifiers.str}
                            dexMod={modifiers.dex}
                            profBonus={pb}
                        />
                    </div>

                    {/* Actions & Bonus Actions */}
                    <div style={{ marginBottom: '1rem' }}>
                        <ActionManager
                            characterId={character.id}
                            initialActions={data.actions || []}
                            onUpdate={(updates) => handleUpdateCharacter(updates)}
                            equippedWeapons={equipment.filter(item => {
                                const itemObj = typeof item === 'string' ? { name: item } : item;
                                return itemObj.equipped && (itemObj.type === 'weapon' || itemObj.category === 'weapon');
                            })}
                        />
                    </div>

                    {/* Skills */}
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Skills</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', columnGap: '1rem', rowGap: '0.25rem' }}>
                            {skills.map(skill => (
                                <div key={skill.name} className="skill-row">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="proficient-dot" style={{ backgroundColor: skill.isProficient ? 'var(--primary)' : 'transparent', border: '1px solid var(--text-muted)' }}></span>
                                        {skill.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({skill.stat.toUpperCase()})</span>
                                    </span>
                                    <span style={{ fontWeight: 'bold' }}>{formatMod(skill.total)}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Right Column: Equipment & Spells */}
                <div className="sheet-column">
                    {/* Equipment */}
                    <div style={{ marginBottom: '1rem' }}>
                        <EquipmentManager
                            characterId={character.id}
                            initialEquipment={data.equipment || []}
                            onUpdate={(newEquipment) => {
                                handleUpdateCharacter({ equipment: newEquipment });
                                // Trigger AC recalculation by forcing a re-render
                                setCharacter((prev: any) => ({ ...prev }));
                            }}
                            onEquipChange={() => {
                                // Force re-render to recalculate AC
                                setCharacter((prev: any) => ({ ...prev }));
                            }}
                            abilityScores={abilityScores}
                            proficiencyBonus={pb}
                            existingActions={data.actions || []}
                            onCreateAction={async (action) => {
                                try {
                                    await api.post(`/characters/${character.id}/actions`, { action });
                                    const updatedChar = await api.get(`/characters/${character.id}`);
                                    setCharacter(updatedChar);
                                } catch (err) {
                                    console.error('Failed to create action', err);
                                    throw err;
                                }
                            }}
                        />
                    </div>

                    {/* Currency */}
                    <div style={{ marginBottom: '1rem' }}>
                        <CurrencyManager
                            characterId={character.id}
                            initialCurrency={data.currency}
                            onUpdate={(currency) => handleUpdateCharacter({ currency })}
                        />
                    </div>

                    {/* Features & Traits (Moved to Right Column) */}
                    <FeatureManager
                        characterId={character.id}
                        initialFeatures={data.features || []}
                        staticFeatures={[
                            ...(race.traits?.map((trait: string) => {
                                // Try exact match first, then try without parentheses content
                                const traitKey = trait;
                                const traitData = gameData.traits?.[traitKey] || 
                                    (trait.includes('(') ? gameData.traits?.[trait.split('(')[0].trim()] : undefined);
                                return {
                                    name: trait,
                                    source: 'Racial Trait',
                                    description: traitData?.description || `Racial trait: ${trait}`
                                };
                            }) || []),
                            ...(background.feature ? [{ name: background.feature.name, source: 'Background Feature', description: background.feature.description }] : [])
                        ]}
                        onUpdate={(newFeatures) => handleUpdateCharacter({ features: newFeatures })}
                    />
                </div>
            </div>
            {/* Spells Section (Full Width) */}
            {charClass.spellcaster && (
                <div style={{ marginTop: '2rem' }}>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                            <h2 className="heading" style={{ margin: 0, fontSize: '1.5rem' }}>Spellcasting</h2>
                            <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Ability</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase' }}>{charClass.spellcastingAbility}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Save DC</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{8 + pb + modifiers[charClass.spellcastingAbility]}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Attack Mod</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>+{pb + modifiers[charClass.spellcastingAbility]}</div>
                                </div>
                            </div>
                        </div>

                        <SpellManager
                            characterId={character.id}
                            classId={character.classId || charClass.id}
                            level={level}
                            initialSpells={data.spells || []}
                            initialSlotsUsed={data.spellSlotsUsed || {}}
                            spellcastingAbility={charClass.spellcastingAbility}
                            onUpdate={(updates) => handleUpdateCharacter(updates)}
                            existingActions={data.actions || []}
                            onCreateAction={async (action) => {
                                try {
                                    await api.post(`/characters/${character.id}/actions`, { action });
                                    const updatedChar = await api.get(`/characters/${character.id}`);
                                    setCharacter(updatedChar);
                                } catch (err) {
                                    console.error('Failed to create action', err);
                                    throw err;
                                }
                            }}
                            onDeleteAction={async (index) => {
                                try {
                                    await api.delete(`/characters/${character.id}/actions`, {
                                        data: { index }
                                    });
                                    const updatedChar = await api.get(`/characters/${character.id}`);
                                    setCharacter(updatedChar);
                                } catch (err) {
                                    console.error('Failed to delete action', err);
                                    throw err;
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

