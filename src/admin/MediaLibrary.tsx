import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Upload, Copy, Trash2, FileVideo, Loader2 } from "lucide-react";

const BUCKET = "media";
type MediaFile = { name: string; url: string; isVideo: boolean };

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const card = { background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "0.75rem" } as React.CSSProperties;

  const load = async () => {
    setLoading(true); setError(null);
    const { data, error: err } = await supabase.storage.from(BUCKET).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (err) { setError(err.message); setLoading(false); return; }
    setFiles((data || []).filter(f => f.name && !f.name.startsWith(".")).map(f => {
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(f.name);
      return { name: f.name, url: pub.publicUrl, isVideo: /\.(mp4|webm|mov|avi|mkv)$/i.test(f.name) };
    }));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = useCallback(async (fileList: FileList | File[]) => {
    const arr = Array.from(fileList).filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (!arr.length) { toast.error("Choose image or video files"); return; }
    setUploading(true); setProgress(0);
    let done = 0;
    for (const file of arr) {
      const ext = file.name.split(".").pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(name, file, { cacheControl: "3600", upsert: false });
      if (error) toast.error(`${file.name}: ${error.message}`);
      done++; setProgress(Math.round(done / arr.length * 100));
    }
    setUploading(false); setProgress(0); toast.success("Upload complete"); load();
  }, []);

  const copy = async (url: string) => { await navigator.clipboard.writeText(url); toast.success("URL copied!"); };
  const del = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-6">
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", letterSpacing: "0.05em" }}>Media Library</h2>

      {error && (
        <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: "0.75rem", padding: "1rem", color: "#f87171" }}>
          <p className="text-sm mb-2">{error}</p>
          <button onClick={load} className="text-xs px-3 py-1.5 rounded" style={{ background: "rgba(239,68,68,.2)", border: "none", cursor: "pointer", color: "#f87171" }}>Retry</button>
        </div>
      )}

      {/* Upload zone */}
      <div onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files) upload(e.dataTransfer.files); }}
        style={{ border: `2px dashed ${dragOver ? "hsl(24 100% 50%)" : "rgba(255,255,255,.15)"}`, borderRadius: "0.75rem", padding: "2.5rem 1rem", textAlign: "center", background: dragOver ? "rgba(255,119,0,.04)" : "rgba(255,255,255,.02)", transition: "all .2s" }}>
        <Upload className="w-9 h-9 mx-auto mb-3" style={{ color: "rgba(255,255,255,.25)" }} />
        <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,.6)" }}>Drag & drop images or videos here</p>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,.3)" }}>or</p>
        <label>
          <input type="file" multiple accept="image/*,video/*" className="hidden"
            onChange={e => e.target.files && upload(e.target.files)} disabled={uploading} />
          <span className="admin-save-btn px-6 py-2.5 rounded-lg text-sm cursor-pointer inline-block">
            {uploading ? "Uploading…" : "Choose Files"}
          </span>
        </label>
        {uploading && (
          <div className="mt-4 max-w-xs mx-auto">
            <div style={{ height: "4px", background: "rgba(255,255,255,.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(135deg,hsl(24 100% 50%),hsl(51 100% 50%))", transition: "width .3s" }} />
            </div>
            <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,.4)" }}>{progress}%</p>
          </div>
        )}
      </div>

      {/* File grid */}
      {loading ? (
        <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,.35)" }}>
          <Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">Loading…</span>
        </div>
      ) : files.length === 0 ? (
        <p className="text-sm" style={{ color: "rgba(255,255,255,.35)" }}>No files yet. Upload your first image above.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {files.map(f => (
            <div key={f.name} style={card} className="overflow-hidden flex flex-col">
              <div style={{ aspectRatio: "1", background: "hsl(0 0% 12%)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {f.isVideo
                  ? <div className="text-center" style={{ color: "rgba(255,255,255,.3)" }}><FileVideo className="w-10 h-10 mx-auto mb-1" /><span className="text-xs">Video</span></div>
                  : <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                }
              </div>
              <div className="p-2.5 space-y-2">
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,.4)" }} title={f.name}>{f.name}</p>
                <div className="flex gap-1.5">
                  <button onClick={() => copy(f.url)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium"
                    style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", cursor: "pointer" }}>
                    <Copy className="w-3 h-3" /> Copy URL
                  </button>
                  <button onClick={() => del(f.name)} className="py-1.5 px-2 rounded"
                    style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171", cursor: "pointer" }}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
