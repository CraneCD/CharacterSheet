import type { CSSProperties } from 'react';
import { classColorVar } from '@/lib/classColors';

interface CharacterTokenProps {
    name: string;
    /** Uploaded portrait (data URL); without one the token shows the name's initial. */
    portrait?: string | null;
    /** Sets the ring colour. */
    classId?: string | null;
    level?: number;
    size?: 'sm' | 'md' | 'lg';
    /** How much of the ring is filled, 0 to 1 (the dashboard uses it as an HP gauge). */
    ring?: number;
}

/**
 * A round portrait token like a miniature's base: portrait or initial, a ring in the class
 * colour and the level on the ring. Decorative; put the accessible name on whatever wraps it.
 */
export default function CharacterToken({ name, portrait, classId, level, size = 'md', ring = 1 }: CharacterTokenProps) {
    const fill = Math.round(Math.min(1, Math.max(0, ring)) * 100);
    const style = { '--class-color': classColorVar(classId), '--ring': `${fill}%` } as CSSProperties;
    const initial = name.trim().charAt(0).toUpperCase() || '?';
    return (
        <span className={`token token-${size}`} style={style} aria-hidden="true">
            <span className="token-face">
                {portrait
                    // eslint-disable-next-line @next/next/no-img-element -- data URL portraits
                    ? <img src={portrait} alt="" className="token-portrait" />
                    : <span className="token-initial">{initial}</span>}
            </span>
            {level !== undefined && <span className="token-level">Lv {level}</span>}
        </span>
    );
}
