'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';
import HPManager from './components/HPManager';
import HitDiceManager from './components/HitDiceManager';
import EquipmentManager from './components/EquipmentManager';
import LevelUpWizard from './components/LevelUpWizard';
import CombatManager from './components/CombatManager';
import ActionManager from './components/ActionManager';
import NotepadManager from './components/NotepadManager';
import PortraitUpload from './components/PortraitUpload';
import FeatureManager from './components/FeatureManager';
import CurrencyManager from './components/CurrencyManager';
import CharacterSheetSkeleton from './components/CharacterSheetSkeleton';
import { LongRestDialog, ShortRestDialog } from './components/RestDialogs';
import SheetTabs, { SheetTabId } from './components/SheetTabs';
import { getHpStatus } from '@/lib/hp';
import { planLongRest, planShortRest, RestContext } from '@/lib/rest';
import { downloadCharacterJson } from '@/lib/characterTransfer';
import { calculateArmorClass } from '@/lib/armorClass';
import { defaultSpeed, overrideToStore, resolveOverride } from '@/lib/sheetDefaults';
import { classColorStyle } from '@/lib/classColors';
import { CharacterItem, CharacterFeature } from '@/lib/types';
import { 
    calculateSpeedBonusFromFeatures, 
    getACCalculationFromFeatures,
    getAbilityScoreIncreasesFromFeatures,
    getSavingThrowProficienciesFromFeatures
} from '@/lib/featureStatModifiers';
import { isMasteryActionForWeapon } from '@/lib/weaponMastery';
import { getSkillProficienciesFromTraits } from '@/lib/racialTraitBonuses';
import { getRaceTraits, getBackgroundSkills, getSpeciesSpellEntries } from '@/lib/wizardReference';
import { useCharacterSheetData } from './useCharacterSheetData';
import { getCharacterSubclasses, getSubclassMap } from '@/lib/subclasses';
import { getChoiceSkillBonuses, getChoiceSpellIds, getWeaponMasteries } from '@/lib/classChoices';
import { Button, ConfirmDialog, describeError, EditableStat, Menu, Stat, useToast } from '@/app/components/ui';
import { getSpellcastingSetup } from '@/lib/spellcastingSetup';
import AcShield from './components/sections/AcShield';
import AbilityScoresCard from './components/sections/AbilityScoresCard';
import SavingThrowsCard from './components/sections/SavingThrowsCard';
import SkillsCard from './components/sections/SkillsCard';
import LanguagesCard from './components/sections/LanguagesCard';
import ClassResourcesSection from './components/sections/ClassResourcesSection';
import SpellcastingSection from './components/sections/SpellcastingSection';

