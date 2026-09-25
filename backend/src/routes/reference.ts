import express from 'express';
import { getReferenceRows } from '../lib/referenceCache';
import { withCanonicalId } from '../lib/referenceTypes';

const router = express.Router();

// Reference data is admin-editable now, so cache it for a short window only
// (the referenceCache module already dedupes DB hits for longer than this).
router.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=300');
    next();
});

async function listOf(type: Parameters<typeof withCanonicalId>[0]): Promise<any[]> {
    const rows = await getReferenceRows(type);
    return rows.map((r) => withCanonicalId(type, r.key, r.data));
}

// Get all spells
router.get('/spells', async (req, res) => {
    res.json(await listOf('spell'));
});

// Slim projection for pickers that don't render spell text (description is
// ~80% of the full payload). Registered before /spells/:id so "summary"
// isn't matched as a spell id.
router.get('/spells/summary', async (req, res) => {
    const spells = await listOf('spell');
    const summaries = spells.map(({ id, name, level, school, classes, castingTime, ritual, legacy }) => ({
        id, name, level, school, classes, castingTime, ritual, legacy
    }));
    res.json(summaries);
});

// Get single spell
router.get('/spells/:id', async (req, res) => {
    const spells = await listOf('spell');
    const spell = spells.find(s => s.id === req.params.id);
    if (!spell) {
        return res.status(404).json({ error: 'Spell not found' });
    }
    res.json(spell);
});

// Get all races
router.get('/races', async (req, res) => {
    res.json(await listOf('race'));
});

// Get single race
router.get('/races/:id', async (req, res) => {
    const races = await listOf('race');
    const race = races.find(r => r.id === req.params.id);
    if (!race) {
        return res.status(404).json({ error: 'Race not found' });
    }
    res.json(race);
});

// Get all classes
router.get('/classes', async (req, res) => {
    res.json(await listOf('class'));
});

// Get single class
router.get('/classes/:id', async (req, res) => {
    const classes = await listOf('class');
    const classInfo = classes.find(c => c.id === req.params.id);
    if (!classInfo) {
        return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classInfo);
});

// Get all backgrounds
router.get('/backgrounds', async (req, res) => {
    res.json(await listOf('background'));
});

// Get single background
router.get('/backgrounds/:id', async (req, res) => {
    const backgrounds = await listOf('background');
    const background = backgrounds.find(b => b.id === req.params.id);
    if (!background) {
        return res.status(404).json({ error: 'Background not found' });
    }
    res.json(background);
});

// Get all subclasses
router.get('/subclasses', async (req, res) => {
    res.json(await listOf('subclass'));
});

// Get single subclass
router.get('/subclasses/:id', async (req, res) => {
    const subclasses = await listOf('subclass');
    const subclass = subclasses.find(s => s.id === req.params.id);
    if (!subclass) {
        return res.status(404).json({ error: 'Subclass not found' });
    }
    res.json(subclass);
});

// Get class features for a class
router.get('/class-features/:classId', async (req, res) => {
    const rows = await getReferenceRows('classFeature');
    const row = rows.find(r => r.key === req.params.classId);
    if (!row) {
        return res.status(404).json({ error: 'Class features not found' });
    }
    res.json(row.data);
});

// Get all class features, as a map keyed by class id
router.get('/class-features', async (req, res) => {
    const rows = await getReferenceRows('classFeature');
    const map: Record<string, any> = {};
    for (const row of rows) map[row.key] = row.data;
    res.json(map);
});

// Get all feats
router.get('/feats', async (req, res) => {
    res.json(await listOf('feat'));
});

// Get single feat
router.get('/feats/:id', async (req, res) => {
    const feats = await listOf('feat');
    const feat = feats.find(f => f.id === req.params.id);
    if (!feat) {
        return res.status(404).json({ error: 'Feat not found' });
    }
    res.json(feat);
});

// Get all base items
router.get('/base-items', async (req, res) => {
    res.json(await listOf('baseItem'));
});

// Get base items by category
router.get('/base-items/:category', async (req, res) => {
    const baseItems = await listOf('baseItem');
    const filtered = baseItems.filter(item => item.category === req.params.category);
    res.json(filtered);
});

// Get all traits, as a map keyed by trait name
router.get('/traits', async (req, res) => {
    const rows = await getReferenceRows('trait');
    const map: Record<string, any> = {};
    for (const row of rows) map[row.key] = row.data;
    res.json(map);
});

// Get single trait
router.get('/traits/:name', async (req, res) => {
    const rows = await getReferenceRows('trait');
    const row = rows.find(r => r.key === req.params.name);
    if (!row) {
        return res.status(404).json({ error: 'Trait not found' });
    }
    res.json(row.data);
});

// Get all fighting styles
router.get('/fighting-styles', async (req, res) => {
    res.json(await listOf('fightingStyle'));
});

// SRD monster stat blocks (for the DM's bestiary and encounters)
router.get('/monsters', async (req, res) => {
    res.json(await listOf('monster'));
});

router.get('/monsters/:id', async (req, res) => {
    const monsters = await listOf('monster');
    const monster = monsters.find(m => m.id === req.params.id);
    if (!monster) {
        return res.status(404).json({ error: 'Monster not found' });
    }
    res.json(monster);
});

export default router;
