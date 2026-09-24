import express from 'express';
import { z } from 'zod';
import { Character } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { getReferenceRows } from '../lib/referenceCache';
import { withCanonicalId } from '../lib/referenceTypes';
import { calculateAllClassResources, getSubclassMap, setSubclassMap } from '../lib/subclasses';

// DB-backed equivalents of the old static data/*.ts imports, so admin edits
// to classes/subclasses/class features are picked up on the next request
// (e.g. the next level-up) rather than requiring a redeploy.
async function getClasses() {
    const rows = await getReferenceRows('class');
    return rows.map(r => withCanonicalId('class', r.key, r.data));
}
async function getSubclasses() {
    const rows = await getReferenceRows('subclass');
    return rows.map(r => withCanonicalId('subclass', r.key, r.data));
}
async function getClassFeaturesMap(): Promise<Record<string, any[]>> {
    const rows = await getReferenceRows('classFeature');
    const map: Record<string, any[]> = {};
    for (const r of rows) map[r.key] = r.data;
    return map;
}

const router = express.Router();

const stringList = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '').map(x => x.trim()) : [];

type AppliedChoices = { expertise: string[]; skills: string[]; languages: string[]; classChoices: Record<string, string[]> };

/**
 * Apply level-up class feature choices to the character. Returns what was newly
 * added (for levelHistory / level-down), or null when there was nothing.
 */
function applyClassChoices(data: any, choices: any): AppliedChoices | null {
    if (!choices || typeof choices !== 'object') return null;
    const applied: AppliedChoices = { expertise: [], skills: [], languages: [], classChoices: {} };
    const addUnique = (field: 'expertise' | 'skills' | 'languages', values: string[]) => {
        const list: string[] = Array.isArray(data[field]) ? data[field] : [];
        for (const v of values) {
            if (!list.includes(v)) { list.push(v); applied[field].push(v); }
        }
        data[field] = list;
    };
    addUnique('skills', stringList(choices.skills));
    addUnique('expertise', stringList(choices.expertise));
    addUnique('languages', stringList(choices.languages));
    const picks = choices.classChoices && typeof choices.classChoices === 'object' && !Array.isArray(choices.classChoices) ? choices.classChoices : {};
    const stored: Record<string, string[]> = data.classChoices && typeof data.classChoices === 'object' ? data.classChoices : {};
    for (const [key, value] of Object.entries(picks)) {
        if (!/^[a-z-]+:[a-z0-9-]+$/.test(key)) continue;
        const ids = stringList(value);
        if (ids.length === 0) continue;
        stored[key] = [...(stored[key] || []), ...ids];
        applied.classChoices[key] = ids;
    }
    data.classChoices = stored;
    const any = applied.expertise.length + applied.skills.length + applied.languages.length + Object.keys(applied.classChoices).length;
    return any > 0 ? applied : null;
}

/** Undo applyClassChoices for one level (removes one occurrence of each pick). */
function revertClassChoices(data: any, applied: AppliedChoices): void {
    for (const field of ['expertise', 'skills', 'languages'] as const) {
        const remove = new Set(applied[field] || []);
        if (Array.isArray(data[field])) data[field] = data[field].filter((v: string) => !remove.has(v));
    }
    const stored: Record<string, string[]> = data.classChoices || {};
    for (const [key, ids] of Object.entries(applied.classChoices || {})) {
        const list = [...(stored[key] || [])];
        for (const id of ids) {
            const i = list.lastIndexOf(id);
            if (i !== -1) list.splice(i, 1);
        }
        if (list.length > 0) stored[key] = list; else delete stored[key];
    }
    data.classChoices = stored;
}

/** Highest-level class; on a tie the current primary class stays primary. */
function pickPrimaryClass(classLevels: Record<string, number>, currentClass: string): string {
    const current = (currentClass || '').toLowerCase();
    const entries = Object.entries(classLevels);
    if (entries.length === 0) return current;
    return entries.reduce((a, b) =>
        (b[1] > a[1] || (b[1] === a[1] && b[0] === current)) ? b : a
    )[0];
}

/**
 * Load a character and verify the requester owns it. Sends a 403 and returns
 * null when the character is missing or owned by someone else (missing IDs
 * intentionally get the same response as foreign ones).
 */
async function findOwnedCharacter(req: AuthRequest, res: express.Response): Promise<Character | null> {
    const character = await prisma.character.findUnique({ where: { id: req.params.id } });
    if (!character || character.userId !== req.user!.id) {
        res.status(403).json({ error: 'Access denied' });
        return null;
    }
    return character;
}

/**
 * Shared flow for endpoints that mutate the character's JSON data blob:
 * load + ownership check, synchronous in-place mutation, persist, respond
 * with the updated character. The mutator may return { status, error } to
 * abort without saving.
 */
