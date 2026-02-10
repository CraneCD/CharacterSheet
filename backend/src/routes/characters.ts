import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { classFeatures } from '../data/classFeatures';
import { subclasses } from '../data/subclasses';
import { classes } from '../data/classes';

const router = express.Router();
const prisma = new PrismaClient();

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
            }
        });
        res.json(characters);
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
        if (!data.hitDice) {
            const classInfo = classes.find(c => c.id === character.class.toLowerCase());
            if (classInfo) {
                data.hitDice = {
                    total: character.level,
                    spent: 0,
                    dieType: classInfo.hitDie
                };
                // Save the initialization (optional - could be done lazily)
                // For now, we'll just return it with the initialized value
            }
        }

        // Initialize class resources for existing characters that don't have them
        // Note: Full calculation should be done on frontend, but we can initialize basic ones here
        if (!data.classResources || Object.keys(data.classResources).length === 0) {
            const classId = character.class.toLowerCase();
            const abilityScores = data.abilityScores || {};
            
            // Simple initialization for common resources
            if (classId === 'sorcerer') {
                data.classResources = {
                    'Sorcery Points': {
                        name: 'Sorcery Points',
                        current: character.level,
                        max: character.level,
                        resetType: 'long',
                        description: 'You can use sorcery points to create spell slots or use Metamagic.'
                    }
                };
            } else if (classId === 'monk') {
                data.classResources = {
                    'Ki Points': {
                        name: 'Ki Points',
                        current: character.level,
                        max: character.level,
                        resetType: 'short',
                        description: 'You can spend ki points to fuel various ki features.'
                    }
                };
            } else if (classId === 'fighter') {
                const fighterResources: Record<string, { name: string; current: number; max: number; resetType: string; description: string }> = {
                    'Action Surge': {
                        name: 'Action Surge',
                        current: character.level >= 17 ? 2 : 1,
                        max: character.level >= 17 ? 2 : 1,
                        resetType: 'short',
                        description: 'On your turn, you can take one additional action.'
                    },
                    'Second Wind': {
                        name: 'Second Wind',
                        current: 1,
                        max: 1,
                        resetType: 'short',
                        description: 'Use a bonus action to regain 1d10 + fighter level hit points.'
                    }
                };
                // Gunslinger: Grit Points (Wis mod, min 1) at level 3+
                const subclassId = (data.subclassId as string) || '';
                if (subclassId === 'gunslinger' && character.level >= 3) {
                    const wis = (data.abilityScores as Record<string, number>)?.wis;
                    const gritMax = wis != null ? Math.max(1, Math.floor((wis - 10) / 2)) : 1;
                    fighterResources['Grit Points'] = {
                        name: 'Grit Points',
                        current: gritMax,
                        max: gritMax,
                        resetType: 'short',
                        description: 'You spend grit to perform trick shots with firearms. Regain grit on a short rest, when you score a critical hit with a firearm, or when you reduce a creature to 0 HP with a firearm attack.'
                    };
                }
                data.classResources = fighterResources;
            } else if (classId === 'barbarian') {
                let rageUses = 2;
                if (character.level >= 3) rageUses = 3;
                if (character.level >= 6) rageUses = 4;
                if (character.level >= 12) rageUses = 5;
                if (character.level >= 17) rageUses = 6;
                if (character.level >= 20) rageUses = 999;
                
                data.classResources = {
                    'Rage': {
                        name: 'Rage',
                        current: rageUses === 999 ? 999 : rageUses,
                        max: rageUses === 999 ? 999 : rageUses,
                        resetType: 'long',
                        description: 'Enter a rage as a bonus action. Gain advantage on Strength checks and saves, bonus damage, and resistance to bludgeoning, piercing, and slashing damage.'
                    }
                };
            } else if (classId === 'cleric') {
                let channelUses = 1;
                if (character.level >= 6) channelUses = 2;
                if (character.level >= 18) channelUses = 3;
                
                data.classResources = {
                    'Channel Divinity': {
                        name: 'Channel Divinity',
                        current: channelUses,
                        max: channelUses,
                        resetType: 'short',
                        description: 'Channel divine energy to fuel magical effects.'
                    }
                };
            } else if (classId === 'paladin') {
                const chaMod = abilityScores.cha ? Math.max(1, Math.floor((abilityScores.cha - 10) / 2)) : 1;
                data.classResources = {
                    'Channel Divinity': {
                        name: 'Channel Divinity',
                        current: character.level >= 6 ? 2 : 1,
                        max: character.level >= 6 ? 2 : 1,
                        resetType: 'short',
                        description: 'Channel divine energy to fuel magical effects.'
                    },
                    'Lay on Hands': {
                        name: 'Lay on Hands',
                        current: character.level * 5,
                        max: character.level * 5,
                        resetType: 'long',
                        description: `Pool of healing power. Restore a total of ${character.level * 5} hit points.`
                    }
                };
            } else if (classId === 'bard') {
                const chaMod = abilityScores.cha ? Math.max(1, Math.floor((abilityScores.cha - 10) / 2)) : 1;
                data.classResources = {
                    'Bardic Inspiration': {
                        name: 'Bardic Inspiration',
                        current: chaMod,
                        max: chaMod,
                        resetType: character.level >= 5 ? 'short' : 'long',
                        description: 'Inspire others through stirring words or music.'
                    }
                };
            } else if (classId === 'druid') {
                data.classResources = {
                    'Wild Shape': {
                        name: 'Wild Shape',
                        current: 2,
                        max: 2,
                        resetType: 'short',
                        description: 'Use your action to magically assume the shape of a beast you have seen before.'
                    }
                };
            }
        }

        // Patch: add Grit Points for existing Fighter Gunslingers who have resources but no Grit
        const classId = (character.class as string).toLowerCase();
        const subclassId = (data.subclassId as string) || '';
        if (
            data.classResources &&
            Object.keys(data.classResources).length > 0 &&
            classId === 'fighter' &&
            subclassId === 'gunslinger' &&
            character.level >= 3 &&
            !(data.classResources as Record<string, unknown>)['Grit Points']
        ) {
            const abilityScores = (data.abilityScores as Record<string, number>) || {};
            const wis = abilityScores.wis;
            const gritMax = wis != null ? Math.max(1, Math.floor((wis - 10) / 2)) : 1;
            (data.classResources as Record<string, { name: string; current: number; max: number; resetType: string; description: string }>)['Grit Points'] = {
                name: 'Grit Points',
                current: gritMax,
                max: gritMax,
                resetType: 'short',
                description: 'You spend grit to perform trick shots with firearms. Regain grit on a short rest, when you score a critical hit with a firearm, or when you reduce a creature to 0 HP with a firearm attack.'
            };
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
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { name, race, class: charClass, level, data, isPublic } = req.body;

        const existing = await prisma.character.findUnique({ where: { id: characterId } });
        if (!existing || existing.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const updated = await prisma.character.update({
            where: { id: characterId },
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
        res.status(500).json({ error: 'Failed to update character' });
    }
});

// Delete a character
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;

        const existing = await prisma.character.findUnique({ where: { id: characterId } });
        if (!existing || existing.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await prisma.character.delete({ where: { id: characterId } });
        res.json({ message: 'Character deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete character' });
    }
});

