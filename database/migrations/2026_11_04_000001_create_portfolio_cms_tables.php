<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('portfolio_settings', function (Blueprint $table) {
            $table->id(); $table->json('data'); $table->timestamps();
        });
        Schema::create('portfolio_entries', function (Blueprint $table) {
            $table->id(); $table->string('type', 30)->index(); $table->string('title', 150);
            $table->string('subtitle', 200)->nullable(); $table->text('description')->nullable();
            $table->string('url', 500)->nullable(); $table->string('image_path')->nullable();
            $table->unsignedInteger('sort_order')->default(0); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('portfolio_entries'); Schema::dropIfExists('portfolio_settings'); }
};