async function mutateCharacterData(
    req: AuthRequest,
    res: express.Response,
    failureMessage: string,
    mutate: (data: any, character: Character) => { status: number; error: string } | void
) {
    try {
        const character = await findOwnedCharacter(req, res);
        if (!character) return;

        const data = character.data as any;
        const failure = mutate(data, character);
        if (failure) {
            return res.status(failure.status).json({ error: failure.error });
        }

        const updated = await prisma.character.update({
            where: { id: character.id },
            data: { data }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: failureMessage });
    }
}

// Validation for full character updates. `level` is bounded to the legal
// 1–20 range so PUT cannot bypass the cap enforced by /level-up.
const updateCharacterSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    race: z.string().max(100).optional(),
    class: z.string().max(100).optional(),
    level: z.number().int().min(1).max(20).optional(),
    data: z.record(z.any()).optional(),
    isPublic: z.boolean().optional(),
});

// Get all characters for the logged-in user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;
        const characters = await prisma.character.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                race: true,
                class: true,
                level: true,
                updatedAt: true,
                data: true,
            }
        });
        // The dashboard cards only show the portrait and HP from `data`; strip
        // the rest (spells, features, equipment, levelHistory, …) so we don't
        // ship every character's full sheet on the hottest read path.
        const trimmed = characters.map((c) => {
            const data = c.data as { portrait?: string; hp?: { current?: number; max?: number; temp?: number } } | null;
            const summary: { portrait?: string; hp?: { current: number; max: number; temp: number } } = {};
            if (data?.portrait) summary.portrait = data.portrait;
            if (data?.hp && typeof data.hp === 'object') {
                summary.hp = {
                    current: Number(data.hp.current) || 0,
                    max: Number(data.hp.max) || 0,
                    temp: Number(data.hp.temp) || 0,
                };
            }
            return { ...c, data: summary };
        });
        res.json(trimmed);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch characters' });
    }
});

// Get a single character
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;

        const character = await prisma.character.findUnique({
            where: { id: characterId },
        });

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        // Check ownership or public/campaign access (simplified for MVP: ownership only)
        if (character.userId !== userId && !character.isPublic) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Initialize hit dice for existing characters that don't have it
        const data = character.data as any;
        // Track whether we back-filled anything so we can persist it once,
        // instead of recomputing this initialization on every future read.
        let dataChanged = false;
        if (!data.hitDice) {
            const classInfo = (await getClasses()).find(c => c.id === character.class.toLowerCase());
            if (classInfo) {
                data.hitDice = {
                    total: character.level,
                    spent: 0,
                    dieType: classInfo.hitDie
                };
                dataChanged = true;
            }
        }

        // Initialize class resources for existing characters that don't have them
        // (2024 tables; the sheet re-derives them the same way).
        const resourcesWereEmpty = !data.classResources || Object.keys(data.classResources).length === 0;
        if (resourcesWereEmpty) {
            const primary = character.class.toLowerCase();
            const classLevels = data.classes && Object.keys(data.classes).length > 0 ? data.classes : { [primary]: character.level };
            const subclassMap = getSubclassMap(data, await getSubclasses(), primary);
            const computed = calculateAllClassResources(classLevels, subclassMap, data.abilityScores || {});
            if (Object.keys(computed).length > 0) {
                data.classResources = computed;
                data.classResourcesRules = '2024';
                dataChanged = true;
            }
        }

        // Persist any back-filled defaults so this initialization runs once
        // per character rather than on every read. (Values are derived from
        // the character itself, so a public viewer triggering the write is fine.)
        if (dataChanged) {
            await prisma.character.update({
                where: { id: characterId },
                data: { data }
            });
        }

        // Return character with potentially initialized hit dice and resources
        const result = { ...character, data };
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch character' });
    }
});

// Create a character
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;
        const { name, race, class: charClass, level, data } = req.body;

        const character = await prisma.character.create({
            data: {
                userId,
                name,
                race,
                class: charClass,
                level: level || 1,
                data: data || {},
            },
        });

        res.status(201).json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create character' });
    }
});

// Update a character
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { name, race, class: charClass, level, data, isPublic } = updateCharacterSchema.parse(req.body);

        const existing = await findOwnedCharacter(req, res);
        if (!existing) return;

        const updated = await prisma.character.update({
            where: { id: existing.id },
            data: {
                name,
                race,
                class: charClass,
                level,
                data,
                isPublic,
            },
        });

        res.json(updated);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Failed to update character' });
    }
});

// Merge the provided top-level fields into the character's data blob.
// Replaces whole-character PUTs for small edits: the client sends only the
// changed fields, and the merge happens against current server state, so a
// stale client copy can't clobber fields another request just updated.
router.patch('/:id/data', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const patch = req.body;
        if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
            return res.status(400).json({ error: 'Request body must be an object of data fields' });
        }
        if (['__proto__', 'constructor', 'prototype'].some(k => Object.prototype.hasOwnProperty.call(patch, k))) {
            return res.status(400).json({ error: 'Invalid field name' });
        }

        const character = await findOwnedCharacter(req, res);
        if (!character) return;

        const data = { ...(character.data as any), ...patch };
        const updated = await prisma.character.update({
            where: { id: character.id },
            data: { data }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update character data' });
    }
});

