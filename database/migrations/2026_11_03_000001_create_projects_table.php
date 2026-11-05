<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();      // no two projects may share a title
            $table->text('description');                  // long text, validated 20-1000 chars
            $table->string('tech_stack', 255);            // comma-separated, e.g. "Figma, UI/UX"
            $table->string('project_url', 255)->nullable();     // optional live/share link
            $table->string('repository_url', 255)->nullable();  // optional source-code link
            $table->date('completed_at');                 // a calendar date, not a timestamp
            $table->string('image_path')->nullable();     // path inside storage/app/public
            $table->timestamps();                         // created_at / updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
