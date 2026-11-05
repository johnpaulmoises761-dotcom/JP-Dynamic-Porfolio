import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
const categories = [['education','Education'],['experience','Experience'],['certificate','Certificates']];
export default function Experience({settings={},entries={}}) {
 return <section id="experience" className="px-5 sm:px-8 py-16 sm:py-24"><div className="max-w-6xl mx-auto"><SectionTitle label="04 / The journey" title="Education & Experience" />
 <div className="mt-8 grid gap-6 md:grid-cols-2">{categories.map(([type,label])=><Card key={type} className="p-6"><p className="lbl">{label}</p>
 {(entries[type]??[]).length ? entries[type].map(item=><article key={item.id} className="mt-4"><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-[var(--mute)]">{item.subtitle}</p><p className="text-sm mt-2 whitespace-pre-wrap">{item.description}</p>{item.url&&<a className="ln" href={item.url} target="_blank" rel="noopener noreferrer">View details</a>}{item.image_url&&<img src={item.image_url} alt={item.title} loading="lazy" className="rounded-xl mt-3 max-h-44"/>}</article>) : <p className="mt-3 text-sm text-[var(--mute)]">No {label.toLowerCase()} entries yet.</p>}
 </Card>)}<Card className="p-6"><p className="lbl">Goal</p><p className="mt-3 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{settings.goal}</p></Card></div>
 </div></section>;
}
