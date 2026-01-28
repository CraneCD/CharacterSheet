'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';
import HPManager from './components/HPManager';
import HitDiceManager from './components/HitDiceManager';
import ClassResourcesManager from './components/ClassResourcesManager';
import EquipmentManager from './components/EquipmentManager';
import SpellManager from './components/SpellManager';
import LevelUpWizard from './components/LevelUpWizard';
import CombatManager from './components/CombatManager';
import ActionManager from './components/ActionManager';
import FeatureManager from './components/FeatureManager';
import CurrencyManager from './components/CurrencyManager';
import { CharacterData, CharacterItem, CharacterFeature } from '@/lib/types';
import { calculateClassResources } from '@/lib/classResources';
import { 
    calculateSpeedBonusFromFeatures, 
    getACCalculationFromFeatures,
    getAbilityScoreIncreasesFromFeatures,
    getSavingThrowProficienciesFromFeatures
} from '@/lib/featureStatModifiers';
import { isMasteryActionForWeapon } from '@/lib/weaponMastery';
import { getSkillProficienciesFromTraits } from '@/lib/racialTraitBonuses';

interface GameData {
    races: any[];
    classes: any[];
    backgrounds: any[];
    subclasses: any[];
    traits?: { [key: string]: { name: string; description: string } };
}

interface ClassFeature {
    level: number;
    name: string;
    description: string;
}

