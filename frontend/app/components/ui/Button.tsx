import { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
    className?: string;
}

/** Class list for the shared button styles; use it to style a `<Link>` as a button. */
export function buttonClass({ variant = 'primary', size = 'md', block = false, className }: ButtonStyleOptions = {}): string {
    return [
        'btn',
        variant !== 'primary' && `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        block && 'btn-block',
        className,
    ].filter(Boolean).join(' ');
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleOptions {
    /** Shows a spinner and disables the button (e.g. while a request is in flight). */
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant, size, block, className, loading = false, disabled, type = 'button', children, ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            type={type}
            className={buttonClass({ variant, size, block, className })}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            {...rest}
        >
            {loading && <span className="btn-spinner" aria-hidden="true" />}
            {children}
        </button>
    );
});

export default Button;