// Delete a character
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const existing = await findOwnedCharacter(req, res);
        if (!existing) return;

        await prisma.character.delete({ where: { id: existing.id } });
        res.json({ message: 'Character deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete character' });
    }
});

// Update Character HP
router.patch('/:id/hp', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update HP', (data) => {
        const { current, temp, max, deathSaves } = req.body;
        const hp = data.hp || { current: 10, max: 10, temp: 0 };

        if (current !== undefined) hp.current = current;
        if (temp !== undefined) hp.temp = temp;
        if (max !== undefined) hp.max = max;
        if (deathSaves !== undefined) {
            hp.deathSaves = {
                successes: Math.max(0, Math.min(3, deathSaves.successes ?? 0)),
                failures: Math.max(0, Math.min(3, deathSaves.failures ?? 0))
            };
        }
        // Reset death saves when healed (current HP > 0)
        if (hp.current > 0 && hp.deathSaves) {
            hp.deathSaves = { successes: 0, failures: 0 };
        }

        // Ensure current doesn't exceed max (unless temp HP is involved, handled separately)
        // D&D 5e: Current HP cannot exceed Max HP. Temp HP is separate.
        if (hp.current > hp.max) hp.current = hp.max;
        if (hp.current < 0) hp.current = 0;

        data.hp = hp;
    })
);

// Update Character Hit Dice
router.patch('/:id/hit-dice', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update hit dice', (data, character) => {
        const { spent, total, dieType } = req.body;
        const hitDice = data.hitDice || { total: character.level, spent: 0, dieType: 8 };

        if (spent !== undefined) {
            hitDice.spent = Math.max(0, Math.min(spent, hitDice.total)); // Ensure spent is between 0 and total
        }
        if (total !== undefined) hitDice.total = total;
        if (dieType !== undefined) hitDice.dieType = dieType;

        data.hitDice = hitDice;
    })
);

// Update Magic Initiate 1st-level spell use (1 = available, 0 = used)
router.patch('/:id/magic-initiate-spell-used', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update Magic Initiate spell use', (data) => {
        const { used } = req.body; // 0 = used, 1 = available
        data.magicInitiateSpell1Used = used !== undefined ? used : 0;
    })
);

// Update Character Class Resources
router.patch('/:id/class-resources', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update class resources', (data) => {
        const { resourceName, current, resetType, resources } = req.body;
        let classResources = data.classResources || {};

        // If resetType is provided, reset all resources of that type
        if (resetType) {
            for (const [name, resource] of Object.entries(classResources)) {
                const res = resource as any;
                if (resetType === 'short' && res.resetType === 'short') {
                    const regain = res.shortRestRegain;
                    res.current = regain != null ? Math.min((res.current || 0) + regain, res.max) : res.max;
                } else if (resetType === 'long' && (res.resetType === 'long' || res.resetType === 'short')) {
                    res.current = res.max;
                }
            }
        }
        // If resources object is provided, replace all resources
        else if (resources) {
            classResources = resources;
        }
        // If resourceName and current are provided, update a specific resource
        else if (resourceName && current !== undefined) {
            if (classResources[resourceName]) {
                classResources[resourceName].current = Math.max(0, Math.min(current, classResources[resourceName].max));
            } else if (resourceName === 'Heroic Inspiration') {
                // Heroic Inspiration is merged on frontend for humans; ensure we persist when they use it
                classResources[resourceName] = {
                    name: 'Heroic Inspiration',
                    current: Math.max(0, Math.min(current, 1)),
                    max: 1,
                    resetType: 'long',
                    description: 'You gain Heroic Inspiration whenever you finish a Long Rest. You can use it to grant yourself advantage on an attack roll, ability check, or saving throw, or to grant an ally advantage on one such roll.'
                };
            } else if (resourceName === 'Blessing of the Raven Queen') {
                // Shadar-Kai racial trait; merged on frontend. Max = proficiency bonus (capped at 6).
                const max = Math.min(6, Math.max(1, current));
                classResources[resourceName] = {
                    name: 'Blessing of the Raven Queen',
                    current: Math.max(0, Math.min(current, max)),
                    max,
                    resetType: 'long',
                    description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You regain all expended uses when you finish a long rest.'
                };
            }
        }

        data.classResources = classResources;
    })
);

// Add Equipment
router.post('/:id/equipment', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to add equipment', (data) => {
        const { item } = req.body; // item: { name, quantity, etc. }
        const equipment = data.equipment || [];

        equipment.push(item);
        data.equipment = equipment;
    })
);

