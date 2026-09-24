'use client';

import Link from 'next/link';
import { Button, buttonClass } from '@/app/components/ui';
import { CharacterDraft, describeDraft } from '@/lib/characterDraft';
import { formatRelativeTime } from '@/lib/relativeTime';

const STEP_LABELS = ['Species', 'Class', 'Abilities', 'Background', 'Equipment', 'Choices & Review'];

interface DraftCardProps {
    draft: CharacterDraft;
    onDiscard: () => void;
}

/** An unfinished character from the creation wizard, saved in this browser. */
export default function DraftCard({ draft, onDiscard }: DraftCardProps) {
    return (
        <section className="draft-card" aria-label="Unfinished character">
            <div>
                <div className="draft-card-title">Unfinished: {describeDraft(draft)}</div>
                <div className="draft-card-meta">
                    Step {draft.step} of 6: {STEP_LABELS[draft.step - 1]} · saved {formatRelativeTime(draft.savedAt)}
                </div>
            </div>
            <div className="draft-card-actions">
                <Button variant="ghost" size="sm" onClick={onDiscard}>Discard</Button>
                <Link href="/create" className={buttonClass({ size: 'sm' })}>Continue</Link>
            </div>
        </section>
    );
}
