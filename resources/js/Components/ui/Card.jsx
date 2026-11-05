/** A reusable "liquid glass" panel. Extra classes and props are passed through. */
export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
    return (
        <Tag className={`glass ${className}`} {...rest}>
            {children}
        </Tag>
    );
}
