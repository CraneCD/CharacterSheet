'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Subclass } from '@/lib/types';
import { updateClassResourcesForLevel } from '@/lib/classResources';
import { getAbilityScoreIncreasesFromFeatures } from '@/lib/featureStatModifiers';

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

interface Feat {
    id: string;
    name: string;
    description: string;
    prerequisites?: {
        abilityScore?: { [ability: string]: number };
        race?: string[];
        class?: string[];
        proficiency?: string[];
        level?: number;
    };
    abilityScoreIncrease?: { [ability: string]: number };
}

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
    const [step, setStep] = useState(1);
    const [hpMode, setHpMode] = useState<'average' | 'roll'>('average');
    const [rolledHp, setRolledHp] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate next level first (needed for ASI/Feat detection)
    const nextLevel = character.level + 1;
    const classId = character.classId || character.class.toLowerCase();
    const needsASI = getASILevels(classId).includes(nextLevel);

    // Subclass State
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
    const [availableFeats, setAvailableFeats] = useState<Feat[]>([]);
    const [loadingFeats, setLoadingFeats] = useState(false);

    const hitDie = character.classInfo?.hitDie || 8;
    const conMod = Math.floor((character.data.abilityScores.con - 10) / 2);

    const averageHp = Math.ceil(hitDie / 2) + 1;
    const hpGainAvg = Math.max(1, averageHp + conMod);
    const hpGainRoll = Math.max(1, rolledHp + conMod);

    const subclassLevel = character.classInfo?.subclassLevel;
    const needsSubclass = nextLevel === subclassLevel && !character.data.subclassId;

    useEffect(() => {
        if (needsSubclass) {
            setLoadingSubclasses(true);
            api.get('/reference/subclasses')
                .then((data: Subclass[]) => {
                    const available = data.filter(s => s.classId === (character.classId || character.class.toLowerCase())); // Ensure ID match
                    setSubclasses(available);
                })
                .catch(err => console.error('Failed to load subclasses', err))
                .finally(() => setLoadingSubclasses(false));
        }
    }, [needsSubclass, character.class, character.classId]);

    // Load class and subclass features for the new level
    useEffect(() => {
        setLoadingFeatures(true);
        const classId = character.classId || character.class.toLowerCase();
        
        const promises: Promise<any>[] = [];
        
        // Load class features
        const classFeaturesPromise = api.get(`/reference/class-features/${classId}`)
            .then((features: ClassFeature[]) => {
                // Filter features for the new level
                const featuresForLevel = features.filter(f => f.level === nextLevel);
                setClassFeatures(featuresForLevel);
            })
            .catch(err => {
                console.error('Failed to load class features', err);
                setClassFeatures([]);
            });
        promises.push(classFeaturesPromise);

        // Load subclass features if character has a subclass
        if (character.data.subclassId && !needsSubclass) {
            const subclassFeaturesPromise = api.get('/reference/subclasses')
                .then((subclasses: Subclass[]) => {
                    const subclass = subclasses.find(s => s.id === character.data.subclassId);
                    if (subclass) {
                        const featuresForLevel = subclass.features.filter(f => f.level === nextLevel);
                        setSubclassFeatures(featuresForLevel);
                    } else {
                        setSubclassFeatures([]);
                    }
                })
                .catch(err => {
                    console.error('Failed to load subclass features', err);
                    setSubclassFeatures([]);
                });
            promises.push(subclassFeaturesPromise);
        } else {
            setSubclassFeatures([]);
        }

        // Wait for all promises to complete
        Promise.all(promises).finally(() => setLoadingFeatures(false));
    }, [nextLevel, character.class, character.classId, character.data.subclassId, needsSubclass]);

    // Load feats when ASI/Feat is needed
    useEffect(() => {
        if (needsASI) {
            setLoadingFeats(true);
            api.get('/reference/feats')
                .then((feats: Feat[]) => {
                    // Filter feats based on prerequisites
                    const scores = character.data.abilityScores || {};
                    const race = character.race?.toLowerCase() || '';
                    const charClass = classId;
                    const proficiencies: string[] = []; // TODO: Get from character data if available
                    
                    const filtered = feats.filter(feat => {
                        if (!feat.prerequisites) return true;
                        const prereq = feat.prerequisites;
                        
                        // Check ability score prerequisites
                        if (prereq.abilityScore) {
                            for (const [ability, minScore] of Object.entries(prereq.abilityScore)) {
                                if ((scores[ability] || 0) < minScore) return false;
                            }
                        }
                        
                        // Check race prerequisites
                        if (prereq.race && prereq.race.length > 0) {
                            if (!prereq.race.some(r => race.includes(r.toLowerCase()))) return false;
                        }
                        
                        // Check class prerequisites
                        if (prereq.class && prereq.class.length > 0) {
                            if (!prereq.class.some(c => charClass.includes(c.toLowerCase()))) return false;
                        }
                        
                        // Check proficiency prerequisites (simplified - would need character proficiencies)
                        if (prereq.proficiency && prereq.proficiency.length > 0) {
                            // For now, allow all if we can't check proficiencies
                            // TODO: Implement proper proficiency checking
                        }
                        
                        return true;
                    });
                    
                    setAvailableFeats(filtered);
                })
                .catch(err => {
                    console.error('Failed to load feats', err);
                    setAvailableFeats([]);
                })
                .finally(() => setLoadingFeats(false));
        }
    }, [needsASI, character.data.abilityScores, character.race, classId]);

    const handleRoll = () => {
        const roll = Math.floor(Math.random() * hitDie) + 1;
        setRolledHp(roll);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const hpIncrease = hpMode === 'average' ? hpGainAvg : hpGainRoll;

            const payload: any = {
                hpIncrease
            };

            if (needsSubclass && selectedSubclass) {
                payload.subclassId = selectedSubclass.id;
                // When first selecting a subclass, add all features up to that level
                // The backend will handle filtering duplicates
                const newFeatures = selectedSubclass.features
                    .filter(f => f.level <= nextLevel)
                    .map(f => ({
                        name: f.name,
                        description: f.description,
                        source: `Subclass: ${selectedSubclass.name}`,
                        level: f.level
                    }));
                payload.newFeatures = newFeatures;
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
                    // Add feat as a feature
                    const featFeature = {
                        name: selectedFeat.name,
                        description: selectedFeat.description,
                        source: 'Feat',
                        level: nextLevel
                    };
                    if (!payload.newFeatures) payload.newFeatures = [];
                    payload.newFeatures.push(featFeature);
                    
                    // If feat grants ability score increase, merge it with any existing ASI
                    if (selectedFeat.abilityScoreIncrease) {
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

            // Update class resources for the new level
            const updatedClassResources = updateClassResourcesForLevel(
                classId,
                nextLevel,
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
                classResources: updatedClassResources
            });

            onComplete(res);
        } catch (err) {
            console.error('Failed to level up', err);
            alert('Failed to level up');
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
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Level Up: {nextLevel}</h2>

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
                                            className="button secondary"
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
                {(classFeatures.length > 0 || subclassFeatures.length > 0 || (character.data.subclassId && !needsSubclass)) && (
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
                                {character.data.subclassId && !needsSubclass && (
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
                                    checked={asiOrFeat === 'asi'}
                                    onChange={() => setAsiOrFeat('asi')}
                                />
                                <strong>Ability Score Improvement</strong>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="asiOrFeat"
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
                                            checked={asiMode === 'dual'}
                                            onChange={() => setAsiMode('dual')}
                                        />
                                        <strong>+1 to two ability scores</strong>
                                    </label>
                                </div>

                                {asiMode === 'single' && (
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                            Select Ability Score:
                                        </label>
                                        <select
                                            className="input"
                                            value={asiSingle}
                                            onChange={(e) => setAsiSingle(e.target.value)}
                                            style={{ width: '100%' }}
                                        >
                                            <option value="">Choose...</option>
                                            <option value="str">Strength</option>
                                            <option value="dex">Dexterity</option>
                                            <option value="con">Constitution</option>
                                            <option value="int">Intelligence</option>
                                            <option value="wis">Wisdom</option>
                                            <option value="cha">Charisma</option>
                                        </select>
                                    </div>
                                )}

                                {asiMode === 'dual' && (
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                                First Ability Score:
                                            </label>
                                            <select
                                                className="input"
                                                value={asiDual1}
                                                onChange={(e) => setAsiDual1(e.target.value)}
                                                style={{ width: '100%' }}
                                            >
                                                <option value="">Choose...</option>
                                                <option value="str">Strength</option>
                                                <option value="dex">Dexterity</option>
                                                <option value="con">Constitution</option>
                                                <option value="int">Intelligence</option>
                                                <option value="wis">Wisdom</option>
                                                <option value="cha">Charisma</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                                Second Ability Score:
                                            </label>
                                            <select
                                                className="input"
                                                value={asiDual2}
                                                onChange={(e) => setAsiDual2(e.target.value)}
                                                style={{ width: '100%' }}
                                                disabled={!asiDual1}
                                            >
                                                <option value="">Choose...</option>
                                                {['str', 'dex', 'con', 'int', 'wis', 'cha']
                                                    .filter(ability => ability !== asiDual1)
                                                    .map(ability => (
                                                        <option key={ability} value={ability}>
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
                                                    onChange={() => setSelectedFeat(feat)}
                                                    style={{ marginTop: '0.25rem' }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{feat.name}</div>
                                                    <div style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>
                                                        {feat.description}
                                                    </div>
                                                    {feat.abilityScoreIncrease && (
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem' }}>
                                                            Also increases {Object.keys(feat.abilityScoreIncrease).map(a => 
                                                                a === 'str' ? 'Strength' :
                                                                a === 'dex' ? 'Dexterity' :
                                                                a === 'con' ? 'Constitution' :
                                                                a === 'int' ? 'Intelligence' :
                                                                a === 'wis' ? 'Wisdom' : 'Charisma'
                                                            ).join(' or ')} by 1
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
                        <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                            At level {subclassLevel}, you choose a specialized path for your class.
                        </p>

                        {loadingSubclasses ? (
                            <p>Loading subclasses...</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {subclasses.map(sub => (
                                    <label key={sub.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', backgroundColor: selectedSubclass?.id === sub.id ? 'var(--surface-highlight)' : 'transparent', borderRadius: '4px' }}>
                                        <input
                                            type="radio"
                                            name="subclass"
                                            checked={selectedSubclass?.id === sub.id}
                                            onChange={() => setSelectedSubclass(sub)}
                                            style={{ marginTop: '0.25rem' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{sub.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{sub.description}</div>
                                            {selectedSubclass?.id === sub.id && (
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                                    <strong>Features Gained:</strong>
                                                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                                                        {sub.features.filter(f => f.level <= nextLevel).map((f, i) => (
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
                    <button className="button secondary" onClick={onCancel}>Cancel</button>
                    <button
                        className="button primary"
                        onClick={handleSubmit}
                        disabled={
                            isSubmitting || 
                            (hpMode === 'roll' && rolledHp === 0) || 
                            (needsSubclass && !selectedSubclass) ||
                            (needsASI && !asiOrFeat) ||
                            (needsASI && asiOrFeat === 'asi' && (
                                (asiMode === 'single' && !asiSingle) ||
                                (asiMode === 'dual' && (!asiDual1 || !asiDual2))
                            )) ||
                            (needsASI && asiOrFeat === 'feat' && !selectedFeat)
                        }
                    >
                        {isSubmitting ? 'Leveling Up...' : 'Confirm Level Up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