export default function CharacterSheet() {
    const { id } = useParams();
    const router = useRouter();
    const [character, setCharacter] = useState<any>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [classFeaturesList, setClassFeaturesList] = useState<ClassFeature[]>([]);
    const [subclassFeaturesList, setSubclassFeaturesList] = useState<ClassFeature[]>([]);
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

    // Load class and subclass features when character data is available
    useEffect(() => {
        if (!character || !gameData) return;

        const loadFeatures = async () => {
            try {
                const data = character.data || {};
                const classesData = data.classes || {};
                
                // Get all classes
                const characterClasses = Object.keys(classesData).length > 0 
                    ? Object.entries(classesData).map(([classId, level]: [string, any]) => ({ id: classId, level }))
                    : [{ id: character.class.toLowerCase(), level: character.level }];
                
                // Load features for all classes
                const allClassFeatures: ClassFeature[] = [];
                for (const cls of characterClasses) {
                    try {
                        const classFeatures: ClassFeature[] = await api.get(`/reference/class-features/${cls.id}`);
                        // Filter features up to class level
                        const featuresForClass = classFeatures.filter(f => f.level <= cls.level);
                        allClassFeatures.push(...featuresForClass);
                    } catch (err) {
                        console.error(`Failed to load features for ${cls.id}`, err);
                    }
                }
                
                setClassFeaturesList(allClassFeatures);

                // Load subclass features if character has a subclass (for now, only primary class)
                if (data.subclassId) {
                    const subclass = gameData.subclasses.find((s: any) => s.id === data.subclassId);
                    if (subclass) {
                        const primaryClassLevel = characterClasses[0]?.level || character.level;
                        // Filter subclass features up to primary class level
                        const availableSubclassFeatures = subclass.features.filter((f: ClassFeature) => f.level <= primaryClassLevel);
                        setSubclassFeaturesList(availableSubclassFeatures);
                    } else {
                        setSubclassFeaturesList([]);
                    }
                } else {
                    setSubclassFeaturesList([]);
                }
            } catch (err) {
                console.error('Failed to load class features', err);
                setClassFeaturesList([]);
                setSubclassFeaturesList([]);
            }
        };

        loadFeatures();
    }, [character, gameData]);

    if (!character || !gameData) return <div className="p-8 text-center">Loading character sheet...</div>;

    const data = character.data;
    const race = gameData.races.find(r => r.id === character.race) || { name: character.race, traits: [] };
    
    // Handle multiclassing
    const classesData = data.classes || {};
    const hasMultipleClasses = Object.keys(classesData).length > 1 || (Object.keys(classesData).length === 0 && character.class);
    
    // Get all classes
    const characterClasses = Object.keys(classesData).length > 0 
        ? Object.entries(classesData).map(([classId, level]: [string, any]) => {
            const classInfo = gameData.classes.find(c => c.id.toLowerCase() === classId.toLowerCase()) || { name: classId };
            return { id: classId, name: classInfo.name, level, classInfo };
        })
        : (() => {
            const primaryClassInfo = gameData.classes.find(c => c.id.toLowerCase() === character.class.toLowerCase()) || { name: character.class };
            return [{ id: character.class.toLowerCase(), name: character.class, level: character.level, classInfo: primaryClassInfo }];
        })();
    
    // Get full class info for primary class (for backward compatibility)
    const primaryClassId = characterClasses[0]?.id || character.class.toLowerCase();
    const charClass = gameData.classes.find(c => c.id.toLowerCase() === primaryClassId) || { name: character.class };
    // Fallback for background if ID or full object is customized
    const background = gameData.backgrounds.find(b => b.id === data.backgroundId) || { name: 'Custom', feature: { name: 'Custom Feature', description: '' } };

    // Subclass (for now, only primary class can have subclass)
    const subclass = data.subclassId ? gameData.subclasses.find((s: any) => s.id === data.subclassId) : null;
    
    // Build class name display
    let classNameDisplay = '';
    if (hasMultipleClasses && characterClasses.length > 1) {
        classNameDisplay = characterClasses.map(c => `${c.name} ${c.level}`).join(' / ');
    } else {
        classNameDisplay = subclass ? `${charClass.name} (${subclass.name})` : charClass.name;
    }

    // Derived Stats
    const level = character.level;
    const pb = Math.ceil(level / 4) + 1;
    const mod = (score: number) => Math.floor((score - 10) / 2);
    const formatMod = (m: number) => m >= 0 ? `+${m}` : `${m}`;


    const abilityScores = data.abilityScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    // Note: modifiers will be calculated after feature ability increases are applied

    // Get all features
    const allFeatures = data.features || [];
    
    // Get ability score increases from features
    const featureAbilityIncreases = getAbilityScoreIncreasesFromFeatures(allFeatures);
    const effectiveAbilityScores = {
        str: abilityScores.str + (featureAbilityIncreases.str || 0),
        dex: abilityScores.dex + (featureAbilityIncreases.dex || 0),
        con: abilityScores.con + (featureAbilityIncreases.con || 0),
        int: abilityScores.int + (featureAbilityIncreases.int || 0),
        wis: abilityScores.wis + (featureAbilityIncreases.wis || 0),
        cha: abilityScores.cha + (featureAbilityIncreases.cha || 0),
    };
    const effectiveModifiers: any = {
        str: mod(effectiveAbilityScores.str),
        dex: mod(effectiveAbilityScores.dex),
        con: mod(effectiveAbilityScores.con),
        int: mod(effectiveAbilityScores.int),
        wis: mod(effectiveAbilityScores.wis),
        cha: mod(effectiveAbilityScores.cha),
    };

    // Calculate AC (use manual override if set, otherwise calculate)
    const acCalculationMethod = getACCalculationFromFeatures(allFeatures, character.class.toLowerCase());
    let calculatedAC = 10 + effectiveModifiers.dex;

    // Check equipped items
    const equipment: (string | CharacterItem)[] = data.equipment || [];
    const equippedItems = equipment
        .map(item => (typeof item === 'string' ? { name: item } : item))
        .filter(item => item.equipped);

    const armor = equippedItems.find(i => (i.category === 'armor' || i.type === 'armor'));
    const shield = equippedItems.find(i => (i.category === 'shield' || i.type === 'shield'));

    // Check if unarmored (no armor equipped)
    const isUnarmored = !armor;

    if (armor && armor.baseAC) {
        if (armor.armorMethod === 'heavy') {
            calculatedAC = armor.baseAC;
        } else if (armor.armorMethod === 'medium') {
            calculatedAC = armor.baseAC + Math.min(effectiveModifiers.dex, 2);
        } else {
            // Light or undefined -> Base + Dex
            calculatedAC = armor.baseAC + effectiveModifiers.dex;
        }
    } else {
        // Unarmored Defense calculations
        if (acCalculationMethod === 'unarmored-monk' && isUnarmored && !shield) {
            calculatedAC = 10 + effectiveModifiers.dex + effectiveModifiers.wis;
        } else if (acCalculationMethod === 'unarmored-barbarian' && isUnarmored) {
            calculatedAC = 10 + effectiveModifiers.dex + effectiveModifiers.con;
        } else {
            // Standard unarmored: 10 + Dex
            calculatedAC = 10 + effectiveModifiers.dex;
        }
    }

    if (shield && shield.baseAC) {
        calculatedAC += shield.baseAC;
    } else if (shield) {
        calculatedAC += 2;
    }

    // Defense fighting style: +1 AC while wearing armor
    const fightingStyles = (data.fightingStyles as string[] | undefined) || [];
    if (armor && fightingStyles.includes('defense')) {
        calculatedAC += 1;
    }

    const ac = data.ac !== undefined ? data.ac : calculatedAC;
    
    // Speed: calculate base speed, then add feature bonuses
    const baseSpeed = data.speed !== undefined ? data.speed : (race.speed || 30);
    const speedBonus = calculateSpeedBonusFromFeatures(allFeatures, character.class.toLowerCase(), level);
    const speed = baseSpeed + speedBonus;
    
    // Store speedBonus for display
    const speedBonusDisplay = speedBonus;

    // Saving Throws - include feature-granted proficiencies
    const savingThrowProficiencies = getSavingThrowProficienciesFromFeatures(
        allFeatures,
        charClass.savingThrows || []
    );
    const saves = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => {
        const isProficient = savingThrowProficiencies.includes(stat);
        const total = effectiveModifiers[stat] + (isProficient ? pb : 0);
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

    const definedSkills = data.skills || [];
    const baseProficient = definedSkills.length > 0 ? definedSkills : (background?.skillProficiencies || []);
    const traitSkills = getSkillProficienciesFromTraits(race?.traits || []);
    const proficientSkills = [...baseProficient];
    for (const s of traitSkills) {
        if (!proficientSkills.includes(s)) proficientSkills.push(s);
    }

    const skills = skillsList.map(skill => {
        const isProficient = proficientSkills.includes(skill.name);
        const total = effectiveModifiers[skill.stat] + (isProficient ? pb : 0);
        return { ...skill, total, isProficient };
    });

    const handleUpdateCharacter = (updates: Partial<CharacterData>) => {
        setCharacter((prev: any) => ({
            ...prev,
            data: { ...prev.data, ...updates }
        }));
    };

    const handleToggleSkillProficiency = async (skillName: string) => {
        const currentSkills = data.skills || [];
        const isCurrentlyProficient = currentSkills.includes(skillName);
        
        let updatedSkills: string[];
        if (isCurrentlyProficient) {
            // Remove proficiency
            updatedSkills = currentSkills.filter((s: string) => s !== skillName);
        } else {
            // Add proficiency
            updatedSkills = [...currentSkills, skillName];
        }

        try {
            await api.put(`/characters/${character.id}`, {
                ...character,
                data: { ...character.data, skills: updatedSkills }
            });
            handleUpdateCharacter({ skills: updatedSkills });
        } catch (err) {
            console.error('Failed to update skill proficiency', err);
            alert('Failed to update skill proficiency');
        }
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
        if (!isNaN(value) && abilityEditValue.trim() !== '') {
            handleAbilityScoreChange(stat, value);
        } else {
            // Restore original value if empty or invalid
            setAbilityEditValue(abilityScores[stat].toString());
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
        if (!isNaN(value) && speedEditValue.trim() !== '') {
            handleSpeedChange(value);
        } else {
            // Restore original value if empty or invalid
            setSpeedEditValue(speed.toString());
            setEditingSpeed(false);
        }
    };

    const saveAC = () => {
        const value = parseInt(acEditValue);
        if (!isNaN(value) && acEditValue.trim() !== '') {
            handleACChange(value);
        } else {
            // Restore original value if empty or invalid
            setAcEditValue(ac.toString());
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
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={speedEditValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // Allow empty string or valid numbers
                                    if (val === '' || /^\d+$/.test(val)) {
                                        setSpeedEditValue(val);
                                    }
                                }}
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
                                <div>
                                    {speed} ft.
                                    {speedBonusDisplay > 0 && (
                                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginLeft: '0.25rem', display: 'block' }}>
                                            (+{speedBonusDisplay} from features)
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="stat-box">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Initiative</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMod(effectiveModifiers.dex)}</div>
                    </div>
                    <div className="stat-box highlight">
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase' }}>AC</div>
                        {editingAC ? (
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={acEditValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // Allow empty string or valid numbers
                                    if (val === '' || /^\d+$/.test(val)) {
                                        setAcEditValue(val);
                                    }
                                }}
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

            <div className="sheet-grid" style={{ gap: '1rem' }}>
                {/* Left Column: Core Stats */}
                <div className="sheet-column">
                    {/* Ability Scores */}
                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ability Scores</h3>
                        <div>
                            {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => (
                                <div key={stat} className="ability-row">
                                    <div style={{ textAlign: 'center', width: '3rem' }}>
                                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{stat}</div>
                                        {editingAbility === stat ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    value={abilityEditValue}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        // Allow empty string or valid numbers
                                                        if (val === '' || /^\d+$/.test(val)) {
                                                            setAbilityEditValue(val);
                                                        }
                                                    }}
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
                                        {formatMod(effectiveModifiers[stat])}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Saving Throws */}
                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Saving Throws</h3>
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

                    {/* Skills */}
                    <div className="card">
                        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Skills</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', columnGap: '1rem', rowGap: '0.25rem' }}>
                            {skills.map(skill => (
                                <div key={skill.name} className="skill-row">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <span 
                                            className="proficient-dot" 
                                            onClick={() => handleToggleSkillProficiency(skill.name)}
                                            style={{ 
                                                backgroundColor: skill.isProficient ? 'var(--primary)' : 'transparent', 
                                                border: '1px solid var(--text-muted)',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s'
                                            }}
                                            title={skill.isProficient ? 'Click to remove proficiency' : 'Click to add proficiency'}
                                        ></span>
                                        {skill.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({skill.stat.toUpperCase()})</span>
                                    </span>
                                    <span style={{ fontWeight: 'bold' }}>{formatMod(skill.total)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Column: Combat & Resources */}
                <div className="sheet-column">
                    {/* Health */}
                    <div style={{ marginBottom: '1rem' }}>
                        <HPManager
                            characterId={character.id}
                            initialHP={data.hp || { current: 0, max: 0, temp: 0 }}
                            onUpdate={(newHP) => handleUpdateCharacter({ hp: newHP })}
                        />
                    </div>

                    {/* Hit Dice */}
                    <div style={{ marginBottom: '1rem' }}>
                        <HitDiceManager
                            characterId={character.id}
                            initialHitDice={data.hitDice}
                            onUpdate={(newHitDice) => handleUpdateCharacter({ hitDice: newHitDice })}
                            conModifier={effectiveModifiers.con}
                        />
                    </div>

                    {/* Class Resources */}
                    {(() => {
                        // Initialize resources for existing characters that don't have them
                        let resources = data.classResources;
                        if (!resources || Object.keys(resources).length === 0) {
                            resources = calculateClassResources(character.class.toLowerCase(), level, abilityScores, data.subclassId);
                            if (Object.keys(resources).length > 0) {
                                setTimeout(() => handleUpdateCharacter({ classResources: resources }), 0);
                            }
                        } else if (
                            character.class.toLowerCase() === 'fighter' &&
                            data.subclassId === 'gunslinger' &&
                            level >= 3 &&
                            !resources['Grit Points']
                        ) {
                            // Patch: add Grit Points for existing Gunslingers who have resources but no Grit
                            const withGrit = calculateClassResources(character.class.toLowerCase(), level, abilityScores, data.subclassId);
                            if (withGrit['Grit Points']) {
                                resources = { ...resources, 'Grit Points': withGrit['Grit Points'] };
                                setTimeout(() => handleUpdateCharacter({ classResources: resources }), 0);
                            }
                        }
                        
                        return (
                            <div style={{ marginBottom: '1rem' }}>
                                <ClassResourcesManager
                                    characterId={character.id}
                                    initialResources={resources}
                                    onUpdate={(newResources) => handleUpdateCharacter({ classResources: newResources })}
                                    onShortRest={() => {
                                        // Also reset hit dice on short rest if needed
                                    }}
                                    onLongRest={() => {
                                        // Also reset hit dice on long rest
                                    }}
                                />
                            </div>
                        );
                    })()}

                    {/* Attacks */}
                    <div style={{ marginBottom: '1rem' }}>
                        <CombatManager
                            equipment={equipment}
                            strMod={effectiveModifiers.str}
                            dexMod={effectiveModifiers.dex}
                            profBonus={pb}
                            fightingStyles={fightingStyles}
                        />
                    </div>

                    {/* Actions & Bonus Actions */}
                    <div>
                        <ActionManager
                            characterId={character.id}
                            initialActions={data.actions || []}
                            onUpdate={(updates) => handleUpdateCharacter(updates)}
                        />
                    </div>
                </div>

                {/* Right Column: Equipment & Features */}
                <div className="sheet-column">
                    {/* Equipment */}
                    <div style={{ marginBottom: '1rem' }}>
                        <EquipmentManager
                            characterId={character.id}
                            initialEquipment={data.equipment || []}
                            onUpdate={(newEquipment) => {
                                handleUpdateCharacter({ equipment: newEquipment });
                                setCharacter((prev: any) => ({ ...prev }));
                            }}
                            onEquipChange={() => setCharacter((prev: any) => ({ ...prev }))}
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
                            hasWeaponMastery={classFeaturesList.some(f => f.name === 'Weapon Mastery')}
                            onDeleteMasteryActionsForWeapon={async (weaponName) => {
                                const actions = (data.actions || []) as { name: string }[];
                                const indices = actions
                                    .map((a, i) => (isMasteryActionForWeapon(a.name, weaponName) ? i : -1))
                                    .filter(i => i >= 0)
                                    .sort((a, b) => b - a);
                                for (const idx of indices) {
                                    await api.delete(`/characters/${character.id}/actions`, { data: { index: idx } });
                                }
                                if (indices.length > 0) {
                                    const updatedChar = await api.get(`/characters/${character.id}`);
                                    setCharacter(updatedChar);
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

                    {/* Features & Traits */}
                    <div>
                        <FeatureManager
                            characterId={character.id}
                            initialFeatures={(data.features || []).filter((f: CharacterFeature) => {
                                // Filter out subclass features that are already shown as static features
                                // to avoid duplicates
                                if (subclass && f.source?.startsWith('Subclass:')) {
                                    const staticSubclassFeatureNames = new Set(
                                        subclassFeaturesList.map(sf => sf.name.toLowerCase())
                                    );
                                    return !staticSubclassFeatureNames.has(f.name.toLowerCase());
                                }
                                return true;
                            })}
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
                                ...(background.feature ? [{ name: background.feature.name, source: 'Background Feature', description: background.feature.description }] : []),
                                // Add class features
                                ...classFeaturesList.map(f => ({
                                    name: f.name,
                                    source: `Class: ${charClass.name}`,
                                    description: f.description
                                })),
                                // Add subclass features
                                ...subclassFeaturesList.map(f => ({
                                    name: f.name,
                                    source: subclass ? `Subclass: ${subclass.name}` : 'Subclass',
                                    description: f.description
                                }))
                            ]}
                            onUpdate={(newFeatures) => handleUpdateCharacter({ features: newFeatures })}
                        />
                    </div>
                </div>
            </div>
            {/* Spells Section (Full Width) */}
            {(() => {
                // Check if character has any spellcasting classes
                const hasSpellcasting = characterClasses.some(c => {
                    const clsInfo = gameData.classes.find(gc => gc.id.toLowerCase() === c.id.toLowerCase());
                    return clsInfo?.spellcaster;
                });
                
                if (!hasSpellcasting) return null;
                
                // Get primary spellcasting class (first spellcasting class, or highest level)
                const spellcastingClasses = characterClasses
                    .map(c => ({
                        ...c,
                        classInfo: gameData.classes.find(gc => gc.id.toLowerCase() === c.id.toLowerCase())
                    }))
                    .filter(c => c.classInfo?.spellcaster && c.id.toLowerCase() !== 'warlock')
                    .sort((a, b) => b.level - a.level);
                
                const primarySpellcastingClass = spellcastingClasses[0];
                if (!primarySpellcastingClass) return null;
                
                const primarySpellcastingAbility = primarySpellcastingClass.classInfo?.spellcastingAbility || 'int';
                
                return (
                    <div style={{ marginTop: '1rem' }}>
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <h2 className="heading" style={{ margin: 0, fontSize: '1.5rem' }}>Spellcasting</h2>
                                <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Ability</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase' }}>
                                            {primarySpellcastingAbility}
                                            {spellcastingClasses.length > 1 && (
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                                    ({spellcastingClasses.map(sc => sc.classInfo?.spellcastingAbility?.toUpperCase()).filter((v, i, a) => a.indexOf(v) === i).join('/')})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Save DC</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{8 + pb + effectiveModifiers[primarySpellcastingAbility]}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Attack Mod</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>+{pb + effectiveModifiers[primarySpellcastingAbility]}</div>
                                    </div>
                                </div>
                            </div>

                            <SpellManager
                                characterId={character.id}
                                classId={character.classId || primarySpellcastingClass.id}
                                level={level}
                                initialSpells={data.spells || []}
                                initialSlotsUsed={data.spellSlotsUsed || {}}
                                spellcastingAbility={primarySpellcastingAbility}
                                preparedCaster={primarySpellcastingClass.classInfo?.preparedCaster || false}
                                abilityScores={effectiveAbilityScores}
                                classes={data.classes}
                                allClasses={gameData.classes}
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
                );
            })()}
        </div>
    );
}

