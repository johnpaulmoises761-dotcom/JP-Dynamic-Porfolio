import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
const empty = {title:'',subtitle:'',description:'',url:'',sort_order:0,image:null};
const labels = {skill:'Skills',experience:'Experience',education:'Education',certificate:'Certificates'};
export default function Entries({type,entries=[]}) {
 const [editing,setEditing] = useState(null);
 const form = useForm({...empty});
 const select = entry => {setEditing(entry?.id??null);form.clearErrors();form.setData(entry?{title:entry.title??'',subtitle:entry.subtitle??'',description:entry.description??'',url:entry.url??'',sort_order:entry.sort_order??0,image:null}:{...empty});};
 const submit = e => {e.preventDefault();const url = editing ? `/admin/content/${type}/${editing}` : `/admin/content/${type}`;form.post(url,{forceFormData:true,preserveScroll:true,onSuccess:()=>select(null)});};
 const remove = entry => {if(window.confirm(`Delete ${entry.title}?`)) router.delete(`/admin/content/${type}/${entry.id}`,{preserveScroll:true});};
 return <AdminLayout title={`Manage ${labels[type]??type}`}><Head title={`Manage ${type}`} />
  <div className="grid lg:grid-cols-2 gap-6">
   <section className="glass p-5"><h2 className="font-semibold mb-4">{editing?'Edit entry':'Add entry'}</h2>
    <form onSubmit={submit} className="space-y-3">
     {[["title","Title / skill name"],["subtitle","Subtitle / category"],["url","Optional URL"],["sort_order","Display order"]].map(([key,label])=><label key={key} className="block text-sm"><span className="block mb-1">{label}</span><input className="fld" type={key==='sort_order'?'number':'text'} value={form.data[key]} onChange={e=>form.setData(key,e.target.value)} /><span className="text-red-300 text-xs">{form.errors[key]}</span></label>)}
     <label className="block text-sm">Description<textarea className="fld mt-1" rows={4} value={form.data.description} onChange={e=>form.setData('description',e.target.value)} /><span className="text-red-300 text-xs">{form.errors.description}</span></label>
     <label className="block text-sm">Optional image<input className="mt-2 block" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>form.setData('image',e.target.files?.[0]??null)} /><span className="text-red-300 text-xs">{form.errors.image}</span></label>
     <div className="flex gap-2"><button className="btn btn-p" disabled={form.processing}>{form.processing?'Saving…':editing?'Save changes':'Add entry'}</button><button type="button" className="btn btn-g" onClick={()=>select(null)}>Clear</button></div>
    </form>
   </section>
   <section className="space-y-3"><h2 className="font-semibold">Saved entries ({entries.length})</h2>{entries.map(entry=><article className="glass p-4" key={entry.id}>
    <div className="flex justify-between gap-3"><div><h3 className="font-semibold">{entry.title}</h3><p className="text-xs text-[var(--mute)]">{entry.subtitle}</p></div><span className="text-xs">#{entry.sort_order}</span></div>
    <p className="text-sm mt-2 whitespace-pre-wrap">{entry.description}</p>
    <div className="flex gap-2 mt-3"><button type="button" className="btn btn-g" onClick={()=>select(entry)}>Edit</button><button type="button" className="btn btn-g" onClick={()=>remove(entry)}>Delete</button></div>
   </article>)}{!entries.length&&<p className="text-sm text-[var(--mute)]">No entries yet. Add one using the form.</p>}</section>
  </div>
 </AdminLayout>;
}
