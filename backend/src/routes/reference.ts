import express from 'express';
import { races } from '../data/races';
import { classes } from '../data/classes';
import { backgrounds } from '../data/backgrounds';
import { spells } from '../data/spells';
import { subclasses } from '../data/subclasses';
import { classFeatures } from '../data/classFeatures';
import { feats } from '../data/feats';
import { baseItems } from '../data/baseItems';
import { traits } from '../data/traits';
import { fightingStyles } from '../data/fightingStyles';

const router = express.Router();

// Get all spells
router.get('/spells', (req, res) => {
    res.json(spells);
});

// Get single spell
router.get('/spells/:id', (req, res) => {
    const spell = spells.find(s => s.id === req.params.id);
    if (!spell) {
        return res.status(404).json({ error: 'Spell not found' });
    }
    res.json(spell);
});

// Get all races
router.get('/races', (req, res) => {
    res.json(races);
});

// Get single race
router.get('/races/:id', (req, res) => {
    const race = races.find(r => r.id === req.params.id);
    if (!race) {
        return res.status(404).json({ error: 'Race not found' });
    }
    res.json(race);
});

// Get all classes
router.get('/classes', (req, res) => {
    res.json(classes);
});

// Get single class
router.get('/classes/:id', (req, res) => {
    const classInfo = classes.find(c => c.id === req.params.id);
    if (!classInfo) {
        return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classInfo);
});

// Get all backgrounds
router.get('/backgrounds', (req, res) => {
    res.json(backgrounds);
});

// Get single background
router.get('/backgrounds/:id', (req, res) => {
    const background = backgrounds.find(b => b.id === req.params.id);
    if (!background) {
        return res.status(404).json({ error: 'Background not found' });
    }
    res.json(background);
});

// Get all subclasses
router.get('/subclasses', (req, res) => {
    res.json(subclasses);
});

// Get single subclass
router.get('/subclasses/:id', (req, res) => {
    const subclass = subclasses.find(s => s.id === req.params.id);
    if (!subclass) {
        return res.status(404).json({ error: 'Subclass not found' });
    }
    res.json(subclass);
});

// Get class features for a class
router.get('/class-features/:classId', (req, res) => {
    const features = classFeatures[req.params.classId];
    if (!features) {
        return res.status(404).json({ error: 'Class features not found' });
    }
    res.json(features);
});

// Get all class features
router.get('/class-features', (req, res) => {
    res.json(classFeatures);
});

// Get all feats
router.get('/feats', (req, res) => {
    res.json(feats);
});

// Get single feat
router.get('/feats/:id', (req, res) => {
    const feat = feats.find(f => f.id === req.params.id);
    if (!feat) {
        return res.status(404).json({ error: 'Feat not found' });
    }
    res.json(feat);
});

// Get all base items
router.get('/base-items', (req, res) => {
    res.json(baseItems);
});

// Get base items by category
router.get('/base-items/:category', (req, res) => {
    const category = req.params.category;
    const filtered = baseItems.filter(item => item.category === category);
    res.json(filtered);
});

// Get all traits
router.get('/traits', (req, res) => {
    res.json(traits);
});

// Get single trait
router.get('/traits/:name', (req, res) => {
    const trait = traits[req.params.name];
    if (!trait) {
        return res.status(404).json({ error: 'Trait not found' });
    }
    res.json(trait);
});

// Get all fighting styles
router.get('/fighting-styles', (req, res) => {
    res.json(fightingStyles);
});

export default router;
