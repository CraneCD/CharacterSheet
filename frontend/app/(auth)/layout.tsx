import D20Icon from '@/app/components/ui/D20Icon';

/** Login and register: a candlelit scene beside the form. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-frame">
            <div className="auth-scene">
                <D20Icon className="auth-scene-die" strokeWidth={2.5} />
                <p className="auth-scene-brand">D&amp;D 5.5e Character Sheet</p>
                <p className="auth-scene-title">Your hero, ready at the table</p>
                <p className="auth-scene-text">Build characters with the 2024 rules, tap any modifier to roll, and track HP, spells and rests on your phone or on paper.</p>
            </div>
            <div className="auth-form">{children}</div>
        </div>
    );
}