// Remove Equipment
router.delete('/:id/equipment', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to remove equipment', (data) => {
        const { index, name } = req.body;
        const equipment = data.equipment || [];

        if (index !== undefined && index >= 0 && index < equipment.length) {
            equipment.splice(index, 1);
        } else if (name) {
            // Remove first occurrence of item with name
            const idx = equipment.findIndex((i: any) => (typeof i === 'string' ? i : i.name) === name);
            if (idx !== -1) equipment.splice(idx, 1);
        }

        data.equipment = equipment;
    })
);

// Update Equipment (Toggle equipped, change qty)
router.patch('/:id/equipment', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update equipment', (data) => {
        const { index, item } = req.body;
        const equipment = data.equipment || [];

        if (!(index >= 0 && index < equipment.length)) {
            return { status: 400, error: 'Invalid equipment index' };
        }

        // Merge existing item with updates
        const currentItem = equipment[index];
        // Handle if currentItem is string vs object
        const currentObj = typeof currentItem === 'string' ? { name: currentItem } : currentItem;

        equipment[index] = { ...currentObj, ...item };
        data.equipment = equipment;
    })
);
// Level Up
router.post('/:id/level-up', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const { hpIncrease, subclassId, newSpells, newFeatures, abilityScoreImprovement, multiclass, classToLevel, fightingStyle, scholarSkill, wizardSpellbookSpells, choices } = req.body;

        const character = await findOwnedCharacter(req, res);
        if (!character) return;

        const currentLevel = character.level;
        const newLevel = currentLevel + 1;
        if (newLevel > 20) {
            return res.status(400).json({ error: 'Cannot level up beyond level 20' });
        }

        const [classesList, subclassesList, classFeaturesMap] = await Promise.all([
            getClasses(), getSubclasses(), getClassFeaturesMap()
        ]);

        const data = character.data as any;
        
        // Handle multiclassing
        let classId: string;
        let classesData = data.classes || {};
        
        // If no classes object exists, create it from character.class
        if (Object.keys(classesData).length === 0) {
            classesData = { [character.class.toLowerCase()]: character.level };
        }
        
        if (multiclass) {
            // Multiclassing into a new class
            const multiclassId = multiclass.toLowerCase();
            if (classesData[multiclassId]) {
                return res.status(400).json({ error: 'Cannot multiclass into a class you already have' });
            }
            
            // Check prerequisites (should be checked on frontend, but verify here too)
            const multiclassInfo = classesList.find(c => c.id === multiclassId);
            if (!multiclassInfo) {
                return res.status(400).json({ error: 'Invalid class for multiclassing' });
            }
            
            // Add new class at level 1
            classesData[multiclassId] = 1;
            classId = multiclassId;
            
            // Update character.class to the new class (for backward compatibility)
            // But we'll store all classes in data.classes
        } else if (classToLevel) {
            // Leveling up an existing class
            const classToLevelId = classToLevel.toLowerCase();
            if (!classesData[classToLevelId]) {
                return res.status(400).json({ error: 'Class not found in character classes' });
            }
            classesData[classToLevelId] = (classesData[classToLevelId] || 0) + 1;
            classId = classToLevelId;
        } else {
            // Single class or first class (backward compatibility)
            if (Object.keys(classesData).length === 1) {
                const singleClassId = Object.keys(classesData)[0];
                classesData[singleClassId] = (classesData[singleClassId] || 0) + 1;
                classId = singleClassId;
            } else {
                // Multiple classes but no selection - use first class (shouldn't happen with new UI)
                classId = Object.keys(classesData)[0];
                classesData[classId] = (classesData[classId] || 0) + 1;
            }
        }
        
        // Update data.classes
        data.classes = classesData;

        // Update HP
        let hpApplied: number | null = null;
        if (hpIncrease) {
            const hp = data.hp || { current: 0, max: 0, temp: 0 };
            let inc = Number(hpIncrease);
            const racialTraits: string[] = Array.isArray(data.racialTraits) ? data.racialTraits : [];
            const dwarvenToughness = racialTraits.length > 0
                ? racialTraits.includes('Dwarven Toughness')
                : (character.race || '').toLowerCase() === 'dwarf';
            if (dwarvenToughness) inc += 1;
            // Tough feat: +2 Hit Points per level
            const hasTough = (data.features || []).some((f: any) => f.featId === 'tough' || (f.name || '').toLowerCase() === 'tough');
            if (hasTough) inc += 2;
            const oldMax = Number(hp.max) || 0;
            const oldCurrent = Number(hp.current) || 0;

            hpApplied = inc;
            hp.max = oldMax + inc;
            hp.current = oldCurrent + inc;
            data.hp = hp;
        }

        // Determine primary class (highest level; a tie keeps the current primary class)
        const primaryClassId = pickPrimaryClass(classesData, character.class);
        
        // Update Hit Dice - for multiclass, we need to track hit dice per class
        // For now, we'll use the class being leveled up's hit die
        const classInfo = classesList.find(c => c.id === classId);
        if (classInfo) {
            // For multiclassed characters, hit dice should be tracked per class
            // But for simplicity, we'll use the primary class's hit die type
            // Total hit dice equals character level
            const primaryClassInfo = classesList.find(c => c.id === primaryClassId);
            const hitDice = data.hitDice || { total: currentLevel, spent: 0, dieType: primaryClassInfo?.hitDie || classInfo.hitDie };
            hitDice.total = newLevel; // Total hit dice equals character level
            // Keep spent count, but ensure dieType matches primary class
            if (primaryClassInfo) {
                hitDice.dieType = primaryClassInfo.hitDie;
            }
            data.hitDice = hitDice;
        }

        // Update Subclass (tracked per class; a subclass belongs to the class being leveled)
        const subclassMap = getSubclassMap(data, subclassesList, character.class.toLowerCase());
        const isNewSubclass = !!subclassId && !subclassMap[classId];
        if (subclassId) {
            const chosen = subclassesList.find(s => s.id === subclassId);
            if (!chosen || chosen.classId !== classId) {
                return res.status(400).json({ error: 'Subclass does not belong to the class being leveled' });
            }
            if (subclassMap[classId] && subclassMap[classId] !== subclassId) {
                return res.status(400).json({ error: 'That class already has a subclass' });
            }
            subclassMap[classId] = subclassId;
        }
        setSubclassMap(data, subclassMap, primaryClassId);

        // Get existing features to avoid duplicates
        const charFeatures = data.features || [];
        // Create a more robust duplicate check using both name and source
        const existingFeatureKeys = new Set(
            charFeatures.map((f: any) => 
                `${f.name?.toLowerCase() || ''}_${f.source?.toLowerCase() || ''}`
            )
        );
        const existingFeatureNames = new Set(charFeatures.map((f: any) => f.name.toLowerCase()));

        // Automatically add class features for the new level
        const classLevel = classesData[classId] || 1;
        const classFeaturesList = classFeaturesMap[classId] || [];
        const newClassFeatures = classFeaturesList
            .filter((cf: any) => cf.level === classLevel)
            .filter((cf: any) => {
                const featureKey = `${cf.name.toLowerCase()}_class: ${classId}`;
                return !existingFeatureKeys.has(featureKey) && !existingFeatureNames.has(cf.name.toLowerCase());
            })
            .map((cf: any) => ({
                name: cf.name,
                description: cf.description,
                source: `Class: ${classId.charAt(0).toUpperCase() + classId.slice(1)}`,
                level: cf.level
            }));

        // Automatically add subclass features for the new level of the leveled class.
        // Only if its subclass was already set (the client sends the features when first choosing one)
        const currentSubclassId = subclassMap[classId];
        let newSubclassFeatures: any[] = [];
        if (currentSubclassId && !isNewSubclass) {
            const subclass = subclassesList.find(s => s.id === currentSubclassId);
            // Subclass features key off the level of the subclass's own class (matters for multiclassing)
            const subclassClassLevel = classesData[classId] ?? 0;
            if (subclass) {
                newSubclassFeatures = subclass.features
                    .filter((sf: any) => sf.level === subclassClassLevel)
                    .filter((sf: any) => {
                        const featureKey = `${sf.name.toLowerCase()}_subclass: ${subclass.name.toLowerCase()}`;
                        return !existingFeatureKeys.has(featureKey) && !existingFeatureNames.has(sf.name.toLowerCase());
                    })
                    .map((sf: any) => ({
                        name: sf.name,
                        description: sf.description,
                        source: `Subclass: ${subclass.name}`,
                        level: sf.level
                    }));
            }
        }

        // Combine all new features (class, subclass, and manually added)
        const allNewFeatures = [...newClassFeatures, ...newSubclassFeatures];
        if (newFeatures && Array.isArray(newFeatures)) {
            // Filter out duplicates from manually added features using both name and source
            const manualFeatures = newFeatures.filter((f: any) => {
                const featureKey = `${f.name?.toLowerCase() || ''}_${f.source?.toLowerCase() || ''}`;
                // Also check by name alone as a fallback
                return !existingFeatureKeys.has(featureKey) && !existingFeatureNames.has(f.name?.toLowerCase() || '');
            });
            allNewFeatures.push(...manualFeatures);
        }

        // Update Features - final deduplication pass
        if (allNewFeatures.length > 0) {
            // Combine existing and new features
            const combinedFeatures = [...charFeatures, ...allNewFeatures];
            
            // Deduplicate by creating a map using name+source as key
            const featureMap = new Map<string, any>();
            for (const feature of combinedFeatures) {
                const key = `${feature.name?.toLowerCase() || ''}_${feature.source?.toLowerCase() || ''}`;
                // Keep the first occurrence (existing features take precedence)
                if (!featureMap.has(key)) {
                    featureMap.set(key, feature);
                }
            }
            
            data.features = Array.from(featureMap.values());
        }

        // Update Spells
        if (newSpells && Array.isArray(newSpells)) {
            const spells = data.spells || [];
            data.spells = [...spells, ...newSpells];
        }



        // Ability Score Improvement
        if (abilityScoreImprovement) {
            const scores = data.abilityScores;
            for (const [ability, increase] of Object.entries(abilityScoreImprovement)) {
                if (scores[ability]) {
                    scores[ability] += increase;
                }
            }
            data.abilityScores = scores;
        }

        // Fighting Style (level-up)
        if (fightingStyle && typeof fightingStyle === 'string') {
            const list = data.fightingStyles || [];
            if (!list.includes(fightingStyle)) {
                data.fightingStyles = [...list, fightingStyle];
            }
        }

        // Wizard level-up: add 2 spells to spellbook
        if (wizardSpellbookSpells && Array.isArray(wizardSpellbookSpells) && classId === 'wizard') {
            const spellbook = data.spellbook || [];
            const seen = new Set(spellbook);
            for (const id of wizardSpellbookSpells) {
                const sid = typeof id === 'string' ? id.trim() : String(id);
                if (sid && !seen.has(sid)) {
                    seen.add(sid);
                    spellbook.push(sid);
                }
            }
            data.spellbook = spellbook;
        }

        // Scholar (Wizard level 2) - add skill proficiency and expertise
        if (scholarSkill && typeof scholarSkill === 'string') {
            const skillName = scholarSkill.trim();
            if (skillName) {
                const skills = data.skills || [];
                if (!skills.includes(skillName)) {
                    data.skills = [...skills, skillName];
                }
                const expertise = data.expertise || [];
                if (!expertise.includes(skillName)) {
                    data.expertise = [...expertise, skillName];
                }
            }
        }

        // 2024 class feature choices (Expertise, Primal Knowledge, Deft Explorer languages,
        // Metamagic, Invocations, Weapon Mastery, ...). Only what was actually new is recorded
        // so level-down can take exactly that back.
        const appliedChoices = applyClassChoices(data, choices);

        // Update Class Resources - if provided in request, use it; otherwise recalculate
        if (req.body.classResources) {
            data.classResources = req.body.classResources;
        } else {
            // Recalculate from the 2024 tables, keeping current values where still valid
            const existingResources = data.classResources || {};
            const computed = calculateAllClassResources(classesData, subclassMap, data.abilityScores || {});
            for (const [name, res] of Object.entries(computed)) {
                const prev = existingResources[name];
                existingResources[name] = prev
                    ? { ...res, current: Math.min(res.max, (prev.current ?? 0) + Math.max(0, res.max - (prev.max ?? 0))) }
                    : res;
            }
            data.classResources = existingResources;
        }

        // Store level-up history for potential undo
        const levelHistory = data.levelHistory || [];
        levelHistory.push({
            level: newLevel,
            hpIncrease: hpIncrease ? Number(hpIncrease) : null,
            // What was actually added to max HP (includes Dwarven Toughness / Tough), for level-down
            hpApplied,
            subclassId: subclassId || null,
            // Which class gained the level (and whether it was a new multiclass), for level-down
            classId,
            multiclass: !!multiclass,
            newSpells: newSpells || [],
            newFeatures: allNewFeatures.map((f: any) => ({ name: f.name, level: f.level })),
            abilityScoreImprovement: abilityScoreImprovement || null,
            hitDiceAdded: true, // Track that we added a hit die
            scholarSkill: scholarSkill && typeof scholarSkill === 'string' ? scholarSkill.trim() : null,
            wizardSpellbookSpells: wizardSpellbookSpells && Array.isArray(wizardSpellbookSpells) ? wizardSpellbookSpells : null,
            choices: appliedChoices,
            timestamp: new Date().toISOString()
        });
        data.levelHistory = levelHistory;

        // Update character.class to primary class for backward compatibility
        const updated = await prisma.character.update({
            where: { id: characterId },
            data: {
                level: newLevel,
                class: primaryClassId.charAt(0).toUpperCase() + primaryClassId.slice(1), // Update to primary class
                data
            }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to level up' });
    }
});

