import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { classFeatures } from '../data/classFeatures';
import { subclasses } from '../data/subclasses';

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

        res.json(character);
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
        const { hpIncrease, subclassId, newSpells, newFeatures, abilityScoreImprovement } = req.body;

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

        // Update HP
        console.log('Level Up Request:', { hpIncrease, currentHp: data.hp });
        if (hpIncrease) {
            const hp = data.hp || { current: 0, max: 0, temp: 0 };
            const inc = Number(hpIncrease);
            const oldMax = Number(hp.max) || 0;
            const oldCurrent = Number(hp.current) || 0;

            console.log(`Updating HP: Max ${oldMax} -> ${oldMax + inc}, Current ${oldCurrent} -> ${oldCurrent + inc}`);

            hp.max = oldMax + inc;
            hp.current = oldCurrent + inc;
            data.hp = hp;
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
        const classId = character.class.toLowerCase();
        const classFeaturesList = classFeatures[classId] || [];
        const newClassFeatures = classFeaturesList
            .filter((cf: any) => cf.level === newLevel)
            .filter((cf: any) => {
                const featureKey = `${cf.name.toLowerCase()}_class: ${character.class.toLowerCase()}`;
                return !existingFeatureKeys.has(featureKey) && !existingFeatureNames.has(cf.name.toLowerCase());
            })
            .map((cf: any) => ({
                name: cf.name,
                description: cf.description,
                source: `Class: ${character.class}`,
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

        // Store level-up history for potential undo
        const levelHistory = data.levelHistory || [];
        levelHistory.push({
            level: newLevel,
            hpIncrease: hpIncrease ? Number(hpIncrease) : null,
            subclassId: subclassId || null,
            newSpells: newSpells || [],
            newFeatures: allNewFeatures.map((f: any) => ({ name: f.name, level: f.level })),
            abilityScoreImprovement: abilityScoreImprovement || null,
            timestamp: new Date().toISOString()
        });
        data.levelHistory = levelHistory;

        const updated = await prisma.character.update({
            where: { id: characterId },
            data: {
                level: newLevel,
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
