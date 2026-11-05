<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClearDashboardLoginVerification
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->session()->forget('dashboard_login_verified');

        return $next($request);
    }
}
