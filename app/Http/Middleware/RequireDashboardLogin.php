<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RequireDashboardLogin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->get('dashboard_login_verified', false)) {
            return $next($request);
        }

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->put('dashboard_login_pending', true);
        $request->session()->put('url.intended', route('admin.dashboard'));

        return redirect()->route('login');
    }
}
