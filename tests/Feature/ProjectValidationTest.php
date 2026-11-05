<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectValidationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        $user = User::factory()->create();
        config(['portfolio.admin_email' => $user->email]);
        $this->actingAs($user);
    }

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'title' => 'Test Project Title',
            'description' => 'This is a valid description that is long enough.',
            'tech_stack' => 'Laravel, React',
            'project_url' => 'https://example.com',
            'repository_url' => 'https://github.com/example/repo',
            'completed_at' => '2026-01-15',
        ], $overrides);
    }

    /** TC1: empty form -> required errors on every required field */
    public function test_empty_form_shows_required_errors(): void
    {
        $this->post('/projects', [])
            ->assertSessionHasErrors(['title', 'description', 'tech_stack', 'completed_at']);
    }

    /** TC2: text longer than the maximum length */
    public function test_title_longer_than_100_characters_is_rejected(): void
    {
        $this->post('/projects', $this->validPayload(['title' => str_repeat('a', 101)]))
            ->assertSessionHasErrors('title');
    }

    /** TC3: invalid URL -> custom message */
    public function test_invalid_url_is_rejected_with_custom_message(): void
    {
        $this->post('/projects', $this->validPayload(['project_url' => 'not-a-url']))
            ->assertSessionHasErrors([
                'project_url' => 'Enter a full web address that starts with https:// or http://.',
            ]);
    }

    /** TC4: duplicate title -> unique rule with custom message */
    public function test_duplicate_title_is_rejected(): void
    {
        Project::create($this->validPayload());

        $this->post('/projects', $this->validPayload())
            ->assertSessionHasErrors([
                'title' => 'A project with this title already exists. Please choose a different title.',
            ]);
    }

    /** TC5: editing a record without changing its unique title must still save */
    public function test_updating_without_changing_unique_title_succeeds(): void
    {
        $project = Project::create($this->validPayload());

        $this->put("/projects/{$project->id}", $this->validPayload([
            'description' => 'An updated description that is still long enough.',
        ]))->assertSessionHasNoErrors()
            ->assertRedirect(route('projects.index'));

        $this->assertSame('An updated description that is still long enough.', $project->fresh()->description);
    }

    /** TC6a: image larger than 2 MB */
    public function test_oversized_image_is_rejected(): void
    {
        $this->post('/projects', $this->validPayload([
            'image' => UploadedFile::fake()->image('big.jpg')->size(3000),
        ]))->assertSessionHasErrors([
            'image' => 'The image must be 2 MB or smaller.',
        ]);
    }

    /** TC6b: a file that is not an image */
    public function test_non_image_file_is_rejected(): void
    {
        $this->post('/projects', $this->validPayload([
            'image' => UploadedFile::fake()->create('notes.txt', 10, 'text/plain'),
        ]))->assertSessionHasErrors([
            'image' => 'The uploaded file must be an image.',
        ]);
    }

    /** Happy path: a valid create stores the record and the image file */
    public function test_valid_project_is_created_with_image(): void
    {
        $this->post('/projects', $this->validPayload([
            'image' => UploadedFile::fake()->image('shot.png', 640, 400),
        ]))->assertSessionHasNoErrors()
            ->assertRedirect(route('projects.index'));

        $project = Project::firstOrFail();
        $this->assertNotNull($project->image_path);
        Storage::disk('public')->assertExists($project->image_path);
    }

    /** Happy path: deleting a project also removes its image file */
    public function test_deleting_project_removes_its_image(): void
    {
        $this->post('/projects', $this->validPayload([
            'image' => UploadedFile::fake()->image('shot.png', 640, 400),
        ]));
        $project = Project::firstOrFail();
        $path = $project->image_path;

        $this->delete("/projects/{$project->id}")->assertRedirect(route('projects.index'));

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        Storage::disk('public')->assertMissing($path);
    }

    /** Guests cannot reach the admin pages */
    public function test_guests_are_redirected_to_login(): void
    {
        auth()->logout();
        $this->get('/projects')->assertRedirect('/login');
    }
}
