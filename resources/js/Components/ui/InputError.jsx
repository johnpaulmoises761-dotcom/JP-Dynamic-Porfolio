/** Shows one validation message beside its field. Renders nothing when there is no error. */
export default function InputError({ id, message, className = '' }) {
    if (!message) return null;
    return (
        <p id={id} role="alert" className={`mt-1.5 text-xs text-[#ff9aa8] ${className}`}>
            {message}
        </p>
    );
}