// Level Down (Undo Last Level)
router.post('/:id/level-down', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;

        const character = await findOwnedCharacter(req, res);
        if (!character) return;

        const currentLevel = character.level;
        if (currentLevel <= 1) {
            return res.status(400).json({ error: 'Cannot level down below level 1' });
        }

        const data = character.data as any;
        const levelHistory = data.levelHistory || [];

        // Find the most recent level-up entry
        const lastLevelUp = levelHistory
            .filter((entry: any) => entry.level === currentLevel)
            .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

        if (!lastLevelUp) {
            // Fallback: try to reverse engineer what was added at this level
            return res.status(400).json({ 
                error: 'No level-up history found. Cannot safely level down without history.' 
            });
        }

        const newLevel = currentLevel - 1;

        // Reverse HP changes
        if (lastLevelUp.hpIncrease) {
            const hp = data.hp || { current: 0, max: 0, temp: 0 };
            const dec = Number(lastLevelUp.hpApplied ?? lastLevelUp.hpIncrease);
            hp.max = Math.max(0, (Number(hp.max) || 0) - dec);
            hp.current = Math.max(0, Math.min(hp.current, hp.max)); // Ensure current doesn't exceed new max
            data.hp = hp;
        }

        // Reverse Hit Dice - remove 1 hit die
        if (lastLevelUp.hitDiceAdded) {
            const hitDice = data.hitDice || { total: currentLevel, spent: 0, dieType: 8 };
            hitDice.total = Math.max(1, newLevel); // Minimum 1 hit die at level 1
            // Ensure spent doesn't exceed total
            hitDice.spent = Math.min(hitDice.spent, hitDice.total);
            data.hitDice = hitDice;
        }

        // Reverse the class level gained (a class multiclassed into at this level is removed)
        const classesData: Record<string, number> = { ...(data.classes || {}) };
        const leveledClassId: string | undefined = lastLevelUp.classId
            || (Object.keys(classesData).length === 1 ? Object.keys(classesData)[0] : undefined);
        if (leveledClassId && classesData[leveledClassId]) {
            classesData[leveledClassId] -= 1;
            if (classesData[leveledClassId] <= 0) delete classesData[leveledClassId];
            data.classes = classesData;
        }

        // Reverse the subclass chosen at this level
        const primaryClassId = pickPrimaryClass(classesData, character.class);
        if (lastLevelUp.subclassId) {
            const subclassMap = getSubclassMap(data, await getSubclasses(), character.class.toLowerCase());
            for (const [cid, sid] of Object.entries(subclassMap)) {
                if (sid === lastLevelUp.subclassId) delete subclassMap[cid];
            }
            if (data.subclassId === lastLevelUp.subclassId) delete data.subclassId;
            setSubclassMap(data, subclassMap, primaryClassId);
        }

        // Remove features added at this level
        if (lastLevelUp.newFeatures && lastLevelUp.newFeatures.length > 0) {
            const features = data.features || [];
            const featuresToRemove = new Set(
                lastLevelUp.newFeatures.map((f: any) => f.name.toLowerCase())
            );
            
            // Remove features that match the level-up history
            data.features = features.filter((f: any) => {
                // Remove if it matches a feature from the level-up history
                if (featuresToRemove.has(f.name?.toLowerCase())) {
                    // Double-check it's from the right level
                    return f.level !== currentLevel;
                }
                return true;
            });
        }

        // Remove spells added at this level
        if (lastLevelUp.newSpells && lastLevelUp.newSpells.length > 0) {
            const spells = data.spells || [];
            const spellsToRemove = new Set(
                lastLevelUp.newSpells.map((s: any) => s.id || s.name?.toLowerCase())
            );
            
            data.spells = spells.filter((s: any) => {
                const spellId = s.id || s.name?.toLowerCase();
                return !spellsToRemove.has(spellId);
            });
        }

        // Reverse ability score improvements
        if (lastLevelUp.abilityScoreImprovement) {
            const scores = data.abilityScores;
            for (const [ability, increase] of Object.entries(lastLevelUp.abilityScoreImprovement)) {
                if (scores[ability]) {
                    scores[ability] = Math.max(0, scores[ability] - (increase as number));
                }
            }
            data.abilityScores = scores;
        }

        // Reverse Wizard spellbook (remove spells added at this level)
        if (lastLevelUp.wizardSpellbookSpells && Array.isArray(lastLevelUp.wizardSpellbookSpells)) {
            const spellbook = data.spellbook || [];
            const toRemove = new Set(lastLevelUp.wizardSpellbookSpells);
            data.spellbook = spellbook.filter((id: string) => !toRemove.has(id));
        }

        // Reverse Scholar skill (remove from skills and expertise if it was added at this level)
        if (lastLevelUp.scholarSkill) {
            const skillName = lastLevelUp.scholarSkill;
            if (data.skills && Array.isArray(data.skills)) {
                data.skills = data.skills.filter((s: string) => s !== skillName);
            }
            if (data.expertise && Array.isArray(data.expertise)) {
                data.expertise = data.expertise.filter((s: string) => s !== skillName);
            }
        }

        // Reverse class feature choices made at this level
        if (lastLevelUp.choices) revertClassChoices(data, lastLevelUp.choices);

        // Remove this level-up entry from history
        data.levelHistory = levelHistory.filter((entry: any) => entry !== lastLevelUp);

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: {
                level: newLevel,
                class: primaryClassId.charAt(0).toUpperCase() + primaryClassId.slice(1),
                data
            }
        });

        res.json(updated);
    } catch (error) {
        console.error('Level down error:', error);
        res.status(500).json({ error: 'Failed to level down' });
    }
});

