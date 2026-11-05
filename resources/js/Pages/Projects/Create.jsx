import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ProjectForm from '../../Components/forms/ProjectForm';

/** CREATE: empty form. useForm keeps what the user typed when the server returns errors. */
export default function Create() {
    const form = useForm({
        title: '',
        description: '',
        tech_stack: '',
        project_url: '',
        repository_url: '',
        completed_at: '',
        image: null,
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/projects', {
            forceFormData: true,   // send as multipart so the image file is included
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Add a project">
            <ProjectForm form={form} onSubmit={submit} submitLabel="Save project" cancelHref="/projects" />
        </AdminLayout>
    );
}
