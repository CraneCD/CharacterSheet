'use client';

import { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';
import { Subclass, Feat as FeatRecord } from '@/lib/types';
import { getSubclassMap, updateAllClassResources } from '@/lib/subclasses';
import { getAbilityScoreIncreasesFromFeatures } from '@/lib/featureStatModifiers';
import { getBackgroundSkills, STANDARD_LANGUAGES } from '@/lib/wizardReference';
import { buildChoicePayload, getClassChoices } from '@/lib/classChoices';
import ClassChoicesPicker, { ChoiceSpell, choicesComplete } from './ClassChoicesPicker';
import { getSkillProficienciesFromTraits } from '@/lib/racialTraitBonuses';
import { describeError, Modal, useToast } from '@/app/components/ui';

interface LevelUpWizardProps {
    character: any;
    onComplete: (updatedCharacter: any) => void;
    onCancel: () => void;
}

interface ClassFeature {
    level: number;
    name: string;
    description: string;
}

type Feat = FeatRecord;

const ABILITY_LABELS: Record<string, string> = {
    str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma'
};

/** Whether this level-up grants a Fighting Style, and optional restricted options (e.g. College of Swords). */
export function getFightingStyleForLevel(
    classId: string,
    classLevel: number,
    effectiveSubclassId: string | undefined
): { needed: boolean; options?: string[] } {
    if ((classId === 'ranger' && classLevel === 2) || (classId === 'paladin' && classLevel === 2)) {
        return { needed: true };
    }
    // 2024 Champion: Additional Fighting Style at Fighter level 7
    if (effectiveSubclassId === 'champion' && classId === 'fighter' && classLevel === 7) {
        return { needed: true };
    }
    // Legacy College of Swords: Dueling or Two-Weapon Fighting at Bard level 3
    if (effectiveSubclassId === 'swords' && classId === 'bard' && classLevel === 3) {
        return { needed: true, options: ['dueling', 'two-weapon-fighting'] };
    }
    return { needed: false };
}

/** Classes whose Fighting Style feature (at these class levels) unlocks Fighting Style feats. */
const FIGHTING_STYLE_FROM_LEVEL: Record<string, number> = { fighter: 1, paladin: 2, ranger: 2 };

/**
 * 2024 feat eligibility for a level-up. `classLevels` is the character's class
 * levels after this level-up; `characterLevel` is the new total level.
 */
export function isFeatAvailable(
    feat: Feat,
    ctx: {
        characterLevel: number;
        classLevels: Record<string, number>;
        abilityScores: Record<string, number>;
        race: string;
        armorTraining: string[];
        takenFeatIds: string[];
    }
): boolean {
    if (feat.legacy) return false;
    // Taken through the ASI option instead
    if (feat.id === 'ability-score-improvement') return false;
    if (ctx.takenFeatIds.includes(feat.id) && !feat.repeatable) return false;
    const pre = feat.prerequisites || {};
    if (pre.level && ctx.characterLevel < pre.level) return false;
    if (feat.category === 'epic-boon' && ctx.characterLevel < 19) return false;
    if (feat.category === 'general' && ctx.characterLevel < 4) return false;
    if (pre.abilityScore) {
        for (const [ability, min] of Object.entries(pre.abilityScore)) {
            if ((ctx.abilityScores[ability] || 0) < min) return false;
        }
    }
    if (pre.abilityScoreAny) {
        if (!Object.entries(pre.abilityScoreAny).some(([ability, min]) => (ctx.abilityScores[ability] || 0) >= min)) return false;
    }
    if (pre.race && pre.race.length > 0 && !pre.race.some(r => ctx.race.toLowerCase().includes(r.toLowerCase()))) return false;
    if (feat.category === 'fighting-style') {
        const ok = Object.entries(ctx.classLevels).some(([cid, lvl]) => FIGHTING_STYLE_FROM_LEVEL[cid] !== undefined && lvl >= FIGHTING_STYLE_FROM_LEVEL[cid]);
        if (!ok) return false;
    } else if (pre.class && pre.class.length > 0) {
        if (!Object.keys(ctx.classLevels).some(cid => pre.class!.includes(cid))) return false;
    }
    if (pre.proficiency && pre.proficiency.length > 0) {
        const training = ctx.armorTraining.map(t => t.toLowerCase());
        const hasTraining = (req: string) => {
            const r = req.toLowerCase().replace(' armor', '');
            return training.some(t => t.includes('all armor') || t.includes(r));
        };
        if (!pre.proficiency.every(hasTraining)) return false;
    }
    return true;
}

/** Scholar-eligible skills for Wizard level 2 (must pick one in which you have proficiency). */
const SCHOLAR_SKILL_OPTIONS = ['Arcana', 'History', 'Investigation', 'Medicine', 'Nature', 'Religion'];

// Helper function to determine if a level grants ASI/Feat
const getASILevels = (classId: string): number[] => {
    const baseLevels = [4, 8, 12, 16, 19];
    if (classId === 'fighter') {
        return [4, 6, 8, 12, 14, 16, 19];
    } else if (classId === 'rogue') {
        return [4, 8, 10, 12, 16, 19];
    }
    return baseLevels;
};

export default function LevelUpWizard({ character, onComplete, onCancel }: LevelUpWizardProps) {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [hpMode, setHpMode] = useState<'average' | 'roll'>('average');
    const [rolledHp, setRolledHp] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Multiclass State - Declare early since it's used in calculations
    const [levelUpMode, setLevelUpMode] = useState<'existing' | 'multiclass' | null>(null);
    const [selectedClassToLevel, setSelectedClassToLevel] = useState<string>('');
    const [selectedMulticlass, setSelectedMulticlass] = useState<string>('');
    const [availableClasses, setAvailableClasses] = useState<any[]>([]);
    const [loadingClasses, setLoadingClasses] = useState(false);

    // Get current classes from character
    const currentClasses = character.data?.classes || {};
    const hasMultipleClasses = Object.keys(currentClasses).length > 1 || (Object.keys(currentClasses).length === 0 && character.class);
    
    // If no classes object exists, create it from character.class. Memoized: effects depend on it,
    // and a fresh object each render re-ran them forever (e.g. multiclassing from level 1).
    const storedClasses = character.data?.classes;
    const effectiveClasses: Record<string, number> = useMemo(() => (
        storedClasses && Object.keys(storedClasses).length > 0
            ? storedClasses
            : { [character.class.toLowerCase()]: character.level }
    ), [storedClasses, character.class, character.level]);

    // Calculate next level first (needed for ASI/Feat detection)
    const nextLevel = character.level + 1;
    
    // Determine which class we're leveling up
    const getClassIdForLevelUp = () => {
        if (levelUpMode === 'multiclass' && selectedMulticlass) {
            return selectedMulticlass;
        } else if (levelUpMode === 'existing' && selectedClassToLevel) {
            return selectedClassToLevel;
        } else if (Object.keys(effectiveClasses).length === 1) {
            // Single class, use it
            return Object.keys(effectiveClasses)[0];
        }
        // Fallback to character.class
        return character.classId || character.class.toLowerCase();
    };
    
    const classId = getClassIdForLevelUp();
    // Level the chosen class reaches with this level-up (a new multiclass starts at 1)
    const newClassLevel = levelUpMode === 'multiclass' ? 1 : (effectiveClasses[classId] || 0) + 1;
    const needsASI = getASILevels(classId).includes(newClassLevel);
    const classLevelsAfter: Record<string, number> = { ...effectiveClasses, [classId]: newClassLevel };

    // Subclass State (subclasses are tracked per class)
    const [allSubclasses, setAllSubclasses] = useState<Subclass[]>([]);
    const [subclasses, setSubclasses] = useState<Subclass[]>([]);
    const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);
    const [loadingSubclasses, setLoadingSubclasses] = useState(false);

    // Features State
    const [classFeatures, setClassFeatures] = useState<ClassFeature[]>([]);
    const [subclassFeatures, setSubclassFeatures] = useState<ClassFeature[]>([]);
    const [loadingFeatures, setLoadingFeatures] = useState(false);

    // ASI/Feat State
    const [asiOrFeat, setAsiOrFeat] = useState<'asi' | 'feat' | null>(null);
    const [asiMode, setAsiMode] = useState<'single' | 'dual'>('single');
    const [asiSingle, setAsiSingle] = useState<string>('');
    const [asiDual1, setAsiDual1] = useState<string>('');
    const [asiDual2, setAsiDual2] = useState<string>('');
    const [selectedFeat, setSelectedFeat] = useState<Feat | null>(null);
    const [featAbility, setFeatAbility] = useState<string>('');
    const [allClassInfo, setAllClassInfo] = useState<any[]>([]);
    const [showLegacySubclasses, setShowLegacySubclasses] = useState(false);
    const [availableFeats, setAvailableFeats] = useState<Feat[]>([]);
    const [loadingFeats, setLoadingFeats] = useState(false);

    // Fighting Style (level-up)
    const [fightingStylesList, setFightingStylesList] = useState<{ id: string; name: string; description: string }[]>([]);
    const [selectedFightingStyle, setSelectedFightingStyle] = useState<string | null>(null);

    // Scholar (Wizard level 2) - pick one skill for proficiency + expertise
    const needsScholar = classId === 'wizard' && newClassLevel === 2;
    const scholarProficientSkills = (() => {
        if (!needsScholar) return [];
        const bgSkills = getBackgroundSkills(character.data?.backgroundId || '') || [];
        const raceTraits = character.data?.racialTraits || [];
        const traitSkills = getSkillProficienciesFromTraits(raceTraits);
        const storedSkills = character.data?.skills || [];
        const proficient = Array.from(new Set([...bgSkills, ...traitSkills, ...storedSkills]));
        return SCHOLAR_SKILL_OPTIONS.filter(s => proficient.includes(s));
    })();
    const scholarSkillOptions = scholarProficientSkills.length > 0 ? scholarProficientSkills : SCHOLAR_SKILL_OPTIONS;
    const [selectedScholarSkill, setSelectedScholarSkill] = useState<string | null>(null);


    // Wizard: add 2 spells to spellbook when leveling up
    const needsWizardSpellbook = classId === 'wizard';
    const [wizardSpellbookChoices, setWizardSpellbookChoices] = useState<string[]>([]);
    const [wizardSpellsList, setWizardSpellsList] = useState<{ id: string; name: string; level: number }[]>([]);

    // Get hit die for the class being leveled up
    const getHitDie = () => {
        if (levelUpMode === 'multiclass' && selectedMulticlass) {
            const multiclassInfo = availableClasses.find((c: any) => c.id === selectedMulticlass);
            return multiclassInfo?.hitDie || 8;
        }
        const info = allClassInfo.find((c: any) => c.id === classId);
        return info?.hitDie || character.classInfo?.hitDie || 8;
    };
    
    const hitDie = getHitDie();
    const conMod = Math.floor((character.data.abilityScores.con - 10) / 2);

    const averageHp = Math.ceil(hitDie / 2) + 1;
    const hpGainAvg = Math.max(1, averageHp + conMod);
    const hpGainRoll = Math.max(1, rolledHp + conMod);

    const leveledClassInfo = allClassInfo.find((c: any) => c.id === classId) || character.classInfo;
    const subclassLevel = leveledClassInfo?.subclassLevel ?? 3;
    const subclassMap = getSubclassMap(character.data, allSubclasses, (character.class || '').toLowerCase());
    // Subclass the leveled class already has (each class picks its own)
    const currentSubclassId: string | undefined = subclassMap[classId];
    const needsSubclass = newClassLevel === subclassLevel && !currentSubclassId;

    const effectiveSubclassIdForFS = (needsSubclass && selectedSubclass) ? selectedSubclass.id : currentSubclassId;
    const fightingStyleCheck = getFightingStyleForLevel(classId, newClassLevel, effectiveSubclassIdForFS);
    const needsFightingStyle = fightingStyleCheck.needed;
    const allowedFightingStyleIds = fightingStyleCheck.options; // undefined = all

    // 2024 class feature choices at this class level (Expertise, Metamagic, Invocations, Weapon Mastery, ...)
    const levelChoices = getClassChoices(classId, newClassLevel, effectiveSubclassIdForFS);
    const levelChoiceKey = levelChoices.map(c => c.key).join('|');
    const [choicePicks, setChoicePicks] = useState<Record<string, string[]>>({});
    const [choiceSpells, setChoiceSpells] = useState<ChoiceSpell[]>([]);
    useEffect(() => setChoicePicks({}), [classId, newClassLevel, levelChoiceKey]);
    useEffect(() => {
        if (!levelChoices.some(c => c.kind === 'spell')) return;
        api.get('/reference/spells/summary')
            .then((list: ChoiceSpell[]) => setChoiceSpells(Array.isArray(list) ? list : []))
            .catch(() => setChoiceSpells([]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [levelChoiceKey]);
    const choiceContext = {
        ctx: {
            warlockLevel: classLevelsAfter.warlock ?? 0,
            existing: (character.data?.classChoices || {}) as Record<string, string[]>,
        },
        proficientSkills: Array.from(new Set([
            ...(getBackgroundSkills(character.data?.backgroundId || '') || []),
            ...getSkillProficienciesFromTraits(character.data?.racialTraits || []),
            ...(character.data?.skills || []),
        ])),
        expertiseSkills: (character.data?.expertise || []) as string[],
        knownLanguages: (character.data?.languages || []) as string[],
        languageOptions: STANDARD_LANGUAGES,
        spells: choiceSpells,
        spellbook: (character.data?.spellbook || []) as string[],
    };

    useEffect(() => {
        api.get('/reference/classes')
            .then((list: any[]) => setAllClassInfo(Array.isArray(list) ? list : []))
            .catch(() => setAllClassInfo([]));
    }, []);

    useEffect(() => {
        setLoadingSubclasses(true);
        api.get('/reference/subclasses')
            .then((data: Subclass[]) => setAllSubclasses(Array.isArray(data) ? data : []))
            .catch(err => console.error('Failed to load subclasses', err))
            .finally(() => setLoadingSubclasses(false));
    }, []);

    useEffect(() => {
        setSubclasses(needsSubclass ? allSubclasses.filter(s => s.classId === classId) : []);
    }, [needsSubclass, classId, allSubclasses]);

    // Load class and subclass features for the new level
    useEffect(() => {
        setLoadingFeatures(true);

        const promises: Promise<any>[] = [];
        
        // Load class features for the level the leveled class reaches
        const classFeaturesPromise = api.get(`/reference/class-features/${classId}`)
            .then((features: ClassFeature[]) => {
                const featuresForLevel = features.filter(f => f.level === newClassLevel);
                setClassFeatures(featuresForLevel);
            })
            .catch(err => {
                console.error('Failed to load class features', err);
                setClassFeatures([]);
            });
        promises.push(classFeaturesPromise);

        // Subclass features the leveled class gains (if it already has a subclass)
        const subclass = currentSubclassId && !needsSubclass ? allSubclasses.find(s => s.id === currentSubclassId) : undefined;
        setSubclassFeatures(subclass ? subclass.features.filter(f => f.level === newClassLevel) : []);

        // Wait for all promises to complete
        Promise.all(promises).finally(() => setLoadingFeatures(false));
    }, [newClassLevel, classId, currentSubclassId, needsSubclass, allSubclasses]);

    // Load available classes for multiclassing
    useEffect(() => {
        if (levelUpMode === 'multiclass') {
            setLoadingClasses(true);
            Promise.all([
                api.get('/reference/classes'),
                api.get('/reference/class-features')
            ])
                .then(([classes, classFeatures]) => {
                    const abilityScores = character.data.abilityScores || {};
                    const currentClassIds = Object.keys(effectiveClasses);
                    
                    // Filter classes that can be multiclassed into
                    const available = classes.filter((cls: any) => {
                        // Can't multiclass into a class you already have
                        if (currentClassIds.includes(cls.id.toLowerCase())) {
                            return false;
                        }
                        
                        // Check prerequisites
                        if (!cls.multiclassPrerequisites) {
                            return false;
                        }
                        
                        // Special case for Fighter: Str 13 OR Dex 13
                        if (cls.id === 'fighter') {
                            return (abilityScores.str >= 13) || (abilityScores.dex >= 13);
                        }
                        
                        // For other classes, check all prerequisites
                        for (const [ability, minScore] of Object.entries(cls.multiclassPrerequisites)) {
                            if ((abilityScores[ability] || 0) < (minScore as number)) {
                                return false;
                            }
                        }
                        
                        return true;
                    });
                    
                    setAvailableClasses(available);
                })
                .catch(err => {
                    console.error('Failed to load classes', err);
                    setAvailableClasses([]);
                })
                .finally(() => setLoadingClasses(false));
        }
    }, [levelUpMode, character.data.abilityScores, effectiveClasses]);

    // Load feats when ASI/Feat is needed
    useEffect(() => {
        if (needsASI) {
            setLoadingFeats(true);
            api.get('/reference/feats')
                .then((feats: Feat[]) => {
                    const armorTraining = [
                        ...Object.keys(classLevelsAfter).flatMap(cid => (allClassInfo.find((c: any) => c.id === cid)?.armorProficiencies) || []),
                        ...(character.classInfo?.armorProficiencies || []),
                    ];
                    const orders = character.data?.classChoices || {};
                    if ((orders['cleric:divine-order'] || []).includes('protector')) armorTraining.push('Heavy armor');
                    if ((orders['druid:primal-order'] || []).includes('warden')) armorTraining.push('Medium armor');
                    const takenFeatIds = (character.data.features || []).map((f: any) => f.featId).filter(Boolean);
                    // Armor-training feats grant the next tier
                    if (takenFeatIds.includes('lightly-armored')) armorTraining.push('Light armor', 'Shields');
                    if (takenFeatIds.includes('moderately-armored')) armorTraining.push('Medium armor');
                    if (takenFeatIds.includes('heavily-armored')) armorTraining.push('Heavy armor');
                    const filtered = (feats || []).filter(feat => isFeatAvailable(feat, {
                        characterLevel: nextLevel,
                        classLevels: classLevelsAfter,
                        abilityScores: character.data.abilityScores || {},
                        race: character.race || '',
                        armorTraining,
                        takenFeatIds,
                    }));
                    const order: Record<string, number> = { 'epic-boon': 0, general: 1, 'fighting-style': 2, origin: 3 };
                    filtered.sort((a, b) => (order[a.category || 'general'] ?? 9) - (order[b.category || 'general'] ?? 9) || a.name.localeCompare(b.name));
                    setAvailableFeats(filtered);
                })
                .catch(err => {
                    console.error('Failed to load feats', err);
                    setAvailableFeats([]);
                })
                .finally(() => setLoadingFeats(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needsASI, character.data.abilityScores, character.race, classId, allClassInfo.length, nextLevel]);

    useEffect(() => {
        if (!needsScholar) {
            setSelectedScholarSkill(null);
        }
    }, [needsScholar]);

    useEffect(() => {
        if (needsWizardSpellbook) {
            api.get('/reference/spells/summary')
                .then((spells: { id: string; name: string; level: number; classes: string[] }[]) => {
                    const maxSpellLevel = Math.min(9, Math.ceil(newClassLevel / 2));
                    const wizardSpells = spells.filter(s =>
                        s.level > 0 &&
                        s.level <= maxSpellLevel &&
                        s.classes.some(c => c.toLowerCase() === 'wizard')
                    );
                    setWizardSpellsList(wizardSpells.map(s => ({ id: s.id, name: s.name, level: s.level })));
                })
                .catch(() => setWizardSpellsList([]));
        } else {
            setWizardSpellsList([]);
            setWizardSpellbookChoices([]);
        }
    }, [needsWizardSpellbook, newClassLevel]);

    useEffect(() => {
        if (needsFightingStyle) {
            api.get('/reference/fighting-styles')
                .then((list: { id: string; name: string; description: string }[]) => {
                    setFightingStylesList(list || []);
                })
                .catch(err => {
                    console.error('Failed to load fighting styles', err);
                    setFightingStylesList([]);
                });
        } else {
            setFightingStylesList([]);
            setSelectedFightingStyle(null);
        }
    }, [needsFightingStyle]);

    const handleRoll = () => {
        const roll = Math.floor(Math.random() * hitDie) + 1;
        setRolledHp(roll);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Validate multiclass selection
            if (levelUpMode === 'multiclass' && !selectedMulticlass) {
                toast.error('Please select a class to multiclass into');
                setIsSubmitting(false);
                return;
            }
            if (levelUpMode === 'existing' && Object.keys(effectiveClasses).length > 1 && !selectedClassToLevel) {
                toast.error('Please select which class to level up');
                setIsSubmitting(false);
                return;
            }
            if (!choicesComplete(levelChoices, choicePicks, choiceContext)) {
                toast.error(`Please make your ${levelChoices.map(c => c.title).join(', ')} choices.`);
                setIsSubmitting(false);
                return;
            }
            if (needsScholar && !selectedScholarSkill) {
                toast.error('Please choose a skill for your Scholar feature (proficiency and expertise).');
                setIsSubmitting(false);
                return;
            }
            if (needsWizardSpellbook && wizardSpellbookChoices.filter(Boolean).length < 2) {
                toast.error('As a wizard, you must add 2 spells to your spellbook when you gain a level.');
                setIsSubmitting(false);
                return;
            }

            const hpIncrease = hpMode === 'average' ? hpGainAvg : hpGainRoll;

            const payload: any = {
                hpIncrease,
                multiclass: levelUpMode === 'multiclass' ? selectedMulticlass : undefined,
                classToLevel: levelUpMode === 'existing' && Object.keys(effectiveClasses).length > 1 ? selectedClassToLevel : undefined
            };

            if (needsSubclass && selectedSubclass) {
                payload.subclassId = selectedSubclass.id;
                // When first selecting a subclass, add its features up to the class's level
                // The backend will handle filtering duplicates
                const newFeatures = selectedSubclass.features
                    .filter(f => f.level <= newClassLevel)
                    .map(f => ({
                        name: f.name,
                        description: f.description,
                        source: `Subclass: ${selectedSubclass.name}`,
                        level: f.level
                    }));
                payload.newFeatures = newFeatures;
            }

            // Class feature choices: option / spell picks become features on the sheet
            const classChoicePayload = buildChoicePayload(
                levelChoices, choicePicks,
                Object.fromEntries(choiceSpells.map(sp => [sp.id, sp.name])),
                nextLevel
            );
            if (classChoicePayload.features.length > 0) {
                payload.newFeatures = [...(payload.newFeatures || []), ...classChoicePayload.features];
            }

            // Handle ASI/Feat selection
            if (needsASI) {
                if (asiOrFeat === 'asi') {
                    if (asiMode === 'single' && asiSingle) {
                        payload.abilityScoreImprovement = { [asiSingle]: 2 };
                    } else if (asiMode === 'dual' && asiDual1 && asiDual2) {
                        payload.abilityScoreImprovement = {
                            [asiDual1]: 1,
                            [asiDual2]: 1
                        };
                    }
                } else if (asiOrFeat === 'feat' && selectedFeat) {
                    if (selectedFeat.abilityScoreOptions && selectedFeat.abilityScoreOptions.length > 0) {
                        const abil = featAbility || selectedFeat.abilityScoreOptions[0];
                        const cap = selectedFeat.abilityScoreMax ?? 20;
                        const current = (character.data.abilityScores || {})[abil] ?? 10;
                        if (current < cap) {
                            payload.abilityScoreImprovement = { [abil]: 1 };
                        }
                    }
                    // Add feat as a feature
                    const featFeature = {
                        name: selectedFeat.name,
                        description: selectedFeat.description,
                        source: 'Feat',
                        level: nextLevel,
                        featId: selectedFeat.id
                    };
                    if (!payload.newFeatures) payload.newFeatures = [];
                    payload.newFeatures.push(featFeature);
                    
                    // Pre-2024 feat data: fixed increase
                    if (!selectedFeat.abilityScoreOptions && selectedFeat.abilityScoreIncrease) {
                        if (payload.abilityScoreImprovement) {
                            // Merge ability score increases
                            for (const [ability, increase] of Object.entries(selectedFeat.abilityScoreIncrease)) {
                                payload.abilityScoreImprovement[ability] = (payload.abilityScoreImprovement[ability] || 0) + increase;
                            }
                        } else {
                            payload.abilityScoreImprovement = selectedFeat.abilityScoreIncrease;
                        }
                    }
                }
            }
            // Note: Class and subclass features for the new level are automatically
            // added by the backend, so we don't need to send them here

            // Update class resources for every class at its new level, each with its own subclass
            const subclassMapAfter = needsSubclass && selectedSubclass
                ? { ...subclassMap, [classId]: selectedSubclass.id }
                : subclassMap;
            const updatedClassResources = updateAllClassResources(
                classLevelsAfter,
                subclassMapAfter,
                character.data.classResources,
                character.data.abilityScores
            );

            // Calculate ability score increases from features (e.g., Primal Champion)
            const allFeaturesAfterLevelUp = [
                ...(character.data.features || []),
                ...(payload.newFeatures || [])
            ];
            const featureAbilityIncreases = getAbilityScoreIncreasesFromFeatures(allFeaturesAfterLevelUp);
            
            // Merge feature ability increases with ASI
            let finalAbilityScoreImprovement = payload.abilityScoreImprovement || {};
            for (const [ability, increase] of Object.entries(featureAbilityIncreases)) {
                finalAbilityScoreImprovement[ability] = (finalAbilityScoreImprovement[ability] || 0) + increase;
            }

            const res = await api.post(`/characters/${character.id}/level-up`, {
                hpIncrease,
                subclassId: payload.subclassId,
                newFeatures: payload.newFeatures,
                abilityScoreImprovement: Object.keys(finalAbilityScoreImprovement).length > 0 ? finalAbilityScoreImprovement : undefined,
                classResources: updatedClassResources,
                multiclass: payload.multiclass,
                classToLevel: payload.classToLevel,
                fightingStyle: needsFightingStyle && selectedFightingStyle ? selectedFightingStyle : undefined,
                scholarSkill: needsScholar && selectedScholarSkill ? selectedScholarSkill : undefined,
                wizardSpellbookSpells: needsWizardSpellbook && wizardSpellbookChoices.filter(Boolean).length >= 2 ? wizardSpellbookChoices.filter(Boolean) : undefined,
                choices: levelChoices.length > 0 ? classChoicePayload : undefined
            });

            setIsSubmitting(false);
            onComplete(res);
        } catch (err) {
            console.error('Failed to level up', err);
            toast.error(describeError("Couldn't level up", err));
            setIsSubmitting(false);
        }
    };

    // Determine total steps
    // Step 1: HP
    // Step 2: Subclass (if needed) - Actually, let's make Subclass Step 1 if valid, then HP? Or HP then Subclass.
    // Let's do: Step 1 = HP. Step 2 = Subclass (if needed). Step 3 = Confirmation?
    // We can allow scrolling / single page, or wizard steps.
    // Current code was single step. Let's keep it simple. If needs subclass, show that UI before submit.

    return (
        <Modal onClose={onCancel} ariaLabel={`Level Up: ${nextLevel}`} dismissible={false}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Level Up: {nextLevel}</h2>

            {/* Class Selection Section - Show if character has multiple classes or can multiclass */}
            {(Object.keys(effectiveClasses).length > 1 || (Object.keys(effectiveClasses).length === 1 && character.level >= 1)) && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Choose Level Up Path
                    </h3>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {Object.keys(effectiveClasses).length > 1 
                            ? 'You have multiple classes. Choose which class to level up, or multiclass into a new class.'
                            : 'You can level up your current class or multiclass into a new class.'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem', backgroundColor: levelUpMode === 'existing' ? 'var(--surface-highlight)' : 'var(--surface)', borderRadius: '4px', border: levelUpMode === 'existing' ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
                            <input
                                type="radio"
                                name="levelUpMode"
                                data-testid="levelup-mode-existing"
                                checked={levelUpMode === 'existing'}
                                onChange={() => setLevelUpMode('existing')}
                            />
                            <div style={{ flex: 1 }}>
                                <strong>Level Up Existing Class</strong>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    {Object.keys(effectiveClasses).length > 1
                                        ? 'Choose which of your current classes to level up'
                                        : 'Continue leveling your current class'}
                                </div>
                            </div>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem', backgroundColor: levelUpMode === 'multiclass' ? 'var(--surface-highlight)' : 'var(--surface)', borderRadius: '4px', border: levelUpMode === 'multiclass' ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
                            <input
                                type="radio"
                                name="levelUpMode"
                                data-testid="levelup-mode-multiclass"
                                checked={levelUpMode === 'multiclass'}
                                onChange={() => setLevelUpMode('multiclass')}
                            />
                            <div style={{ flex: 1 }}>
                                <strong>Multiclass into New Class</strong>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    Add a level in a new class (must meet prerequisites)
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Show class selection if leveling up existing class */}
                    {levelUpMode === 'existing' && Object.keys(effectiveClasses).length > 1 && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                            <label htmlFor="field-levelup-class-select" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Select Class to Level Up:
                            </label>
                            <select id="field-levelup-class-select"
                                className="input"
                                data-testid="levelup-class-select"
                                value={selectedClassToLevel}
                                onChange={(e) => setSelectedClassToLevel(e.target.value)}
                                style={{ width: '100%' }}
                            >
                                <option value="">Choose a class...</option>
                                {Object.entries(effectiveClasses).map(([clsId, level]: [string, any]) => {
                                    const clsName = clsId.charAt(0).toUpperCase() + clsId.slice(1);
                                    return (
                                        <option key={clsId} value={clsId}>
                                            {clsName} (Level {level})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    )}

                    {/* Show class selection if multiclassing */}
                    {levelUpMode === 'multiclass' && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                            {loadingClasses ? (
                                <p>Loading available classes...</p>
                            ) : (
                                <>
                                    <div id="multiclass-heading" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        Select Class to Multiclass Into:
                                    </div>
                                    {availableClasses.length > 0 ? (
                                        <div role="radiogroup" aria-labelledby="multiclass-heading" style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {availableClasses.map((cls: any) => (
                                                <label
                                                    key={cls.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.5rem',
                                                        cursor: 'pointer',
                                                        padding: '0.75rem',
                                                        backgroundColor: selectedMulticlass === cls.id ? 'var(--surface-highlight)' : 'transparent',
                                                        borderRadius: '4px',
                                                        border: selectedMulticlass === cls.id ? '2px solid var(--primary)' : '1px solid var(--border)'
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="multiclass"
                                                        data-testid={`multiclass-${cls.id}`}
                                                        checked={selectedMulticlass === cls.id}
                                                        onChange={() => setSelectedMulticlass(cls.id)}
                                                        style={{ marginTop: '0.25rem' }}
                                                    />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 'bold' }}>{cls.name}</div>
                                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{cls.description}</div>
                                                        {cls.multiclassPrerequisites && (
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                                Prerequisites: {Object.entries(cls.multiclassPrerequisites).map(([ability, score]: [string, any]) => 
                                                                    `${ability.toUpperCase()} ${score}+`
                                                                ).join(', ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                            No classes available for multiclassing (check prerequisites)
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Fighting Style (level-up) */}
            {needsFightingStyle && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Fighting Style
                    </h3>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {allowedFightingStyleIds
                            ? 'Choose one of the following (College of Swords): Dueling or Two-Weapon Fighting.'
                            : 'You gain a Fighting Style at this level. Choose one.'}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {fightingStylesList
                            .filter(fs => !allowedFightingStyleIds || allowedFightingStyleIds.includes(fs.id))
                            .map(fs => (
                                <div
                                    key={fs.id}
                                    data-testid={`levelup-fs-${fs.id}`}
                                    onClick={() => setSelectedFightingStyle(selectedFightingStyle === fs.id ? null : fs.id)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: selectedFightingStyle === fs.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        backgroundColor: selectedFightingStyle === fs.id ? 'var(--surface-highlight)' : 'var(--surface)'
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{fs.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{fs.description}</div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Scholar (Wizard level 2) */}
            {needsScholar && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Scholar
                    </h3>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Choose one of the following skills. You gain proficiency (if you don&apos;t have it) and Expertise in the chosen skill.
                    </p>
                    <select
                        className="input"
                        data-testid="scholar-skill"
                        value={selectedScholarSkill || ''}
                        onChange={(e) => setSelectedScholarSkill(e.target.value || null)}
                        style={{ width: '100%', maxWidth: '20rem' }}
                    >
                        <option value="">Select a skill...</option>
                        {scholarSkillOptions.map(skill => (
                            <option key={skill} value={skill}>{skill}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* 2024 class feature choices */}
            {levelChoices.length > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }} data-testid="levelup-class-choices">
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Class Choices
                    </h3>
                    <ClassChoicesPicker
                        choices={levelChoices}
                        value={choicePicks}
                        onChange={setChoicePicks}
                        {...choiceContext}
                    />
                </div>
            )}

            {/* Wizard: Add 2 spells to spellbook */}
            {needsWizardSpellbook && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Add to Spellbook
                    </h3>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        When you gain a wizard level, you add two wizard spells of your choice to your spellbook. Choose 2 spells.
                    </p>
                    {[0, 1].map(idx => (
                        <div key={idx} style={{ marginBottom: '0.75rem' }}>
                            <label htmlFor={`field-wizard-spell-${idx}`} style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Spell {idx + 1}</label>
                            <select id={`field-wizard-spell-${idx}`}
                                className="input"
                                data-testid={`wizard-spell-${idx}`}
                                value={wizardSpellbookChoices[idx] || ''}
                                onChange={(e) => {
                                    const val = e.target.value || '';
                                    const next = [...wizardSpellbookChoices];
                                    next[idx] = val;
                                    setWizardSpellbookChoices(next);
                                }}
                                style={{ width: '100%', maxWidth: '24rem' }}
                            >
                                <option value="">Select a spell...</option>
                                {wizardSpellsList
                                    .filter(s => {
                                        const alreadyChosen = wizardSpellbookChoices.includes(s.id) && wizardSpellbookChoices[idx] !== s.id;
                                        const inSpellbook = (character.data?.spellbook || []).includes(s.id);
                                        return !alreadyChosen && !inSpellbook;
                                    })
                                    .map(s => (
                                        <option key={s.id} value={s.id}>{s.name} (Level {s.level})</option>
                                    ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {/* HP Section */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Hit Points</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    Class Hit Die: <strong>d{hitDie}</strong> | CON Modifier: <strong>{conMod >= 0 ? `+${conMod}` : conMod}</strong>
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="hpMode"
                            checked={hpMode === 'average'}
                            onChange={() => setHpMode('average')}
                        />
                        <div>
                            <strong>Take Average: {hpGainAvg} HP</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                ({averageHp} + {conMod})
                            </div>
                        </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            name="hpMode"
                            checked={hpMode === 'roll'}
                            onChange={() => setHpMode('roll')}
                        />
                        <div style={{ flex: 1 }}>
                            <strong>Roll Hit Die</strong>
                            {hpMode === 'roll' && (
                                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={(e) => { e.preventDefault(); handleRoll(); }}
                                        disabled={rolledHp > 0}
                                    >
                                        {rolledHp > 0 ? `Rolled: ${rolledHp}` : 'Roll Die'}
                                    </button>
                                    {rolledHp > 0 && (
                                        <span>Total: <strong>{hpGainRoll} HP</strong></span>
                                    )}
                                </div>
                            )}
                        </div>
                    </label>
                </div>
            </div>

            {/* Features Preview Section */}
            {(classFeatures.length > 0 || subclassFeatures.length > 0 || (currentSubclassId && !needsSubclass)) && (
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Features Gained at Level {nextLevel}</h3>
                    
                    {loadingFeatures ? (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Loading features...</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* Class Features */}
                            {classFeatures.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                                        Class Features:
                                    </div>
                                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                        {classFeatures.map((f, i) => (
                                            <li key={i} style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                                <strong>{f.name}</strong>
                                                {f.description && (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                                                        {f.description}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Subclass Features (if character already has a subclass) */}
                            {currentSubclassId && !needsSubclass && (
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
                                        Subclass Features:
                                    </div>
                                    {subclassFeatures.length > 0 ? (
                                        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                            {subclassFeatures.map((f, i) => (
                                                <li key={i} style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                                    <strong>{f.name}</strong>
                                                    {f.description && (
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                                                            {f.description}
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                            No subclass features at this level.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ASI/Feat Section */}
            {needsASI && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        Ability Score Improvement or Feat
                    </h3>
                    <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                        At level {nextLevel}, you can increase your ability scores or take a feat.
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                            <input
                                type="radio"
                                name="asiOrFeat"
                                data-testid="asi-or-feat-asi"
                                checked={asiOrFeat === 'asi'}
                                onChange={() => setAsiOrFeat('asi')}
                            />
                            <strong>Ability Score Improvement</strong>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="asiOrFeat"
                                data-testid="asi-or-feat-feat"
                                checked={asiOrFeat === 'feat'}
                                onChange={() => setAsiOrFeat('feat')}
                            />
                            <strong>Feat</strong>
                        </label>
                    </div>

                    {/* ASI Selection */}
                    {asiOrFeat === 'asi' && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                                    <input
                                        type="radio"
                                        name="asiMode"
                                        checked={asiMode === 'single'}
                                        onChange={() => setAsiMode('single')}
                                    />
                                    <strong>+2 to one ability score</strong>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="asiMode"
                                        data-testid="asi-mode-dual"
                                        checked={asiMode === 'dual'}
                                        onChange={() => setAsiMode('dual')}
                                    />
                                    <strong>+1 to two ability scores</strong>
                                </label>
                            </div>

                            {asiMode === 'single' && (
                                <div>
                                    <label htmlFor="field-asi-single" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        Select Ability Score:
                                    </label>
                                    <select id="field-asi-single"
                                        className="input"
                                        data-testid="asi-single"
                                        value={asiSingle}
                                        onChange={(e) => setAsiSingle(e.target.value)}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="">Choose...</option>
                                        {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(a => (
                                            <option key={a} value={a} disabled={((character.data.abilityScores || {})[a] ?? 10) > 18}>
                                                {ABILITY_LABELS[a]} ({(character.data.abilityScores || {})[a] ?? 10})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {asiMode === 'dual' && (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <div>
                                        <label htmlFor="field-asi-dual-1" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                            First Ability Score:
                                        </label>
                                        <select id="field-asi-dual-1"
                                            className="input"
                                            data-testid="asi-dual-1"
                                            value={asiDual1}
                                            onChange={(e) => setAsiDual1(e.target.value)}
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">Choose...</option>
                                            {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(a => (
                                                <option key={a} value={a} disabled={((character.data.abilityScores || {})[a] ?? 10) > 19}>
                                                    {ABILITY_LABELS[a]} ({(character.data.abilityScores || {})[a] ?? 10})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="field-asi-dual-2" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                            Second Ability Score:
                                        </label>
                                        <select id="field-asi-dual-2"
                                            className="input"
                                            data-testid="asi-dual-2"
                                            value={asiDual2}
                                            onChange={(e) => setAsiDual2(e.target.value)}
                                            style={{ width: '100%' }}
                                            disabled={!asiDual1}
                                        >
                                            <option value="">Choose...</option>
                                            {['str', 'dex', 'con', 'int', 'wis', 'cha']
                                                .filter(ability => ability !== asiDual1)
                                                .map(ability => (
                                                    <option key={ability} value={ability} disabled={((character.data.abilityScores || {})[ability] ?? 10) > 19}>
                                                        {ability === 'str' ? 'Strength' : 
                                                         ability === 'dex' ? 'Dexterity' :
                                                         ability === 'con' ? 'Constitution' :
                                                         ability === 'int' ? 'Intelligence' :
                                                         ability === 'wis' ? 'Wisdom' : 'Charisma'}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Feat Selection */}
                    {asiOrFeat === 'feat' && (
                        <div style={{ marginTop: '1rem' }}>
                            {loadingFeats ? (
                                <p>Loading feats...</p>
                            ) : (
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {availableFeats.map(feat => (
                                        <label
                                            key={feat.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.5rem',
                                                cursor: 'pointer',
                                                padding: '0.75rem',
                                                marginBottom: '0.5rem',
                                                backgroundColor: selectedFeat?.id === feat.id ? 'var(--surface-highlight)' : 'var(--surface)',
                                                borderRadius: '4px',
                                                border: selectedFeat?.id === feat.id ? '2px solid var(--primary)' : '1px solid var(--border)'
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="feat"
                                                checked={selectedFeat?.id === feat.id}
                                                data-testid={`feat-${feat.id}`}
                                                onChange={() => { setSelectedFeat(feat); setFeatAbility(feat.abilityScoreOptions?.length === 1 ? feat.abilityScoreOptions[0] : ''); }}
                                                style={{ marginTop: '0.25rem' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                                                    {feat.name}
                                                    {feat.category && (
                                                        <span style={{ fontWeight: 'normal', fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                                            {feat.category === 'epic-boon' ? 'Epic Boon' : feat.category === 'fighting-style' ? 'Fighting Style' : feat.category === 'origin' ? 'Origin' : 'General'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>
                                                    {feat.description}
                                                </div>
                                                {feat.abilityScoreOptions && feat.abilityScoreOptions.length > 0 && selectedFeat?.id === feat.id && (
                                                    <div style={{ marginTop: '0.5rem' }} onClick={e => e.stopPropagation()}>
                                                        <label htmlFor="field-feat-ability" style={{ fontSize: '0.75rem', color: 'var(--primary)', marginRight: '0.5rem' }}>
                                                            +1 to (max {feat.abilityScoreMax ?? 20}):
                                                        </label>
                                                        <select id="field-feat-ability"
                                                            className="input"
                                                            data-testid="feat-ability"
                                                            value={featAbility}
                                                            onChange={e => setFeatAbility(e.target.value)}
                                                            style={{ width: 'auto', display: 'inline-block' }}
                                                        >
                                                            <option value="">Choose...</option>
                                                            {feat.abilityScoreOptions.map(a => (
                                                                <option key={a} value={a} disabled={((character.data.abilityScores || {})[a] ?? 10) >= (feat.abilityScoreMax ?? 20)}>
                                                                    {ABILITY_LABELS[a]} ({(character.data.abilityScores || {})[a] ?? 10})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                    {availableFeats.length === 0 && (
                                        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No feats available (check prerequisites)</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Subclass Section */}
            {needsSubclass && (
                <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Select Subclass</h3>
                    <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        At level {subclassLevel}, you choose a specialized path for your class.
                    </p>
                    <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>
                        <input type="checkbox" checked={showLegacySubclasses} onChange={e => setShowLegacySubclasses(e.target.checked)} />
                        Show legacy (pre-2024) subclasses
                    </label>

                    {loadingSubclasses ? (
                        <p>Loading subclasses...</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {subclasses.filter(sub => !sub.legacy || showLegacySubclasses || selectedSubclass?.id === sub.id).map(sub => (
                                <label key={sub.id} data-testid={`subclass-${sub.id}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', backgroundColor: selectedSubclass?.id === sub.id ? 'var(--surface-highlight)' : 'transparent', borderRadius: '4px' }}>
                                    <input
                                        type="radio"
                                        name="subclass"
                                        data-testid={`subclass-radio-${sub.id}`}
                                        checked={selectedSubclass?.id === sub.id}
                                        onChange={() => setSelectedSubclass(sub)}
                                        style={{ marginTop: '0.25rem' }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{sub.name}{sub.legacy ? <span style={{ fontWeight: 'normal', fontSize: '0.75rem', color: 'var(--text-muted)' }}> (legacy)</span> : null}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{sub.description}</div>
                                        {selectedSubclass?.id === sub.id && (
                                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                                <strong>Features Gained:</strong>
                                                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                                                    {sub.features.filter(f => f.level <= newClassLevel).map((f, i) => (
                                                        <li key={i}>{f.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button
                    className="btn"
                    data-testid="levelup-confirm"
                    onClick={handleSubmit}
                    disabled={
                        isSubmitting || 
                        (hpMode === 'roll' && rolledHp === 0) || 
                        ((Object.keys(effectiveClasses).length > 1 || character.level >= 1) && !levelUpMode) ||
                        (levelUpMode === 'existing' && Object.keys(effectiveClasses).length > 1 && !selectedClassToLevel) ||
                        (levelUpMode === 'multiclass' && !selectedMulticlass) ||
                        (needsSubclass && !selectedSubclass) ||
                        (needsFightingStyle && !selectedFightingStyle) ||
                        (needsASI && !asiOrFeat) ||
                        (needsASI && asiOrFeat === 'asi' && (
                            (asiMode === 'single' && !asiSingle) ||
                            (asiMode === 'dual' && (!asiDual1 || !asiDual2))
                        )) ||
                        (needsASI && asiOrFeat === 'feat' && !selectedFeat) ||
                        (needsASI && asiOrFeat === 'feat' && !!selectedFeat?.abilityScoreOptions?.length && !featAbility && !selectedFeat.abilityScoreOptions.every(a => ((character.data.abilityScores || {})[a] ?? 10) >= (selectedFeat.abilityScoreMax ?? 20)))
                    }
                >
                    {isSubmitting ? 'Leveling Up...' : 'Confirm Level Up'}
                </button>
            </div>
        </Modal>
    );
}
