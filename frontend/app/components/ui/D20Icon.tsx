/** The d20 outline used for the brand mark and the dice tray. Decorative: hidden from screen readers. */
export default function D20Icon({ className, strokeWidth = 5 }: { className?: string; strokeWidth?: number }) {
    return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
                <polygon points="50,4 91,27 91,73 50,96 9,73 9,27" />
                <polygon points="50,30 74,68 26,68" />
                <path d="M50 4 L50 30 M91 27 L74 68 M91 27 L50 30 M9 27 L50 30 M9 27 L26 68 M91 73 L74 68 M9 73 L26 68 M50 96 L26 68 M50 96 L74 68" />
            </g>
        </svg>
    );
}
