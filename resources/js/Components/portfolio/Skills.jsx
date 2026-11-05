import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
const DEFAULT = [
 {title:'HTML',subtitle:'Technical Skills'}, {title:'Git & GitHub',subtitle:'Technical Skills'},
 {title:'CSS',subtitle:'Technical Skills'}, {title:'3D Design',subtitle:'Technical Skills'},
 {title:'Communication',subtitle:'Soft Skills'}, {title:'Teamwork',subtitle:'Soft Skills'},
 {title:'Problem-Solving',subtitle:'Soft Skills'}, {title:'Adaptability',subtitle:'Soft Skills'},
];
export default function Skills({entries=[]}) {
 const groups = Object.groupBy(entries.length?entries:DEFAULT,e=>e.subtitle||'Other Skills');
 return <section id="skills" className="px-5 sm:px-8 py-16 sm:py-24"><div className="max-w-6xl mx-auto"><SectionTitle label="02 / The toolkit" title="Skills & Expertise" />
  <div className="mt-8 grid gap-6 sm:grid-cols-2">{Object.entries(groups).map(([name,items],i)=><Card key={name} className="p-6"><p className="lbl">{String(i+1).padStart(2,'0')} /</p><h3 className="font-semibold mt-1 mb-4">{name}</h3><div className="flex flex-wrap gap-2">{items.map((item,i)=><span key={item.id??i} className="chip">{item.title}</span>)}</div></Card>)}</div>
 </div></section>;
}
