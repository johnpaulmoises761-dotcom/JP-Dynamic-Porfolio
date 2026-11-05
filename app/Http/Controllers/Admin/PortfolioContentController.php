<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\PortfolioEntry;
use App\Models\PortfolioSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
class PortfolioContentController extends Controller {
    private const TYPES = ['skill','experience','education','certificate'];
    public function dashboard(): Response {
        return Inertia::render('Admin/Dashboard', [
            'counts' => ['projects' => \App\Models\Project::count(), 'skills' => PortfolioEntry::where('type','skill')->count(), 'experience' => PortfolioEntry::where('type','experience')->count(), 'education' => PortfolioEntry::where('type','education')->count(), 'certificates' => PortfolioEntry::where('type','certificate')->count()],
        ]);
    }
    public function editSettings(): Response { return Inertia::render('Admin/Settings', ['settings' => PortfolioSetting::current()]); }
    public function updateSettings(Request $request): RedirectResponse {
        $rules = [];
        foreach (array_keys(PortfolioSetting::defaults()) as $key) {
            if (in_array($key, ['profile_image','resume_file','background_image'], true)) continue;
            $rules[$key] = ['nullable','string','max:'.(in_array($key,['intro','about','goal','contact_description'],true) ? 5000 : 500)];
        }
        foreach (['email'] as $key) $rules[$key] = ['nullable','email','max:255'];
        foreach (['github','linkedin','facebook'] as $key) $rules[$key] = ['nullable','url','max:500'];
        $rules['accent'] = ['nullable','regex:/^#[0-9a-fA-F]{6}$/'];
        $rules['profile_image_upload'] = ['nullable','image','mimes:jpg,jpeg,png,webp','max:4096'];
        $rules['background_image_upload'] = ['nullable','image','mimes:jpg,jpeg,png,webp','max:4096'];
        $rules['resume_upload'] = ['nullable','file','mimes:pdf','max:5120'];
        $validated = $request->validate($rules);
        $record = PortfolioSetting::query()->firstOrCreate([], ['data' => PortfolioSetting::defaults()]);
        $data = array_replace(PortfolioSetting::defaults(), $record->data ?? []);
        foreach (array_keys($rules) as $key) {
            if (str_ends_with($key, '_upload')) continue;
            if (array_key_exists($key, $validated)) $data[$key] = $validated[$key] ?? '';
        }
        $newFiles = []; $oldFiles = [];
        foreach (['profile_image_upload' => 'profile_image','background_image_upload'=>'background_image','resume_upload'=>'resume_file'] as $input => $field) {
            if ($request->hasFile($input)) {
                $newFiles[] = $data[$field] = $request->file($input)->store('portfolio', 'public');
                if (!empty($record->data[$field])) $oldFiles[] = $record->data[$field];
            }
        }
        try { $record->update(['data' => $data]); }
        catch (\Throwable $e) { foreach ($newFiles as $file) Storage::disk('public')->delete($file); throw $e; }
        foreach ($oldFiles as $file) Storage::disk('public')->delete($file);
        return back()->with('success', 'Portfolio details saved.');
    }
    public function entries(string $type): Response {
        abort_unless(in_array($type, self::TYPES, true), 404);
        return Inertia::render('Admin/Entries', ['type'=>$type,'entries'=>PortfolioEntry::where('type',$type)->orderBy('sort_order')->orderBy('id')->get()]);
    }
    public function storeEntry(Request $request, string $type): RedirectResponse {
        abort_unless(in_array($type, self::TYPES, true), 404);
        $data = $request->validate($this->entryRules());
        $data['type'] = $type;
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('portfolio/entries','public');
        unset($data['image']);
        PortfolioEntry::create($data);
        return back()->with('success','Entry added.');
    }
    public function updateEntry(Request $request, string $type, PortfolioEntry $entry): RedirectResponse {
        abort_unless(in_array($type, self::TYPES, true) && $entry->type === $type, 404);
        $data = $request->validate($this->entryRules());
        $old = $entry->image_path;
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('portfolio/entries','public');
        unset($data['image']);
        try { $entry->update($data); }
        catch (\Throwable $e) { if (isset($data['image_path'])) Storage::disk('public')->delete($data['image_path']); throw $e; }
        if (isset($data['image_path']) && $old) Storage::disk('public')->delete($old);
        return back()->with('success','Entry updated.');
    }
    public function destroyEntry(string $type, PortfolioEntry $entry): RedirectResponse {
        abort_unless(in_array($type, self::TYPES, true) && $entry->type === $type, 404);
        $path = $entry->image_path; $entry->delete();
        if ($path) Storage::disk('public')->delete($path);
        return back()->with('success','Entry deleted.');
    }
    private function entryRules(): array {
        return ['title'=>['required','string','max:150'],'subtitle'=>['nullable','string','max:200'], 'description'=>['nullable','string','max:5000'], 'url'=>['nullable','url','max:500'], 'sort_order'=>['nullable','integer','min:0','max:99999'], 'image'=>['nullable','image','mimes:jpg,jpeg,png,webp','max:4096']];
    }
}
