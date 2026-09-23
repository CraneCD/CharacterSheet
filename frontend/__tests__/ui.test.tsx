import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef, useState } from 'react';
import '@testing-library/jest-dom';
import Button, { buttonClass } from '@/app/components/ui/Button';
import Modal from '@/app/components/ui/Modal';
import ConfirmDialog from '@/app/components/ui/ConfirmDialog';
import { TextField } from '@/app/components/ui/Field';
import { EditableStat, Stat } from '@/app/components/ui/Stat';
import { ToastProvider, useToast } from '@/app/components/ui/Toast';
import { describeError, useOptimisticSave } from '@/app/components/ui/useOptimisticSave';

describe('Button', () => {
    it('builds class names for variants and sizes', () => {
        expect(buttonClass()).toBe('btn');
        expect(buttonClass({ variant: 'danger', size: 'sm', block: true })).toBe('btn btn-danger btn-sm btn-block');
    });

    it('disables itself and marks busy while loading', () => {
        render(<Button loading>Save</Button>);
        const button = screen.getByRole('button', { name: 'Save' });
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(button).toHaveAttribute('type', 'button');
    });
});

describe('Modal', () => {
    it('is a labelled modal dialog rendered into the body', () => {
        render(<Modal title="Add Item" onClose={() => {}}><p>Body</p></Modal>);
        const dialog = screen.getByRole('dialog', { name: 'Add Item' });
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog.parentElement?.parentElement).toBe(document.body);
    });

    it('closes on Escape, the close button and an overlay click, but not a click inside', () => {
        const onClose = jest.fn();
        render(<Modal title="T" onClose={onClose}><p>Inside</p></Modal>);

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledTimes(2);

        const inside = screen.getByText('Inside');
        fireEvent.mouseDown(inside);
        fireEvent.click(inside);
        expect(onClose).toHaveBeenCalledTimes(2);

        const overlay = screen.getByRole('dialog').parentElement!;
        fireEvent.mouseDown(overlay);
        fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(3);
    });

    it('ignores Escape and overlay clicks when not dismissible', () => {
        const onClose = jest.fn();
        render(<Modal title="T" onClose={onClose} dismissible={false}>x</Modal>);
        fireEvent.keyDown(document, { key: 'Escape' });
        const overlay = screen.getByRole('dialog').parentElement!;
        fireEvent.mouseDown(overlay);
        fireEvent.click(overlay);
        expect(onClose).not.toHaveBeenCalled();
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    it('moves focus in, traps Tab and restores focus on close', () => {
        function Harness() {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <button onClick={() => setOpen(true)}>Open</button>
                    {open && (
                        <Modal ariaLabel="Dialog" onClose={() => setOpen(false)}>
                            <button>First</button>
                            <button>Last</button>
                        </Modal>
                    )}
                </>
            );
        }
        render(<Harness />);
        const opener = screen.getByRole('button', { name: 'Open' });
        opener.focus();
        fireEvent.click(opener);

        const dialog = screen.getByRole('dialog', { name: 'Dialog' });
        expect(dialog).toHaveFocus();
        expect(document.body.style.overflow).toBe('hidden');

        screen.getByRole('button', { name: 'Last' }).focus();
        fireEvent.keyDown(document, { key: 'Tab' });
        expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();

        fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
        expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(opener).toHaveFocus();
        expect(document.body.style.overflow).toBe('');
    });

    it('keeps focus on a child that autofocuses', () => {
        render(<Modal ariaLabel="D" onClose={() => {}}><input aria-label="Name" autoFocus /></Modal>);
        expect(screen.getByLabelText('Name')).toHaveFocus();
    });

    it('only closes the top modal on Escape when nested', () => {
        const outer = jest.fn();
        const inner = jest.fn();
        render(
            <Modal ariaLabel="Outer" onClose={outer}>
                <Modal ariaLabel="Inner" onClose={inner}>x</Modal>
            </Modal>
        );
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(inner).toHaveBeenCalledTimes(1);
        expect(outer).not.toHaveBeenCalled();
    });
});

