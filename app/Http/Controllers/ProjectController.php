<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /** GET /projects  -> Projects/Index.jsx (admin list) */
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::latest('completed_at')->latest('id')
                ->get()
                ->map(fn (Project $project) => $project->toPageData())
                ->values(),
        ]);
    }

    /** GET /projects/create  -> Projects/Create.jsx */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /** POST /projects  (validate, store image, save, redirect with a flash message) */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules(), $this->messages());

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('projects', 'public');
        }

        Project::create(Arr::except($validated, ['image']));

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    /** GET /projects/{project}/edit  -> Projects/Edit.jsx */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->toPageData(),
        ]);
    }

    /** PUT /projects/{project}  (the form sends POST + _method=PUT because of file uploads) */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate($this->rules($project), $this->messages());
        $oldImage = $project->image_path;

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('projects', 'public');
        }

        $project->update(Arr::except($validated, ['image']));

        // Only remove the old file after the new record saved successfully.
        if (isset($validated['image_path']) && $oldImage) {
            Storage::disk('public')->delete($oldImage);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /** DELETE /projects/{project}  (confirmation happens in React before this runs) */
    public function destroy(Project $project): RedirectResponse
    {
        $project->deleteImage();
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted.');
    }

    /**
     * Validation rules. $project is null on create. On update it is the record
     * being edited, so the unique rule ignores that record's own title.
     */
    private function rules(?Project $project = null): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:3',
                'max:100',
                Rule::unique('projects', 'title')->ignore($project),
            ],
            'description' => ['required', 'string', 'min:20', 'max:1000'],
            'tech_stack' => ['required', 'string', 'max:255'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'completed_at' => ['required', 'date', 'before_or_equal:today'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], // 2048 KB = 2 MB
        ];
    }

    /** Custom error messages, shown beside the matching field in React. */
    private function messages(): array
    {
        return [
            'title.required' => 'Please enter a project title.',
            'title.max' => 'The title may not be longer than 100 characters.',
            'title.unique' => 'A project with this title already exists. Please choose a different title.',
            'description.min' => 'Please write at least 20 characters so visitors understand the project.',
            'project_url.url' => 'Enter a full web address that starts with https:// or http://.',
            'repository_url.url' => 'Enter a full web address that starts with https:// or http://.',
            'completed_at.before_or_equal' => 'The completion date cannot be in the future.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'Upload a JPG, PNG, or WEBP image.',
            'image.max' => 'The image must be 2 MB or smaller.',
        ];
    }
}
