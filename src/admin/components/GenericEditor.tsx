import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase, ContentRow } from "@/lib/supabase";

export function GenericEditor({ row, onCancel, onSaved }:{ row:ContentRow; onCancel:()=>void; onSaved:(r:ContentRow)=>void }) {
  const [title,setTitle]=useState(row.title??"");
  const [body,setBody]=useState(row.body??"");
  const [imageUrl,setImageUrl]=useState(row.image_url??"");
  const [saving,setSaving]=useState(false);
  
  const save=async()=>{
    setSaving(true);
    const {data,error}=await supabase.from("content").update({title,body,image_url:imageUrl||null}).eq("id",row.id).select().single();
    setSaving(false);
    if(error) toast.error(error.message); else { toast.success("Saved"); onSaved(data as ContentRow); }
  };

  const inputClass = "bg-neutral-900 border border-white/10 text-neutral-100 rounded-lg px-3.5 py-2.5 text-sm w-full font-sans focus:outline-none focus:border-primary/50 transition-colors";

  return (
    <div className="flex flex-col gap-4">
      {[{label:"Title",val:title,set:setTitle},{label:"Body",val:body,set:setBody},{label:"Image URL",val:imageUrl,set:setImageUrl}].map(f=>(
        <div key={f.label}>
          <label className="admin-field-label block mb-1.5">{f.label}</label>
          {f.label==="Body"
            ?<textarea value={f.val} onChange={e=>f.set(e.target.value)} rows={3} className={`${inputClass} resize-none`}/>
            :<input value={f.val} onChange={e=>f.set(e.target.value)} className={inputClass}/>}
        </div>
      ))}
      <div className="flex gap-2.5">
        <button onClick={save} disabled={saving} className="admin-save-btn">
          {saving?<><Loader2 className="admin-spin w-4 h-4"/>Saving…</>:"✅ Save"}
        </button>
        <button onClick={onCancel} className="admin-ghost-btn">Cancel</button>
      </div>
    </div>
  );
}
