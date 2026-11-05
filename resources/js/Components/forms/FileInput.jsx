import InputError from '../ui/InputError';

/** File picker that shows the current image while editing. Browsers cannot pre-fill file inputs, so a reselect is needed after an error. */
export default function FileInput({ id, label, error, currentUrl, hint, onChange }) {
    const errorId = `${id}-error`;
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-[var(--mute)]">{label}</label>
            {currentUrl && (
                <img src={currentUrl} alt="Current project thumbnail" className="mt-2 mb-2 h-24 w-40 rounded-lg object-cover border border-white/15" />
            )}
            <input
                id={id}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? errorId : undefined}
                className="mt-1.5 block w-full text-xs text-[var(--mute)] file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-[var(--ink)]"
            />
            {hint && !error && <p className="mt-1 text-[.7rem] text-[var(--mute)]">{hint}</p>}
            <InputError id={errorId} message={error} />
        </div>
    );
}
