export interface Background {
    id: string;
    name: string;
    description: string;
    skillProficiencies: string[];
    toolProficiencies: string[];
    languages: number;
    equipment: string[];
    /** 5.5e: +2 one ability, +1 another (or +1 to three). Themed to the background. */
    abilityScoreIncrease?: { [key: string]: number };
    feature: {
        name: string;
        description: string;
    };
}

export const backgrounds: Background[] = [
    {
        id: 'acolyte',
        name: 'Acolyte',
        description: 'You have spent your life in the service of a temple to a specific god or pantheon of gods.',
        skillProficiencies: ['Insight', 'Religion'],
        toolProficiencies: [],
        languages: 2,
        equipment: ['Holy symbol', 'Prayer book or prayer wheel', 'Incense', 'Vestments', 'Common clothes', '15 gp'],
        abilityScoreIncrease: { wis: 2, int: 1 },
        feature: {
            name: 'Shelter of the Faithful',
            description: 'You and your companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith.'
        }
    },
    {
        id: 'criminal',
        name: 'Criminal',
        description: 'You are an experienced criminal with a history of breaking the law.',
        skillProficiencies: ['Deception', 'Stealth'],
        toolProficiencies: ['Thieves\' tools', 'One type of gaming set'],
        languages: 0,
        equipment: ['Crowbar', 'Dark common clothes with hood', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { dex: 2, cha: 1 },
        feature: {
            name: 'Criminal Contact',
            description: 'You have a reliable contact who acts as your liaison to a network of other criminals.'
        }
    },
    {
        id: 'folk-hero',
        name: 'Folk Hero',
        description: 'You come from a humble social rank, but you are destined for so much more.',
        skillProficiencies: ['Animal Handling', 'Survival'],
        toolProficiencies: ['One type of artisan\'s tools', 'Vehicles (land)'],
        languages: 0,
        equipment: ['Artisan\'s tools', 'Shovel', 'Iron pot', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { con: 2, wis: 1 },
        feature: {
            name: 'Rustic Hospitality',
            description: 'Common folk will shelter and hide you from the law or anyone searching for you.'
        }
    },
    {
        id: 'noble',
        name: 'Noble',
        description: 'You understand wealth, power, and privilege.',
        skillProficiencies: ['History', 'Persuasion'],
        toolProficiencies: ['One type of gaming set'],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Scroll of pedigree', 'Purse', '25 gp'],
        abilityScoreIncrease: { cha: 2, int: 1 },
        feature: {
            name: 'Position of Privilege',
            description: 'People are inclined to think the best of you, and you can secure an audience with local nobility.'
        }
    },
    {
        id: 'sage',
        name: 'Sage',
        description: 'You spent years learning the lore of the multiverse.',
        skillProficiencies: ['Arcana', 'History'],
        toolProficiencies: [],
        languages: 2,
        equipment: ['Bottle of black ink', 'Quill', 'Small knife', 'Letter from dead colleague', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Researcher',
            description: 'When you attempt to learn something, you know where and from whom you can obtain information.'
        }
    },
    {
        id: 'soldier',
        name: 'Soldier',
        description: 'War has been your life for as long as you care to remember.',
        skillProficiencies: ['Athletics', 'Intimidation'],
        toolProficiencies: ['One type of gaming set', 'Vehicles (land)'],
        languages: 0,
        equipment: ['Insignia of rank', 'Trophy from fallen enemy', 'Bone dice or deck of cards', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, con: 1 },
        feature: {
            name: 'Military Rank',
            description: 'You have a military rank from your career as a soldier and can invoke authority over soldiers of lower rank.'
        }
    },
    {
        id: 'anthropologist',
        name: 'Anthropologist',
        description: 'You have always been fascinated by other cultures, from the most ancient and fallen to the most modern and thriving.',
        skillProficiencies: ['Insight', 'Religion'],
        toolProficiencies: [],
        languages: 2,
        equipment: ['Leather-bound diary', 'Small knife', 'Trinket from a lost culture', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Adept Linguist',
            description: 'You can communicate with humanoids who don\'t speak any common language. You must observe the humanoids interacting with one another for at least 1 day, after which you learn a handful of important words, expressions, and gestures—enough to communicate on a rudimentary level.'
        }
    },
    {
        id: 'archaeologist',
        name: 'Archaeologist',
        description: 'An archaeologist learns about the long-lost and fallen cultures of the past by studying their remains—their bones, their ruins, their surviving masterworks, and their tombs.',
        skillProficiencies: ['History', 'Survival'],
        toolProficiencies: ['Cartographer\'s tools or navigator\'s tools'],
        languages: 1,
        equipment: ['Wooden case containing a map to a ruin or dungeon', 'Bullseye lantern', 'Miner\'s pick', 'Scholar\'s pack', 'Antique weapon', 'Traveler\'s clothes', 'Belt pouch', '25 gp'],
        abilityScoreIncrease: { int: 2, str: 1 },
        feature: {
            name: 'Historical Knowledge',
            description: 'When you enter a ruin or dungeon, you can correctly ascertain its original purpose and determine its builders, whether those were dwarves, elves, humans, yuan-ti, or some other known race. In addition, you can determine the monetary value of art objects more than a century old.'
        }
    },
    {
        id: 'athlete',
        name: 'Athlete',
        description: 'You have pursued a life of physical fitness, mental focus, and perhaps competitive glory.',
        skillProficiencies: ['Athletics', 'Acrobatics'],
        toolProficiencies: [],
        languages: 0,
        equipment: ['Prize from an athletic competition', 'Sports outfit', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, dex: 1 },
        feature: {
            name: 'Echoes of Victory',
            description: 'You can find a place to perform, train, or compete in any settlement that has a fighting pit, gladiator arena, or similar venue. You and your companions can stay there for free, as long as you spend at least 4 hours each day engaged in public training, demonstrations, or matches.'
        }
    },
    {
        id: 'charlatan',
        name: 'Charlatan',
        description: 'You have always had a way with people. You know what makes them tick, you can tease out their secrets, and you can use that knowledge to your advantage.',
        skillProficiencies: ['Deception', 'Sleight of Hand'],
        toolProficiencies: ['Disguise kit', 'Forgery kit'],
        languages: 0,
        equipment: ['Fine clothes', 'Disguise kit', 'Tools of the con of your choice', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { cha: 2, dex: 1 },
        feature: {
            name: 'False Identity',
            description: 'You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.'
        }
    },
    {
        id: 'city-watch',
        name: 'City Watch',
        description: 'You have served the community where you grew up, standing as its first line of defense against crime.',
        skillProficiencies: ['Athletics', 'Insight'],
        toolProficiencies: [],
        languages: 0,
        equipment: ['Uniform', 'Horn', 'Manacles', 'Pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, wis: 1 },
        feature: {
            name: 'Watcher\'s Eye',
            description: 'Your experience in enforcing the law, and dealing with lawbreakers, gives you a feel for local laws and criminals. You can easily find the local outpost of the watch or a similar organization, and just as easily pick out the dens of criminal activity in a community, although you\'re more likely to be welcome in the former locations rather than the latter.'
        }
    },
    {
        id: 'clan-crafter',
        name: 'Clan Crafter',
        description: 'You are a member of a clan of skilled artisans, merchants, miners, or smiths with strong ties to a mountain clan or a settlement in or near mountains.',
        skillProficiencies: ['History', 'Insight'],
        toolProficiencies: ['Smith\'s tools', 'Mason\'s tools', 'Or brewer\'s supplies'],
        languages: 1,
        equipment: ['Smith\'s tools or mason\'s tools', 'Maker\'s mark chisel', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { con: 2, int: 1 },
        feature: {
            name: 'Respect of the Stout Folk',
            description: 'As well respected as you are among your clan, you can rely on certain benefits. Your clan will provide food and lodging for you and your companions, or help you find a safe place to stay. In addition, your clan\'s artisans will create nonmagical items for you, provided you can supply the materials and pay a fair price for the labor.'
        }
    },
    {
        id: 'cloistered-scholar',
        name: 'Cloistered Scholar',
        description: 'You have been sequestered away from the rest of the world in a place where the accumulated knowledge of the world is carefully collected, preserved, and catalogued.',
        skillProficiencies: ['History', 'Investigation'],
        toolProficiencies: [],
        languages: 2,
        equipment: ['Scholar\'s pack', 'Writing kit', 'Borrowed book on the subject of your current study', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Library Access',
            description: 'Though others must often endure extensive interviews and significant fees to gain access to even the most common archives in your library, you have free and easy access to the majority of the library\'s resources.'
        }
    },
    {
        id: 'courtier',
        name: 'Courtier',
        description: 'In your earlier days, you were a person of some importance in a noble court or a bureaucratic organization.',
        skillProficiencies: ['Insight', 'Persuasion'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Scroll of pedigree', 'Belt pouch', '5 gp'],
        abilityScoreIncrease: { cha: 2, wis: 1 },
        feature: {
            name: 'Court Functionary',
            description: 'Your knowledge of how bureaucracies function lets you gain access to the records and inner workings of any noble court or government you encounter. You know who the movers and shakers are, whom to go to for the favors you seek, and what the current intrigues of the court are.'
        }
    },
    {
        id: 'entertainer',
        name: 'Entertainer',
        description: 'You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them.',
        skillProficiencies: ['Acrobatics', 'Performance'],
        toolProficiencies: ['Disguise kit', 'One type of musical instrument'],
        languages: 0,
        equipment: ['Musical instrument', 'Favor of an admirer', 'Costume', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { cha: 2, dex: 1 },
        feature: {
            name: 'By Popular Demand',
            description: 'You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble\'s court, where you receive free lodging and food of a modest or comfortable standard (as long as you perform each night).'
        }
    },
    {
        id: 'faceless',
        name: 'Faceless',
        description: 'You are a member of a secretive organization that trades in information and secrets.',
        skillProficiencies: ['Deception', 'Intimidation'],
        toolProficiencies: ['Disguise kit', 'Forgery kit'],
        languages: 1,
        equipment: ['Disguise kit', 'Forgery kit', 'Common clothes', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { dex: 2, int: 1 },
        feature: {
            name: 'Eyes Everywhere',
            description: 'Your organization has safe houses and informants in many cities. You know the secret signs and code words that allow you to identify safe houses and make contact with other members of your organization.'
        }
    },
    {
        id: 'faction-agent',
        name: 'Faction Agent',
        description: 'You are an active member of a faction that has given you benefits that help you pursue your goals.',
        skillProficiencies: ['Insight', 'Investigation'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Badge or emblem', 'Copy of a seminal faction text', 'Common clothes', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Safe Haven',
            description: 'As a faction agent, you have access to a secret network of supporters and operatives who can provide assistance on your adventures. You know a set of secret signs and passwords you can use to identify such operatives, who will provide you with lodging, food, and supplies.'
        }
    },
    {
        id: 'far-traveler',
        name: 'Far Traveler',
        description: 'You are from a distant place, one so remote that few of the common folk in the current region know of it.',
        skillProficiencies: ['Insight', 'Perception'],
        toolProficiencies: ['One musical instrument or gaming set'],
        languages: 1,
        equipment: ['Musical instrument or gaming set', 'Poorly wrought maps from your homeland', 'Small piece of jewelry worth 10 gp', 'Traveler\'s clothes', 'Belt pouch', '5 gp'],
        abilityScoreIncrease: { wis: 2, dex: 1 },
        feature: {
            name: 'All Eyes on You',
            description: 'Your accent, mannerisms, figures of speech, and perhaps even your appearance all mark you as foreign. Curious glances are directed your way wherever you go, which can be a nuisance, but you also gain the friendly interest of scholars and others intrigued by far-off lands, to say nothing of everyday folk who are eager to hear stories of your homeland.'
        }
    },
    {
        id: 'feylost',
        name: 'Feylost',
        description: 'You were lost in the Feywild as a child, but you found your way back to the Material Plane.',
        skillProficiencies: ['Deception', 'Survival'],
        toolProficiencies: ['One type of musical instrument'],
        languages: 1,
        equipment: ['Musical instrument', 'Trinket from the Feywild', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { cha: 2, wis: 1 },
        feature: {
            name: 'Feywild Connection',
            description: 'Your time in the Feywild has left you with a connection to that plane. You can find safe passage through the Feywild, and you know the secret ways and hidden paths of that realm.'
        }
    },
    {
        id: 'fisher',
        name: 'Fisher',
        description: 'You grew up on the water, learning to fish, sail, and navigate the treacherous waters of the world.',
        skillProficiencies: ['History', 'Survival'],
        toolProficiencies: ['Navigator\'s tools', 'Vehicles (water)'],
        languages: 0,
        equipment: ['Fishing tackle', 'Net', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { con: 2, wis: 1 },
        feature: {
            name: 'Fisher\'s Lore',
            description: 'You know how to find food and fresh water for yourself and up to five other people each day, provided that the bodies of water you have access to contain fish or other life.'
        }
    },
    {
        id: 'giant-foundling',
        name: 'Giant Foundling',
        description: 'You were raised by giants or found yourself in their care, and you learned their ways.',
        skillProficiencies: ['Athletics', 'Intimidation'],
        toolProficiencies: ['One type of artisan\'s tools'],
        languages: 1,
        equipment: ['Artisan\'s tools', 'Giant-sized trinket', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, con: 1 },
        feature: {
            name: 'Giant\'s Legacy',
            description: 'You have inherited a measure of the might of giants. You can speak, read, and write Giant. In addition, you can always find a place to perform physical labor or hear stories of giants, usually in a settlement that has a history of trade or conflict with giants.'
        }
    },
    {
        id: 'gladiator',
        name: 'Gladiator',
        description: 'You are a gladiator who fought in arenas for the entertainment of others.',
        skillProficiencies: ['Athletics', 'Performance'],
        toolProficiencies: ['One type of gaming set'],
        languages: 0,
        equipment: ['Unusual weapon', 'Costume', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { str: 2, cha: 1 },
        feature: {
            name: 'By Popular Demand',
            description: 'You can always find a place to perform in any settlement that features an arena or fighting pit. You receive free lodging and food of a modest or comfortable standard (as long as you perform each night). In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.'
        }
    },
    {
        id: 'guild-artisan',
        name: 'Guild Artisan',
        description: 'You are a member of an artisan\'s guild, skilled in a particular field and closely associated with other artisans.',
        skillProficiencies: ['Insight', 'Persuasion'],
        toolProficiencies: ['One type of artisan\'s tools'],
        languages: 1,
        equipment: ['Artisan\'s tools', 'Letter of introduction from your guild', 'Traveler\'s clothes', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { int: 2, cha: 1 },
        feature: {
            name: 'Guild Membership',
            description: 'As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings.'
        }
    },
    {
        id: 'guild-merchant',
        name: 'Guild Merchant',
        description: 'You are a member of a guild of traders, caravan masters, and shopkeepers.',
        skillProficiencies: ['Insight', 'Persuasion'],
        toolProficiencies: ['Navigator\'s tools'],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Letter of introduction from your guild', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { cha: 2, wis: 1 },
        feature: {
            name: 'Guild Membership',
            description: 'As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings.'
        }
    },
    {
        id: 'haunted-one',
        name: 'Haunted One',
        description: 'You are haunted by something so terrible that you dare not speak of it.',
        skillProficiencies: ['Investigation', 'Religion'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Monster hunter\'s pack', 'Trophy from a slain monster', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { wis: 2, int: 1 },
        feature: {
            name: 'Heart of Darkness',
            description: 'Those who look into your eyes can see that you have faced unimaginable horror and that you are no stranger to darkness. Though they might fear you, commoners will extend you every courtesy and do their utmost to help you. Unless you have shown yourself to be a danger to them, they will even take up arms to fight alongside you should you find yourself facing an enemy alone.'
        }
    },
    {
        id: 'hermit',
        name: 'Hermit',
        description: 'You lived in seclusion—either in a sheltered community such as a monastery, or entirely alone—for a formative part of your life.',
        skillProficiencies: ['Medicine', 'Religion'],
        toolProficiencies: ['Herbalism kit'],
        languages: 1,
        equipment: ['Scroll case stuffed full of notes from your studies or prayers', 'Winter blanket', 'Common clothes', 'Herbalism kit', '5 gp'],
        abilityScoreIncrease: { wis: 2, int: 1 },
        feature: {
            name: 'Discovery',
            description: 'The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature.'
        }
    },
    {
        id: 'house-agent',
        name: 'House Agent',
        description: 'You are a member of a powerful merchant house or trading company.',
        skillProficiencies: ['Investigation', 'Persuasion'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Letter of introduction', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, cha: 1 },
        feature: {
            name: 'House Connections',
            description: 'Your house has connections in many cities. You can find safe houses, trading posts, and other facilities run by your house in any settlement of significant size.'
        }
    },
    {
        id: 'inheritor',
        name: 'Inheritor',
        description: 'You are the heir to something of great value—not mere coin or wealth, but an object that has been entrusted to you and you alone.',
        skillProficiencies: ['Survival', 'Investigation'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Your inheritance', 'Traveler\'s clothes', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { cha: 2, wis: 1 },
        feature: {
            name: 'Inheritance',
            description: 'You have inherited something from a relative or mentor. This inheritance might be a physical object, a piece of knowledge, or even a responsibility. Work with your DM to determine the nature of your inheritance and how it might affect your adventures.'
        }
    },
    {
        id: 'investigator-scag',
        name: 'Investigator (SCAG)',
        description: 'You are a private investigator, solving mysteries and uncovering secrets for clients.',
        skillProficiencies: ['Investigation', 'Insight'],
        toolProficiencies: [],
        languages: 0,
        equipment: ['Magnifying glass', 'Notebook', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Eye for Detail',
            description: 'You have an eye for detail and can pick out clues that others might miss. You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to inspect, search, or study objects and locations.'
        }
    },
    {
        id: 'investigator-vrgr',
        name: 'Investigator (VRGR)',
        description: 'You are a private investigator, solving mysteries and uncovering secrets for clients.',
        skillProficiencies: ['Investigation', 'Insight'],
        toolProficiencies: [],
        languages: 0,
        equipment: ['Magnifying glass', 'Notebook', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Eye for Detail',
            description: 'You have an eye for detail and can pick out clues that others might miss. You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to inspect, search, or study objects and locations.'
        }
    },
    {
        id: 'knight',
        name: 'Knight',
        description: 'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.',
        skillProficiencies: ['History', 'Persuasion'],
        toolProficiencies: ['One type of gaming set'],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Scroll of pedigree', 'Purse', '25 gp'],
        abilityScoreIncrease: { cha: 2, int: 1 },
        feature: {
            name: 'Retainers',
            description: 'You have the service of three retainers loyal to your family. These retainers can be attendants or messengers, and one might be a majordomo. Your retainers are commoners who can perform mundane tasks for you, but they do not fight for you, will not follow you into obviously dangerous areas (such as dungeons), and will leave if they are frequently endangered or abused.'
        }
    },
    {
        id: 'knight-of-the-order',
        name: 'Knight of the Order',
        description: 'You belong to an order of knights who have sworn oaths to achieve a certain goal.',
        skillProficiencies: ['Persuasion', 'History'],
        toolProficiencies: ['One type of gaming set'],
        languages: 1,
        equipment: ['Fine clothes', 'Signet ring', 'Scroll of pedigree', 'Purse', '25 gp'],
        abilityScoreIncrease: { cha: 2, str: 1 },
        feature: {
            name: 'Knightly Regard',
            description: 'You receive shelter and succor from members of your knightly order and those who are sympathetic to its aims. If your order is a religious one, you can gain aid from temples and other religious communities of your deity. If you are pursuing a mission for your order, you can usually obtain horses, equipment, and funds for yourself and your companions.'
        }
    },
    {
        id: 'marine',
        name: 'Marine',
        description: 'You are a member of a military force trained to fight on ships and in coastal regions.',
        skillProficiencies: ['Athletics', 'Survival'],
        toolProficiencies: ['Navigator\'s tools', 'Vehicles (water)'],
        languages: 0,
        equipment: ['Uniform', 'Insignia of rank', 'Dagger', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, con: 1 },
        feature: {
            name: 'Ship\'s Passage',
            description: 'When you need to, you can secure free passage on a sailing ship for yourself and your companions. You might sail on the ship you served on, or another ship you have good relations with, and you are able to secure passage in exchange for your service.'
        }
    },
    {
        id: 'mercenary-veteran',
        name: 'Mercenary Veteran',
        description: 'You have spent years fighting as a soldier for hire, and you have made a name for yourself in the process.',
        skillProficiencies: ['Athletics', 'Persuasion'],
        toolProficiencies: ['One type of gaming set', 'Vehicles (land)'],
        languages: 0,
        equipment: ['Uniform', 'Insignia of rank', 'Trophy from a fallen enemy', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, cha: 1 },
        feature: {
            name: 'Mercenary Life',
            description: 'You know the mercenary life as only someone who has experienced it can. You are able to identify mercenary companies and their symbols, and you know mercenaries\' tactics and organization. You can find the taverns and other places where mercenaries abide in any settlement, and you have contacts that can help you connect with other mercenaries.'
        }
    },
    {
        id: 'outlander',
        name: 'Outlander',
        description: 'You grew up in the wilds, far from civilization and the comforts of town and technology.',
        skillProficiencies: ['Athletics', 'Survival'],
        toolProficiencies: ['One type of musical instrument'],
        languages: 1,
        equipment: ['Staff', 'Hunting trap', 'Trophy from an animal you killed', 'Traveler\'s clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { str: 2, wis: 1 },
        feature: {
            name: 'Wanderer',
            description: 'You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.'
        }
    },
    {
        id: 'pirate',
        name: 'Pirate',
        description: 'You spent your youth under the sway of a dread pirate, a ruthless cutthroat who taught you how to survive in a world of sharks and savages.',
        skillProficiencies: ['Athletics', 'Perception'],
        toolProficiencies: ['Navigator\'s tools', 'Vehicles (water)'],
        languages: 0,
        equipment: ['Belaying pin (club)', '50 feet of silk rope', 'Lucky charm', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { dex: 2, wis: 1 },
        feature: {
            name: 'Bad Reputation',
            description: 'No matter where you go, people are afraid of you due to your reputation. When you are in a civilized settlement, you can get away with minor criminal offenses, such as refusing to pay for food at a tavern or breaking down doors at a local shop, since most people will not report your activity to the authorities.'
        }
    },
    {
        id: 'rewarded',
        name: 'Rewarded',
        description: 'You have been rewarded for a great service you performed, and this reward has shaped your life.',
        skillProficiencies: ['Investigation', 'Persuasion'],
        toolProficiencies: [],
        languages: 1,
        equipment: ['Fine clothes', 'Reward token or certificate', 'Belt pouch', '25 gp'],
        abilityScoreIncrease: { cha: 2, int: 1 },
        feature: {
            name: 'Reward',
            description: 'You have been granted a reward for your service. This might be a title, land, wealth, or some other benefit. Work with your DM to determine the nature of your reward and how it might affect your adventures.'
        }
    },
    {
        id: 'ruined',
        name: 'Ruined',
        description: 'You were once wealthy and powerful, but you have lost everything.',
        skillProficiencies: ['Deception', 'Survival'],
        toolProficiencies: [],
        languages: 0,
        equipment: ['Rags', 'Memento of your former life', 'Belt pouch', '1 gp'],
        abilityScoreIncrease: { cha: 2, wis: 1 },
        feature: {
            name: 'Ruined',
            description: 'You have lost everything—your wealth, your status, your home. But you have gained something as well: the knowledge of what it means to have nothing, and the determination to never be in that position again.'
        }
    },
    {
        id: 'rune-carver',
        name: 'Rune Carver',
        description: 'You have learned the ancient art of rune carving, a skill passed down through generations.',
        skillProficiencies: ['Arcana', 'History'],
        toolProficiencies: ['Calligrapher\'s supplies'],
        languages: 1,
        equipment: ['Calligrapher\'s supplies', 'Set of runes', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, wis: 1 },
        feature: {
            name: 'Rune Lore',
            description: 'You can read and understand runic inscriptions. In addition, you know the history and meaning of many runes, and you can identify magical runes and their effects.'
        }
    },
    {
        id: 'sailor',
        name: 'Sailor',
        description: 'You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths.',
        skillProficiencies: ['Athletics', 'Perception'],
        toolProficiencies: ['Navigator\'s tools', 'Vehicles (water)'],
        languages: 0,
        equipment: ['Belaying pin (club)', '50 feet of silk rope', 'Lucky charm such as a rabbit foot or a small stone with a hole in the center', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { dex: 2, wis: 1 },
        feature: {
            name: 'Ship\'s Passage',
            description: 'When you need to, you can secure free passage on a sailing ship for yourself and your companions. You might sail on the ship you served on, or another ship you have good relations with, and you are able to secure passage in exchange for your service.'
        }
    },
    {
        id: 'shipwright',
        name: 'Shipwright',
        description: 'You are a skilled shipwright, capable of building and repairing ships.',
        skillProficiencies: ['History', 'Investigation'],
        toolProficiencies: ['Carpenter\'s tools', 'Vehicles (water)'],
        languages: 0,
        equipment: ['Carpenter\'s tools', 'Ship\'s log', 'Common clothes', 'Belt pouch', '10 gp'],
        abilityScoreIncrease: { int: 2, str: 1 },
        feature: {
            name: 'Shipwright\'s Knowledge',
            description: 'You know how to build, repair, and maintain ships. You can identify the type and quality of a ship, and you know how to make repairs to keep a ship seaworthy.'
        }
    },
    {
        id: 'smuggler',
        name: 'Smuggler',
        description: 'You are a smuggler, skilled at moving contraband past watchful eyes.',
        skillProficiencies: ['Deception', 'Stealth'],
        toolProficiencies: ['Forgery kit'],
        languages: 0,
        equipment: ['Crowbar', 'Dark common clothes with hood', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { dex: 2, cha: 1 },
        feature: {
            name: 'Criminal Contact',
            description: 'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.'
        }
    },
    {
        id: 'spy',
        name: 'Spy',
        description: 'You are a spy, skilled at gathering information and operating in the shadows.',
        skillProficiencies: ['Deception', 'Stealth'],
        toolProficiencies: ['Disguise kit', 'Thieves\' tools'],
        languages: 1,
        equipment: ['Crowbar', 'Dark common clothes with hood', 'Belt pouch', '15 gp'],
        abilityScoreIncrease: { dex: 2, int: 1 },
        feature: {
            name: 'Criminal Contact',
            description: 'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.'
        }
    },
    {
        id: 'wayfarer',
        name: 'Wayfarer',
        description: 'You grew up on the streets surrounded by similarly ill-fated castoffs, a few of them friends and a few of them rivals. You slept where you could and did odd jobs for food. At times, when the hunger became unbearable, you resorted to theft. Still, you never lost your pride and never abandoned hope. Fate is not yet finished with you.',
        skillProficiencies: ['Insight', 'Stealth'],
        toolProficiencies: ['Thieves\' tools'],
        languages: 0,
        equipment: ['2 Daggers', 'Thieves\' tools', 'One type of gaming set', 'Bedroll', '2 Pouches', 'Traveler\'s clothes', '16 gp'],
        abilityScoreIncrease: { dex: 2, cha: 1 },
        feature: {
            name: 'Lucky',
            description: 'You have the Lucky feat. You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20 and choose which of the d20s to use. You regain expended luck points when you finish a long rest.'
        }
    }
];