export default router;

// Update Character HP
router.patch('/:id/hp', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { current, temp, max } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const hp = data.hp || { current: 10, max: 10, temp: 0 };

        if (current !== undefined) hp.current = current;
        if (temp !== undefined) hp.temp = temp;
        if (max !== undefined) hp.max = max;

        // Ensure current doesn't exceed max (unless temp HP is involved, handled separately)
        // D&D 5e: Current HP cannot exceed Max HP. Temp HP is separate.
        if (hp.current > hp.max) hp.current = hp.max;
        if (hp.current < 0) hp.current = 0;

        data.hp = hp;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update HP' });
    }
});

// Update Character Hit Dice
router.patch('/:id/hit-dice', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spent, total, dieType } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const hitDice = data.hitDice || { total: character.level, spent: 0, dieType: 8 };

        if (spent !== undefined) {
            hitDice.spent = Math.max(0, Math.min(spent, hitDice.total)); // Ensure spent is between 0 and total
        }
        if (total !== undefined) hitDice.total = total;
        if (dieType !== undefined) hitDice.dieType = dieType;

        data.hitDice = hitDice;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update hit dice' });
    }
});

// Update Character Class Resources
router.patch('/:id/class-resources', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { resourceName, current, resetType, resources } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        let classResources = data.classResources || {};

        // If resetType is provided, reset all resources of that type
        if (resetType) {
            for (const [name, resource] of Object.entries(classResources)) {
                const res = resource as any;
                if ((resetType === 'short' && res.resetType === 'short') ||
                    (resetType === 'long' && (res.resetType === 'long' || res.resetType === 'short'))) {
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
            }
        }

        data.classResources = classResources;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update class resources' });
    }
});