// Add Spell (Learn/Prepare)
router.post('/:id/spells', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to add spell', (data) => {
        const { spellId, name, level, school, prepared } = req.body;
        const spells = data.spells || [];

        // Check if spell already exists
        if (!spells.find((s: any) => s.id === spellId || s.name === name)) {
            spells.push({ id: spellId, name, level, school, prepared: prepared || false });
        }

        data.spells = spells;
    })
);

// Remove Spell
router.delete('/:id/spells/:spellId', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to remove spell', (data) => {
        const { spellId } = req.params;
        const spells = data.spells || [];

        data.spells = spells.filter((s: any) => s.id !== spellId);
    })
);

// Toggle Prepare Spell
router.patch('/:id/spells/:spellId/prepare', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to update spell preparation', (data) => {
        const { spellId } = req.params;
        const { prepared } = req.body;
        const spells = data.spells || [];

        const spell = spells.find((s: any) => s.id === spellId);
        if (spell) {
            spell.prepared = prepared;
        }

        data.spells = spells;
    })
);

// Add Spells to Wizard Spellbook
router.post('/:id/spellbook', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to add spells to spellbook', (data) => {
        const { spellIds } = req.body;
        if (!spellIds || !Array.isArray(spellIds)) {
            return { status: 400, error: 'spellIds array is required' };
        }

        const spellbook = data.spellbook || [];
        const seen = new Set(spellbook);
        for (const id of spellIds) {
            const sid = typeof id === 'string' ? id.trim() : String(id);
            if (sid && !seen.has(sid)) {
                seen.add(sid);
                spellbook.push(sid);
            }
        }
        data.spellbook = spellbook;
    })
);

