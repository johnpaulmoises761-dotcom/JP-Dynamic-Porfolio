<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
class AccountController extends Controller {
    public function edit(): Response { return Inertia::render('Admin/Account'); }
    public function update(Request $request): RedirectResponse {
        $data = $request->validate(['current_password'=>['required','current_password'], 'password'=>['required','confirmed',Password::min(12)->mixedCase()->numbers()]]);
        $request->user()->forceFill(['password'=>Hash::make($data['password'])])->save();
        $request->session()->regenerate();
        return back()->with('success','Password changed.');
    }
}
