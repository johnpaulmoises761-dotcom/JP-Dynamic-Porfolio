import InputError from '../ui/InputError';

/** Label + input + hint + error. The value comes from the parent, so typed text is never lost on error. */
export default function TextInput({ id, label, error, hint, className = '', ...props }) {
    const errorId = `${id}-error`;
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-[var(--mute)]">{label}</label>
            <input
                id={id}
                className={`fld mt-1.5 ${className}`}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? errorId : undefined}
                {...props}
            />
            {hint && !error && <p className="mt-1 text-[.7rem] text-[var(--mute)]">{hint}</p>}
            <InputError id={errorId} message={error} />
        </div>
    );
}
