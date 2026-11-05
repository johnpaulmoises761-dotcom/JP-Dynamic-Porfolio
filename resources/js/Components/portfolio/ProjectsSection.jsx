import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from './ProjectCard';

/** Featured Projects. Renders whatever is in the database, newest completion first. */
export default function ProjectsSection({ projects }) {
    return (
        <section id="projects" className="px-5 sm:px-8 py-16 sm:py-24">
            <div className="max-w-6xl mx-auto">
                <SectionTitle label="03 / Selected work" title="Featured Projects" />
                <div className="mt-8">
                    {projects.length === 0 ? (
                        <Card className="p-6 text-sm text-[var(--mute)]">New projects are on the way. Check back soon.</Card>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
