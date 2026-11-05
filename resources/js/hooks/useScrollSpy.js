import { useEffect, useRef, useState } from 'react';

/**
 * Ports the original scroll-spy: highlights the nav link of the section in view.
 * Clicking a link briefly locks the observer so the highlight doesn't flicker
 * while the page scrolls.
 */
export default function useScrollSpy(ids) {
    const [active, setActive] = useState(ids[0]);
    const lock = useRef(false);
    const timer = useRef(null);

    useEffect(() => {
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !lock.current) setActive(entry.target.id);
                }),
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
            clearTimeout(timer.current);
        };
    }, [ids.join(',')]);

    const select = (id) => {
        setActive(id);
        lock.current = true;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => (lock.current = false), 1000);
    };

    return [active, select];
}
