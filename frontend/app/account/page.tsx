'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { clearAuthStorage, getStoredUserEmail } from '@/lib/auth';
import { Button, ConfirmDialog, SectionHeader, TextField, describeError, useToast } from '@/app/components/ui';

const MIN_LENGTH = 6;
const MAX_LENGTH = 72;

/** Account settings: who's signed in, and changing the password. */
export default function AccountPage() {
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => setEmail(getStoredUserEmail()), []);

    return (
        <div className="account-page">
            <div className="page-header">
                <h1 className="heading" style={{ marginBottom: 0 }}>Account</h1>
            </div>
            {email && <p className="account-email">Signed in as <strong>{email}</strong></p>}
            <ChangePasswordForm />
            <SignOutEverywhere />
        </div>
    );
}

function ChangePasswordForm() {
    const toast = useToast();
    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (next.length < MIN_LENGTH || next.length > MAX_LENGTH) return setError(`Your new password needs ${MIN_LENGTH} to ${MAX_LENGTH} characters.`);
        if (next !== confirm) return setError("The new passwords don't match.");
        if (next === current) return setError('The new password must be different from your current one.');
        setError('');
        setSaving(true);
        try {
            const res = await api.post('/auth/change-password', { currentPassword: current, newPassword: next });
            // Changing the password signs out other devices; this one keeps going with a new token
            if (res?.token) localStorage.setItem('token', res.token);
            setCurrent('');
            setNext('');
            setConfirm('');
            toast.success('Password changed. Use your new password next time you log in.');
        } catch (err: unknown) {
            setError(
                err instanceof ApiError && err.status === 429 ? 'Too many attempts. Wait a few minutes and try again.'
                    // The server's own reasons (wrong current password, ...) are plain sentences; anything else isn't shown raw
                    : err instanceof ApiError && err.status === 400 && !/<[a-z!]/i.test(err.message) ? err.message
                    : err instanceof ApiError ? 'Something went wrong on our side. Please try again.'
                    : "Couldn't reach the server. Check your connection and try again.",
            );
        } finally {
            setSaving(false);
        }
    };

    const type = show ? 'text' : 'password';
    return (
        <section className="card account-card" aria-labelledby="change-password-title">
            <SectionHeader title="Change password" id="change-password-title" as="h2" />
            {error && <div className="form-error" role="alert">{error}</div>}
            <form onSubmit={submit} noValidate>
                <TextField label="Current password" type={type} autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
                <TextField label="New password" type={type} autoComplete="new-password" hint={`At least ${MIN_LENGTH} characters.`} value={next} onChange={(e) => setNext(e.target.value)} required maxLength={MAX_LENGTH} />
                <TextField label="Confirm new password" type={type} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required maxLength={MAX_LENGTH} />
                <label className="checkbox-row">
                    <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
                    Show passwords
                </label>
                <Button type="submit" loading={saving} disabled={!current || !next || !confirm}>
                    {saving ? 'Changing…' : 'Change password'}
                </Button>
            </form>
        </section>
    );
}

/** Signs out every device, including installed apps that otherwise stay signed in. */
function SignOutEverywhere() {
    const toast = useToast();
    const router = useRouter();
    const [confirming, setConfirming] = useState(false);
    const [busy, setBusy] = useState(false);

    const signOut = async () => {
        setBusy(true);
        try {
            await api.post('/auth/logout-all', {});
            clearAuthStorage();
            router.replace('/login');
        } catch (err) {
            toast.error(describeError("Couldn't sign out everywhere", err));
            setBusy(false);
            setConfirming(false);
        }
    };

    return (
        <section className="card account-card" aria-labelledby="sign-out-everywhere-title">
            <SectionHeader title="Devices" id="sign-out-everywhere-title" as="h2" />
            <p className="field-hint" style={{ marginTop: 0 }}>
                The installed app stays signed in until you sign out. Lost a phone? Sign out everywhere, including here.
            </p>
            <Button variant="danger" onClick={() => setConfirming(true)}>Sign out everywhere</Button>
            {confirming && (
                <ConfirmDialog
                    title="Sign out on every device?"
                    confirmLabel="Sign out everywhere"
                    danger
                    busy={busy}
                    onConfirm={signOut}
                    onCancel={() => setConfirming(false)}
                >
                    Every phone and browser signed in to your account will need your password again, this one too.
                </ConfirmDialog>
            )}
        </section>
    );
}
