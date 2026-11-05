export default function Footer({settings={}}) {
    return (
        <footer className="text-center text-xs text-[var(--mute)] px-5 pt-6" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom,0px))' }}>
            <p>Designed and built by {settings.name || "Portfolio owner"}.</p>
        </footer>
    );
}