// Remove Spells from Wizard Spellbook
router.delete('/:id/spellbook', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to remove spells from spellbook', (data) => {
        const { spellIds } = req.body;
        if (!spellIds || !Array.isArray(spellIds)) {
            return { status: 400, error: 'spellIds array is required' };
        }

        const spellbook = data.spellbook || [];
        const toRemove = new Set(spellIds.map((id: any) => typeof id === 'string' ? id.trim() : String(id)));
        data.spellbook = spellbook.filter((id: string) => !toRemove.has(id));

        // Also remove those spells from data.spells (unprepare / remove from known) so they don't appear as prepared
        const spells = data.spells || [];
        data.spells = spells.filter((s: any) => !toRemove.has(s.id || s.spellId));
    })
);

// Add Feature
router.post('/:id/features', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to add feature', (data) => {
        const { feature } = req.body;
        const features = data.features || [];
        features.push(feature);
        data.features = features;
    })
);

// Remove Feature
router.delete('/:id/features', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to remove feature', (data) => {
        const { index, name } = req.body;
        const features = data.features || [];

        if (index !== undefined && index >= 0 && index < features.length) {
            features.splice(index, 1);
        } else if (name) {
            const idx = features.findIndex((f: any) => f.name === name);
            if (idx !== -1) features.splice(idx, 1);
        }

        data.features = features;
    })
);

