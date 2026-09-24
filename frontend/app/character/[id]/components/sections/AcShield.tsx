/** Armor Class drawn inside a shield (the header AC stat). */
export default function AcShield({ value }: { value: number }) {
    return (
        <span className="ac-shield">
            <svg viewBox="0 0 100 104" aria-hidden="true" focusable="false">
                <path d="M50 4 L92 18 V50 C92 76 72 92 50 100 C28 92 8 76 8 50 V18 Z" />
            </svg>
            <span className="ac-shield-value">{value}</span>
        </span>
    );
}
