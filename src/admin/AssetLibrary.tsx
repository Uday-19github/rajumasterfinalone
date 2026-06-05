import { useRef, useState } from "react";
import { toast } from "sonner";
import { Copy, Upload, Check, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── All bundled website assets ────────────────────────────────────
import aerobics    from "@/assets/aerobics.jpg";
import after1      from "@/assets/after1.jpg";
import before1     from "@/assets/before1.jpg";
import bodyshaping from "@/assets/bodyshaping.jpg";
import bollywood   from "@/assets/bollywood.jpg";
import classical   from "@/assets/classical.jpg";
import contemporary from "@/assets/contemporary.jpg";
import corporate   from "@/assets/corporate.jpg";
import flashmob    from "@/assets/flashmob.jpg";
import gallery1    from "@/assets/gallery1.jpg";
import gallery2    from "@/assets/gallery2.jpg";
import gymnastics  from "@/assets/gymnastics.jpg";
import heroDancer  from "@/assets/hero-dancer.jpg";
import hiphop      from "@/assets/hiphop.jpg";
import sangeet     from "@/assets/sangeet.jpg";
import trainerHead from "@/assets/trainer-head.jpg";
import trainer1    from "@/assets/trainer1.jpg";
import trainer2    from "@/assets/trainer2.jpg";
import trainer3    from "@/assets/trainer3.jpg";
import trainer4    from "@/assets/trainer4.jpg";
import zumba       from "@/assets/zumba.jpg";

const SITE_ASSETS = [
  { name: "Hero Dancer",   url: heroDancer,  category: "Hero" },
  { name: "Hip-Hop",       url: hiphop,      category: "Dance" },
  { name: "Bollywood",     url: bollywood,   category: "Dance" },
  { name: "Classical",     url: classical,   category: "Dance" },
  { name: "Contemporary",  url: contemporary,category: "Dance" },
  { name: "Zumba",         url: zumba,       category: "Fitness" },
  { name: "Body Shaping",  url: bodyshaping, category: "Fitness" },
  { name: "Aerobics",      url: aerobics,    category: "Fitness" },
  { name: "Gymnastics",    url: gymnastics,  category: "Fitness" },
  { name: "Corporate",     url: corporate,   category: "Events" },
  { name: "Sangeet",       url: sangeet,     category: "Events" },
  { name: "Flash Mob",     url: flashmob,    category: "Events" },
  { name: "Gallery 1",     url: gallery1,    category: "Gallery" },
  { name: "Gallery 2",     url: gallery2,    category: "Gallery" },
  { name: "Before",        url: before1,     category: "Gallery" },
  { name: "After",         url: after1,      category: "Gallery" },
  { name: "Trainer Head",  url: trainerHead, category: "Team" },
  { name: "Trainer 1",     url: trainer1,    category: "Team" },
  { name: "Trainer 2",     url: trainer2,    category: "Team" },
  { name: "Trainer 3",     url: trainer3,    category: "Team" },
  { name: "Trainer 4",     url: trainer4,    category: "Team" },
];

const CATEGORIES = ["All", ...Array.from(new Set(SITE_ASSETS.map(a => a.category)))];

// ── Upload helper: FileReader for images, Supabase for videos ─────
async function uploadFile(file: File): Promise<string | null> {
  if (file.type.startsWith("image/")) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target?.result as string ?? null);
      reader.onerror = () => { toast.error("Could not read file"); resolve(null); };
      reader.readAsDataURL(file);
    });
  }
  if (file.type.startsWith("video/")) {
    const ext = file.name.split(".").pop();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(name, file, { cacheControl:"3600", upsert:false });
    if (error) {
      toast.error("Video upload failed — make sure the 'media' bucket exists in Supabase Storage.");
      return null;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(name);
    return data.publicUrl;
  }
  toast.error("Only images and videos are supported");
  return null;
}