// Add Equipment
router.post('/:id/equipment', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { item } = req.body; // item: { name, quantity, etc. }

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const equipment = data.equipment || [];

        equipment.push(item);
        data.equipment = equipment;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add equipment' });
    }
});

// Remove Equipment
router.delete('/:id/equipment', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { index, name } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        let equipment = data.equipment || [];

        if (index !== undefined && index >= 0 && index < equipment.length) {
            equipment.splice(index, 1);
        } else if (name) {
            // Remove first occurrence of item with name
            const idx = equipment.findIndex((i: any) => (typeof i === 'string' ? i : i.name) === name);
            if (idx !== -1) equipment.splice(idx, 1);
        }

        data.equipment = equipment;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove equipment' });
    }
});

// Update Equipment (Toggle equipped, change qty)
router.patch('/:id/equipment', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { index, item } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const equipment = data.equipment || [];

        if (index >= 0 && index < equipment.length) {
            // Merge existing item with updates
            const currentItem = equipment[index];
            // Handle if currentItem is string vs object
            const currentObj = typeof currentItem === 'string' ? { name: currentItem } : currentItem;

            equipment[index] = { ...currentObj, ...item };
            data.equipment = equipment;

            const updated = await prisma.character.update({
                where: { id: characterId },
                data: { data }
            });
            res.json(updated);
        } else {
            res.status(400).json({ error: 'Invalid equipment index' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update equipment' });
    }
});
// Level Up
router.post('/:id/level-up', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { hpIncrease, subclassId, newSpells, newFeatures, abilityScoreImprovement, multiclass, classToLevel, fightingStyle, scholarSkill, wizardSpellbookSpells } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const currentLevel = character.level;
        const newLevel = currentLevel + 1;
        if (newLevel > 20) {
            return res.status(400).json({ error: 'Cannot level up beyond level 20' });
        }

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
            const multiclassInfo = classes.find(c => c.id === multiclassId);
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
        console.log('Level Up Request:', { hpIncrease, currentHp: data.hp });
        if (hpIncrease) {
            const hp = data.hp || { current: 0, max: 0, temp: 0 };
            let inc = Number(hpIncrease);
            const dwarvenToughness = (character.race || '').toLowerCase() === 'dwarf';
            if (dwarvenToughness) inc += 1;
            const oldMax = Number(hp.max) || 0;
            const oldCurrent = Number(hp.current) || 0;

            console.log(`Updating HP: Max ${oldMax} -> ${oldMax + inc}, Current ${oldCurrent} -> ${oldCurrent + inc}`);

            hp.max = oldMax + inc;
            hp.current = oldCurrent + inc;
            data.hp = hp;
        }

        // Determine primary class (highest level)
        const primaryClassId = Object.entries(classesData).reduce((a, b) => 
            (b[1] as number) > (a[1] as number) ? b : a
        )[0];
        
        // Update Hit Dice - for multiclass, we need to track hit dice per class
        // For now, we'll use the class being leveled up's hit die
        const classInfo = classes.find(c => c.id === classId);
        if (classInfo) {
            // For multiclassed characters, hit dice should be tracked per class
            // But for simplicity, we'll use the primary class's hit die type
            // Total hit dice equals character level
            const primaryClassInfo = classes.find(c => c.id === primaryClassId);
            const hitDice = data.hitDice || { total: currentLevel, spent: 0, dieType: primaryClassInfo?.hitDie || classInfo.hitDie };
            hitDice.total = newLevel; // Total hit dice equals character level
            // Keep spent count, but ensure dieType matches primary class
            if (primaryClassInfo) {
                hitDice.dieType = primaryClassInfo.hitDie;
            }
            data.hitDice = hitDice;
        }

        // Update Subclass
        if (subclassId) {
            data.subclassId = subclassId;
        }

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
        const classFeaturesList = classFeatures[classId] || [];
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

        // Automatically add subclass features for the new level
        // Only if subclass was already set (not being set for the first time)
        const currentSubclassId = subclassId || data.subclassId;
        const isNewSubclass = subclassId && !data.subclassId;
        let newSubclassFeatures: any[] = [];
        if (currentSubclassId && !isNewSubclass) {
            // Only auto-add if subclass was already set (to avoid duplicates when first selecting)
            const subclass = subclasses.find(s => s.id === currentSubclassId);
            if (subclass) {
                newSubclassFeatures = subclass.features
                    .filter((sf: any) => sf.level === newLevel)
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

        // Update Class Resources - if provided in request, use it; otherwise recalculate
        if (req.body.classResources) {
            data.classResources = req.body.classResources;
        } else {
            // Simple backend recalculation for common resources
            // Full calculation should be done on frontend, but this handles basic cases
            const existingResources = data.classResources || {};
            const classId = character.class.toLowerCase();
            
            // Update resources that scale with level
            if (classId === 'sorcerer' && existingResources['Sorcery Points']) {
                existingResources['Sorcery Points'].max = newLevel;
                existingResources['Sorcery Points'].current = Math.min(existingResources['Sorcery Points'].current + 1, newLevel);
            }
            if (classId === 'monk' && existingResources['Ki Points']) {
                existingResources['Ki Points'].max = newLevel;
                existingResources['Ki Points'].current = Math.min(existingResources['Ki Points'].current + 1, newLevel);
            }
            if (classId === 'fighter' && existingResources['Action Surge']) {
                const newMax = newLevel >= 17 ? 2 : 1;
                if (existingResources['Action Surge'].max < newMax) {
                    existingResources['Action Surge'].max = newMax;
                    existingResources['Action Surge'].current = newMax;
                }
            }
            if (classId === 'paladin' && existingResources['Lay on Hands']) {
                existingResources['Lay on Hands'].max = newLevel * 5;
                existingResources['Lay on Hands'].current = newLevel * 5;
            }
            
            data.classResources = existingResources;
        }

        // Store level-up history for potential undo
        const levelHistory = data.levelHistory || [];
        levelHistory.push({
            level: newLevel,
            hpIncrease: hpIncrease ? Number(hpIncrease) : null,
            subclassId: subclassId || null,
            newSpells: newSpells || [],
            newFeatures: allNewFeatures.map((f: any) => ({ name: f.name, level: f.level })),
            abilityScoreImprovement: abilityScoreImprovement || null,
            hitDiceAdded: true, // Track that we added a hit die
            scholarSkill: scholarSkill && typeof scholarSkill === 'string' ? scholarSkill.trim() : null,
            wizardSpellbookSpells: wizardSpellbookSpells && Array.isArray(wizardSpellbookSpells) ? wizardSpellbookSpells : null,
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
        const userId = req.user!.id;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

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
            const dec = Number(lastLevelUp.hpIncrease);
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

        // Reverse subclass (only if it was set at this level)
        // Note: We can't safely remove subclass if it was set earlier, so we only remove if it was set at this exact level
        if (lastLevelUp.subclassId && data.subclassId === lastLevelUp.subclassId) {
            // Check if subclass was set at this level by checking if there are features from this level
            const subclassFeaturesAtThisLevel = (data.features || []).filter(
                (f: any) => f.level === currentLevel && f.source?.includes('Subclass')
            );
            if (subclassFeaturesAtThisLevel.length > 0) {
                // Only remove if this was the level where subclass was first set
                // For now, we'll be conservative and not remove subclass
                // This could be improved with better history tracking
            }
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

        // Remove this level-up entry from history
        data.levelHistory = levelHistory.filter((entry: any) => entry !== lastLevelUp);

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: {
                level: newLevel,
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
router.post('/:id/spells', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spellId, name, level, school, prepared } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const spells = data.spells || [];

        // Check if spell already exists
        if (!spells.find((s: any) => s.id === spellId || s.name === name)) {
            spells.push({ id: spellId, name, level, school, prepared: prepared || false });
        }

        data.spells = spells;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add spell' });
    }
});

// Remove Spell
router.delete('/:id/spells/:spellId', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spellId } = req.params;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const spells = data.spells || [];

        const updatedSpells = spells.filter((s: any) => s.id !== spellId);
        data.spells = updatedSpells;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove spell' });
    }
});

// Toggle Prepare Spell
router.patch('/:id/spells/:spellId/prepare', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spellId } = req.params;
        const { prepared } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const spells = data.spells || [];

        const spell = spells.find((s: any) => s.id === spellId);
        if (spell) {
            spell.prepared = prepared;
        }

        data.spells = spells;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update spell preparation' });
    }
});

