'use client';

import { ABILITY_KEYS, abilityModifier, formatModifier, Monster, monsterInitiative, monsterXp, StatBlockEntry } from '@/lib/monsters';
import { EffectRollButton, RollButton } from '@/app/components/dice/DiceTray';

const ABILITY_LABELS: Record<string, string> = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' };

function Entries({ title, entries, monsterName, level }: { title: string; entries?: StatBlockEntry[]; monsterName: string; level: 3 | 4 }) {
    if (!entries || entries.length === 0) return null;
    const Heading = `h${level}` as 'h3' | 'h4';
    return (
        <section className="stat-block-section">
            <Heading className="stat-block-heading">{title}</Heading>
            {entries.map((e) => (
                <p key={e.name} className="stat-block-entry">
                    <strong><em>{e.name}.</em></strong>{' '}
                    {e.attackBonus !== undefined && (
                        <RollButton
                            label={`${monsterName}: ${e.name}`}
                            modifier={e.attackBonus}
                            kind="attack"
                            damage={e.damage ? { expression: e.damage, modifier: 0 } : undefined}
                            className="stat-block-roll"
                        >
                            {formatModifier(e.attackBonus)} to hit
                        </RollButton>
                    )}
                    {e.attackBonus === undefined && e.damage && (
                        <EffectRollButton label={`${monsterName}: ${e.name}`} expression={e.damage} modifier={0} className="stat-block-roll">
                            {e.damage}
                        </EffectRollButton>
                    )}
                    {(e.attackBonus !== undefined || e.damage) && ' '}
                    {e.description}
                </p>
            ))}
        </section>
    );
}

/**
 * A monster's stat block (2024 layout). Inside a DiceProvider its attacks,
 * saves and checks are tap-to-roll.
 */
export default function StatBlock({ monster, headingLevel = 3 }: { monster: Monster; headingLevel?: 2 | 3 }) {
    const Heading = `h${headingLevel}` as 'h2' | 'h3';
    const sub = (headingLevel + 1) as 3 | 4;
    const init = monsterInitiative(monster);
    const xp = monsterXp(monster);
    const saves = Object.entries(monster.saves ?? {});
    const skills = Object.entries(monster.skills ?? {});
    return (
        <article className="stat-block">
            <Heading className="stat-block-name">{monster.name}</Heading>
            <p className="stat-block-type">
                {monster.size} {monster.type}{monster.alignment ? `, ${monster.alignment}` : ''}
                {monster.source === 'custom' && <span className="custom-badge">Custom</span>}
            </p>
            <dl className="stat-block-core">
                <div><dt>AC</dt><dd>{monster.ac}{monster.acNote ? ` (${monster.acNote})` : ''}</dd></div>
                <div><dt>Initiative</dt><dd><RollButton label={`${monster.name} initiative`} modifier={init} kind="initiative">{formatModifier(init)}</RollButton> ({10 + init})</dd></div>
                <div><dt>HP</dt><dd>{monster.hp}{monster.hitDice ? ` (${monster.hitDice})` : ''}</dd></div>
                <div><dt>Speed</dt><dd>{monster.speed}</dd></div>
            </dl>
            <table className="stat-block-abilities">
                <thead>
                    <tr>{ABILITY_KEYS.map((a) => <th key={a} scope="col">{ABILITY_LABELS[a]}</th>)}</tr>
                </thead>
                <tbody>
                    <tr>
                        {ABILITY_KEYS.map((a) => {
                            const score = monster.abilities?.[a] ?? 10;
                            const check = abilityModifier(score);
                            const save = monster.saves?.[a] ?? check;
                            return (
                                <td key={a}>
                                    <span className="stat-block-score">{score}</span>
                                    <RollButton label={`${monster.name}: ${ABILITY_LABELS[a]} check`} modifier={check} kind="check" className="stat-block-mod">{formatModifier(check)}</RollButton>
                                    <RollButton label={`${monster.name}: ${ABILITY_LABELS[a]} save`} modifier={save} kind="save" className="stat-block-save">
                                        <span className="visually-hidden">save </span>{formatModifier(save)}
                                    </RollButton>
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
            <p className="stat-block-legend" aria-hidden="true">Score · check · save</p>
            <dl className="stat-block-details">
                {saves.length > 0 && <div><dt>Saving Throws</dt><dd>{saves.map(([a, v]) => `${ABILITY_LABELS[a]} ${formatModifier(v as number)}`).join(', ')}</dd></div>}
                {skills.length > 0 && (
                    <div>
                        <dt>Skills</dt>
                        <dd>
                            {skills.map(([name, v], i) => (
                                <span key={name}>
                                    {i > 0 && ', '}
                                    {name} <RollButton label={`${monster.name}: ${name}`} modifier={v} kind="check">{formatModifier(v)}</RollButton>
                                </span>
                            ))}
                        </dd>
                    </div>
                )}
                {monster.vulnerabilities && <div><dt>Vulnerabilities</dt><dd>{monster.vulnerabilities}</dd></div>}
                {monster.resistances && <div><dt>Resistances</dt><dd>{monster.resistances}</dd></div>}
                {monster.immunities && <div><dt>Immunities</dt><dd>{monster.immunities}</dd></div>}
                <div>
                    <dt>Senses</dt>
                    <dd>{[monster.senses && monster.senses !== '—' ? monster.senses : '', `Passive Perception ${monster.passivePerception ?? 10 + abilityModifier(monster.abilities?.wis ?? 10)}`].filter(Boolean).join('; ')}</dd>
                </div>
                {monster.languages && <div><dt>Languages</dt><dd>{monster.languages}</dd></div>}
                <div><dt>CR</dt><dd>{monster.cr} (XP {xp.toLocaleString()})</dd></div>
            </dl>
            {monster.description && <p className="stat-block-description">{monster.description}</p>}
            <Entries level={sub} title="Traits" entries={monster.traits} monsterName={monster.name} />
            <Entries level={sub} title="Actions" entries={monster.actions} monsterName={monster.name} />
            <Entries level={sub} title="Bonus Actions" entries={monster.bonusActions} monsterName={monster.name} />
            <Entries level={sub} title="Reactions" entries={monster.reactions} monsterName={monster.name} />
            {monster.legendaryActions && monster.legendaryActions.length > 0 && (
                <>
                    {monster.legendaryActionUses ? (
                        <p className="stat-block-entry"><em>Legendary Action Uses: {monster.legendaryActionUses}. Immediately after another creature&apos;s turn, the {monster.name.toLowerCase()} can expend a use to take one of these actions. It regains all uses at the start of each of its turns.</em></p>
                    ) : null}
                    <Entries level={sub} title="Legendary Actions" entries={monster.legendaryActions} monsterName={monster.name} />
                </>
            )}
        </article>
    );
}
