<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
class DatabaseSeeder extends Seeder {
    public function run(): void {
        // Admin seeding is opt-in. Do not seed demo projects on an existing portfolio.
        $email = env('ADMIN_EMAIL'); $password = env('ADMIN_PASSWORD');
        if (!$email || !$password || strlen($password) < 12) {
            throw new RuntimeException('Set ADMIN_EMAIL and a strong ADMIN_PASSWORD (12+ characters) in .env before seeding.');
        }
        User::updateOrCreate(['email'=>$email], ['name'=>env('ADMIN_NAME','Portfolio Admin'),'password'=>Hash::make($password)]);
    }
}
