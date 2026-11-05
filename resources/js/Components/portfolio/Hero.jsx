export default function Hero({settings={}}) {
 return <section id="home" className="min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-16"><div className="max-w-6xl mx-auto w-full">
  <p className="lbl">{settings.hero_label}</p><h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">{settings.name}</h1>
  <p className="mt-3 text-base sm:text-lg font-semibold tracking-wide text-[var(--acc)]">{settings.title}</p>
  <p className="mt-4 max-w-md text-sm sm:text-base text-[var(--mute)] leading-relaxed">{settings.intro}</p>
  <div className="mt-7 flex flex-wrap gap-3"><a href="#projects" className="btn btn-p">{settings.hero_button||'Explore my work'}</a><a href="#contact" className="btn btn-g">Get in touch</a></div>
 </div></section>;
}
