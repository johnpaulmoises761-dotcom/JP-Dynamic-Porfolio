<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    /** GET /login */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /** POST /login */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Enter a valid email address.',
            'password.required' => 'Please enter your password.',
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()
                ->withErrors(['email' => 'These credentials do not match our records.'])
                ->onlyInput('email');
        }

        $request->session()->regenerate();

        $dashboardLoginPending = $request->session()->pull('dashboard_login_pending', false);
        $intendedUrl = $request->session()->get('url.intended');

        if ($dashboardLoginPending || $intendedUrl === null || $intendedUrl === route('admin.dashboard')) {
            $request->session()->put('dashboard_login_verified', true);
        }

        return redirect()->intended(route('admin.dashboard'));
    }

    /** POST /logout */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
