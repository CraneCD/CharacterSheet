import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import StepRace from './StepRace';
import StepClass from './StepClass';
import StepAbilities, { AbilityMethod } from './StepAbilities';
import WizardStepper from './WizardStepper';
import StepDetails from './StepDetails';
import StepStartingEquipment from './StepStartingEquipment';
import StepReview from './StepReview';
import { Race, ClassInfo, Subclass, CharacterItem, Background } from '@/lib/types';
import { calculateClassResources, mergeHeroicInspiration, RESOURCE_RULES_VERSION } from '@/lib/classResources';
import { hasDwarvenToughness, hasResourceful, hasSkillful, hasVersatile, hasKeenSensesChoice, getSkillProficienciesFromTraits } from '@/lib/racialTraitBonuses';
import { getRaceTraits, getBackgroundSkills, getBackgroundAbilityOptions, isValidBackgroundAsi, getRaceLanguages, getRaceLanguageChoices } from '@/lib/wizardReference';
import { splitEquipmentChoice, itemNameToCharacterItem, parseCurrency } from '@/lib/equipmentMapping';
import { buildChoicePayload, getClassChoices } from '@/lib/classChoices';
import ClassChoicesPicker, { choicesComplete } from '@/app/character/[id]/components/ClassChoicesPicker';
import { Button, ConfirmDialog, describeError, Skeleton, useToast } from '@/app/components/ui';
import { clearDraft, hasDraftProgress, loadDraft, saveDraft } from '@/lib/characterDraft';
import { formatRelativeTime } from '@/lib/relativeTime';

type Currency = { cp?: number; sp?: number; ep?: number; gp?: number; pp?: number };

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;

/** Apply 2024 background increases (a score can't go above 20). */
export function applyBackgroundAsi(scores: Record<string, number>, asi: Record<string, number>): Record<string, number> {
    const out = { ...scores };
    for (const [abil, inc] of Object.entries(asi || {})) {
        out[abil] = Math.min(20, (out[abil] ?? 10) + (inc || 0));
    }
    return out;
}

const STEPS = [
    { label: 'Species' },
    { label: 'Class' },
    { label: 'Abilities' },
    { label: 'Background' },
    { label: 'Equipment' },
    { label: 'Choices & Review' },
];

function initialFormData() {
    return {
        raceId: '',
        classId: '',
        abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        name: '',
        alignment: '',
        backgroundId: '',
        backgroundAsi: {} as Record<string, number>,
        skillfulChoice: '' as string,
        versatileFeatId: '' as string,
        elvenLineageChoice: '' as string,
        speciesLineageChoice: '' as string,
        sizeChoice: '' as string,
        keenSensesChoice: '' as string,
        startingEquipmentChoices: [] as string[],
        backgroundEquipmentChoices: [] as string[],
        expertiseChoices: [] as string[],
        classSkillChoices: [] as string[],
        languageChoices: [] as string[],
        /** Level 1 class feature choices (Divine Order, first invocation, Weapon Mastery, ...), by choice key. */
        classChoicePicks: {} as Record<string, string[]>,
        /** How ability scores were generated; unset until the Abilities step is first opened. */
        abilityMethod: undefined as AbilityMethod | undefined
    };
}

