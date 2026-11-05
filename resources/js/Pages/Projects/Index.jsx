import { useCallback, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import Card from '../../Components/ui/Card';
import ConfirmDialog from '../../Components/ui/ConfirmDialog';
import ProjectThumb from '../../Components/portfolio/ProjectThumb';
import { formatMonthYear, splitTech } from '../../lib/format';

/** READ: list of every saved project, with Edit and Delete actions. */
export default function Index({ projects }) {
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const closeDialog = useCallback(() => {
        if (!deleting) setToDelete(null);
    }, [deleting]);

    const confirmDelete = () => {
        if (!toDelete) return;
        router.delete(`/projects/${toDelete.id}`, {
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onFinish: () => {
                setDeleting(false);
                setToDelete(null);
            },
        });
    };

    return (
        <AdminLayout title="Manage projects">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[var(--mute)]">
                    {projects.length} saved {projects.length === 1 ? 'project' : 'projects'}. Changes appear on your public portfolio right away.
                </p>
                <Link href="/projects/create" className="btn btn-p">+ Add project</Link>
            </div>

            {projects.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="font-semibold">No projects yet</p>
                    <p className="mt-2 text-sm text-[var(--mute)]">Add your first project and it will show in the Featured Projects section.</p>
                    <Link href="/projects/create" className="btn btn-p mt-5 inline-flex">Add a project</Link>
                </Card>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} as="article" className="!p-0 flex flex-col">
                            <ProjectThumb title={project.title} imageUrl={project.image_url} />
                            <div className="p-5 flex flex-col flex-1">
                                <p className="lbl !text-[.62rem]">{formatMonthYear(project.completed_at)}</p>
                                <h3 className="font-semibold mt-2">{project.title}</h3>
                                <p className="mt-1 text-xs text-[var(--mute)]">{splitTech(project.tech_stack).join(' · ')}</p>
                                <div className="mt-auto pt-5 flex flex-wrap gap-2">
                                    <Link href={`/projects/${project.id}/edit`} className="btn btn-g">Edit</Link>
                                    <button
                                        type="button"
                                        onClick={() => setToDelete(project)}
                                        className="btn border-red-400/50 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={toDelete !== null}
                title="Delete this project?"
                message={toDelete ? `“${toDelete.title}” and its image will be removed permanently. This cannot be undone.` : ''}
                confirmLabel="Yes, delete"
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={closeDialog}
            />
        </AdminLayout>
    );
}
