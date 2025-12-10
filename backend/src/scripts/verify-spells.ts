
import { spells } from '../data/spells';

const expectedSpells = [
    'absorb-elements', 'acid-stream', 'alarm', 'animal-friendship', 'arcane-weapon',
    'armor-of-agathys', 'arms-of-hadar', 'bane', 'beast-bond', 'burning-hands',
    'catapult', 'cause-fear', 'ceremony', 'chaos-bolt', 'charm-person',
    'chromatic-orb', 'color-spray', 'command', 'compelled-duel',
    'comprehend-languages', 'create-or-destroy-water',
    'detect-evil-and-good', 'detect-poison-and-disease', 'disguise-self',
    'dissonant-whispers', 'distort-value', 'divine-favor', 'earth-tremor',
    'ensnaring-strike', 'entangle', 'expeditious-retreat', 'faerie-fire',
    'false-life', 'feather-fall', 'find-familiar', 'fog-cloud', 'frost-fingers',
    'gift-of-alacrity', 'goodberry', 'grease', 'guiding-bolt', 'guiding-hand',
    'hail-of-thorns', 'healing-elixir', 'hellish-rebuke', 'heroism', 'hex',
    'hunters-mark', 'ice-knife', 'id-insinuation', 'identify', 'illusory-script',
    'infallible-relay', 'inflict-wounds', 'jims-magic-missile', 'jump',
    'longstrider', 'mage-armor', 'magnify-gravity',
    'protection-from-evil-and-good', 'puppet', 'purify-food-and-drink',
    'ray-of-sickness', 'remote-access', 'sanctuary', 'searing-smite',
    'sense-emotion', 'shield-of-faith', 'silent-image', 'silvery-barbs',
    'snare', 'speak-with-animals', 'sudden-awakening', 'tashas-caustic-brew',
    'tashas-hideous-laughter', 'tensers-floating-disk', 'thunderous-smite',
    'thunderwave', 'unearthly-chorus', 'unseen-servant', 'wild-cunning',
    'witch-bolt', 'wrathful-smite', 'zephyr-strike',
    'aganazzars-scorcher', 'aid', 'air-bubble', 'alter-self', 'animal-messenger',
    'arcane-hacking', 'arcane-lock', 'augury', 'barkskin', 'beast-sense',
    'blindness-deafness', 'blur', 'borrowed-knowledge', 'branding-smite',
    'calm-emotions', 'cloud-of-daggers', 'continual-flame', 'cordon-of-arrows',
    'crown-of-madness', 'darkness', 'darkvision', 'detect-thoughts',
    'digital-phantom', 'dragons-breath', 'dust-devil', 'earthbind',
    'enhance-ability', 'enlarge-reduce', 'enthrall', 'find-steed', 'find-traps',
    'find-vehicle', 'flame-blade', 'flaming-sphere', 'flock-of-familiars',
    'fortunes-favor', 'gentle-repose', 'gift-of-gab', 'gust-of-wind',
    'healing-spirit', 'heat-metal', 'hold-person', 'icingdeaths-frost-ua',
    'immovable-object', 'jims-glowing-coin', 'kinetic-jaunt', 'knock',
    'lesser-restoration', 'levitate', 'locate-animals-or-plants', 'locate-object',
    'magic-mouth', 'magic-weapon', 'maximillians-earthen-grasp',
    'melfs-acid-arrow', 'mental-barrier-ua', 'mind-spike', 'mind-thrust-ua',
    'mirror-image', 'moonbeam', 'nathairs-mischief', 'nathairs-mischief-ua',
    'nystuls-magic-aura',
    'pass-without-trace', 'phantasmal-force', 'prayer-of-healing',
    'protection-from-poison', 'pyrotechnics', 'ray-of-enfeeblement',
    'rimes-binding-ice', 'rope-trick', 'scorching-ray', 'see-invisibility',
    'shadow-blade', 'shatter', 'silence', 'skywrite', 'snillocs-snowball-swarm',
    'spider-climb', 'spike-growth', 'spiritual-weapon', 'spray-of-cards',
    'spray-of-cards-ua', 'suggestion', 'summon-beast', 'tashas-mind-whip',
    'thought-shield-ua', 'vortex-warp', 'warding-bond', 'warding-wind',
    'warp-sense', 'web', 'wither-and-bloom', 'wristpocket', 'zone-of-truth',
    'animate-dead', 'antagonize', 'antagonize-ua', 'ashardalons-stride',
    'aura-of-vitality', 'beacon-of-hope', 'bestow-curse', 'blinding-smite',
    'blink', 'call-lightning', 'catnap', 'clairvoyance', 'conjure-animals',
    'conjure-barrage', 'conjure-lesser-demon-ua', 'create-food-and-water',
    'crusaders-mantle', 'daylight', 'dispel-magic', 'elemental-weapon',
    'enemies-abound', 'erupting-earth', 'fast-friends', 'fear', 'feign-death',
    'flame-arrows', 'flame-stride-ua', 'fly',
    'galders-tower', 'gaseous-form', 'glyph-of-warding', 'haste', 'haywire-ua',
    'house-of-cards-ua', 'hunger-of-hadar', 'hypnotic-pattern', 'incite-greed',
    'intellect-fortress', 'invisibility-to-cameras-ua', 'leomunds-tiny-hut',
    'life-transference', 'lightning-arrow', 'lightning-bolt', 'magic-circle',
    'major-image', 'mass-healing-word', 'meld-into-stone',
    'melfs-minute-meteors', 'motivational-speech', 'nondetection',
    'phantom-steed', 'plant-growth', 'protection-from-ballistics-ua',
    'protection-from-energy', 'psionic-blast-ua', 'pulse-wave',
    'remove-curse', 'revivify', 'sending', 'sleet-storm', 'slow',
    'speak-with-dead', 'speak-with-plants', 'spirit-guardians', 'spirit-shroud',
    'stinking-cloud', 'summon-fey', 'summon-lesser-demons',
    'summon-shadowspawn', 'summon-undead', 'summon-warrior-spirit-ua',
    'thunder-step', 'tidal-wave', 'tiny-servant', 'tongues', 'vampiric-touch',
    'wall-of-sand', 'wall-of-water', 'water-breathing', 'water-walk',
    'wind-wall',
    'arcane-eye', 'aura-of-life', 'aura-of-purity', 'banishment', 'blight',
    'charm-monster', 'compulsion', 'confusion', 'conjure-barlgura-ua',
    'conjure-knowbot-ua', 'conjure-minor-elementals', 'conjure-shadow-demon-ua',
    'conjure-woodland-beings', 'control-water', 'death-ward', 'dimension-door',
    'divination', 'dominate-beast', 'ego-whip-ua', 'elemental-bane',
    'evards-black-tentacles', 'fabricate', 'find-greater-steed', 'fire-shield',
    'freedom-of-movement', 'galders-speedy-courier', 'gate-seal',
    'giant-insect', 'grasping-vine', 'gravity-sinkhole', 'greater-invisibility',
    'guardian-of-faith', 'guardian-of-nature', 'hallucinatory-terrain',
    'ice-storm', 'leomunds-secret-chest', 'locate-creature',
    'mordenkainens-faithful-hound', 'mordenkainens-private-sanctum',
    'otilukes-resilient-sphere', 'phantasmal-killer', 'polymorph',
    'raulothims-psychic-lance', 'raulothims-psychic-lance-ua',
    'shadow-of-moil', 'sickening-radiance', 'spirit-of-death',
    'spirit-of-death-ua', 'staggering-smite', 'stone-shape', 'stoneskin',
    'storm-sphere', 'summon-aberration', 'summon-construct', 'summon-elemental',
    'summon-greater-demon', 'synchronicity-ua', 'system-backdoor-ua',
    'vitriolic-sphere', 'wall-of-fire', 'watery-sphere',
    'animate-objects', 'antilife-shell', 'awaken', 'banishing-smite',
    'bigbys-hand', 'circle-of-power', 'cloudkill', 'commune',
    'commune-with-city-ua', 'commune-with-nature', 'cone-of-cold',
    'conjure-elemental', 'conjure-volley', 'conjure-vrock-ua',
    'contact-other-plane', 'contagion', 'control-winds',
    'create-spelljamming-helm', 'creation', 'danse-macabre', 'dawn',
    'destructive-wave', 'dispel-evil-and-good', 'dominate-person', 'dream',
    'enervation', 'far-step', 'flame-strike', 'geas', 'greater-restoration',
    'hallow', 'hold-monster', 'holy-weapon', 'immolation', 'infernal-calling',
    'insect-plague', 'legend-lore', 'maelstrom', 'mass-cure-wounds', 'mislead',
    'modify-memory', 'negative-energy-flood', 'passwall', 'planar-binding',
    'raise-dead', 'rarys-telepathic-bond', 'reincarnate',
    'scrying', 'seeming', 'shutdown-ua', 'skill-empowerment',
    'steel-wind-strike', 'summon-celestial', 'summon-draconic-spirit',
    'summon-draconic-spirit-ua', 'swift-quiver', 'synaptic-static',
    'telekinesis', 'teleportation-circle', 'temporal-shunt', 'transmute-rock',
    'tree-stride', 'wall-of-force', 'wall-of-light', 'wall-of-stone',
    'wrath-of-nature', 'arcane-gate', 'blade-barrier', 'bones-of-the-earth',
    'chain-lightning', 'circle-of-death', 'conjure-fey', 'contingency',
    'create-homunculus', 'create-undead', 'disintegrate',
    'drawmijs-instant-summons', 'druid-grove', 'eyebite', 'find-the-path',
    'fizbans-platinum-shield', 'fizbans-platinum-shield-ua', 'flesh-to-stone',
    'forbiddance', 'globe-of-invulnerability', 'gravity-fissure',
    'guards-and-wards', 'harm', 'heal', 'heroes-feast', 'investiture-of-flame'
];

function verifySpells() {
    console.log(`Total spells found: ${spells.length}`);

    const ids = new Set<string>();
    const duplicates: string[] = [];

    spells.forEach(spell => {
        if (ids.has(spell.id)) {
            duplicates.push(spell.id);
        }
        ids.add(spell.id);
    });

    if (duplicates.length > 0) {
        console.error('ERROR: Duplicate spell IDs found:', duplicates);
        process.exit(1);
    } else {
        console.log('No duplicate IDs found.');
    }

    const missing = expectedSpells.filter(id => !ids.has(id));

    if (missing.length > 0) {
        console.error('ERROR: Missing expected spells:', missing);
        process.exit(1);
    } else {
        console.log('All new spells are present.');
    }
}

verifySpells();
