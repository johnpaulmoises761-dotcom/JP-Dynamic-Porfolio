import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
const destinations = [
 ['Personal info, Hero, About, Contact & Appearance','/admin/settings'],
 ['Skills','/admin/content/skill'],['Experience','/admin/content/experience'],
 ['Education','/admin/content/education'],['Certificates','/admin/content/certificate'],
 ['Projects','/projects'],['Change password','/admin/account'],
];
export default function Dashboard({ counts = {} }) {
 return <AdminLayout title="Portfolio dashboard"><Head title="Admin dashboard" />
  <p className="text-[var(--mute)] mb-6">Edit any section, save, then visit your public portfolio. Your session stays active until you log out.</p>
  <div className="grid sm:grid-cols-2 gap-4">{destinations.map(([name,href]) =>
   <Link key={href} href={href} className="glass p-6 hover:border-[var(--acc)] transition-colors">
    <h2 className="font-semibold">{name}</h2><p className="text-sm text-[var(--mute)] mt-2">Open editor →</p>
   </Link>)}</div>
  <p className="text-xs text-[var(--mute)] mt-6">Projects: {counts.projects ?? 0} · Skills: {counts.skills ?? 0} · Experience: {counts.experience ?? 0} · Education: {counts.education ?? 0}</p>
 </AdminLayout>;
}
