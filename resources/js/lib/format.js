const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-03-10" -> "Mar 2026". Built by hand so the date is not shifted by the time zone. */
export function formatMonthYear(isoDate) {
    if (!isoDate) return '';
    const [year, month] = isoDate.split('-').map(Number);
    return `${MONTHS[month - 1]} ${year}`;
}

/** "Figma, UI/UX Design" -> ["Figma", "UI/UX Design"] */
export function splitTech(text) {
    return (text || '').split(',').map((item) => item.trim()).filter(Boolean);
}
