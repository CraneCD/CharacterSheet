import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import StepRace from './StepRace';
import StepClass from './StepClass';
import StepAbilities from './StepAbilities';
import StepDetails from './StepDetails';
import StepReview from './StepReview';
import { Race, ClassInfo, Subclass, CharacterItem, ItemCategory } from '@/lib/types';
import { calculateClassResources } from '@/lib/classResources';
import { hasDwarvenToughness } from '@/lib/racialTraitBonuses';

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
        backgroundId: ''
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

    // Helper function to categorize an item by name
    const categorizeItem = async (itemName: string): Promise<CharacterItem> => {
        // First, try to find it in base items
        try {
            const baseItems = await api.get('/reference/base-items');
            const baseItem = baseItems.find((item: any) => 
                item.name.toLowerCase() === itemName.toLowerCase()
            );
            
            if (baseItem) {
                return {
                    name: baseItem.name,
                    category: baseItem.category,
                    type: baseItem.type,
                    armorMethod: baseItem.armorMethod,
                    baseAC: baseItem.baseAC,
                    damage: baseItem.damage,
                    damageType: baseItem.damageType,
                    properties: baseItem.properties,
                    description: baseItem.description,
                    quantity: 1,
                    equipped: false,
                    isBaseItem: true
                };
            }
        } catch (err) {
            console.error('Failed to fetch base items for categorization', err);
        }

        // If not found in base items, use heuristics
        const nameLower = itemName.toLowerCase();
        let category: ItemCategory = 'miscellaneous';
        let type: 'armor' | 'weapon' | 'shield' | 'other' = 'other';

        // Check for currency (gp, sp, cp, ep, pp)
        if (/\d+\s*(gp|sp|cp|ep|pp)/i.test(itemName)) {
            category = 'miscellaneous';
            type = 'other';
        }
        // Check for weapons
        else if (/\b(sword|dagger|axe|mace|hammer|spear|bow|crossbow|staff|wand|club|flail|whip|rapier|scimitar|sickle|trident|lance|pike|halberd|glaive|warhammer|greataxe|greatsword|maul|longbow|shortbow|handaxe|javelin|dart|sling|blowgun)\b/i.test(nameLower)) {
            category = 'weapon';
            type = 'weapon';
        }
        // Check for armor
        else if (/\b(armor|mail|plate|leather|chain|scale|hide|breastplate|padded|studded|ring|splint|half|full)\b/i.test(nameLower)) {
            category = 'armor';
            type = 'armor';
        }
        // Check for shields
        else if (/\b(shield|buckler)\b/i.test(nameLower)) {
            category = 'shield';
            type = 'shield';
        }
        // Check for potions
        else if (/\b(potion|elixir|philter)\b/i.test(nameLower)) {
            category = 'potion';
            type = 'other';
        }
        // Check for scrolls
        else if (/\b(scroll|spell scroll)\b/i.test(nameLower)) {
            category = 'scroll';
            type = 'other';
        }
        // Check for magic items (common magic item names)
        else if (/\b(amulet|ring|cloak|boots|gloves|gauntlets|helm|hat|crown|wand|staff|rod|orb|gem|stone|crystal|tome|book|manual|deck|figurine|horn|instrument|lyre|harp|flute|drum|whistle|bag|pouch|bottle|vial|flask|lantern|torch|candle|rope|chain|key|lock|trap|tool|kit)\b/i.test(nameLower)) {
            category = 'magic-item';
            type = 'other';
        }

        return {
            name: itemName,
            category,
            type,
            quantity: 1,
            equipped: false,
            isBaseItem: false
        };
    };

    const handleCreate = async () => {
        setLoading(true);
        try {
            // 5.5e: backgrounds grant ASI, skills, etc.; races grant traits only (no ASI).
            const baseScores = { ...formData.abilityScores };
            type Bg = { id: string; abilityScoreIncrease?: { [key: string]: number }; skillProficiencies?: string[] };
            let bg: Bg | null = null;
            try {
                const bgs = await api.get('/reference/backgrounds') as Bg[];
                const bid = (formData.backgroundId || '').toLowerCase();
                bg = bgs.find(b => (b.id || '').toLowerCase() === bid) || null;
            } catch (e) {
                console.warn('Failed to fetch backgrounds for ASI/skills', e);
            }
            const asi = bg?.abilityScoreIncrease || {};
            for (const [abil, inc] of Object.entries(asi)) {
                const k = abil as keyof typeof baseScores;
                baseScores[k] = (baseScores[k] ?? 10) + (inc as number);
            }

            const classResources = selectedClass 
                ? calculateClassResources(selectedClass.id, 1, baseScores)
                : {};

            const hitDie = selectedClass?.hitDie ?? 8;
            const dwarvenToughness = selectedRace && hasDwarvenToughness(selectedRace.traits || []);
            const maxHp = hitDie + (dwarvenToughness ? 1 : 0);

            const data: any = {
                abilityScores: baseScores,
                backgroundId: formData.backgroundId,
                alignment: formData.alignment,
                skills: bg?.skillProficiencies ?? [],
                racialTraits: selectedRace?.traits ?? [],
                hp: { current: maxHp, max: maxHp, temp: 0 },
                hitDice: { 
                    total: 1, 
                    spent: 0, 
                    dieType: hitDie 
                },
                classResources: classResources,
                equipment: []
            };

            if (selectedSubclass) {
                data.subclassId = selectedSubclass.id;
            }
            if (selectedFightingStyle) {
                data.fightingStyles = [selectedFightingStyle];
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
                {[1, 2, 3, 4, 5].map(s => {
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
                            setFormData({ ...formData, raceId: race.id });
                            setSelectedRace(race);
                        }}
                    />
                )}
                {step === 2 && (
                    <StepClass
                        selectedClassId={formData.classId}
                        onSelect={(cls) => {
                            setFormData({ ...formData, classId: cls.id });
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
                        onUpdate={(updates) => setFormData({ ...formData, ...updates })}
                    />
                )}
                {step === 5 && (
                    <StepReview
                        data={formData}
                        raceName={selectedRace?.name}
                        className={selectedClass?.name}
                        backgroundName={formData.backgroundId}
                        fightingStyleId={selectedFightingStyle ?? undefined}
                    />
                )}
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

                    {step < 5 ? (
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
