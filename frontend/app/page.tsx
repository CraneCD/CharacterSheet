import Image from 'next/image';
import Link from 'next/link';
import { buttonClass } from './components/ui/Button';
import sheetDesktop from '../public/landing/sheet-desktop.jpg';
import sheetPhone from '../public/landing/sheet-phone.jpg';
import spells from '../public/landing/spells.jpg';

const FEATURES = [
    {
        title: 'Built for the table',
        text: 'Take damage and heal in one tap, with temporary HP and death saves handled for you. Short and Long Rests restore exactly what the 2024 rules say.',
    },
    {
        title: '2024 rules, start to finish',
        text: 'Species, backgrounds, Origin feats, class choices and level-ups follow the 2024 Player’s Handbook, with your draft saved as you go.',
    },
    {
        title: 'Every spell in reach',
        text: 'Prepare spells, track slots and Pact Magic, and filter by level, school, concentration or ritual when you need an answer fast.',
    },
    {
        title: 'Anywhere you play',
        text: 'A phone layout with your vitals always in view, light and dark themes, and a clean printout for the table.',
    },
];

export default function Home() {
    return (
        <div className="landing">
            <section className="landing-hero">
                <h1 className="landing-title">D&amp;D 5.5e Character Sheet</h1>
                <p className="landing-lead">
                    Create, manage and play your One D&amp;D characters, with the 2024 rules built in.
                </p>
                <div className="landing-actions">
                    <Link href="/register" className={buttonClass({ size: 'lg' })}>
                        Create account
                    </Link>
                    <Link href="/login" className={buttonClass({ variant: 'secondary', size: 'lg' })}>
                        Log in
                    </Link>
                </div>
            </section>

            <section className="landing-shots" aria-label="Screenshots">
                <Image
                    src={sheetDesktop}
                    alt="Character sheet for a level 5 elf wizard: ability scores, hit points with damage and heal controls, hit dice and class resources."
                    className="landing-shot landing-shot-desktop"
                    sizes="(max-width: 900px) 100vw, 900px"
                    priority
                />
                <Image
                    src={sheetPhone}
                    alt="The same sheet on a phone, with HP, AC and speed pinned at the top and tabs for each section."
                    className="landing-shot landing-shot-phone"
                    sizes="(max-width: 900px) 40vw, 240px"
                />
            </section>

            <section className="landing-features" aria-labelledby="features-heading">
                <h2 id="features-heading" className="visually-hidden">Features</h2>
                {FEATURES.map((f) => (
                    <div key={f.title} className="landing-feature">
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                    </div>
                ))}
            </section>

            <section className="landing-shots landing-shots-single" aria-label="Spell list">
                <Image
                    src={spells}
                    alt="A wizard's spellbook grouped by level, with spell slots, prepare buttons and filters for level, school, concentration and ritual."
                    className="landing-shot"
                    sizes="(max-width: 900px) 100vw, 900px"
                />
            </section>

            <section className="landing-hero landing-footer-cta">
                <Link href="/register" className={buttonClass({ size: 'lg' })}>
                    Create your first character
                </Link>
            </section>
        </div>
    );
}