export default function AssetLibrary() {
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [uploads, setUploads] = useState<{name:string; url:string; category:string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const copyUrl = async (url: string, name: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(name);
    toast.success("URL copied — paste it into any Image URL field");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (!arr.length) { toast.error("Choose images or videos"); return; }
    setUploading(true);
    const results: {name:string; url:string; category:string}[] = [];
    for (let i = 0; i < arr.length; i++) {
      setProgress(Math.round(i / arr.length * 80));
      const url = await uploadFile(arr[i]);
      if (url) results.push({ name: arr[i].name, url, category: "Uploaded" });
    }
    setProgress(100);
    setTimeout(() => setProgress(0), 600);
    setUploading(false);
    if (results.length) {
      setUploads(prev => [...results, ...prev]);
      setFilter("All");
      toast.success(`✓ ${results.length} file${results.length>1?"s":""} ready — click any image to copy its URL`);
    }
  };

  const allAssets = [...uploads, ...SITE_ASSETS];
  const filtered = filter === "All" ? allAssets : allAssets.filter(a => a.category === filter);
  const allCategories = uploads.length ? ["All","Uploaded",...CATEGORIES.slice(1)] : CATEGORIES;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"1.75rem"}}>

      {/* Header */}
      <div>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"2.25rem",letterSpacing:"0.05em",lineHeight:1}}>Asset Library</h2>
        <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,.35)",marginTop:"0.35rem"}}>
          All {SITE_ASSETS.length} website photos + your uploads. Click any image to copy its URL, then paste into an Image URL field.
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        style={{
          border: `2px dashed ${dragOver ? "hsl(24 100% 50%)" : "rgba(255,255,255,.15)"}`,
          borderRadius: "1rem",
          padding: "2rem 1.5rem",
          textAlign: "center",
          background: dragOver ? "rgba(255,119,0,.04)" : "rgba(255,255,255,.02)",
          transition: "all .2s",
          cursor: "pointer",
        }}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden"
          onChange={e => { if(e.target.files) handleFiles(e.target.files); e.target.value=""; }} />
        <div style={{width:"3.5rem",height:"3.5rem",margin:"0 auto 1rem",borderRadius:"0.875rem",background:"rgba(255,119,0,.1)",border:"1px solid rgba(255,119,0,.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Upload style={{width:"1.5rem",height:"1.5rem",color:"hsl(24 100% 55%)"}}/>
        </div>
        <p style={{fontSize:"0.95rem",fontWeight:600,color:"rgba(255,255,255,.7)",marginBottom:"0.35rem"}}>
          {uploading ? `Uploading… ${progress}%` : "Click to upload or drag & drop"}
        </p>
        <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,.3)"}}>Images & videos from your device</p>
        {uploading && (
          <div style={{margin:"1rem auto 0",maxWidth:"260px",height:"3px",background:"rgba(255,255,255,.1)",borderRadius:"2px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(135deg,hsl(24 100% 50%),hsl(44 100% 50%))",transition:"width .3s"}}/>
          </div>
        )}
      </div>

      {/* Category filter */}
      <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
        {allCategories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{
              padding:"0.4rem 0.875rem", borderRadius:"999px", fontSize:"0.78rem", fontWeight:600,
              border: filter===cat ? "1px solid hsl(24 100% 50%)" : "1px solid rgba(255,255,255,.1)",
              background: filter===cat ? "rgba(255,119,0,.15)" : "rgba(255,255,255,.04)",
              color: filter===cat ? "hsl(24 100% 60%)" : "rgba(255,255,255,.5)",
              cursor:"pointer", transition:"all .15s",
            }}>
            {cat} {cat==="All"?`(${allAssets.length})`:cat==="Uploaded"?`(${uploads.length})`:`(${SITE_ASSETS.filter(a=>a.category===cat).length + (cat==="Uploaded"?uploads.length:0)})`}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"0.75rem"}}>
        {filtered.map((asset, i) => (
          <div key={i}
            onClick={() => copyUrl(asset.url, asset.name)}
            style={{
              background:"hsl(0 0% 9%)", border:"1px solid rgba(255,255,255,.08)",
              borderRadius:"0.75rem", overflow:"hidden", cursor:"pointer",
              transition:"border-color .2s, transform .15s",
              position:"relative",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor="rgba(255,119,0,.4)"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor="rgba(255,255,255,.08)"; (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; }}
          >
            {/* Image */}
            <div style={{aspectRatio:"4/3",overflow:"hidden",background:"hsl(0 0% 12%)"}}>
              <img src={asset.url} alt={asset.name} loading="lazy"
                style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s"}}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1)"; }}
              />
            </div>
            {/* Footer */}
            <div style={{padding:"0.5rem 0.625rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.5rem"}}>
              <div style={{minWidth:0}}>
                <p style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,.7)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{asset.name}</p>
                <p style={{fontSize:"0.62rem",color:"rgba(255,255,255,.3)"}}>{asset.category}</p>
              </div>
              <div style={{
                width:"1.75rem",height:"1.75rem",borderRadius:"0.4rem",flexShrink:0,
                background: copied===asset.name ? "rgba(34,197,94,.2)" : "rgba(255,255,255,.07)",
                border: copied===asset.name ? "1px solid rgba(34,197,94,.35)" : "1px solid rgba(255,255,255,.1)",
                display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",
              }}>
                {copied===asset.name
                  ? <Check style={{width:"0.8rem",height:"0.8rem",color:"#4ade80"}}/>
                  : <Copy style={{width:"0.8rem",height:"0.8rem",color:"rgba(255,255,255,.45)"}}/>
                }
              </div>
            </div>
            {/* Copied overlay */}
            {copied===asset.name && (
              <div style={{position:"absolute",inset:0,background:"rgba(34,197,94,.08)",borderRadius:"0.75rem",pointerEvents:"none",border:"2px solid rgba(34,197,94,.3)"}}/>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:"3rem",color:"rgba(255,255,255,.25)"}}>
          <ImageIcon style={{width:"2.5rem",height:"2.5rem",margin:"0 auto 0.75rem"}}/>
          <p>No assets in this category</p>
        </div>
      )}

      <p style={{fontSize:"0.72rem",color:"rgba(255,255,255,.2)",textAlign:"center",paddingBottom:"1rem"}}>
        💡 Tip: Click any image to copy its URL, then paste into the Image URL field in any section editor.
      </p>
    </div>
  );
}
