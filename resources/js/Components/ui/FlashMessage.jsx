import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Shows the success message that Laravel stored with ->with('success', ...).
 * It appears after create, update, and delete, then fades out after 4 seconds.
 */
export default function FlashMessage() {
    const page = usePage();
    const success = page.props.flash?.success;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!success) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [success, page.url]);

    if (!success || !visible) return null;

    return (
        <div role="status" aria-live="polite" className="glass !rounded-xl mb-6 px-4 py-3 text-sm text-[var(--acc2)] border-[var(--acc2)]/40">
            ✓ {success}
        </div>
    );
}
