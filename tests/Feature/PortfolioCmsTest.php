<?php

namespace Tests\Feature;

use App\Models\PortfolioEntry;
use App\Models\PortfolioSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioCmsTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_open_dashboard(): void
    {
        $this->get('/admin/dashboard')->assertRedirect('/login');
    }

    public function test_admin_can_save_settings_and_stay_logged_in(): void
    {
        $user = User::factory()->create();
        config(['portfolio.admin_email' => $user->email]);
        $this->actingAs($user)->post('/admin/settings', ['name' => 'Updated Portfolio Name', 'email' => 'public@example.com'])
            ->assertRedirect()->assertSessionHasNoErrors();
        $this->assertSame('Updated Portfolio Name', PortfolioSetting::current()['name']);
        $this->get('/')->assertOk();
        $this->post('/admin/settings', ['name' => 'Updated Again', 'email' => 'public@example.com'])
            ->assertRedirect()->assertSessionHasNoErrors();
    }

    public function test_dashboard_stays_accessible_until_returning_to_public_portfolio(): void
    {
        $user = User::factory()->create();
        config(['portfolio.admin_email' => $user->email]);
        $credentials = ['email' => $user->email, 'password' => 'password'];

        $this->post('/login', $credentials)->assertRedirect(route('admin.dashboard'));
        $this->get('/admin/dashboard')->assertOk();
        $this->get('/admin/settings')->assertOk();
        $this->get('/admin/dashboard')->assertOk();

        $this->get('/')->assertOk();
        $this->get('/admin/dashboard')->assertRedirect(route('login'));

        $this->post('/login', ['email' => $user->email, 'password' => 'incorrect'])
            ->assertSessionHasErrors('email');
        $this->get('/admin/dashboard')->assertRedirect(route('login'));

        $this->post('/login', $credentials)->assertRedirect(route('admin.dashboard'));
        $this->get('/admin/dashboard')->assertOk();
    }

    public function test_entries_can_be_created_and_deleted(): void
    {
        $user = User::factory()->create();
        config(['portfolio.admin_email' => $user->email]);
        $this->actingAs($user);
        $this->post('/admin/content/skill', ['title' => 'Laravel', 'subtitle' => 'Backend', 'sort_order' => 1])->assertSessionHasNoErrors();
        $entry = PortfolioEntry::firstOrFail();
        $this->assertSame('skill', $entry->type);
        $this->delete('/admin/content/skill/'.$entry->id)->assertSessionHasNoErrors();
        $this->assertDatabaseMissing('portfolio_entries', ['id' => $entry->id]);
    }

    public function test_invalid_content_type_is_rejected(): void
    {
        $user = User::factory()->create();
        config(['portfolio.admin_email' => $user->email]);
        $this->actingAs($user)->get('/admin/content/invalid')->assertNotFound();
    }

    public function test_non_admin_cannot_manage_portfolio(): void
    {
        config(['portfolio.admin_email' => 'admin@example.com']);

        $this->actingAs(User::factory()->create())->get('/admin/dashboard')->assertForbidden();
    }
}
