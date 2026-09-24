'use client';

export interface WizardStep {
    label: string;
}

interface WizardStepperProps {
    steps: WizardStep[];
    /** Current step, 1-based. */
    current: number;
    isComplete: (step: number) => boolean;
    canVisit: (step: number) => boolean;
    onSelect: (step: number) => void;
}

/** Labelled progress steps. Finished steps show a check, and any step you've unlocked can be clicked. */
export default function WizardStepper({ steps, current, isComplete, canVisit, onSelect }: WizardStepperProps) {
    return (
        <nav aria-label="Character creation steps" className="wizard-stepper">
            <ol>
                {steps.map((step, i) => {
                    const n = i + 1;
                    const isCurrent = n === current;
                    const complete = !isCurrent && isComplete(n);
                    const state = isCurrent ? 'current' : complete ? 'complete' : 'upcoming';
                    return (
                        <li key={step.label} className={`wizard-stepper-item is-${state}`}>
                            <button
                                type="button"
                                onClick={() => onSelect(n)}
                                disabled={isCurrent || !canVisit(n)}
                                aria-current={isCurrent ? 'step' : undefined}
                                aria-label={`Step ${n}: ${step.label}${complete ? ' (done)' : ''}`}
                            >
                                <span className="wizard-stepper-marker" aria-hidden="true">{complete ? '✓' : n}</span>
                                <span className="wizard-stepper-label">{step.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