const actionKey = (name: unknown) => String(name ?? '').trim().toLowerCase();

// Add Action. Names are unique per character: adding one that already exists is a
// no-op, so double clicks or a client working from a stale action list can't duplicate it.
router.post('/:id/actions', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to add action', (data) => {
        const { action } = req.body;
        if (!action || typeof action !== 'object' || !actionKey(action.name)) {
            return { status: 400, error: 'Action name is required' };
        }
        const actions = Array.isArray(data.actions) ? data.actions : [];
        if (actions.some((a: any) => actionKey(a?.name) === actionKey(action.name))) return;
        actions.push(action);
        data.actions = actions;
    })
);

// Remove Action. When the client sends the action's name, the name decides what is
// removed (the index is only a hint), so a stale index can't delete a different action.
router.delete('/:id/actions', authenticateToken, (req: AuthRequest, res) =>
    mutateCharacterData(req, res, 'Failed to remove action', (data) => {
        const { index, name } = req.body;
        const actions = Array.isArray(data.actions) ? data.actions : [];

        if (name !== undefined) {
            const at = actionKey(actions[index]?.name) === actionKey(name)
                ? index
                : actions.findIndex((a: any) => actionKey(a?.name) === actionKey(name));
            if (at >= 0) actions.splice(at, 1);
        } else if (index !== undefined && index >= 0 && index < actions.length) {
            actions.splice(index, 1);
        }

        data.actions = actions;
    })
);

export default router;
