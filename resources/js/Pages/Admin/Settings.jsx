import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
const groups = [
 ['Personal details', [['name','Full name'],['title','Professional title'],['intro','Short introduction'],['email','Public email'],['phone','Phone'],['location','Location'],['availability','Availability'],['github','GitHub URL'],['linkedin','LinkedIn URL'],['facebook','Facebook URL']]],
 ['Hero & About', [['hero_label','Hero eyebrow'],['hero_button','Primary button text'],['about_heading','About heading'],['about','Biography'],['goal','Career goal']]],
 ['Contact & Appearance', [['contact_heading','Contact heading'],['contact_description','Contact description'],['accent','Accent color (hex, e.g. #8dd6ff)']]],
];
const longFields = new Set(['intro','about','goal','contact_description']);
export default function Settings({ settings }) {
 const form = useForm({ ...settings, profile_image_upload:null, background_image_upload:null, resume_upload:null });
 const update = (key,value) => form.setData(key,value);
 const submit = e => { e.preventDefault(); form.post('/admin/settings', { forceFormData:true, preserveScroll:true, onSuccess:()=>form.setData(prev=>({...prev,profile_image_upload:null,background_image_upload:null,resume_upload:null})) }); };
 return <AdminLayout title="Edit portfolio details"><Head title="Portfolio settings" />
 <p className="text-sm text-[var(--mute)] mb-5">Changes are published when you save. Your admin account email is separate from the public contact email.</p>
 <form onSubmit={submit} className="space-y-6">
 {groups.map(([heading,fields])=><section key={heading} className="glass p-5 sm:p-7"><h2 className="text-lg font-bold mb-4">{heading}</h2>
  <div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label])=><label key={key} className={`text-sm ${longFields.has(key)?'sm:col-span-2':''}`}>
   <span className="block mb-1 text-[var(--mute)]">{label}</span>
   {longFields.has(key) ? <textarea className="fld" rows={4} value={form.data[key]??''} onChange={e=>update(key,e.target.value)} /> :
    <input className="fld" type={key==='email'?'email':'text'} value={form.data[key]??''} onChange={e=>update(key,e.target.value)} />}
   {form.errors[key] && <span className="text-red-300 text-xs">{form.errors[key]}</span>}
  </label>)}</div></section>)}
 <section className="glass p-5 sm:p-7"><h2 className="text-lg font-bold mb-4">Uploads</h2>
  <div className="grid gap-4 sm:grid-cols-2">{[['profile_image_upload','Profile photo (JPG/PNG/WEBP)'],['background_image_upload','Background photo'],['resume_upload','Resume (PDF)']].map(([key,label])=><label key={key} className="text-sm"><span className="block mb-2">{label}</span><input type="file" accept={key==='resume_upload'?'application/pdf':'image/png,image/jpeg,image/webp'} onChange={e=>update(key,e.target.files?.[0]??null)} /><span className="block text-red-300 text-xs">{form.errors[key]}</span></label>)}</div>
  {settings.profile_image && <p className="text-sm text-[var(--mute)] mt-3">Current profile photo is saved.</p>}
 </section>
 <button className="btn btn-p" disabled={form.processing}>{form.processing?'Saving…':'Save portfolio details'}</button>
 </form></AdminLayout>;
}
