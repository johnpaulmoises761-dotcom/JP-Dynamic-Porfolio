<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    /**
     * Mass-assignable columns. Anything not listed here (for example the
     * uploaded "image" file or "_method") is ignored when creating/updating,
     * which protects the database from unexpected input.
     */
    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'project_url',
        'repository_url',
        'completed_at',
        'image_path',
    ];

    protected $casts = [
        'completed_at' => 'date',
    ];

    /**
     * Shape sent to React through Inertia. Both the public portfolio and the
     * admin pages use this one format, so the two views always agree.
     */
    public function toPageData(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'tech_stack' => $this->tech_stack,
            'project_url' => $this->project_url,
            'repository_url' => $this->repository_url,
            'completed_at' => $this->completed_at->format('Y-m-d'),
            'image_url' => $this->image_path ? '/storage/' . $this->image_path : null,
        ];
    }

    /** Removes this project's uploaded image file from disk, if it has one. */
    public function deleteImage(): void
    {
        if ($this->image_path) {
            Storage::disk('public')->delete($this->image_path);
        }
    }
}
