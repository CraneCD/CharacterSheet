const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 365 * 24 * 60 * 60],
    ['month', 30 * 24 * 60 * 60],
    ['week', 7 * 24 * 60 * 60],
    ['day', 24 * 60 * 60],
    ['hour', 60 * 60],
    ['minute', 60],
];

/** "just now", "5 minutes ago", "yesterday", "3 weeks ago". Returns '' for an invalid date. */
export function formatRelativeTime(date: string | number | Date, now: Date = new Date()): string {
    const time = new Date(date).getTime();
    if (!Number.isFinite(time)) return '';
    const seconds = Math.round((time - now.getTime()) / 1000);
    if (Math.abs(seconds) < 60) return 'just now';
    const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    for (const [unit, size] of UNITS) {
        if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    }
    return 'just now';
}
