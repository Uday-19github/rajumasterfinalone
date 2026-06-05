import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function AddDialog({ usedKeys, maxOrder, onClose, onCreated }:{ usedKeys:Set<string>; maxOrder:number; onClose:()=>void; onCreated:()=>void }) {
  const [key,setKey]=useState(""); 
  const [label,setLabel]=useState(""); 
  const [saving,setSaving]=useState(false); 
  const [err,setErr]=useState("");
  
  const create=async()=>{
    const k=key.trim().toLowerCase();
    if(!k)return setErr("Key required"); 
    if(/\s/.test(k))return setErr("No spaces"); 
    if(usedKeys.has(k))return setErr("Already exists"); 
    if(!label.trim())return setErr("Label required");
    
    setSaving(true);
    const {error}=await supabase.from("content").insert({
      section_key:k,
      section_label:label.trim(),
      title:"",
      body:"",
      image_url:null,
      button_text:null,
      button_link:null,
      is_visible:true,
      sort_order:maxOrder+1,
      meta:{}
    });
    setSaving(false);
    
    if(error){setErr(error.message);return;}
    toast.success("Section created!"); onCreated();
  };

  const inputClass = "bg-neutral-900 border border-white/10 text-neutral-100 rounded-lg px-3.5 py-2.5 text-sm w-full font-sans focus:outline-none focus:border-primary/50 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 w-full max-w-[440px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
        <h3 className="font-display text-3xl tracking-wide mb-5">New Section</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="admin-field-label block mb-1.5">
              Section Key <span className="text-white/25 normal-case font-normal">— lowercase, no spaces, unique</span>
            </label>
            <input value={key} onChange={e=>{setKey(e.target.value);setErr("");}} placeholder="e.g. team" className={inputClass}/>
          </div>
          <div>
            <label className="admin-field-label block mb-1.5">Display Label</label>
            <input value={label} onChange={e=>{setLabel(e.target.value);setErr("");}} placeholder="e.g. Our Team" className={inputClass}/>
          </div>
          {err&&<p className="text-sm text-red-400">{err}</p>}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={create} disabled={saving} className="admin-save-btn flex-1 p-3">
            {saving?<><Loader2 className="admin-spin w-4 h-4"/>Creating…</>:"Create Section"}
          </button>
          <button onClick={onClose} className="admin-ghost-btn px-5 py-3">Cancel</button>
        </div>
      </div>
    </div>
  );
}
