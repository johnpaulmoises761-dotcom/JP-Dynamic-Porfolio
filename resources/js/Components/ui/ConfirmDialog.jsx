import { useEffect } from 'react';

/** A modal that must be confirmed before a record is deleted. Esc or Cancel closes it. */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', busy = false, onConfirm, onCancel }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (event) => event.key === 'Escape' && onCancel();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] grid place-items-center px-5 bg-black/60" role="presentation" onClick={onCancel}>
            <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" className="glass p-6 sm:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 id="confirm-title" className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-[var(--mute)] leading-relaxed">{message}</p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button type="button" className="btn btn-g" onClick={onCancel} disabled={busy}>Cancel</button>
                    <button type="button" className="btn border-red-400/50 bg-red-500/15 text-red-200 hover:bg-red-500/25" onClick={onConfirm} disabled={busy}>
                        {busy ? 'Deleting…' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
