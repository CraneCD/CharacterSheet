'use client';
import { useRef } from 'react';
import Modal from './Modal';
import Button from './Button';

export interface ConfirmDialogProps {
    title: React.ReactNode;
    children?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    /** Styles the confirm button as destructive. */
    danger?: boolean;
    /** Disables both buttons and shows a spinner on confirm. */
    busy?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/** Yes/no dialog that replaces window.confirm(). Focus starts on Cancel so Enter never destroys by accident. */
export default function ConfirmDialog({
    title,
    children,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    danger = false,
    busy = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);
    return (
        <Modal
            title={title}
            onClose={onCancel}
            size="sm"
            role="alertdialog"
            dismissible={!busy}
            initialFocusRef={cancelRef}
            footer={
                <>
                    <Button ref={cancelRef} variant="secondary" onClick={onCancel} disabled={busy}>
                        {cancelLabel}
                    </Button>
                    <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={busy}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            {children && <div style={{ color: 'var(--text-muted)' }}>{children}</div>}
        </Modal>
    );
}
