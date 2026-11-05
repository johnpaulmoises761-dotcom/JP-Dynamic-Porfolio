import { useEffect } from 'react';

/** Ports the pointer-light effect: the glass panel under the cursor gets a moving highlight. */
export default function useGlassGlow() {
    useEffect(() => {
        const onMove = (event) => {
            const glass = event.target.closest?.('.glass');
            if (!glass) return;
            const rect = glass.getBoundingClientRect();
            glass.style.setProperty('--mx', event.clientX - rect.left + 'px');
            glass.style.setProperty('--my', event.clientY - rect.top + 'px');
        };
        document.addEventListener('pointermove', onMove);
        return () => document.removeEventListener('pointermove', onMove);
    }, []);
}
