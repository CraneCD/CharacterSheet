interface CardProps extends React.HTMLAttributes<HTMLElement> {
    as?: 'div' | 'section' | 'article';
}

export function Card({ as: Tag = 'div', className, ...rest }: CardProps) {
    return <Tag className={className ? `card ${className}` : 'card'} {...rest} />;
}

interface SectionHeaderProps {
    title: React.ReactNode;
    /** Buttons or links shown to the right of the title. */
    actions?: React.ReactNode;
    as?: 'h2' | 'h3' | 'h4';
    id?: string;
}

/** The muted, uppercase title used at the top of sheet cards. */
export function SectionHeader({ title, actions, as: Tag = 'h3', id }: SectionHeaderProps) {
    return (
        <div className="section-header">
            <Tag className="section-title" id={id}>{title}</Tag>
            {actions && <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>{actions}</div>}
        </div>
    );
}

export default Card;
