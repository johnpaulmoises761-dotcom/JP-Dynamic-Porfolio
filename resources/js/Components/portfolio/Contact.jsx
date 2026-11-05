import { useState } from 'react';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Same behavior as the original: the form validates, then opens the visitor's email app with the message filled in. */
export default function Contact({settings={}}) {
    const PORTFOLIO_EMAIL = settings.email || '';
    const [fields, setFields] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ tone: 'ok', text: '' });

    const update = (key) => (event) => setFields((prev) => ({ ...prev, [key]: event.target.value }));

    const submit = (event) => {
        event.preventDefault();
        const name = fields.name.trim();
        const email = fields.email.trim();
        const message = fields.message.trim();

        if (!name || !EMAIL_PATTERN.test(email) || !message) {
            setStatus({ tone: 'error', text: 'Please add your name, a valid email, and a message.' });
            return;
        }

        setStatus({ tone: 'ok', text: 'Opening your email app…' });
        window.location.href =
            `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + name)}` +
            `&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;
        setFields({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="px-5 sm:px-8 py-16 sm:py-24">
            <div className="max-w-6xl mx-auto">
                <SectionTitle label="05 / Start a conversation" title="Let’s Connect" />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card className="p-6 sm:p-8">
                        <h3 className="font-semibold text-lg">{settings.contact_heading || 'Have an idea in mind?'}</h3>
                        <p className="mt-2 text-sm text-[var(--mute)] leading-relaxed">
                            {settings.contact_description}
                        </p>
                        <p className="mt-5">
                            <a className="ln" href={`mailto:${PORTFOLIO_EMAIL}`}>{PORTFOLIO_EMAIL}</a>
                        </p>
                        <p className="mt-1 text-sm text-[var(--mute)]">{settings.availability}</p>
                        <p className="mt-5 text-xs text-[var(--mute)]">Connect with me:</p>
                        <p className="mt-1 flex gap-4">
                            {settings.github && <a className="ln" href={settings.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                            {settings.linkedin && <a className="ln" href={settings.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
                            {settings.facebook && <a className="ln" href={settings.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>}
                        </p>
                    </Card>

                    <form onSubmit={submit} noValidate className="glass p-6 sm:p-8">
                        <label className="block text-xs font-medium text-[var(--mute)]">
                            Your name
                            <input className="fld mt-1.5" name="n" autoComplete="name" value={fields.name} onChange={update('name')} />
                        </label>
                        <label className="block text-xs font-medium text-[var(--mute)] mt-4">
                            Email address
                            <input className="fld mt-1.5" name="e" type="email" autoComplete="email" value={fields.email} onChange={update('email')} />
                        </label>
                        <label className="block text-xs font-medium text-[var(--mute)] mt-4">
                            Message
                            <textarea className="fld mt-1.5" name="m" rows={4} value={fields.message} onChange={update('message')} />
                        </label>
                        <button className="btn btn-p w-full mt-5" type="submit">Send message</button>
                        <p className={`mt-3 text-xs min-h-[1rem] ${status.tone === 'error' ? 'text-[#ff9aa8]' : 'text-[var(--acc2)]'}`} role="status" aria-live="polite">
                            {status.text}
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