describe('ConfirmDialog', () => {
    it('starts on Cancel and reports the choice', () => {
        const onConfirm = jest.fn();
        const onCancel = jest.fn();
        render(<ConfirmDialog title="Delete?" confirmLabel="Delete" danger onConfirm={onConfirm} onCancel={onCancel}>Gone forever</ConfirmDialog>);

        expect(screen.getByRole('alertdialog', { name: 'Delete?' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
        expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('btn-danger');

        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(onConfirm).toHaveBeenCalled();
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(onCancel).toHaveBeenCalled();
    });

    it('locks both buttons while busy', () => {
        const onCancel = jest.fn();
        render(<ConfirmDialog title="Delete?" confirmLabel="Delete" busy onConfirm={() => {}} onCancel={onCancel} />);
        expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onCancel).not.toHaveBeenCalled();
    });
});

describe('TextField', () => {
    it('associates the label, hint and error with the input', () => {
        render(<TextField label="Password" hint="At least 6 characters." error="Too short" defaultValue="" />);
        const input = screen.getByLabelText('Password');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('At least 6 characters. Too short');
    });
});

describe('Stat / EditableStat', () => {
    it('renders a read-only stat', () => {
        render(<Stat label="Initiative" value="+2" />);
        expect(screen.getByText('Initiative')).toBeInTheDocument();
        expect(screen.getByText('+2')).toBeInTheDocument();
    });

    function renderEditable(onSave = jest.fn()) {
        render(<EditableStat label="AC" value={15} min={0} max={50} onSave={onSave} />);
        return onSave;
    }

    it('edits with the keyboard: Enter saves a changed value and returns focus', () => {
        const onSave = renderEditable();
        fireEvent.click(screen.getByRole('button', { name: 'AC: 15. Edit' }));
        const input = screen.getByLabelText('AC');
        expect(input).toHaveFocus();
        fireEvent.change(input, { target: { value: '17' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(onSave).toHaveBeenCalledWith(17);
        expect(screen.getByRole('button', { name: /AC: 15/ })).toHaveFocus();
    });

    it('Escape cancels and an unchanged value is not saved', () => {
        const onSave = renderEditable();
        fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
        fireEvent.change(screen.getByLabelText('AC'), { target: { value: '20' } });
        fireEvent.keyDown(screen.getByLabelText('AC'), { key: 'Escape' });
        fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
        fireEvent.keyDown(screen.getByLabelText('AC'), { key: 'Enter' });
        expect(onSave).not.toHaveBeenCalled();
    });

    it('shows an inline error for an out-of-range value and discards it on blur', () => {
        const onSave = renderEditable();
        fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
        const input = screen.getByLabelText('AC');
        fireEvent.change(input, { target: { value: '99' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(screen.getByRole('alert')).toHaveTextContent('AC must be between 0 and 50');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        fireEvent.blur(input);
        expect(onSave).not.toHaveBeenCalled();
        expect(screen.getByRole('button', { name: /AC: 15/ })).toBeInTheDocument();
    });
});

describe('Toasts', () => {
    function Trigger({ kind, message }: { kind: 'success' | 'error'; message: string }) {
        const toast = useToast();
        return <button onClick={() => toast[kind](message)}>Notify</button>;
    }

    afterEach(() => jest.useRealTimers());

    it('announces errors as alerts, dedupes repeats and can be dismissed', () => {
        render(<ToastProvider><Trigger kind="error" message="Couldn't save AC" /></ToastProvider>);
        fireEvent.click(screen.getByText('Notify'));
        fireEvent.click(screen.getByText('Notify'));
        expect(screen.getAllByRole('alert')).toHaveLength(1);
        expect(screen.getByRole('alert')).toHaveTextContent("Couldn't save AC");
        fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('auto-dismisses success messages', () => {
        jest.useFakeTimers();
        render(<ToastProvider><Trigger kind="success" message="Saved" /></ToastProvider>);
        fireEvent.click(screen.getByText('Notify'));
        expect(screen.getByRole('status')).toHaveTextContent('Saved');
        act(() => { jest.advanceTimersByTime(4500); });
        expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    });

    it('falls back to the console outside a provider', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Trigger kind="error" message="No provider" />);
        fireEvent.click(screen.getByText('Notify'));
        expect(spy).toHaveBeenCalledWith('No provider');
        spy.mockRestore();
    });
});

describe('useOptimisticSave', () => {
    function Counter({ request }: { request: () => Promise<unknown> }) {
        const [value, setValue] = useState(1);
        const save = useOptimisticSave();
        const previous = useRef(value);
        return (
            <>
                <span data-testid="value">{value}</span>
                <button onClick={() => save({
                    apply: () => { previous.current = value; setValue(value + 1); },
                    rollback: () => setValue(previous.current),
                    request,
                    errorMessage: "Couldn't save",
                })}>Increment</button>
            </>
        );
    }

    it('keeps the change when the request succeeds', async () => {
        render(<ToastProvider><Counter request={() => Promise.resolve({})} /></ToastProvider>);
        fireEvent.click(screen.getByText('Increment'));
        expect(screen.getByTestId('value')).toHaveTextContent('2');
        await act(async () => {});
        expect(screen.getByTestId('value')).toHaveTextContent('2');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('rolls back and shows an error toast when the request fails', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<ToastProvider><Counter request={() => Promise.reject(new Error('Server says no'))} /></ToastProvider>);
        fireEvent.click(screen.getByText('Increment'));
        expect(screen.getByTestId('value')).toHaveTextContent('2');
        await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('1'));
        expect(screen.getByRole('alert')).toHaveTextContent("Couldn't save: Server says no");
        spy.mockRestore();
    });

    it('describes network failures in plain words', () => {
        expect(describeError("Couldn't save", new TypeError('Failed to fetch'))).toBe("Couldn't save: couldn't reach the server");
        expect(describeError("Couldn't save", undefined)).toBe("Couldn't save");
    });
});
