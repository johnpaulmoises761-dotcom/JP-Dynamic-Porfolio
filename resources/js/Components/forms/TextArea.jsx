import InputError from '../ui/InputError';

export default function TextArea({ id, label, error, hint, rows = 5, ...props }) {
    const errorId = `${id}-error`;
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-[var(--mute)]">{label}</label>
            <textarea
                id={id}
                rows={rows}
                className="fld mt-1.5"
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? errorId : undefined}
                {...props}
            />
            {hint && !error && <p className="mt-1 text-[.7rem] text-[var(--mute)]">{hint}</p>}
            <InputError id={errorId} message={error} />
        </div>
    );
}
