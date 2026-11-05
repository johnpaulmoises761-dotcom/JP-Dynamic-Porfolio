
<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\PortfolioContentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\ClearDashboardLoginVerification;
use App\Http\Middleware\RequireDashboardLogin;
use Illuminate\Support\Facades\Route;

// Public portfolio
Route::get('/', [PortfolioController::class, 'index'])
    ->middleware(ClearDashboardLoginVerification::class)
    ->name('home');

// Login routes for visitors
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

// Authenticated user logout
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Admin-only routes
Route::middleware(['auth', 'can:manage-portfolio'])->group(function () {

    Route::get('/admin', fn () => redirect()->route('admin.dashboard'));

    Route::get('/admin/dashboard', [PortfolioContentController::class, 'dashboard'])
        ->middleware(RequireDashboardLogin::class)
        ->name('admin.dashboard');

    Route::get('/admin/settings', [PortfolioContentController::class, 'editSettings'])
        ->name('admin.settings');

    Route::post('/admin/settings', [PortfolioContentController::class, 'updateSettings'])
        ->name('admin.settings.update');

    Route::get('/admin/account', [AccountController::class, 'edit'])
        ->name('admin.account');

    Route::put('/admin/account', [AccountController::class, 'update'])
        ->name('admin.account.update');

    Route::get('/admin/content/{type}', [PortfolioContentController::class, 'entries'])
        ->name('admin.entries');

    Route::post('/admin/content/{type}', [PortfolioContentController::class, 'storeEntry'])
        ->name('admin.entries.store');

    Route::post('/admin/content/{type}/{entry}', [PortfolioContentController::class, 'updateEntry'])
        ->name('admin.entries.update');

    Route::delete('/admin/content/{type}/{entry}', [PortfolioContentController::class, 'destroyEntry'])
        ->name('admin.entries.destroy');

    Route::resource('projects', ProjectController::class)->except('show');
});
