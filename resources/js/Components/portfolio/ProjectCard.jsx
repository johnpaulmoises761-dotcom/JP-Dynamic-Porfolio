import ProjectThumb from './ProjectThumb';
import { formatMonthYear, splitTech } from '../../lib/format';

export default function ProjectCard({ project }) {
    const techItems = splitTech(project.tech_stack);

    return (
        <article className="glass !p-0 flex flex-col">
            {project.project_url ? (
                <a href={project.project_url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} in a new tab`}>
                    <ProjectThumb title={project.title} imageUrl={project.image_url} />
                </a>
            ) : (
                <ProjectThumb title={project.title} imageUrl={project.image_url} />
            )}

            <div className="p-5 flex flex-col flex-1">
                <p className="lbl !text-[.62rem]">{formatMonthYear(project.completed_at)}</p>
                <h3 className="font-semibold mt-2">{project.title}</h3>
                <p className="text-xs text-[var(--mute)] mt-1.5 leading-relaxed">{project.description}</p>

                {techItems.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {techItems.map((item) => (
                            <span key={item} className="chip !text-[.65rem] !py-0.5">{item}</span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-4 flex flex-wrap gap-4">
                    {project.project_url && (
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="ln inline-block project-link">View project ↗</a>
                    )}
                    {project.repository_url && (
                        <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="ln inline-block">Source code ↗</a>
                    )}
                </div>
            </div>
        </article>
    );
}
