<?php
namespace App\Http\Controllers;
use App\Models\Project;
use App\Models\PortfolioEntry;
use App\Models\PortfolioSetting;
use Inertia\Inertia;
use Inertia\Response;
class PortfolioController extends Controller {
    public function index(): Response {
        return Inertia::render('Portfolio', [
            'projects'=>Project::latest('completed_at')->latest('id')->get()->map(fn (Project $project) => $project->toPageData())->values(),
            'settings'=>PortfolioSetting::current(),
            'content'=>PortfolioEntry::orderBy('sort_order')->orderBy('id')->get()->groupBy('type'),
        ]);
    }
}
