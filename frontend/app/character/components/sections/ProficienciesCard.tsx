import CoreCard from './CoreCard';
import { LanguagesEditor } from './LanguagesCard';

interface ProficienciesCardProps {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
    onAddLanguage: (language: string) => void;
    onRemoveLanguage: (language: string) => void;
    collapsed: boolean;
    autoCollapsed?: boolean;
    onToggle: () => void;
}

const list = (items: string[]) => (items.length > 0 ? items.join(', ') : 'None');

/** Armor, weapon and tool proficiencies with the character's languages (editable). */
export default function ProficienciesCard({
    armor, weapons, tools, languages, onAddLanguage, onRemoveLanguage, collapsed, autoCollapsed, onToggle,
}: ProficienciesCardProps) {
    const summary = (
        <>
            <span>{languages.length > 0 ? languages.join(', ') : 'No languages'}</span>
            {weapons.length > 0 && <span>{weapons.join(', ')}</span>}
        </>
    );
    return (
        <CoreCard
            cardId="proficiencies"
            title="Proficiencies & Languages"
            summary={summary}
            collapsed={collapsed}
            autoCollapsed={autoCollapsed}
            onToggle={onToggle}
        >
            <dl className="core-facts">
                <div><dt>Armor</dt><dd>{list(armor)}</dd></div>
                <div><dt>Weapons</dt><dd>{list(weapons)}</dd></div>
                <div><dt>Tools</dt><dd>{list(tools)}</dd></div>
            </dl>
            <h4 className="core-subtitle">Languages</h4>
            <LanguagesEditor languages={languages} onAdd={onAddLanguage} onRemove={onRemoveLanguage} />
        </CoreCard>
    );
}
