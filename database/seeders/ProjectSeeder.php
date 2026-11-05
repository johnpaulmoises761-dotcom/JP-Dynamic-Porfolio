<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProjectSeeder extends Seeder
{
    /**
     * The three projects from the original index.html, moved into the database.
     * completed_at values are PLACEHOLDERS. Correct them in the admin page.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Cheese Click Pigs Food Ordering UI',
                'description' => 'A comprehensive user interface and screen layout design for an online food ordering platform named “Cheese Click Pigs”.',
                'tech_stack' => 'Figma, UI/UX Design',
                'project_url' => 'https://www.figma.com/design/KO2FLslQ6uEWWC7ys7GE17/SNAP?node-id=0-1&t=u2VFu1LDlgau0xFJ-0',
                'repository_url' => null,
                'completed_at' => '2026-01-15',
                'image' => 'seed-1.png',
            ],
            [
                'title' => 'Sunlit Streets Commercial Concept',
                'description' => 'This SketchUp model features a modern, single-story commercial concept for a Sunlit Streets area.',
                'tech_stack' => 'SketchUp, 3D Modeling',
                'project_url' => 'https://app.sketchup.com/share/tc/asia/97jOd49OTMI?source=web&stoken=cvCJ_x9JNSPJ6NJ3Vg4nuPtqLgUlb6ROPfDfk22TjxV-yBWKb6i2tfJckWDhlXY4',
                'repository_url' => null,
                'completed_at' => '2026-02-20',
                'image' => 'seed-2.png',
            ],
            [
                'title' => 'Chibi Warrior Character Design',
                'description' => 'A stylized 3D character modeling project featuring a chibi-style warrior holding a sword, placed within a detailed outdoor environment bordered by mountains.',
                'tech_stack' => '3D Character Modeling, Environment Design',
                'project_url' => 'https://drive.google.com/file/d/1xG_upLTLkCSUINHF4caODHbSbYwSAhtv/view?usp=drive_link',
                'repository_url' => null,
                'completed_at' => '2026-03-10',
                'image' => 'seed-3.png',
            ],
        ];

        foreach ($projects as $data) {
            $imageName = $data['image'];
            unset($data['image']);

            // Copy the thumbnail into storage/app/public/projects so the URL works like an upload.
            $path = 'projects/' . $imageName;
            Storage::disk('public')->put($path, file_get_contents(database_path('seeders/assets/' . $imageName)));

            Project::updateOrCreate(
                ['title' => $data['title']],
                $data + ['image_path' => $path]
            );
        }
    }
}
