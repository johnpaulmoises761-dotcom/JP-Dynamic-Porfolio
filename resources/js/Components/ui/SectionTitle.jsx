/** The label / heading / accent bar used at the top of every portfolio section. */
export default function SectionTitle({ label, title }) {
    return (
        <>
            <p className="lbl">{label}</p>
            <h2 className="h2">{title}</h2>
            <span className="bar" />
        </>
    );
}
