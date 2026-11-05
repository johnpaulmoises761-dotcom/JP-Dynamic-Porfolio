import { Link } from '@inertiajs/react';
import FlashMessage from '../Components/ui/FlashMessage';
import useGlassGlow from '../hooks/useGlassGlow';
const links = [
    ['Dashboard','/admin/dashboard'],['Portfolio details','/admin/settings'],
    ['Skills','/admin/content/skill'],['Experience','/admin/content/experience'],
    ['Education','/admin/content/education'],['Certificates','/admin/content/certificate'],
    ['Projects','/projects'],['Account security','/admin/account'],
];
export default function AdminLayout({ title, children }) {
    useGlassGlow();
    return <>
        <div className="bg" role="presentation" />
        <a href="#admin-main" className="skip">Skip to content</a>
        <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6 pt-3">
            <div className="glass !rounded-2xl !overflow-visible flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <Link href="/admin/dashboard" className="font-mono text-sm font-bold">&lt;/&gt; Admin CMS</Link>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Link href="/" className="nl">View portfolio</Link>
                </div>
            </div>
        </header>
        <main id="admin-main" className="min-h-screen px-4 sm:px-8 pt-32 pb-16">
            <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <aside className="glass p-4 h-fit" aria-label="Admin navigation">
                    <p className="lbl mb-3">// Manage portfolio</p>
                    <nav className="flex flex-wrap lg:flex-col gap-1">
                        {links.map(([label,href]) => <Link key={href} href={href} className={`nl ${typeof window !== 'undefined' && window.location.pathname === href ? 'on' : ''}`}>{label}</Link>)}
                    </nav>
                </aside>
                <section className="min-w-0">
                    <FlashMessage />
                    <p className="lbl">// Admin</p><h1 className="h2 mt-2">{title}</h1><span className="bar" />
                    <div className="mt-7">{children}</div>
                </section>
            </div>
        </main>
    </>;
}
