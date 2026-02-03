import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import StepRace from './StepRace';
import StepClass from './StepClass';
import StepAbilities from './StepAbilities';
import StepDetails from './StepDetails';
import StepStartingEquipment from './StepStartingEquipment';
import StepReview from './StepReview';
import { Race, ClassInfo, Subclass, CharacterItem } from '@/lib/types';
import { calculateClassResources, mergeHeroicInspiration } from '@/lib/classResources';
import { hasDwarvenToughness, hasResourceful, hasSkillful, hasVersatile, getSkillProficienciesFromTraits } from '@/lib/racialTraitBonuses';
import { getRaceTraits, getBackgroundAsi, getBackgroundSkills, getRaceLanguages, getRaceLanguageChoices, getBackgroundLanguageChoices } from '@/lib/wizardReference';
import { splitEquipmentChoice, itemNameToCharacterItem } from '@/lib/equipmentMapping';

export default function WizardContainer() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        raceId: '',
        classId: '',
        abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        name: '',
        alignment: '',
        backgroundId: '',
        skillfulChoice: '' as string,
        versatileFeatId: '' as string,
        elvenLineageChoice: '' as string,
        startingEquipmentChoices: [] as string[],
        expertiseChoices: [] as string[],
        languageChoices: [] as string[]
    });

    // We store full objects for race/class to display names in Review without refetching
    const [selectedRace, setSelectedRace] = useState<Race | null>(null);
    const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
    const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);
    const [selectedFightingStyle, setSelectedFightingStyle] = useState<string | null>(null);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
    const handleExit = () => {
        if (confirm('Are you sure you want to exit character creation? All progress will be lost.')) {
            router.push('/dashboard');
        }
    };

    const handleCreate = async () => {
        setLoading(true);
        try {
            // 5.5e: backgrounds grant ASI, skills, etc.; races grant traits only (no ASI).
            // Prefer wizard reference (canonical) over API so create is correct even if API is stale.
            const baseScores = { ...formData.abilityScores };
            let bgFromApi: { abilityScoreIncrease?: Record<string, number>; skillProficiencies?: string[]; equipment?: string[] } | null = null;
            let baseItems: { name: string; category: string; type?: string; armorMethod?: string; baseAC?: number; damage?: string; damageType?: string; properties?: string[] }[] = [];
            try {
                const [bgs, items] = await Promise.all([
                    api.get('/reference/backgrounds') as Promise<any[]>,
                    api.get('/reference/base-items') as Promise<any[]>
                ]);
                const bid = (formData.backgroundId || '').toLowerCase();
                const b = bgs.find((x: any) => (x.id || '').toLowerCase() === bid);
                if (b) bgFromApi = b;
                baseItems = items ?? [];
            } catch (e) {
                console.warn('Failed to fetch backgrounds/base-items', e);
            }
            const asi = getBackgroundAsi(formData.backgroundId) || bgFromApi?.abilityScoreIncrease || {};
            for (const [abil, inc] of Object.entries(asi)) {
                const k = abil as keyof typeof baseScores;
                baseScores[k] = (baseScores[k] ?? 10) + (inc as number);
            }
            const bgSkills = getBackgroundSkills(formData.backgroundId).length > 0
                ? getBackgroundSkills(formData.backgroundId)
                : (bgFromApi?.skillProficiencies ?? []);
            const raceTraits = getRaceTraits(formData.raceId, formData.elvenLineageChoice).length > 0
                ? getRaceTraits(formData.raceId, formData.elvenLineageChoice)
                : (selectedRace?.traits ?? []);

            let classResources = selectedClass 
                ? calculateClassResources(selectedClass.id, 1, baseScores, selectedSubclass?.id)
                : {};
            classResources = mergeHeroicInspiration(classResources, hasResourceful(raceTraits));

            const hitDie = selectedClass?.hitDie ?? 8;
            const dwarvenToughness = selectedRace && hasDwarvenToughness(raceTraits);
            const maxHp = hitDie + (dwarvenToughness ? 1 : 0);

            const skills = [...bgSkills];
            if (hasSkillful(raceTraits) && formData.skillfulChoice) {
                if (!skills.includes(formData.skillfulChoice)) skills.push(formData.skillfulChoice);
            }

            const features: { name: string; description: string; source: string }[] = [];
            if (hasVersatile(raceTraits) && formData.versatileFeatId) {
                try {
                    const feats = await api.get('/reference/feats') as { id: string; name: string; description: string }[];
                    const feat = feats.find((f: any) => (f.id || '').toLowerCase() === (formData.versatileFeatId || '').toLowerCase());
                    if (feat) {
                        features.push({
                            name: feat.name,
                            description: feat.description,
                            source: 'Racial Trait (Versatile)'
                        });
                    }
                } catch (e) {
                    console.warn('Failed to fetch feat for Versatile', e);
                }
            }

            const equipment: CharacterItem[] = [];
            const currency: { cp?: number; sp?: number; ep?: number; gp?: number; pp?: number } = {};

            const bgEquipment = bgFromApi?.equipment ?? [];
            const currencyRe = /^\s*(\d+)\s*(gp|sp|cp|ep|pp)\s*$/i;
            for (const entry of bgEquipment) {
                const m = entry.match(currencyRe);
                if (m) {
                    const amt = parseInt(m[1], 10);
                    const key = m[2].toLowerCase() as 'gp' | 'sp' | 'cp' | 'ep' | 'pp';
                    currency[key] = (currency[key] ?? 0) + amt;
                } else {
                    equipment.push(itemNameToCharacterItem(entry, baseItems));
                }
            }

            for (const choice of formData.startingEquipmentChoices ?? []) {
                if (!choice?.trim()) continue;
                const parts = splitEquipmentChoice(choice.trim());
                for (const part of parts) {
                    if (part) equipment.push(itemNameToCharacterItem(part, baseItems));
                }
            }

            const expertise = (formData.expertiseChoices || []).filter((s: string) => s?.trim()) as string[];
            
            // Calculate languages: race languages + choices
            const raceLangs = getRaceLanguages(formData.raceId);
            const langChoices = (formData.languageChoices || []).filter((s: string) => s?.trim()) as string[];
            const languages = [...raceLangs];
            for (const lang of langChoices) {
                if (!languages.includes(lang)) languages.push(lang);
            }
            
            const data: any = {
                abilityScores: baseScores,
                backgroundId: formData.backgroundId,
                alignment: formData.alignment,
                skills,
                racialTraits: raceTraits,
                ...(formData.elvenLineageChoice ? { elvenLineage: formData.elvenLineageChoice } : {}),
                ...(formData.elvenLineageChoice === 'wood_elf' ? { speed: 35 } : {}),
                features,
                hp: { current: maxHp, max: maxHp, temp: 0 },
                hitDice: { 
                    total: 1, 
                    spent: 0, 
                    dieType: hitDie 
                },
                classResources,
                equipment
            };
            if (expertise.length > 0) {
                data.expertise = expertise;
            }
            if (languages.length > 0) {
                data.languages = languages;
            }
            if (Object.keys(currency).length > 0) {
                data.currency = currency;
            }

            if (selectedSubclass) {
                data.subclassId = selectedSubclass.id;
            }
            if (selectedFightingStyle) {
                data.fightingStyles = [selectedFightingStyle];
            }
            if (formData.classId === 'wizard') {
                data.spellbook = ['detect-magic', 'feather-fall', 'mage-armor', 'magic-missile', 'sleep', 'thunderwave'];
            }

            const payload = {
                name: formData.name,
                race: formData.raceId,
                class: formData.classId,
                level: 1,
                data
            };

            await api.post('/characters', payload);
            router.push('/dashboard');
        } catch (err) {
            console.error('Failed to create character', err);
            alert('Failed to create character. Please check your inputs.');
            setLoading(false);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1: return !!formData.raceId;
            case 2:
                if (!formData.classId) return false;
                if (selectedClass && selectedClass.subclassLevel === 1 && !selectedSubclass) return false;
                if (formData.classId === 'fighter' && !selectedFightingStyle) return false;
                return true;
            case 3: return true; // Abilities always have defaults
            case 4: return !!formData.name && !!formData.backgroundId && !!formData.alignment;
            case 5: {
                const lines = selectedClass?.startingEquipment ?? [];
                const choices = formData.startingEquipmentChoices ?? [];
                for (let i = 0; i < lines.length; i++) {
                    if (!(choices[i] ?? '').trim()) return false;
                }
                return true;
            }
            case 6: {
                const rt = getRaceTraits(formData.raceId, formData.elvenLineageChoice).length > 0 ? getRaceTraits(formData.raceId, formData.elvenLineageChoice) : (selectedRace?.traits ?? []);
                if (formData.raceId === 'elf' && !formData.elvenLineageChoice) return false;
                if (hasSkillful(rt) && !formData.skillfulChoice) return false;
                if (hasVersatile(rt) && !formData.versatileFeatId) return false;
                if (formData.classId === 'rogue') {
                    const expertiseChoices = (formData.expertiseChoices || []) as string[];
                    if (expertiseChoices.filter((s: string) => s?.trim()).length !== 2) return false;
                }
                const raceLangChoices = getRaceLanguageChoices(formData.raceId);
                const bgLangChoices = getBackgroundLanguageChoices(formData.backgroundId);
                const totalLangChoices = raceLangChoices + bgLangChoices;
                if (totalLangChoices > 0) {
                    const languageChoices = (formData.languageChoices || []) as string[];
                    if (languageChoices.filter((s: string) => s?.trim()).length !== totalLangChoices) return false;
                }
                return true;
            }
            default: return true;
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', paddingBottom: '100px' }}>
            {/* Header with Exit Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1 className="heading" style={{ margin: 0 }}>Create New Character</h1>
                <button
                    className="button secondary"
                    onClick={handleExit}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                    Exit Wizard
                </button>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }}></div>
                {[1, 2, 3, 4, 5, 6].map(s => {
                    const isActive = s <= step;
                    return (
                        <div key={s} style={{
                            width: '2rem', height: '2rem', borderRadius: '50%',
                            backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                            border: '2px solid ' + (isActive ? 'var(--primary)' : 'var(--border)'),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 1, fontWeight: 'bold', color: isActive ? '#fff' : 'var(--text-muted)'
                        }}>
                            {s}
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            <div style={{ minHeight: '400px', marginBottom: '100px' }}>
                {step === 1 && (
                    <StepRace
                        selectedRaceId={formData.raceId}
                        onSelect={(race) => {
                            setFormData({
                                ...formData,
                                raceId: race.id,
                                elvenLineageChoice: race.id === 'elf' ? formData.elvenLineageChoice : '',
                                skillfulChoice: '',
                                versatileFeatId: '',
                                expertiseChoices: [],
                                languageChoices: []
                            });
                            setSelectedRace(race);
                        }}
                    />
                )}
                {step === 2 && (
                    <StepClass
                        selectedClassId={formData.classId}
                        onSelect={(cls) => {
                            setFormData({
                                ...formData,
                                classId: cls.id,
                                startingEquipmentChoices: [],
                                expertiseChoices: []
                            });
                            setSelectedClass(cls);
                            if (selectedClass?.id !== cls.id) {
                                setSelectedSubclass(null);
                                setSelectedFightingStyle(null);
                            }
                        }}
                        selectedSubclassId={selectedSubclass?.id}
                        onSelectSubclass={setSelectedSubclass}
                        selectedFightingStyleId={selectedFightingStyle ?? undefined}
                        onSelectFightingStyle={setSelectedFightingStyle}
                    />
                )}
                {step === 3 && (
                    <StepAbilities
                        initialScores={formData.abilityScores}
                        onUpdate={(scores) => setFormData({ ...formData, abilityScores: scores })}
                    />
                )}
                {step === 4 && (
                    <StepDetails
                        data={{ name: formData.name, backgroundId: formData.backgroundId, alignment: formData.alignment }}
                        onUpdate={(updates) => {
                            const newFormData = { ...formData, ...updates };
                            // Reset language choices if background changed
                            if (updates.backgroundId && updates.backgroundId !== formData.backgroundId) {
                                newFormData.languageChoices = [];
                            }
                            setFormData(newFormData);
                        }}
                    />
                )}
                {step === 5 && (
                    <StepStartingEquipment
                        selectedClass={selectedClass}
                        choices={formData.startingEquipmentChoices ?? []}
                        onChange={(choices) => setFormData({ ...formData, startingEquipmentChoices: choices })}
                    />
                )}
                {step === 6 && (() => {
                    const rt = getRaceTraits(formData.raceId, formData.elvenLineageChoice).length > 0 ? getRaceTraits(formData.raceId, formData.elvenLineageChoice) : (selectedRace?.traits ?? []);
                    const bgSkills = getBackgroundSkills(formData.backgroundId);
                    const traitSkills = getSkillProficienciesFromTraits(rt);
                    const proficientSkills = [...bgSkills];
                    for (const s of traitSkills) {
                        if (!proficientSkills.includes(s)) proficientSkills.push(s);
                    }
                    if (hasSkillful(rt) && formData.skillfulChoice && !proficientSkills.includes(formData.skillfulChoice)) {
                        proficientSkills.push(formData.skillfulChoice);
                    }
                    return (
                        <StepReview
                            data={formData}
                            onUpdate={(updates) => setFormData({ ...formData, ...updates })}
                            raceName={selectedRace?.name}
                            className={selectedClass?.name}
                            backgroundName={formData.backgroundId}
                            fightingStyleId={selectedFightingStyle ?? undefined}
                            raceTraits={rt}
                            proficientSkills={proficientSkills}
                            raceId={formData.raceId}
                            backgroundId={formData.backgroundId}
                        />
                    );
                })()}
            </div>

            {/* Navigation Actions - Fixed at Bottom */}
            <div style={{ 
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'var(--background)',
                borderTop: '1px solid var(--border)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1000,
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ 
                    maxWidth: '800px', 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        className="button secondary"
                        onClick={handleBack}
                        disabled={step === 1 || loading}
                        style={{ 
                            visibility: step === 1 ? 'hidden' : 'visible',
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem'
                        }}
                    >
                        &larr; Back
                    </button>

                    {step < 6 ? (
                        <button
                            className="button primary"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            Next &rarr;
                        </button>
                    ) : (
                        <button
                            className="button primary"
                            onClick={handleCreate}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            {loading ? 'Creating...' : 'Create Character'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