export default function WizardContainer() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [maxStepReached, setMaxStepReached] = useState(1);
    const [loading, setLoading] = useState(false);
    const [confirmingStartOver, setConfirmingStartOver] = useState(false);
    // Drafts load from browser storage after mount; nothing is saved until then
    const [hydrated, setHydrated] = useState(false);
    const [resumedAt, setResumedAt] = useState<string | null>(null);
    const toast = useToast();
    const [formData, setFormData] = useState(initialFormData);

    // We store full objects for race/class/background to display names in Review without refetching
    const [selectedRace, setSelectedRace] = useState<Race | null>(null);
    const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
    const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);
    const [selectedFightingStyle, setSelectedFightingStyle] = useState<string | null>(null);
    const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);

    // Resume an unfinished character from this browser
    useEffect(() => {
        const draft = loadDraft();
        if (draft && hasDraftProgress(draft.formData)) {
            setFormData({ ...initialFormData(), ...draft.formData });
            setSelectedRace(draft.selections.race ?? null);
            setSelectedClass(draft.selections.classInfo ?? null);
            setSelectedSubclass(draft.selections.subclass ?? null);
            setSelectedFightingStyle(draft.selections.fightingStyle ?? null);
            setSelectedBackground(draft.selections.background ?? null);
            setStep(draft.step);
            setMaxStepReached(Math.max(draft.step, draft.maxStepReached));
            setResumedAt(draft.savedAt);
        }
        setHydrated(true);
    }, []);

    // Save progress as you go
    useEffect(() => {
        if (!hydrated || !hasDraftProgress(formData)) return;
        saveDraft({
            step,
            maxStepReached,
            formData,
            selections: {
                race: selectedRace,
                classInfo: selectedClass,
                subclass: selectedSubclass,
                background: selectedBackground,
                fightingStyle: selectedFightingStyle,
            },
        });
    }, [hydrated, step, maxStepReached, formData, selectedRace, selectedClass, selectedSubclass, selectedBackground, selectedFightingStyle]);

    const goToStep = (next: number) => {
        setStep(next);
        setMaxStepReached((reached) => Math.max(reached, next));
        window.scrollTo?.({ top: 0 });
    };
    const handleNext = () => goToStep(step + 1);
    const handleBack = () => goToStep(step - 1);

    const handleSaveAndExit = () => {
        if (hasDraftProgress(formData)) toast.info('Draft saved. Continue it any time from My Characters.');
        router.push('/dashboard');
    };

    const startOver = () => {
        clearDraft();
        setFormData(initialFormData());
        setSelectedRace(null);
        setSelectedClass(null);
        setSelectedSubclass(null);
        setSelectedFightingStyle(null);
        setSelectedBackground(null);
        setStep(1);
        setMaxStepReached(1);
        setResumedAt(null);
        setConfirmingStartOver(false);
    };

    const lineageId = formData.raceId === 'elf' ? formData.elvenLineageChoice : formData.speciesLineageChoice;
    const currentRaceTraits = () => getRaceTraits(formData.raceId, formData.elvenLineageChoice, selectedRace, formData.speciesLineageChoice);
    const finalScores = applyBackgroundAsi(formData.abilityScores, formData.backgroundAsi);

    const handleCreate = async () => {
        setLoading(true);
        try {
            // 2024: backgrounds grant ability increases, skills, a tool, an Origin feat and equipment;
            // species grant traits only. The API records are the source of truth.
            let baseItems: { name: string; category: string; type?: string; armorMethod?: string; baseAC?: number; damage?: string; damageType?: string; properties?: string[] }[] = [];
            let feats: { id: string; name: string; description: string; category?: string }[] = [];
            try {
                const [items, featList] = await Promise.all([
                    api.get('/reference/base-items') as Promise<any[]>,
                    api.get('/reference/feats') as Promise<any[]>
                ]);
                baseItems = items ?? [];
                feats = featList ?? [];
            } catch (e) {
                console.warn('Failed to fetch base-items/feats', e);
            }
            const baseScores = applyBackgroundAsi(formData.abilityScores, formData.backgroundAsi);
            const bgSkills = getBackgroundSkills(formData.backgroundId, selectedBackground);
            const raceTraits = currentRaceTraits();

            let classResources = selectedClass
                ? calculateClassResources(selectedClass.id, 1, baseScores, selectedSubclass?.id)
                : {};
            classResources = mergeHeroicInspiration(classResources, hasResourceful(raceTraits));

            const features: { name: string; description: string; source: string; featId?: string; level?: number }[] = [];
            const featById = (id: string) => feats.find((f: any) => (f.id || '').toLowerCase() === (id || '').toLowerCase());
            const originFeatId = selectedBackground?.originFeat;
            if (originFeatId) {
                const feat = featById(originFeatId);
                features.push({
                    name: feat?.name ?? originFeatId,
                    description: feat?.description ?? '',
                    source: `Background: ${selectedBackground?.name ?? formData.backgroundId} (Origin Feat)`,
                    featId: originFeatId,
                    level: 1
                });
            }
            if (hasVersatile(raceTraits) && formData.versatileFeatId) {
                const feat = featById(formData.versatileFeatId);
                if (feat) {
                    features.push({
                        name: feat.name,
                        description: feat.description,
                        source: 'Racial Trait (Versatile)',
                        featId: feat.id,
                        level: 1
                    });
                }
            }
            const featIds = features.map(f => f.featId);

            // Level 1 HP: max hit die + Con modifier (+1 Dwarven Toughness, +2 Tough)
            const hitDie = selectedClass?.hitDie ?? 8;
            const conMod = Math.floor(((baseScores.con ?? 10) - 10) / 2);
            const maxHp = Math.max(1, hitDie + conMod + (hasDwarvenToughness(raceTraits) ? 1 : 0) + (featIds.includes('tough') ? 2 : 0));

            const skills = [...bgSkills];
            const addSkill = (s?: string) => { if (s && !skills.includes(s)) skills.push(s); };
            for (const s of (formData.classSkillChoices || []).filter(Boolean)) addSkill(s);
            if (hasSkillful(raceTraits)) addSkill(formData.skillfulChoice);
            if (hasKeenSensesChoice(raceTraits)) addSkill(formData.keenSensesChoice);

            const equipment: CharacterItem[] = [];
            const currency: Currency = {};
            const addChoice = (choice: string) => {
                for (const part of splitEquipmentChoice(choice.trim())) {
                    if (!part) continue;
                    const money = parseCurrency(part);
                    if (money) {
                        currency[money.key] = (currency[money.key] ?? 0) + money.amount;
                    } else {
                        equipment.push(itemNameToCharacterItem(part, baseItems));
                    }
                }
            };
            for (const choice of [...(formData.startingEquipmentChoices ?? []), ...(formData.backgroundEquipmentChoices ?? [])]) {
                if (choice?.trim()) addChoice(choice);
            }

            const expertise = (formData.expertiseChoices || []).filter((s: string) => s?.trim()) as string[];

            // 2024: Common + two chosen languages
            const languages = [...getRaceLanguages(formData.raceId)];
            for (const lang of (formData.languageChoices || []).filter((s: string) => s?.trim())) {
                if (!languages.includes(lang)) languages.push(lang);
            }

            const toolProficiencies = [
                ...(selectedClass?.toolProficiencies ?? []),
                ...(selectedBackground?.toolProficiencies ?? [])
            ];

            // Level 1 class feature choices (Rogue Expertise is picked separately above)
            const classChoicePayload = buildChoicePayload(creationChoices(), formData.classChoicePicks || {}, {}, 1);
            features.push(...classChoicePayload.features);

            const data: any = {
                abilityScores: baseScores,
                backgroundId: formData.backgroundId,
                backgroundAsi: formData.backgroundAsi,
                alignment: formData.alignment,
                skills,
                racialTraits: raceTraits,
                ...(formData.elvenLineageChoice && formData.raceId === 'elf' ? { elvenLineage: formData.elvenLineageChoice } : {}),
                ...(lineageId ? { speciesLineage: lineageId } : {}),
                ...(formData.sizeChoice ? { size: formData.sizeChoice } : {}),
                ...(formData.keenSensesChoice && hasKeenSensesChoice(raceTraits) ? { keenSensesChoice: formData.keenSensesChoice } : {}),
                ...(formData.elvenLineageChoice === 'wood_elf' ? { speed: 35 } : {}),
                ...(toolProficiencies.length > 0 ? { toolProficiencies } : {}),
                features,
                hp: { current: maxHp, max: maxHp, temp: 0 },
                hitDice: {
                    total: 1,
                    spent: 0,
                    dieType: hitDie
                },
                classResources,
                classResourcesRules: RESOURCE_RULES_VERSION,
                equipment,
                ...(Object.keys(classChoicePayload.classChoices).length > 0 ? { classChoices: classChoicePayload.classChoices } : {})
            };
            if (expertise.length > 0) data.expertise = expertise;
            if (languages.length > 0) data.languages = languages;
            if (Object.keys(currency).length > 0) data.currency = currency;
            // Magic Initiate from a background (Acolyte, Sage, Guide) fixes its spell list; spells are picked on the sheet.
            if (originFeatId === 'magic-initiate' && selectedBackground?.originFeatNote) {
                const miClass = selectedBackground.originFeatNote.toLowerCase();
                if (['cleric', 'druid', 'wizard'].includes(miClass)) {
                    data.magicInitiate = { class: miClass, ability: miClass === 'wizard' ? 'int' : 'wis', cantrips: [], spell1: null };
                }
            }

            if (selectedSubclass) {
                data.subclassId = selectedSubclass.id;
                data.subclasses = { [formData.classId]: selectedSubclass.id };
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

            const created = await api.post('/characters', payload);
            clearDraft();
            toast.success(`Created ${formData.name || 'your character'}.`);
            router.push(created?.id ? `/character/${created.id}` : '/dashboard');
        } catch (err) {
            console.error('Failed to create character', err);
            toast.error(describeError("Couldn't create character. Please check your choices", err));
            setLoading(false);
        }
    };

    /** Level 1 class feature choices asked for at creation (Rogue Expertise has its own picker). */
    const creationChoices = () => formData.classId
        ? getClassChoices(formData.classId, 1).filter(c => c.kind !== 'expertise')
        : [];
    const creationChoiceContext = {
        ctx: { warlockLevel: formData.classId === 'warlock' ? 1 : 0, existing: {} },
        proficientSkills: [] as string[],
        expertiseSkills: [] as string[],
        knownLanguages: [] as string[],
        languageOptions: [] as string[],
        spells: [],
        spellbook: [] as string[],
    };

    const isStepValidAt = (s: number): boolean => {
        switch (s) {
            case 1: return !!formData.raceId;
            case 2:
                if (!formData.classId) return false;
                if (selectedClass && selectedClass.subclassLevel === 1 && !selectedSubclass) return false;
                if (formData.classId === 'fighter' && !selectedFightingStyle) return false;
                return true;
            case 3: return ABILITIES.every(a => (formData.abilityScores[a] ?? 0) > 0);
            case 4: {
                if (!formData.name || !formData.backgroundId || !formData.alignment) return false;
                const options = getBackgroundAbilityOptions(formData.backgroundId, selectedBackground);
                return options.length !== 3 || isValidBackgroundAsi(formData.backgroundAsi, options);
            }
            case 5: {
                const lines = selectedClass?.startingEquipment ?? [];
                const choices = formData.startingEquipmentChoices ?? [];
                for (let i = 0; i < lines.length; i++) {
                    if (!(choices[i] ?? '').trim()) return false;
                }
                const bgLines = selectedBackground?.startingEquipment ?? [];
                const bgChoices = formData.backgroundEquipmentChoices ?? [];
                for (let i = 0; i < bgLines.length; i++) {
                    if (!(bgChoices[i] ?? '').trim()) return false;
                }
                return true;
            }
            case 6: {
                const rt = currentRaceTraits();
                if (selectedRace?.lineageOptions && !lineageId) return false;
                if (formData.raceId === 'elf' && !formData.elvenLineageChoice) return false;
                if ((selectedRace?.size || '').toLowerCase().includes(' or ') && !formData.sizeChoice) return false;
                if (hasKeenSensesChoice(rt) && !formData.keenSensesChoice) return false;
                if (hasSkillful(rt) && !formData.skillfulChoice) return false;
                if (hasVersatile(rt) && !formData.versatileFeatId) return false;
                const classSkillCount = selectedClass?.skillChoices ?? 0;
                if (classSkillCount > 0) {
                    const classSkills = (formData.classSkillChoices || []).filter((s: string) => s?.trim());
                    if (classSkills.length !== classSkillCount) return false;
                }
                if (formData.classId === 'rogue') {
                    const expertiseChoices = (formData.expertiseChoices || []) as string[];
                    if (expertiseChoices.filter((s: string) => s?.trim()).length !== 2) return false;
                }
                if (!choicesComplete(creationChoices(), formData.classChoicePicks || {}, creationChoiceContext)) return false;
                const totalLangChoices = getRaceLanguageChoices(formData.raceId);
                if (totalLangChoices > 0) {
                    const languageChoices = (formData.languageChoices || []) as string[];
                    if (languageChoices.filter((s: string) => s?.trim()).length !== totalLangChoices) return false;
                }
                return true;
            }
            default: return true;
        }
    };
    const isStepValid = () => isStepValidAt(step);
    /** A step can be opened once every step before it is filled in. */
    const canVisitStep = (s: number) => s <= maxStepReached && Array.from({ length: s - 1 }, (_, i) => i + 1).every(isStepValidAt);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto 2rem', paddingBottom: '100px' }}>
            {confirmingStartOver && (
                <ConfirmDialog
                    title="Start over?"
                    confirmLabel="Discard and start over"
                    cancelLabel="Keep editing"
                    danger
                    onConfirm={startOver}
                    onCancel={() => setConfirmingStartOver(false)}
                >
                    Your saved draft and all choices so far will be discarded.
                </ConfirmDialog>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                <h1 className="heading" style={{ margin: 0 }}>Create New Character</h1>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {hasDraftProgress(formData) && (
                        <Button variant="ghost" onClick={() => setConfirmingStartOver(true)}>Start over</Button>
                    )}
                    <Button variant="secondary" onClick={handleSaveAndExit}>
                        {hasDraftProgress(formData) ? 'Save & exit' : 'Exit'}
                    </Button>
                </div>
            </div>

            {resumedAt && (
                <div className="wizard-notice" role="status">
                    <span>Picked up where you left off (draft saved {formatRelativeTime(resumedAt)}).</span>
                    <Button variant="ghost" size="sm" onClick={() => setResumedAt(null)} aria-label="Dismiss">&times;</Button>
                </div>
            )}

            <WizardStepper
                steps={STEPS}
                current={step}
                isComplete={(s) => s <= maxStepReached && isStepValidAt(s)}
                canVisit={canVisitStep}
                onSelect={goToStep}
            />
            <h2 className="visually-hidden" aria-live="polite">Step {step} of {STEPS.length}: {STEPS[step - 1].label}</h2>

            {/* Step Content */}
            <div style={{ minHeight: '400px', marginBottom: '100px' }}>
                {!hydrated && <Skeleton height="20rem" />}
                {hydrated && step === 1 && (
                    <StepRace
                        selectedRaceId={formData.raceId}
                        onSelect={(race) => {
                            setFormData({
                                ...formData,
                                raceId: race.id,
                                elvenLineageChoice: race.id === 'elf' ? formData.elvenLineageChoice : '',
                                speciesLineageChoice: '',
                                sizeChoice: (race.size || '').toLowerCase().includes(' or ') ? '' : race.size,
                                keenSensesChoice: '',
                                skillfulChoice: '',
                                versatileFeatId: '',
                                expertiseChoices: [],
                                languageChoices: []
                            });
                            setSelectedRace(race);
                        }}
                    />
                )}
                {hydrated && step === 2 && (
                    <StepClass
                        selectedClassId={formData.classId}
                        onSelect={(cls) => {
                            setFormData({
                                ...formData,
                                classId: cls.id,
                                startingEquipmentChoices: [],
                                expertiseChoices: [],
                                classSkillChoices: [],
                                classChoicePicks: {}
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
                {hydrated && step === 3 && (
                    <StepAbilities
                        initialScores={formData.abilityScores}
                        method={formData.abilityMethod}
                        onUpdate={(scores) => setFormData((prev) => ({ ...prev, abilityScores: scores }))}
                        onMethodChange={(abilityMethod) => setFormData((prev) => ({ ...prev, abilityMethod }))}
                    />
                )}
                {hydrated && step === 4 && (
                    <StepDetails
                        data={{ name: formData.name, backgroundId: formData.backgroundId, alignment: formData.alignment, backgroundAsi: formData.backgroundAsi }}
                        onBackgroundLoaded={setSelectedBackground}
                        onUpdate={(updates) => {
                            const newFormData = { ...formData, ...updates };
                            if (updates.backgroundId !== undefined && updates.backgroundId !== formData.backgroundId) {
                                newFormData.backgroundEquipmentChoices = [];
                                newFormData.versatileFeatId = '';
                            }
                            setFormData(newFormData);
                        }}
                    />
                )}
                {hydrated && step === 5 && (
                    <StepStartingEquipment
                        selectedClass={selectedClass}
                        selectedBackground={selectedBackground}
                        choices={formData.startingEquipmentChoices ?? []}
                        onChange={(choices) => setFormData({ ...formData, startingEquipmentChoices: choices })}
                        backgroundChoices={formData.backgroundEquipmentChoices ?? []}
                        onBackgroundChange={(choices) => setFormData({ ...formData, backgroundEquipmentChoices: choices })}
                    />
                )}
                {hydrated && step === 6 && (() => {
                    const rt = currentRaceTraits();
                    const bgSkills = getBackgroundSkills(formData.backgroundId, selectedBackground);
                    const traitSkills = getSkillProficienciesFromTraits(rt);
                    const proficientSkills = [...bgSkills];
                    const add = (s?: string) => { if (s && !proficientSkills.includes(s)) proficientSkills.push(s); };
                    traitSkills.forEach(add);
                    (formData.classSkillChoices || []).filter(Boolean).forEach(add);
                    if (hasSkillful(rt)) add(formData.skillfulChoice);
                    if (hasKeenSensesChoice(rt)) add(formData.keenSensesChoice);
                    return (
                        <>
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
                            classSkillChoicesCount={selectedClass?.skillChoices ?? 0}
                            classSkillOptions={selectedClass?.skillOptions ?? []}
                            race={selectedRace}
                            background={selectedBackground}
                            finalScores={finalScores}
                            backgroundSkills={bgSkills}
                        />
                        {creationChoices().length > 0 && (
                            <div className="card" style={{ marginTop: '1rem' }} data-testid="create-class-choices">
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>Class Choices</h3>
                                <ClassChoicesPicker
                                    choices={creationChoices()}
                                    value={formData.classChoicePicks || {}}
                                    onChange={(classChoicePicks) => setFormData({ ...formData, classChoicePicks })}
                                    {...creationChoiceContext}
                                />
                            </div>
                        )}
                        </>
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
                        className="btn btn-secondary"
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
                            className="btn"
                            data-testid="wizard-next"
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
                            className="btn"
                            data-testid="wizard-create"
                            onClick={handleCreate}
                            disabled={loading || !isStepValid()}
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
