import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
export default function Account() {
 const form = useForm({current_password:'',password:'',password_confirmation:''});
 const submit = e => {e.preventDefault();form.put('/admin/account',{onSuccess:()=>form.reset(),preserveScroll:true});};
 return <AdminLayout title="Account security"><Head title="Change admin password" />
  <form onSubmit={submit} className="glass p-6 max-w-xl space-y-4">
   <p className="text-sm text-[var(--mute)]">Change your admin login password. Use 12+ characters with uppercase, lowercase and numbers.</p>
   {[['current_password','Current password'],['password','New password'],['password_confirmation','Confirm new password']].map(([key,label])=><label className="block text-sm" key={key}>{label}<input className="fld mt-1" type="password" autoComplete={key==='current_password'?'current-password':'new-password'} value={form.data[key]} onChange={e=>form.setData(key,e.target.value)} /><span className="text-red-300 text-xs">{form.errors[key]}</span></label>)}
   <button className="btn btn-p" disabled={form.processing}>Change password</button>
  </form>
 </AdminLayout>;
}
