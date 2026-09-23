// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface Spell {
    id: string;
    level: number;
    name: string;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    classes: string[];
    description: string;
    ritual?: boolean;
    /** Where the rules text comes from (e.g. "SRD 5.2", "PHB 2024", "Legacy (pre-2024)"). */
    source?: string;
    /** Pre-2024 or playtest content kept for existing characters; hidden from pickers. */
    legacy?: boolean;
}

export const spells: Spell[] = [
    {
        "id": "mage-hand",
        "level": 0,
        "name": "Mage Hand",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.\nWhen you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial.\nAs a Magic action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet.\nThe hand can't attack, activate magic items, or carry more than 10 pounds.",
        "source": "SRD 5.2"
    },
    {
        "id": "prestidigitation",
        "level": 0,
        "name": "Prestidigitation",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S",
        "duration": "Up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create a magical effect within range. Choose the effect from the options below. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time.\nSensory Effect. You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.\nFire Play. You instantaneously light or snuff out a candle, a torch, or a small campfire.\nClean or Soil. You instantaneously clean or soil an object no larger than 1 cubic foot.\nMinor Sensation. You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.\nMagic Mark. You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.\nMinor Creation. You create a nonmagical trinket or an illusory image that can fit in your hand. It lasts until the end of your next turn. A trinket can deal no damage and has no monetary worth.",
        "source": "SRD 5.2"
    },
    {
        "id": "guidance",
        "level": 0,
        "name": "Guidance",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "You touch a willing creature and choose a skill. Until the spell ends, the creature adds 1d4 to any ability check using the chosen skill.",
        "source": "SRD 5.2"
    },
    {
        "id": "fire-bolt",
        "level": 0,
        "name": "Fire Bolt",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You hurl a mote of fire at a creature or an object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Fire damage. A flammable object hit by this spell starts burning if it isn't being worn or carried.\nCantrip Upgrade. The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).",
        "source": "SRD 5.2"
    },
    {
        "id": "eldritch-blast",
        "level": 0,
        "name": "Eldritch Blast",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "warlock"
        ],
        "description": "You hurl a beam of crackling energy. Make a ranged spell attack against one creature or object in range. On a hit, the target takes 1d10 Force damage.\nCantrip Upgrade. The spell creates two beams at level 5, three beams at level 11, and four beams at level 17. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.",
        "source": "SRD 5.2"
    },
    {
        "id": "sacred-flame",
        "level": 0,
        "name": "Sacred Flame",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 Radiant damage. The target gains no benefit from Half Cover or Three-Quarters Cover for this save.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "vicious-mockery",
        "level": 0,
        "name": "Vicious Mockery",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard"
        ],
        "description": "You unleash a string of insults laced with subtle enchantments at one creature you can see or hear within range. The target must succeed on a Wisdom saving throw or take 1d6 Psychic damage and have Disadvantage on the next attack roll it makes before the end of its next turn.\nCantrip Upgrade. The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).",
        "source": "SRD 5.2"
    },
    {
        "id": "acid-splash",
        "level": 0,
        "name": "Acid Splash",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create an acidic bubble at a point within range, where it explodes in a 5-foot-radius Sphere. Each creature in that Sphere must succeed on a Dexterity saving throw or take 1d6 Acid damage.\nCantrip Upgrade. The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).",
        "source": "SRD 5.2"
    },
    {
        "id": "blade-ward",
        "level": 0,
        "name": "Blade Ward",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Whenever a creature makes an attack roll against you before the spell ends, the attacker subtracts 1d4 from the attack roll.",
        "source": "PHB 2024"
    },
    {
        "id": "booming-blade",
        "level": 0,
        "name": "Booming Blade",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (5-foot radius)",
        "components": "S, M (a melee weapon worth at least 1 sp)",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You brandish the weapon used in the spell’s casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack’s normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes 1d8 thunder damage, and the spell ends."
    },
    {
        "id": "chill-touch",
        "level": 0,
        "name": "Chill Touch",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Channeling the chill of the grave, make a melee spell attack against a target within reach. On a hit, the target takes 1d10 Necrotic damage, and it can't regain Hit Points until the end of your next turn.\nCantrip Upgrade. The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).",
        "source": "SRD 5.2"
    },
    {
        "id": "control-flames",
        "level": 0,
        "name": "Control Flames",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S",
        "duration": "Instantaneous or 1 hour",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You choose nonmagical flame that you can see within range and that fits within a 5-foot cube. You affect it in one of the following ways: Expand it 5 feet, extinguish it, double/halve brightness, or change color/shapes."
    },
    {
        "id": "create-bonfire",
        "level": 0,
        "name": "Create Bonfire",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You create a bonfire on ground that you can see within range. Until the spell ends, the magic bonfire fills a 5-foot cube. Any creature in the bonfire’s space when you cast the spell must succeed on a Dexterity saving throw or take 1d8 fire damage. A creature must also make the saving throw when it moves into the bonfire’s space for the first time on a turn or ends its turn there."
    },
    {
        "id": "dancing-lights",
        "level": 0,
        "name": "Dancing Lights",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a bit of phosphorus)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You create up to four torch-size lights within range, making them appear as torches, lanterns, or glowing orbs that hover for the duration. Alternatively, you combine the four lights into one glowing Medium form that is vaguely humanlike. Whichever form you choose, each light sheds Dim Light in a 10foot radius.\nAs a Bonus Action, you can move the lights up to 60 feet to a space within range. A light must be within 20 feet of another light created by this spell, and a light vanishes if it exceeds the spell's range.",
        "source": "SRD 5.2"
    },
    {
        "id": "druidcraft",
        "level": 0,
        "name": "Druidcraft",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid"
        ],
        "description": "Whispering to the spirits of nature, you create one of the following effects within range.\nWeather Sensor. You create a Tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.\nBloom. You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.\nSensory Effect. You create a harmless sensory effect, such as falling leaves, spectral dancing fairies, a gentle breeze, the sound of an animal, or the faint odor of skunk. The effect must fit in a 5-foot Cube.\nFire Play. You light or snuff out a candle, a torch, or a campfire.",
        "source": "SRD 5.2"
    },
    {
        "id": "encode-thoughts",
        "level": 0,
        "name": "Encode Thoughts",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "Self",
        "components": "S",
        "duration": "Up to 8 hours",
        "classes": [
            "wizard"
        ],
        "description": "Putting a finger to your head, you pull a memory, an idea, or a message from your mind and transform it into a tangible string of glowing energy called a thought strand, which persists for the duration or until you cast this spell again. The thought strand appears in an unoccupied space within 5 feet of you as a Tiny, weightless, semisolid object that can be held and carried."
    },
    {
        "id": "friends",
        "level": 0,
        "name": "Friends",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "S, M (some makeup)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You magically emanate a sense of friendship toward one creature you can see within range. The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration. The target succeeds automatically if it isn't a Humanoid, if you're fighting it, or if you have cast this spell on it within the past 24 hours.\nThe spell ends early if the target takes damage or if you make an attack roll, deal damage, or force anyone to make a saving throw. When the spell ends, the target knows it was Charmed by you.",
        "source": "PHB 2024"
    },
    {
        "id": "frostbite",
        "level": 0,
        "name": "Frostbite",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn."
    },
    {
        "id": "green-flame-blade",
        "level": 0,
        "name": "Green-Flame Blade",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (5-foot radius)",
        "components": "S, M (a melee weapon worth at least 1 sp)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You brandish the weapon used in the spell’s casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack’s normal effects, and you can cause green fire to leap from the target to a different creature of your choice that you can see within 5 feet of it. The second creature takes fire damage equal to your spellcasting ability modifier."
    },
    {
        "id": "gust",
        "level": 0,
        "name": "Gust",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You seize the air and compel it to create one of the following effects at a point you can see within range: push creature 5ft, Push object 10ft, sensory effect."
    },
    {
        "id": "hand-of-radiance",
        "level": 0,
        "name": "Hand of Radiance (UA)",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "5 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You raise your hand, and burning radiance erupts from it. Each creature of your choice that you can see within 5 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage."
    },
    {
        "id": "infestation",
        "level": 0,
        "name": "Infestation",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a living flea)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You cause a cloud of mites, fleas, and other parasites to appear momentarily on one creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d6 poison damage and moves 5 feet in a random direction if it can move and its speed is at least 5 feet."
    },
    {
        "id": "light",
        "level": 0,
        "name": "Light",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, M (a firefly or phosphorescent moss)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "wizard"
        ],
        "description": "You touch one Large or smaller object that isn't being worn or carried by someone else. Until the spell ends, the object sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The light can be colored as you like.\nCovering the object with something opaque blocks the light. The spell ends if you cast it again.",
        "source": "SRD 5.2"
    },
    {
        "id": "lightning-lure",
        "level": 0,
        "name": "Lightning Lure",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "15 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You create a lash of lightning energy that strikes at one creature of your choice that you can see within 15 feet of you. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you."
    },
    {
        "id": "magic-stone",
        "level": 0,
        "name": "Magic Stone",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "druid",
            "warlock",
            "artificer"
        ],
        "description": "You touch one to three pebbles and imbue them with magic. You or someone else can make a ranged spell attack with one of the pebbles by throwing it or hurling it with a sling. If thrown, it has a range of 60 feet. If hurled with a sling, it uses the sling’s normal range. On a hit, the target takes bludgeoning damage equal to 1d6 + your spellcasting ability modifier."
    },
    {
        "id": "mending",
        "level": 0,
        "name": "Mending",
        "school": "Transmutation",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (two lodestones)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.\nThis spell can physically repair a magic item, but it can't restore magic to such an object.",
        "source": "SRD 5.2"
    },
    {
        "id": "message",
        "level": 0,
        "name": "Message",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "S, M (a copper wire)",
        "duration": "1 round",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You point toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.\nYou can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence; 1 foot of stone, metal, or wood; or a thin sheet of lead blocks the spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "mind-sliver",
        "level": 0,
        "name": "Mind Sliver",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn."
    },
    {
        "id": "minor-illusion",
        "level": 0,
        "name": "Minor Illusion",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "S, M (a bit of fleece)",
        "duration": "1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create a sound or an image of an object within range that lasts for the duration. See the descriptions below for the effects of each. The illusion ends if you cast this spell again.\nIf a creature takes a Study action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.\nSound. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.\nImage. If you create an image of an object-such as a chair, muddy footprints, or a small chest-it must be no larger than a 5-foot Cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, since things can pass through it.",
        "source": "SRD 5.2"
    },
    {
        "id": "mold-earth",
        "level": 0,
        "name": "Mold Earth",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "S",
        "duration": "Instantaneous or 1 hour",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways: Excavate/move loose earth, cause shapes/colors/words, turn difficult terrain to normal or vice versa."
    },
    {
        "id": "on-off",
        "level": 0,
        "name": "On/Off (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "This cantrip allows you to activate or deactivate any electronic device within range, as long as the device has a clearly defined on or off function that can be easily accessed from the outside of the device."
    },
    {
        "id": "poison-spray",
        "level": 0,
        "name": "Poison Spray",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You spray toxic mist at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d12 Poison damage.\nCantrip Upgrade. The damage increases by 1d12 when you reach levels 5 (2d12), 11 (3d12), and 17 (4d12).",
        "source": "SRD 5.2"
    },
    {
        "id": "primal-savagery",
        "level": 0,
        "name": "Primal Savagery",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "druid"
        ],
        "description": "You channel primal magic to cause your teeth or fingernails to sharpen, ready to deliver a corrosive attack. Make a melee spell attack against one creature within 5 feet of you. On a hit, the target takes 1d10 acid damage."
    },
    {
        "id": "produce-flame",
        "level": 0,
        "name": "Produce Flame",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "druid"
        ],
        "description": "A flickering flame appears in your hand and remains there for the duration. While there, the flame emits no heat and ignites nothing, and it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The spell ends if you cast it again.\nUntil the spell ends, you can take a Magic action to hurl fire at a creature or an object within 60 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 Fire damage.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "ray-of-frost",
        "level": 0,
        "name": "Ray of Frost",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 Cold damage, and its Speed is reduced by 10 feet until the start of your next turn.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "resistance",
        "level": 0,
        "name": "Resistance",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "You touch a willing creature and choose a damage type: Acid, Bludgeoning, Cold, Fire, Lightning, Necrotic, Piercing, Poison, Radiant, Slashing, or Thunder. When the creature takes damage of the chosen type before the spell ends, the creature reduces the total damage taken by 1d4. A creature can benefit from this spell only once per turn.",
        "source": "SRD 5.2"
    },
    {
        "id": "sapping-sting",
        "level": 0,
        "name": "Sapping Sting",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "wizard",
            "artificer"
        ],
        "description": "You sap the vitality of one creature you can see in range. The target must succeed on a Constitution saving throw or take 1d4 necrotic damage and fall prone."
    },
    {
        "id": "shape-water",
        "level": 0,
        "name": "Shape Water",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "S",
        "duration": "Instantaneous or 1 hour",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways: Move/change flow, form simple shapes, freeze, change color/opacity."
    },
    {
        "id": "shillelagh",
        "level": 0,
        "name": "Shillelagh",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (mistletoe)",
        "duration": "1 minute",
        "classes": [
            "druid"
        ],
        "description": "A Club or Quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. If the attack deals damage, it can be Force damage or the weapon's normal damage type (your choice).\nThe spell ends early if you cast it again or if you let go of the weapon.\nCantrip Upgrade. The damage die changes when you reach levels 5 (d10), 11 (d12), and 17 (2d6).",
        "source": "SRD 5.2"
    },
    {
        "id": "shocking-grasp",
        "level": 0,
        "name": "Shocking Grasp",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Lightning springs from you to a creature that you try to touch. Make a melee spell attack against the target. On a hit, the target takes 1d8 Lightning damage, and it can't make Opportunity Attacks until the start of its next turn.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "spare-the-dying",
        "level": 0,
        "name": "Spare the Dying",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "15 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "Choose a creature within range that has 0 Hit Points and isn't dead. The creature becomes Stable.\nCantrip Upgrade. The range doubles when you reach levels 5 (30 feet), 11 (60 feet), and 17 (120 feet).",
        "source": "SRD 5.2"
    },
    {
        "id": "sword-burst",
        "level": 0,
        "name": "Sword Burst",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self (5-foot radius)",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You create a momentary circle of spectral blades that sweep around you. Each other creature within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 force damage."
    },
    {
        "id": "thaumaturgy",
        "level": 0,
        "name": "Thaumaturgy",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Up to 1 minute",
        "classes": [
            "cleric"
        ],
        "description": "You manifest a minor wonder within range. You create one of the effects below within range. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time.\nAltered Eyes. You alter the appearance of your eyes for 1 minute.\nBooming Voice. Your voice booms up to three times as loud as normal for 1 minute. For the duration, you have Advantage on Charisma (Intimidation) checks.\nFire Play. You cause flames to flicker, brighten, dim, or change color for 1 minute.\nInvisible Hand. You instantaneously cause an unlocked door or window to fly open or slam shut.\nPhantom Sound. You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers.\nTremors. You cause harmless tremors in the ground for 1 minute.",
        "source": "SRD 5.2"
    },
    {
        "id": "thorn-whip",
        "level": 0,
        "name": "Thorn Whip",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (the stem of a plant with thorns)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "artificer"
        ],
        "description": "You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. On a hit, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you."
    },
    {
        "id": "thunderclap",
        "level": 0,
        "name": "Thunderclap",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (5-foot radius)",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "You create a burst of thunderous sound that can be heard up to 100 feet away. Each creature within range, other than you, must succeed on a Constitution saving throw or take 1d6 thunder damage."
    },
    {
        "id": "toll-the-dead",
        "level": 0,
        "name": "Toll the Dead",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "warlock",
            "wizard"
        ],
        "description": "You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage."
    },
    {
        "id": "true-strike",
        "level": 0,
        "name": "True Strike",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "S, M (a weapon with which you have proficiency and that is worth 1+ CP)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Guided by a flash of magical insight, you make one attack with the weapon used in the spell's casting. The attack uses your spellcasting ability for the attack and damage rolls instead of using Strength or Dexterity. If the attack deals damage, it can be Radiant damage or the weapon's normal damage type (your choice).\nCantrip Upgrade. Whether you deal Radiant damage or the weapon's normal damage type, the attack deals extra Radiant damage when you reach levels 5 (1d6), 11 (2d6), and 17 (3d6).",
        "source": "SRD 5.2"
    },
    {
        "id": "virtue",
        "level": 0,
        "name": "Virtue (UA)",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "1 turn",
        "classes": [
            "cleric"
        ],
        "description": "You touch one creature, imbuing it with vitality. If the target has at least 1 hit point, it gains 1d4 + 4 temporary hit points. The temporary hit points are lost when the spell ends."
    },
    {
        "id": "word-of-radiance",
        "level": 0,
        "name": "Word of Radiance",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "5 feet",
        "components": "V, M (a holy symbol)",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You utter a divine word, and burning radiance erupts from you. Each creature of your choice that you can see within range must succeed on a Constitution saving throw or take 1d6 radiant damage."
    },
    {
        "id": "absorb-elements",
        "level": 1,
        "name": "Absorb Elements",
        "school": "Abjuration",
        "castingTime": "1 reaction",
        "range": "Self",
        "components": "S",
        "duration": "1 round",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you hit with a melee attack on your next turn, the target takes an extra 1d6 damage of the triggering type, and the spell ends."
    },
    {
        "id": "acid-stream",
        "level": 1,
        "name": "Acid Stream (UA)",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a few drops of vinegar)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You conjure a line of acid 30 feet long and 5 feet wide emanating from you in a direction you choose. Each creature in the line must succeed on a Dexterity saving throw or be covered in acid for the spell’s duration or until a creature uses its action to scrape or wash the acid off itself. A creature covered in the acid takes 3d4 acid damage at the start of each of its turns."
    },
    {
        "id": "alarm",
        "level": 1,
        "name": "Alarm",
        "school": "Abjuration",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S, M (a bell and silver wire)",
        "duration": "8 hours",
        "classes": [
            "ranger",
            "wizard"
        ],
        "description": "You set an alarm against intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot Cube. Until the spell ends, an alarm alerts you whenever a creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is audible or mental: Audible Alarm. The alarm produces the sound of a handbell for 10 seconds within 60 feet of the warded area. Mental Alarm. You are alerted by a mental ping if you are within 1 mile of the warded area. This ping awakens you if you're asleep.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "animal-friendship",
        "level": 1,
        "name": "Animal Friendship",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a morsel of food)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "druid",
            "ranger"
        ],
        "description": "Target a Beast that you can see within range. The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration. If you or one of your allies deals damage to the target, the spells ends.\nUsing a Higher-Level Spell Slot. You can target one additional Beast for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "arcane-weapon",
        "level": 1,
        "name": "Arcane Weapon (UA)",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "artificer"
        ],
        "description": "You channel arcane energy into one simple or martial weapon you’re holding, and choose one damage type: acid, cold, fire, force, lightning, or thunder. Until the spell ends, you deal an extra 1d6 damage of the chosen type to any target you hit with the weapon. If the weapon isn’t magical, it becomes a magic weapon for the spell’s duration."
    },
    {
        "id": "armor-of-agathys",
        "level": 1,
        "name": "Armor of Agathys",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (a cup of water)",
        "duration": "1 hour",
        "classes": [
            "warlock"
        ],
        "description": "Protective magical frost surrounds you. You gain 5 Temporary Hit Points. If a creature hits you with a melee attack roll before the spell ends, the creature takes 5 Cold damage. The spell ends early if you have no Temporary Hit Points.\nUsing a Higher-Level Spell Slot. The Temporary Hit Points and the Cold damage both increase by 5 for each spell slot level above 1.",
        "source": "PHB 2024"
    },
    {
        "id": "arms-of-hadar",
        "level": 1,
        "name": "Arms of Hadar",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self (10-foot radius)",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "warlock"
        ],
        "description": "You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy erupt from you and batter all creatures within 10 feet of you. Each creature in that area must make a Strength saving throw. On a failed save, a target takes 2d6 necrotic damage and can't take reactions until its next turn. On a successful save, the creature takes half damage, but suffers no other effect."
    },
    {
        "id": "bane",
        "level": 1,
        "name": "Bane",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a drop of blood)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "cleric",
            "warlock"
        ],
        "description": "Up to three creatures of your choice that you can see within range must each make a Charisma saving throw. Whenever a target that fails this save makes an attack roll or a saving throw before the spell ends, the target must subtract 1d4 from the attack roll or save.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "beast-bond",
        "level": 1,
        "name": "Beast Bond",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a bit of fur wrapped in a cloth)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You establish a telepathic link with one beast you touch that is friendly to you or charmed by you. The spell fails if the beast's Intelligence is 4 or higher. Until the spell ends, the link is active while you and the beast are within line of sight of each other. Through the link, the beast can understand your telepathic messages to it, and it can telepathically communicate simple emotions and concepts back to you. While the link is active, the beast gains advantage on attack rolls against any creature within 5 feet of you that you can see."
    },
    {
        "id": "burning-hands",
        "level": 1,
        "name": "Burning Hands",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A thin sheet of flames shoots forth from you. Each creature in a 15-foot Cone makes a Dexterity saving throw, taking 3d6 Fire damage on a failed save or half as much damage on a successful one.\nFlammable objects in the Cone that aren't being worn or carried start burning.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "catapult",
        "level": 1,
        "name": "Catapult",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 90 feet in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If the object would strike a creature, that creature must make a Dexterity saving throw. On a failed save, the object strikes the target and stops moving. When the object strikes something, the object and what it strikes each take 3d8 bludgeoning damage."
    },
    {
        "id": "cause-fear",
        "level": 1,
        "name": "Cause Fear",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You awaken the sense of mortality in one creature you can see within range. A construct or an undead is immune to this effect. The target must succeed on a Wisdom saving throw or become frightened of you until the spell ends. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
    },
    {
        "id": "ceremony",
        "level": 1,
        "name": "Ceremony",
        "school": "Abjuration",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (25 gp worth of powdered silver, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You perform a special religious ceremony that is infused with magic. When you cast the spell, choose one of the following rites, the target of which must be within 10 feet of you throughout the casting: Atonement, Bless Water, Coming of Age, Dedication, Funeral Rite, Wedding."
    },
    {
        "id": "chaos-bolt",
        "level": 1,
        "name": "Chaos Bolt",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer"
        ],
        "description": "You hurl an undulating, warbling mass of chaotic energy at one creature in range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 + 1d6 damage. Choose one of the d8s. The number rolled on that die determines the attack’s damage type. If you roll the same number on both d8s, the chaotic energy leaps from the target to a different creature of your choice within 30 feet of it. Make a new attack roll against the new target, and make a new damage roll, which could cause the chaotic energy to leap again."
    },
    {
        "id": "charm-person",
        "level": 1,
        "name": "Charm Person",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "One Humanoid you can see within range makes a Wisdom saving throw. It does so with Advantage if you or your allies are fighting it. On a failed save, the target has the Charmed condition until the spell ends or until you or your allies damage it. The Charmed creature is Friendly to you. When the spell ends, the target knows it was Charmed by you.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "chromatic-orb",
        "level": 1,
        "name": "Chromatic Orb",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a diamond worth 50+ GP)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You hurl an orb of energy at a target within range. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder for the type of orb you create, and then make a ranged spell attack against the target. On a hit, the target takes 3d8 damage of the chosen type.\nIf you roll the same number on two or more of the d8s, the orb leaps to a different target of your choice within 30 feet of the target. Make an attack roll against the new target, and make a new damage roll. The orb can't leap again unless you cast the spell with a level 2+ spell slot.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 1. The orb can leap a maximum number of times equal to the level of the slot expended, and a creature can be targeted only once by each casting of this spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "color-spray",
        "level": 1,
        "name": "Color Spray",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a pinch of colorful sand)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You launch a dazzling array of flashing, colorful light. Each creature in a 15-foot Cone originating from you must succeed on a Constitution saving throw or have the Blinded condition until the end of your next turn.",
        "source": "SRD 5.2"
    },
    {
        "id": "command",
        "level": 1,
        "name": "Command",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "paladin"
        ],
        "description": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. Choose the command from these options: Approach. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you. Drop. The target drops whatever it is holding and then ends its turn. Flee. The target spends its turn moving away from you by the fastest available means. Grovel. The target has the Prone condition and then ends its turn. Halt. On its turn, the target doesn't move and takes no action or Bonus Action.\nUsing a Higher-Level Spell Slot. You can affect one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "compelled-duel",
        "level": 1,
        "name": "Compelled Duel",
        "school": "Enchantment",
        "castingTime": "1 bonus action",
        "range": "30 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "paladin"
        ],
        "description": "You attempt to compel a creature into a duel. One creature that you can see within range must make a Wisdom saving throw. On a failed save, the creature is drawn to you, compelled by your divine demand. For the duration, it has disadvantage on attack rolls against creatures other than you, and must make a Wisdom saving throw each time it attempts to move to a space that is more than 30 feet away from you; if it succeeds on this saving throw, this spell doesn’t restrict the target’s movement for that turn."
    },
    {
        "id": "comprehend-languages",
        "level": 1,
        "name": "Comprehend Languages",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a pinch of soot and salt)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, you understand the literal meaning of any language that you hear or see signed. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text. This spell doesn't decode symbols or secret messages.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "create-or-destroy-water",
        "level": 1,
        "name": "Create or Destroy Water",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a mix of water and sand)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "You do one of the following: Create Water. You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot Cube within range, extinguishing exposed flames there. Destroy Water. You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot Cube within range.\nUsing a Higher-Level Spell Slot. You create or destroy 10 additional gallons of water, or the size of the Cube increases by 5 feet, for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "detect-evil-and-good",
        "level": 1,
        "name": "Detect Evil and Good",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "For the duration, you sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet of yourself. You also sense whether the Hallow spell is active there and, if so, where.\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
        "source": "SRD 5.2"
    },
    {
        "id": "detect-poison-and-disease",
        "level": 1,
        "name": "Detect Poison and Disease",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a yew leaf)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "For the duration, you sense the location of poisons, poisonous or venomous creatures, and magical contagions within 30 feet of yourself. You sense the kind of poison, creature, or contagion in each case.\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "disguise-self",
        "level": 1,
        "name": "Disguise Self",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You make yourself-including your clothing, armor, weapons, and other belongings on your personlook different until the spell ends. You can seem 1 foot shorter or taller and can appear heavier or lighter. You must adopt a form that has the same basic arrangement of limbs as you have. Otherwise, the extent of the illusion is up to you.\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing.\nTo discern that you are disguised, a creature must take the Study action to inspect your appearance and succeed on an Intelligence (Investigation) check against your spell save DC.",
        "source": "SRD 5.2"
    },
    {
        "id": "dissonant-whispers",
        "level": 1,
        "name": "Dissonant Whispers",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard"
        ],
        "description": "One creature of your choice that you can see within range hears a discordant melody in its mind. The target makes a Wisdom saving throw. On a failed save, it takes 3d6 Psychic damage and must immediately use its Reaction, if available, to move as far away from you as it can, using the safest route. On a successful save, the target takes half as much damage only.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "distort-value",
        "level": 1,
        "name": "Distort Value",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V",
        "duration": "8 hours",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You cast this spell on an object no larger than 1 foot on a side, doubling the object’s perceived value. Anyone examining the object must make an Intelligence (Investigation) check against your spell save DC. On a successful check, the examiner realizes the object’s true value."
    },
    {
        "id": "divine-favor",
        "level": 1,
        "name": "Divine Favor",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "paladin"
        ],
        "description": "Until the spell ends, your attacks with weapons deal an extra 1d4 Radiant damage on a hit.",
        "source": "SRD 5.2"
    },
    {
        "id": "earth-tremor",
        "level": 1,
        "name": "Earth Tremor",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You cause a tremor in the ground within range. Each creature other than you in that area must make a Dexterity saving throw. On a failed save, a creature takes 1d6 bludgeoning damage and is knocked prone. If the ground in that area is loose earth or stone, it becomes difficult terrain until cleared."
    },
    {
        "id": "ensnaring-strike",
        "level": 1,
        "name": "Ensnaring Strike",
        "school": "Conjuration",
        "castingTime": "1 bonus action, which you take immediately after hitting a creature with a weapon",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "ranger"
        ],
        "description": "As you hit the target, grasping vines appear on it, and it makes a Strength saving throw. A Large or larger creature has Advantage on this save. On a failed save, the target has the Restrained condition until the spell ends. On a successful save, the vines shrivel away, and the spell ends.\nWhile Restrained, the target takes 1d6 Piercing damage at the start of each of its turns. The target or a creature within reach of it can take an action to make a Strength (Athletics) check against your spell save DC. On a success, the spell ends.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "entangle",
        "level": 1,
        "name": "Entangle",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "Grasping plants sprout from the ground in a 20-foot square within range. For the duration, these plants turn the ground in the area into Difficult Terrain. They disappear when the spell ends.\nEach creature (other than you) in the area when you cast the spell must succeed on a Strength saving throw or have the Restrained condition until the spell ends. A Restrained creature can take an action to make a Strength (Athletics) check against your spell save DC. On a success, it frees itself from the grasping plants and is no longer Restrained by them.",
        "source": "SRD 5.2"
    },
    {
        "id": "expeditious-retreat",
        "level": 1,
        "name": "Expeditious Retreat",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You take the Dash action, and until the spell ends, you can take that action again as a Bonus Action.",
        "source": "SRD 5.2"
    },
    {
        "id": "faerie-fire",
        "level": 1,
        "name": "Faerie Fire",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "druid"
        ],
        "description": "Objects in a 20-foot Cube within range are outlined in blue, green, or violet light (your choice). Each creature in the Cube is also outlined if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed Dim Light in a 10-foot radius and can't benefit from the Invisible condition.\nAttack rolls against an affected creature or object have Advantage if the attacker can see it.",
        "source": "SRD 5.2"
    },
    {
        "id": "false-life",
        "level": 1,
        "name": "False Life",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a drop of alcohol)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You gain 2d4 + 4 Temporary Hit Points.\nUsing a Higher-Level Spell Slot. You gain 5 additional Temporary Hit Points for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "feather-fall",
        "level": 1,
        "name": "Feather Fall",
        "school": "Transmutation",
        "castingTime": "1 reaction, which you take when you or a creature you can see within 60 feet of you falls",
        "range": "60 feet",
        "components": "V, M (a small feather or piece of down)",
        "duration": "1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If a creature lands before the spell ends, the creature takes no damage from the fall, and the spell ends for that creature.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-familiar",
        "level": 1,
        "name": "Find Familiar",
        "school": "Conjuration",
        "castingTime": "1 hour",
        "range": "10 feet",
        "components": "V, S, M (burning incense worth 10+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You gain the service of a familiar, a spirit that takes an animal form you choose: Bat, Cat, Frog, Hawk, Lizard, Octopus, Owl, Rat, Raven, Spider, Weasel, or another Beast that has a Challenge Rating of 0. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form (see \"Monsters\"), though it is a Celestial, Fey, or Fiend (your choice) instead of a Beast. Your familiar acts independently of you, but it obeys your commands.\nTelepathic Connection. While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as a Bonus Action, you can see through the familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses it has.\nFinally, when you cast a spell with a range of touch, your familiar can deliver the touch. Your familiar must be within 100 feet of you, and it must take a Reaction to deliver the touch when you cast the spell.\nCombat. The familiar is an ally to you and your allies. It rolls its own Initiative and acts on its own turn. A familiar can't attack, but it can take other actions as normal.\nDisappearance of the Familiar. When the familiar drops to 0 Hit Points, it disappears. It reappears after you cast this spell again. As a Magic action, you can temporarily dismiss the familiar to a pocket dimension. Alternatively, you can dismiss it forever. As a Magic action while it is temporarily dismissed, you can cause it to reappear in an unoccupied space within 30 feet of you. Whenever the familiar drops to 0 Hit Points or disappears into the pocket dimension, it leaves behind in its space anything it was wearing or carrying.\nOne Familiar Only. You can't have more than one familiar at a time. If you cast this spell while you have a familiar, you instead cause it to adopt a new eligible form.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "fog-cloud",
        "level": 1,
        "name": "Fog Cloud",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "You create a 20-foot-radius Sphere of fog centered on a point within range. The Sphere is Heavily Obscured. It lasts for the duration or until a strong wind (such as one created by Gust of Wind) disperses it.\nUsing a Higher-Level Spell Slot. The fog's radius increases by 20 feet for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "frost-fingers",
        "level": 1,
        "name": "Frost Fingers",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (15-foot cone)",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "Freezing cold blasts from your fingertips in a 15-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 2d8 cold damage and is restrained until the end of your next turn. On a successful save, a creature takes half damage and is not restrained."
    },
    {
        "id": "gift-of-alacrity",
        "level": 1,
        "name": "Gift of Alacrity",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "wizard"
        ],
        "description": "You touch a willing creature. For the duration, the target can add 1d8 to its initiative rolls."
    },
    {
        "id": "goodberry",
        "level": 1,
        "name": "Goodberry",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a sprig of mistletoe)",
        "duration": "24 hours",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "Ten berries appear in your hand and are infused with magic for the duration. A creature can take a Bonus Action to eat one berry. Eating a berry restores 1 Hit Point, and the berry provides enough nourishment to sustain a creature for one day. Uneaten berries disappear when the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "grease",
        "level": 1,
        "name": "Grease",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a bit of pork rind or butter)",
        "duration": "1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Nonflammable grease covers the ground in a 10foot square centered on a point within range and turns it into Difficult Terrain for the duration.\nWhen the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or have the Prone condition. A creature that enters the area or ends its turn there must also succeed on that save or fall Prone.",
        "source": "SRD 5.2"
    },
    {
        "id": "guiding-bolt",
        "level": 1,
        "name": "Guiding Bolt",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "1 round",
        "classes": [
            "cleric"
        ],
        "description": "You hurl a bolt of light toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 4d6 Radiant damage, and the next attack roll made against it before the end of your next turn has Advantage.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "guiding-hand",
        "level": 1,
        "name": "Guiding Hand (UA)",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "5 feet",
        "components": "V, S",
        "duration": "Concentration, up to 8 hours",
        "ritual": true,
        "classes": [
            "bard",
            "cleric",
            "druid",
            "ranger",
            "wizard"
        ],
        "description": "You create a Tiny incorporeal hand of shimmering light in an unoccupied space within range. The hand floats for the duration and moves at your command, mimicking the movements of your own hand. The hand is an object that has AC 20 and hit points equal to your hit point maximum. If it drops to 0 hit points, the spell ends. It has a Strength of 2 (-4) and a Dexterity of 10 (+0). The hand doesn’t fill its space. When you cast the spell, you can move the hand up to 30 feet. As a bonus action on your subsequent turns, you can move the hand up to 30 feet."
    },
    {
        "id": "hail-of-thorns",
        "level": 1,
        "name": "Hail of Thorns",
        "school": "Conjuration",
        "castingTime": "1 bonus action, which you take immediately after hitting a creature with a Ranged weapon",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "ranger"
        ],
        "description": "As you hit the creature, this spell creates a rain of thorns that sprouts from your ranged weapon or ammunition. The target of the attack and each creature within 5 feet of it make a Dexterity saving throw, taking 1d10 Piercing damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 1.",
        "source": "PHB 2024"
    },
    {
        "id": "healing-elixir",
        "level": 1,
        "name": "Healing Elixir (UA)",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M (alchemist’s supplies)",
        "duration": "24 hours",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You create a healing elixir in a simple flask that appears in your hand. The elixir retains its potency for the duration or until it’s consumed. As an action, a creature can drink the elixir or administer it to another creature. The drinker regains 2d4 + 2 hit points."
    },
    {
        "id": "hellish-rebuke",
        "level": 1,
        "name": "Hellish Rebuke",
        "school": "Evocation",
        "castingTime": "1 reaction, which you take in response to taking damage from a creature that you can see within 60 feet of yourself",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "warlock"
        ],
        "description": "The creature that damaged you is momentarily surrounded by green flames. It makes a Dexterity saving throw, taking 2d10 Fire damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "heroism",
        "level": 1,
        "name": "Heroism",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "paladin"
        ],
        "description": "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to the Frightened condition and gains Temporary Hit Points equal to your spellcasting ability modifier at the start of each of its turns.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "hex",
        "level": 1,
        "name": "Hex",
        "school": "Enchantment",
        "castingTime": "1 bonus action",
        "range": "90 feet",
        "components": "V, S, M (the petrified eye of a newt)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock"
        ],
        "description": "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra 1d6 Necrotic damage to the target whenever you hit it with an attack roll. Also, choose one ability when you cast the spell. The target has Disadvantage on ability checks made with the chosen ability.\nIf the target drops to 0 Hit Points before this spell ends, you can take a Bonus Action on a later turn to curse a new creature.\nUsing a Higher-Level Spell Slot. Your Concentration can last longer with a spell slot of level 2 (up to 4 hours), 3-4 (up to 8 hours), or 5+ (24 hours).",
        "source": "SRD 5.2"
    },
    {
        "id": "hunters-mark",
        "level": 1,
        "name": "Hunter's Mark",
        "school": "Divination",
        "castingTime": "1 bonus action",
        "range": "90 feet",
        "components": "V",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "ranger"
        ],
        "description": "You magically mark one creature you can see within range as your quarry. Until the spell ends, you deal an extra 1d6 Force damage to the target whenever you hit it with an attack roll. You also have Advantage on any Wisdom (Perception or Survival) check you make to find it.\nIf the target drops to 0 Hit Points before this spell ends, you can take a Bonus Action to move the mark to a new creature you can see within range.\nUsing a Higher-Level Spell Slot. Your Concentration can last longer with a spell slot of level 3-4 (up to 8 hours) or 5+ (up to 24 hours).",
        "source": "SRD 5.2"
    },
    {
        "id": "ice-knife",
        "level": 1,
        "name": "Ice Knife",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S, M (a drop of water or a piece of ice)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 Cold damage.\nUsing a Higher-Level Spell Slot. The Cold damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "id-insinuation",
        "level": 1,
        "name": "Id Insinuation (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "You unleash a torrent of conflicting desires in the mind of one creature you can see within range, impairing its ability to make decisions. The target must succeed on a Wisdom saving throw or be incapacitated. At the end of each of its turns, it takes 1d12 psychic damage, and it can then make another Wisdom saving throw. On a success, the spell ends."
    },
    {
        "id": "identify",
        "level": 1,
        "name": "Identify",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (a pearl worth 100+ GP)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires Attunement, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name.\nIf you instead touch a creature throughout the casting, you learn which ongoing spells, if any, are currently affecting it.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "illusory-script",
        "level": 1,
        "name": "Illusory Script",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "S, M (ink worth 10+ GP, which the spell consumes)",
        "duration": "10 days",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "You write on parchment, paper, or another suitable material and imbue it with an illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, seems to be written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, the illusion can alter the meaning, handwriting, and language of the text, though the language must be one you know.\nIf the spell is dispelled, the original script and the illusion both disappear.\nA creature that has Truesight can read the hidden message.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "infallible-relay",
        "level": 1,
        "name": "Infallible Relay (UA)",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "ritual": true,
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "With this spell, you can speak to a creature you share a language with. The creature understands you no matter how far away it is, as long as it is on the same plane of existence as you."
    },
    {
        "id": "inflict-wounds",
        "level": 1,
        "name": "Inflict Wounds",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "A creature you touch makes a Constitution saving throw, taking 2d10 Necrotic damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "jims-magic-missile",
        "level": 1,
        "name": "Jim's Magic Missile",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a gold coin)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You create three twisting, whistling, hypersonic darts of magical force. Each dart targets a creature of your choice that you can see within range. Make a ranged spell attack for each dart. On a hit, a dart deals 2d4 force damage. If the attack roll is a critical hit, the dart deals 5d4 force damage instead."
    },
    {
        "id": "jump",
        "level": 1,
        "name": "Jump",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S, M (a grasshopper's hind leg)",
        "duration": "1 minute",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "You touch a willing creature. Once on each of its turns until the spell ends, that creature can jump up to 30 feet by spending 10 feet of movement.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "longstrider",
        "level": 1,
        "name": "Longstrider",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a pinch of dirt)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "druid",
            "ranger",
            "wizard"
        ],
        "description": "You touch a creature. The target's Speed increases by 10 feet until the spell ends.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "mage-armor",
        "level": 1,
        "name": "Mage Armor",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a piece of cured leather)",
        "duration": "8 hours",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You touch a willing creature who isn't wearing armor. Until the spell ends, the target's base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor.",
        "source": "SRD 5.2"
    },
    {
        "id": "magnify-gravity",
        "level": 1,
        "name": "Magnify Gravity",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "1 round",
        "classes": [
            "wizard"
        ],
        "description": "The gravity in a 10-foot-radius sphere centered on a point you can see within range, increases for a moment. Each creature in the sphere on the turn when you cast the spell must make a Constitution saving throw. On a failed save, a creature takes 2d8 force damage, and its speed is halved until the end of its next turn. On a successful save, a creature takes half as much damage and suffers no reduction to its speed."
    },
    {
        "id": "protection-from-evil-and-good",
        "level": 1,
        "name": "Protection from Evil and Good",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a flask of Holy Water worth 25+, GP, which the spell consumes)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "druid",
            "paladin",
            "warlock",
            "wizard"
        ],
        "description": "Until the spell ends, one willing creature you touch is protected against creatures that are Aberrations, Celestials, Elementals, Fey, Fiends, or Undead. The protection grants several benefits. Creatures of those types have Disadvantage on attack rolls against the target. The target also can't be possessed by or gain the Charmed or Frightened conditions from them. If the target is already possessed, Charmed, or Frightened by such a creature, the target has Advantage on any new saving throw against the relevant effect.",
        "source": "SRD 5.2"
    },
    {
        "id": "puppet",
        "level": 1,
        "name": "Puppet (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "Your gesture forces one humanoid you can see within range to make a Constitution saving throw. On a failed save, the target must move up to its speed in a direction you choose. In addition, you can cause the target to drop whatever it is holding. This spell has no effect on a humanoid that is immune to being charmed."
    },
    {
        "id": "purify-food-and-drink",
        "level": 1,
        "name": "Purify Food and Drink",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "paladin"
        ],
        "description": "You remove poison and rot from nonmagical food and drink in a 5-foot-radius Sphere centered on a point within range.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "ray-of-sickness",
        "level": 1,
        "name": "Ray of Sickness",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You shoot a greenish ray at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 Poison damage and has the Poisoned condition until the end of your next turn. Using a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "remote-access",
        "level": 1,
        "name": "Remote Access (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You can use any electronic device within range as if it were in your hands. This is not a telekinesis spell. Rather, this spell allows you to simulate a device’s interface on a virtual screen that you create in front of you. You can enter commands on the device, such as typing a password, by touching the virtual screen."
    },
    {
        "id": "sanctuary",
        "level": 1,
        "name": "Sanctuary",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "30 feet",
        "components": "V, S, M (a shard of glass from a mirror)",
        "duration": "1 minute",
        "classes": [
            "cleric"
        ],
        "description": "You ward a creature within range. Until the spell ends, any creature who targets the warded creature with an attack roll or a damaging spell must succeed on a Wisdom saving throw or either choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from areas of effect. The spell ends if the warded creature makes an attack roll, casts a spell, or deals damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "searing-smite",
        "level": 1,
        "name": "Searing Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "1 minute",
        "classes": [
            "paladin"
        ],
        "description": "As you hit the target, it takes an extra 1d6 Fire damage from the attack. At the start of each of its turns until the spell ends, the target takes 1d6 Fire damage and then makes a Constitution saving throw. On a failed save, the spell continues. On a successful save, the spell ends.\nUsing a Higher-Level Spell Slot. All the damage increases by 1d6 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "sense-emotion",
        "level": 1,
        "name": "Sense Emotion (UA)",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "warlock"
        ],
        "description": "You sense the prevailing emotion of one humanoid you can see within 30 feet of you. You know its general emotional state, such as happy, sad, or frightened, but not the specific source of its emotion."
    },
    {
        "id": "shield-of-faith",
        "level": 1,
        "name": "Shield of Faith",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S, M (a prayer scroll)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
        "source": "SRD 5.2"
    },
    {
        "id": "silent-image",
        "level": 1,
        "name": "Silent Image",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a bit of fleece)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot Cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.\nAs a Magic action, you can cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.\nPhysical interaction with the image reveals it to be an illusion, since things can pass through it. A creature that takes a Study action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.",
        "source": "SRD 5.2"
    },
    {
        "id": "silvery-barbs",
        "level": 1,
        "name": "Silvery Barbs",
        "school": "Enchantment",
        "castingTime": "1 reaction",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must reroll the d20 and use the lower roll.\nYou can then choose a different creature you can see within range (you can choose yourself). The chosen creature has advantage on the next attack roll, ability check, or saving throw it makes within 1 minute. A creature can be empowered by only one use of this spell at a time."
    },
    {
        "id": "snare",
        "level": 1,
        "name": "Snare",
        "school": "Abjuration",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "S, M (30 feet of cord or rope, which is consumed by the spell)",
        "duration": "8 hours",
        "classes": [
            "druid",
            "ranger",
            "wizard",
            "artificer"
        ],
        "description": "As you cast this spell, you use the rope to create a circle with a 5-foot radius on the ground or the floor. When you finish casting, the rope disappears and the circle becomes a magic trap.\nThis trap is nearly invisible, requiring a successful Intelligence (Investigation) check against your spell save DC to be discerned.\nThe trap triggers when a Small, Medium, or Large creature moves onto the ground or the floor in the spell’s radius. That creature must succeed on a Dexterity saving throw or be hoisted into the air, leaving it hanging upside down 3 feet above the ground or the floor. The creature is restrained there until the spell ends."
    },
    {
        "id": "speak-with-animals",
        "level": 1,
        "name": "Speak with Animals",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "druid",
            "ranger",
            "warlock"
        ],
        "description": "For the duration, you can comprehend and verbally communicate with Beasts, and you can use any of the Influence action's skill options with them.\nMost Beasts have little to say about topics that don't pertain to survival or companionship, but at minimum, a Beast can give you information about nearby locations and monsters, including whatever it has perceived within the past day.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "sudden-awakening",
        "level": 1,
        "name": "Sudden Awakening (UA)",
        "school": "Enchantment",
        "castingTime": "1 bonus action",
        "range": "Self (10-foot radius)",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "Each sleeping creature you choose within 10 feet of you awakens and stands up (no movement required)."
    },
    {
        "id": "tashas-caustic-brew",
        "level": 1,
        "name": "Tasha's Caustic Brew",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot line)",
        "components": "V, S, M (a bit of rotten food)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "A stream of acid emanates from you in a line 30 feet long and 5 feet wide in a direction you choose. Each creature in the line must succeed on a Dexterity saving throw or be covered in acid for the spell’s duration or until a creature uses its action to scrape or wash the acid off itself. A creature covered in the acid takes 2d4 acid damage at the start of each of its turns."
    },
    {
        "id": "tashas-hideous-laughter",
        "level": 1,
        "name": "Tasha's Hideous Laughter",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a tart and a feather)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "One creature of your choice that you can see within range makes a Wisdom saving throw. On a failed save, it has the Prone and Incapacitated conditions for the duration. During that time, it laughs uncontrollably if it's capable of laughter, and it can't end the Prone condition on itself.\nAt the end of each of its turns and each time it takes damage, it makes another Wisdom saving throw. The target has Advantage on the save if the save is triggered by damage. On a successful save, the spell ends.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "tensers-floating-disk",
        "level": 1,
        "name": "Tenser's Floating Disk",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a drop of mercury)",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.\nThe disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 10-foot-deep pit, nor could it leave such a pit if it was created at the bottom.\nIf you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "thunderous-smite",
        "level": 1,
        "name": "Thunderous Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "Your strike rings with thunder that is audible within 300 feet of you, and the target takes an extra 2d6 Thunder damage from the attack. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and have the Prone condition.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "PHB 2024"
    },
    {
        "id": "thunderwave",
        "level": 1,
        "name": "Thunderwave",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You unleash a wave of thunderous energy. Each creature in a 15-foot Cube originating from you makes a Constitution saving throw. On a failed save, a creature takes 2d8 Thunder damage and is pushed 10 feet away from you. On a successful save, a creature takes half as much damage only.\nIn addition, unsecured objects that are entirely within the Cube are pushed 10 feet away from you, and a thunderous boom is audible within 300 feet.   Using a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "unearthly-chorus",
        "level": 1,
        "name": "Unearthly Chorus (UA)",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard"
        ],
        "description": "Music of a style you choose fills the air around you in a 30-foot radius. The music spreads around corners and can be heard from up to 100 feet away. The music moves with you, centering on you for the duration.\nUntil the spell ends, you make Charisma (Performance) checks with advantage. In addition, you can use a bonus action on each of your turns to beguile one creature you can see within 30 feet of you that can hear the music. The creature must make a Charisma saving throw. On a failed save, the creature is friendly to you for as long as it can hear the music and you are within 30 feet of it. If the creature is hostile to you, it has advantage on the saving throw. The spell ends if you attack the creature or if you cast a spell that affects it hostilely."
    },
    {
        "id": "unseen-servant",
        "level": 1,
        "name": "Unseen Servant",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a bit of string and of wood)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "This spell creates an Invisible, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 Hit Point, and a Strength of 2, and it can't attack. If it drops to 0 Hit Points, the spell ends.\nOnce on each of your turns as a Bonus Action, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring drinks. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.\nIf you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "wild-cunning",
        "level": 1,
        "name": "Wild Cunning (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 hour",
        "ritual": true,
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You call upon the spirits of nature to help you survive in the wild. You instantly gain a proficiency in one of the following skills of your choice: Animal Handling, Nature, Survival, Stealth, or Perception. Alternatively, you can use the spirits to help you set up camp. If you do, the spirits create a comfortable campsite that is hidden from view and protected from the elements."
    },
    {
        "id": "witch-bolt",
        "level": 1,
        "name": "Witch Bolt",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a twig from a tree that has been struck by lightning)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A beam of crackling energy lances toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against it. On a hit, the target takes 2d12 Lightning damage.\nOn each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically, even if the first attack missed.\nThe spell ends if the target is ever outside the spell's range or if it has Total Cover from you.\nUsing a Higher-Level Spell Slot. The initial damage increases by 1d12 for each spell slot level above 1.",
        "source": "PHB 2024"
    },
    {
        "id": "wrathful-smite",
        "level": 1,
        "name": "Wrathful Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "1 minute",
        "classes": [
            "paladin"
        ],
        "description": "The target takes an extra 1d6 Necrotic damage from the attack, and it must succeed on a Wisdom saving throw or have the Frightened condition until the spell ends. At the end of each of its turns, the Frightened target repeats the save, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.",
        "source": "PHB 2024"
    },
    {
        "id": "zephyr-strike",
        "level": 1,
        "name": "Zephyr Strike",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "ranger"
        ],
        "description": "You move like the wind. Until the spell ends, your movement doesn’t provoke opportunity attacks.\nOnce before the spell ends, you can give yourself advantage on one weapon attack roll on your turn. That attack deals an extra 1d8 force damage on a hit. Whether you hit or miss, your walking speed increases by 30 feet until the end of that turn."
    },
    {
        "id": "cure-wounds",
        "level": 1,
        "name": "Cure Wounds",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "A creature you touch regains a number of Hit Points equal to 2d8 plus your spellcasting ability modifier. Using a Higher-Level Spell Slot. The healing increases by 2d8 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "healing-word",
        "level": 1,
        "name": "Healing Word",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid"
        ],
        "description": "A creature of your choice that you can see within range regains Hit Points equal to 2d4 plus your spellcasting ability modifier.\nUsing a Higher-Level Spell Slot. The healing increases by 2d4 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "magic-missile",
        "level": 1,
        "name": "Magic Missile",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create three glowing darts of magical force. Each dart strikes a creature of your choice that you can see within range. A dart deals 1d4 + 1 Force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.\nUsing a Higher-Level Spell Slot. The spell creates one more dart for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "shield",
        "level": 1,
        "name": "Shield",
        "school": "Abjuration",
        "castingTime": "1 reaction, which you take when you are hit by an attack roll or targeted by the Magic Missile spell",
        "range": "Self",
        "components": "V, S",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile.",
        "source": "SRD 5.2"
    },
    {
        "id": "bless",
        "level": 1,
        "name": "Bless",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a Holy Symbol worth 5+ GP)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You bless up to three creatures within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target adds 1d4 to the attack roll or save.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "detect-magic",
        "level": 1,
        "name": "Detect Magic",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the Magic action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell's school of magic.\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "sleep",
        "level": 1,
        "name": "Sleep",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a pinch of sand or rose petals)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Each creature of your choice in a 5-foot-radius Sphere centered on a point within range must succeed on a Wisdom saving throw or have the Incapacitated condition until the end of its next turn, at which point it must repeat the save. If the target fails the second save, the target has the Unconscious condition for the duration. The spell ends on a target if it takes damage or someone within 5 feet of it takes an action to shake it out of the spell's effect.\nCreatures that don't sleep, such as elves, or that have Immunity to the Exhaustion condition automatically succeed on saves against this spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "aganazzars-scorcher",
        "level": 2,
        "name": "Aganazzar's Scorcher",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a red dragon's scale)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A line of roaring flame 30 feet long and 5 feet wide emanates from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 3d8 fire damage on a failed save, or half as much damage on a successful one."
    },
    {
        "id": "aid",
        "level": 2,
        "name": "Aid",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a strip of white cloth)",
        "duration": "8 hours",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "Choose up to three creatures within range. Each target's Hit Point maximum and current Hit Points increase by 5 for the duration.\nUsing a Higher-Level Spell Slot. Each target's Hit Points increase by 5 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "air-bubble",
        "level": 2,
        "name": "Air Bubble",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S",
        "duration": "24 hours",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "You create a spectral globe around the head of a willing creature you can see within range. The globe is filled with fresh air that lasts until the spell ends. If the creature has more than one head, the globe of air appears around only one of its heads (which is all the creature needs to avoid suffocation, assuming that all its heads share the same respiratory system)."
    },
    {
        "id": "alter-self",
        "level": 2,
        "name": "Alter Self",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You alter your physical form. Choose one of the following options. Its effects last for the duration, during which you can take a Magic action to replace the option you chose with a different one.\nAquatic Adaptation. You sprout gills and grow webs between your fingers. You can breathe underwater and gain a Swim Speed equal to your Speed.\nChange Appearance. You alter your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and other distinguishing characteristics. You can make yourself appear as a member of another species, though none of your statistics change. You can't appear as a creature of a different size, and your basic shape stays the same; if you're bipedal, you can't use this spell to become quadrupedal, for instance. For the duration, you can take a Magic action to change your appearance in this way again.\nNatural Weapons. You grow claws (Slashing), fangs (Piercing), horns (Piercing), or hooves (Bludgeoning). When you use your Unarmed Strike to deal damage with that new growth, it deals 1d6 damage of the type in parentheses instead of dealing the normal damage for your Unarmed Strike, and you use your spellcasting ability modifier for the attack and damage rolls rather than using Strength.",
        "source": "SRD 5.2"
    },
    {
        "id": "animal-messenger",
        "level": 2,
        "name": "Animal Messenger",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a morsel of food)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "druid",
            "ranger"
        ],
        "description": "A Tiny Beast of your choice that you can see within range must succeed on a Charisma saving throw, or it attempts to deliver a message for you (if the target's Challenge Rating isn't 0, it automatically succeeds). You specify a location you have visited and a recipient who matches a general description, such as \"a person dressed in the uniform of the town guard\" or \"a red-haired dwarf wearing a pointed hat.\" You also communicate a message of up to twenty-five words. The Beast travels for the duration toward the specified location, covering about 25 miles per 24 hours or 50 miles if the Beast can fly.\nWhen the Beast arrives, it delivers your message to the creature that you described, mimicking your communication. If the Beast doesn't reach its destination before the spell ends, the message is lost, and the Beast returns to where you cast the spell.\nUsing a Higher-Level Spell Slot. The spell's duration increases by 48 hours for each spell slot level above 2.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "arcane-hacking",
        "level": 2,
        "name": "Arcane Hacking (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (hacking tools)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You gain advantage on all Intelligence checks using hacking tools to break encryption or gain unauthorized access to a computer system."
    },
    {
        "id": "arcane-lock",
        "level": 2,
        "name": "Arcane Lock",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M ((gold dust worth 25+ GP, which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "You touch a closed door, window, gate, container, or hatch and magically lock it for the duration. This lock can't be unlocked by any nonmagical means. You and any creatures you designate when you cast the spell can open and close the object despite the lock. You can also set a password that, when spoken within 5 feet of the object, unlocks it for 1 minute.",
        "source": "SRD 5.2"
    },
    {
        "id": "augury",
        "level": 2,
        "name": "Augury",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M ((specially marked sticks, bones, cards, or other divinatory tokens worth 25+ GP)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "You receive an omen from an otherworldly entity about the results of a course of action that you plan to take within the next 30 minutes. The GM chooses the omen from the Omens table. Omens Omen    For Results That Will Be ... Woe    Bad  Weal and woe    Good and bad     Indifference    Neither good nor bad The spell doesn't account for circumstances, such as other spells, that might change the results.\nIf you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "barkskin",
        "level": 2,
        "name": "Barkskin",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S, M (a handful of bark)",
        "duration": "1 hour",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You touch a willing creature. Until the spell ends, the target's skin assumes a bark-like appearance, and the target has an Armor Class of 17 if its AC is lower than that.",
        "source": "SRD 5.2"
    },
    {
        "id": "beast-sense",
        "level": 2,
        "name": "Beast Sense",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "S",
        "duration": "Concentration, up to 1 hour",
        "ritual": true,
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You touch a willing beast. For the duration of the spell, you can use your action to see through the beast's eyes and hear what it hears, and continue to do so until you use your action to return to your normal senses."
    },
    {
        "id": "blindness-deafness",
        "level": 2,
        "name": "Blindness/Deafness",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V",
        "duration": "1 minute",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "wizard"
        ],
        "description": "One creature that you can see within range must succeed on a Constitution saving throw, or it has the Blinded or Deafened condition (your choice) for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "blur",
        "level": 2,
        "name": "Blur",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Your body becomes blurred. For the duration, any creature has Disadvantage on attack rolls against you. An attacker is immune to this effect if it perceives you with Blindsight or Truesight.",
        "source": "SRD 5.2"
    },
    {
        "id": "borrowed-knowledge",
        "level": 2,
        "name": "Borrowed Knowledge",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a book worth at least 25 gp)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "warlock",
            "wizard"
        ],
        "description": "You draw on the knowledge of spirits past. You gain proficiency in one skill of your choice for the duration."
    },
    {
        "id": "branding-smite",
        "level": 2,
        "name": "Shining Smite",
        "school": "Transmutation",
        "castingTime": "1 bonus action, which you take immediately after hitting a creature with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "paladin"
        ],
        "description": "The target hit by the strike takes an extra 2d6 Radiant damage from the attack. Until the spell ends, the target sheds Bright Light in a 5-foot radius, attack rolls against it have Advantage, and it can't benefit from the Invisible condition.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "calm-emotions",
        "level": 2,
        "name": "Calm Emotions",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "Each Humanoid in a 20-foot-radius Sphere centered on a point you choose within range must succeed on a Charisma saving throw or be affected by one of the following effects (choose for each creature): • The creature has Immunity to the Charmed and Frightened conditions until the spell ends. If the creature was already Charmed or Frightened, those conditions are suppressed for the duration. • The creature becomes Indifferent about creatures of your choice that it's Hostile toward. This indifference ends if the target takes damage or witnesses its allies taking damage. When the spell ends, the creature's attitude returns to normal.",
        "source": "SRD 5.2"
    },
    {
        "id": "cloud-of-daggers",
        "level": 2,
        "name": "Cloud of Daggers",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a sliver of glass)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You fill the air with spinning daggers in a cube 5 feet on each side, centered on a point you choose within range. A creature takes 4d4 slashing damage when it enters the spell’s area for the first time on a turn or starts its turn there."
    },
    {
        "id": "continual-flame",
        "level": 2,
        "name": "Continual Flame",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (ruby dust worth 50+ GP, which, the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "A flame springs from an object that you touch. The effect casts Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. It looks like a regular flame, but it creates no heat and consumes no fuel. The flame can be covered or hidden but not smothered or quenched.",
        "source": "SRD 5.2"
    },
    {
        "id": "cordon-of-arrows",
        "level": 2,
        "name": "Cordon of Arrows",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "5 feet",
        "components": "V, S, M (four or more arrows or bolts)",
        "duration": "8 hours",
        "classes": [
            "ranger"
        ],
        "description": "You plant four pieces of nonmagical ammunition – arrows or crossbow bolts – in the ground within range and lay magic upon them to protect an area. Until the spell ends, whenever a creature other than you comes within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take 1d6 piercing damage. The piece of ammunition is then destroyed. The spell ends when no ammunition remains."
    },
    {
        "id": "crown-of-madness",
        "level": 2,
        "name": "Crown of Madness",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "One humanoid of your choice that you can see within range must succeed on a Wisdom saving throw or become charmed by you for the duration. While the target is charmed in this way, a twisted crown of jagged iron appears on its head, and a madness glows in its eyes. The charmed target must use its action before moving on each of its turns to make a melee attack against a creature other than itself that you mentally choose. The target can act normally on its turn if you choose no creature or if none are within its reach. On your subsequent turns, you must use your action to maintain control over the target, or the spell ends. The target can make a Wisdom saving throw at the end of each of its turns. On a success, the spell ends."
    },
    {
        "id": "darkness",
        "level": 2,
        "name": "Darkness",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, M (bat fur and a piece of coal)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, magical Darkness spreads from a point within range and fills a 15-foot-radius Sphere. Darkvision can't see through it, and nonmagical light can't illuminate it.\nAlternatively, you cast the spell on an object that isn't being worn or carried, causing the Darkness to fill a 15-foot Emanation originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the Darkness.\nIf any of this spell's area overlaps with an area of Bright Light or Dim Light created by a spell of level 2 or lower, that other spell is dispelled.",
        "source": "SRD 5.2"
    },
    {
        "id": "darkvision",
        "level": 2,
        "name": "Darkvision",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a dried carrot)",
        "duration": "8 hours",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "For the duration, a willing creature you touch has Darkvision with a range of 150 feet.",
        "source": "SRD 5.2"
    },
    {
        "id": "detect-thoughts",
        "level": 2,
        "name": "Detect Thoughts",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (1 Copper Piece)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You activate one of the effects below. Until the spell ends, you can activate either effect as a Magic action on your later turns.\nSense Thoughts. You sense the presence of thoughts within 30 feet of yourself that belong to creatures that know languages or are telepathic. You don't read the thoughts, but you know that a thinking creature is present.\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.\nRead Thoughts. Target one creature you can see within 30 feet of yourself or one creature within 30 feet of yourself that you detected with the Sense Thoughts option. You learn what is most on the target's mind right now. If the target doesn't know any languages and isn't telepathic, you learn nothing.\nAs a Magic action on your next turn, you can try to probe deeper into the target's mind. If you probe deeper, the target makes a Wisdom saving throw. On a failed save, you discern the target's reasoning, emotions, and something that looms large in its mind (such as a worry, love, or hate). On a successful save, the spell ends. Either way, the target knows that you are probing into its mind, and until you shift your attention away from the target's mind, the target can take an action on its turn to make an Intelligence (Arcana) check against your spell save DC, ending the spell on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "digital-phantom",
        "level": 2,
        "name": "Digital Phantom (UA)",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a small piece of copper wire)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "This spell masks your presence in the digital realm. You have advantage on Intelligence checks to avoid detection by security cameras, laser grids, and other technological sensors."
    },
    {
        "id": "dragons-breath",
        "level": 2,
        "name": "Dragon's Breath",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S, M (a hot pepper)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You touch one willing creature, and choose Acid, Cold, Fire, Lightning, or Poison. Until the spell ends, the target can take a Magic action to exhale a 15-foot Cone. Each creature in that area makes a Dexterity saving throw, taking 3d6 damage of the chosen type on a failed save or half as much damage on a successful one.   Using a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "dust-devil",
        "level": 2,
        "name": "Dust Devil",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a pinch of dust)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell’s duration. Any creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes 1d8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn’t pushed."
    },
    {
        "id": "earthbind",
        "level": 2,
        "name": "Earthbind",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Choose one creature you can see within range. Yellow strips of magical energy loop around the creature. The target must succeed on a Strength saving throw or its flying speed (if any) is reduced to 0 feet for the spell’s duration. An airborne creature affected by this spell descends at 60 feet per round until it reaches the ground or the spell ends."
    },
    {
        "id": "enhance-ability",
        "level": 2,
        "name": "Enhance Ability",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (fur or a feather)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "You touch a creature and choose Strength, Dexterity, Intelligence, Wisdom, or Charisma. For the duration, the target has Advantage on ability checks using the chosen ability.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 2. You can choose a different ability for each target.",
        "source": "SRD 5.2"
    },
    {
        "id": "enlarge-reduce",
        "level": 2,
        "name": "Enlarge/Reduce",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a pinch of powdered iron)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "For the duration, the spell enlarges or reduces a creature or an object you can see within range (see the chosen effect below). A targeted object must be neither worn nor carried. If the target is an unwilling creature, it can make a Constitution saving throw. On a successful save, the spell has no effect.\nEverything that a targeted creature is wearing and carrying changes size with it. Any item it drops returns to normal size at once. A thrown weapon or piece of ammunition returns to normal size immediately after it hits or misses a target.\nEnlarge. The target's size increases by one category-from Medium to Large, for example. The target also has Advantage on Strength checks and Strength saving throws. The target's attacks with its enlarged weapons or Unarmed Strikes deal an extra 1d4 damage on a hit.\nReduce. The target's size decreases by one category-from Medium to Small, for example. The target also has Disadvantage on Strength checks and Strength saving throws. The target's attacks with its reduced weapons or Unarmed Strikes deal 1d4 less damage on a hit (this can't reduce the damage below 1).",
        "source": "SRD 5.2"
    },
    {
        "id": "enthrall",
        "level": 2,
        "name": "Enthrall",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "warlock"
        ],
        "description": "You weave a distracting string of words, causing creatures of your choice that you can see within range to make a Wisdom saving throw. Any creature you or your companions are fighting automatically succeeds on this save. On a failed save, a target has a -10 penalty to Wisdom (Perception) checks and Passive Perception until the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-steed",
        "level": 2,
        "name": "Find Steed",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "You summon an otherworldly being that appears as a loyal steed in an unoccupied space of your choice within range. This creature uses the Otherworldly Steed stat block. If you already have a steed from this spell, the steed is replaced by the new one.\nThe steed resembles a Large, rideable animal of your choice, such as a horse, a camel, a dire wolf, or an elk. Whenever you cast the spell, choose the steed's creature type-Celestial, Fey, or Fiendwhich determines certain traits in the stat block.\nCombat. The steed is an ally to you and your allies. In combat, it shares your Initiative count, and it functions as a controlled mount while you ride it (as defined in the rules on mounted combat). If you have the Incapacitated condition, the steed takes its turn immediately after yours and acts independently, focusing on protecting you.\nDisappearance of the Steed. The steed disappears if it drops to 0 Hit Points or if you die. When it disappears, it leaves behind anything it was wearing or carrying. If you cast this spell again, you decide whether you summon the steed that disappeared or a different one.\nUsing a Higher-Level Spell Slot. Use the spell slot's level for the spell's level in the stat block. Large Celestial, Fey, or Fiend (Your Choice), Neutral AC 10 + 1 per spell level HP 5 + 10 per spell level (the steed has a number of Hit Dice [d10s] equal to the spell's level) Speed 60 ft., Fly 60 ft. (requires level 4+ spell) MOD SAVE    MOD SAVE    MOD SAVE Str 18 +4 +4 dex 12 +1 +1 con 14 +2 +2 int 6 -2 -2 WiS 12 +1 +1 chA 8 -1 -1 Senses Passive Perception 11 Languages Telepathy 1 mile (works only with you) CR None (XP 0; PB equals your Proficiency Bonus) Traits     Life Bond. When you regain Hit Points from a level 1+ spell, the steed regains the same number of Hit Points if you're within 5 feet of it. Actions     Otherworldly Slam. Melee Attack Roll: Bonus equals your spell attack modifier, reach 5 ft. Hit: 1d8 plus the spell's level of Radiant (Celestial), Psychic (Fey), or Necrotic (Fiend) damage. Bonus Actions     Fell Glare (Fiend Only; Recharges after a Long Rest). Wisdom Saving Throw: DC equals your spell save DC, one creature within 60 feet the steed can see. Failure: The target has the Frightened condition until the end of your next turn. Fey Step (Fey Only; Recharges after a Long Rest). The steed teleports, along with its rider, to an unoccupied space of your choice up to 60 feet away from itself. Healing Touch (Celestial Only; Recharges after a Long Rest). One creature within 5 feet of the steed regains a number of Hit Points equal to 2d8 plus the spell's level.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-traps",
        "level": 2,
        "name": "Find Traps",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "ranger"
        ],
        "description": "You sense any trap within range that is within line of sight. A trap, for the purpose of this spell, includes any object or mechanism that was created to cause damage or other danger. Thus, the spell would sense the Alarm or Glyph of Warding spell or a mechanical pit trap, but it wouldn't reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.\nThis spell reveals that a trap is present but not its location. You do learn the general nature of the danger posed by a trap you sense.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-vehicle",
        "level": 2,
        "name": "Find Vehicle (UA)",
        "school": "Conjuration",
        "castingTime": "10 minutes",
        "range": "30 feet",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You summon a spirit that assumes the form of a non-military land vehicle of your choice, appearing in an unoccupied space within range. The vehicle has the statistics of a normal vehicle of its type, though it is celestial, fey, or fiend (your choice) in origin. The physical characteristics of the vehicle reflect its origin to some degree. You have a supernatural bond with the vehicle that allows you to drive it even if you aren't piloting it. While driving the vehicle, you are considered proficient with vehicles of this type."
    },
    {
        "id": "flame-blade",
        "level": 2,
        "name": "Flame Blade",
        "school": "Evocation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (a sumac leaf)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer"
        ],
        "description": "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke it again as a Bonus Action.\nAs a Magic action, you can make a melee spell attack with the fiery blade. On a hit, the target takes Fire damage equal to 3d6 plus your spellcasting ability modifier.\nThe flaming blade sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "flaming-sphere",
        "level": 2,
        "name": "Flaming Sphere",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a ball of wax)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You create a 5-foot-diameter sphere of fire in an unoccupied space on the ground within range. It lasts for the duration. Any creature that ends its turn within 5 feet of the sphere makes a Dexterity saving throw, taking 2d6 Fire damage on a failed save or half as much damage on a successful one.\nAs a Bonus Action, you can move the sphere up to 30 feet, rolling it along the ground. If you move the sphere into a creature's space, that creature makes the save against the sphere, and the sphere stops moving for the turn.\nWhen you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. Flammable objects that aren't being worn or carried start burning if touched by the sphere, and it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "flock-of-familiars",
        "level": 2,
        "name": "Flock of Familiars",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You temporarily summon three familiars – spirits that take animal forms of your choice. Each familiar has the statistics of a beast that you choose, such as a bat, cat, or raven. The familiars act independently of you, but they always obey your commands."
    },
    {
        "id": "fortunes-favor",
        "level": 2,
        "name": "Fortune's Favor",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "60 feet",
        "components": "V, S, M (a white pearl worth at least 100 gp, which the spell consumes)",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "You impart a short-lived luck charm to a willing creature you can see within range. For the duration, whenever the target makes an attack roll, an ability check, or a saving throw, it can roll an additional d20. It can choose to use this benefit before or after it makes its roll, but before the GM declares whether the roll succeeds or fails. The target can use this choice a number of times equal to your spellcasting ability modifier (minimum of once)."
    },
    {
        "id": "gentle-repose",
        "level": 2,
        "name": "Gentle Repose",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (2 Copper Pieces, which the spell consumes)",
        "duration": "10 days",
        "classes": [
            "cleric",
            "paladin",
            "wizard"
        ],
        "description": "You touch a corpse or other remains. For the duration, the target is protected from decay and can't become Undead.\nThe spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don't count against the time limit of spells such as Raise Dead.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "gift-of-gab",
        "level": 2,
        "name": "Gift of Gab",
        "school": "Enchantment",
        "castingTime": "1 reaction",
        "range": "Self",
        "components": "S, M (two gold coins)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "When you cast this spell, you skillfully reshape the memories of listeners in your immediate area, so that each creature of your choice within 5 feet of you forgets everything you said within the last 6 seconds. Those creatures then remember that you actually said the words you speak as the verbal component of the spell."
    },
    {
        "id": "gust-of-wind",
        "level": 2,
        "name": "Gust of Wind",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a legume seed)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "A Line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the duration. Each creature in the Line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the Line. A creature that ends its turn in the Line must make the same save.\nAny creature in the Line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.\nThe gust disperses gas or vapor, and it extinguishes candles and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.\nAs a Bonus Action on your later turns, you can change the direction in which the Line blasts from you.",
        "source": "SRD 5.2"
    },
    {
        "id": "healing-spirit",
        "level": 2,
        "name": "Healing Spirit",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You call forth a nature spirit to soothe the wounded. The intangible spirit appears in a space that is a 5-foot cube you can see within range. The spirit looks like a transparent beast or fey (your choice).\nUntil the spell ends, whenever you or a creature you can see moves into the spirit’s space for the first time on a turn or starts its turn there, you can cause the spirit to restore 1d6 hit points to that creature (no action required). The spirit can’t heal constructs or undead.\nAs a bonus action on your turn, you can move the spirit up to 30 feet to a space you can see."
    },
    {
        "id": "heat-metal",
        "level": 2,
        "name": "Heat Metal",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a piece of iron and a flame)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "druid"
        ],
        "description": "Choose a manufactured metal object, such as a metal weapon or a suit of Heavy or Medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 Fire damage when you cast the spell. Until the spell ends, you can take a Bonus Action on each of your later turns to deal this damage again if the object is within range.\nIf a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn't drop the object, it has Disadvantage on attack rolls and ability checks until the start of your next turn.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "hold-person",
        "level": 2,
        "name": "Hold Person",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a straight piece of iron)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Choose a Humanoid that you can see within range. The target must succeed on a Wisdom saving throw or have the Paralyzed condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. You can target one additional Humanoid for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "icingdeaths-frost-ua",
        "level": 2,
        "name": "Icingdeath's Frost (UA)",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (15-foot cone)",
        "components": "S, M (one of Drizzt's scimitars)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A burst of icy cold energy erupts from you in a 15-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 3d8 cold damage and is covered in ice for 1 minute or until a creature uses its action to break the ice off itself or another creature. A creature covered in ice has its speed reduced to 0. On a successful save, a creature takes half as much damage and isn’t covered in ice.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "immovable-object",
        "level": 2,
        "name": "Immovable Object",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (gold dust worth at least 25 gp, which the spell consumes)",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "You touch an object that weighs no more than 10 pounds and cause it to become magically fixed in place. You and the creatures you designate when you cast this spell can move the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute.\nIf the object is fixed in the air, it can hold up to 4,000 pounds of weight. More weight causes the object to fall. Otherwise, a creature can use an action to make a Strength check against your spell save DC. On a success, the creature can move the object up to 10 feet."
    },
    {
        "id": "jims-glowing-coin",
        "level": 2,
        "name": "Jim's Glowing Coin",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S, M (a coin)",
        "duration": "1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You toss a coin to a point you choose within range, where it hovers and begins to glow with a magical light. At the start of each of your turns while the spell lasts, you can use a bonus action to cause the coin to flash. When you do, each creature within 10 feet of the coin must succeed on a Wisdom saving throw or be distracted by the coin. A distracted creature has disadvantage on Wisdom (Perception) checks and initiative rolls."
    },
    {
        "id": "kinetic-jaunt",
        "level": 2,
        "name": "Kinetic Jaunt",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "You power up your movement with magical energy. Until the spell ends, your walking speed increases by 10 feet, and you don’t provoke opportunity attacks."
    },
    {
        "id": "knock",
        "level": 2,
        "name": "Knock",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.\nA target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.\nIf the target is held shut by Arcane Lock, that spell is suppressed for 10 minutes, during which time the target can be opened and closed.\nWhen you cast the spell, a loud knock, audible up to 300 feet away, emanates from the target.",
        "source": "SRD 5.2"
    },
    {
        "id": "lesser-restoration",
        "level": 2,
        "name": "Lesser Restoration",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "You touch a creature and end one condition on it: Blinded, Deafened, Paralyzed, or Poisoned.",
        "source": "SRD 5.2"
    },
    {
        "id": "levitate",
        "level": 2,
        "name": "Levitate",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a metal spring)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "One creature or loose object of your choice that you can see within range rises vertically up to 20 feet and remains suspended there for the duration. The spell can levitate an object that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.\nThe target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can take a Magic action to move the target, which must remain within the spell's range.\nWhen the spell ends, the target floats gently to the ground if it is still aloft.",
        "source": "SRD 5.2"
    },
    {
        "id": "locate-animals-or-plants",
        "level": 2,
        "name": "Locate Animals or Plants",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (fur from a bloodhound)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "ranger"
        ],
        "description": "Describe or name a specific kind of Beast, Plant creature, or nonmagical plant. You learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "locate-object",
        "level": 2,
        "name": "Locate Object",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a forked twig)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "wizard"
        ],
        "description": "Describe or name an object that is familiar to you. You sense the direction to the object's location if that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.\nThe spell can locate a specific object known to you if you have seen it up close-within 30 feet-at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.\nThis spell can't locate an object if any thickness of lead blocks a direct path between you and the object.",
        "source": "SRD 5.2"
    },
    {
        "id": "magic-mouth",
        "level": 2,
        "name": "Magic Mouth",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S, M (jade dust worth 10+ GP, which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You implant a message within an object in range-a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn't being worn or carried by another creature. Then speak the message, which must be 25 words or fewer, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message.\nWhen that trigger occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there, so the words appear to come from the object's mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeat its message whenever the trigger occurs.\nThe trigger can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "magic-weapon",
        "level": 2,
        "name": "Magic Weapon",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "paladin",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls. The spell ends early if you cast it again.\nUsing a Higher-Level Spell Slot. The bonus increases to +2 with a level 3-5 spell slot. The bonus increases to +3 with a level 6+ spell slot.",
        "source": "SRD 5.2"
    },
    {
        "id": "maximillians-earthen-grasp",
        "level": 2,
        "name": "Maximillian's Earthen Grasp",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a miniature hand sculpted from clay)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You choose a 5-foot-square unoccupied space on the ground that you can see within range. A Medium hand made from compacted soil rises there and reaches for one creature you can see within 5 feet of it. The target must make a Strength saving throw. On a failed save, the target takes 2d6 bludgeoning damage and is restrained for the spell’s duration.\nAs an action, you can cause the hand to crush the restrained target, who must make a Strength saving throw. It takes 2d6 bludgeoning damage on a failed save, or half as much damage on a successful one.\nTo break out, the restrained target can use its action to make a Strength check against your spell save DC. On a success, the target escapes and is no longer restrained by the hand.\nAs an action, you can cause the hand to reach for a different creature or to move to a different unoccupied space within range. The hand releases a restrained target if you do either."
    },
    {
        "id": "melfs-acid-arrow",
        "level": 2,
        "name": "Melf's Acid Arrow",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (powdered rhubarb leaf)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 Acid damage and 2d4 Acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage only.\nUsing a Higher-Level Spell Slot. The damage (both initial and later) increases by 1d4 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "mental-barrier-ua",
        "level": 2,
        "name": "Mental Barrier (UA)",
        "school": "Abjuration",
        "castingTime": "1 reaction, which you take when you are forced to make an Intelligence, a Wisdom, or a Charisma saving throw",
        "range": "Self",
        "components": "V",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You protect your mind with a wall of looping, repetitive thought. Until the start of your next turn, you have advantage on Intelligence, Wisdom, and Charisma saving throws, and you have resistance to psychic damage.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "mind-spike",
        "level": 2,
        "name": "Mind Spike",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You drive a spike of psionic energy into the mind of one creature you can see within range. The target makes a Wisdom saving throw, taking 3d8 Psychic damage on a failed save or half as much damage on a successful one. On a failed save, you also always know the target's location until the spell ends, but only while the two of you are on the same plane of existence. While you have this knowledge, the target can't become hidden from you, and if it has the Invisible condition, it gains no benefit from that condition against you.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "mind-thrust-ua",
        "level": 2,
        "name": "Mind Thrust (UA)",
        "school": "Enchantment",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must make an Intelligence saving throw. On a failed save, the target takes 3d6 psychic damage, and it can't take a reaction until the end of its next turn. Moreover, on its next turn, it must choose whether it uses its movement, its action, or its bonus action; it gets only one of the three. On a successful save, the target takes half as much damage and suffers no other effect.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "mirror-image",
        "level": 2,
        "name": "Mirror Image",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real.\nEach time a creature hits you with an attack roll during the spell's duration, roll a d6 for each of your remaining duplicates. If any of the d6s rolls a 3 or higher, one of the duplicates is hit instead of you, and the duplicate is destroyed. The duplicates otherwise ignore all other damage and effects. The spell ends when all three duplicates are destroyed. A creature is unaffected by this spell if it has the Blinded condition, Blindsight, or Truesight.",
        "source": "SRD 5.2"
    },
    {
        "id": "moonbeam",
        "level": 2,
        "name": "Moonbeam",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a moonseed leaf)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid"
        ],
        "description": "A silvery beam of pale light shines down in a 5-foot-radius, 40-foot-high Cylinder centered on a point within range. Until the spell ends, Dim Light fills the Cylinder, and you can take a Magic action on later turns to move the Cylinder up to 60 feet.\nWhen the Cylinder appears, each creature in it makes a Constitution saving throw. On a failed save, a creature takes 2d10 Radiant damage, and if the creature is shape-shifted (as a result of the Polymorph spell, for example), it reverts to its true form and can't shape-shift until it leaves the Cylinder. On a successful save, a creature takes half as much damage only. A creature also makes this save when the spell's area moves into its space and when it enters the spell's area or ends its turn there. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "nathairs-mischief",
        "level": 2,
        "name": "Nathair's Mischief",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S, M (a piece of crust from an apple pie)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You fill a 20-foot cube you can see within range with fey and draconic magic. Roll on the Mischievous Surge table to determine the magical effect produced. At the start of each of your turns, you can move the cube up to 10 feet and reroll on the table."
    },
    {
        "id": "nathairs-mischief-ua",
        "level": 2,
        "name": "Nathair's Mischief (UA)",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S, M (a piece of crust from an apple pie)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You fill a 20-foot cube you can see within range with fey magic. Roll on the Mischievous Surge table to determine the magical effect produced. At the start of each of your turns, you can move the cube up to 10 feet and reroll on the table.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "nystuls-magic-aura",
        "level": 2,
        "name": "Nystul's Magic Aura",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a small square of silk)",
        "duration": "24 hours",
        "classes": [
            "wizard"
        ],
        "description": "With a touch, you place an illusion on a willing creature or an object that isn't being worn or carried. A creature gains the Mask effect below, and an object gains the False Aura effect below. The effect lasts for the duration. If you cast the spell on the same target every day for 30 days, the illusion lasts until dispelled.\nMask (Creature). Choose a creature type other than the target's actual type. Spells and other magical effects treat the target as if it were a creature of the chosen type.\nFalse Aura (Object). You change the way the target appears to spells and magical effects that detect magical auras, such as Detect Magic. You can make a nonmagical object appear magical, make a magic item appear nonmagical, or change the object's aura so that it appears to belong to a school of magic you choose.",
        "source": "SRD 5.2"
    },
    {
        "id": "invisibility",
        "level": 2,
        "name": "Invisibility",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (an eyelash in gum arabic)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A creature you touch has the Invisible condition until the spell ends. The spell ends early immediately after the target makes an attack roll, deals damage, or casts a spell.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "misty-step",
        "level": 2,
        "name": "Misty Step",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.",
        "source": "SRD 5.2"
    },
    {
        "id": "pass-without-trace",
        "level": 2,
        "name": "Pass without Trace",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (ashes from burned mistletoe)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You radiate a concealing aura in a 30-foot Emanation for the duration. While in the aura, you and each creature you choose have a +10 bonus to Dexterity (Stealth) checks and leave no tracks.",
        "source": "SRD 5.2"
    },
    {
        "id": "phantasmal-force",
        "level": 2,
        "name": "Phantasmal Force",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a bit of fleece)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You attempt to craft an illusion in the mind of a creature you can see within range. The target makes an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other phenomenon that is no larger than a 10-foot Cube and that is perceivable only to the target for the duration. The phantasm includes sound, temperature, and other stimuli.\nThe target can take a Study action to examine the phantasm with an Intelligence (Investigation) check against your spell save DC. If the check succeeds, the target realizes that the phantasm is an illusion, and the spell ends.\nWhile affected by the spell, the target treats the phantasm as if it were real and rationalizes any illogical outcomes from interacting with it. For example, if the target steps through a phantasmal bridge and survives the fall, it believes the bridge exists and something else caused it to fall.\nAn affected target can even take damage from the illusion if the phantasm represents a dangerous creature or hazard. On each of your turns, such a phantasm can deal 2d8 Psychic damage to the target if it is in the phantasm's area or within 5 feet of the phantasm. The target perceives the damage as a type appropriate to the illusion.",
        "source": "SRD 5.2"
    },
    {
        "id": "prayer-of-healing",
        "level": 2,
        "name": "Prayer of Healing",
        "school": "Abjuration",
        "castingTime": "10 minutes",
        "range": "30 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "Up to five creatures of your choice who remain within range for the spell's entire casting gain the benefits of a Short Rest and also regain 2d8 Hit Points. A creature can't be affected by this spell again until that creature finishes a Long Rest.   Using a Higher-Level Spell Slot. The healing increases by 1d8 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "protection-from-poison",
        "level": 2,
        "name": "Protection from Poison",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "You touch a creature and end the Poisoned condition on it. For the duration, the target has Advantage on saving throws to avoid or end the Poisoned condition, and it has Resistance to Poison damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "pyrotechnics",
        "level": 2,
        "name": "Pyrotechnics",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "Choose an area of nonmagical flame that you can see and that fits within a 5-foot cube within range. You can extinguish the fire in that area, and you create either fireworks or smoke when you do so.\nFireworks: The target explodes with a dazzling display of colors. Each creature within 10 feet of the target must succeed on a Constitution saving throw or become blinded until the end of your next turn.\nSmoke: Thick black smoke spreads out from the target in a 20-foot radius, moving around corners. The area of the smoke is heavily obscured. The smoke persists for 1 minute or until a strong wind disperses it."
    },
    {
        "id": "ray-of-enfeeblement",
        "level": 2,
        "name": "Ray of Enfeeblement",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "A beam of enervating energy shoots from you toward a creature within range. The target must make a Constitution saving throw. On a successful save, the target has Disadvantage on the next attack roll it makes until the start of your next turn.\nOn a failed save, the target has Disadvantage on Strength-based D20 Tests for the duration. During that time, it also subtracts 1d8 from all its damage rolls. The target repeats the save at the end of each of its turns, ending the spell on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "rimes-binding-ice",
        "level": 2,
        "name": "Rime's Binding Ice",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot cone)",
        "components": "S, M (a vial of meltwater)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A burst of cold energy emanates from you in a 30-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 3d8 cold damage and is hindered by ice formations for 1 minute, or until it or another creature within reach uses an action to break away the ice. A creature hindered by ice has its speed reduced to 0. On a successful save, a creature takes half as much damage and isn’t hindered by ice."
    },
    {
        "id": "rope-trick",
        "level": 2,
        "name": "Rope Trick",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a segment of rope)",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "You touch a rope. One end of it hovers upward until the rope hangs perpendicular to the ground or the rope reaches a ceiling. At the rope's upper end, an Invisible 3-foot-by-5-foot portal opens to an extradimensional space that lasts until the spell ends. That space can be reached by climbing the rope, which can be pulled into or dropped out of it.\nThe space can hold up to eight Medium or smaller creatures. Attacks, spells, and other effects can't pass into or out of the space, but creatures inside it can see through the portal. Anything inside the space drops out when the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "scorching-ray",
        "level": 2,
        "name": "Scorching Ray",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You hurl three fiery rays. You can hurl them at one target within range or at several. Make a ranged spell attack for each ray. On a hit, the target takes 2d6 Fire damage.\nUsing a Higher-Level Spell Slot. You create one additional ray for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "see-invisibility",
        "level": 2,
        "name": "See Invisibility",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a pinch of talc)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "For the duration, you see creatures and objects that have the Invisible condition as if they were visible, and you can see into the Ethereal Plane. Creatures and objects there appear ghostly.",
        "source": "SRD 5.2"
    },
    {
        "id": "shadow-blade",
        "level": 2,
        "name": "Shadow Blade",
        "school": "Illusion",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You weave together threads of shadow to create a sword of solidified gloom in your hand. This magic sword lasts until the spell ends. It counts as a simple melee weapon with which you are proficient. It deals 2d8 psychic damage on a hit and has the finesse, light, and thrown properties (range 20/60).\nIn addition, when you use the sword to attack a target that is in dim light or darkness, you make the attack roll with advantage.\nIf you drop the weapon or throw it, it dissipates at the end of the turn. Thereafter, while the spell persists, you can use a bonus action to cause the sword to reappear in your hand."
    },
    {
        "id": "shatter",
        "level": 2,
        "name": "Shatter",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a chip of mica)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "A loud noise erupts from a point of your choice within range. Each creature in a 10-foot-radius Sphere centered there makes a Constitution saving throw, taking 3d8 Thunder damage on a failed save or half as much damage on a successful one. A Construct has Disadvantage on the save.\nA nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area. Using a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "silence",
        "level": 2,
        "name": "Silence",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "cleric",
            "ranger"
        ],
        "description": "For the duration, no sound can be created within or pass through a 20-foot-radius Sphere centered on a point you choose within range. Any creature or object entirely inside the Sphere has Immunity to Thunder damage, and creatures have the Deafened condition while entirely inside it. Casting a spell that includes a Verbal component is impossible there.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "skywrite",
        "level": 2,
        "name": "Skywrite",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Sight",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "ritual": true,
        "classes": [
            "bard",
            "druid",
            "wizard",
            "artificer"
        ],
        "description": "You cause up to ten words to form in a part of the sky you can see. The words appear to be made of cloud and remain for the spell’s duration. The words dissipate when the spell ends. A strong wind can disperse the clouds and end the spell early."
    },
    {
        "id": "snillocs-snowball-swarm",
        "level": 2,
        "name": "Snilloc's Snowball Swarm",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a piece of ice or a small white rock chip)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A flurry of magic snowballs erupts from a point you choose within range. Each creature in a 5-foot-radius sphere centered on that point must make a Dexterity saving throw. A creature takes 3d6 cold damage on a failed save, or half as much damage on a successful one."
    },
    {
        "id": "spider-climb",
        "level": 2,
        "name": "Spider Climb",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a drop of bitumen and a spider)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and along ceilings, while leaving its hands free. The target also gains a Climb Speed equal to its Speed.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "spike-growth",
        "level": 2,
        "name": "Spike Growth",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (seven thorns)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "The ground in a 20-foot-radius Sphere centered on a point within range sprouts hard spikes and thorns. The area becomes Difficult Terrain for the duration. When a creature moves into or within the area, it takes 2d4 Piercing damage for every 5 feet it travels.\nThe transformation of the ground is camouflaged to look natural. Any creature that can't see the area when the spell is cast must take a Search action and succeed on a Wisdom (Perception or Survival) check against your spell save DC to recognize the terrain as hazardous before entering it.",
        "source": "SRD 5.2"
    },
    {
        "id": "spiritual-weapon",
        "level": 2,
        "name": "Spiritual Weapon",
        "school": "Evocation",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric"
        ],
        "description": "You create a floating, spectral force that resembles a weapon of your choice and lasts for the duration. The force appears within range in a space of your choice, and you can immediately make one melee spell attack against one creature within 5 feet of the force. On a hit, the target takes Force damage equal to 1d8 plus your spellcasting ability modifier.\nAs a Bonus Action on your later turns, you can move the force up to 20 feet and repeat the attack against a creature within 5 feet of it.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for every slot level above 2.",
        "source": "SRD 5.2"
    },
    {
        "id": "spray-of-cards",
        "level": 2,
        "name": "Spray Of Cards",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self (15-foot cone)",
        "components": "V, S, M (a deck of cards)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You spray a 15-foot cone of spectral cards. Each creature in that area must make a Dexterity saving throw. On a failed save, a creature takes 2d10 force damage and is blinded until the end of its next turn. On a successful save, a creature takes half as much damage and isn’t blinded."
    },
    {
        "id": "spray-of-cards-ua",
        "level": 2,
        "name": "Spray of Cards (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self (15-foot cone)",
        "components": "V, S, M (a deck of cards)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You spray a 15-foot cone of spectral cards. Each creature in that area must make a Dexterity saving throw. On a failed save, a creature takes 2d10 force damage and is blinded until the end of its next turn. On a successful save, a creature takes half as much damage and isn’t blinded.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "suggestion",
        "level": 2,
        "name": "Suggestion",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, M (a drop of honey)",
        "duration": "Concentration, up to 8 hours",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You suggest a course of activity-described in no more than 25 words-to one creature you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to the target or its allies. For example, you could say, \"Fetch the key to the cult's treasure vault, and give the key to me.\" Or you could say, \"Stop fighting, leave this library peacefully, and don't return.\"\nThe target must succeed on a Wisdom saving throw or have the Charmed condition for the duration or until you or your allies deal damage to the target. The Charmed target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for the target upon completing it.",
        "source": "SRD 5.2"
    },
    {
        "id": "summon-beast",
        "level": 2,
        "name": "Summon Beast",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a feather, tuft of fur, and fish tail inside a gilded acorn worth at least 200 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "tashas-mind-whip",
        "level": 2,
        "name": "Tasha's Mind Whip",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V",
        "duration": "1 round",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You psychically lash out at one creature you can see within range. The target must make an Intelligence saving throw. On a failed save, the target takes 3d6 psychic damage, and it can't take a reaction until the end of its next turn. Moreover, on its next turn, it must choose whether it uses its movement, its action, or its bonus action; it gets only one of the three. On a successful save, the target takes half as much damage and suffers no other effect."
    },
    {
        "id": "thought-shield-ua",
        "level": 2,
        "name": "Thought Shield (UA)",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You touch a willing creature and place a protective shield on its mind. For the duration, the target is immune to any effect that would sense its emotions or read its thoughts, as well as to all divination spells. The spell ends early if you cast it again.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "vortex-warp",
        "level": 2,
        "name": "Vortex Warp",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "You twist space around one target you can see within range. The target must make a Constitution saving throw (the target can choose to fail), and if the target is a willing creature, it doesn't need to make the save. On a failed save, the target is teleported to an unoccupied space of your choice that you can see within range. The chosen space must be on a surface or in a liquid that can support the target without the target having to squeeze."
    },
    {
        "id": "warding-bond",
        "level": 2,
        "name": "Warding Bond",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a pair of platinum rings worth 50+ GP each, which you and the target must wear for the duration)",
        "duration": "1 hour",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You touch another creature that is willing and create a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has Resistance to all damage. Also, each time it takes damage, you take the same amount of damage.\nThe spell ends if you drop to 0 Hit Points or if you and the target become separated by more than 60 feet. It also ends if the spell is cast again on either of the connected creatures.",
        "source": "SRD 5.2"
    },
    {
        "id": "warding-wind",
        "level": 2,
        "name": "Warding Wind",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "A strong wind (20 miles per hour) blows around you in a 10-foot radius and moves with you, remaining centered on you. The wind lasts for the spell’s duration.\nThe wind has the following effects:\n- It deafens you and other creatures in its area.\n- It extinguishes unprotected flames in its area that are torch-sized or smaller.\n- The area is difficult terrain for creatures other than you.\n- The attack rolls of ranged weapon attacks have disadvantage if they pass in or out of the wind. - It hedges out vapor, gas, and fog that can be dispersed by strong wind."
    },
    {
        "id": "warp-sense",
        "level": 2,
        "name": "Warp Sense",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a small strip of paper twisted into a loop)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, you sense the location of any portal within 30 feet of you."
    },
    {
        "id": "web",
        "level": 2,
        "name": "Web",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a bit of spiderweb)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You conjure a mass of sticky webbing at a point within range. The webs fill a 20-foot Cube there for the duration. The webs are Difficult Terrain, and the area within them is Lightly Obscured.\nIf the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet.\nThe first time a creature enters the webs on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the Restrained condition while in the webs or until it breaks free.\nA creature Restrained by the webs can take an action to make a Strength (Athletics) check against your spell save DC. If it succeeds, it is no longer Restrained.\nThe webs are flammable. Any 5-foot Cube of webs exposed to fire burns away in 1 round, dealing 2d4 Fire damage to any creature that starts its turn in the fire.",
        "source": "SRD 5.2"
    },
    {
        "id": "wither-and-bloom",
        "level": 2,
        "name": "Wither and Bloom",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a withered vine twisted into a loop)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You invoke both death and life upon a 10-foot-radius sphere centered on a point within range. Each creature of your choice in that area must make a Constitution saving throw, taking 2d6 necrotic damage on a failed save, or half as much damage on a successful one. Nonmagical vegetation in that area withers.\nIn addition, one creature of your choice in that area can spend and roll one of its unspent Hit Dice and regain a number of hit points equal to the roll plus your spellcasting ability modifier."
    },
    {
        "id": "wristpocket",
        "level": 2,
        "name": "Wristpocket",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "S",
        "duration": "Concentration, up to 1 hour",
        "ritual": true,
        "classes": [
            "wizard"
        ],
        "description": "You flick your wrist, causing one object in your hand to vanish. The object, which only you can be holding and can weigh no more than 5 pounds, is transported to an extradimensional space, where it remains for the duration.\nUntil the spell ends, you can use your action to summon the object to your free hand, and you can use your action to return the object to the extradimensional space. An object still in the pocket when the spell ends appears in your space at your feet."
    },
    {
        "id": "zone-of-truth",
        "level": 2,
        "name": "Zone of Truth",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "cleric",
            "paladin"
        ],
        "description": "You create a magical zone that guards against deception in a 15-foot-radius Sphere centered on a point within range. Until the spell ends, a creature that enters the spell's area for the first time on a turn or starts its turn there makes a Charisma saving throw. On a failed save, a creature can't speak a deliberate lie while in the radius. You know whether a creature succeeds or fails on this save.\nAn affected creature is aware of the spell and can avoid answering questions to which it would normally respond with a lie. Such a creature can be evasive yet must be truthful.",
        "source": "SRD 5.2"
    },
    {
        "id": "animate-dead",
        "level": 3,
        "name": "Animate Dead",
        "school": "Necromancy",
        "castingTime": "1 minute",
        "range": "10 feet",
        "components": "V, S, M (a drop of blood, a piece of flesh, and a pinch of bone dust)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "wizard"
        ],
        "description": "Choose a pile of bones or a corpse of a Medium or Small Humanoid within range. The target becomes an Undead creature: a Skeleton if you chose bones or a Zombie if you chose a corpse (see \"Monsters.\" for the stat blocks).\nOn each of your turns, you can take a Bonus Action to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a chamber or corridor. If you issue no commands, the creature takes the Dodge action and moves only to avoid harm. Once given an order, the creature continues to follow it until its task is complete.\nThe creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell rather than animating a new creature.\nUsing a Higher-Level Spell Slot. You animate or reassert control over two additional Undead creatures for each spell slot level above 3. Each of the creatures must come from a different corpse or pile of bones.",
        "source": "SRD 5.2"
    },
    {
        "id": "antagonize",
        "level": 3,
        "name": "Antagonize",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a playing card depicting a rogue)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You whisper magical words that antagonize one creature of your choice within range. The target must make a Wisdom saving throw. On a failed save, the target causes the creature and has disadvantage on the next attack roll it makes before the end of its next turn. The target takes 4d8 psychic damage on a failed save, or half as much damage on a successful one."
    },
    {
        "id": "antagonize-ua",
        "level": 3,
        "name": "Antagonize (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a playing card depicting a rogue)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You whisper magical words that antagonize one creature of your choice within range. The target must make a Wisdom saving throw. On a failed save, the target takes 4d4 psychic damage and must immediately use its reaction to make a melee attack against another creature of your choice that you can see. If the target can't make this attack (for example, because there is no one within its reach or because its reaction is unavailable), the target instead has disadvantage on the next attack roll it makes before the end of its next turn. On a successful save, the target takes half as much damage and doesn't make an attack.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "ashardalons-stride",
        "level": 3,
        "name": "Ashardalon's Stride",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "artificer",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "The billowing flames of a dragon blast from your feet, granting you explosive speed. For the duration, your speed increases by 20 feet and moving doesn't provoke opportunity attacks.\nWhen you move within 5 feet of a creature or an object that isn't being worn or carried, it takes 1d6 fire damage. A creature or object can take this damage only once during a turn."
    },
    {
        "id": "aura-of-vitality",
        "level": 3,
        "name": "Aura of Vitality",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot radius)",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "druid",
            "paladin"
        ],
        "description": "Healing energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. You can use a bonus action to cause one creature in the aura (including you) to regain 2d6 hit points."
    },
    {
        "id": "beacon-of-hope",
        "level": 3,
        "name": "Beacon of Hope",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric"
        ],
        "description": "Choose any number of creatures within range. For the duration, each target has Advantage on Wisdom saving throws and Death Saving Throws and regains the maximum number of Hit Points possible from any healing.",
        "source": "SRD 5.2"
    },
    {
        "id": "bestow-curse",
        "level": 3,
        "name": "Bestow Curse",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "You touch a creature, which must succeed on a Wisdom saving throw or become cursed for the duration. Until the curse ends, the target suffers one of the following effects of your choice: • Choose one ability. The target has Disadvantage on ability checks and saving throws made with that ability. • The target has Disadvantage on attack rolls against you. • In combat, the target must succeed on a Wisdom saving throw at the start of each of its turns or be forced to take the Dodge action on that turn. • If you deal damage to the target with an attack roll or a spell, the target takes an extra 1d8 Necrotic damage.\nUsing a Higher-Level Spell Slot. If you cast this spell using a level 4 spell slot, you can maintain Concentration on it for up to 10 minutes. If you use a level 5+ spell slot, the spell doesn't require Concentration, and the duration becomes 8 hours (level 5-6 slot) or 24 hours (level 7-8 slot). If you use a level 9 spell slot, the spell lasts until dispelled.",
        "source": "SRD 5.2"
    },
    {
        "id": "blinding-smite",
        "level": 3,
        "name": "Blinding Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "1 minute",
        "classes": [
            "paladin"
        ],
        "description": "The target hit by the strike takes an extra 3d8 Radiant damage from the attack, and the target has the Blinded condition until the spell ends. At the end of each of its turns, the Blinded target makes a Constitution saving throw, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. The extra damage increases by 1d8 for each spell slot level above 3.",
        "source": "PHB 2024"
    },
    {
        "id": "blink",
        "level": 3,
        "name": "Blink",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Roll 1d6 at the end of each of your turns for the duration. On a roll of 4-6, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell ends instantly if you are already on that plane). While on the Ethereal Plane, you can perceive the plane you left, which is cast in shades of gray, but you can't see anything there more than 60 feet away. You can affect and be affected only by other creatures on the Ethereal Plane, and creatures on the other plane can't perceive you unless they have a special ability that lets them perceive things on the Ethereal Plane.\nYou return to the other plane at the start of your next turn and when the spell ends if you are on the Ethereal Plane. You return to an unoccupied space of your choice that you can see within 10 feet of the space you left. If no unoccupied space is available within that range, you appear in the nearest unoccupied space.",
        "source": "SRD 5.2"
    },
    {
        "id": "call-lightning",
        "level": 3,
        "name": "Call Lightning",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid"
        ],
        "description": "A storm cloud appears at a point within range that you can see above yourself. It takes the shape of a Cylinder that is 10 feet tall with a 60-foot radius.\nWhen you cast the spell, choose a point you can see under the cloud. A lightning bolt shoots from the cloud to that point. Each creature within 5 feet of that point makes a Dexterity saving throw, taking 3d10 Lightning damage on a failed save or half as much damage on a successful one.\nUntil the spell ends, you can take a Magic action to call down lightning in that way again, targeting the same point or a different one.\nIf you're outdoors in a storm when you cast this spell, the spell gives you control over that storm instead of creating a new one. Under such conditions, the spell's damage increases by 1d10.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "catnap",
        "level": 3,
        "name": "Catnap",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "S, M (a pinch of sand)",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "You make a calming gesture, and up to three willing creatures of your choice that you can see within range fall unconscious for the spell’s duration. The spell ends on a target early if it takes damage or someone uses an action to shake or slap it awake. If a target remains unconscious for the full duration, that target gains the benefit of a short rest, and it can’t be affected by this spell again until it finishes a long rest."
    },
    {
        "id": "clairvoyance",
        "level": 3,
        "name": "Clairvoyance",
        "school": "Divination",
        "castingTime": "10 minutes",
        "range": "1 mile",
        "components": "V, S, M (a focus worth 100+ GP, either a jeweled horn for hearing or a glass eye for seeing)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "wizard"
        ],
        "description": "You create an Invisible sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The intangible, invulnerable sensor remains in place for the duration.\nWhen you cast the spell, choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As a Bonus Action, you can switch between seeing and hearing.\nA creature that sees the sensor (such as a creature benefiting from See Invisibility or Truesight) sees a luminous orb about the size of your fist.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-animals",
        "level": 3,
        "name": "Conjure Animals",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You conjure nature spirits that appear as a Large pack of spectral, intangible animals in an unoccupied space you can see within range. The pack lasts for the duration, and you choose the spirits' animal form, such as wolves, serpents, or birds.\nYou have Advantage on Strength saving throws while you're within 5 feet of the pack, and when you move on your turn, you can also move the pack up to 30 feet to an unoccupied space you can see.\nWhenever the pack moves within 10 feet of a creature you can see and whenever a creature you can see enters a space within 10 feet of the pack or ends its turn there, you can force that creature to make a Dexterity saving throw. On a failed save, the creature takes 3d10 Slashing damage. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-barrage",
        "level": 3,
        "name": "Conjure Barrage",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self (60-foot cone)",
        "components": "V, S, M (one piece of ammunition or a thrown weapon)",
        "duration": "Instantaneous",
        "classes": [
            "ranger"
        ],
        "description": "You throw a nonmagical weapon or fire a piece of nonmagical ammunition into the air to create a cone of identical weapons that shoot forward and then disappear. Each creature in a 60-foot cone must succeed on a Dexterity saving throw. A creature takes 3d8 damage on a failed save, or half as much damage on a successful one. The damage type is the same as that of the weapon or ammunition used as a component."
    },
    {
        "id": "conjure-lesser-demon-ua",
        "level": 3,
        "name": "Conjure Lesser Demon (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You summon up to eight manes or dretches that appear in unoccupied spaces you can see within range. A manes or dretch disappears when it drops to 0 hit points or when the spell ends.\nThe demons are hostile to all creatures, including you. Roll initiative for the summoned demons as a group, which has its own turns. The demons pursue and attack the nearest non-demons to the best of their ability.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th or 7th level, you summon twice as many demons. If you cast it using a spell slot of 8th or 9th level, you summon three times as many demons.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "create-food-and-water",
        "level": 3,
        "name": "Create Food and Water",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You create 45 pounds of food and 30 gallons of fresh water on the ground or in containers within range-both useful in fending off the hazards of malnutrition and dehydration. The food is bland but nourishing and looks like a food of your choice, and the water is clean. The food spoils after 24 hours if uneaten.",
        "source": "SRD 5.2"
    },
    {
        "id": "crusaders-mantle",
        "level": 3,
        "name": "Crusader's Mantle",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "paladin"
        ],
        "description": "Holy power radiates from you in an aura with a 30-foot radius, awakening boldness in friendly creatures. Until the spell ends, the aura moves with you, centered on you. While in the aura, each nonhostile creature in the aura (including you) deals an extra 1d4 radiant damage when it hits with a weapon attack."
    },
    {
        "id": "daylight",
        "level": 3,
        "name": "Daylight",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "sorcerer"
        ],
        "description": "For the duration, sunlight spreads from a point within range and fills a 60-foot-radius Sphere. The sunlight's area is Bright Light and sheds Dim Light for an additional 60 feet.\nAlternatively, you cast the spell on an object that isn't being worn or carried, causing the sunlight to fill a 60-foot Emanation originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the sunlight.\nIf any of this spell's area overlaps with an area of Darkness created by a spell of level 3 or lower, that other spell is dispelled.",
        "source": "SRD 5.2"
    },
    {
        "id": "dispel-magic",
        "level": 3,
        "name": "Dispel Magic",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability (DC 10 plus that spell's level). On a successful check, the spell ends.\nUsing a Higher-Level Spell Slot. You automatically end a spell on the target if the spell's level is equal to or less than the level of the spell slot you use.",
        "source": "SRD 5.2"
    },
    {
        "id": "elemental-weapon",
        "level": 3,
        "name": "Elemental Weapon",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 Hour",
        "classes": [
            "druid",
            "paladin",
            "artificer"
        ],
        "description": "A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: acid, cold, fire, lightning, or thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra 1d4 damage of the chosen type when it hits.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th or 6th level, the bonus to attack rolls increases to +2 and the extra damage increases to 2d4. When you use a spell slot of 7th level or higher, the bonus increases to +3 and the extra damage increases to 3d4."
    },
    {
        "id": "enemies-abound",
        "level": 3,
        "name": "Enemies Abound",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You reach into the mind of one creature you can see and force it to make an Intelligence saving throw. A creature automatically succeeds if it is immune to being frightened. On a failed save, the target loses the ability to distinguish friend from foe, regarding all creatures it can see as enemies until the spell ends. Each time the target takes damage, it can repeat the saving throw, ending the effect on itself on a success.\nWhenever the affected creature chooses another creature as a target, it must choose the target at random from among the creatures it can see within range of the attack, spell, or other ability it’s using. If an enemy provokes an opportunity attack from the affected creature, the creature must make that attack if it is able to."
    },
    {
        "id": "erupting-earth",
        "level": 3,
        "name": "Erupting Earth",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a piece of obsidian)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Choose a point you can see on the ground within range. A fountain of churned earth and stone erupts in a 20-foot cube centered on that point. Each creature in that area must make a Dexterity saving throw. A creature takes 3d12 bludgeoning damage on a failed save, or half as much damage on a successful one. Additionally, the ground in that area becomes difficult terrain until cleared. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand."
    },
    {
        "id": "fast-friends",
        "level": 3,
        "name": "Fast Friends",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "When you need to make sure something gets done, you can’t rely on vague promises, sworn oaths, or binding contracts of employment. When you cast this spell, choose one humanoid within range that can see and hear you, and that isn’t currently hostile to you. The target must make a Wisdom saving throw. On a failed save, the target is charmed by you for the duration. While charmed, the target tries to be a fast friend to you and your allies.\nWhen you finish casting this spell, and again on each of your turns as a bonus action, you can make a request of the creature as long as you and the creature share a language. The request must be simple and reasonable, and it can’t request the creature to hurt itself or others. The creature performs the action to the best of its ability and can’t do anything else that turn. If you issue no command, the creature takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "fear",
        "level": 3,
        "name": "Fear",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a white feather)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Each creature in a 30-foot Cone must succeed on a Wisdom saving throw or drop whatever it is holding and have the Frightened condition for the duration.\nA Frightened creature takes the Dash action and moves away from you by the safest route on each of its turns unless there is nowhere to move. If the creature ends its turn in a space where it doesn't have line of sight to you, the creature makes a Wisdom saving throw. On a successful save, the spell ends on that creature.",
        "source": "SRD 5.2"
    },
    {
        "id": "feign-death",
        "level": 3,
        "name": "Feign Death",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a pinch of graveyard dirt)",
        "duration": "1 hour",
        "ritual": true,
        "classes": [
            "bard",
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "You touch a willing creature and put it into a cataleptic state that is indistinguishable from death.\nFor the spell's duration, or until you use an action to touch the target and dismiss the spell, the target appears dead to all outward inspection and to spells used to determine the target's status. The target is blinded and incapacitated, and its speed is 0. The target has resistance to all damage except psychic damage. If the target is diseased or poisoned when you cast the spell, or becomes diseased or poisoned while under the spell's effect, the disease and poison have no effect until the spell ends."
    },
    {
        "id": "fireball",
        "level": 3,
        "name": "Fireball",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a ball of bat guano and sulfur)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A bright streak flashes from you to a point you choose within range and then blossoms with a low roar into a fiery explosion. Each creature in a 20-foot-radius Sphere centered on that point makes a Dexterity saving throw, taking 8d6 Fire damage on a failed save or half as much damage on a successful one.\nFlammable objects in the area that aren't being worn or carried start burning.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "flame-arrows",
        "level": 3,
        "name": "Flame Arrows",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard",
            "artificer"
        ],
        "description": "You touch a quiver containing arrows or bolts. When a target is hit by a ranged weapon attack using a piece of ammunition drawn from the quiver, the target takes an extra 1d6 fire damage. The spell’s magic ends on the piece of ammunition when it hits or misses, and the spell ends when twelve pieces of ammunition have been drawn from the quiver."
    },
    {
        "id": "flame-stride-ua",
        "level": 3,
        "name": "Flame Stride (UA)",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "artificer",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "The billowing flames of a dragon blast from your feet, granting you explosive speed. For the duration, your speed increases by 20 feet and moving doesn't provoke opportunity attacks.\nWhen you move within 5 feet of a creature or an object that isn't being worn or carried, it takes 1d6 fire damage. A creature or object can take this damage only once during a turn.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "fly",
        "level": 3,
        "name": "Fly",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a feather)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You touch a willing creature. For the duration, the target gains a Fly Speed of 60 feet and can hover. When the spell ends, the target falls if it is still aloft unless it can stop the fall.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "galders-tower",
        "level": 3,
        "name": "Galder's Tower",
        "school": "Conjuration",
        "castingTime": "10 minutes",
        "range": "30 feet",
        "components": "V, S, M (a fragment of stone, wood, or other building material)",
        "duration": "24 hours",
        "classes": [
            "wizard"
        ],
        "description": "You conjure a two-story tower made of stone, wood, or other stable material. The tower can be any shape you choose. The tower has 100 hit points, AC 15, and immunity to poison and psychic damage. The tower is furnished and decorated as you choose, and it contains sufficient food to serve a nine-course banquet for up to 12 people. The tower has a small staff of spectral servants. You can conjure a new tower to replace an old one, or you can renew the duration of an existing tower by casting this spell again."
    },
    {
        "id": "gaseous-form",
        "level": 3,
        "name": "Gaseous Form",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a bit of gauze)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A willing creature you touch shape-shifts, along with everything it's wearing and carrying, into a misty cloud for the duration. The spell ends on the target if it drops to 0 Hit Points or if it takes a Magic action to end the spell on itself.\nWhile in this form, the target's only method of movement is a Fly Speed of 10 feet, and it can hover. The target can enter and occupy the space of another creature. The target has Resistance to Bludgeoning, Piercing, and Slashing damage; it has Immunity to the Prone condition; and it has Advantage on Strength, Dexterity, and Constitution saving throws. The target can pass through narrow openings, but it treats liquids as though they were solid surfaces.\nThe target can't talk or manipulate objects, and any objects it was carrying or holding can't be dropped, used, or otherwise interacted with. Finally, the target can't attack or cast spells.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "glyph-of-warding",
        "level": 3,
        "name": "Glyph of Warding",
        "school": "Abjuration",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (powdered diamond worth 200+ GP, which the spell consumes)",
        "duration": "Until dispelled or triggered",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "You inscribe a glyph that later unleashes a magical effect. You inscribe it either on a surface (such as a table or a section of floor) or within an object that can be closed (such as a book or chest) to conceal the glyph. The glyph can cover an area no larger than 10 feet in diameter. If the surface or object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.\nThe glyph is nearly imperceptible and requires a successful Wisdom (Perception) check against your spell save DC to notice.\nWhen you inscribe the glyph, you set its trigger and choose whether it's an explosive rune or a spell glyph, as explained below.\nSet the Trigger. You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph. Once a glyph is triggered, this spell ends.\nYou can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password.\nExplosive Rune. When triggered, the glyph erupts with magical energy in a 20-foot-radius Sphere centered on the glyph. Each creature in the area makes a Dexterity saving throw. A creature takes 5d8 Acid, Cold, Fire, Lightning, or Thunder damage (your choice when you create the glyph) on a failed save or half as much damage on a successful one.\nSpell Glyph. You can store a prepared spell of level 3 or lower in the glyph by casting it as part of creating the glyph. The spell must target a single creature or an area. The spell being stored has no immediate effect when cast in this way.\nWhen the glyph is triggered, the stored spell takes effect. If the spell has a target, it targets the creature that triggered the glyph. If the spell affects an area, the area is centered on that creature. If the spell summons Hostile creatures or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires Concentration, it lasts until the end of its full duration.\nUsing a Higher-Level Spell Slot. The damage of an explosive rune increases by 1d8 for each spell slot level above 3. If you create a spell glyph, you can store any spell of up to the same level as the spell slot you use for the Glyph of Warding.",
        "source": "SRD 5.2"
    },
    {
        "id": "haste",
        "level": 3,
        "name": "Haste",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a shaving of licorice root)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Choose a willing creature that you can see within range. Until the spell ends, the target's Speed is doubled, it gains a +2 bonus to Armor Class, it has Advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used to take only the Attack (one attack only), Dash, Disengage, Hide, or Utilize action.\nWhen the spell ends, the target is Incapacitated and has a Speed of 0 until the end of its next turn, as a wave of lethargy washes over it.",
        "source": "SRD 5.2"
    },
    {
        "id": "haywire-ua",
        "level": 3,
        "name": "Haywire (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "This spell creates a chaotic pattern of energy that plays havoc with electronic devices within a 40-foot cube centered on a point you choose within range. The area is heavily obscured to electronic sensors, and electronic devices in the area function erratically.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "house-of-cards-ua",
        "level": 3,
        "name": "House of Cards (UA)",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (a deck of playing cards, which the spell consumes)",
        "duration": "24 hours",
        "classes": [
            "artificer",
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You touch the ground and scatter a deck of cards. The cards sprout to form a defensive structure that is up to 30 feet high and a 30-foot square. The structure’s walls are made of large, sturdy playing cards. The walls have AC 15 and 30 hit points per 10-foot section. The structure disappears when the spell ends or if it is reduced to 0 hit points.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "hunger-of-hadar",
        "level": 3,
        "name": "Hunger Of Hadar",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a pickled octopus tentacle)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock"
        ],
        "description": "You open a gateway to the dark between the stars, a region infested with unknown horrors. A 20-foot-radius sphere of blackness and bitter cold appears, centered on a point with range and lasting for the duration. This void is filled with a cacophony of soft whispers and slurping noises that can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures fully within the area are blinded.\nThe void creates a warp in the fabric of space, and the area is difficult terrain. Any creature that starts its turn in the area takes 2d6 cold damage. Any creature that ends its turn in the area must succeed on a Dexterity saving throw or take 2d6 acid damage as milky, otherworldly tentacles rub against it."
    },
    {
        "id": "hypnotic-pattern",
        "level": 3,
        "name": "Hypnotic Pattern",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "S, M (a pinch of confetti)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create a twisting pattern of colors in a 30-foot Cube within range. The pattern appears for a moment and vanishes. Each creature in the area who can see the pattern must succeed on a Wisdom saving throw or have the Charmed condition for the duration. While Charmed, the creature has the Incapacitated condition and a Speed of 0.\nThe spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor.",
        "source": "SRD 5.2"
    },
    {
        "id": "incite-greed",
        "level": 3,
        "name": "Incite Greed",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a gem worth at least 50 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "warlock",
            "wizard"
        ],
        "description": "When you cast this spell, you present a gem to the creatures within range. Each creature in a 30-foot radius centered on you must succeed on a Wisdom saving throw or become charmed by you for the duration. While charmed by you, the creature is incapacitated and can do nothing but use its movement to move toward you in a safe manner. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
    },
    {
        "id": "intellect-fortress",
        "level": 3,
        "name": "Intellect Fortress",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "For the duration, you or one willing creature you can see within range has resistance to psychic damage, as well as advantage on Intelligence, Wisdom, and Charisma saving throws.\n\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, you can target one additional creature for each slot level above 3rd. The creatures must be within 30 feet of each other when you target them."
    },
    {
        "id": "invisibility-to-cameras-ua",
        "level": 3,
        "name": "Invisibility To Cameras (UA)",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S, M (a scrap of black paper)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "Four creatures of your choice within range become invisible to any form of electronic sensor or camera for the duration. Anything the targets are wearing or carrying is also invisible to such sensors.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "leomunds-tiny-hut",
        "level": 3,
        "name": "Leomund's Tiny Hut",
        "school": "Evocation",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M (a crystal bead)",
        "duration": "8 hours",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "A 10-foot Emanation springs into existence around you and remains stationary for the duration. The spell fails when you cast it if the Emanation isn't big enough to fully encapsulate all creatures in its area.\nCreatures and objects within the Emanation when you cast the spell can move through it freely. All other creatures and objects are barred from passing through it. Spells of level 3 or lower can't be cast through it, and the effects of such spells can't extend into it.\nThe atmosphere inside the Emanation is comfortable and dry, regardless of the weather outside. Until the spell ends, you can command the interior to have Dim Light or Darkness (no action required). The Emanation is opaque from the outside and of any color you choose, but it's transparent from the inside.\nThe spell ends early if you leave the Emanation or if you cast it again.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "life-transference",
        "level": 3,
        "name": "Life Transference",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "wizard"
        ],
        "description": "You sacrifice some of your health to mend another creature’s injuries. You take 4d8 necrotic damage, and one creature of your choice that you can see within range regains a number of hit points equal to twice the necrotic damage you take."
    },
    {
        "id": "lightning-arrow",
        "level": 3,
        "name": "Lightning Arrow",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "ranger"
        ],
        "description": "The next time you make a ranged weapon attack during the spell’s duration, the weapon’s ammunition, or the weapon itself if it’s a thrown weapon, transforms into a bolt of lightning. Make the attack roll as normal. The target takes 4d8 lightning damage on a hit, or half as much damage on a miss, instead of the weapon’s normal damage.\nWhether you hit or miss, each creature within 10 feet of the target must make a Dexterity saving throw. Each of these creatures takes 2d8 lightning damage on a failed save, or half as much damage on a successful one.\nThe piece of ammunition or weapon then returns to its normal form."
    },
    {
        "id": "lightning-bolt",
        "level": 3,
        "name": "Lightning Bolt",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a bit of fur and a crystal rod)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A stroke of lightning forming a 100-foot-long, 5-foot-wide Line blasts out from you in a direction you choose. Each creature in the Line makes a Dexterity saving throw, taking 8d6 Lightning damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "magic-circle",
        "level": 3,
        "name": "Magic Circle",
        "school": "Abjuration",
        "castingTime": "1 minute",
        "range": "10 feet",
        "components": "V, S, M (salt and powdered silver worth 100+ GP, which the spell consumes)",
        "duration": "1 hour",
        "classes": [
            "cleric",
            "paladin",
            "warlock",
            "wizard"
        ],
        "description": "You create a 10-foot-radius, 20-foot-tall Cylinder of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the Cylinder intersects with the floor or other surface.\nChoose one or more of the following types of creatures: Celestials, Elementals, Fey, Fiends, or Undead. The circle affects a creature of the chosen type in the following ways: • The creature can't willingly enter the Cylinder by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw. • The creature has Disadvantage on attack rolls against targets within the Cylinder. • Targets within the Cylinder can't be possessed by or gain the Charmed or Frightened condition from the creature.\nEach time you cast this spell, you can cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the Cylinder and protecting targets outside it.\nUsing a Higher-Level Spell Slot. The duration increases by 1 hour for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "major-image",
        "level": 3,
        "name": "Major Image",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a bit of fleece)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot Cube. The image appears at a spot that you can see within range and lasts for the duration. It seems real, including sounds, smells, and temperature appropriate to the thing depicted, but it can't deal damage or cause conditions.\nIf you are within range of the illusion, you can take a Magic action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.\nPhysical interaction with the image reveals it to be an illusion, for things can pass through it. A creature that takes a Study action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature.\nUsing a Higher-Level Spell Slot. The spell lasts until dispelled, without requiring Concentration, if cast with a level 4+ spell slot.",
        "source": "SRD 5.2"
    },
    {
        "id": "mass-healing-word",
        "level": 3,
        "name": "Mass Healing Word",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "Up to six creatures of your choice that you can see within range regain Hit Points equal to 2d4 plus your spellcasting ability modifier.\nUsing a Higher-Level Spell Slot. The healing increases by 1d4 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "meld-into-stone",
        "level": 3,
        "name": "Meld into Stone",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "cleric",
            "druid",
            "ranger"
        ],
        "description": "You step into a stone object or surface large enough to fully contain your body, merging yourself and your equipment with the stone for the duration. You must touch the stone to do so. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.\nWhile merged with the stone, you can't see what occurs outside it, and any Wisdom (Perception) checks you make to hear sounds outside it are made with Disadvantage. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use 5 feet of movement to leave the stone where you entered it, which ends the spell. You otherwise can't move.\nMinor physical damage to the stone doesn't harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals 6d6 Force damage to you. The stone's complete destruction (or transmutation into a different substance) expels you and deals 50 Force damage to you. If expelled, you move into an unoccupied space closest to where you first entered and have the Prone condition.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "melfs-minute-meteors",
        "level": 3,
        "name": "Melf's Minute Meteors",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (niter, sulfur, and pine tar formed into a bead)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create six tiny meteors in your space. They float in the air and orbit you for the spell's duration. When you cast the spell—and as a bonus action on each of your subsequent turns—you can expend one or two of the meteors, sending them streaking toward a point or points you choose within 120 feet of you. Once a meteor reaches its destination or impacts against a solid surface, the meteor explodes. Each creature within 5 feet of the point where the meteor explodes must make a Dexterity saving throw. A creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one."
    },
    {
        "id": "motivational-speech",
        "level": 3,
        "name": "Motivational Speech",
        "school": "Enchantment",
        "castingTime": "1 minute",
        "range": "60 feet",
        "components": "V",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "You address a group of creatures, delivering an inspiring speech. Choose up to five creatures within range that can hear you. For the duration, each target gains 5 temporary hit points and has advantage on Wisdom saving throws. If a target is hit with an attack, it has advantage on the next attack roll it makes. Once a target loses these temporary hit points, the spell ends for that creature."
    },
    {
        "id": "nondetection",
        "level": 3,
        "name": "Nondetection",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a pinch of diamond dust worth, 25+ GP, which the spell consumes)",
        "duration": "8 hours",
        "classes": [
            "bard",
            "ranger",
            "wizard"
        ],
        "description": "For the duration, you hide a target that you touch from Divination spells. The target can be a willing creature, or it can be a place or an object no larger than 10 feet in any dimension. The target can't be targeted by any Divination spell or perceived through magical scrying sensors.",
        "source": "SRD 5.2"
    },
    {
        "id": "phantom-steed",
        "level": 3,
        "name": "Phantom Steed",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "A Large, quasi-real, horselike creature appears on the ground in an unoccupied space of your choice within range. You decide the creature's appearance, and it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 10 feet away from the steed.\nFor the duration, you or a creature you choose can ride the steed. The steed uses the Riding Horse stat block (see \"Monsters\"), except it has a Speed of 100 feet and can travel 13 miles in an hour. When the spell ends, the steed gradually fades, giving the rider 1 minute to dismount. The spell ends early if the steed takes any damage.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "plant-growth",
        "level": 3,
        "name": "Plant Growth",
        "school": "Transmutation",
        "castingTime": "1 action (Overgrowth) or 8 hours (Enrichment)",
        "range": "150 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "ranger"
        ],
        "description": "This spell channels vitality into plants. The casting time you use determines whether the spell has the Overgrowth or the Enrichment effect below.\nOvergrowth. Choose a point within range. All normal plants in a 100-foot-radius Sphere centered on that point become thick and overgrown. A creature moving through that area must spend 4 feet of movement for every 1 foot it moves. You can exclude one or more areas of any size within the spell's area from being affected.\nEnrichment. All plants in a half-mile radius centered on a point within range become enriched for 365 days. The plants yield twice the normal amount of food when harvested. They can benefit from only one Plant Growth per year.",
        "source": "SRD 5.2"
    },
    {
        "id": "protection-from-ballistics-ua",
        "level": 3,
        "name": "Protection from Ballistics (UA)",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a piece of shell casing)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "artificer",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "This spell enchants the flesh of a willing creature you touch, making it resistant to ballistic damage. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage from ranged weapons.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "protection-from-energy",
        "level": 3,
        "name": "Protection from Energy",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "cleric",
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "For the duration, the willing creature you touch has Resistance to one damage type of your choice: Acid, Cold, Fire, Lightning, or Thunder.",
        "source": "SRD 5.2"
    },
    {
        "id": "psionic-blast-ua",
        "level": 3,
        "name": "Psionic Blast (UA)",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot cone)",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You unleash a destructive wave of mental power in a 30-foot cone. Each creature in the area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 force damage and is pushed 20 feet away from you and knocked prone. On a successful save, it takes half as much damage and isn't pushed or knocked prone.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "pulse-wave",
        "level": 3,
        "name": "Pulse Wave",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot cone)",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You create a burst of telekinetic force that ripples outward from you in a 30-foot cone. Each creature in the area must make a Constitution saving throw. On a failed save, a creature takes 6d6 force damage and is knocked prone. On a successful save, the creature takes half as much damage and isn’t knocked prone."
    },
    {
        "id": "remove-curse",
        "level": 3,
        "name": "Remove Curse",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "paladin",
            "warlock",
            "wizard"
        ],
        "description": "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's Attunement to the object so it can be removed or discarded.",
        "source": "SRD 5.2"
    },
    {
        "id": "revivify",
        "level": 3,
        "name": "Revivify",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a diamond worth 300+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "You touch a creature that has died within the last minute. That creature revives with 1 Hit Point. This spell can't revive a creature that has died of old age, nor does it restore any missing body parts.",
        "source": "SRD 5.2"
    },
    {
        "id": "sending",
        "level": 3,
        "name": "Sending",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Unlimited",
        "components": "V, S, M (a copper wire)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "You send a short message of 25 words or fewer to a creature you have met or a creature described to you by someone who has met it. The target hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables targets to understand the meaning of your message.\nYou can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn't arrive. You know if the delivery fails.\nUpon receiving your message, a creature can block your ability to reach it again with this spell for 8 hours. If you try to send another message during that time, you learn that you are blocked, and the spell fails.",
        "source": "SRD 5.2"
    },
    {
        "id": "sleet-storm",
        "level": 3,
        "name": "Sleet Storm",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a miniature umbrella)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Until the spell ends, sleet falls in a 40-foot-tall, 20-foot-radius Cylinder centered on a point you choose within range. The area is Heavily Obscured, and exposed flames in the area are doused.\nGround in the Cylinder is Difficult Terrain. When a creature enters the Cylinder for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the Prone condition and lose Concentration.",
        "source": "SRD 5.2"
    },
    {
        "id": "slow",
        "level": 3,
        "name": "Slow",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a drop of molasses)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You alter time around up to six creatures of your choice in a 40-foot Cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration.\nAn affected target's Speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't take Reactions. On its turns, it can take either an action or a Bonus Action, not both, and it can make only one attack if it takes the Attack action. If it casts a spell with a Somatic component, there is a 25 percent chance the spell fails as a result of the target making the spell's gestures too slowly.\nAn affected target repeats the save at the end of each of its turns, ending the spell on itself on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "speak-with-dead",
        "level": 3,
        "name": "Speak with Dead",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S, M (burning incense)",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "You grant the semblance of life to a corpse of your choice within range, allowing it to answer questions you pose. The corpse must have a mouth, and this spell fails if the deceased creature was Undead when it died. The spell also fails if the corpse was the target of this spell within the past 10 days.\nUntil the spell ends, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are antagonistic toward it or it recognizes you as an enemy. This spell doesn't return the creature's soul to its body, only its animating spirit. Thus, the corpse can't learn new information, doesn't comprehend anything that has happened since it died, and can't speculate about future events.",
        "source": "SRD 5.2"
    },
    {
        "id": "speak-with-plants",
        "level": 3,
        "name": "Speak with Plants",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "druid",
            "ranger"
        ],
        "description": "You imbue plants in an immobile 30-foot Emanation with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances.\nYou can also turn Difficult Terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into Difficult Terrain that lasts for the duration.\nThe spell doesn't enable plants to uproot themselves and move about, but they can move their branches, tendrils, and stalks for you.\nIf a Plant creature is in the area, you can communicate with it as if you shared a common language.",
        "source": "SRD 5.2"
    },
    {
        "id": "spirit-guardians",
        "level": 3,
        "name": "Spirit Guardians",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a prayer scroll)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric"
        ],
        "description": "Protective spirits flit around you in a 15-foot Emanation for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice). If you are evil, they appear fiendish.\nWhen you cast this spell, you can designate creatures to be unaffected by it. Any other creature's Speed is halved in the Emanation, and whenever the Emanation enters a creature's space and whenever a creature enters the Emanation or ends its turn there, the creature must make a Wisdom saving throw. On a failed save, the creature takes 3d8 Radiant damage (if you are good or neutral) or 3d8 Necrotic damage (if you are evil). On a successful save, the creature takes half as much damage. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "spirit-shroud",
        "level": 3,
        "name": "Spirit Shroud",
        "school": "Necromancy",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "paladin",
            "warlock",
            "wizard"
        ],
        "description": "You call forth spirits of the dead, which flit around you for the spell’s duration. The spirits are intangible and invulnerable.\nUntil the spell ends, any attack you make deals 1d8 extra damage when you hit a creature within 10 feet of you. This damage is radiant, necrotic, or cold (your choice when you cast the spell). Any creature that takes this damage can't regain hit points until the start of your next turn.\nIn addition, any creature of your choice that you can see that starts its turn within 10 feet of you has its speed reduced by 10 feet until the start of your next turn.\n\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d8 for each two slot levels above 3rd."
    },
    {
        "id": "stinking-cloud",
        "level": 3,
        "name": "Stinking Cloud",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a rotten egg)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You create a 20-foot-radius Sphere of yellow, nauseating gas centered on a point within range. The cloud is Heavily Obscured. The cloud lingers in the air for the duration or until a strong wind (such as the one created by Gust of Wind) disperses it.\nEach creature that starts its turn in the Sphere must succeed on a Constitution saving throw or have the Poisoned condition until the end of the current turn. While Poisoned in this way, the creature can't take an action or a Bonus Action.",
        "source": "SRD 5.2"
    },
    {
        "id": "summon-fey",
        "level": 3,
        "name": "Summon Fey",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a gilded flower worth at least 300 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "warlock",
            "wizard"
        ],
        "description": "You call forth a fey spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Fey Spirit stat block. When you cast the spell, choose a mood: Fuming, Mirthful, or Tricksy. The creature resembles a fey creature of your choice marked by the chosen mood, which determines one of the traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "summon-lesser-demons",
        "level": 3,
        "name": "Summon Lesser Demons",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You summon up to eight manes or dretches that appear in unoccupied spaces you can see within range. A manes or dretch disappears when it drops to 0 hit points or when the spell ends.\nThe demons are hostile to all creatures, including you. Roll initiative for the summoned demons as a group, which has its own turns. The demons pursue and attack the nearest non-demons to the best of their ability.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th or 7th level, you summon twice as many demons. If you cast it using a spell slot of 8th or 9th level, you summon three times as many demons."
    },
    {
        "id": "summon-shadowspawn",
        "level": 3,
        "name": "Summon Shadowspawn",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (tears inside a gem worth at least 300 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You call forth a shadow spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Shadow Spirit stat block. When you cast the spell, choose an emotion: Fury, Despair, or Fear. The creature resembles a misshapen biped marked by the chosen emotion, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "summon-undead",
        "level": 3,
        "name": "Summon Undead",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a gilded skull worth at least 300 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You call forth an undead spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Undead Spirit stat block. When you cast the spell, choose the creature’s form: Ghostly, Putrid, or Skeletal. The spirit resembles an undead creature with the chosen form, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "summon-warrior-spirit-ua",
        "level": 3,
        "name": "Summon Warrior Spirit (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a weapon or shield worth at least 400 sp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You call forth a martial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Warrior Spirit stat block. When you cast the spell, choose a weapon: Barbarian, Fighter, or Monk. The warrior resembles a humanoid armed with the chosen weapon, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "thunder-step",
        "level": 3,
        "name": "Thunder Step",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You teleport yourself to an unoccupied space you can see within range. Immediately after you disappear, a thunderous boom sounds, and each creature within 10 feet of the space you left must make a Constitution saving throw, taking 3d10 thunder damage on a failed save, or half as much damage on a successful one. The thunder can be heard from up to 300 feet away.\nYou can bring along objects as long as their weight doesn't exceed what you can carry. You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell, and there must be an unoccupied space within 5 feet of your destination space for the creature to appear in; otherwise, the creature is left behind."
    },
    {
        "id": "tidal-wave",
        "level": 3,
        "name": "Tidal Wave",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a drop of water)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You conjure up a wave of water that crashes down on an area within range. The area can be up to 30 feet long, up to 10 feet wide, and up to 10 feet tall. Each creature in that area must make a Dexterity saving throw. On a failed save, a creature takes 4d8 bludgeoning damage and is knocked prone. On a successful save, a creature takes half as much damage and isn't knocked prone. The water then spreads out across the ground in all directions, extinguishing unprotected flames in its area and within 30 feet of it, and then it vanishes."
    },
    {
        "id": "tiny-servant",
        "level": 3,
        "name": "Tiny Servant",
        "school": "Transmutation",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "wizard",
            "artificer"
        ],
        "description": "You touch one Tiny, nonmagical object that isn't attached to another object or a surface and isn't being carried by another creature. The target animates and sprouts little arms and legs, becoming a creature under your control until the spell ends or the creature drops to 0 hit points. See the stat block for its statistics.\nAs a bonus action, you can mentally command the creature if it is within 120 feet of you. (If you control multiple creatures with this spell, you can command any or all of them at the same time, issuing the same command to each one.) You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.\n\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, you can animate two additional objects for each slot level above 3rd."
    },
    {
        "id": "tongues",
        "level": 3,
        "name": "Tongues",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, M (a miniature ziggurat)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "This spell grants the creature you touch the ability to understand any spoken or signed language that it hears or sees. Moreover, when the target communicates by speaking or signing, any creature that knows at least one language can understand it if that creature can hear the speech or see the signing.",
        "source": "SRD 5.2"
    },
    {
        "id": "vampiric-touch",
        "level": 3,
        "name": "Vampiric Touch",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a melee spell attack against one creature within reach. On a hit, the target takes 3d6 Necrotic damage, and you regain Hit Points equal to half the amount of Necrotic damage dealt.\nUntil the spell ends, you can make the attack again on each of your turns as a Magic action, targeting the same creature or a different one.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 3.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-sand",
        "level": 3,
        "name": "Wall of Sand",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a handful of sand)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "You conjure a wall of swirling sand on the ground at a point you can see within range. You can make the wall up to 30 feet long, 10 feet high, and 10 feet thick, and it vanishes when the spell ends. It blocks line of sight but not movement. A creature is blinded while in the wall’s space and must spend 3 feet of movement for every 1 foot it moves there."
    },
    {
        "id": "wall-of-water",
        "level": 3,
        "name": "Wall of Water",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a drop of water)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You conjure up a wall of water on the ground at a point you can see within range. You can make the wall up to 30 feet long, 10 feet high, and 1 foot thick, or you can make a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall vanishes when the spell ends. The wall’s space is difficult terrain.\nAny ranged weapon attack that enters the wall’s space has disadvantage on the attack roll, and fire damage is halved if the fire effect passes through the wall to reach its target. Spells that deal cold damage that pass through the wall cause the area of the wall they pass through to freeze solid (at least a 5-foot-square section is frozen). Each 5-foot-square frozen section has AC 5 and 15 hit points. Reducing a frozen section to 0 hit points destroys it. When a section is destroyed, the wall’s water doesn’t fill it."
    },
    {
        "id": "water-breathing",
        "level": 3,
        "name": "Water Breathing",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a short reed)",
        "duration": "24 hours",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "This spell grants up to ten willing creatures of your choice within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "water-walk",
        "level": 3,
        "name": "Water Walk",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a piece of cork)",
        "duration": "1 hour",
        "classes": [
            "cleric",
            "druid",
            "ranger",
            "sorcerer"
        ],
        "description": "This spell grants the ability to move across any liquid surface-such as water, acid, mud, snow, quicksand, or lava-as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures of your choice within range gain this ability for the duration.\nAn affected target must take a Bonus Action to pass from the liquid's surface into the liquid itself and vice versa, but if the target falls into the liquid, the target passes through the surface into the liquid below.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "wind-wall",
        "level": 3,
        "name": "Wind Wall",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a fan and a feather)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration.\nWhen the wall appears, each creature in its area makes a Strength saving throw, taking 4d8 Bludgeoning damage on a failed save or half as much damage on a successful one.\nThe strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and miss automatically. Boulders hurled by Giants or siege engines, and similar projectiles, are unaffected. Creatures in gaseous form can't pass through it.",
        "source": "SRD 5.2"
    },
    {
        "id": "counterspell",
        "level": 3,
        "name": "Counterspell",
        "school": "Abjuration",
        "castingTime": "1 reaction, which you take when you see a creature within 60 feet of yourself casting a spell with Verbal, Somatic, or Material components",
        "range": "60 feet",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You attempt to interrupt a creature in the process of casting a spell. The creature makes a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, Bonus Action, or Reaction used to cast it is wasted. If that spell was cast with a spell slot, the slot isn't expended.",
        "source": "SRD 5.2"
    },
    {
        "id": "arcane-eye",
        "level": 4,
        "name": "Arcane Eye",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a bit of bat fur)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "wizard"
        ],
        "description": "You create an Invisible, invulnerable eye within range that hovers for the duration. You mentally receive visual information from the eye, which can see in every direction. It also has Darkvision with a range of 30 feet.\nAs a Bonus Action, you can move the eye up to 30 feet in any direction. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter.",
        "source": "SRD 5.2"
    },
    {
        "id": "aura-of-life",
        "level": 4,
        "name": "Aura of Life",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "An aura radiates from you in a 30-foot Emanation for the duration. While in the aura, you and your allies have Resistance to Necrotic damage, and your Hit Point maximums can't be reduced. If an ally with 0 Hit Points starts its turn in the aura, that ally regains 1 Hit Point.",
        "source": "SRD 5.2"
    },
    {
        "id": "aura-of-purity",
        "level": 4,
        "name": "Aura of Purity",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self (30-foot radius)",
        "components": "V",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "paladin"
        ],
        "description": "Purifying energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. Each non-hostile creature in the aura (including you) can't become diseased, has resistance to poison damage, and has advantage on saving throws against effects that cause any of the following conditions: blinded, charmed, deafened, frightened, paralyzed, poisoned, and stunned."
    },
    {
        "id": "banishment",
        "level": 4,
        "name": "Banishment",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a pentacle)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "paladin",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "One creature that you can see within range must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the Incapacitated condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.\nIf the target is an Aberration, a Celestial, an Elemental, a Fey, or a Fiend, the target doesn't return if the spell lasts for 1 minute. The target is instead transported to a random location on a plane (GM's choice) associated with its creature type.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "blight",
        "level": 4,
        "name": "Blight",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A creature that you can see within range makes a Constitution saving throw, taking 8d8 Necrotic damage on a failed save or half as much damage on a successful one. A Plant creature automatically fails the save.\nAlternatively, target a nonmagical plant that isn't a creature, such as a tree or shrub. It doesn't make a save; it simply withers and dies.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "charm-monster",
        "level": 4,
        "name": "Charm Monster",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "One creature you can see within range makes a Wisdom saving throw. It does so with Advantage if you or your allies are fighting it. On a failed save, the target has the Charmed condition until the spell ends or until you or your allies damage it. The Charmed creature is Friendly to you. When the spell ends, the target knows it was Charmed by you.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "compulsion",
        "level": 4,
        "name": "Compulsion",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard"
        ],
        "description": "Each creature of your choice that you can see within range must succeed on a Wisdom saving throw or have the Charmed condition until the spell ends.\nFor the duration, you can take a Bonus Action to designate a direction that is horizontal to you. Each Charmed target must use as much of its movement as possible to move in that direction on its next turn, taking the safest route. After moving in this way, a target repeats the save, ending the spell on itself on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "confusion",
        "level": 4,
        "name": "Confusion",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (three nut shells)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Each creature in a 10-foot-radius Sphere centered on a point you choose within range must succeed on a Wisdom saving throw, or that target can't take Bonus Actions or Reactions and must roll 1d10 at the start of each of its turns to determine its behavior for that turn, consulting the table below. 1d10 Behavior for the Turn 2-6    The target doesn't move or take actions. 9-10  The target chooses its behavior.\nAt the end of each of its turns, an affected target repeats the save, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. The Sphere's radius increases by 5 feet for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-barlgura-ua",
        "level": 4,
        "name": "Conjure Barlgura (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You summon a barlgura that appears in an unoccupied space that you can see within range. The barlgura disappears when it drops to 0 hit points or when the spell ends.\nThe barlgura is hostile to all creatures, including you. Roll initiative for the barlgura, which has its own turns. It pursues and attacks the nearest non-demons to the best of its ability.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "conjure-knowbot-ua",
        "level": 4,
        "name": "Conjure Knowbot (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "artificer",
            "wizard"
        ],
        "description": "You touch a computing device and conjure a knowbot—a partially sentient piece of software—that embeds itself in the device. The knowbot is an intangible construct that can calculate, search, and retrieve data from the device at a rate 10 times faster than a humanoid user.\nWhen you cast the spell, you can ask the knowbot to perform a specific task, such as \"Find the file named 'Project Chimera'\" or \"Break the encryption code.\" The knowbot makes an Intelligence check with a +10 bonus to perform the task. On a success, it completes the task in 1d4 minutes.\nYou can also command the knowbot to attack another software entity within the same system. The knowbot uses your spell attack modifier for its attacks and deals 4d6 force damage on a hit.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "conjure-minor-elementals",
        "level": 4,
        "name": "Conjure Minor Elementals",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "wizard"
        ],
        "description": "You conjure spirits from the Elemental Planes that flit around you in a 15-foot Emanation for the duration. Until the spell ends, any attack you make deals an extra 2d8 damage when you hit a creature in the Emanation. This damage is Acid, Cold, Fire, or Lightning (your choice when you make the attack).\nIn addition, the ground in the Emanation is Difficult Terrain for your enemies.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-shadow-demon-ua",
        "level": 4,
        "name": "Conjure Shadow Demon (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You summon a shadow demon that appears in an unoccupied space you can see within range. The shadow demon disappears when it drops to 0 hit points or when the spell ends. The shadow demon is friendly to you and your companions. Roll initiative for the shadow demon to determine when it acts. It obeys your verbal commands (no action required by you). If you don't issue any commands to it, it defends itself from hostile creatures, but otherwise takes no actions.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "conjure-woodland-beings",
        "level": 4,
        "name": "Conjure Woodland Beings",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You conjure nature spirits that flit around you in a 10-foot Emanation for the duration. Whenever the Emanation enters the space of a creature you can see and whenever a creature you can see enters the Emanation or ends its turn there, you can force that creature to make a Wisdom saving throw. The creature takes 5d8 Force damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn.\nIn addition, you can take the Disengage action as a Bonus Action for the spell's duration.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "control-water",
        "level": 4,
        "name": "Control Water",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, S, M (a mixture of water and dust)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "Until the spell ends, you control any water inside an area you choose that is a Cube up to 100 feet on a side, using one of the following effects. As a Magic action on your later turns, you can repeat the same effect or choose a different one.\nFlood. You cause the water level of all standing water in the area to rise by as much as 20 feet. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a 25 percent chance of capsizing.\nThe water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts.\nPart Water. You part water in the area and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored. conditions to take effect. Once they do so, you can change the conditions again. When the spell ends, the weather gradually returns to normal.\nWhen you change the weather conditions, find a current condition on the following tables and change its stage by one, up or down. When changing the wind, you can change its direction. Precipitation Stage | Condition\n1 | Clear | 2 | Light clouds\n3 | Overcast or ground fog | 4 | Rain, hail, or snow\n5 | Torrential rain, driving hail, or blizzard\nRedirect Flow. You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell's area, it resumes its flow based on the terrain. The water continues to move in the direction you chose until the spell ends or you choose a different effect.\nWhirlpool. You cause a whirlpool to form in the center of the area, which must be at least 50 feet. Temperature Stage | Condition\n1 | Heat wave | 2 | Hot\n3 | Warm | 4 | Cool\n5 | Cold | 6 | Freezing Counterspell Wind Stage Condition\n10 | Calm | 2 | Moderate wind\n3 | Strong wind | 4 | Gale\n5 | Storm    square and 25 feet deep. The whirlpool lasts until you choose a different effect or the spell ends. The whirlpool is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature in the water and within 25 feet of the whirlpool is pulled 10 feet toward it. When a creature enters the whirlpool for the first time on a turn or ends its turn there, it makes a Strength saving throw. On a failed save, the creature takes 2d8 Bludgeoning damage. On a successful save, the creature takes half as much damage. A creature can swim away from the whirlpool only if it first takes an action to pull away and succeeds on a Strength (Athletics) check against your spell save DC.",
        "source": "SRD 5.2"
    },
    {
        "id": "death-ward",
        "level": 4,
        "name": "Death Ward",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 Hit Points before the spell ends, the target instead drops to 1 Hit Point, and the spell ends.\nIf the spell is still in effect when the target is subjected to an effect that would kill it instantly without dealing damage, that effect is negated against the target, and the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "dimension-door",
        "level": 4,
        "name": "Dimension Door",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "500 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You teleport to a location within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as \"200 feet straight downward\" or \"300 feet upward to the northwest at a 45-degree angle.\"\nYou can also teleport one willing creature. The creature must be within 5 feet of you when you teleport, and it teleports to a space within 5 feet of your destination space.\nIf you, the other creature, or both would arrive in a space occupied by a creature or completely filled by one or more objects, you and any creature traveling with you each take 4d6 Force damage, and the teleportation fails.",
        "source": "SRD 5.2"
    },
    {
        "id": "divination",
        "level": 4,
        "name": "Divination",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (incense worth 25+ GP, which the, spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "This spell puts you in contact with a god or a god's servants. You ask one question about a specific goal, event, or activity to occur within 7 days. The GM offers a truthful reply, which might be a short phrase or cryptic rhyme. The spell doesn't account for circumstances that might change the answer, such as the casting of other spells.\nIf you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "dominate-beast",
        "level": 4,
        "name": "Dominate Beast",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger",
            "sorcerer"
        ],
        "description": "One Beast you can see within range must succeed on a Wisdom saving throw or have the Charmed condition for the duration. The target has Advantage on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.\nYou have a telepathic link with the Charmed target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"Attack that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.\nYou can command the target to take a Reaction but must take your own Reaction to do so.\nUsing a Higher-Level Spell Slot. Your Concentration can last longer with a spell slot of level 5 (up to 10 minutes), 6 (up to 1 hour), or 7+ (up to 8 hours).",
        "source": "SRD 5.2"
    },
    {
        "id": "ego-whip-ua",
        "level": 4,
        "name": "Ego Whip (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You lash out at the mind of a creature you can see within range, filling it with despair. The target must succeed on an Intelligence saving throw or suffer disadvantage on attack rolls, ability checks, and saving throws, and it can't cast spells. At the end of each of its turns, the target can make another Intelligence saving throw. On a success, the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th. The creatures must be within 30 feet of each other when you target them.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "elemental-bane",
        "level": 4,
        "name": "Elemental Bane",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "warlock",
            "wizard",
            "artificer"
        ],
        "description": "Choose one creature you can see within range, and choose one of the following damage types: acid, cold, fire, lightning, or thunder. The target must succeed on a Constitution saving throw or be affected by the spell for its duration. The first time each turn the affected target takes damage of the chosen type, the target takes an extra 2d6 damage of that type. Moreover, the target loses any resistance to that damage type until the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th. The creatures must be within 30 feet of each other when you target them."
    },
    {
        "id": "evards-black-tentacles",
        "level": 4,
        "name": "Evard's Black Tentacles",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a tentacle)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in that area into Difficult Terrain.\nEach creature in that area makes a Strength saving throw. On a failed save, it takes 3d6 Bludgeoning damage, and it has the Restrained condition until the spell ends. A creature also makes that save if it enters the area or ends it turn there. A creature makes that save only once per turn.\nA Restrained creature can take an action to make a Strength (Athletics) check against your spell save DC, ending the condition on itself on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "fabricate",
        "level": 4,
        "name": "Fabricate",
        "school": "Transmutation",
        "castingTime": "10 minutes",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, or clothes from flax or wool.\nChoose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot Cube or eight connected 5-foot Cubes) given a sufficient quantity of material. If you're working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a 5-foot Cube). The quality of any fabricated objects is based on the quality of the raw materials.\nCreatures and magic items can't be created by this spell. You also can't use it to create items that require a high degree of skill-such as weapons and armor-unless you have proficiency with the type of Artisan's Tools used to craft such objects.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-greater-steed",
        "level": 4,
        "name": "Find Greater Steed",
        "school": "Conjuration",
        "castingTime": "10 minutes",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "You summon a spirit that assumes the form of a loyal, majestic mount. Appearing in an unoccupied space within range, the spirit takes on a form you choose: a griffon, a pegasus, a peryton, a dire wolf, a rhinoceros, or a saber-toothed tiger. The creature has the statistics provided in the Monster Manual for the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.\nYou control the mount in combat. While the mount is within 1 mile of you, you can communicate with it telepathically. While mounted on it, you can make any spell you cast that targets only you also target the mount.\nThe mount disappears temporarily when it drops to 0 hit points or when you dismiss it as an action. Casting this spell again re-summons the bonded mount, with all its hit points restored and any conditions removed.\nYou can't have more than one mount bonded by this spell or find steed at the same time. As an action, you can release a mount from its bond, causing it to disappear permanently."
    },
    {
        "id": "fire-shield",
        "level": 4,
        "name": "Fire Shield",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a bit of phosphorus or a firefly)",
        "duration": "10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Wispy flames wreathe your body for the duration, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.\nThe flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you Resistance to Cold damage, and the chill shield grants you Resistance to Fire damage.\nIn addition, whenever a creature within 5 feet of you hits you with a melee attack roll, the shield erupts with flame. The attacker takes 2d8 Fire damage from a warm shield or 2d8 Cold damage from a chill shield.",
        "source": "SRD 5.2"
    },
    {
        "id": "freedom-of-movement",
        "level": 4,
        "name": "Freedom of Movement",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a leather strap)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "ranger"
        ],
        "description": "You touch a willing creature. For the duration, the target's movement is unaffected by Difficult Terrain, and spells and other magical effects can neither reduce the target's Speed nor cause the target to have the Paralyzed or Restrained conditions. The target also has a Swim Speed equal to its Speed. In addition, the target can spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature imposing the Grappled condition on it.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "galders-speedy-courier",
        "level": 4,
        "name": "Galder's Speedy Courier",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S, M (25 gp worth of gold dust, which the spell consumes)",
        "duration": "10 minutes",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You summon a Small air elemental to a spot within range. The air elemental is formless, nearly transparent, and immune to all damage and conditions. It carries an open, empty chest. The chest holds up to 3 cubic feet of gear. You decide what the chest looks like.\nWhile the spell lasts, you can deposit as many items inside the chest as it will hold. You can then name a living creature you have met and seen at least once. The elemental and the chest vanish, then reappear within 5 feet of the target creature (if the creature is on the same plane of existence) or in the nearest unoccupied space. If the target is on a different plane, the elemental remains where it is, and the spell ends.\nWhen the elemental appears, the target creature becomes aware of the chest's contents. If the creature is willing, the chest opens, allowing the creature to remove the items. If the creature isn't willing, the chest remains closed. The elemental remains near the target for the duration or until the chest is emptied, at which point the spell ends and the elemental disappears."
    },
    {
        "id": "gate-seal",
        "level": 4,
        "name": "Gate Seal",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a broken portal key, which the spell consumes)",
        "duration": "24 hours",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You fortify the fabric of the planes in a 30-foot cube you can see within range. Within that area, portals close and can't be opened. Spells and other effects that allow planar travel or open portals, such as gate or plane shift, fail if used to enter or leave the area. The cube is stationary."
    },
    {
        "id": "giant-insect",
        "level": 4,
        "name": "Giant Insect",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid"
        ],
        "description": "You summon a giant centipede, spider, or wasp (chosen when you cast the spell). It manifests in an unoccupied space you can see within range and uses the Giant Insect stat block. The form you choose determines certain details in its stat block. The creature disappears when it drops to 0 Hit Points or when the spell ends.\nThe creature is an ally to you and your allies. In combat, the creature shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its movement to avoid danger.\nUsing a Higher-Level Spell Slot. Use the spell slot's level for the spell's level in the stat block. Large Beast, Unaligned AC 11 + the spell's level HP 30 + 10 for each spell level above 4 Speed 40 ft., Climb 40 ft., Fly 40 ft. (Wasp only) MOD SAVE    MOD SAVE    MOD SAVE Str 17 +3 +3 dex 13 +1 +1 con 15 +2 +2 int 4 -3 -3 WiS 14 +2 +2 chA 3 -4 -4 Senses Darkvision 60 ft.; Passive Perception 12 Languages Understands the languages you know CR None (XP 0; PB equals your Proficiency Bonus) Traits     Spider Climb. The insect can climb difficult surfaces, including along ceilings, without needing to make an ability check. Actions     Multiattack. The insect makes a number of attacks equal to half this spell's level (round down). Poison Jab. Melee Attack Roll: Bonus equals your spell attack modifier, reach 10 ft. Hit: 1d6 + 3 plus the spell's level Piercing damage plus 1d4 Poison damage. Web Bolt (Spider Only). Ranged Attack Roll: Bonus equals your spell attack modifier, range 60 ft. Hit: 1d10 + 3 plus the spell's level Bludgeoning damage, and the target's Speed is reduced to 0 until the start of the insect's next turn. Bonus Actions     Venomous Spew (Centipede Only). Constitution Saving Throw: Your spell save DC, one creature the insect can see within 10 feet. Failure: The target has the Poisoned condition until the start of the insect's next turn.",
        "source": "SRD 5.2"
    },
    {
        "id": "grasping-vine",
        "level": 4,
        "name": "Grasping Vine",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You conjure a vine that sprouts from the ground in an unoccupied space of your choice that you can see within range. When you cast this spell, you can direct the vine to lash out at a creature within 30 feet of it that you can see. That creature must succeed on a Dexterity saving throw or be pulled 20 feet directly toward the vine.\nUntil the spell ends, you can direct the vine to lash out at the same creature or another one as a bonus action on each of your turns."
    },
    {
        "id": "gravity-sinkhole",
        "level": 4,
        "name": "Gravity Sinkhole",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a black marble)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "A 20-foot-radius sphere of crushing force forms at a point you can see within range and tugs at the creatures there. Each creature in the sphere must make a Constitution saving throw. On a failed save, the creature takes 5d10 force damage and is pulled in a straight line toward the center of the sphere, ending in an unoccupied space as close to the center as possible (even if that space is in the air). On a successful save, the creature takes half as much damage and isn't pulled.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d10 for each slot level above 4th."
    },
    {
        "id": "greater-invisibility",
        "level": 4,
        "name": "Greater Invisibility",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "A creature you touch has the Invisible condition until the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "guardian-of-faith",
        "level": 4,
        "name": "Guardian of Faith",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "8 hours",
        "classes": [
            "cleric"
        ],
        "description": "A Large spectral guardian appears and hovers for the duration in an unoccupied space that you can see within range. The guardian occupies that space and is invulnerable, and it appears in a form appropriate for your deity or pantheon.\nAny enemy that moves to a space within 10 feet of the guardian for the first time on a turn or starts its turn there makes a Dexterity saving throw, taking 20 Radiant damage on a failed save or half as much damage on a successful one. The guardian vanishes when it has dealt a total of 60 damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "guardian-of-nature",
        "level": 4,
        "name": "Guardian of Nature",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "A nature spirit answers your call and transforms you into a powerful guardian. The transformation lasts until the spell ends. You choose one of the following forms to assume: Primal Beast or Great Tree.\n**Primal Beast.** Bestial fur covers your body, your facial features become feral, and you gain the following benefits:\n- Your walking speed increases by 10 feet.\n- You gain darkvision with a range of 120 feet.\n- You make Strength-based attack rolls with advantage.\n- Your melee weapon attacks deal an extra 1d6 force damage on a hit.\n**Great Tree.** Your skin appears barky, leaves sprout from your hair, and you gain the following benefits:\n- You gain 10 temporary hit points.\n- You make Constitution saving throws with advantage.\n- You make Dexterity- and Wisdom-based attack rolls with advantage.\n- While you are on the ground, the ground within 15 feet of you is difficult terrain for your enemies."
    },
    {
        "id": "hallucinatory-terrain",
        "level": 4,
        "name": "Hallucinatory Terrain",
        "school": "Illusion",
        "castingTime": "10 minutes",
        "range": "300 feet",
        "components": "V, S, M (a mushroom)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "druid",
            "warlock",
            "wizard"
        ],
        "description": "You make natural terrain in a 150-foot Cube in range look, sound, and smell like another sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren't changed.\nThe tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to notice the illusion. If the difference isn't obvious by touch, a creature examining the illusion can take the Study action to make an Intelligence (Investigation) check against your spell save DC to disbelieve it. If a creature discerns that the terrain is illusory, the creature sees a vague image superimposed on the real terrain.",
        "source": "SRD 5.2"
    },
    {
        "id": "ice-storm",
        "level": 4,
        "name": "Ice Storm",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, S, M (a mitten)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Hail falls in a 20-foot-radius, 40-foot-high Cylinder centered on a point within range. Each creature in the Cylinder makes a Dexterity saving throw. A creature takes 2d10 Bludgeoning damage and 4d6 Cold damage on a failed save or half as much damage on a successful one.\nHailstones turn ground in the Cylinder into Difficult Terrain until the end of your next turn.\nUsing a Higher-Level Spell Slot. The Bludgeoning damage increases by 1d10 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "leomunds-secret-chest",
        "level": 4,
        "name": "Leomund's Secret Chest",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth 5,000+ GP, and a Tiny replica of the chest made from the same materials worth 50+ GP)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "You hide a chest and all its contents on the Ethereal Plane. You must touch the chest and the miniature replica that serve as Material components for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet).\nWhile the chest remains on the Ethereal Plane, you can take a Magic action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by taking a Magic action to touch the chest and the replica.\nAfter 60 days, there is a cumulative 5 percent chance at the end of each day that the spell ends. The spell also ends if you cast this spell again or if the Tiny replica chest is destroyed. If the spell ends and the larger chest is on the Ethereal Plane, the chest remains there for you or someone else to find.",
        "source": "SRD 5.2"
    },
    {
        "id": "locate-creature",
        "level": 4,
        "name": "Locate Creature",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (fur from a bloodhound)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger",
            "wizard"
        ],
        "description": "Describe or name a creature that is familiar to you. You sense the direction to the creature's location if that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement.\nThe spell can locate a specific creature known to you or the nearest creature of a specific kind (such as a human or a unicorn) if you have seen such a creature up close-within 30 feet-at least once. If the creature you described or named is in a different form, such as under the effects of a Flesh to Stone or Polymorph spell, this spell doesn't locate the creature.\nThis spell can't locate a creature if any thickness of lead blocks a direct path between you and the creature.",
        "source": "SRD 5.2"
    },
    {
        "id": "mordenkainens-faithful-hound",
        "level": 4,
        "name": "Mordenkainen's Faithful Hound",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a silver whistle)",
        "duration": "8 hours",
        "classes": [
            "wizard"
        ],
        "description": "You conjure a phantom watchdog in an unoccupied space that you can see within range. The hound remains for the duration or until the two of you are more than 300 feet apart from each other.\nNo one but you can see the hound, and it is intangible and invulnerable. When a Small or larger creature comes within 30 feet of it without first speaking the password that you specify when you cast this spell, the hound starts barking loudly. The hound has Truesight with a range of 30 feet.\nAt the start of each of your turns, the hound attempts to bite one enemy within 5 feet of it. That enemy must succeed on a Dexterity saving throw or take 4d8 Force damage.\nOn your later turns, you can take a Magic action to move the hound up to 30 feet.",
        "source": "SRD 5.2"
    },
    {
        "id": "mordenkainens-private-sanctum",
        "level": 4,
        "name": "Mordenkainen's Private Sanctum",
        "school": "Abjuration",
        "castingTime": "10 minutes",
        "range": "120 feet",
        "components": "V, S, M (a thin sheet of lead)",
        "duration": "24 hours",
        "classes": [
            "wizard"
        ],
        "description": "You make an area within range magically secure. The area is a Cube that can be as small as 5 feet to as large as 100 feet on each side. The spell lasts for the duration.\nWhen you cast the spell, you decide what sort of security the spell provides, choosing any of the following properties: • Sound can't pass through the barrier at the edge of the warded area. • The barrier of the warded area appears dark and foggy, preventing vision (including Darkvision) through it. • Sensors created by Divination spells can't appear inside the protected area or pass through the barrier at its perimeter. • Creatures in the area can't be targeted by Divination spells. • Nothing can teleport into or out of the warded area. • Planar travel is blocked within the warded area.\nCasting this spell on the same spot every day for 365 days makes the spell last until dispelled.\nUsing a Higher-Level Spell Slot. You can increase the size of the Cube by 100 feet for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "otilukes-resilient-sphere",
        "level": 4,
        "name": "Otiluke's Resilient Sphere",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a glass sphere)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "A shimmering sphere encloses a Large or smaller creature or object within range. An unwilling creature must succeed on a Dexterity saving throw or be enclosed for the duration.\nNothing-not physical objects, energy, or other spell effects-can pass through the barrier, in or out, though a creature in the sphere can breathe there. The sphere is immune to all damage, and a creature or object inside can't be damaged by attacks or effects originating from outside, nor can a creature inside the sphere damage anything outside it.\nThe sphere is weightless and just large enough to contain the creature or object inside. An enclosed creature can take an action to push against the sphere's walls and thus roll the sphere at up to half the creature's Speed. Similarly, the globe can be picked up and moved by other creatures.\nA Disintegrate spell targeting the globe destroys it without harming anything inside.",
        "source": "SRD 5.2"
    },
    {
        "id": "phantasmal-killer",
        "level": 4,
        "name": "Phantasmal Killer",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You tap into the nightmares of a creature you can see within range and create an illusion of its deepest fears, visible only to that creature. The target makes a Wisdom saving throw. On a failed save, the target takes 4d10 Psychic damage and has Disadvantage on ability checks and attack rolls for the duration. On a successful save, the target takes half as much damage, and the spell ends.\nFor the duration, the target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes the Psychic damage again. On a successful save, the spell ends.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "polymorph",
        "level": 4,
        "name": "Polymorph",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a caterpillar cocoon)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You attempt to transform a creature that you can see within range into a Beast. The target must succeed on a Wisdom saving throw or shape-shift into a Beast form for the duration. That form can be any Beast you choose that has a Challenge Rating equal to or less than the target's (or the target's level if it doesn't have a Challenge Rating). The target's game statistics are replaced by the stat block of the chosen Beast, but the target retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. See the \"Animals\" section of \"Monsters\" for a sample of Beast stat blocks.\nThe target gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the spell ends. The spell ends early on the target if it has no Temporary Hit Points left.\nThe target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.\nThe target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment.",
        "source": "SRD 5.2"
    },
    {
        "id": "raulothims-psychic-lance",
        "level": 4,
        "name": "Raulothim's Psychic Lance",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You unleash a shimmering lance of psychic power from your forehead at a creature that you can see within range. Alternatively, you can utter a creature's name. If the named creature is within range, it becomes the spell's target even if you can't see it. If the target isn't within range, the lance dissipates without effect.\nThe target must make an Intelligence saving throw. On a failed save, the target takes 7d6 psychic damage and is incapacitated until the start of your next turn. On a successful save, the creature takes half as much damage and isn't incapacitated.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d6 for each slot level above 4th."
    },
    {
        "id": "raulothims-psychic-lance-ua",
        "level": 4,
        "name": "Raulothim's Psychic Lance (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You unleash a shimmering lance of psychic power from your forehead at a creature that you can see within range. Alternatively, you can utter a creature's name. If the named creature is within range, it becomes the spell's target even if you can't see it. If the target isn't within range, the lance dissipates without effect.\nThe target must make an Intelligence saving throw. On a failed save, the target takes 10d6 psychic damage and is incapacitated until the start of your next turn. On a successful save, the creature takes half as much damage and isn't incapacitated.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d6 for each slot level above 4th.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "shadow-of-moil",
        "level": 4,
        "name": "Shadow Of Moil",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (an undead eyeball encased in a gem worth at least 150 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock"
        ],
        "description": "Flame-like shadows wreathe your body until the spell ends, causing you to become heavily obscured to others. The shadows turn dim light within 10 feet of you into darkness, and bright light in the same area to dim light.\nUntil the spell ends, you have resistance to radiant damage. In addition, whenever a creature within 10 feet of you hits you with an attack, the shadows lash out at that creature, dealing it 2d8 necrotic damage."
    },
    {
        "id": "sickening-radiance",
        "level": 4,
        "name": "Sickening Radiance",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Dim, greenish light spreads within a 30-foot-radius sphere centered on a point you choose within range. The light spreads around corners, and it lasts until the spell ends.\nWhen a creature moves into the spell's area for the first time on a turn or starts its turn there, that creature must succeed on a Constitution saving throw or take 4d10 radiant damage, and it suffers one level of exhaustion, and emits a dim, greenish light in a 5-foot radius. This light makes it impossible for the creature to benefit from being invisible. The light and any levels of exhaustion caused by this spell go away when the spell ends."
    },
    {
        "id": "spirit-of-death",
        "level": 4,
        "name": "Spirit Of Death",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a gilded playing card depicting an avatar of death worth at least 400 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You call forth a spirit that embodies death. Choose an enemy you can see within range. The spirit appears in an unoccupied space that you can see within 10 feet of that creature. The spirit lasts for the duration or until it or the chosen creature dies, at which point the spirit vanishes to the afterlife. The spirit is bound to the chosen creature and cannot attack anyone else.\nThe spirit is friendly to you and your companions. Roll initiative for the spirit, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you). If you don't issue any commands to the spirit, it defends itself from hostile creatures but otherwise takes no actions.\nThe GM has the spirit's statistics."
    },
    {
        "id": "spirit-of-death-ua",
        "level": 4,
        "name": "Spirit of Death (UA)",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a gilded playing card depicting an avatar of death worth at least 400 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You call forth a spirit that embodies death. Choose an enemy you can see within range. The spirit appears in an unoccupied space that you can see within 10 feet of that creature. The spirit lasts for the duration or until it or the chosen creature dies, at which point the spirit vanishes to the afterlife. The spirit is bound to the chosen creature and cannot attack anyone else.\nThe spirit is friendly to you and your companions. Roll initiative for the spirit, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you). If you don't issue any commands to the spirit, it defends itself from hostile creatures but otherwise takes no actions.\nThe GM has the spirit's statistics.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "staggering-smite",
        "level": 4,
        "name": "Staggering Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "The target takes an extra 4d6 Psychic damage from the attack, and it must succeed on a Wisdom saving throw or have the Stunned condition until the end of your next turn.\nUsing a Higher-Level Spell Slot. The extra damage increases by 1d6 for each spell slot level above 4.",
        "source": "PHB 2024"
    },
    {
        "id": "stone-shape",
        "level": 4,
        "name": "Stone Shape",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (soft clay)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape you like. For example, you could shape a large rock into a weapon, statue, or coffer, or you could make a small passage through a wall that is 5 feet thick. You could also shape a stone door or its frame to seal the door shut. The object you create can have up to two hinges and a latch, but finer mechanical detail isn't possible.",
        "source": "SRD 5.2"
    },
    {
        "id": "stoneskin",
        "level": 4,
        "name": "Stoneskin",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (diamond dust worth 100+ GP, which the spell consumes)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "sorcerer",
            "wizard"
        ],
        "description": "Until the spell ends, one willing creature you touch has Resistance to Bludgeoning, Piercing, and Slashing damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "storm-sphere",
        "level": 4,
        "name": "Storm Sphere",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose within range. The sphere remains for the spell's duration. Each creature in the sphere when it appears or that ends its turn there must succeed on a Strength saving throw or take 2d6 bludgeoning damage. The sphere's space is difficult terrain.\nUntil the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one creature you choose within 60 feet of the center. Make a ranged spell attack. You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes 4d6 lightning damage.\nCreatures within 30 feet of the sphere have disadvantage on Wisdom (Perception) checks made to listen."
    },
    {
        "id": "summon-aberration",
        "level": 4,
        "name": "Summon Aberration",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a pickled tentacle and an eyeball in a platinum-inlaid vial worth at least 400 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You call forth an aberrant spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Aberrant Spirit stat block. When you cast the spell, choose Beholderkin, Slaad, or Star Spawn. The creature resembles an aberration of that kind, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger."
    },
    {
        "id": "summon-construct",
        "level": 4,
        "name": "Summon Construct",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (an ornate stone and metal lockbox worth at least 400 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "artificer",
            "wizard"
        ],
        "description": "You call forth the spirit of a construct. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Construct Spirit stat block. When you cast the spell, choose a material: Clay, Metal, or Stone. The creature resembles a golem or a modron (your choice) made of that material, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, use the higher level wherever the spell's level appears in the stat block."
    },
    {
        "id": "summon-elemental",
        "level": 4,
        "name": "Summon Elemental",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (air, a pebble, ash, and water inside a gold-inlaid vial worth at least 400 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "ranger",
            "wizard"
        ],
        "description": "You call forth an elemental spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Elemental Spirit stat block. When you cast the spell, choose an element: Air, Earth, Fire, or Water. The creature resembles a bipedal form wreathed in that element, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, use the higher level wherever the spell's level appears in the stat block."
    },
    {
        "id": "summon-greater-demon",
        "level": 4,
        "name": "Summon Greater Demon",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You utter foul words, summoning one demon from the Chaos of the Abyss. You choose the demon's type, which must be one of challenge rating 5 or lower, such as a shadow demon or a barlgura. The demon appears in an unoccupied space you can see within range, and the demon disappears when it drops to 0 hit points or when the spell ends.\nRoll initiative for the demon, which has its own turns. When you summon it and on each of your turns thereafter, you can issue a verbal command to it (requiring no action on your part), telling it what it must do on its next turn. If you issue no command, it spends its turn attacking any creature within reach that has attacked it.\nAt the end of each of the demon's turns, it makes a Charisma saving throw. The demon has disadvantage on this saving throw if you say its true name. On a failed save, the demon continues to obey you. On a successful save, your control of the demon ends for the rest of the duration, and the demon spends its turns pursuing and attacking the nearest non-demons to the best of its ability. If you stop concentrating on the spell before it reaches its full duration, an uncontrolled demon doesn't disappear for 1d6 rounds if it still has hit points.\nAs part of casting the spell, you can form a circle of blood on the ground with the material component used to cast the spell. The circle is large enough to encompass your space. While the spell lasts, the summoned demon can't cross the circle or harm it, and it can't target anyone within it. Using the material component in this manner consumes it when the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 5th level or higher, the challenge rating increases by 1 for each slot level above 4th."
    },
    {
        "id": "synchronicity-ua",
        "level": 4,
        "name": "Synchronicity (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "The creature you touch feels reality subtly shifted to its favor while this spell is in effect. The target isn't inconvenienced by mundane delays of any sort. Traffic lights are always green, there's always a waiting elevator, and a taxi is always around the corner. The target can run at full speed through dense crowds, and attacks of opportunity provoked by the target's movement are made with disadvantage.\nIn addition, the target has advantage on all ability checks. In the event that two or more creatures under the effect of this spell are attempting to avoid being inconvenienced by each other, the creatures engage in a contest of Charisma each time the effects of the spells would conflict.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "system-backdoor-ua",
        "level": 4,
        "name": "System Backdoor (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a hacking tool)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "This spell allows you to bypass system security. For the duration, you gain advantage on all Intelligence checks made to defeat encryption, bypass passwords, or modify security protocols.\nAdditionally, you can use your action to try to gain root access to a computer system you are touching. Make an Intelligence check contested by the system administrator's Intelligence check. If you succeed, you gain administrator privileges on the system for the duration.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "vitriolic-sphere",
        "level": 4,
        "name": "Vitriolic Sphere",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a drop of bile)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You point at a location within range, and a glowing, 1-foot-diameter ball of acid streaks there and explodes in a 20-foot-radius Sphere. Each creature in that area makes a Dexterity saving throw. On a failed save, a creature takes 10d4 Acid damage and another 5d4 Acid damage at the end of its next turn. On a successful save, a creature takes half the initial damage only.\nUsing a Higher-Level Spell Slot. The initial damage increases by 2d4 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-fire",
        "level": 4,
        "name": "Wall of Fire",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a piece of charcoal)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.\nWhen the wall appears, each creature in its area makes a Dexterity saving throw, taking 5d8 Fire damage on a failed save or half as much damage on a successful one.\nOne side of the wall, selected by you when you cast this spell, deals 5d8 Fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 4.",
        "source": "SRD 5.2"
    },
    {
        "id": "watery-sphere",
        "level": 4,
        "name": "Watery Sphere",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a droplet of water)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You conjure up a sphere of water with a 5-foot radius on a point you can see within range. The sphere can hover in the air, but no more than 10 feet off the ground. The sphere remains for the spell's duration.\nAny creature in the sphere's space must make a Strength saving throw. On a successful save, a creature is ejected from that space to the nearest unoccupied space of the creature's choice outside the sphere. A Huge or larger creature succeeds on the saving throw automatically. On a failed save, a creature is restrained by the sphere and is engulfed by the water. At the end of each of its turns, a restrained target can repeat the saving throw.\nThe sphere can restrain a maximum of four Medium or smaller creatures or one Large creature. If the sphere restrains a creature in excess of these numbers, a random creature that was already restrained by the sphere falls out of it and lands prone in a space within 5 feet of it.\nAs an action, you can move the sphere up to 30 feet in a straight line. If it moves over a pit, a cliff, or other drop-off, it safely descends until it is hovering 10 feet above the ground. Any creature restrained by the sphere moves with it. You can ram the sphere into creatures, forcing them to make the saving throw, but no more than once per turn.\nWhen the spell ends, the sphere falls to the ground and extinguishes all normal flames within 30 feet of it. Any creature restrained by the sphere is knocked prone in the space where it falls."
    },
    {
        "id": "animate-objects",
        "level": 5,
        "name": "Animate Objects",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Objects animate at your command. Choose a number of nonmagical objects within range that aren't being worn or carried, aren't fixed to a surface, and aren't Gargantuan. The maximum number of objects is equal to your spellcasting ability modifier; for this number, a Medium or smaller target counts as one object, a Large target counts as two, and a Huge target counts as three.\nEach target animates, sprouts legs, and becomes a Construct that uses the Animated Object stat block; this creature is under your control until the spell ends or until it is reduced to 0 Hit Points. Each creature you make with this spell is an ally to you and your allies. In combat, it shares your Initiative count and takes its turn immediately after yours.\nUntil the spell ends, you can take a Bonus Action to mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). If you issue no commands, the creature takes the Dodge action and moves only to avoid harm. When the creature drops to 0 Hit Points, it reverts to its object form, and any remaining damage carries over to that form.\nUsing a Higher-Level Spell Slot. The creature's Slam damage increases by 1d4 (Medium or smaller), 1d6 (Large), or 1d12 (Huge) for each spell slot level above 5. Huge or Smaller Construct, Unaligned AC 15 HP 10 (Medium or smaller), 20 (Large), 40 (Huge) Speed 30 ft. MOD SAVE    MOD SAVE    MOD SAVE Str 16 +3 +3 dex 10 +0 +0 con 10 +0 +0 int 3 -4 -4 WiS 3 -4 -4 chA 1 -5 -5 Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned Senses Blindsight 30 ft.; Passive Perception 6 Languages Understands the languages you know CR None (XP 0; PB equals your Proficiency Bonus) Actions     Slam. Melee Attack Roll: Bonus equals your spell attack modifier, reach 5 ft. Hit: Force damage equal to 1d4 + 3 (Medium or smaller), 2d6 + 3 + your spellcasting ability modifier (Large), or 2d12 + 3 + your spellcasting ability modifier (Huge).",
        "source": "SRD 5.2"
    },
    {
        "id": "antilife-shell",
        "level": 5,
        "name": "Antilife Shell",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid"
        ],
        "description": "An aura extends from you in a 10-foot Emanation for the duration. The aura prevents creatures other than Constructs and Undead from passing or reaching through it. An affected creature can cast spells or make attacks with Ranged or Reach weapons through the barrier.\nIf you move so that an affected creature is forced to pass through the barrier, the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "awaken",
        "level": 5,
        "name": "Awaken",
        "school": "Transmutation",
        "castingTime": "8 hours",
        "range": "Touch",
        "components": "V, S, M (an agate worth 1,000+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid"
        ],
        "description": "You spend the casting time tracing magical pathways within a precious gemstone, and then touch the target. The target must be either a Beast or Plant creature with an Intelligence of 3 or less or a natural plant that isn't a creature. The target gains an Intelligence of 10 and the ability to speak one language you know. If the target is a natural plant, it becomes a Plant creature and gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human's. The GM chooses statistics appropriate for the awakened Plant, such as the statistics for the Awakened Shrub or Awakened Tree in \"Monsters.\"\nThe awakened target has the Charmed condition for 30 days or until you or your allies deal damage to it. When that condition ends, the awakened creature chooses its attitude toward you.",
        "source": "SRD 5.2"
    },
    {
        "id": "banishing-smite",
        "level": 5,
        "name": "Banishing Smite",
        "school": "Abjuration",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "paladin"
        ],
        "description": "The target hit by the attack roll takes an extra 5d10 Force damage from the attack. If the attack reduces the target to 50 Hit Points or fewer, the target must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the Incapacitated condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 5.",
        "source": "PHB 2024"
    },
    {
        "id": "bigbys-hand",
        "level": 5,
        "name": "Bigby's Hand",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (an eggshell and a glove)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create a Large hand of shimmering magical energy in an unoccupied space that you can see within range. The hand lasts for the duration, and it moves at your command, mimicking the movements of your own hand.\nThe hand is an object that has AC 20 and Hit Points equal to your Hit Point maximum. If it drops to 0 Hit Points, the spell ends. The hand doesn't occupy its space.\nWhen you cast the spell and as a Bonus Action on your later turns, you can move the hand up to 60 feet and then cause one of the following effects: Clenched Fist. The hand strikes a target within 5 feet of it. Make a melee spell attack. On a hit, the target takes 5d8 Force damage. Forceful Hand. The hand attempts to push a Huge or smaller creature within 5 feet of it. The target must succeed on a Strength saving throw, or the hand pushes the target up to 5 feet plus a number of feet equal to five times your spellcasting ability modifier. The hand moves with the target, remaining within 5 feet of it. Grasping Hand. The hand attempts to grapple a Huge or smaller creature within 5 feet of it. The target must succeed on a Dexterity saving throw, or the target has the Grappled condition, with an escape DC equal to your spell save DC. While the hand grapples the target, you can take a Bonus Action to cause the hand to crush it, dealing Bludgeoning damage to the target equal to 4d6 plus your spellcasting ability modifier. Interposing Hand. The hand grants you Half Cover against attacks and other effects that originate from its space or that pass through it. In addition, its space counts as Difficult Terrain for your enemies.\nUsing a Higher-Level Spell Slot. The damage of the Clenched Fist increases by 2d8 and the damage of the Grasping Hand increases by 2d6 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "circle-of-power",
        "level": 5,
        "name": "Circle of Power",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "paladin"
        ],
        "description": "Divine energy radiates from you, distorting and diffusing magical energy within 30 feet of you. Until the spell ends, the sphere moves with you, centered on you. For the duration, each friendly creature in the area (including you) has advantage on saving throws against spells and other magical effects. Additionally, when an affected creature succeeds on a saving throw made against a spell or magical effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw."
    },
    {
        "id": "cloudkill",
        "level": 5,
        "name": "Cloudkill",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create a 20-foot-radius Sphere of yellow-green fog centered on a point within range. The fog lasts for the duration or until strong wind (such as the one created by Gust of Wind) disperses it, ending the spell. Its area is Heavily Obscured.\nEach creature in the Sphere makes a Constitution saving throw, taking 5d8 Poison damage on a failed save or half as much damage on a successful one. A creature must also make this save when the Sphere moves into its space and when it enters the Sphere or ends its turn there. A creature makes this save only once per turn.\nThe Sphere moves 10 feet away from you at the start of each of your turns.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "commune",
        "level": 5,
        "name": "Commune",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M (incense)",
        "duration": "1 minute",
        "classes": [
            "cleric"
        ],
        "description": "You contact a deity or a divine proxy and ask up to three questions that can be answered with yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question.\nDivine beings aren't necessarily omniscient, so you might receive \"unclear\" as an answer if a question pertains to information that lies beyond the deity's knowledge. In a case where a one-word answer could be misleading or contrary to the deity's interests, the GM might offer a short phrase as an answer instead.\nIf you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "commune-with-city-ua",
        "level": 5,
        "name": "Commune with City (UA)",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You briefly become one with the city you are in and gain knowledge of the surrounding area. You can find the nearest location of a specific sort (such as a tavern, a blacksmith, or a temple) or the nearest location where a specific item is sold. You also learn the general layout of the city within 1 mile of you.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the radius of the layout you learn increases by 1 mile for each slot level above 5th.",
        "ritual": true,
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "commune-with-nature",
        "level": 5,
        "name": "Commune with Nature",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You commune with nature spirits and gain knowledge of the surrounding area. In the outdoors, the spell gives you knowledge of the area within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by construction, such as in castles and settlements.\nChoose three of the following facts; you learn those facts as they pertain to the spell's area: • Locations of settlements • Locations of portals to other planes of existence • Location of one Challenge Rating 10+ creature (GM's choice) that is a Celestial, an Elemental, a Fey, a Fiend, or an Undead • The most prevalent kind of plant, mineral, or Beast (you choose which to learn) • Locations of bodies of water For example, you could determine the location of a powerful monster in the area, the locations of bodies of water, and the locations of any towns.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "cone-of-cold",
        "level": 5,
        "name": "Cone of Cold",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a small crystal or glass cone)",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You unleash a blast of cold air. Each creature in a 60-foot Cone originating from you makes a Constitution saving throw, taking 8d8 Cold damage on a failed save or half as much damage on a successful one. A creature killed by this spell becomes a frozen statue until it thaws.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-elemental",
        "level": 5,
        "name": "Conjure Elemental",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "wizard"
        ],
        "description": "You conjure a Large, intangible spirit from the Elemental Planes that appears in an unoccupied space within range. Choose the spirit's element, which determines its damage type: air (Lightning), earth (Thunder), fire (Fire), or water (Cold). The spirit lasts for the duration.\nWhenever a creature you can see enters the spirit's space or starts its turn within 5 feet of the spirit, you can force that creature to make a Dexterity saving throw if the spirit has no creature Restrained. On failed save, the target takes 8d8 damage of the spirit's type, and the target has the Restrained condition until the spell ends. At the start of each of its turns, the Restrained target repeats the save. On a failed save, the target takes 4d8 damage of the spirit's type. On a successful save, the target isn't Restrained by the spirit.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-volley",
        "level": 5,
        "name": "Conjure Volley",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (one piece of ammunition or one thrown weapon)",
        "duration": "Instantaneous",
        "classes": [
            "ranger"
        ],
        "description": "You fire a piece of nonmagical ammunition from a ranged weapon or throw a nonmagical weapon into the air and choose a point within range. Hundreds of duplicates of the ammunition or weapon fall in a volley from above and then disappear. Each creature in a 40-foot-radius, 20-foot-high cylinder centered on that point must make a Dexterity saving throw. A creature takes 8d8 damage on a failed save, or half as much damage on a successful one. The damage type is the same as that of the ammunition or weapon."
    },
    {
        "id": "conjure-vrock-ua",
        "level": 5,
        "name": "Conjure Vrock (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a gem worth at least 500 gp, which the spell consumes)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You summon a vrock, which appears in an unoccupied space that you can see within range. The vrock disappears when it drops to 0 hit points or when the spell ends.\nThe vrock is friendly to you and your companions for the duration. Roll initiative for the vrock, which has its own turns. It obeys any verbal commands that you issue to it (no action required by you). If you don't issue any commands to the vrock, it defends itself from hostile creatures but otherwise takes no actions.\nThe GM has the vrock's statistics.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the challenge rating increases by 1 for each slot level above 5th.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "contact-other-plane",
        "level": 5,
        "name": "Contact Other Plane",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V",
        "duration": "1 minute",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You mentally contact a demigod, the spirit of a longdead sage, or some other knowledgeable entity from another plane. Contacting this otherworldly intelligence can break your mind. When you cast this spell, make a DC 15 Intelligence saving throw. On a successful save, you can ask the entity up to five questions. You must ask your questions before the spell ends. The GM answers each question with one word, such as \"yes,\" \"no,\" \"maybe,\" \"never,\" \"irrelevant,\" or \"unclear\" (if the entity doesn't know the answer to the question). If a one-word answer would be misleading, the GM might instead offer a short phrase as an answer.\nOn a failed save, you take 6d6 Psychic damage and have the Incapacitated condition until you finish a Long Rest. A Greater Restoration spell cast on you ends this effect.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "contagion",
        "level": 5,
        "name": "Contagion",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "7 days",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "Your touch inflicts a magical contagion. The target must succeed on a Constitution saving throw or take 11d8 Necrotic damage and have the Poisoned condition. Also, choose one ability when you cast the spell. While Poisoned, the target has Disadvantage on saving throws made with the chosen ability.\nThe target must repeat the saving throw at the end of each of its turns until it gets three successes or failures. If the target succeeds on three of these saves, the spell ends on the target. If the target fails three of the saves, the spell lasts for 7 days on it.\nWhenever the Poisoned target receives an effect that would end the Poisoned condition, the target must succeed on a Constitution saving throw, or the Poisoned condition doesn't end on it.",
        "source": "SRD 5.2"
    },
    {
        "id": "control-winds",
        "level": 5,
        "name": "Control Winds",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You take control of the air in a 100-foot cube that you can see within range. Choose one of the following effects when you cast the spell. The effect lasts for the spell's duration, unless you use your action on a later turn to switch to a different effect. You can also use your action to temporarily halt the effect or to restart one you've halted.\n\n**Gusts.** A wind picks up within the cube, continually blowing in a horizontal direction you designate. You choose the intensity of the wind: calm, moderate, or strong. If the wind is moderate or strong, ranged weapon attacks that enter or move through it have disadvantage on their attack rolls. If the wind is strong, any creature moving against the wind must spend 1 extra foot of movement for each foot moved.\n**Downdraft.** You cause a sustained blast of strong wind to blow downward from the top of the cube. Ranged weapon attacks that pass through the cube have disadvantage on their attack rolls. A creature must make a Strength saving throw if it flies into the cube for the first time on a turn or starts its turn there flying. On a failed save, the creature is knocked prone.\n**Updraft.** You cause a sustained updraft within the cube, rising upward from the bottom of the cube. Creatures that end a fall within the cube take only half damage from the fall. When a creature in the cube makes a vertical jump, the creature can jump up to 10 feet higher than normal."
    },
    {
        "id": "create-spelljamming-helm",
        "level": 5,
        "name": "Create Spelljamming Helm",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a crystal rod worth at least 5,000 gp, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "artificer",
            "wizard"
        ],
        "description": "You touch a Large or smaller chair that is unoccupied. The chair transforms into a spelljamming helm, which is a magic item used to propel a spelljamming ship through space."
    },
    {
        "id": "creation",
        "level": 5,
        "name": "Creation",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S, M (a paintbrush)",
        "duration": "Special",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You pull wisps of shadow material from the Shadowfell to create an object within range. It is either an object of vegetable matter (soft goods, rope, wood, and the like) or mineral matter (stone, crystal, metal, and the like). The object must be no larger than a 5-foot Cube, and the object must be of a form and material that you have seen.\nThe spell's duration depends on the object's material, as shown in the Materials table. If the object is composed of multiple materials, use the shortest duration. Using any object created by this spell as another spell's Material component causes the other spell to fail. Materials Material    Duration Stone or crystal    12 hours Gems    10 minutes  Adamantine or mithral    1 minute\nUsing a Higher-Level Spell Slot. The Cube increases by 5 feet for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "danse-macabre",
        "level": 5,
        "name": "Danse Macabre",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "Threads of dark power leap from your fingers to pierce the corpses of up to five Small or Medium corpses within range. Each corpse immediately stands up and becomes undead. You decide whether it is a zombie or a skeleton (the statistics for zombies and skeletons are in the Monster Manual), and it gains a bonus to its attack and damage rolls equal to your spellcasting ability modifier.\nYou can use a bonus action to mentally command the creatures you made with this spell, issuing the same command to all of them. To receive the command, a creature must be within 60 feet of you. You decide what action the creatures will take and where they will move during their next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creatures do nothing except defend themselves against hostile creatures. Once given an order, the creatures continue to follow it until their task is complete.\nThe creatures are under your control until the spell ends, after which they become inanimate once more.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, you animate up to two additional corpses for each slot level above 5th."
    },
    {
        "id": "dawn",
        "level": 5,
        "name": "Dawn",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a sunburst pendant worth at least 100 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "wizard"
        ],
        "description": "The light of dawn shines down on a location you specify within range. Until the spell ends, a 30-foot-radius, 40-foot-high cylinder of bright light glimmers there. This light is sunlight.\nWhen the cylinder appears, each creature in it must make a Constitution saving throw, taking 4d10 radiant damage on a failed save, or half as much damage on a successful one. A creature must also make this saving throw whenever it ends its turn in the cylinder.\nIf you're within 60 feet of the cylinder, you can move it up to 60 feet as a bonus action on your turn."
    },
    {
        "id": "destructive-wave",
        "level": 5,
        "name": "Destructive Wave",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (30-foot radius)",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "You strike the ground, creating a burst of divine energy that ripples outward from you. Each creature you choose within 30 feet of you must succeed on a Constitution saving throw or take 5d6 thunder damage, as well as 5d6 radiant or necrotic damage (your choice), and be knocked prone. A creature that succeeds on its saving throw takes half as much damage and isn't knocked prone."
    },
    {
        "id": "dispel-evil-and-good",
        "level": 5,
        "name": "Dispel Evil and Good",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (powdered silver and iron)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "For the duration, Celestials, Elementals, Fey, Fiends, and Undead have Disadvantage on attack rolls against you. You can end the spell early by using either of the following special functions.\nBreak Enchantment. As a Magic action, you touch a creature that is possessed by or has the Charmed or Frightened condition from one or more creatures of the types above. The target is no longer possessed, Charmed, or Frightened by such creatures.\nDismissal. As a Magic action, you target one creature you can see within 5 feet of you that has one of the creature types above. The target must succeed on a Charisma saving throw or be sent back to its home plane if it isn't there already. If they aren't on their home plane, Undead are sent to the Shadowfell, and Fey are sent to the Feywild.",
        "source": "SRD 5.2"
    },
    {
        "id": "dominate-person",
        "level": 5,
        "name": "Dominate Person",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "One Humanoid you can see within range must succeed on a Wisdom saving throw or have the Charmed condition for the duration. The target has Advantage on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.\nYou have a telepathic link with the Charmed target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"Attack that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.\nYou can command the target to take a Reaction but must take your own Reaction to do so.\nUsing a Higher-Level Spell Slot. Your Concentration can last longer with a spell slot of level 6 (up to 10 minutes), 7 (up to 1 hour), or 8+ (up to 8 hours).",
        "source": "SRD 5.2"
    },
    {
        "id": "dream",
        "level": 5,
        "name": "Dream",
        "school": "Illusion",
        "castingTime": "1 minute",
        "range": "Special",
        "components": "V, S, M (a handful of sand)",
        "duration": "8 hours",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "You target a creature you know on the same plane of existence. You or a willing creature you touch enters a trance state to act as a dream messenger. While in the trance, the messenger is Incapacitated and has a Speed of 0.\nIf the target is asleep, the messenger appears in the target's dreams and can converse with the target as long as it remains asleep, through the spell's duration. The messenger can also shape the dream's environment, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the spell. The target recalls the dream perfectly upon waking.\nIf the target is awake when you cast the spell, the messenger knows it and can either end the trance (and the spell) or wait for the target to sleep, at which point the messenger enters its dreams.\nYou can make the messenger terrifying to the target. If you do so, the messenger can deliver a message of no more than ten words, and then the target makes a Wisdom saving throw. On a failed save, the target gains no benefit from its rest, and it takes 3d6 Psychic damage when it wakes up.",
        "source": "SRD 5.2"
    },
    {
        "id": "enervation",
        "level": 5,
        "name": "Enervation",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A tendril of inky darkness reaches out from you, touching a creature you can see within range to drain life from it. The target must make a Dexterity saving throw. On a successful save, the target takes 2d8 necrotic damage, and the spell ends. On a failed save, the target takes 4d8 necrotic damage, and until the spell ends, you can use your action on each of your turns to automatically deal 4d8 necrotic damage to the target. The spell ends if you use your action to do anything else, if the target is ever outside the spell's range, or if the target has total cover from you.\nWhenever the spell deals damage to a target, you regain hit points equal to half the amount of necrotic damage the target takes.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
    },
    {
        "id": "far-step",
        "level": 5,
        "name": "Far Step",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You teleport up to 60 feet to an unoccupied space you can see. on each of your turns before the spell ends, you can use a bonus action to teleport in this way again."
    },
    {
        "id": "flame-strike",
        "level": 5,
        "name": "Flame Strike",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a pinch of sulfur)",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "A vertical column of brilliant fire roars down from above. Each creature in a 10-foot-radius, 40-foothigh Cylinder centered on a point within range makes a Dexterity saving throw, taking 5d6 Fire damage and 5d6 Radiant damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The Fire damage and the Radiant damage increase by 1d6 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "geas",
        "level": 5,
        "name": "Geas",
        "school": "Enchantment",
        "castingTime": "1 minute",
        "range": "60 feet",
        "components": "V",
        "duration": "30 days",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "wizard"
        ],
        "description": "You give a verbal command to a creature that you can see within range, ordering it to carry out some service or refrain from an action or a course of activity as you decide. The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration. The target automatically succeeds if it can't understand your command.\nWhile Charmed, the creature takes 5d10 Psychic damage if it acts in a manner directly counter to your command. It takes this damage no more than once each day.\nYou can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends.\nA Remove Curse, Greater Restoration, or Wish spell ends this spell.\nUsing a Higher-Level Spell Slot. If you use a level 7 or 8 spell slot, the duration is 365 days. If you use a level 9 spell slot, the spell lasts until it is ended by one of the spells mentioned above.",
        "source": "SRD 5.2"
    },
    {
        "id": "greater-restoration",
        "level": 5,
        "name": "Greater Restoration",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (diamond dust worth 100+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "paladin",
            "ranger"
        ],
        "description": "You touch a creature and magically remove one of the following effects from it: • 1 Exhaustion level • The Charmed or Petrified condition • A curse, including the target's Attunement to a cursed magic item • Any reduction to one of the target's ability scores • Any reduction to the target's Hit Point maximum",
        "source": "SRD 5.2"
    },
    {
        "id": "hallow",
        "level": 5,
        "name": "Hallow",
        "school": "Abjuration",
        "castingTime": "24 hours",
        "range": "Touch",
        "components": "V, S, M (incense worth 1,000+ GP, which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "cleric"
        ],
        "description": "You touch a point and infuse an area around it with holy or unholy power. The area can have a radius up to 60 feet, and the spell fails if the radius includes an area already under the effect of Hallow. The affected area has the following effects.\nHallowed Ward. Choose any of these creature types: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Creatures of the chosen types can't willingly enter the area, and any creature that is possessed by or that has the Charmed or Frightened condition from such creatures isn't possessed, Charmed, or Frightened by them while in the area.\nExtra Effect. You bind an extra effect to the area from the list below: Courage. Creatures of any types you choose can't gain the Frightened condition while in the area. Darkness. Darkness fills the area. Normal light, as well as magical light created by spells of a level lower than this spell, can't illuminate the area. Daylight. Bright light fills the area. Magical Darkness created by spells of a level lower than this spell can't extinguish the light. Peaceful Rest. Dead bodies interred in the area can't be turned into Undead. Extradimensional Interference. Creatures of any types you choose can't enter or exit the area using teleportation or interplanar travel. Fear. Creatures of any types you choose have the Frightened condition while in the area. Resistance. Creatures of any types you choose have Resistance to one damage type of your choice while in the area. Silence. No sound can emanate from within the area, and no sound can reach into it. Tongues. Creatures of any types you choose can communicate with any other creature in the area even if they don't share a common language. Vulnerability. Creatures of any types you choose have Vulnerability to one damage type of your choice while in the area.",
        "source": "SRD 5.2"
    },
    {
        "id": "hold-monster",
        "level": 5,
        "name": "Hold Monster",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a straight piece of iron)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or have the Paralyzed condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.\nUsing a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "holy-weapon",
        "level": 5,
        "name": "Holy Weapon",
        "school": "Evocation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You imbue a weapon you touch with holy power. Until the spell ends, the weapon emits bright light in a 30-foot radius and dim light for an additional 30 feet. In addition, weapon attacks made with it deal an extra 2d8 radiant damage on a hit. If the weapon isn't already a magic weapon, it becomes one for the duration.\nAs a bonus action on your turn, you can dismiss this spell and cause the weapon to emit a burst of radiance. Each creature of your choice that you can see within 30 feet of the weapon must make a Constitution saving throw. On a failed save, a creature takes 4d8 radiant damage, and it is blinded for 1 minute. On a successful save, a creature takes half as much damage and isn't blinded. At the end of each of its turns, a blinded creature can make a Constitution saving throw, ending the effect on itself on a success."
    },
    {
        "id": "immolation",
        "level": 5,
        "name": "Immolation",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Flames wreathe one creature you can see within range. The target must make a Dexterity saving throw. It takes 8d6 fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target also burns for the spell's duration. The burning target sheds bright light in a 30-foot radius and dim light for an additional 30 feet. At the end of each of its turns, the target repeats the saving throw. It takes 4d6 fire damage on a failed save, and the spell ends on a successful one. These magical flames can't be extinguished by nonmagical means.\nIf damage from this spell kills a target, the target is turned to ash."
    },
    {
        "id": "infernal-calling",
        "level": 5,
        "name": "Infernal Calling",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "90 feet",
        "components": "V, S, M (a ruby worth at least 999 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You utter dark incantations, summoning a devil from the Nine Hells. You choose the devil's type, which must be one of challenge rating 6 or lower, such as a barbed devil or a bearded devil. The devil appears in an unoccupied space that you can see within range. The devil disappears when it drops to 0 hit points or when the spell ends.\nThe devil is unfriendly toward you and your companions. Roll initiative for the devil, which has its own turns. It is seemingly under the Dungeon Master's control and acts according to its nature on each of its turns, which might result in its attacking you if it thinks it can prevail, or trying to tempt you to undertake an evil act in exchange for limited service. The DM has the creature's statistics.\nOn each of your turns, you can try to issue a verbal command to the devil (no action required by you). It obeys the command if the likely outcome is in accordance with its desires, especially if the result would draw you toward evil. Otherwise, you must make a Charisma (Deception, Intimidation, or Persuasion) check contested by its Wisdom (Insight) check. You make the check with advantage if you say the devil's true name. If your check fails, the devil becomes immune to your verbal commands for the duration of the spell, though it can still choose to obey you if it likes.\nIf the devil dies, it returns to the Nine Hells.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the challenge rating increases by 1 for each slot level above 5th."
    },
    {
        "id": "insect-plague",
        "level": 5,
        "name": "Insect Plague",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, S, M (a locust)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric",
            "druid",
            "sorcerer"
        ],
        "description": "Swarming locusts fill a 20-foot-radius Sphere centered on a point you choose within range. The Sphere remains for the duration, and its area is Lightly Obscured and Difficult Terrain.\nWhen the swarm appears, each creature in it makes a Constitution saving throw, taking 4d10 Piercing damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. The damage increases by 1d10 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "legend-lore",
        "level": 5,
        "name": "Legend Lore",
        "school": "Divination",
        "castingTime": "10 minutes",
        "range": "Self",
        "components": "V, S, M (incense worth 250+ GP, which the spell consumes, and four ivory strips worth 50+ GP each)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "wizard"
        ],
        "description": "Name or describe a famous person, place, or object. The spell brings to your mind a brief summary of the significant lore about that famous thing, as described by the GM.\nThe lore might consist of important details, amusing revelations, or even secret lore that has never been widely known. The more information you already know about the thing, the more precise and detailed the information you receive is. That information is accurate but might be couched in figurative language or poetry, as determined by the GM.\nIf the famous thing you chose isn't actually famous, you hear sad musical notes played on a trombone, and the spell fails.",
        "source": "SRD 5.2"
    },
    {
        "id": "maelstrom",
        "level": 5,
        "name": "Maelstrom",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (paper or leaf in the shape of a funnel)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid"
        ],
        "description": "A mass of 5-foot-deep water appears and swirls in a 30-foot radius centered on a point you can see within range. The point must be on ground or in a body of water. Until the spell ends, that area is difficult terrain, and any creature that starts its turn there must succeed on a Strength saving throw or take 6d6 bludgeoning damage and be pulled 10 feet toward the center."
    },
    {
        "id": "mass-cure-wounds",
        "level": 5,
        "name": "Mass Cure Wounds",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid"
        ],
        "description": "A wave of healing energy washes out from a point you can see within range. Choose up to six creatures in a 30-foot-radius Sphere centered on that point. Each target regains Hit Points equal to 5d8 plus your spellcasting ability modifier.\nUsing a Higher-Level Spell Slot. The healing increases by 1d8 for each spell slot level above 5.",
        "source": "SRD 5.2"
    },
    {
        "id": "mislead",
        "level": 5,
        "name": "Mislead",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "Self",
        "components": "S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "You gain the Invisible condition at the same time that an illusory double of you appears where you are standing. The double lasts for the duration, but the invisibility ends immediately after you make an attack roll, deal damage, or cast a spell.\nAs a Magic action, you can move the illusory double up to twice your Speed and make it gesture, speak, and behave in whatever way you choose. It is intangible and invulnerable.\nYou can see through its eyes and hear through its ears as if you were located where it is.",
        "source": "SRD 5.2"
    },
    {
        "id": "modify-memory",
        "level": 5,
        "name": "Modify Memory",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You attempt to reshape another creature's memories. One creature that you can see within range makes a Wisdom saving throw. If you are fighting the creature, it has Advantage on the save. On a failed save, the target has the Charmed condition for the duration. While Charmed in this way, the target also has the Incapacitated condition and is unaware of its surroundings, though it can hear you. If it takes any damage or is targeted by another spell, this spell ends, and no memories are modified.\nWhile this charm lasts, you can affect the target's memory of an event that it experienced within the last 24 hours and that lasted no more than 10 minutes. You can permanently eliminate all memory of the event, allow the target to recall the event with perfect clarity, change its memory of the event's details, or create a memory of some other event.\nYou must speak to the target to describe how its memories are affected, and it must be able to understand your language for the modified memories to take root. Its mind fills in any gaps in the details of your description. If the spell ends before you finish describing the modified memories, the creature's memory isn't altered. Otherwise, the modified memories take hold when the spell ends.\nA modified memory doesn't necessarily affect how a creature behaves, particularly if the memory contradicts the creature's natural inclinations, alignment, or beliefs. An illogical modified memory, such as a false memory of how much the creature enjoyed swimming in acid, is dismissed as a bad dream. The GM might deem a modified memory too nonsensical to affect a creature.\nA Remove Curse or Greater Restoration spell cast on the target restores the creature's true memory.\nUsing a Higher-Level Spell Slot. You can alter the target's memories of an event that took place up to 7 days ago (level 6 spell slot), 30 days ago (level 7 spell slot), 365 days ago (level 8 spell slot), or any time in the creature's past (level 9 spell slot).",
        "source": "SRD 5.2"
    },
    {
        "id": "negative-energy-flood",
        "level": 5,
        "name": "Negative Energy Flood",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a broken bone and a square of black silk)",
        "duration": "Instantaneous",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You send ribbons of negative energy at one creature you can see within range. Unless the target is undead, it must make a Constitution saving throw, taking 5d12 necrotic damage on a failed save, or half as much damage on a successful one. A target killed by this damage rises up as a zombie at the start of your next turn. The zombie pursues whatever creature it can see that is closest to it. Statistics for the zombie are in the Monster Manual.\nIf you target an undead with this spell, the target doesn't make a saving throw. Instead, the target regains 5d12 hit points."
    },
    {
        "id": "passwall",
        "level": 5,
        "name": "Passwall",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a pinch of sesame seeds)",
        "duration": "1 hour",
        "classes": [
            "wizard"
        ],
        "description": "A passage appears at a point that you can see on a wooden, plaster, or stone surface (such as a wall, ceiling, or floor) within range and lasts for the duration. You choose the opening's dimensions: up to 5 feet wide, 8 feet tall, and 20 feet deep. The passage creates no instability in a structure surrounding it.\nWhen the opening disappears, any creatures or objects still in the passage created by the spell are safely ejected to an unoccupied space nearest to the surface on which you cast the spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "planar-binding",
        "level": 5,
        "name": "Planar Binding",
        "school": "Abjuration",
        "castingTime": "1 hour",
        "range": "60 feet",
        "components": "V, S, M (a jewel worth 1,000+ GP, which the spell consumes)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "warlock",
            "wizard"
        ],
        "description": "You attempt to bind a Celestial, an Elemental, a Fey, or a Fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of the inverted version of the Magic Circle spell to trap it while this spell is cast.) At the completion of the casting, the target must succeed on a Charisma saving throw or be bound to serve you for the duration. If the creature was summoned or created by another spell, that spell's duration is extended to match the duration of this spell.\nA bound creature must follow your commands to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. If the creature is Hostile, it strives to twist your commands to achieve its own objectives. If the creature carries out your commands completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane, it returns to the place where you bound it and remains there until the spell ends.\nUsing a Higher-Level Spell Slot. The duration increases with a spell slot of level 6 (10 days), 7 (30 days), 8 (180 days), and 9 (366 days).",
        "source": "SRD 5.2"
    },
    {
        "id": "raise-dead",
        "level": 5,
        "name": "Raise Dead",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (a diamond worth 500+ GP, which, the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "paladin"
        ],
        "description": "With a touch, you revive a dead creature if it has been dead no longer than 10 days and it wasn't Undead when it died.\nThe creature returns to life with 1 Hit Point. This spell also neutralizes any poisons that affected the creature at the time of death.\nThis spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survivalits head, for instance-the spell automatically fails.\nComing back from the dead is an ordeal. The target takes a -4 penalty to D20 Tests. Every time the target finishes a Long Rest, the penalty is reduced by 1 until it becomes 0.",
        "source": "SRD 5.2"
    },
    {
        "id": "rarys-telepathic-bond",
        "level": 5,
        "name": "Rary's Telepathic Bond",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (two eggs)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You forge a telepathic link among up to eight willing creatures of your choice within range, psychically linking each creature to all the others for the duration. Creatures that can't communicate in any languages aren't affected by this spell.\nUntil the spell ends, the targets can communicate telepathically through the bond whether or not they share a language. The communication is possible over any distance, though it can't extend to other planes of existence.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "reincarnate",
        "level": 5,
        "name": "Reincarnate",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (rare oils worth 1,000+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "druid"
        ],
        "description": "You touch a dead Humanoid or a piece of one. If the creature has been dead no longer than 10 days, the spell forms a new body for it and calls the soul to enter that body. Roll 1d10 and consult the table below to determine the body's species, or the GM chooses another playable species. 1d10 Species 1d10 Species 1 Roll again. 6 Goliath 2 Dragonborn 7 Halfling 3 Dwarf 8 Human 4 Elf 9 Orc 5    Gnome\n10    Tiefling\nThe reincarnated creature makes any choices that a species' description offers, and the creature recalls its former life. It retains the capabilities it had in its original form, except it loses the traits of its previous species and gains the traits of its new one.",
        "source": "SRD 5.2"
    },
    {
        "id": "scrying",
        "level": 5,
        "name": "Scrying",
        "school": "Divination",
        "castingTime": "10 minutes",
        "range": "Self",
        "components": "V, S, M (a focus worth 1,000+ GP, such as, a crystal ball, mirror, or water-filled font)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "warlock",
            "wizard"
        ],
        "description": "You can see and hear a creature you choose that is on the same plane of existence as you. The target makes a Wisdom saving throw, which is modified (see the tables below) by how well you know the target and the sort of physical connection you have to it. The target doesn't know what it is making the save against, only that it feels uneasy. Your Knowledge of the Target Is ...    Save Modifier Firsthand (met the target)    +0 You Have the Target's ...    Save Modifier Garment or other possession    -4\nOn a successful save, the target isn't affected, and you can't use this spell on it again for 24 hours.\nOn a failed save, the spell creates an Invisible, intangible sensor within 10 feet of the target. You can see and hear through the sensor as if you were there. The sensor moves with the target, remaining within 10 feet of it for the duration. If something can see the sensor, it appears as a luminous orb about the size of your fist.\nInstead of targeting a creature, you can target a location you have seen. When you do so, the sensor appears at that location and doesn't move.",
        "source": "SRD 5.2"
    },
    {
        "id": "seeming",
        "level": 5,
        "name": "Seeming",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "8 hours",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You give an illusory appearance to each creature of your choice that you can see within range. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.\nYou can give the same appearance or different ones to the targets. The spell can change the appearance of the targets' bodies and equipment. You can make each creature seem 1 foot shorter or taller and appear heavier or lighter. A target's new appearance must have the same basic arrangement of limbs as the target, but the extent of the illusion is otherwise up to you. The spell lasts for the duration.\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature's outfit, objects pass through the hat.\nA creature that takes the Study action to examine a target can make an Intelligence (Investigation) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised.",
        "source": "SRD 5.2"
    },
    {
        "id": "shutdown-ua",
        "level": 5,
        "name": "Shutdown (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You execute a command to shut down a construct you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 4d8 force damage, and it is incapacitated for the duration. On a successful save, the target takes half as much damage and isn't incapacitated. At the end of each of its turns, the target can repeat the saving throw, ending the effect on itself on a success.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "skill-empowerment",
        "level": 5,
        "name": "Skill Empowerment",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Your magic deepens a creature's understanding of its own talent. You touch one willing creature and give it expertise in one skill of your choice; until the spell ends, the creature doubles its proficiency bonus for ability checks it makes that use the chosen skill. You must choose a skill in which the target is proficient and that isn't already benefiting from an effect, such as Expertise, that doubles its proficiency bonus."
    },
    {
        "id": "steel-wind-strike",
        "level": 5,
        "name": "Steel Wind Strike",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "S, M (a melee weapon worth at least 1 sp)",
        "duration": "Instantaneous",
        "classes": [
            "ranger",
            "wizard"
        ],
        "description": "You flourish the weapon used in the casting and then vanish to strike like the wind. Choose up to five creatures you can see within range. Make a melee spell attack against each target. On a hit, a target takes 6d10 force damage.\nYou can then teleport to an unoccupied space you can see within 5 feet of one of the targets you hit or missed."
    },
    {
        "id": "summon-celestial",
        "level": 5,
        "name": "Summon Celestial",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (a golden reliquary worth at least 500 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "cleric",
            "paladin"
        ],
        "description": "You call forth a celestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Celestial Spirit stat block. When you cast the spell, choose Avenger or Defender. Your choice determines the creature's attack in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, use the higher level wherever the spell's level appears in the stat block."
    },
    {
        "id": "summon-draconic-spirit",
        "level": 5,
        "name": "Summon Dragon",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (an object with the image of a, dragon engraved on it worth 500+ GP)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "wizard"
        ],
        "description": "You call forth a Dragon spirit. It manifests in an unoccupied space that you can see within range and uses the Draconic Spirit stat block. The creature disappears when it drops to 0 Hit Points or when the spell ends.\nThe creature is an ally to you and your allies. In combat, the creature shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its movement to avoid danger.\nUsing a Higher-Level Spell Slot. Use the spell slot's level for the spell's level in the stat block. Large Dragon, Neutral AC 14 + the spell's level HP 50 + 10 for each spell level above 5 Speed 30 ft., Fly 60 ft., Swim 30 ft. MOD SAVE    MOD SAVE    MOD SAVE Str 19 +4 +4 dex 14 +2 +2 con 17 +3 +3 int  10 +0 +0 WiS 14 +2 +2 chA 14 +2 +2 Resistances Acid, Cold, Fire, Lightning, Poison Immunities Charmed, Frightened, Poisoned Senses Blindsight 30 ft., Darkvision 60 ft.; Passive Perception 12 Languages Draconic, understands the languages you know CR None (XP 0; PB equals your Proficiency Bonus) Traits     Shared Resistances. When you summon the spirit, choose one of its Resistances. You have Resistance to the chosen damage type until the spell ends. Actions     Multiattack. The spirit makes a number of Rend attacks equal to half the spell's level (round down), and it uses Breath Weapon. Rend. Melee Attack Roll: Bonus equals your spell attack modifier, reach 10 feet. Hit: 1d6 + 4 + the spell's level Piercing damage. Breath Weapon. Dexterity Saving Throw: DC equals your spell save DC, each creature in a 30-foot Cone. Failure: 2d6 damage of a type this spirit has Resistance to (your choice when you cast the spell). Success: Half damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "summon-draconic-spirit-ua",
        "level": 5,
        "name": "Summon Draconic Spirit (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (an object with the image of a dragon engraved on it, worth at least 500 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You call forth a draconic spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Draconic Spirit stat block. When you cast this spell, choose a family of dragon: Chromatic, Gem, or Metallic. The creature resembles a dragon of the chosen family, which determines the nature of its breath weapon and resistance traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid danger.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, use the higher level wherever the spell's level appears in the stat block.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "swift-quiver",
        "level": 5,
        "name": "Swift Quiver",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Touch",
        "components": "V, S, M (a quiver containing at least one piece of ammunition)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "ranger"
        ],
        "description": "You transmute your quiver so it produces an endless supply of nonmagical ammunition, which seems to leap into your hand when you reach for it.\nOn each of your turns until the spell ends, you can use a bonus action to make two attacks with a weapon that uses ammunition from the quiver. Each time you make such an attack, the ammunition ceases to exist when it hits or misses the target; however, the attack actually uses ammunition from the quiver, which is magically replaced by the spell, so you do consume ammunition."
    },
    {
        "id": "synaptic-static",
        "level": 5,
        "name": "Synaptic Static",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You cause a psychic blast to explode among your enemies. Each creature in a 20-foot-radius sphere centered on a point you can see within range must make an Intelligence saving throw. A creature with an Intelligence score of 2 or lower can't be affected by this spell. A target takes 8d6 psychic damage on a failed save, or half as much damage on a successful one.\nAfter a failed save, a target has muddled thoughts for 1 minute. During that time, it subtracts 1d6 from all attack rolls and ability checks, as well as its Constitution saving throws to maintain concentration. The target can make an Intelligence saving throw at the end of each of its turns, ending the effect on itself on a success."
    },
    {
        "id": "telekinesis",
        "level": 5,
        "name": "Telekinesis",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell and as a Magic action on your later turns before the spell ends, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell.\nCreature. You can try to move a Huge or smaller creature. The target must succeed on a Strength saving throw, or you move it up to 30 feet in any direction within the spell's range. Until the end of your next turn, the creature has the Restrained condition, and if you lift it into the air, it is suspended there. It falls at the end of your next turn unless you use this option on it again and it fails the save.\nObject. You can try to move a Huge or smaller object. If the object isn't being worn or carried, you automatically move it up to 30 feet in any direction within the spell's range.\nIf the object is worn or carried by a creature, that creature must succeed on a Strength saving throw, or you pull the object away and move it up to 30 feet in any direction within the spell's range.\nYou can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool,",
        "source": "SRD 5.2"
    },
    {
        "id": "teleportation-circle",
        "level": 5,
        "name": "Teleportation Circle",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "10 feet",
        "components": "V, M (rare inks worth 50+ GP, which the, spell consumes)",
        "duration": "1 round",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "As you cast the spell, you draw a 5-foot-radius circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied.\nMany major temples, guildhalls, and other important places have permanent teleportation circles. Each circle includes a unique sigil sequence-a string of runes arranged in a particular pattern.\nWhen you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the GM. You might learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute.\nYou can create a permanent teleportation circle by casting this spell in the same location every day for 365 days.",
        "source": "SRD 5.2"
    },
    {
        "id": "temporal-shunt",
        "level": 5,
        "name": "Temporal Shunt",
        "school": "Transmutation",
        "castingTime": "1 reaction, which you take when a creature you can see makes an attack roll or begins to cast a spell",
        "range": "120 feet",
        "components": "V, S",
        "duration": "1 round",
        "classes": [
            "wizard"
        ],
        "description": "You target the triggering creature, which must succeed on a Wisdom saving throw or vanish, being thrown to another point in time and causing the attack to miss or the spell to be wasted. At the start of its next turn, the target reappears where it was or in the closest unoccupied space. The target doesn't remember you casting the spell or being affected by it.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, you can target one additional creature for each slot level above 5th. All targets must be within 30 feet of each other."
    },
    {
        "id": "transmute-rock",
        "level": 5,
        "name": "Transmute Rock",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (clay and water)",
        "duration": "Until dispelled",
        "classes": [
            "druid",
            "wizard",
            "artificer"
        ],
        "description": "You choose an area of stone or mud that you can see that fits within a 40-foot cube and that is within range, and choose one of the following effects.\n**Transmute Rock to Mud.** Nonmagical rock of any sort in the area becomes an equal volume of thick, flowing mud that remains for the spell's duration.\nThe ground in the spell's area becomes muddy enough that creatures can sink into it. Each foot that a creature moves through the mud costs 4 feet of movement, and any creature on the ground when you cast the spell must make a Strength saving throw. A creature is also subject to this save the first time it enters the area on a turn or ends its turn there. On a failed save, a creature sinks into the mud and is restrained, though it can use an action to end the restrained condition on itself by pulling itself free of the mud.\nIf you cast the spell on a ceiling, the mud falls. Any creature under the mud when it falls must make a Dexterity saving throw. A creature takes 4d8 bludgeoning damage on a failed save, or half as much damage on a successful one.\n**Transmute Mud to Rock.** Nonmagical mud or quicksand in the area no more than 10 feet deep transforms into soft stone for the spell's duration. Any creature in the mud when it transforms must make a Dexterity saving throw. On a successful save, a creature is shunted safely to the surface in an unoccupied space. On a failed save, a creature becomes restrained by the rock. A restrained creature, or another creature within reach, can use an action to try to break the rock by succeeding on a DC 20 Strength check or by dealing damage to it. The rock has AC 15 and 25 hit points, and it is immune to poison and psychic damage."
    },
    {
        "id": "tree-stride",
        "level": 5,
        "name": "Tree Stride",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered.\nYou can use this transportation ability only once on each of your turns. You must end each turn outside a tree.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-force",
        "level": 5,
        "name": "Wall of Force",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a shard of glass)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "An Invisible wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick and lasts for the duration. If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side).\nNothing can physically pass through the wall. It is immune to all damage and can't be dispelled by Dispel Magic. A Disintegrate spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane and blocks ethereal travel through the wall.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-light",
        "level": 5,
        "name": "Wall of Light",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a hand mirror)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "A shimmering wall of bright light appears at a point you choose within range. The wall appears in any orientation you choose: horizontally, vertically, or diagonally. It can be free floating, or it can rest on a solid surface. The wall can be up to 60 feet long, 10 feet high, and 5 feet thick. The wall blocks line of sight, but creatures and objects can pass through it. It emits bright light out to 120 feet and dim light for an additional 120 feet.\nWhen the wall appears, each creature in its area must make a Constitution saving throw. On a failed save, a creature takes 4d8 radiant damage, and it is blinded for 1 minute. On a successful save, it takes half as much damage and isn't blinded. A blinded creature can make a Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.\nA creature that ends its turn in the wall's area takes 4d8 radiant damage.\nUntil the spell ends, you can use an action to launch a beam of radiance from the wall at one creature you can see within 60 feet of it. Make a ranged spell attack. On a hit, the target takes 4d8 radiant damage. Whether you hit or miss, the wall's length is reduced by 10 feet. If the wall's length drops to 0 feet, the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
    },
    {
        "id": "wall-of-stone",
        "level": 5,
        "name": "Wall of Stone",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a cube of granite)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by10-foot panels. Each panel must be contiguous with another panel. Alternatively, you can create 10-footby-20-foot panels that are only 3 inches thick.\nIf the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its Reaction to move up to its Speed so that it is no longer enclosed by the wall.\nThe wall can have any shape you desire, though it can't occupy the same space as a creature or object. The wall doesn't need to be vertical or rest on a firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.\nIf you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create battlements and the like. The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 Hit Points per inch of thickness, and it has Immunity to Poison and Psychic damage. Reducing a panel to 0 Hit Points destroys it and might cause connected panels to collapse at the GM's discretion.\nIf you maintain your Concentration on this spell for its full duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the spell ends.",
        "source": "SRD 5.2"
    },
    {
        "id": "wrath-of-nature",
        "level": 5,
        "name": "Wrath Of Nature",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "ranger"
        ],
        "description": "You call out to the spirits of nature to rouse them against your enemies. Choose a point you can see within range. The spirits cause trees, rocks, and grasses in a 60-foot cube centered on that point to become animated until the spell ends.\n**Grasses and Undergrowth.** Any area of ground in the cube that is covered by grass or undergrowth is difficult terrain for your enemies.\n**Trees.** At the start of each of your turns, each of your enemies within 10 feet of any tree in the cube must succeed on a Dexterity saving throw or take 4d6 slashing damage from whipping branches.\n**Roots and Vines.** At the end of each of your turns, one creature of your choice that is on the ground in the cube must succeed on a Strength saving throw or become restrained until the spell ends. A restrained creature can use an action to make a Strength (Athletics) check against your spell save DC, ending the effect on itself on a success.\n**Rocks.** As a bonus action on your turn, you can cause a loose rock in the cube to launch at a creature you can see in the cube. Make a ranged spell attack against the target. On a hit, the target takes 3d8 nonmagical bludgeoning damage, and it must succeed on a Strength saving throw or fall prone."
    },
    {
        "id": "arcane-gate",
        "level": 6,
        "name": "Arcane Gate",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "500 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create linked teleportation portals that remain open for the duration. Choose two points on the ground that you can see, one within 10 feet of you and one within 500 feet of you. A circular portal, 10 feet in diameter, opens over each point. If the portal would open in the space occupied by a creature, the spell fails, and the casting is lost.\nThe portals are two-dimensional glowing rings filled with mist, hovering inches from the ground and perpendicular to it at the points you chose. A ring is visible only from one side (your choice), which is the side that functions as a portal.\nAny creature or object entering the portal exits from the other portal as if the two were adjacent to each other; passing through a portal from the nonportal side has no effect. The mist that fills each portal is opaque and blocks vision through it. On your turn, you can rotate the rings as a bonus action so that the active side faces in a different direction."
    },
    {
        "id": "blade-barrier",
        "level": 6,
        "name": "Blade Barrier",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric"
        ],
        "description": "You create a wall of whirling blades made of magical energy. The wall appears within range and lasts for the duration. You make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides Three-Quarters Cover, and its space is Difficult Terrain.\nAny creature in the wall's space makes a Dexterity saving throw, taking 6d10 Force damage on a failed save or half as much damage on a successful one. A creature also makes that save if it enters the wall's space or ends it turn there. A creature makes that save only once per turn.",
        "source": "SRD 5.2"
    },
    {
        "id": "bones-of-the-earth",
        "level": 6,
        "name": "Bones of the Earth",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid"
        ],
        "description": "You cause up to six pillars of stone to burst from places on the ground that you can see within range. Each pillar has a diameter of 5 feet and a height of up to 30 feet. The ground where a pillar appears must be wide enough for its diameter, and you can target the ground under a creature if that creature is Medium or smaller. Each pillar has AC 5 and 30 hit points. When reduced to 0 hit points, a pillar crumbles into rubble, which creates an area of difficult terrain with a 10-foot radius that lasts until the rubble is cleared. Each 5-foot-diameter portion of the area requires at least 1 minute to clear by hand.\nIf a pillar is created under a creature, that creature must succeed on a Dexterity saving throw or be lifted by the pillar. A creature can choose to fail the save.\nIf a pillar is prevented from reaching its full height because of a ceiling or other obstacle, a creature on the pillar takes 6d6 bludgeoning damage and is restrained, pinched between the pillar and the obstacle. The restrained creature can use an action to make a Strength or Dexterity check (the creature's choice) against the spell's save DC. On a success, the creature is no longer restrained and must either move off the pillar or fall off it."
    },
    {
        "id": "chain-lightning",
        "level": 6,
        "name": "Chain Lightning",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (three silver pins)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You launch a lightning bolt toward a target you can see within range. Three bolts then leap from that target to as many as three other targets of your choice, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.\nEach target makes a Dexterity saving throw, taking 10d8 Lightning damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. One additional bolt leaps from the first target to another target for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "circle-of-death",
        "level": 6,
        "name": "Circle of Death",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (the powder of a crushed black, pearl worth 500+ GP)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Negative energy ripples out in a 60-foot-radius Sphere from a point you choose within range. Each creature in that area makes a Constitution saving throw, taking 8d8 Necrotic damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage increases by 2d8 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-fey",
        "level": 6,
        "name": "Conjure Fey",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid"
        ],
        "description": "You conjure a Medium spirit from the Feywild in an unoccupied space you can see within range. The spirit lasts for the duration, and it looks like a Fey creature of your choice. When the spirit appears, you can make one melee spell attack against a creature within 5 feet of it. On a hit, the target takes Psychic damage equal to 3d12 plus your spellcasting ability modifier, and the target has the Frightened condition until the start of your next turn, with both you and the spirit as the source of the fear.\nAs a Bonus Action on your later turns, you can teleport the spirit to an unoccupied space you can see within 30 feet of the space it left and make the attack against a creature within 5 feet of it.\nUsing a Higher-Level Spell Slot. The damage increases by 1d12 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "contingency",
        "level": 6,
        "name": "Contingency",
        "school": "Abjuration",
        "castingTime": "10 minutes",
        "range": "Self",
        "components": "V, S, M (a gem-encrusted statuette of yourself worth 1,500+ GP)",
        "duration": "10 days",
        "classes": [
            "wizard"
        ],
        "description": "Choose a spell of level 5 or lower that you can cast, that has a casting time of an action, and that can target you. You cast that spell-called the contingent spell-as part of casting Contingency, expending spell slots for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain trigger occurs. You describe that trigger when you cast the two spells. For example, a Contingency cast with Water Breathing might stipulate that Water Breathing comes into effect when you are engulfed in water or a similar liquid.\nThe contingent spell takes effect immediately after the trigger occurs for the first time, whether or not you want it to, and then Contingency ends.\nThe contingent spell takes effect only on you, even if it can normally target others. You can use only one Contingency spell at a time. If you cast this spell again, the effect of another Contingency spell on you ends. Also, Contingency ends on you if its material component is ever not on your person.",
        "source": "SRD 5.2"
    },
    {
        "id": "create-homunculus",
        "level": 6,
        "name": "Create Homunculus",
        "school": "Transmutation",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (clay, ash, and mandrake root, all of which the spell consumes, and a jewel-encrusted dagger worth at least 1,000 gp)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "While speaking an intricate incantation, you cut yourself with a jewel-encrusted dagger, taking 2d4 piercing damage that can't be reduced in any way. You then drip your blood on the other components and touch them, transforming them into a special construct called a homunculus.\nThe statistics of the homunculus are in the Monster Manual. It is your faithful companion, and it dies if you die. Whenever you finish a long rest, you can spend up to half your Hit Dice if the homunculus is on the same plane of existence as you. When you do so, you roll each die and add your Constitution modifier to it. Your hit point maximum is reduced by the total, and the homunculus's hit point maximum and current hit points are both increased by it. This process can reduce you to 0 hit points, making you fall unconscious. The hit point reduction can't be removed as long as your homunculus exists, recovering instantly if it dies.\nYou can have only one homunculus at a time. If you cast this spell while your homunculus lives, the spell fails."
    },
    {
        "id": "create-undead",
        "level": 6,
        "name": "Create Undead",
        "school": "Necromancy",
        "castingTime": "1 minute",
        "range": "10 feet",
        "components": "V, S, M (one 150+ GP black onyx stone, for each corpse)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "warlock",
            "wizard"
        ],
        "description": "You can cast this spell only at night. Choose up to three corpses of Medium or Small Humanoids within range. Each one becomes a Ghoul under your control (see \"Monsters\" for its stat block).\nAs a Bonus Action on each of your turns, you can mentally command any creature you animated with this spell if the creature is within 120 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to them). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a particular place. If you issue no commands, the creature takes the Dodge action and moves only to avoid harm. Once given an order, the creature continues to follow the order until its task is complete.\nThe creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature before the current 24-hour period ends. This use of the spell reasserts your control over up to three creatures you have animated with this spell rather than animating new ones.\nUsing a Higher-Level Spell Slot. If you use a level 7 spell slot, you can animate or reassert control over four Ghouls. If you use a level 8 spell slot, you can animate or reassert control over five Ghouls or two Ghasts or Wights. If you use a level 9 spell slot, you can animate or reassert control over six Ghouls, three Ghasts or Wights, or two Mummies. See \"Monsters\" for these stat blocks.",
        "source": "SRD 5.2"
    },
    {
        "id": "disintegrate",
        "level": 6,
        "name": "Disintegrate",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a lodestone and dust)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You launch a green ray at a target you can see within range. The target can be a creature, a nonmagical object, or a creation of magical force, such as the wall created by Wall of Force.\nA creature targeted by this spell makes a Dexterity saving throw. On a failed save, the target takes 10d6 + 40 Force damage. If this damage reduces it to 0 Hit Points, it and everything nonmagical it is wearing and carrying are disintegrated into gray dust. The target can be revived only by a True Resurrection or a Wish spell.\nThis spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If such a target is Huge or larger, this spell disintegrates a 10-foot-Cube portion of it.\nUsing a Higher-Level Spell Slot. The damage increases by 3d6 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "drawmijs-instant-summons",
        "level": 6,
        "name": "Drawmij's Instant Summons",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (a sapphire worth 1,000+ GP)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "You touch the sapphire used in the casting and an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an Invisible mark on that object and invisibly inscribes the object's name on the sapphire. Each time you cast this spell, you must use a different sapphire.\nThereafter, you can take a Magic action to speak the object's name and crush the sapphire. The object instantly appears in your hand regardless of physical or planar distances, and the spell ends.\nIf another creature is holding or carrying the object, crushing the sapphire doesn't transport it, but instead you learn who that creature is and where that creature is currently located.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "druid-grove",
        "level": 6,
        "name": "Druid Grove",
        "school": "Abjuration",
        "castingTime": "10 minutes",
        "range": "Touch",
        "components": "V, S, M (mistletoe, which must be harvested with a golden sickle under the light of a full moon)",
        "duration": "24 hours",
        "classes": [
            "druid"
        ],
        "description": "You invoke the spirits of nature to protect an area outdoors or underground. The area can be as small as a 30-foot cube or as large as a 90-foot cube. Buildings and other structures are excluded from the spell's area.\nIf you cast this spell on the same area every day for a year, the spell lasts until dispelled.\nThe spell creates the following effects within the area. When you cast this spell, you can specify creatures as friends who are immune to the effects. You can also specify a password that, when spoken aloud, makes the speaker immune to these effects.\nThe entire guarded area radiates magic. A dispel magic cast on the area, if successful, removes only one of the following effects, not the entire area. That spell's caster chooses which effect to end. Only when all its effects are gone is this spell dispelled.\n**Solid Fog.** You can fill any number of 5-foot squares on the ground with thick fog, making them heavily obscured. The fog reaches 10 feet high. In addition, every foot of movement through the fog costs 2 feet. To a creature immune to this effect, the fog looks like a soft mist, with no decrement to speed or visibility.\n**Grasping Undergrowth.** You can fill any number of 5-foot squares on the ground that aren't filled with fog with grasping weeds and vines, as if they were affected by an entangle spell. To a creature immune to this effect, the weeds and vines feel soft and reshape themselves to serve as temporary seats or beds.\n**Grove Guardians.** You can animate up to four trees in the area, causing them to uproot themselves from the ground. These trees have the same statistics as an awakened tree, which appears in the Monster Manual, except they can't speak, and their bark is covered with druidic symbols. If any creature not immune to this effect enters the guarded area, the grove guardians attack until the creature leaves or is destroyed. The grove guardians share your initiative and can't leave the guarded area. When the spell ends, the trees return to their spots and take root."
    },
    {
        "id": "eyebite",
        "level": 6,
        "name": "Eyebite",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, your eyes become an inky void. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration.\nOn each of your turns until the spell ends, you can take a Magic action to target another creature but can't target a creature again if it has succeeded on a save against this casting of the spell.\nAsleep. The target has the Unconscious condition. It wakes up if it takes any damage or if another creature takes an action to shake it awake.\nPanicked. The target has the Frightened condition. On each of its turns, the Frightened target must take the Dash action and move away from you by the safest and shortest route available. If the target moves to a space at least 60 feet away from you where it can't see you, this effect ends. Sickened. The target has the Poisoned condition.",
        "source": "SRD 5.2"
    },
    {
        "id": "find-the-path",
        "level": 6,
        "name": "Find the Path",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M (a set of divination tools-such as cards or runes-worth 100+ GP)",
        "duration": "Concentration, up to 1 day",
        "classes": [
            "bard",
            "cleric",
            "druid"
        ],
        "description": "You magically sense the most direct physical route to a location you name. You must be familiar with the location, and the spell fails if you name a destination on another plane of existence, a moving destination (such as a mobile fortress), or an unspecific destination (such as \"a green dragon's lair\").\nFor the duration, as long as you are on the same plane of existence as the destination, you know how far it is and in what direction it lies. Whenever you face a choice of paths along the way there, you know which path is the most direct.",
        "source": "SRD 5.2"
    },
    {
        "id": "fizbans-platinum-shield",
        "level": 6,
        "name": "Fizban's Platinum Shield",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S, M (a platinum-plated dragon scale, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create a field of silvery light that surrounds a creature of your choice within range (you can choose yourself). The field sheds dim light out to 5 feet. While surrounded by the field, a creature gains the following benefits:\n**Cover.** The creature has half cover.\n**Damage Resistance.** The creature has resistance to acid, cold, fire, lightning, and poison damage.\n**Evasion.** If the creature is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creature instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."
    },
    {
        "id": "fizbans-platinum-shield-ua",
        "level": 6,
        "name": "Fizban's Platinum Shield (UA)",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S, M (a platinum-plated dragon scale, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You create a field of silvery light that surrounds a creature of your choice within range (you can choose yourself). The field sheds dim light out to 5 feet. While surrounded by the field, a creature gains the following benefits:\n**Cover.** The creature has half cover.\n**Damage Resistance.** The creature has resistance to acid, cold, fire, lightning, and poison damage.\n**Evasion.** If the creature is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the creature instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "flesh-to-stone",
        "level": 6,
        "name": "Flesh to Stone",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a cockatrice feather)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You attempt to turn one creature that you can see within range into stone. The target makes a Constitution saving throw. On a failed save, it has the Restrained condition for the duration. On a successful save, its Speed is 0 until the start of your next turn. Constructs automatically succeed on the save.\nA Restrained target makes another Constitution saving throw at the end of each of its turns. If it successfully saves against this spell three times, the spell ends. If it fails its saves three times, it is turned to stone and has the Petrified condition for the duration. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind.\nIf you maintain your Concentration on this spell for the entire possible duration, the target is Petrified until the condition is ended by Greater Restoration or similar magic.",
        "source": "SRD 5.2"
    },
    {
        "id": "forbiddance",
        "level": 6,
        "name": "Forbiddance",
        "school": "Abjuration",
        "castingTime": "10 minutes",
        "range": "Touch",
        "components": "V, S, M (ruby dust worth 1,000+ GP)",
        "duration": "1 day",
        "classes": [
            "cleric"
        ],
        "description": "You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can't teleport into the area or use portals, such as those created by the Gate spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, the Ethereal Plane, the Feywild, the Shadowfell, or the Plane Shift spell.\nIn addition, the spell damages types of creatures that you choose when you cast it. Choose one or more of the following: Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. When a creature of a chosen type enters the spell's area for the first time on a turn or ends its turn there, the creature takes 5d10 Radiant or Necrotic damage (your choice when you cast this spell).\nYou can designate a password when you cast the spell. A creature that speaks the password as it enters the area takes no damage from the spell.\nThe spell's area can't overlap with the area of another Forbiddance spell. If you cast Forbiddance every day for 30 days in the same location, the spell lasts until it is dispelled, and the Material components are consumed on the last casting.",
        "source": "SRD 5.2",
        "ritual": true
    },
    {
        "id": "globe-of-invulnerability",
        "level": 6,
        "name": "Globe of Invulnerability",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a glass bead)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "An immobile, shimmering barrier appears in a 10foot Emanation around you and remains for the duration.\nAny spell of level 5 or lower cast from outside the barrier can't affect anything within it. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from areas of effect created by such spells.\nUsing a Higher-Level Spell Slot. The barrier blocks spells of 1 level higher for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "gravity-fissure",
        "level": 6,
        "name": "Gravity Fissure",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self (100-foot line)",
        "components": "V, S, M (a fistful of iron filings)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You manifest a ravine of gravitational energy in a line originating from you that is 100 feet long and 5 feet wide. Each creature in that line must make a Constitution saving throw, taking 8d8 force damage on a failed save, or half as much damage on a successful one.\nEach creature within 10 feet of the line but not in it must succeed on a Constitution saving throw or take 8d8 force damage and be pulled toward the line until the creature is in its area.\n\nAt Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the damage increases by 1d8 for each slot level above 6th."
    },
    {
        "id": "guards-and-wards",
        "level": 6,
        "name": "Guards and Wards",
        "school": "Abjuration",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (a silver rod worth 10+ GP)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You create a ward that protects up to 2,500 square feet of floor space. The warded area can be up to 20 feet tall, and you shape it as one 50-foot square, one hundred 5-foot squares that are contiguous, or twenty-five 10-foot squares that are contiguous.\nWhen you cast this spell, you can specify individuals that are unaffected by the spell's effects. You can also specify a password that, when spoken aloud within 5 feet of the warded area, makes the speaker immune to its effects.\nThe spell creates the effects below within the warded area. Dispel Magic has no effect on Guards and Wards itself, but each of the following effects can be dispelled. If all four are dispelled, Guards and Wards ends. If you cast the spell every day for 365 days on the same area, the spell thereafter lasts until all its effects are dispelled.\nCorridors. Fog fills all the warded corridors, making them Heavily Obscured. In addition, at each intersection or branching passage offering a choice of direction, there is a 50 percent chance that a creature other than you believes it is going in the opposite direction from the one it chooses.\nDoors. All doors in the warded area are magically locked, as if sealed by the Arcane Lock spell. In addition, you can cover up to ten doors with an illusion to make them appear as plain sections of wall.\nStairs. Webs fill all stairs in the warded area from top to bottom, as in the Web spell. These strands regrow in 10 minutes if they are destroyed while Guards and Wards lasts.\nOther Spell Effect. Place one of the following magical effects within the warded area: • Dancing Lights in four corridors, with a simple program that the lights repeat as long as Guards and Wards lasts • Magic Mouth in two locations • Stinking Cloud in two locations (the vapors return within 10 minutes if dispersed while Guards and Wards lasts) • Gust of Wind in one corridor or room (the wind blows continuously while the spell lasts) • Suggestion in one 5-foot square; any creature that enters that square receives the suggestion mentally",
        "source": "SRD 5.2"
    },
    {
        "id": "harm",
        "level": 6,
        "name": "Harm",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You unleash virulent magic on a creature you can see within range. The target makes a Constitution saving throw. On a failed save, it takes 14d6 Necrotic damage, and its Hit Point maximum is reduced by an amount equal to the Necrotic damage it took. On a successful save, it takes half as much damage only. This spell can't reduce a target's Hit Point maximum below 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "heal",
        "level": 6,
        "name": "Heal",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "Choose a creature that you can see within range. Positive energy washes through the target, restoring 70 Hit Points. This spell also ends the Blinded, Deafened, and Poisoned conditions on the target.\nUsing a Higher-Level Spell Slot. The healing increases by 10 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "heroes-feast",
        "level": 6,
        "name": "Heroes' Feast",
        "school": "Conjuration",
        "castingTime": "10 minutes",
        "range": "Self",
        "components": "V, S, M (a gem-encrusted bowl worth 1,000+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric",
            "druid"
        ],
        "description": "You conjure a feast that appears on a surface in an unoccupied 10-foot Cube next to you. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don't set in until this hour is over. Up to twelve creatures can partake of the feast.\nA creature that partakes gains several benefits, which last for 24 hours. The creature has Resistance to Poison damage, and it has Immunity to the Frightened and Poisoned conditions. Its Hit Point maximum also increases by 2d10, and it gains the same number of Hit Points.",
        "source": "SRD 5.2"
    },
    {
        "id": "investiture-of-flame",
        "level": 6,
        "name": "Investiture of Flame",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Flames race across your body, shedding bright light in a 30-foot radius and dim light for an additional 30 feet for the spell's duration. The flames don't harm you. Until the spell ends, you gain the following benefits:\n- You are immune to fire damage and have resistance to cold damage.\n- Any creature that moves within 5 feet of you for the first time on a turn or ends its turn there takes 1d10 fire damage.\n- You can use your action to create a line of fire 15 feet long and 5 feet wide extending from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 4d8 fire damage on a failed save, or half as much damage on a successful one."
    },
    {
        "id": "investiture-of-ice",
        "level": 6,
        "name": "Investiture of Ice",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Ice rimes your body, shedding dim light in a 10-foot radius. The ice doesn't harm you. Until the spell ends, you gain the following benefits:\n- You are immune to cold damage and have resistance to fire damage.\n- You can move across difficult terrain created by ice or snow without spending extra movement.\n- The ground in a 10-foot radius around you becomes icy and is difficult terrain for creatures other than you. The radius moves with you.\n- You can use your action to create a 15-foot cone of freezing wind extending from your outstretched hand in a direction you choose. Each creature in the cone must make a Constitution saving throw. A creature takes 4d6 cold damage on a failed save, or half as much damage on a successful one. A creature that fails its save also has its speed halved until the start of your next turn."
    },
    {
        "id": "investiture-of-stone",
        "level": 6,
        "name": "Investiture of Stone",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Bits of rock spread across your body, and you gain the following benefits:\n- You have resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.\n- You can use your action to create a small earthquake on the ground in a 15-foot radius centered on you. Other creatures on that ground must succeed on a Dexterity saving throw or be knocked prone.\n- You can move across difficult terrain made of earth or stone without spending extra movement. You can move through solid earth or stone as if it was air and without destabilizing it, but you can't end your movement there. If you do, you are ejected to the nearest unoccupied space, the spell ends, and you are stunned until the end of your next turn."
    },
    {
        "id": "investiture-of-wind",
        "level": 6,
        "name": "Investiture of Wind",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Until the spell ends, wind whirls around you, and you gain the following benefits:\n- Ranged weapon attacks made against you have disadvantage on the attack roll.\n- You gain a flying speed of 60 feet. If you are still flying when the spell ends, you fall, unless you can somehow prevent it.\n- You can use your action to create a 15-foot cube of swirling wind centered on a point you can see within 60 feet of you. Each creature in that area must make a Constitution saving throw. A creature takes 2d10 bludgeoning damage on a failed save, or half as much damage on a successful one. A Large or smaller creature that fails the save is also pushed up to 10 feet away from the center of the cube."
    },
    {
        "id": "magic-jar",
        "level": 6,
        "name": "Magic Jar",
        "school": "Necromancy",
        "castingTime": "1 minute",
        "range": "Self",
        "components": "V, S, M (a gem, crystal, or reliquary worth, 500+ GP)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell's Material component. While your soul inhabits the container, you are aware of your surroundings as if you were in the container's space. You can't move or take Reactions. The only action you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a Humanoid's body.\nYou can attempt to possess any Humanoid within 100 feet of you that you can see (creatures warded by a Protection from Evil and Good or Magic Circle spell can't be possessed). The target makes a Charisma saving throw. On a failed save, your soul enters the target's body, and the target's soul becomes trapped in the container. On a successful save, the target resists your efforts to possess it, and you can't attempt to possess it again for 24 hours.\nOnce you possess a creature's body, you control it. Your Hit Points, Hit Point Dice, Strength, Dexterity, Constitution, Speed, and senses are replaced by the creature's. You otherwise keep your game statistics.\nMeanwhile, the possessed creature's soul can perceive from the container using its own senses, but it can't move and it is Incapacitated.\nWhile possessing a body, you can take a Magic action to return from the host body to the container if it is within 100 feet of you, returning the host creature's soul to its body. If the host body dies while you're in it, the creature dies, and you make a Charisma saving throw against your own spellcasting DC. On a success, you return to the container if it is within 100 feet of you. Otherwise, you die.\nIf the container is destroyed or the spell ends, your soul returns to your body. If your body is more than 100 feet away from you or if your body is dead, you die. If another creature's soul is in the container when it is destroyed, the creature's soul returns to its body if the body is alive and within 100 feet. Otherwise, that creature dies. When the spell ends, the container is destroyed.",
        "source": "SRD 5.2"
    },
    {
        "id": "mass-suggestion",
        "level": 6,
        "name": "Mass Suggestion",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, M (a snake's tongue)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You suggest a course of activity-described in no more than 25 words-to twelve or fewer creatures you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to any of the targets or their allies. For example, you could say, \"Walk to the village down that road, and help the villagers there harvest crops until sunset.\" Or you could say, \"Now is not the time for violence. Drop your weapons, and dance! Stop in an hour.\"\nEach target must succeed on a Wisdom saving throw or have the Charmed condition for the duration or until you or your allies deal damage to the target. Each Charmed target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for a target upon completing it.\nUsing a Higher-Level Spell Slot. The duration is longer with a spell slot of level 7 (10 days), 8 (30 days), or 9 (366 days).",
        "source": "SRD 5.2"
    },
    {
        "id": "mental-prison",
        "level": 6,
        "name": "Mental Prison",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You attempt to bind a creature within an illusory cell that only it perceives. One creature you can see within range must make an Intelligence saving throw. The target succeeds automatically if it is immune to being charmed.\nOn a successful save, the target takes 5d10 psychic damage, and the spell ends.\nOn a failed save, the target takes 5d10 psychic damage, and you make the area immediately around the target's space appear dangerous to it in some way. You might cause the target to perceive itself as being surrounded by fire, floating razors, or hideous maws filled with dripping teeth. Whatever form the illusion takes, the target can't see or hear anything beyond it and is restrained for the spell's duration.\nIf the target is moved out of the illusion, makes a melee attack through it, or reaches any part of its body through it, the target takes 10d10 psychic damage, and the spell ends."
    },
    {
        "id": "move-earth",
        "level": 6,
        "name": "Move Earth",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a miniature shovel)",
        "duration": "Concentration, up to 2 hours",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. For example, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutes for these changes to complete. Because the terrain's transformation occurs slowly, creatures in the area can't usually be trapped or injured by the ground's movement.\nAt the end of every 10 minutes you spend concentrating on the spell, you can choose a new area of terrain to affect within range.\nThis spell can't manipulate natural stone or stone construction. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse.\nSimilarly, this spell doesn't directly affect plant growth. The moved earth carries any plants along with it.",
        "source": "SRD 5.2"
    },
    {
        "id": "otherworldly-form-ua",
        "level": 6,
        "name": "Otherworldly Form (UA)",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (an object engraved with a symbol of the Outer Planes, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Drawing on the magic of the Lower Planes or Upper Planes, you transform yourself. You choose Lower Planes or Upper Planes as the source of your transformation. Regardless of your choice, you gain the following benefits:\n- Spectral wings appear on your back, giving you a flying speed of 40 feet.\n- You gain a +2 bonus to AC.\n- All your weapon attacks are magical. When you make a weapon attack, you can use your spellcasting ability modifier, instead of Strength or Dexterity, for the attack and damage rolls.\n- You can attack twice, instead of once, when you take the Attack action on your turn. You ignore this benefit if you already have a feature, like Extra Attack, that gives you more than one attack.\n\n**Lower Planes.** You gain the following benefits:\n- You have immunity to fire and poison damage.\n- You have immunity to the poisoned condition.\n\n**Upper Planes.** You gain the following benefits:\n- You have immunity to radiant and necrotic damage.\n- You have immunity to the charmed condition.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "otilukes-freezing-sphere",
        "level": 6,
        "name": "Otiluke's Freezing Sphere",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, S, M (a miniature crystal sphere)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A frigid globe streaks from you to a point of your choice within range, where it explodes in a 60-foot-radius Sphere. Each creature in that area makes a Constitution saving throw, taking 10d6 Cold damage on failed save or half as much damage on a successful one.\nIf the globe strikes a body of water, it freezes the water to a depth of 6 inches over an area 30 feet square. This ice lasts for 1 minute. Creatures that were swimming on the surface of frozen water are trapped in the ice and have the Restrained condition. A trapped creature can take an action to make a Strength (Athletics) check against your spell save DC to break free.\nYou can refrain from firing the globe after completing the spell's casting. If you do so, a globe about the size of a sling bullet, cool to the touch, appears in your hand. At any time, you or a creature you give the globe to can throw the globe (to a range of 40 feet) or hurl it with a sling (to the sling's normal range). It shatters on impact, with the same effect as a normal casting of the spell. You can also set the globe down without shattering it. After 1 minute, if the globe hasn't already shattered, it explodes.\nUsing a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "ottos-irresistible-dance",
        "level": 6,
        "name": "Otto's Irresistible Dance",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "One creature that you can see within range must make a Wisdom saving throw. On a successful save, the target dances comically until the end of its next turn, during which it must spend all its movement to dance in place.\nOn a failed save, the target has the Charmed condition for the duration. While Charmed, the target dances comically, must use all its movement to dance in place, and has Disadvantage on Dexterity saving throws and attack rolls, and other creatures have Advantage on attack rolls against it. On each of its turns, the target can take an action to collect itself and repeat the save, ending the spell on itself on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "planar-ally",
        "level": 6,
        "name": "Planar Ally",
        "school": "Conjuration",
        "castingTime": "10 minutes",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You beseech an otherworldly entity for aid. The being must be known to you: a god, a demon prince, or some other being of cosmic power. That entity sends a Celestial, an Elemental, or a Fiend loyal to it to aid you, making the creature appear in an unoccupied space within range. If you know a specific creature's name, you can speak that name when you cast this spell to request that creature, though you might get a different creature anyway (GM's choice).\nWhen the creature appears, it is under no compulsion to behave a particular way. You can ask it to perform a service in exchange for payment, but it isn't obliged to do so. The requested task could range from simple (fly us across the chasm, or help us fight a battle) to complex (spy on our enemies, or protect us during our foray into the dungeon). You must be able to communicate with the creature to bargain for its services.\nPayment can take a variety of forms. A Celestial might require a sizable donation of gold or magic items to an allied temple, while a Fiend might demand a living sacrifice or a gift of treasure. Some creatures might exchange their service for a quest undertaken by you.\nA task that can be measured in minutes requires a payment worth 100 GP per minute. A task measured in hours requires 1,000 GP per hour. And a task measured in days (up to 10 days) requires 10,000 GP per day. The GM can adjust these payments based on the circumstances under which you cast the spell. If the task is aligned with the creature's ethos, the payment might be halved or even waived. Nonhazardous tasks typically require only half the suggested payment, while especially dangerous tasks might require a greater gift. Creatures rarely accept tasks that seem suicidal.\nAfter the creature completes the task, or when the agreed-upon duration of service expires, the creature returns to its home plane after reporting back to you if possible. If you are unable to agree on a price for the creature's service, the creature immediately returns to its home plane.",
        "source": "SRD 5.2"
    },
    {
        "id": "primordial-ward",
        "level": 6,
        "name": "Primordial Ward",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid"
        ],
        "description": "You have resistance to acid, cold, fire, lightning, and thunder damage for the spell's duration.\nWhen you take damage of one of those types, you can use your reaction to gain immunity to that type of damage, including against the triggering damage. If you do, the resistances end, and you have that immunity for 1 minute or until you are incapacitated."
    },
    {
        "id": "programmed-illusion",
        "level": 6,
        "name": "Programmed Illusion",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (jade dust worth 25+ GP)",
        "duration": "Until dispelled",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You create an illusion of an object, a creature, or some other visible phenomenon within range that activates when a specific trigger occurs. The illusion is imperceptible until then. It must be no larger than a 30-foot Cube, and you decide when you cast the spell how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutes.\nWhen the trigger you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutes, after which the illusion can be activated again.\nThe trigger can be as general or as detailed as you like, though it must be based on visual or audible phenomena that occur within 30 feet of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door.\nPhysical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the Study action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.",
        "source": "SRD 5.2"
    },
    {
        "id": "psychic-crush-ua",
        "level": 6,
        "name": "Psychic Crush (UA)",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You overload the mind of one creature you can see within range with a crushing weight of discordant emotions. The target must make an Intelligence saving throw. On a failed save, the target takes 12d6 psychic damage and is stunned for 1 minute. On a successful save, the target takes half as much damage and isn't stunned.\nA stunned target can make an Intelligence saving throw at the end of each of its turns. On a successful save, the spell ends on the target.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "scatter",
        "level": 6,
        "name": "Scatter",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "The air quivers around up to five creatures of your choice that you can see within range. An unwilling creature must make a Wisdom saving throw to resist this spell's effect. An unwilling creature can also make this saving throw if it is immune to being charmed. A creature automatically succeeds if it is immune to being frightened. You teleport each affected target to an unoccupied space that you can see within 120 feet of you. That space must be on the ground or on a floor."
    },
    {
        "id": "soul-cage",
        "level": 6,
        "name": "Soul Cage",
        "school": "Necromancy",
        "castingTime": "1 reaction, which you take when a humanoid you can see within 60 feet of you dies",
        "range": "60 feet",
        "components": "V, S, M (a tiny silver cage worth 100 gp)",
        "duration": "8 hours",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "This spell snatches the soul of a humanoid as it dies and traps it in the tiny cage you use for the material component. A stolen soul remains inside the cage until the spell ends, until the cage is destroyed, or until you use an action to break the cage, which ends the spell. While you have a soul inside the cage, you can exploit it in any of the ways described below. You can use a trapped soul up to six times. Once you exploit a soul for the sixth time, it is released, and the spell ends. While a soul is trapped, the dead humanoid it came from can't be revived.\n**Steal Life.** You can use a bonus action to drain vigor from the soul and regain 2d8 hit points.\n**Query Soul.** You ask the soul a question (no action required) and receive a brief telepathic answer, which you can understand regardless of the language used. The soul knows only what it knew in life, but it must answer you truthfully and to the best of its ability. The answer is no more than a sentence or two and might be cryptic.\n**Borrow Experience.** You can use a bonus action to bolster yourself with the soul's life experience, making your next attack roll, ability check, or saving throw with advantage. If you don't use this benefit before the start of your next turn, it is lost.\n**Eyes of the Dead.** You can use an action to name a place the humanoid saw in life, which creates an invisible sensor somewhere in that place if it is on the plane of existence you're currently on. The sensor remains for as long as you concentrate, up to 10 minutes (as if you were concentrating on a spell). You receive visual and auditory information from the sensor as if you were in its space using your senses.\nA creature that can see the sensor (such as one using see invisibility or truesight) sees a translucent image of the tormented humanoid whose soul you stole."
    },
    {
        "id": "summon-fiend",
        "level": 6,
        "name": "Summon Fiend",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (humanoid blood inside a ruby vial worth at least 600 gp)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You call forth a fiendish spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Fiendish Spirit stat block. When you cast the spell, choose Demon, Devil, or Yugoloth. The creature resembles a fiend of the chosen type, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your spellcasting ability modifier. If you don't issue any commands, the creature defends itself from hostile creatures but otherwise takes no actions.\n\nAt Higher Levels. When you cast this spell using a spell slot of 7th level or higher, use the higher level wherever the spell's level appears in the stat block."
    },
    {
        "id": "sunbeam",
        "level": 6,
        "name": "Sunbeam",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a magnifying glass)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You launch a sunbeam in a 5-foot-wide, 60-foot-long Line. Each creature in the Line makes a Constitution saving throw. On a failed save, a creature takes 6d8 Radiant damage and has the Blinded condition until the start of your next turn. On a successful save, it takes half as much damage only.\nUntil the spell ends, you can take a Magic action to create a new Line of radiance.\nFor the duration, a mote of brilliant radiance shines above you. It sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. This light is sunlight.",
        "source": "SRD 5.2"
    },
    {
        "id": "tashas-otherworldly-guise",
        "level": 6,
        "name": "Tasha's Otherworldly Guise",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (an object engraved with a symbol of the Outer Planes, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Drawing on the magic of the Lower Planes or Upper Planes, you transform yourself. You choose Lower Planes or Upper Planes as the source of your transformation. Regardless of your choice, you gain the following benefits:\n- Spectral wings appear on your back, giving you a flying speed of 40 feet.\n- You gain a +2 bonus to AC.\n- All your weapon attacks are magical. When you make a weapon attack, you can use your spellcasting ability modifier, instead of Strength or Dexterity, for the attack and damage rolls.\n- You can attack twice, instead of once, when you take the Attack action on your turn. You ignore this benefit if you already have a feature, like Extra Attack, that gives you more than one attack.\n\n**Lower Planes.** You gain the following benefits:\n- You have immunity to fire and poison damage.\n- You have immunity to the poisoned condition.\n\n**Upper Planes.** You gain the following benefits:\n- You have immunity to radiant and necrotic damage.\n- You have immunity to the charmed condition."
    },
    {
        "id": "tensers-transformation",
        "level": 6,
        "name": "Tenser's Transformation",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a few hairs from a bull)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "You endow yourself with endurance and martial prowess fueled by magic. Until the spell ends, you can't cast spells, and you gain the following benefits:\n- You gain 50 temporary hit points. If any of these remain when the spell ends, they are lost.\n- You have advantage on attack rolls that you make with simple and martial weapons.\n- When you hit a target with a weapon attack, that target takes an extra 2d12 force damage.\n- You have proficiency with all armor, shields, simple weapons, and martial weapons.\n- You have proficiency in Strength and Constitution saving throws.\n- You can attack twice, instead of once, when you take the Attack action on your turn. You ignore this benefit if you already have a feature, like Extra Attack, that gives you more than one attack.\nYou can end the spell early by using a bonus action to do so.\nWhen the spell ends, you must succeed on a DC 15 Constitution saving throw or suffer one level of exhaustion."
    },
    {
        "id": "transport-via-plants",
        "level": 6,
        "name": "Transport via Plants",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V, S",
        "duration": "1 minute",
        "classes": [
            "druid"
        ],
        "description": "This spell creates a magical link between a Large or larger inanimate plant within range and another plant, at any distance, on the same plane of existence. You must have seen or touched the destination plant at least once before. For the duration, any creature can step into the target plant and exit from the destination plant by using 5 feet of movement.",
        "source": "SRD 5.2"
    },
    {
        "id": "true-seeing",
        "level": 6,
        "name": "True Seeing",
        "school": "Divination",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (mushroom powder worth 25+, GP, which the spell consumes)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "For the duration, the willing creature you touch has Truesight with a range of 120 feet.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-ice",
        "level": 6,
        "name": "Wall of Ice",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a piece of quartz)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "You create a wall of ice on a solid surface within range. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-square panels. Each panel must be contiguous with another panel. In any form, the wall is 1 foot thick and lasts for the duration.\nIf the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side) and makes a Dexterity saving throw, taking 10d6 Cold damage on a failed save or half as much damage on a successful one.\nThe wall is an object that can be damaged and thus breached. It has AC 12 and 30 Hit Points per 10-foot section, and it has Immunity to Cold, Poison, and Psychic damage and Vulnerability to Fire damage. Reducing a 10-foot section of wall to 0 Hit Points destroys it and leaves behind a sheet of frigid air in the space the wall occupied.\nA creature moving through the sheet of frigid air for the first time on a turn makes a Constitution saving throw, taking 5d6 Cold damage on a failed save or half as much damage on a successful one.\nUsing a Higher-Level Spell Slot. The damage the wall deals when it appears increases by 2d6 and the damage from passing through the sheet of frigid air increases by 1d6 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "wall-of-thorns",
        "level": 6,
        "name": "Wall of Thorns",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a handful of thorns)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "druid"
        ],
        "description": "You create a wall of tangled brush bristling with needle-sharp thorns. The wall appears within range on a solid surface and lasts for the duration. You choose to make the wall up to 60 feet long, 10 feet high, and 5 feet thick or a circle that has a 20-foot diameter and is up to 20 feet high and 5 feet thick. The wall blocks line of sight.\nWhen the wall appears, each creature in its area makes a Dexterity saving throw, taking 7d8 Piercing damage on a failed save or half as much damage on a successful one.\nA creature can move through the wall, albeit slowly and painfully. For every 1 foot a creature moves through the wall, it must spend 4 feet of movement. Furthermore, the first time a creature enters a space in the wall on a turn or ends its turn there, the creature makes a Dexterity saving throw, taking 7d8 Slashing damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. Both types of damage increase by 1d8 for each spell slot level above 6.",
        "source": "SRD 5.2"
    },
    {
        "id": "wind-walk",
        "level": 6,
        "name": "Wind Walk",
        "school": "Transmutation",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S, M (a candle)",
        "duration": "8 hours",
        "classes": [
            "druid"
        ],
        "description": "You and up to ten willing creatures of your choice within range assume gaseous forms for the duration, appearing as wisps of cloud. While in this cloud form, a target has a Fly Speed of 300 feet and can hover; it has Immunity to the Prone condition; and it has Resistance to Bludgeoning, Piercing, and Slashing damage. The only actions a target can take in this form are the Dash action or a Magic action to begin reverting to its normal form. Reverting takes 1 minute, during which the target has the Stunned condition. Until the spell ends, the target can revert to cloud form, which also requires a Magic action followed by a 1-minute transformation.\nIf a target is in cloud form and flying when the effect ends, the target descends 60 feet per round for 1 minute until it lands, which it does safely. If it can't land after 1 minute, it falls the remaining distance.",
        "source": "SRD 5.2"
    },
    {
        "id": "word-of-recall",
        "level": 6,
        "name": "Word of Recall",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "5 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect.\nYou must designate a location, such as a temple, as a sanctuary by casting this spell there.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-celestial",
        "level": 7,
        "name": "Conjure Celestial",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "cleric"
        ],
        "description": "You conjure a spirit from the Upper Planes, which manifests as a pillar of light in a 10-foot-radius, 40-foot-high Cylinder centered on a point within range. For each creature you can see in the Cylinder, choose which of these lights shines on it: Healing Light. The target regains Hit Points equal to 4d12 plus your spellcasting ability modifier. Searing Light. The target makes a Dexterity saving throw, taking 6d12 Radiant damage on a failed save or half as much damage on a successful one. Until the spell ends, Bright Light fills the Cylinder, and when you move on your turn, you can also move the Cylinder up to 30 feet.\nWhenever the Cylinder moves into the space of a creature you can see and whenever a creature you can see enters the Cylinder or ends its turn there, you can bathe it in one of the lights. A creature can be affected by this spell only once per turn.\nUsing a Higher-Level Spell Slot. The healing and damage increase by 1d12 for each spell slot level above 7.",
        "source": "SRD 5.2"
    },
    {
        "id": "conjure-hezrou-ua",
        "level": 7,
        "name": "Conjure Hezrou (UA)",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (food worth at least 100 gp, which the spell consumes)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You summon a hezrou that appears in an unoccupied space you can see within range. The hezrou disappears when it drops to 0 hit points or when the spell ends.\nThe hezrou's attitude depends on the value of the food used as a material component for this spell. Roll initiative for the hezrou, which has its own turns. At the start of the hezrou's turn, the DM makes a secret Charisma check on your behalf, with a bonus equal to the food's value divided by 20. The check DC starts at 10 and increases by 2 each round. You can issue orders to the hezrou and have it obey you as long as you succeed on the Charisma check.\nIf the check fails, the spell no longer requires concentration and the hezrou is no longer under your control. The hezrou takes no actions on its next turn and then uses its remaining movement to move in the most direct route toward the nearest creature other than you and attacks it. The hezrou continues to behave in this manner until the spell ends.\nAs part of casting the spell, you can scribe a circle on the ground using the blood of an intelligent humanoid slain within the past 24 hours. The circle is large enough to encompass your space. The summoned hezrou cannot cross this circle or target anyone within it while the spell lasts.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "create-magen",
        "level": 7,
        "name": "Create Magen",
        "school": "Transmutation",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (a vial of quicksilver worth 500 gp and a life-sized human doll, both of which the spell consumes, and an intricate crystal rod worth at least 1,500 gp that is not consumed)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "While casting this spell, you place a vial of quicksilver in the chest cavity of a life-sized human doll stuffed with ash or dust. You then stitch up the doll and drip your blood on it. At the end of the casting, you tap the doll with a crystal rod, transforming it into a magen clothed in whatever the doll was wearing. The type of magen is chosen when you cast the spell. See the Monster Manual for statistics.\nWhen the magen appears, your hit point maximum decreases by an amount equal to the magen's challenge rating (minimum reduction of 1). Only a wish spell can reverse this reduction to your hit point maximum.\nAny magen you create with this spell obeys your commands without question."
    },
    {
        "id": "crown-of-stars",
        "level": 7,
        "name": "Crown of Stars",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "Seven star-like motes of light appear and orbit your head until the spell ends. You can use a bonus action to send one of the motes streaking toward one creature or object within 120 feet of you. When you do so, make a ranged spell attack. On a hit, the target takes 4d12 radiant damage. Whether you hit or miss, the mote is expended. The spell ends early if you expend the last mote.\nIf you have four or more motes remaining, they shed bright light in a 30-foot radius and dim light for an additional 30 feet. If you have one to three motes remaining, they shed dim light in a 30-foot radius.\n\nAt Higher Levels. When you cast this spell using a spell slot of 8th level or higher, the number of motes created increases by two for each slot level above 7th."
    },
    {
        "id": "delayed-blast-fireball",
        "level": 7,
        "name": "Delayed Blast Fireball",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a ball of bat guano and sulfur)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "A beam of yellow light flashes from you, then condenses at a chosen point within range as a glowing bead for the duration. When the spell ends, the bead explodes, and each creature in a 20-foot-radius Sphere centered on that point makes a Dexterity saving throw. A creature takes Fire damage equal to the total accumulated damage on a failed save or half as much damage on a successful one.\nThe spell's base damage is 12d6, and the damage increases by 1d6 whenever your turn ends and the spell hasn't ended.\nIf a creature touches the glowing bead before the spell ends, that creature makes a Dexterity saving throw. On a failed save, the spell ends, causing the bead to explode. On a successful save, the creature can throw the bead up to 40 feet. If the thrown bead enters a creature's space or collides with a solid object, the spell ends, and the bead explodes.\nWhen the bead explodes, flammable objects in the explosion that aren't being worn or carried start burning.\nUsing a Higher-Level Spell Slot. The base damage increases by 1d6 for each spell slot level above 7.",
        "source": "SRD 5.2"
    },
    {
        "id": "divine-word",
        "level": 7,
        "name": "Divine Word",
        "school": "Evocation",
        "castingTime": "1 bonus action",
        "range": "30 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "You utter a word imbued with power from the Upper Planes. Each creature of your choice in range makes a Charisma saving throw. On a failed save, a target that has 50 Hit Points or fewer suffers an effect based on its current Hit Points, as shown in the Divine Word Effects table. Regardless of its Hit Points, a Celestial, an Elemental, a Fey, or a Fiend target that fails its save is forced back to its plane of origin (if it isn't there already) and can't return to the current plane for 24 hours by any means short of a Wish spell.\nDivine Word Effects | Hit Points Effect\n0-20 | The target dies.\n21-30 | The target has the Blinded, Deafened, and Stunned conditions for 1 hour.\n41-50 | The target has the Deafened condition for 1 minute.",
        "source": "SRD 5.2"
    },
    {
        "id": "draconic-transformation",
        "level": 7,
        "name": "Draconic Transformation",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (a statuette of a dragon, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "With a roar, you draw on the magic of dragons to transform yourself, taking on draconic features. You gain the following benefits until the spell ends:\n- You have blindsight with a range of 30 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. You can also see invisible creatures and objects, and you can see into the Ethereal Plane. Additionally, you can spot things that are invisible to others.\n- When you cast this spell, and as a bonus action on subsequent turns, you can exhale a shimmering energy in a 60-foot cone. Each creature in that area must make a Dexterity saving throw, taking 6d8 force damage on a failed save, or half as much damage on a successful one.\n- You have a flying speed of 60 feet, and you can hover."
    },
    {
        "id": "draconic-transformation-ua",
        "level": 7,
        "name": "Draconic Transformation (UA)",
        "school": "Transmutation",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S, M (a statuette of a dragon, worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "With a roar, you draw on the magic of dragons to transform yourself, taking on draconic features. You gain the following benefits until the spell ends:\n- You have blindsight with a range of 30 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. You can also see invisible creatures and objects, and you can see into the Ethereal Plane. Additionally, you can spot things that are invisible to others.\n- When you cast this spell, and as a bonus action on subsequent turns, you can exhale a shimmering energy in a 60-foot cone. Each creature in that area must make a Dexterity saving throw, taking 6d8 force damage on a failed save, or half as much damage on a successful one.\n- You have a flying speed of 60 feet, and you can hover.",
        "legacy": true,
        "source": "Unearthed Arcana (playtest)"
    },
    {
        "id": "dream-of-the-blue-veil",
        "level": 7,
        "name": "Dream of the Blue Veil",
        "school": "Conjuration",
        "castingTime": "6 hours",
        "range": "20 feet",
        "components": "V, S, M (a magic item or a willing creature from the destination world)",
        "duration": "6 hours",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You and up to eight willing creatures within range fall unconscious for the spell's duration and experience visions of another world on the Material Plane, such as Oerth, Toril, Krynn, or Eberron. If the spell reaches its full duration, the visions conclude with each of you encountering and then pulling aside a mysterious blue veil. When you do so, you and the affected creatures are transported to the world that was in the visions.\nTo cast this spell, you must have a magic item that originated on the world you wish to reach, and you must be aware of the world's existence, even if you don't know the world's name. Your destination in the other world is a safe location within 1 mile of where the magic item was created. Alternatively, you can cast the spell if one of the affected creatures is a native of the world you wish to reach, which causes your destination to be a safe location within 1 mile of where that creature was born.\nThe spell ends early on a creature if that creature takes any damage, and the creature isn't transported. If you take damage, the spell ends for you and all the other creatures, with none of you being transported."
    },
    {
        "id": "etherealness",
        "level": 7,
        "name": "Etherealness",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Up to 8 hours",
        "classes": [
            "bard",
            "cleric",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You step into the border regions of the Ethereal Plane, where it overlaps with your current plane. You remain in the Border Ethereal for the duration. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can perceive the plane you left, which looks gray, and you can't see anything there more than 60 feet away.\nWhile on the Ethereal Plane, you can affect and be affected only by creatures, objects, and effects on that plane. Creatures that aren't on the Ethereal Plane can't perceive or interact with you unless a feature gives them the ability to do so.\nWhen the spell ends, you return to the plane you left in the spot that corresponds to your space in the Border Ethereal. If you appear in an occupied space, you are shunted to the nearest unoccupied space and take Force damage equal to twice the number of feet you are moved.\nThis spell ends instantly if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes.\nUsing a Higher-Level Spell Slot. You can target up to three willing creatures (including yourself) for each spell slot level above 7. The creatures must be within 10 feet of you when you cast the spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "finger-of-death",
        "level": 7,
        "name": "Finger of Death",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You unleash negative energy toward a creature you can see within range. The target makes a Constitution saving throw, taking 7d8 + 30 Necrotic damage on a failed save or half as much damage on a successful one.\nA Humanoid killed by this spell rises at the start of your next turn as a Zombie (see \"Monsters\") that follows your verbal orders.",
        "source": "SRD 5.2"
    },
    {
        "id": "fire-storm",
        "level": 7,
        "name": "Fire Storm",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "sorcerer"
        ],
        "description": "A storm of fire appears within range. The area of the storm consists of up to ten 10-foot Cubes, which you arrange as you like. Each Cube must be contiguous with at least one other Cube. Each creature in the area makes a Dexterity saving throw, taking 7d10 Fire damage on a failed save or half as much damage on a successful one.\nFlammable objects in the area that aren't being worn or carried start burning.",
        "source": "SRD 5.2"
    },
    {
        "id": "forcecage",
        "level": 7,
        "name": "Forcecage",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "100 feet",
        "components": "V, S, M (ruby dust worth 1,500+ GP,, which the spell consumes)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "An immobile, Invisible, Cube-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box, as you choose.\nA prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2 inch apart. A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.\nWhen you cast the spell, any creature that is completely inside the cage's area is trapped. Creatures only partially within the area, or those too large to fit inside it, are pushed away from the center of the area until they are completely outside it.\nA creature inside the cage can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave, it must first make a Charisma saving throw. On a successful save, the creature can use that magic to exit the cage. On a failed save, the creature doesn't exit the cage and wastes the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel. This spell can't be dispelled by Dispel Magic.",
        "source": "SRD 5.2"
    },
    {
        "id": "mirage-arcane",
        "level": 7,
        "name": "Mirage Arcane",
        "school": "Illusion",
        "castingTime": "10 minutes",
        "range": "Sight",
        "components": "V, S",
        "duration": "10 days",
        "classes": [
            "bard",
            "druid",
            "wizard"
        ],
        "description": "You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other rough or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road.\nSimilarly, you can alter the appearance of structures or add them where none are present. The spell doesn't disguise, conceal, or add creatures.\nThe illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into Difficult Terrain (or vice versa) or otherwise impede movement through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately.\nCreatures with Truesight can see through the illusion to the terrain's true form; however, all other elements of the illusion remain, so while the creature is aware of the illusion's presence, the creature can still physically interact with the illusion.",
        "source": "SRD 5.2"
    },
    {
        "id": "mordenkainens-magnificent-mansion",
        "level": 7,
        "name": "Mordenkainen's Magnificent Mansion",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "300 feet",
        "components": "V, S, M (a miniature door worth 15+ GP)",
        "duration": "24 hours",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You conjure a shimmering door in range that lasts for the duration. The door leads to an extradimensional dwelling and is 5 feet wide and 10 feet tall. You and any creature you designate when you cast the spell can enter the extradimensional dwelling as long as the door remains open. You can open or close it (no action required) if you are within 30 feet of it. While closed, the door is imperceptible.\nBeyond the door is a magnificent foyer with numerous chambers beyond. The dwelling's atmosphere is clean, fresh, and warm.\nYou can create any floor plan you like for the dwelling, but it can't exceed 50 contiguous 10-foot Cubes. The place is furnished and decorated as you choose. It contains sufficient food to serve a ninecourse banquet for up to 100 people. Furnishings and other objects created by this spell dissipate into smoke if removed from it.\nA staff of 100 near-transparent servants attends all who enter. You determine the appearance of these servants and their attire. They are invulnerable and obey your commands. Each servant can perform tasks that a human could perform, but they can't attack or take any action that would directly harm another creature. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can't leave the dwelling.\nWhen the spell ends, any creatures or objects left inside the extradimensional space are expelled into the unoccupied spaces nearest to the entrance.",
        "source": "SRD 5.2"
    },
    {
        "id": "mordenkainens-sword",
        "level": 7,
        "name": "Mordenkainen's Sword",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M ((a miniature sword worth 250+ GP)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You create a spectral sword that hovers within range. It lasts for the duration.\nWhen the sword appears, you make a melee spell attack against a target within 5 feet of the sword. On a hit, the target takes Force damage equal to 4d12 plus your spellcasting ability modifier.\nOn your later turns, you can take a Bonus Action to move the sword up to 30 feet to a spot you can see and repeat the attack against the same target or a different one.",
        "source": "SRD 5.2"
    },
    {
        "id": "plane-shift",
        "level": 7,
        "name": "Plane Shift",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (a forked, metal rod worth 250+, GP and attuned to a plane of existence)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as a specific city on the Elemental Plane of Fire or palace on the second level of the Nine Hells, and you appear in or near that destination, as determined by the GM.\nAlternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the creatures you transported, they appear in the closest unoccupied spaces next to the circle.",
        "source": "SRD 5.2"
    },
    {
        "id": "power-word-pain",
        "level": 7,
        "name": "Power Word: Pain",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You speak a word of power that causes waves of intense pain to assail a creature you can see within range. If the target has 100 hit points or fewer, it is subject to crippling pain. Otherwise, the spell has no effect on it. A target is also unaffected if it is immune to being charmed.\nWhile subject to crippling pain, the target's speed is halved, and it has disadvantage on attack rolls, ability checks, and saving throws, other than Constitution saving throws. The target has disadvantage on Constitution saving throws made to maintain concentration on a spell.\nThe target can make a Constitution saving throw at the end of each of its turns. On a successful save, the pain ends."
    },
    {
        "id": "prismatic-spray",
        "level": 7,
        "name": "Prismatic Spray",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "Eight rays of light flash from you in a 60-foot Cone. Each creature in the Cone makes a Dexterity saving throw. For each target, roll 1d8 to determine which color ray affects it, consulting the Prismatic Rays table. Prismatic Rays 1d8 Ray 2    Orange. Failed Save: 12d6 Acid damage. Successful Save: Half as much damage. 4    Green. Failed Save: 12d6 Poison damage. Successful Save: Half as much damage. 1d8 Ray 6    Indigo. Failed Save: The target has the Restrained condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the Petrified condition until it is freed by an effect like the Greater Restoration spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind. 8    Special. The target is struck by two rays. Roll twice, rerolling any 8.",
        "source": "SRD 5.2"
    },
    {
        "id": "project-image",
        "level": 7,
        "name": "Project Image",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "500 miles",
        "components": "V, S, M (a statuette of yourself worth, 5+ GP)",
        "duration": "Concentration, up to 1 day",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You create an illusory copy of yourself that lasts for the duration. The copy can appear at any location within range that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you, but it is intangible. If the illusion takes any damage, it disappears, and the spell ends.\nYou can see through the illusion's eyes and hear through its ears as if you were in its space. As a Magic action, you can move it up to 60 feet and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly.\nPhysical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the Study action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.",
        "source": "SRD 5.2"
    },
    {
        "id": "regenerate",
        "level": 7,
        "name": "Regenerate",
        "school": "Transmutation",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (a prayer wheel)",
        "duration": "1 hour",
        "classes": [
            "bard",
            "cleric",
            "druid"
        ],
        "description": "A creature you touch regains 4d8 + 15 Hit Points. For the duration, the target regains 1 Hit Point at the start of each of its turns, and any severed body parts regrow after 2 minutes.",
        "source": "SRD 5.2"
    },
    {
        "id": "resurrection",
        "level": 7,
        "name": "Resurrection",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (a diamond worth 1,000+ GP, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "With a touch, you revive a dead creature that has been dead for no more than a century, didn't die of old age, and wasn't Undead when it died.\nThe creature returns to life with all its Hit Points. This spell also neutralizes any poisons that affected the creature at the time of death. This spell closes all mortal wounds and restores any missing body parts.\nComing back from the dead is an ordeal. The target takes a -4 penalty to D20 Tests. Every time the target finishes a Long Rest, the penalty is reduced by 1 until it becomes 0.\nCasting this spell to revive a creature that has been dead for 365 days or longer taxes you. Until you finish a Long Rest, you can't cast spells again, and you have Disadvantage on D20 Tests.",
        "source": "SRD 5.2"
    },
    {
        "id": "reverse-gravity",
        "level": 7,
        "name": "Reverse Gravity",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "100 feet",
        "components": "V, S, M (a lodestone and iron filings)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "This spell reverses gravity in a 50-foot-radius, 100foot high Cylinder centered on a point within range. All creatures and objects in that area that aren't anchored to the ground fall upward and reach the top of the Cylinder. A creature can make a Dexterity saving throw to grab a fixed object it can reach, thus avoiding the fall upward.\nIf a ceiling or an anchored object is encountered in this upward fall, creatures and objects strike it just as they would during a downward fall. If an affected creature or object reaches the Cylinder's top without striking anything, it hovers there for the duration. When the spell ends, affected objects and creatures fall downward.",
        "source": "SRD 5.2"
    },
    {
        "id": "sequester",
        "level": 7,
        "name": "Sequester",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S, M (gem dust worth 5,000+ GP,, which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "With a touch, you magically sequester an object or a willing creature. For the duration, the target has the Invisible condition and can't be targeted by Divination spells, detected by magic, or viewed remotely with magic.\nIf the target is a creature, it enters a state of suspended animation; it has the Unconscious condition, doesn't age, and doesn't need food, water, or air.\nYou can set a condition for the spell to end early. The condition can be anything you choose, but it must occur or be visible within 1 mile of the target. Examples include \"after 1,000 years\" or \"when the tarrasque awakens.\" This spell also ends if the target takes any damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "simulacrum",
        "level": 7,
        "name": "Simulacrum",
        "school": "Illusion",
        "castingTime": "12 hours",
        "range": "Touch",
        "components": "V, S, M (powdered ruby worth 1,500+ GP,, which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "wizard"
        ],
        "description": "You create a simulacrum of one Beast or Humanoid that is within 10 feet of you for the entire casting of the spell. You finish the casting by touching both the creature and a pile of ice or snow that is the same size as that creature, and the pile turns into the simulacrum, which is a creature. It uses the game statistics of the original creature at the time of casting, except it is a Construct, its Hit Point maximum is half as much, and it can't cast this spell.\nThe simulacrum is Friendly to you and creatures you designate. It obeys your commands and acts on your turn in combat. The simulacrum can't gain levels, and it can't take Short or Long Rests.\nIf the simulacrum takes damage, the only way to restore its Hit Points is to repair it as you take a Long Rest, during which you expend components worth 100 GP per Hit Point restored. The simulacrum must stay within 5 feet of you for the repair.\nThe simulacrum lasts until it drops to 0 Hit Points, at which point it reverts to snow and melts away. If you cast this spell again, any simulacrum you created with this spell is instantly destroyed.",
        "source": "SRD 5.2"
    },
    {
        "id": "symbol",
        "level": 7,
        "name": "Symbol",
        "school": "Abjuration",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (powdered diamond worth 1,000+ GP, which the spell consumes)",
        "duration": "Until dispelled or triggered",
        "classes": [
            "bard",
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "You inscribe a harmful glyph either on a surface (such as a section of floor or wall) or within an object that can be closed (such as a book or chest). The glyph can cover an area no larger than 10 feet in diameter. If you choose an object, it must remain in place; if it is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.\nThe glyph is nearly imperceptible and requires a successful Wisdom (Perception) check against your spell save DC to notice.\nWhen you inscribe the glyph, you set its trigger and choose which effect the symbol bears: Death, Discord, Fear, Pain, Sleep, or Stunning. Each one is explained below.\nSet the Trigger. You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph.\nYou can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password.\nOnce triggered, the glyph glows, filling a 60-foot-radius Sphere with Dim Light for 10 minutes, after which time the spell ends. Each creature in the Sphere when the glyph activates is targeted by its effect, as is a creature that enters the Sphere for the first time on a turn or ends its turn there. A creature is targeted only once per turn.\nDeath. Each target makes a Constitution saving throw, taking 10d10 Necrotic damage on a failed save or half as much damage on a successful save.\nDiscord. Each target makes a Wisdom saving throw. On a failed save, a target argues with other creatures for 1 minute. During this time, it is incapable of meaningful communication and has Disadvantage on attack rolls and ability checks.\nFear. Each target must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute. While Frightened, the target must move at least 30 feet away from the glyph on each of its turns, if able.\nPain. Each target must succeed on a Constitution saving throw or have the Incapacitated condition for 1 minute.\nSleep. Each target must succeed on a Wisdom saving throw or have the Unconscious condition for 10 minutes. A creature awakens if it takes damage or if someone takes an action to shake it awake.\nStunning. Each target must succeed on a Wisdom saving throw or have the Stunned condition for 1 minute.",
        "source": "SRD 5.2"
    },
    {
        "id": "teleport",
        "level": 7,
        "name": "Teleport",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "10 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "This spell instantly transports you and up to eight willing creatures that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be Large or smaller, and it can't be held or carried by an unwilling creature.\nThe destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The GM rolls 1d100 and consults the Teleportation Outcome table and the explanations after it. Teleportation  Outcome Familiarity Mishap Similar Area  Off Target\nOn Target Permanent circle 01-00 Linked object 01-00 Very familiar 01-05 06-13 14-24 25-00 Seen casually 01-33 34-43 44-53 54-00 Viewed once or described 01-43 44-53 54-73 74-00 False destination 01-50 51-00 -\nFamiliarity. Here are the meanings of the terms in the table's Familiarity column: • \"Permanent circle\" means a permanent teleportation circle whose sigil sequence you know. • \"Linked object\" means you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library. • \"Very familiar\" is a place you have visited often, a place you have carefully studied, or a place you can see when you cast the spell. • \"Seen casually\" is a place you have seen more than once but with which you aren't very familiar. • \"Viewed once or described\" is a place you have seen once, possibly using magic, or a place you know through someone else's description, perhaps from a map. • \"False destination\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a location that no longer exists.\nMishap. The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes 3d10 Force damage, and the GM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time).\nSimilar Area. You and your group (or the target object) appear in a different area that's visually or thematically similar to the target area. You appear in the closest similar place. If you are heading for your home laboratory, for example, you might appear in another person's laboratory in the same city.\nOff Target. You and your group (or the target object) appear 2d12 miles away from the destination in a random direction. Roll 1d8 for the direction: 1, east; 2, southeast; 3, south; 4, southwest; 5, west; 6, northwest; 7, north; or 8, northeast.\nOn Target. You and your group (or the target object) appear where you intended.",
        "source": "SRD 5.2"
    },
    {
        "id": "temple-of-the-gods",
        "level": 7,
        "name": "Temple of the Gods",
        "school": "Conjuration",
        "castingTime": "1 hour",
        "range": "120 feet",
        "components": "V, S, M (a holy symbol worth at least 5 gp)",
        "duration": "24 hours",
        "classes": [
            "cleric"
        ],
        "description": "You cause a temple to shimmer into existence on ground you can see within range. The temple must fit within an unoccupied cube of space on the ground with sides up to 120 feet long. The temple remains until the spell ends. It is dedicated to whatever god, pantheon, or philosophy is represented by the holy symbol used in the casting.\nYou make all decisions about the temple's appearance. The interior is enclosed by a floor, walls, and a roof, with one door granting access to the interior. You can create up to twenty stone benches in the interior; they are part of the temple, and they disappear when the spell ends.\nThe temple is a place of peace and security. Creatures within it can't be charmed or frightened, and all creatures within it have resistance to psychic damage. The temple is also consecrated ground. Any creature that attempts to enter the temple while it is hostile to you or your allies is immediately expelled from the temple and can't reenter it for 24 hours.\nYou can end the spell early by using an action to dismiss it. When you cast this spell, you can specify creatures that are always welcome in the temple, regardless of their attitude toward you or your allies."
    },
    {
        "id": "tether-essence",
        "level": 7,
        "name": "Tether Essence",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a spool of platinum cord worth at least 250 gp, which the spell consumes)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "wizard"
        ],
        "description": "Two creatures of your choice within range must make a Constitution saving throw, with disadvantage if they are within 30 feet of each other. A creature can choose to fail this save. If either save succeeds, the spell has no effect. If both saves fail, the creatures are magically linked for the duration, regardless of the distance between them. When damage is dealt to one of them, the same damage is dealt to the other one. When healing is provided to one of them, the same healing is provided to the other one. If either creature is reduced to 0 hit points, the spell ends for both of them. The spell ends early if you use an action to dismiss it or if the two creatures are ever more than 1 mile apart."
    },
    {
        "id": "whirlwind",
        "level": 7,
        "name": "Whirlwind",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "300 feet",
        "components": "V, M (a piece of straw)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "wizard"
        ],
        "description": "A whirlwind howls down to a point that you can see on the ground within range. The whirlwind is a 10-foot-radius, 30-foot-high cylinder centered on that point. Until the spell ends, you can use your action to move the whirlwind up to 30 feet in any direction along the ground. The whirlwind sucks up any Medium or smaller objects that aren't secured to anything and that aren't being worn or carried.\nAny creature in the whirlwind must make a Dexterity saving throw. On a failed save, the creature takes 10d6 bludgeoning damage and is flung up 20 feet away from the whirlwind in a random direction and knocked prone. If a thrown target strikes a solid surface, the target takes 1d6 bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a Dexterity saving throw or take the same damage and be knocked prone.\nOn a successful save, the creature takes half as much damage and isn't flung away or knocked prone.\nA creature that is Large or smaller is pulled toward the whirlwind when the creature starts its turn within 60 feet of it. That creature must succeed on a Strength saving throw or take damage and be flung up and away as described above."
    },
    {
        "id": "abi-dalzims-horrid-wilting",
        "level": 8,
        "name": "Abi-Dalzim's Horrid Wilting",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a bit of sponge)",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You draw the moisture from every creature in a 30-foot cube centered on a point you choose within range. Each creature in that area must make a Constitution saving throw. Constructs and undead aren't affected, and plants and water elementals make this saving throw with disadvantage. A creature takes 12d8 necrotic damage on a failed save, or half as much damage on a successful one. Nonmagical plants in the area that aren't creatures, such as trees and shrubs, wither and die instantly."
    },
    {
        "id": "animal-shapes",
        "level": 8,
        "name": "Animal Shapes",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "24 hours",
        "classes": [
            "druid"
        ],
        "description": "Choose any number of willing creatures that you can see within range. Each target shape-shifts into a Large or smaller Beast of your choice that has a Challenge Rating of 4 or lower. You can choose a different form for each target. On later turns, you can take a Magic action to transform the targets again.\nA target's game statistics are replaced by the chosen Beast's statistics, but the target retains its creature type; Hit Points; Hit Point Dice; alignment; ability to communicate; and Intelligence, Wisdom, and Charisma scores. The target's actions are limited by the Beast form's anatomy, and it can't cast spells. The target's equipment melds into the new form, and the target can't use any of that equipment while in that form.\nThe target gains a number of Temporary Hit Points equal to the Hit Points of the first form into which it shape-shifts. These Temporary Hit Points vanish if any remain when the spell ends. The transformation lasts for the duration or until the target ends it as a Bonus Action.",
        "source": "SRD 5.2"
    },
    {
        "id": "antimagic-field",
        "level": 8,
        "name": "Antimagic Field",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (iron filings)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "cleric",
            "wizard"
        ],
        "description": "An aura of antimagic surrounds you in 10-foot Emanation. No one can cast spells, take Magic actions, or create other magical effects inside the aura, and those things can't target or otherwise affect anything inside it. Magical properties of magic items don't work inside the aura or on anything inside it.\nAreas of effect created by spells or other magic can't extend into the aura, and no one can teleport into or out of it or use planar travel there. Portals close temporarily while in the aura.\nOngoing spells, except those cast by an Artifact or a deity, are suppressed in the area. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration.\nDispel Magic has no effect on the aura, and the auras created by different Antimagic Field spells don't nullify each other.",
        "source": "SRD 5.2"
    },
    {
        "id": "antipathy-sympathy",
        "level": 8,
        "name": "Antipathy/Sympathy",
        "school": "Enchantment",
        "castingTime": "1 hour",
        "range": "60 feet",
        "components": "V, S, M (a mix of vinegar and honey)",
        "duration": "10 days",
        "classes": [
            "bard",
            "druid",
            "wizard"
        ],
        "description": "As you cast the spell, choose whether it creates antipathy or sympathy, and target one creature or object that is Huge or smaller. Then specify a kind of creature, such as red dragons, goblins, or vampires. A creature of the chosen kind makes a Wisdom saving throw when it comes within 120 feet of the target. Your choice of antipathy or sympathy determines what happens to a creature when it fails that save: Antipathy. The creature has the Frightened condition. The Frightened creature must use its movement on its turns to get as far away as possible from the target, moving by the safest route. Sympathy. The creature has the Charmed condition. The Charmed creature must use its movement on its turns to get as close as possible to the target, moving by the safest route. If the creature is within 5 feet of the target, the creature can't willingly move away. If the target damages the Charmed creature, that creature can make a Wisdom saving throw to end the effect, as described below.\nEnding the Effect. If the Frightened or Charmed creature ends its turn more than 120 feet away from the target, the creature makes a Wisdom saving throw. On a successful save, the creature is no longer affected by the target. A creature that successfully saves against this effect is immune to it for 1 minute, after which it can be affected again.",
        "source": "SRD 5.2"
    },
    {
        "id": "clone",
        "level": 8,
        "name": "Clone",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (a diamond worth 1,000+ GP, which the spell consumes, and a sealable vessel worth 2,000+ GP that is large enough to hold the creature being cloned)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You touch a creature or at least 1 cubic inch of its flesh. An inert duplicate of that creature forms inside the vessel used in the spell's casting and finishes growing after 120 days; you choose whether the finished clone is the same age as the creature or younger. The clone remains inert and endures indefinitely while its vessel remains undisturbed.\nIf the original creature dies after the clone finishes forming, the creature's soul transfers to the clone if the soul is free and willing to return. The clone is physically identical to the original and has the same personality, memories, and abilities, but none of the original's equipment. The creature's original remains, if any, become inert and can't be revived, since the creature's soul is elsewhere.",
        "source": "SRD 5.2"
    },
    {
        "id": "control-weather",
        "level": 8,
        "name": "Control Weather",
        "school": "Transmutation",
        "castingTime": "10 minutes",
        "range": "Self",
        "components": "V, S, M (burning incense)",
        "duration": "Concentration, up to 8 hours",
        "classes": [
            "cleric",
            "druid",
            "wizard"
        ],
        "description": "You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell, and it ends early if you go indoors.\nWhen you cast the spell, you change the current weather conditions, which are determined by the GM. You can change precipitation, temperature, and wind. It takes 1d4 × 10 minutes for the new",
        "source": "SRD 5.2"
    },
    {
        "id": "dark-star",
        "level": 8,
        "name": "Dark Star",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a shard of onyx and a drop of the caster's blood)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "You create a 40-foot-radius sphere of blackness and crushing gravity, centered on a point you can see within range. The sphere remains for the spell's duration. Any nonmagical light in the sphere is suppressed. Magical light can be created in the sphere, but it is dimmed and can't extend beyond the sphere, though the light it provides can extend beyond the sphere if created outside the sphere.\nThe sphere's space is difficult terrain. Any creature that starts its turn in the sphere takes 8d10 force damage. A creature that enters the sphere for the first time on a turn or ends its turn there must make a Constitution saving throw. On a failed save, the creature takes 8d10 force damage and is pulled to the center of the sphere. On a successful save, the creature takes half as much damage and isn't pulled.\nCreatures fully in the sphere at the start of their turn are pulled toward the center, ending their movement there. Any creature fully in the center of the sphere is restrained and takes 8d10 force damage at the start of each of its turns.\nThe sphere is filled with a crushing gravitational force. Any creature that enters the sphere for the first time on a turn or starts its turn there must make a Constitution saving throw. On a failed save, the creature is restrained until it is no longer in the sphere.\nCreatures and objects that are fully in the sphere are immune to thunder damage, and creatures are deafened while entirely inside it. Casting a spell that includes a verbal component is impossible there."
    },
    {
        "id": "demiplane",
        "level": 8,
        "name": "Demiplane",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "S",
        "duration": "1 hour",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create a shadowy Medium door on a flat solid surface that you can see within range. This door can be opened and closed, and it leads to a demiplane that is an empty room 30 feet in each dimension, made of wood or stone (your choice).\nWhen the spell ends, the door vanishes, and any objects inside the demiplane remain there. Any creatures inside also remain unless they opt to be shunted through the door as it vanishes, landing with the Prone condition in the unoccupied spaces closest to the door's former space.\nEach time you cast this spell, you can create a new demiplane or connect the shadowy door to a demiplane you created with a previous casting of this spell. Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another creature, you can connect the shadowy door to that demiplane instead.",
        "source": "SRD 5.2"
    },
    {
        "id": "dominate-monster",
        "level": 8,
        "name": "Dominate Monster",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "One creature you can see within range must succeed on a Wisdom saving throw or have the Charmed condition for the duration. The target has Advantage on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.\nYou have a telepathic link with the Charmed target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"Attack that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.\nYou can command the target to take a Reaction but must take your own Reaction to do so.\nUsing a Higher-Level Spell Slot. Your Concentration can last longer with a level 9 spell slot (up to 8 hours).",
        "source": "SRD 5.2"
    },
    {
        "id": "earthquake",
        "level": 8,
        "name": "Earthquake",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "500 feet",
        "components": "V, S, M (a fractured rock)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "druid",
            "sorcerer"
        ],
        "description": "Choose a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot-radius circle centered on that point. The ground there is Difficult Terrain.\nWhen you cast this spell and at the end of each of your turns for the duration, each creature on the ground in the area makes a Dexterity saving throw. On a failed save, a creature has the Prone condition, and its Concentration is broken. You can also cause the effects below.\nFissures. A total of 1d6 fissures open in the spell's area at the end of the turn you cast it. You choose the fissures' locations, which can't be under structures. Each fissure is 1d10 × 10 feet deep and 10 feet wide, and it extends from one edge of the spell's area to another edge. A creature in the same space as a fissure must succeed on a Dexterity saving throw or fall in. A creature that successfully saves moves with the fissure's edge as it opens.\nStructures. The tremor deals 50 Bludgeoning damage to any structure in contact with the ground in the area when you cast the spell and at the end of each of your turns until the spell ends. If a structure drops to 0 Hit Points, it collapses.\nA creature within a distance from a collapsing structure equal to half the structure's height makes a Dexterity saving throw. On a failed save, the creature takes 12d6 Bludgeoning damage, has the Prone condition, and is buried in the rubble, requiring a DC 20 Strength (Athletics) check as an action to escape. On a successful save, the creature takes half as much damage only.",
        "source": "SRD 5.2"
    },
    {
        "id": "feeblemind",
        "level": 8,
        "name": "Befuddlement",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a key ring with no keys)",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid",
            "warlock",
            "wizard"
        ],
        "description": "You blast the mind of a creature that you can see within range. The target makes an Intelligence saving throw.\nOn a failed save, the target takes 10d12 Psychic damage and can't cast spells or take the Magic action. At the end of every 30 days, the target repeats the save, ending the effect on a success. The effect can also be ended by the Greater Restoration, Heal, or Wish spell.\nOn a successful save, the target takes half as much damage only.",
        "source": "SRD 5.2"
    },
    {
        "id": "glibness",
        "level": 8,
        "name": "Glibness",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "1 hour",
        "classes": [
            "bard",
            "warlock"
        ],
        "description": "Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful.",
        "source": "SRD 5.2"
    },
    {
        "id": "holy-aura",
        "level": 8,
        "name": "Holy Aura",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a reliquary worth 1,000+ GP)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric"
        ],
        "description": "For the duration, you emit an aura in a 30-foot Emanation. While in the aura, creatures of your choice have Advantage on all saving throws, and other creatures have Disadvantage on attack rolls against them. In addition, when a Fiend or an Undead hits an affected creature with a melee attack roll, the attacker must succeed on a Constitution saving throw or have the Blinded condition until the end of its next turn.",
        "source": "SRD 5.2"
    },
    {
        "id": "illusory-dragon",
        "level": 8,
        "name": "Illusory Dragon",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "By gathering threads of shadow material from the Shadowfell, you create a Huge shadowy dragon in an unoccupied space that you can see within range. The illusion lasts for the spell's duration and occupies its space, as if it were a creature.\nWhen the dragon appears, choose one of the following damage types: acid, cold, fire, lightning, or poison. Each creature within 60 feet of the dragon must make a Wisdom saving throw, becoming frightened for 1 minute or until it takes any damage. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\nAs a bonus action on your turn, you can move the illusion up to 60 feet. As part of that movement, you can cause its head to exhale a blast of energy in a 60-foot cone. Each creature in that area must make an Intelligence saving throw, taking 7d6 damage of the chosen type on a failed save, or half as much damage on a successful one.\nThe dragon is tangible because of the shadow stuff used to create it, but attacks miss it automatically, it succeeds on all saving throws, and it is immune to all damage and conditions. A creature that uses an action to examine the dragon can determine that it is an illusion by succeeding on an Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, it can see through the image, and any noise it makes sounds hollow to the creature."
    },
    {
        "id": "incendiary-cloud",
        "level": 8,
        "name": "Incendiary Cloud",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "A swirling cloud of embers and smoke fills a 20-foot-radius Sphere centered on a point within range. The cloud's area is Heavily Obscured. It lasts for the duration or until a strong wind (like that created by Gust of Wind) disperses it.\nWhen the cloud appears, each creature in it makes a Dexterity saving throw, taking 10d8 Fire damage on a failed save or half as much damage on a successful one. A creature must also make this save when the Sphere moves into its space and when it enters the Sphere or ends its turn there. A creature makes this save only once per turn.\nThe cloud moves 10 feet away from you in a direction you choose at the start of each of your turns.",
        "source": "SRD 5.2"
    },
    {
        "id": "maddening-darkness",
        "level": 8,
        "name": "Maddening Darkness",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, M (a drop of pitch mixed with a drop of mercury)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "Magical darkness spreads from a point you choose within range to fill a 60-foot-radius sphere until the spell ends. The darkness spreads around corners. A creature with darkvision can't see through this darkness. Nonmagical light, as well as light created by spells of 8th level or lower, can't illuminate the area.\nShrieks, gibbering, and mad laughter can be heard within the sphere. Whenever a creature starts its turn in the sphere, it must make a Wisdom saving throw, taking 8d8 psychic damage on a failed save, or half as much damage on a successful save."
    },
    {
        "id": "maze",
        "level": 8,
        "name": "Maze",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "You banish a creature that you can see within range into a labyrinthine demiplane. The target remains there for the duration or until it escapes the maze.\nThe target can take a Study action to try to escape. When it does so, it makes a DC 20 Intelligence (Investigation) check. If it succeeds, it escapes, and the spell ends.\nWhen the spell ends, the target reappears in the space it left or, if that space is occupied, in the nearest unoccupied space.",
        "source": "SRD 5.2"
    },
    {
        "id": "mighty-fortress",
        "level": 8,
        "name": "Mighty Fortress",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "1 mile",
        "components": "V, S, M (a diamond worth at least 500 gp, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "A fortress of stone erupts from a square area of ground of your choice that you can see within range. The area is 120 feet on each side, which must be free of creatures or objects. The fortress remains until the spell ends, at which point it crumbles and sinks back into the ground.\nThe fortress is as defensible as a typical fortress, with four 20-foot-square, 30-foot-high turrets at each corner, connected by 80-foot-long, 1-foot-thick stone walls. The walls are topped with crenellations, and there are arrow slits in the walls and turrets. A keep stands in the center of the fortress, three stories tall, with a 50-foot-square base. The keep has arrow slits as well.\nYou can place up to four stone doors in the fortress's outer wall. A door is 5 feet wide and 10 feet tall. The doors are magically locked and can be opened only by you or by creatures you designate when you cast the spell. The fortress is furnished and decorated as you choose. It contains sufficient food to serve a nine-course banquet for up to 100 people each day. Furnishings and other objects created by this spell dissipate into smoke if removed from the fortress. A dispel magic cast on a closed door destroys that door and creates an opening 10 feet wide and 10 feet tall in the wall. A creature in the area when you cast the spell can move freely through the fortress's walls for 1 minute, after which time the walls become solid.\nThe fortress has AC 15 and 30 hit points per inch of thickness. It is immune to poison and psychic damage. Reducing a section of wall to 0 hit points destroys it and might cause connected walls to collapse at the GM's discretion.\nIf you cast this spell on the same spot every 7 days for a year, the fortress becomes permanent and can't be dispelled."
    },
    {
        "id": "mind-blank",
        "level": 8,
        "name": "Mind Blank",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Touch",
        "components": "V, S",
        "duration": "24 hours",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "Until the spell ends, one willing creature you touch has Immunity to Psychic damage and the Charmed condition. The target is also unaffected by anything that would sense its emotions or alignment, read its thoughts, or magically detect its location, and no spell-not even Wish-can gather information about the target, observe it remotely, or control its mind.",
        "source": "SRD 5.2"
    },
    {
        "id": "power-word-stun",
        "level": 8,
        "name": "Power Word Stun",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You overwhelm the mind of one creature you can see within range. If the target has 150 Hit Points or fewer, it has the Stunned condition. Otherwise, its Speed is 0 until the start of your next turn.\nThe Stunned target makes a Constitution saving throw at the end of each of its turns, ending the condition on itself on a success.",
        "source": "SRD 5.2"
    },
    {
        "id": "reality-break",
        "level": 8,
        "name": "Reality Break",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a crystal prism)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "You reach into the possible futures that spin from the creature you choose and force it to experience one of them. The target must make a Wisdom saving throw. On a failed save, the target can't take reactions until the spell ends. At the start of each of the target's turns, roll a d10 to determine what it experiences:\n**1-2. Vision of the Far Realm.** The target takes 6d12 psychic damage, and it is stunned until the end of the turn.\n**3-5. Rending Rift.** The target must make a Dexterity saving throw. It takes 8d12 force damage on a failed save, or half as much damage on a successful one.\n**6-8. Wormhole.** The target is teleported, along with everything it is wearing and carrying, up to 30 feet to an unoccupied space of your choice that you can see. The target also takes 10d12 force damage and is knocked prone.\n**9-10. Chill of the Dark Void.** The target takes 10d12 cold damage, and it is blinded until the end of the turn.\nAt the end of each of its turns, the target can repeat the Wisdom saving throw, ending the spell on itself on a success."
    },
    {
        "id": "sunburst",
        "level": 8,
        "name": "Sunburst",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "150 feet",
        "components": "V, S, M (a piece of sunstone)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "Brilliant sunlight flashes in a 60-foot-radius Sphere centered on a point you choose within range. Each creature in the Sphere makes a Constitution saving throw. On a failed save, a creature takes 12d6 Radiant damage and has the Blinded condition for 1 minute. On a successful save, it takes half as much damage only.\nA creature Blinded by this spell makes another Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.\nThis spell dispels Darkness in its area that was created by any spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "telepathy",
        "level": 8,
        "name": "Telepathy",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Unlimited",
        "components": "V, S, M (a pair of linked silver rings)",
        "duration": "24 hours",
        "classes": [
            "wizard"
        ],
        "description": "You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can be anywhere on the same plane of existence as you. The spell ends if you or the target are no longer on the same plane.\nUntil the spell ends, you and the target can instantaneously share words, images, sounds, and other sensory messages with one another through the link, and the target recognizes you as the creature it is communicating with. The spell enables a creature with an Intelligence score of at least 1 to understand the meaning of your words and to communicate back."
    },
    {
        "id": "tsunami",
        "level": 8,
        "name": "Tsunami",
        "school": "Conjuration",
        "castingTime": "1 minute",
        "range": "1 mile",
        "components": "V, S",
        "duration": "Concentration, up to 6 rounds",
        "classes": [
            "druid"
        ],
        "description": "A wall of water springs into existence at a point you choose within range. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick. The wall lasts for the duration.\nWhen the wall appears, each creature in its area makes a Strength saving throw, taking 6d10 Bludgeoning damage on a failed save or half as much damage on a successful one.\nAt the start of each of your turns after the wall appears, the wall, along with any creatures in it, moves 50 feet away from you. Any Huge or smaller creature inside the wall or whose space the wall enters when it moves must succeed on a Strength saving throw or take 5d10 Bludgeoning damage. A creature can take this damage only once per round. At the end of the turn, the wall's height is reduced by 50 feet, and the damage the wall deals on later rounds is reduced by 1d10. When the wall reaches 0 feet in height, the spell ends.\nA creature caught in the wall can move by swimming. Because of the wave's force, though, the creature must succeed on a Strength (Athletics) check against your spell save DC to move at all. If it fails the check, it can't move. A creature that moves out of the wall falls to the ground.",
        "source": "SRD 5.2"
    },
    {
        "id": "astral-projection",
        "level": 9,
        "name": "Astral Projection",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "10 feet",
        "components": "V, S, M (for each of the spell's targets, one jacinth worth 1,000+ GP and one silver bar worth 100+ GP, all of which the spell consumes)",
        "duration": "Until dispelled",
        "classes": [
            "cleric",
            "warlock",
            "wizard"
        ],
        "description": "You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell ends instantly if you are already on that plane). Each target's body is left behind in a state of suspended animation; it has the Unconscious condition, doesn't need food or air, and doesn't age.\nA target's astral form resembles its body in almost every way, replicating its game statistics and possessions. The principal difference is the addition of a silvery cord that trails from between the shoulder blades of the astral form. The cord fades from view after 1 foot. If the cord is cut-which happens only when an effect states that it does so-the target's body and astral form both die.\nA target's astral form can travel through the Astral Plane. The moment an astral form leaves that plane, the target's body and possessions travel along the silver cord, causing the target to re-enter its body on the new plane.\nAny damage or other effects that apply to an astral form have no effect on the target's body and vice versa. If a target's body or astral form drops to 0 Hit Points, the spell ends for that target. The spell ends for all the targets if you take a Magic action to dismiss it.\nWhen the spell ends for a target who isn't dead, the target reappears in its body and exits the state of suspended animation.",
        "source": "SRD 5.2"
    },
    {
        "id": "blade-of-disaster",
        "level": 9,
        "name": "Blade of Disaster",
        "school": "Conjuration",
        "castingTime": "1 bonus action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You create a blade-shaped planar rift about 3 feet long in an unoccupied space you can see within range. The blade lasts for the duration. When you cast this spell, you can make up to two melee spell attacks with the blade, each against a creature, loose object, or structure within 5 feet of it. On a hit, the target takes 4d12 force damage. This attack scores a critical hit if the number on the d20 is 18 or higher, instead of only 20.\nAs a bonus action on your turn, you can move the blade up to 30 feet to an unoccupied space you can see and then make up to two melee spell attacks with it again.\nThe blade can harmlessly pass through any barrier, including a wall of force."
    },
    {
        "id": "foresight",
        "level": 9,
        "name": "Foresight",
        "school": "Divination",
        "castingTime": "1 minute",
        "range": "Touch",
        "components": "V, S, M (a hummingbird feather)",
        "duration": "8 hours",
        "classes": [
            "bard",
            "druid",
            "warlock",
            "wizard"
        ],
        "description": "You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target has Advantage on D20 Tests, and other creatures have Disadvantage on attack rolls against it. The spell ends early if you cast it again.",
        "source": "SRD 5.2"
    },
    {
        "id": "gate",
        "level": 9,
        "name": "Gate",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S, M (a diamond worth 5,000+ GP)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "cleric",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration, and the portal's destination is visible through it.\nThe portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.\nDeities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.\nWhen you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens next to the named creature and transports it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the GM deems appropriate. It might leave, attack you, or help you.",
        "source": "SRD 5.2"
    },
    {
        "id": "imprisonment",
        "level": 9,
        "name": "Imprisonment",
        "school": "Abjuration",
        "castingTime": "1 minute",
        "range": "30 feet",
        "components": "V, S, M (a statuette of the target worth, 5,000+ GP)",
        "duration": "Until dispelled",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You create a magical restraint to hold a creature that you can see within range. The target must make a Wisdom saving throw. On a successful save, the target is unaffected, and it is immune to this spell for the next 24 hours. On a failed save, the target is imprisoned. While imprisoned, the target doesn't need to breathe, eat, or drink, and it doesn't age. Divination spells can't locate or perceive the imprisoned target, and the target can't teleport.\nUntil the spell ends, the target is also affected by one of the following effects of your choice: Burial. The target is entombed beneath the earth in a hollow globe of magical force that is just large enough to contain the target. Nothing can pass into or out of the globe. Chaining. Chains firmly rooted in the ground hold the target in place. The target has the Restrained condition and can't be moved by any means. Hedged Prison. The target is trapped in a demiplane that is warded against teleportation and planar travel. The demiplane is your choice of a labyrinth, a cage, a tower, or the like. Minimus Containment. The target becomes 1 inch tall and is trapped inside an indestructible gemstone or a similar object. Light can pass through the gemstone (allowing the target to see out and other creatures to see in), but nothing else can pass through by any means. Slumber. The target has the Unconscious condition and can't be awoken.\nEnding the Spell. When you cast the spell, specify a trigger that will end it. The trigger can be as simple or as elaborate as you choose, but the GM must agree that it has a high likelihood of happening within the next decade. The trigger must be an observable action, such as someone making a particular offering at the temple of your god, saving your true love, or defeating a specific monster.\nA Dispel Magic spell can end the spell only if it is cast with a level 9 spell slot, targeting either the prison or the component used to create it.",
        "source": "SRD 5.2"
    },
    {
        "id": "invulnerability",
        "level": 9,
        "name": "Invulnerability",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a small piece of adamantine worth at least 500 gp, which the spell consumes)",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "wizard"
        ],
        "description": "You are immune to all damage until the spell ends."
    },
    {
        "id": "mass-heal",
        "level": 9,
        "name": "Mass Heal",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "cleric"
        ],
        "description": "A flood of healing energy flows from you into creatures around you. You restore up to 700 Hit Points, divided as you choose among any number of creatures that you can see within range. Creatures healed by this spell also have the Blinded, Deafened, and Poisoned conditions removed from them.",
        "source": "SRD 5.2"
    },
    {
        "id": "mass-polymorph",
        "level": 9,
        "name": "Mass Polymorph",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a caterpillar cocoon)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "sorcerer",
            "wizard"
        ],
        "description": "You transform up to ten creatures of your choice that you can see within range. An unwilling target must succeed on a Wisdom saving throw to resist the transformation. An unwilling shapechanger automatically succeeds on the save.\nEach target assumes a beast form of your choice, and you can choose the same form or different ones for each target. The new form can be any beast you have seen whose challenge rating is equal to or less than the target's (or half the target's level, if the target doesn't have a challenge rating). The target's game statistics, including mental ability scores, are replaced by the statistics of the chosen beast, but the target retains its hit points, alignment, and personality.\nEach target gains a number of temporary hit points equal to the hit points of its new form. These temporary hit points can't be replaced by temporary hit points from another source. A target reverts to its normal form when it has no more temporary hit points or it dies. If the spell ends before then, the creature loses all its temporary hit points and reverts to its normal form.\nThe creature is limited in the actions it can perform by the nature of its new form, and it can't speak or cast spells.\nThe target's gear melds into the new form. The target can't activate, wield, or otherwise benefit from any of its equipment."
    },
    {
        "id": "meteor-swarm",
        "level": 9,
        "name": "Meteor Swarm",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "1 mile",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius Sphere centered on each of those points makes a Dexterity saving throw. A creature takes 20d6 Fire damage and 20d6 Bludgeoning damage on a failed save or half as much damage on a successful one. A creature in the area of more than one fiery Sphere is affected only once.\nA nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area, and the object starts burning if it's flammable.",
        "source": "SRD 5.2"
    },
    {
        "id": "power-word-heal",
        "level": 9,
        "name": "Power Word Heal",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "A wave of healing energy washes over one creature you can see within range. The target regains all its Hit Points. If the creature has the Charmed, Frightened, Paralyzed, Poisoned, or Stunned condition, the condition ends. If the creature has the Prone condition, it can use its Reaction to stand up.",
        "source": "SRD 5.2"
    },
    {
        "id": "power-word-kill",
        "level": 9,
        "name": "Power Word Kill",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You compel one creature you can see within range to die. If the target has 100 Hit Points or fewer, it dies. Otherwise, it takes 12d12 Psychic damage.",
        "source": "SRD 5.2"
    },
    {
        "id": "prismatic-wall",
        "level": 9,
        "name": "Prismatic Wall",
        "school": "Abjuration",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "10 minutes",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "A shimmering, multicolored plane of light forms a vertical opaque wall-up to 90 feet long, 30 feet high, and 1 inch thick-centered on a point within range. Alternatively, you shape the wall into a globe up to 30 feet in diameter centered on a point within range. The wall lasts for the duration. If you position the wall in a space occupied by a creature, the spell ends instantly without effect.\nThe wall sheds Bright Light within 100 feet and Dim Light for an additional 100 feet. You and creatures you designate when you cast the spell can pass through and be near the wall without harm. If another creature that can see the wall moves within 20 feet of it or starts its turn there, the creature must succeed on a Constitution saving throw or have the Blinded condition for 1 minute.\nThe wall consists of seven layers, each with a different color. When a creature reaches into or passes through the wall, it does so one layer at a time through all the layers. Each layer forces the creature to make a Dexterity saving throw or be affected by that layer's properties as described in the Prismatic Layers table.\nThe wall, which has AC 10, can be destroyed one layer at a time, in order from red to violet, by means specific to each layer. If a layer is destroyed, it is gone for the duration. Antimagic Field has no effect on the wall, and Dispel Magic can affect only the violet layer. Prismatic Layers Order  Effects 2    Orange. Failed Save: 12d6 Acid damage. Successful Save: Half as much damage. Additional Effects: Magical ranged attacks can't pass through this layer, which is destroyed by a strong wind (such as the one created by Gust of Wind). 4    Green. Failed Save: 12d6 Poison damage. Successful Save: Half as much damage. Additional Effects: A Passwall spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer. 6    Indigo. Failed Save: The target has the Restrained condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the Petrified condition until it is freed by an effect like the Greater Restoration spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind. Additional Effects: Spells can't be cast through this layer, which is destroyed by Bright Light shed by the Daylight spell.",
        "source": "SRD 5.2"
    },
    {
        "id": "psychic-scream",
        "level": 9,
        "name": "Psychic Scream",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "sorcerer",
            "warlock",
            "wizard"
        ],
        "description": "You unleash the power of your mind to blast the intellect of up to ten creatures of your choice that you can see within range. Creatures that have an Intelligence score of 2 or lower are unaffected.\nEach target must make an Intelligence saving throw. On a failed save, a target takes 14d6 psychic damage and is stunned. On a successful save, a target takes half as much damage and isn't stunned. If a target is killed by this damage, its head explodes, assuming it has one.\nA stunned target can make an Intelligence saving throw at the end of each of its turns. On a successful save, the stunning effect ends."
    },
    {
        "id": "ravenous-void",
        "level": 9,
        "name": "Ravenous Void",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "1,000 feet",
        "components": "V, S, M (a crushed black gem worth at least 500 gp)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "wizard"
        ],
        "description": "A 20-foot-radius sphere of destructive gravitational force appears at a point you can see within range and tugs at the creatures in the area. The sphere and the area within 100 feet of it are difficult terrain. Nonmagical objects fully inside the sphere are destroyed if they aren't being worn or carried.\nWhen the sphere appears and at the start of each of your turns until the spell ends, unsecured objects within 100 feet of the sphere are pulled toward the sphere's center, ending in an unoccupied space as close to the center as possible.\nA creature that starts its turn within 100 feet of the sphere must succeed on a Strength saving throw or be pulled straight toward the sphere's center, ending in an unoccupied space as close to the center as possible.\nA creature that enters the sphere for the first time on a turn or starts its turn there takes 5d10 force damage and is restrained until it exits the sphere. If the sphere is in the air, the restrained creature hovers inside it.\nA creature can use its action to make a Strength check against your spell save DC, ending the restrained condition on itself or another creature it can reach.\nA creature reduced to 0 hit points by this spell is annihilated, along with any nonmagical items it is wearing or carrying."
    },
    {
        "id": "shapechange",
        "level": 9,
        "name": "Shapechange",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a jade circlet worth 1,500+ GP)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "druid",
            "wizard"
        ],
        "description": "You shape-shift into another creature for the duration or until you take a Magic action to shape-shift into a different eligible form. The new form must be of a creature that has a Challenge Rating no higher than your level or Challenge Rating. You must have seen the sort of creature before, and it can't be a Construct or an Undead.\nWhen you cast the spell, you gain a number of Temporary Hit Points equal to the Hit Points of the first form into which you shape-shift. These Temporary Hit Points vanish if any remain when the spell ends.\nYour game statistics are replaced by the stat block of the chosen form, but you retain your creature type; alignment; personality; Intelligence, Wisdom, and Charisma scores; Hit Points; Hit Point Dice; proficiencies; and ability to communicate. If you have the Spellcasting feature, you retain it too.\nUpon shape-shifting, you determine whether your equipment drops to the ground or changes in size and shape to fit the new form while you're in it.",
        "source": "SRD 5.2"
    },
    {
        "id": "storm-of-vengeance",
        "level": 9,
        "name": "Storm of Vengeance",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "1 mile",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "druid"
        ],
        "description": "A churning storm cloud forms for the duration, centered on a point within range and spreading to a radius of 300 feet. Each creature under the cloud when it appears must succeed on a Constitution saving throw or take 2d6 Thunder damage and have the Deafened condition for the duration.\nAt the start of each of your later turns, the storm produces different effects, as detailed below.\nTurn 2. Acidic rain falls. Each creature and object under the cloud takes 4d6 Acid damage.\nTurn 3. You call six bolts of lightning from the cloud to strike six different creatures or objects beneath it. Each target makes a Dexterity saving throw, taking 10d6 Lightning damage on a failed save or half as much damage on a successful one.\nTurn 4. Hailstones rain down. Each creature under the cloud takes 2d6 Bludgeoning damage.\nTurns 5-10. Gusts and freezing rain assail the area under the cloud. Each creature there takes 1d6 Cold damage. Until the spell ends, the area is Difficult Terrain and Heavily Obscured, ranged attacks with weapons are impossible there, and strong wind blows through the area.",
        "source": "SRD 5.2"
    },
    {
        "id": "time-ravage",
        "level": 9,
        "name": "Time Ravage",
        "school": "Necromancy",
        "castingTime": "1 action",
        "range": "90 feet",
        "components": "V, S, M (an hourglass filled with diamond dust worth at least 5,000 gp, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "wizard"
        ],
        "description": "You target a creature you can see within range, putting its physical form through the devastation of rapid aging. The target must make a Constitution saving throw. On a failed save, the target takes 10d12 necrotic damage. On a successful save, it takes half as much damage. In addition, if the target failed its save, it ages to the point where it has only 30 days left before it dies of old age. In this aged state, the target has disadvantage on attack rolls, ability checks, and saving throws, and its walking speed is halved. Only the wish spell or the greater restoration spell cast with a 9th-level spell slot can end these effects and restore the target to its previous age."
    },
    {
        "id": "time-stop",
        "level": 9,
        "name": "Time Stop",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take 1d4 + 1 turns in a row, during which you can use actions and move as normal.\nThis spell ends if one of the actions you use during this period, or any effects that you create during it, affects a creature other than you or an object being worn or carried by someone other than you. In addition, the spell ends if you move to a place more than 1,000 feet from the location where you cast it.",
        "source": "SRD 5.2"
    },
    {
        "id": "true-polymorph",
        "level": 9,
        "name": "True Polymorph",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S, M (a drop of mercury, a dollop of gum arabic, and a wisp of smoke)",
        "duration": "Concentration, up to 1 hour",
        "classes": [
            "bard",
            "warlock",
            "wizard"
        ],
        "description": "Choose one creature or nonmagical object that you can see within range. The creature shape-shifts into a different creature or a nonmagical object, or the object shape-shifts into a creature (the object must be neither worn nor carried). The transformation lasts for the duration or until the target dies or is destroyed, but if you maintain Concentration on this spell for the full duration, the spell lasts until dispelled.\nAn unwilling creature can make a Wisdom saving throw, and if it succeeds, it isn't affected by this spell.\nCreature into Creature. If you turn a creature into another kind of creature, the new form can be any kind you choose that has a Challenge Rating equal to or less than the target's Challenge Rating or level. The target's game statistics are replaced by the stat block of the new form, but it retains its Hit Points, Hit Point Dice, alignment, and personality.\nThe target gains a number of Temporary Hit Points equal to the Hit Points of the new form. These Temporary Hit Points vanish if any remain when the spell ends.\nThe target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.\nThe target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment.\nObject into Creature. You can turn an object into any kind of creature, as long as the creature's size is no larger than the object's size and the creature has a Challenge Rating of 9 or lower. The creature is Friendly to you and your allies. In combat, it takes its turns immediately after yours, and it obeys your commands.\nIf the spell lasts more than an hour, you no longer control the creature. It might remain Friendly to you, depending on how you have treated it.\nCreature into Object. If you turn a creature into an object, it transforms along with whatever it is wearing and carrying into that form, as long as the object's size is no larger than the creature's size. The creature's statistics become those of the object, and the creature has no memory of time spent in this form after the spell ends and it returns to normal.",
        "source": "SRD 5.2"
    },
    {
        "id": "true-resurrection",
        "level": 9,
        "name": "True Resurrection",
        "school": "Necromancy",
        "castingTime": "1 hour",
        "range": "Touch",
        "components": "V, S, M (diamonds worth 25,000+ GP,, which the spell consumes)",
        "duration": "Instantaneous",
        "classes": [
            "cleric",
            "druid"
        ],
        "description": "You touch a creature that has been dead for no longer than 200 years and that died for any reason except old age. The creature is revived with all its Hit Points.\nThis spell closes all wounds, neutralizes any poison, cures all magical contagions, and lifts any curses affecting the creature when it died. The spell replaces damaged or missing organs and limbs. If the creature was Undead, it is restored to its non-Undead form.\nThe spell can provide a new body if the original no longer exists, in which case you must speak the creature's name. The creature then appears in an unoccupied space you choose within 10 feet of you.",
        "source": "SRD 5.2"
    },
    {
        "id": "weird",
        "level": 9,
        "name": "Weird",
        "school": "Illusion",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You try to create illusory terrors in others' minds. Each creature of your choice in a 30-foot-radius Sphere centered on a point within range makes a Wisdom saving throw. On a failed save, a target takes 10d10 Psychic damage and has the Frightened condition for the duration. On a successful save, a target takes half as much damage only.\nA Frightened target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes 5d10 Psychic damage. On a successful save, the spell ends on that target.",
        "source": "SRD 5.2"
    },
    {
        "id": "wish",
        "level": 9,
        "name": "Wish",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "Wish is the mightiest spell a mortal can cast. By simply speaking aloud, you can alter reality itself.\nThe basic use of this spell is to duplicate any other spell of level 8 or lower. If you use it this way, you don't need to meet any requirements to cast that spell, including costly components. The spell simply takes effect.\nAlternatively, you can create one of the following effects of your choice: Object Creation. You create one object of up to 25,000 GP in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space that you can see on the ground. Instant Health. You allow yourself and up to twenty creatures that you can see to regain all Hit Points, and you end all effects on them listed in the Greater Restoration spell. Resistance. You grant up to ten creatures that you can see Resistance to one damage type that you choose. This Resistance is permanent. Spell Immunity. You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours. Sudden Learning. You replace one of your feats with another feat for which you are eligible. You lose all the benefits of the old feat and gain the benefits of the new one. You can't replace a feat that is a prerequisite for any of your other feats or features. Roll Redo. You undo a single recent event by forcing a reroll of any die roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a Wish spell could undo an ally's failed saving throw or a foe's Critical Hit. You can force the reroll to be made with Advantage or Disadvantage, and you choose whether to use the reroll or the original roll. Reshape Reality. You may wish for something not included in any of the other effects. To do so, state your wish to the GM as precisely as possible. The GM has great latitude in ruling what occurs in such an instance; the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might be achieved only in part, or you might suffer an unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a Legendary magic item or an Artifact might instantly transport you to the presence of the item's current owner. If your wish is granted and its effects have consequences for a whole community, region, or world, you are likely to attract powerful foes. If your wish would affect a god, the god's divine servants might instantly intervene to prevent it or to encourage you to craft the wish in a particular way. If your wish would undo the multiverse itself, your wish fails. The stress of casting Wish to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a Long Rest, you take 1d10 Necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength score becomes 3 for 2d4 days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a 33 percent chance that you are unable to cast Wish ever again if you suffer this stress.",
        "source": "SRD 5.2"
    },
    {
        "id": "divine-smite",
        "level": 1,
        "name": "Divine Smite",
        "school": "Evocation",
        "castingTime": "1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike",
        "range": "Self",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "paladin"
        ],
        "description": "The target takes an extra 2d8 Radiant damage from the attack. The damage increases by 1d8 if the target is a Fiend or an Undead.\nUsing a Higher-Level Spell Slot. The damage increases by 1d8 for each spell slot level above 1.",
        "source": "SRD 5.2"
    },
    {
        "id": "elementalism",
        "level": 0,
        "name": "Elementalism",
        "school": "Transmutation",
        "castingTime": "1 action",
        "range": "30 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "druid",
            "sorcerer",
            "wizard"
        ],
        "description": "You exert control over the elements, creating one of the following effects within range.\nBeckon Air. You create a breeze strong enough to ripple cloth, stir dust, rustle leaves, and close open doors and shutters, all in a 5-foot Cube. Doors and shutters being held open by someone or something aren't affected.\nBeckon Earth. You create a thin shroud of dust or sand that covers surfaces in a 5-foot-square area, or you cause a single word to appear in your handwriting in a patch of dirt or sand.\nBeckon Fire. You create a thin cloud of harmless embers and colored, scented smoke in a 5-foot Cube. You choose the color and scent, and the embers can light candles, torches, or lamps in that area. The smoke's scent lingers for 1 minute.\nBeckon Water. You create a spray of cool mist that lightly dampens creatures and objects in a 5-foot Cube. Alternatively, you create 1 cup of clean water either in an open container or on a surface, and the water evaporates in 1 minute.\nSculpt Element. You cause dirt, sand, fire, smoke, mist, or water that can fit in a 1-foot Cube to assume a crude shape (such as that of a creature) for 1 hour.",
        "source": "SRD 5.2"
    },
    {
        "id": "sorcerous-burst",
        "level": 0,
        "name": "Sorcerous Burst",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer"
        ],
        "description": "You cast sorcerous energy at one creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d8 damage of a type you choose: Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder.\nIf you roll an 8 on a d8 for this spell, you can roll another d8, and add it to the damage. When you cast this spell, the maximum number of these d8s you can add to the spell's damage equals your spellcasting ability modifier.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "starry-wisp",
        "level": 0,
        "name": "Starry Wisp",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "druid"
        ],
        "description": "You launch a mote of light at one creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d8 Radiant damage, and until the end of your next turn, it emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.\nCantrip Upgrade. The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8).",
        "source": "SRD 5.2"
    },
    {
        "id": "arcane-vigor",
        "level": 2,
        "name": "Arcane Vigor",
        "school": "Abjuration",
        "castingTime": "1 bonus action",
        "range": "Self",
        "components": "V, S",
        "duration": "Instantaneous",
        "classes": [
            "sorcerer",
            "wizard"
        ],
        "description": "You tap into your life force to heal yourself. Roll one or two of your unexpended Hit Point Dice, and regain a number of Hit Points equal to the roll's total plus your spellcasting ability modifier. Those dice are then expended.\nUsing a Higher-Level Spell Slot. The number of unexpended Hit Dice you can roll increases by one for each spell slot level above 2.",
        "source": "PHB 2024"
    },
    {
        "id": "fount-of-moonlight",
        "level": 4,
        "name": "Fount of Moonlight",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S",
        "duration": "Concentration, up to 10 minutes",
        "classes": [
            "bard",
            "druid"
        ],
        "description": "A cool light wreathes your body for the duration, emitting Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.\nUntil the spell ends, you have Resistance to Radiant damage, and your melee attacks deal an extra 2d6 Radiant damage on a hit.\nIn addition, immediately after you take damage from a creature you can see within 60 feet of yourself, you can take a Reaction to force the creature to make a Constitution saving throw. On a failed save, the creature has the Blinded condition until the end of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "jallarzis-storm-of-radiance",
        "level": 5,
        "name": "Jallarzi's Storm of Radiance",
        "school": "Evocation",
        "castingTime": "1 action",
        "range": "120 feet",
        "components": "V, S, M (a pinch of phosphorus)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You unleash a storm of flashing light and raging thunder in a 10-foot-radius, 40-foot-high Cylinder centered on a point you can see within range. While in this area, creatures have the Blinded and Deafened conditions, and they can't cast spells with a Verbal component.\nWhen the storm appears, each creature in it makes a Constitution saving throw, taking 2d10 Radiant damage and 2d10 Thunder damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn.\nUsing a Higher-Level Spell Slot. The Radiant and Thunder damage increase by 1d10 for each spell slot level above 5.",
        "source": "PHB 2024"
    },
    {
        "id": "power-word-fortify",
        "level": 7,
        "name": "Power Word Fortify",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "60 feet",
        "components": "V",
        "duration": "Instantaneous",
        "classes": [
            "bard",
            "cleric"
        ],
        "description": "You fortify up to six creatures you can see within range. The spell bestows 120 Temporary Hit Points, which you divide among the spell's recipients.",
        "source": "PHB 2024"
    },
    {
        "id": "tashas-bubbling-cauldron",
        "level": 6,
        "name": "Tasha's Bubbling Cauldron",
        "school": "Conjuration",
        "castingTime": "1 action",
        "range": "5 feet",
        "components": "V, S, M (a gilded ladle worth 500+ GP)",
        "duration": "10 minutes",
        "classes": [
            "warlock",
            "wizard"
        ],
        "description": "You conjure a claw-footed cauldron filled with bubbling liquid in an unoccupied space within range. Choose a Common or an Uncommon potion you're familiar with; the cauldron fills with a number of doses of that potion equal to your spellcasting ability modifier (minimum of 1). As a Bonus Action, you or a creature within 5 feet of the cauldron can withdraw one potion from it.\nWhen the spell ends, the cauldron disappears and any remaining potions in it vanish. Potions withdrawn from the cauldron vanish when you cast this spell again or finish a Long Rest.",
        "source": "PHB 2024"
    },
    {
        "id": "yolandes-regal-presence",
        "level": 5,
        "name": "Yolande's Regal Presence",
        "school": "Enchantment",
        "castingTime": "1 action",
        "range": "Self",
        "components": "V, S, M (a miniature tiara)",
        "duration": "Concentration, up to 1 minute",
        "classes": [
            "bard",
            "wizard"
        ],
        "description": "You surround yourself with unearthly majesty in a 10-foot Emanation. Whenever the Emanation enters a creature's space and whenever a creature enters the Emanation or ends its turn there, you can force that creature to make a Wisdom saving throw. On a failed save, the target takes 4d6 Psychic damage and has the Prone condition, and you can push it up to 10 feet away. On a successful save, the target takes half as much damage only. A creature makes this save only once per turn.",
        "source": "PHB 2024"
    }
];
