import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
export default function About({settings={},profileUrl='/images/profile.jpg'}) {
 return <section id="about" className="px-5 sm:px-8 py-16 sm:py-24"><div className="max-w-6xl mx-auto">
  <SectionTitle label="01 / The person behind the code" title="About Me" />
  <div className="mt-8 grid gap-6 md:grid-cols-2 items-center"><figure className="glass !p-2 m-0"><img className="profile-photo w-full aspect-[4/3] object-cover rounded-[16px]" alt={`Portrait of ${settings.name||'portfolio owner'}`} src={profileUrl} loading="lazy" /></figure>
  <Card className="p-6 sm:p-8"><h3 className="font-semibold text-lg">{settings.about_heading}</h3><p className="mt-3 text-sm sm:text-base text-[var(--mute)] leading-relaxed whitespace-pre-wrap">{settings.about}</p>
  {settings.resume_file&&<a className="ln mt-4 inline-block" href={`/storage/${settings.resume_file}`} target="_blank" rel="noopener noreferrer">View resume (PDF)</a>}</Card></div>
 </div></section>;
}
