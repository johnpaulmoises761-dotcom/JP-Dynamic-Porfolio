import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ProjectForm from '../../Components/forms/ProjectForm';

/**
 * UPDATE: the form is filled from the database record.
 * `_method: 'put'` plus POST is how Laravel receives an upload on an update.
 */
export default function Edit({ project }) {
    const form = useForm({
        _method: 'put',
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        project_url: project.project_url ?? '',
        repository_url: project.repository_url ?? '',
        completed_at: project.completed_at,
        image: null,
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(`/projects/${project.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title={`Edit: ${project.title}`}>
            <ProjectForm
                form={form}
                onSubmit={submit}
                submitLabel="Update project"
                cancelHref="/projects"
                currentImageUrl={project.image_url}
            />
        </AdminLayout>
    );
}
