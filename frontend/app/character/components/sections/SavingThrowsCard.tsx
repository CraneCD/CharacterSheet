import { SectionHeader } from '@/app/components/ui';
import { RollButton } from '@/app/components/dice/DiceTray';
import { ABILITY_NAMES, formatMod } from './format';

interface SavingThrowsCardProps {
    saves: { stat: string; total: number; isProficient: boolean }[];
    /** Where bonuses beyond ability and proficiency come from ("Includes Ring of Protection +1") */
    note?: string;
}

export default function SavingThrowsCard({ saves, note }: SavingThrowsCardProps) {
    return (
        <div className="card">
            <SectionHeader title="Saving Throws" />
            <ul className="stat-list">
                {saves.map((save) => (
                    <li key={save.stat} className="save-row">
                        <span className="stat-list-name">
                            <span className={save.isProficient ? 'proficient-dot is-proficient' : 'proficient-dot'} aria-hidden="true" />
                            <abbr title={ABILITY_NAMES[save.stat]}>{save.stat.toUpperCase()}</abbr>
                            {save.isProficient && <span className="visually-hidden"> (proficient)</span>}
                        </span>
                        <RollButton label={`${ABILITY_NAMES[save.stat]} save`} modifier={save.total} kind="save" ability={save.stat} className="stat-list-total">
                            {formatMod(save.total)}
                        </RollButton>
                    </li>
                ))}
            </ul>
            {note && <p className="stat-list-note">{note}</p>}
        </div>
    );
}
