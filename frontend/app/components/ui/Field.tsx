'use client';
import { forwardRef, useId } from 'react';

/** Props to spread onto the control so its label, hint and error are wired up. */
export interface FieldControlProps {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: true;
}

interface FieldProps {
    label: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
    /** Render the control with the provided props, e.g. `{(p) => <select {...p} />}`. */
    children: (controlProps: FieldControlProps) => React.ReactNode;
    className?: string;
}

/** Label + control + hint/error, with `htmlFor`/`aria-describedby` wired up. */
export function Field({ label, hint, error, children, className }: FieldProps) {
    const id = useId();
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={className ? `field ${className}` : 'field'}>
            <label className="field-label" htmlFor={id}>{label}</label>
            {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
            {hint && <div className="field-hint" id={hintId}>{hint}</div>}
            {error && <div className="field-error" id={errorId}>{error}</div>}
        </div>
    );
}

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
    label: React.ReactNode;
    hint?: React.ReactNode;
    error?: React.ReactNode;
}

/** A labelled `<input className="input">`. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    { label, hint, error, className, ...inputProps },
    ref
) {
    return (
        <Field label={label} hint={hint} error={error}>
            {(controlProps) => (
                <input
                    ref={ref}
                    className={className ? `input ${className}` : 'input'}
                    {...inputProps}
                    {...controlProps}
                />
            )}
        </Field>
    );
});

export default Field;
