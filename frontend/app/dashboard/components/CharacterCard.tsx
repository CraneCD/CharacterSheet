'use client';

import Link from 'next/link';
import { Menu } from '@/app/components/ui';
import { getHpStatus } from '@/lib/hp';
import { displayName } from '@/lib/characterTransfer';
import { formatRelativeTime } from '@/lib/relativeTime';

export interface CharacterSummary {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    updatedAt?: string;
    data?: { portrait?: string; hp?: { current: number; max: number; temp: number } };
}

interface CharacterCardProps {
    character: CharacterSummary;
    onExport: (character: CharacterSummary) => void;
    onDelete: (character: CharacterSummary) => void;
}

export default function CharacterCard({ character, onExport, onDelete }: CharacterCardProps) {
    const hp = character.data?.hp;
    const status = hp ? getHpStatus(hp) : 'healthy';
    const hpPercent = hp && hp.max > 0 ? Math.round((Math.max(0, hp.current) / hp.max) * 100) : 0;
    const edited = character.updatedAt ? formatRelativeTime(character.updatedAt) : '';

    return (
        <article className={`card character-card hp-${status}`}>
            <Link href={`/character/${character.id}`} className="character-card-link">
                <div className="character-card-portrait">
                    {character.data?.portrait ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={character.data.portrait} alt="" />
                    ) : (
                        <span aria-hidden="true">{(character.name || '?').trim().charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <div className="character-card-body">
                    <h2 className="character-card-name">{character.name}</h2>
                    <p className="character-card-meta">
                        Level {character.level} {displayName(character.race)} {displayName(character.class)}
                    </p>
                    {hp && hp.max > 0 && (
                        <div className="character-card-hp">
                            <div className="hp-bar" aria-hidden="true">
                                <div className="hp-bar-fill" style={{ width: `${hpPercent}%` }} />
                            </div>
                            <span>
                                {hp.current}/{hp.max} HP{hp.temp > 0 ? ` (+${hp.temp})` : ''}
                            </span>
                        </div>
                    )}
                    {edited && <p className="character-card-edited">Edited {edited}</p>}
                </div>
            </Link>
            <div className="character-card-menu">
                <Menu
                    label="⋯"
                    ariaLabel={`Actions for ${character.name}`}
                    variant="ghost"
                    items={[
                        { label: 'Export JSON', onSelect: () => onExport(character) },
                        { label: 'Delete…', onSelect: () => onDelete(character), danger: true, separatorBefore: true },
                    ]}
                />
            </div>
        </article>
    );
}