// Add Spells to Wizard Spellbook
router.post('/:id/spellbook', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spellIds } = req.body;

        if (!spellIds || !Array.isArray(spellIds)) {
            return res.status(400).json({ error: 'spellIds array is required' });
        }

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
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

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add spells to spellbook' });
    }
});

// Remove Spells from Wizard Spellbook
router.delete('/:id/spellbook', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { spellIds } = req.body;

        if (!spellIds || !Array.isArray(spellIds)) {
            return res.status(400).json({ error: 'spellIds array is required' });
        }

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const spellbook = data.spellbook || [];
        const toRemove = new Set(spellIds.map((id: any) => typeof id === 'string' ? id.trim() : String(id)));
        data.spellbook = spellbook.filter((id: string) => !toRemove.has(id));

        // Also remove those spells from data.spells (unprepare / remove from known) so they don't appear as prepared
        const spells = data.spells || [];
        data.spells = spells.filter((s: any) => !toRemove.has(s.id || s.spellId));

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove spells from spellbook' });
    }
});

// Add Feature
router.post('/:id/features', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { feature } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const features = data.features || [];
        features.push(feature);
        data.features = features;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add feature' });
    }
});

// Remove Feature
router.delete('/:id/features', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { index, name } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        let features = data.features || [];

        if (index !== undefined && index >= 0 && index < features.length) {
            features.splice(index, 1);
        } else if (name) {
            const idx = features.findIndex((f: any) => f.name === name);
            if (idx !== -1) features.splice(idx, 1);
        }

        data.features = features;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove feature' });
    }
});

// Add Action
router.post('/:id/actions', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { action } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const actions = data.actions || [];
        actions.push(action);
        data.actions = actions;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add action' });
    }
});

// Remove Action
router.delete('/:id/actions', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const characterId = req.params.id;
        const userId = req.user!.id;
        const { index } = req.body;

        const character = await prisma.character.findUnique({ where: { id: characterId } });
        if (!character || character.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const data = character.data as any;
        const actions = data.actions || [];

        if (index !== undefined && index >= 0 && index < actions.length) {
            actions.splice(index, 1);
        }

        data.actions = actions;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: { data }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove action' });
    }
});
