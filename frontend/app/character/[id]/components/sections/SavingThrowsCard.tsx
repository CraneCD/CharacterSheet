import { SectionHeader } from '@/app/components/ui';
import { ABILITY_NAMES, formatMod } from './format';

interface SavingThrowsCardProps {
    saves: { stat: string; total: number; isProficient: boolean }[];
}

export default function SavingThrowsCard({ saves }: SavingThrowsCardProps) {
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
                        <span className="stat-list-total">{formatMod(save.total)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
