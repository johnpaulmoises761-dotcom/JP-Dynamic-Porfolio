/**
 * The 16:10 thumbnail for a project. Uses the uploaded image when there is one,
 * otherwise a gradient with the title's first letter (so records without a photo still look right).
 */
export default function ProjectThumb({ title, imageUrl }) {
    if (imageUrl) {
        return <img src={imageUrl} alt={`${title} preview`} loading="lazy" className="block w-full aspect-[16/10] object-cover" />;
    }
    return (
        <div aria-hidden="true" className="grid place-items-center w-full aspect-[16/10] bg-gradient-to-br from-[#0b2a5a] via-[#1b6fbf] to-[#5ad1ff]">
            <span className="font-mono text-4xl font-medium text-white/80">{title.charAt(0).toUpperCase()}</span>
        </div>
    );
}