export default function CharacterSheet() {
    const { id } = useParams();
    const {
        character,
        setCharacter,
        handleUpdateCharacter,
        persistData,
        gameData,
        classFeaturesList,
        subclassFeaturesList,
        loadError,
        reload
    } = useCharacterSheetData(id);
    const toast = useToast();
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showLevelDownConfirm, setShowLevelDownConfirm] = useState(false);
    const [isLevelingDown, setIsLevelingDown] = useState(false);
    const [showNotepad, setShowNotepad] = useState(false);
    const [restDialog, setRestDialog] = useState<'short' | 'long' | null>(null);
    const [resting, setResting] = useState(false);
    // Phone layout shows one section at a time (see SheetTabs)
    const [mobileTab, setMobileTab] = useState<SheetTabId>('combat');
    const sheetBodyRef = useRef<HTMLDivElement>(null);
    // Spell names for class-choice spells (Mystic Arcanum, Signature Spells), loaded only when needed
    const [choiceSpellNames, setChoiceSpellNames] = useState<Record<string, string> | null>(null);
    const choiceSpellIdsKey = getChoiceSpellIds(character?.data?.classChoices).join(',');
    useEffect(() => {
        if (!choiceSpellIdsKey) return;
        api.get('/reference/spells/summary')
            .then((list: { id: string; name: string }[]) => setChoiceSpellNames(Object.fromEntries((list || []).map(s => [s.id, s.name]))))
            .catch(() => setChoiceSpellNames({}));
    }, [choiceSpellIdsKey]);

    if (loadError) {
        return (
            <div className="card" role="alert" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ marginTop: 0 }}>{loadError}</p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button type="button" className="btn" onClick={reload}>Try again</button>
                    <Link href="/dashboard" className="btn btn-secondary">Back to My Characters</Link>
                </div>
            </div>
        );
    }

    if (!character || !gameData) {
        return <CharacterSheetSkeleton />;
    }

    // Validate character has required fields
    if (typeof character !== 'object') {
        return (
            <div className="card" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', marginTop: 0 }}>Invalid character data.</p>
                <Link href="/dashboard">Back to My Characters</Link>
            </div>
        );
    }

    // Safe accessors - API may return classId instead of class, or missing fields
    const primaryClass = (character.class || character.classId || 'fighter').toLowerCase?.() || 'fighter';
    const level = character.level ?? 1;
    const characterName = character.name ?? 'Unknown';

    const data = character.data || {};
    const raceId = (character.race || '').toLowerCase();
    const race = (gameData.races || []).find((r: any) => (r.id || '').toLowerCase() === raceId) || { name: character.race, traits: [] };
    
    // Handle multiclassing
    const classesData = data.classes || {};
    const hasMultipleClasses = Object.keys(classesData).length > 1 || (Object.keys(classesData).length === 0 && primaryClass);
    
    // Get all classes
    const characterClasses = Object.keys(classesData).length > 0 
        ? Object.entries(classesData).map(([classId, level]: [string, any]) => {
            const classInfo = (gameData.classes || []).find((c: any) => (c.id || '').toLowerCase() === (classId || '').toLowerCase()) || { name: classId };
            return { id: classId, name: classInfo.name, level, classInfo };
        })
        : (() => {
            const cls = character.class || character.classId || 'fighter';
            const primaryClassInfo = (gameData.classes || []).find((c: any) => (c.id || '').toLowerCase() === (cls || '').toLowerCase()) || { name: cls };
            return [{ id: (cls || '').toLowerCase(), name: cls, level: character.level || 1, classInfo: primaryClassInfo }];
        })();
    
    // Get full class info for primary class (for backward compatibility)
    const primaryClassId = characterClasses[0]?.id || (character.class || character.classId || 'fighter').toLowerCase();
    const charClass = (gameData.classes || []).find((c: any) => (c.id || '').toLowerCase() === primaryClassId) || { name: character.class || 'Unknown' };
    const bgId = (data.backgroundId || '').toLowerCase();
    const background = (gameData.backgrounds || []).find((b: any) => (b.id || '').toLowerCase() === bgId) || { name: 'Custom', feature: { name: 'Custom Feature', description: '' } };

    // Subclasses, one per class that has chosen one
    const classLevels: Record<string, number> = Object.fromEntries(characterClasses.map((c: any) => [String(c.id).toLowerCase(), Number(c.level) || 0]));
    const subclassMap = getSubclassMap(data, gameData.subclasses || [], primaryClass);
    const characterSubclasses = getCharacterSubclasses(subclassMap, classLevels, gameData.subclasses || []);
    const subclassFor = (classId: string) => characterSubclasses.find(s => s.classId === classId.toLowerCase());
    const subclass = subclassFor(primaryClassId)?.subclass ?? null;

    // Build class name display
    let classNameDisplay = '';
    if (hasMultipleClasses && characterClasses.length > 1) {
        // Main class first, then by level (stored class order isn't preserved by the database)
        const displayClasses = [...characterClasses].sort((a: any, b: any) =>
            (Number(b.id === primaryClass) - Number(a.id === primaryClass)) || (b.level - a.level));
        classNameDisplay = displayClasses.map(c => {
            const sub = subclassFor(c.id)?.subclass;
            return sub ? `${c.name} ${c.level} (${sub.name})` : `${c.name} ${c.level}`;
        }).join(' / ');
    } else {
        classNameDisplay = subclass ? `${charClass.name} (${subclass.name})` : charClass.name;
    }

    // Derived Stats (level already defined above)
    const pb = Math.ceil(level / 4) + 1;
    const mod = (score: number) => Math.floor((score - 10) / 2);
    const formatMod = (m: number) => m >= 0 ? `+${m}` : `${m}`;


    const rawScores = data.abilityScores || {};
    const abilityScores = {
        str: typeof rawScores.str === 'number' ? rawScores.str : 10,
        dex: typeof rawScores.dex === 'number' ? rawScores.dex : 10,
        con: typeof rawScores.con === 'number' ? rawScores.con : 10,
        int: typeof rawScores.int === 'number' ? rawScores.int : 10,
        wis: typeof rawScores.wis === 'number' ? rawScores.wis : 10,
        cha: typeof rawScores.cha === 'number' ? rawScores.cha : 10,
    };
    // Note: modifiers will be calculated after feature ability increases are applied

    // Features that affect stats: those stored on the character (feats, level-up features) plus the
    // class/subclass features for the current level, which aren't stored for level-1 characters.
    const allFeatures = [
        ...(Array.isArray(data.features) ? data.features : []),
        ...(classFeaturesList || []).map(f => ({ name: f.name, source: 'Class' })),
        ...(subclassFeaturesList || []).map(f => ({ name: f.name, source: 'Subclass' })),
    ];
    
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
    const equipment: (string | CharacterItem)[] = Array.isArray(data.equipment) ? data.equipment : [];
    const fightingStyles = (data.fightingStyles as string[] | undefined) || [];
    const { value: calculatedAC, parts: acParts } = calculateArmorClass({
        equipment,
        modifiers: effectiveModifiers,
        unarmoredMethod: getACCalculationFromFeatures(allFeatures, primaryClass),
        traits: (data.racialTraits && data.racialTraits.length > 0) ? data.racialTraits : (race?.traits || []),
        draconicResilience: subclassMap.sorcerer === 'draconic' && (classLevels.sorcerer ?? 0) >= 3,
        fightingStyles,
    });

    const acStat = resolveOverride(data.ac, calculatedAC);
    const ac = acStat.value;
    const acFormula = `${acParts.join(' + ')} = ${calculatedAC}`;
    const acDescription = acStat.overridden
        ? `Set manually. Calculated: ${acFormula}`
        : `AC: ${acFormula}`;
    
    // Speed: base speed (manual override or species default), then add feature bonuses
    const speedStat = resolveOverride(data.speed, defaultSpeed(race.speed, data.elvenLineage));
    const baseSpeed = speedStat.value;
    const speedBonus = calculateSpeedBonusFromFeatures(allFeatures, primaryClass, level);
    const speed = baseSpeed + speedBonus;
    
    // Store speedBonus for display
    const speedBonusDisplay = speedBonus;

    // Saving Throws - include feature-granted proficiencies
    const savingThrowProficiencies = getSavingThrowProficienciesFromFeatures(
        allFeatures,
        charClass?.savingThrows || []
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

    const canonTraits = getRaceTraits(character.race, data.elvenLineage, race, data.speciesLineage);
    const racialTraits = (data.racialTraits && data.racialTraits.length > 0)
        ? data.racialTraits
        : (canonTraits.length > 0 ? canonTraits : (race?.traits || []));
    const bgSkills = data.backgroundId ? getBackgroundSkills(data.backgroundId, background) : [];
    // Characters made before the 2024 update got Perception from Keen Senses automatically.
    const traitSkills = getSkillProficienciesFromTraits(racialTraits, { legacyKeenSenses: !data.keenSensesChoice });
    const baseSkills = [...bgSkills];
    for (const s of traitSkills) {
        if (!baseSkills.includes(s)) baseSkills.push(s);
    }
    const storedSkills = Array.isArray(data.skills) ? data.skills : [];
    const proficientSkills = [...baseSkills];
    for (const s of storedSkills) {
        if (!proficientSkills.includes(s)) proficientSkills.push(s);
    }

    const expertiseSkills = (data.expertise || []) as string[];
    // Divine Order: Thaumaturge / Primal Order: Magician add Wisdom to some Intelligence checks
    const choiceSkillBonuses = getChoiceSkillBonuses(data.classChoices, effectiveModifiers.wis);
    const skills = skillsList.map(skill => {
        const isProficient = proficientSkills.includes(skill.name);
        const hasExpertise = expertiseSkills.includes(skill.name);
        const proficiencyBonus = hasExpertise ? pb * 2 : (isProficient ? pb : 0);
        const total = effectiveModifiers[skill.stat] + proficiencyBonus + (choiceSkillBonuses[skill.name] || 0);
        return { ...skill, total, isProficient, hasExpertise };
    });

    // Weapons chosen for Weapon Mastery (null for characters from before the choice existed)
    const masteryWeapons = getWeaponMasteries(data.classChoices);

    const staticFeatureEntries = [
        ...(masteryWeapons && masteryWeapons.length > 0 ? [{
            name: 'Weapon Mastery Weapons',
            source: 'Class Choice',
            description: `You can use the mastery properties of: ${masteryWeapons.map(w => w.replace(/\b\w/g, c => c.toUpperCase())).join(', ')}.`
        }] : []),
        ...((racialTraits || []).map((trait: string) => {
            const traitKey = trait;
            const traitData = gameData.traits?.[traitKey] || 
                (trait.includes('(') ? gameData.traits?.[trait.split('(')[0].trim()] : undefined);
            return {
                name: trait,
                source: 'Racial Trait',
                description: traitData?.description || `Racial trait: ${trait}`
            };
        })),
        // 2024 backgrounds carry an "Origin Feat: X" stub as their feature; hide it once the feat itself is stored on the character.
        ...(background?.feature && !(
            background.originFeat &&
            String(background.feature.name || '').startsWith('Origin Feat:') &&
            (data.features || []).some((f: any) => f.featId === background.originFeat)
        ) ? [{ name: background.feature.name, source: 'Background Feature', description: background.feature.description }] : []),
        ...(classFeaturesList || []).map(f => ({
            name: f.name,
            source: f.source || `Class: ${charClass.name}`,
            description: f.description
        })),
        ...(subclassFeaturesList || []).map(f => ({
            name: f.name,
            source: f.source || (subclass ? `Subclass: ${subclass.name}` : 'Subclass'),
            description: f.description
        }))
    ];

    const staticFeatureNameSet = new Set(
        staticFeatureEntries
            .map(f => (f.name || '').toLowerCase())
            .filter(Boolean)
    );

    const filteredDynamicFeatures = (Array.isArray(data.features) ? data.features : []).filter((f: CharacterFeature) => {
        const nameKey = (f.name || '').toLowerCase();
        if (!nameKey) return true;
        const sourceKey = (f.source || '').toLowerCase();
        const isAutoSource = sourceKey.startsWith('class:') || sourceKey.startsWith('subclass:') || sourceKey === 'racial trait' || sourceKey === 'background feature';
        if (!isAutoSource) return true;
        return !staticFeatureNameSet.has(nameKey);
    });

    const handleAddLanguage = async (language: string) => {
        if (!language?.trim()) return;
        const currentLangs = Array.isArray(data.languages) ? data.languages : [];
        if (currentLangs.includes(language)) return;
        const updated = [...currentLangs, language];
        await persistData({ languages: updated }, "Couldn't add language");
    };

    const handleRemoveLanguage = async (language: string) => {
        const currentLangs = Array.isArray(data.languages) ? data.languages : [];
        const updated = currentLangs.filter((l: string) => l !== language);
        await persistData({ languages: updated }, "Couldn't remove language");
    };

    const handleToggleSkillProficiency = async (skillName: string) => {
        const isCurrentlyProficient = proficientSkills.includes(skillName);
        const currentStored = Array.isArray(data.skills) ? data.skills : [];

        let updatedStored: string[];
        if (isCurrentlyProficient) {
            updatedStored = currentStored.filter((s: string) => s !== skillName);
        } else {
            if (currentStored.includes(skillName)) return;
            updatedStored = [...currentStored, skillName];
        }

        const toPersist: string[] = [...baseSkills];
        for (const s of updatedStored) {
            if (!toPersist.includes(s)) toPersist.push(s);
        }

        await persistData({ skills: toPersist }, "Couldn't update skill proficiency");
    };

    const handleAbilityScoreChange = async (stat: string, newValue: number) => {
        if (newValue < 1 || newValue > 30) {
            toast.error('Ability scores must be between 1 and 30');
            return;
        }

        const updatedScores = { ...abilityScores, [stat]: newValue };
        await persistData({ abilityScores: updatedScores }, "Couldn't update ability score");
    };

    const handleLevelUpComplete = (updatedChar: any) => {
        setCharacter(updatedChar);
        setShowLevelUp(false);
    };

    const handleLevelDown = async () => {
        if (character.level <= 1) {
            toast.error('Cannot level down below level 1');
            return;
        }

        setIsLevelingDown(true);
        try {
            const updated = await api.post(`/characters/${character.id}/level-down`, {});
            setCharacter(updated);
            setShowLevelDownConfirm(false);
        } catch (err: any) {
            console.error('Failed to level down', err);
            toast.error(describeError("Couldn't level down", err));
        } finally {
            setIsLevelingDown(false);
        }
    };

    // Check if character has spellcasting from base class or subclass (Arcane Trickster, Eldritch Knight)
    const speciesSpells = getSpeciesSpellEntries(character.race, data.speciesLineage || data.elvenLineage);
    const hasMagicInitiateFeat = (data.features || []).some((f: any) => (f.name || '').toLowerCase() === 'magic initiate');
    const spellcasting = getSpellcastingSetup({
        characterClasses,
        gameClasses: gameData.classes || [],
        characterSubclasses,
        level,
        hasSpeciesSpells: speciesSpells.length > 0,
        hasMagicInitiateFeat,
        magicInitiateAbility: data.magicInitiate?.ability,
    });
    const hasSpellcasting = !!spellcasting;

    const hpForVitals = { current: 0, max: 0, temp: 0, ...(data.hp || {}) };
    const sheetTabs: { id: SheetTabId; label: string }[] = [
        { id: 'core', label: 'Core' },
        { id: 'combat', label: 'Combat' },
        ...(hasSpellcasting ? [{ id: 'spells' as const, label: 'Spells' }] : []),
        { id: 'gear', label: 'Gear' },
        { id: 'features', label: 'Features' },
    ];

    const exportJson = () => downloadCharacterJson(character);

    // One rest flow for the whole sheet (HP, Hit Dice, spell slots, class resources)
    const restContext: RestContext = {
        warlockLevel: classLevels.warlock ?? 0,
        multiclass: characterClasses.length > 1,
        hasMagicInitiateSpell: !!data.magicInitiate?.spell1,
    };

    const handleRest = async (kind: 'short' | 'long', hitDiceRolls: number[] = []) => {
        const plan = kind === 'long'
            ? planLongRest(data, restContext)
            : planShortRest(data, restContext, hitDiceRolls, effectiveModifiers.con);
        const label = kind === 'long' ? 'Long Rest' : 'Short Rest';
        setResting(true);
        try {
            let updated = character;
            // Class resources reset on the server first; the data PATCH then merges on top of it
            if (plan.resetsResources) {
                updated = await api.patch(`/characters/${character.id}/class-resources`, { resetType: kind });
            }
            if (Object.keys(plan.updates).length > 0) {
                updated = await api.patch(`/characters/${character.id}/data`, plan.updates);
            }
            setCharacter(updated);
            setRestDialog(null);
            toast.success(plan.summary.length > 0
                ? `${label} finished. ${plan.summary.join('. ')}.`
                : `${label} finished. Nothing needed recovering.`);
        } catch (err) {
            console.error(`Failed to take ${label}`, err);
            toast.error(describeError(`Couldn't finish the ${label}`, err));
            // Part of the rest may have been saved: resync with the server
            reload();
        } finally {
            setResting(false);
        }
    };

    return (
        <div className="sheet" style={{ marginBottom: '2rem', ...classColorStyle(primaryClass) }}>
            {/* Header */}
            <div className="sheet-header">
                <div style={{ flex: '1 1 auto', minWidth: 0, maxWidth: '100%', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <PortraitUpload
                        portrait={data.portrait ?? undefined}
                        name={characterName}
                        classId={primaryClass}
                        level={level}
                        onUpdate={async (dataUrl) => {
                            // null (not undefined) so removal survives JSON serialization
                            await persistData({ portrait: dataUrl }, "Couldn't save portrait");
                        }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href="/dashboard" className="no-print" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'inline-block' }}>&larr; My Characters</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <h1 className="heading" style={{ marginBottom: '0.25rem', flex: '1 1 auto', minWidth: 0, wordBreak: 'break-word' }}>{characterName}</h1>
                        <div className="sheet-actions no-print">
                            <Button variant="secondary" size="sm" onClick={() => setRestDialog('short')}>Short Rest</Button>
                            <Button variant="secondary" size="sm" onClick={() => setRestDialog('long')}>Long Rest</Button>
                            <Button size="sm" onClick={() => setShowLevelUp(true)}>Level Up</Button>
                            <Menu
                                label="⋯"
                                ariaLabel="More actions"
                                items={[
                                    { label: 'Notepad', onSelect: () => setShowNotepad(true) },
                                    { label: 'Export JSON', onSelect: exportJson },
                                    { label: 'Print / PDF', onSelect: () => window.print() },
                                    ...(character.level > 1 ? [{
                                        label: isLevelingDown ? 'Leveling down…' : 'Level Down…',
                                        onSelect: () => setShowLevelDownConfirm(true),
                                        danger: true,
                                        disabled: isLevelingDown,
                                        separatorBefore: true,
                                    }] : []),
                                ]}
                            />
                        </div>
                    </div>
                        <div className="sheet-meta">
                            <span>Level {level} {race.name}</span>
                            <span className="class-badge">{classNameDisplay}</span>
                            {background.name && <span>{background.name}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sheet-vitals">
                <div className="sheet-stats-row">
                    <Stat
                        label="HP"
                        className={`mobile-only hp-${getHpStatus(hpForVitals)}`}
                        value={`${hpForVitals.current}/${hpForVitals.max}`}
                        sublabel={hpForVitals.temp > 0 ? `+${hpForVitals.temp} temp` : undefined}
                    />
                    <Stat label="Prof Bonus" value={`+${pb}`} />
                    {/* Edits the base speed; feature bonuses are added on top */}
                    <EditableStat
                        label="Speed"
                        value={baseSpeed}
                        display={`${speed} ft.`}
                        sublabel={speedBonusDisplay > 0 ? `(+${speedBonusDisplay} from features)` : undefined}
                        description={speedStat.overridden ? `Set manually. Species default: ${speedStat.calculated} ft.` : undefined}
                        min={0}
                        max={200}
                        onSave={(value) => persistData({ speed: overrideToStore(value, speedStat.calculated) }, "Couldn't update speed")}
                        onReset={speedStat.overridden ? () => persistData({ speed: null }, "Couldn't reset speed") : undefined}
                        resetLabel={`Reset speed to ${speedStat.calculated} ft.`}
                    />
                    <Stat label="Initiative" value={formatMod(effectiveModifiers.dex)} />
                    <EditableStat
                        label="AC"
                        value={ac}
                        display={<AcShield value={ac} />}
                        description={acDescription}
                        sublabel={acStat.overridden ? 'set manually' : undefined}
                        min={0}
                        max={50}
                        highlight
                        onSave={(value) => persistData({ ac: overrideToStore(value, calculatedAC) }, "Couldn't update AC")}
                        onReset={acStat.overridden ? () => persistData({ ac: null }, "Couldn't reset AC") : undefined}
                        resetLabel={`Reset AC to calculated ${calculatedAC}`}
                    />
                </div>
            </div>

            {showNotepad && (
                <NotepadManager
                    initialPages={Array.isArray(data.notepad?.pages) ? data.notepad!.pages : ['']}
                    onClose={async (pages) => {
                        setShowNotepad(false);
                        const updates = { notepad: { pages } };
                        // Keep the notes on the page even if saving fails, so nothing typed is lost
                        handleUpdateCharacter(updates);
                        try {
                            await api.patch(`/characters/${character.id}/data`, updates);
                        } catch (err) {
                            console.error('Failed to save notepad', err);
                            toast.error(describeError("Couldn't save your notes. Open and close the notepad to retry", err));
                        }
                    }}
                />
            )}

            {showLevelUp && (
                <LevelUpWizard
                    character={{ ...character, classInfo: charClass }}
                    onComplete={handleLevelUpComplete}
                    onCancel={() => setShowLevelUp(false)}
                />
            )}

            {restDialog === 'short' && (
                <ShortRestDialog
                    data={data}
                    context={restContext}
                    conModifier={effectiveModifiers.con}
                    busy={resting}
                    onConfirm={(rolls) => handleRest('short', rolls)}
                    onCancel={() => setRestDialog(null)}
                />
            )}

            {restDialog === 'long' && (
                <LongRestDialog
                    data={data}
                    context={restContext}
                    busy={resting}
                    onConfirm={() => handleRest('long')}
                    onCancel={() => setRestDialog(null)}
                />
            )}

            {showLevelDownConfirm && (
                <ConfirmDialog
                    title={`Level down: ${character.level} → ${character.level - 1}?`}
                    confirmLabel="Level down"
                    danger
                    busy={isLevelingDown}
                    onConfirm={handleLevelDown}
                    onCancel={() => setShowLevelDownConfirm(false)}
                >
                    <p style={{ marginTop: 0 }}>This will:</p>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text)' }}>
                        <li>Reduce your level by 1</li>
                        <li>Remove HP gained at this level</li>
                        <li>Remove features gained at this level</li>
                        <li>Remove spells learned at this level</li>
                        <li>Reverse ability score improvements from this level</li>
                    </ul>
                    <p style={{ marginBottom: 0, color: 'var(--error)', fontWeight: 600 }}>
                        This can&apos;t be undone automatically.
                    </p>
                </ConfirmDialog>
            )}

            <div className="sheet-body" data-active-tab={mobileTab} ref={sheetBodyRef}>
            <div className="sheet-grid">
                {/* Left Column: Core Stats */}
                <div className="sheet-column">
                    <div data-tab="core">
                        <AbilityScoresCard scores={abilityScores} modifiers={effectiveModifiers} onChange={handleAbilityScoreChange} />
                    </div>
                    <div data-tab="core">
                        <SavingThrowsCard saves={saves} />
                    </div>
                    <div data-tab="core">
                        <SkillsCard skills={skills} onToggleProficiency={handleToggleSkillProficiency} />
                    </div>
                </div>

                {/* Middle Column: Combat & Resources */}
                <div className="sheet-column">
                    {/* Health */}
                    <div data-tab="combat">
                        <HPManager
                            characterId={character.id}
                            initialHP={data.hp || { current: 0, max: 0, temp: 0 }}
                            onUpdate={(newHP) => handleUpdateCharacter({ hp: newHP })}
                        />
                    </div>

                    {/* Hit Dice */}
                    <div data-tab="combat">
                        <HitDiceManager
                            hitDice={data.hitDice}
                            onShortRest={() => setRestDialog('short')}
                        />
                    </div>

                    {/* Class Resources */}
                    <div data-tab="combat">
                        <ClassResourcesSection
                            characterId={character.id}
                            data={data}
                            classLevels={classLevels}
                            subclassMap={subclassMap}
                            abilityScores={abilityScores}
                            racialTraits={racialTraits}
                            level={level}
                            choiceSpellNames={choiceSpellNames}
                            hasChoiceSpells={!!choiceSpellIdsKey}
                            onUpdate={handleUpdateCharacter}
                        />
                    </div>

                    {/* Attacks */}
                    <div data-tab="combat">
                        <CombatManager
                            equipment={equipment}
                            strMod={effectiveModifiers.str}
                            dexMod={effectiveModifiers.dex}
                            profBonus={pb}
                            fightingStyles={fightingStyles}
                            rogueLevel={characterClasses.find((c: any) => c.id === 'rogue')?.level}
                        />
                    </div>

                    {/* Actions & Bonus Actions */}
                    <div data-tab="combat" className="sheet-column-fill">
                        <ActionManager
                            characterId={character.id}
                            initialActions={Array.isArray(data.actions) ? data.actions : []}
                            onUpdate={(updates) => handleUpdateCharacter(updates)}
                            featureActions={undefined}
                        />
                    </div>
                </div>

                {/* Right Column: Equipment & Features */}
                <div className="sheet-column">
                    {/* Equipment */}
                    <div data-tab="gear">
                        <EquipmentManager
                            characterId={character.id}
                            masteryWeapons={masteryWeapons}
                            initialEquipment={data.equipment || []}
                            onUpdate={(newEquipment) => {
                                handleUpdateCharacter({ equipment: newEquipment });
                                setCharacter((prev: any) => ({ ...prev }));
                            }}
                            onEquipChange={() => setCharacter((prev: any) => ({ ...prev }))}
                            abilityScores={abilityScores}
                            proficiencyBonus={pb}
                            existingActions={Array.isArray(data.actions) ? data.actions : []}
                            onCreateAction={async (action) => {
                                try {
                                    const updatedChar = await api.post(`/characters/${character.id}/actions`, { action });
                                    setCharacter(updatedChar);
                                } catch (err) {
                                    console.error('Failed to create action', err);
                                    throw err;
                                }
                            }}
                            hasWeaponMastery={(classFeaturesList || []).some(f => f.name === 'Weapon Mastery')}
                            onDeleteMasteryActionsForWeapon={async (weaponName) => {
                                const actions = (Array.isArray(data.actions) ? data.actions : []) as { name: string }[];
                                const toRemove = actions
                                    .map((a, i) => ({ index: i, name: a.name }))
                                    .filter(a => isMasteryActionForWeapon(a.name, weaponName))
                                    .sort((a, b) => b.index - a.index);
                                let updatedChar: any = null;
                                for (const { index, name } of toRemove) {
                                    updatedChar = await api.delete(`/characters/${character.id}/actions`, { data: { index, name } });
                                }
                                if (updatedChar) setCharacter(updatedChar);
                            }}
                        />
                    </div>

                    {/* Currency */}
                    <div data-tab="gear">
                        <CurrencyManager
                            characterId={character.id}
                            initialCurrency={data.currency}
                            onUpdate={(currency) => handleUpdateCharacter({ currency })}
                        />
                    </div>

                    {/* Features & Traits */}
                    <div data-tab="features" className="sheet-column-fill">
                        <FeatureManager
                            characterId={character.id}
                            initialFeatures={filteredDynamicFeatures}
                            staticFeatures={staticFeatureEntries}
                            onUpdate={(newFeatures) => handleUpdateCharacter({ features: newFeatures })}
                        />
                    </div>

                    {/* Languages */}
                    <div data-tab="features">
                        <LanguagesCard
                            languages={Array.isArray(data.languages) ? data.languages : []}
                            onAdd={handleAddLanguage}
                            onRemove={handleRemoveLanguage}
                        />
                    </div>
                </div>
            </div>
            {spellcasting && (
                <div data-tab="spells" style={{ marginTop: 'var(--space-4)' }}>
                    <SpellcastingSection
                        character={character}
                        setup={spellcasting}
                        level={level}
                        proficiencyBonus={pb}
                        modifiers={effectiveModifiers}
                        abilityScores={effectiveAbilityScores}
                        gameClasses={gameData.classes || []}
                        speciesSpells={speciesSpells}
                        hasMagicInitiateFeat={hasMagicInitiateFeat}
                        setCharacter={setCharacter}
                        onUpdate={handleUpdateCharacter}
                    />
                </div>
            )}
            </div>

            <SheetTabs
                tabs={sheetTabs}
                active={mobileTab}
                onChange={(tab) => {
                    setMobileTab(tab);
                    // Start the new section at the top, just below the pinned vitals
                    const body = sheetBodyRef.current;
                    if (body && body.getBoundingClientRect().top < 0) body.scrollIntoView({ block: 'start' });
                }}
            />
        </div>
    );
}

