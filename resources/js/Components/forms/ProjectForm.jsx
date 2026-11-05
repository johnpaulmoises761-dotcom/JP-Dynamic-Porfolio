import { Link } from '@inertiajs/react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import FileInput from './FileInput';

/**
 * One form for Create and Edit. The parent owns the useForm() instance, so
 * values and server errors live in one place. noValidate lets Laravel's
 * messages show instead of the browser's own popups.
 */
export default function ProjectForm({ form, onSubmit, submitLabel, cancelHref, currentImageUrl }) {
    const errorCount = Object.keys(form.errors).length;
    const set = (name) => (e) => form.setData(name, e.target.value);

    return (
        <form onSubmit={onSubmit} noValidate className="glass p-6 sm:p-8 space-y-5 max-w-3xl">
            {errorCount > 0 && (
                <p role="alert" className="rounded-xl border border-[#ff9aa8]/40 bg-[#ff9aa8]/10 px-4 py-3 text-sm text-[#ffd0d7]">
                    Please fix the highlighted fields. Your entries are still filled in.
                </p>
            )}

            <TextInput
                id="title"
                label="Project title"
                value={form.data.title}
                onChange={set('title')}
                error={form.errors.title}
                hint="3–100 characters. Each title must be unique."
            />

            <TextArea
                id="description"
                label="Description"
                value={form.data.description}
                onChange={set('description')}
                error={form.errors.description}
                hint="20–1000 characters."
            />

            <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                    id="tech_stack"
                    label="Tech stack"
                    value={form.data.tech_stack}
                    onChange={set('tech_stack')}
                    error={form.errors.tech_stack}
                    hint="Separate items with commas, e.g. Laravel, React, Tailwind."
                />
                <TextInput
                    id="completed_at"
                    type="date"
                    label="Completed on"
                    value={form.data.completed_at}
                    onChange={set('completed_at')}
                    error={form.errors.completed_at}
                    hint="Cannot be a future date."
                />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                    id="project_url"
                    type="url"
                    label="Project link (optional)"
                    value={form.data.project_url}
                    onChange={set('project_url')}
                    error={form.errors.project_url}
                    placeholder="https://"
                />
                <TextInput
                    id="repository_url"
                    type="url"
                    label="Source code link (optional)"
                    value={form.data.repository_url}
                    onChange={set('repository_url')}
                    error={form.errors.repository_url}
                    placeholder="https://github.com/…"
                />
            </div>

            <FileInput
                id="image"
                label="Project image (optional)"
                currentUrl={currentImageUrl}
                error={form.errors.image}
                hint="JPG, PNG, or WEBP, up to 2 MB."
                onChange={(file) => form.setData('image', file)}
            />

            <div className="flex flex-wrap items-center gap-3 pt-2">
                <button type="submit" className="btn btn-p" disabled={form.processing}>
                    {form.processing ? 'Saving…' : submitLabel}
                </button>
                <Link href={cancelHref} className="btn btn-g">Cancel</Link>
            </div>
        </form>
    );
}
