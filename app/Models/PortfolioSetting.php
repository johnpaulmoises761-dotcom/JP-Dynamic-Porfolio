<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PortfolioSetting extends Model {
    protected $fillable = ['data'];
    protected function casts(): array { return ['data' => 'array']; }
    public static function defaults(): array {
        return [
            'name' => 'John Paul M. Moises',
            'title' => 'BSIT STUDENT | ASPIRING IT PROFESSIONAL',
            'intro' => 'I’m a BSIT student who continuously learns new skills and creates projects to prepare for my future in IT.',
            'about_heading' => 'Curious by nature. Technical by trade.',
            'about' => 'I’m John Paul M. Moises, a third-year BSIT student at Urdaneta City University. I enjoy exploring technology, writing code, and creating digital designs. I’m still discovering where my IT career skills can lead, and I’m here to learn, improve, and gain experience through projects.',
            'email' => 'johnpaulmoises761@gmail.com', 'phone' => '', 'location' => '',
            'github' => 'https://github.com/johnpaulmoises761-dotcom',
            'linkedin' => 'https://www.linkedin.com/in/john-paul-moises-a22567445/',
            'facebook' => '', 'availability' => 'Open to learning opportunities and collaboration.',
            'hero_label' => '// Hello, world', 'hero_button' => 'Explore my work',
            'contact_heading' => 'Have an idea in mind?',
            'contact_description' => 'I’m open to learning opportunities, collaborations, and projects that will help me grow.',
            'goal' => 'I want to improve my programming and design skills, build more projects, and explore different IT career paths. My goal is to become a skilled IT professional who can turn ideas into useful digital solutions.',
            'accent' => '#8dd6ff', 'profile_image' => '', 'resume_file' => '', 'background_image' => '',
        ];
    }
    public static function current(): array {
        return array_replace(static::defaults(), static::query()->first()?->data ?? []);
    }
}
