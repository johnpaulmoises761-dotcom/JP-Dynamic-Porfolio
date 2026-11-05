import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import useScrollSpy from '../../hooks/useScrollSpy';

// One list drives both the desktop menu and the mobile menu (the original cloned the links with JS).
export const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
    const user = usePage().props.auth?.user;
    const [active, select] = useScrollSpy(SECTION_IDS);
    const [open, setOpen] = useState(false);
    const toggleButton = useRef(null);

    // Escape closes the mobile menu and returns focus to the toggle button (same as the original).
    useEffect(() => {
        if (!open) return;
        const onKey = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggleButton.current?.focus();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    const go = (id) => {
        select(id);
        setOpen(false);
    };

    const linkClass = (id) => `nl${active === id ? ' on' : ''}`;

    return (
        <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top,0px)' }}>
            <div className="glass !rounded-2xl mx-3 sm:mx-6 mt-3 !overflow-visible">
                <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
                    <a href="#home" onClick={() => go('home')} className="font-mono text-sm font-medium tracking-wide flex items-center gap-1.5" aria-label="John Paul Moises, home">
                        <span className="text-[var(--acc2)]">&lt;/&gt;</span> J.P. MOISES
                    </a>

                    <button
                        ref={toggleButton}
                        type="button"
                        className="md:hidden grid place-items-center w-10 h-10 rounded-xl border border-white/20 bg-white/10"
                        aria-expanded={open}
                        aria-controls="menu"
                        aria-label="Toggle navigation menu"
                        onClick={() => setOpen((value) => !value)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>

                    <nav aria-label="Primary" className="hidden md:block">
                        <ul className="flex gap-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={linkClass(item.id)}
                                        aria-current={active === item.id ? 'page' : undefined}
                                        onClick={() => go(item.id)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href={user ? '/admin/dashboard' : '/login'} className="nl">
                                    Admin
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {open && (
                    <nav id="menu" aria-label="Mobile" className="md:hidden px-3 pb-3">
                        <ul className="grid grid-cols-2 gap-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={linkClass(item.id)}
                                        aria-current={active === item.id ? 'page' : undefined}
                                        onClick={() => go(item.id)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={user ? '/admin/dashboard' : '/login'}
                                    className="nl"
                                    onClick={() => setOpen(false)}
                                >
                                    Admin
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
