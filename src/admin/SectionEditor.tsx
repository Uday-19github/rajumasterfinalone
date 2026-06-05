import { useEffect, useRef, useState } from "react";
import { supabase, ContentRow, SectionConfig, AdminField } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, FolderOpen, Upload, FileVideo, GripVertical } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const BUCKET = "media";

async function uploadMedia(file: File, onProgress?: (p: number) => void): Promise<string | null> {
  onProgress?.(20);
  // Images → FileReader base64 (always works, no bucket needed)
  if (file.type.startsWith("image/")) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => { onProgress?.(100); resolve(e.target?.result as string ?? null); };
      reader.onerror = () => { toast.error("Could not read image file"); resolve(null); };
      reader.readAsDataURL(file);
    });
  }
  // Videos → Supabase storage
  if (file.type.startsWith("video/")) {
    const ext = file.name.split(".").pop();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    onProgress?.(40);
    const { error } = await supabase.storage.from(BUCKET).upload(name, file, { cacheControl: "3600", upsert: false });
    if (error) {
      toast.error("Video upload needs a 'media' bucket in Supabase Storage. Paste a YouTube or video URL instead.");
      return null;
    }
    onProgress?.(100);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
    return data.publicUrl;
  }
  toast.error("Only images and videos are supported");
  return null;
}

function isVideo(url: string) { return /\.(mp4|webm|mov|avi|mkv)$/i.test(url); }

// ── helpers ───────────────────────────────────────────────────────
const COL_KEYS = new Set(["title", "body", "image_url", "button_text", "button_link"]);

function getField(row: ContentRow, key: string): string {
  if (key === "title") return row.title ?? "";
  if (key === "body") return row.body ?? "";
  if (key === "image_url") return row.image_url ?? "";
  if (key === "button_text") return row.button_text ?? "";
  if (key === "button_link") return row.button_link ?? "";
  const v = (row.meta ?? {})[key];
  if (Array.isArray(v)) return "";
  return (v as string) ?? "";
}
function getListField(row: ContentRow, key: string): string[] {
  const v = (row.meta ?? {})[key];
  if (Array.isArray(v)) return v as string[];
  return [];
}

// ── main component ────────────────────────────────────────────────
export function SectionEditor({
  row, config, onCancel, onSaved,
}: {
  row: ContentRow;
  config: SectionConfig;
  onCancel: () => void;
  onSaved: (row: ContentRow) => void;
}) {
  // flat string state for simple fields
  const [vals, setVals] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.fields.filter(f => f.type !== "list" && f.type !== "pair-list" && f.type !== "image-list").map(f => [f.key, getField(row, f.key)]))
  );
  // list state for list/pair-list/image-list
  const [lists, setLists] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(config.fields.filter(f => f.type === "list" || f.type === "pair-list" || f.type === "image-list").map(f => [f.key, getListField(row, f.key)]))
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setVals(Object.fromEntries(config.fields.filter(f => f.type !== "list" && f.type !== "pair-list" && f.type !== "image-list").map(f => [f.key, getField(row, f.key)])));
    setLists(Object.fromEntries(config.fields.filter(f => f.type === "list" || f.type === "pair-list" || f.type === "image-list").map(f => [f.key, getListField(row, f.key)])));
  }, [row, config]);

  const set = (key: string, v: string) => setVals(p => ({ ...p, [key]: v }));
  const setList = (key: string, v: string[]) => setLists(p => ({ ...p, [key]: v }));

  const save = async () => {
    setSaving(true);
    // Build column payload
    const colPayload: Partial<ContentRow> = {};
    const metaPayload: Record<string, unknown> = { ...(row.meta ?? {}) };
    for (const f of config.fields) {
      if (f.type === "list" || f.type === "pair-list" || f.type === "image-list") {
        metaPayload[f.key] = lists[f.key] ?? [];
      } else if (COL_KEYS.has(f.key)) {
        (colPayload as Record<string, unknown>)[f.key] = vals[f.key] || null;
      } else {
        metaPayload[f.key] = vals[f.key] || null;
      }
    }
    const { data, error } = await supabase
      .from("content")
      .update({ ...colPayload, meta: metaPayload })
      .eq("id", row.id)
      .select()
      .single();
    setSaving(false);
    if (error) {
      if (error.message.includes("meta")) {
        toast.error("Run the SQL migration first: ALTER TABLE public.content ADD COLUMN IF NOT EXISTS meta jsonb DEFAULT '{}'::jsonb;");
      } else {
        toast.error("Save failed: " + error.message);
      }
    } else {
      toast.success("✓ Saved — changes are live on the website.");
      onSaved(data as ContentRow);
    }
  };

  return (
    <div className="space-y-5">
      {/* Section label badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(255,119,0,0.15)", color: "hsl(24 100% 55%)", border: "1px solid rgba(255,119,0,0.3)" }}>
        {config.icon} {config.label}
      </div>

      {config.fields.map(f => (
        <FieldEditor key={f.key} field={f}
          val={vals[f.key] ?? ""}
          list={lists[f.key] ?? []}
          onVal={v => set(f.key, v)}
          onList={v => setList(f.key, v)}
        />
      ))}

      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving} className="admin-save-btn flex-1 py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 text-sm">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> : "✅ Save Changes"}
        </button>
        <button onClick={onCancel} className="px-5 py-2.5 rounded-lg text-sm font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Per-field renderer ────────────────────────────────────────────
function FieldEditor({ field, val, list, onVal, onList }: {
  field: AdminField;
  val: string;
  list: string[];
  onVal: (v: string) => void;
  onList: (v: string[]) => void;
}) {
  const inputClass = "w-full px-3 py-2 rounded-lg text-sm";
  const style = { background: "hsl(0 0% 13%)", border: "1px solid rgba(255,255,255,.12)", color: "hsl(0 0% 95%)" } as React.CSSProperties;
  const focusStyle = "focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500";

  if (field.type === "text" || field.type === "url") {
    return (
      <div>
        <label className="admin-field-label">{field.label}</label>
        {field.hint && <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,.35)" }}>{field.hint}</p>}
        <input value={val} onChange={e => onVal(e.target.value)} placeholder={field.placeholder}
          className={`${inputClass} ${focusStyle}`} style={style} />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="admin-field-label">{field.label}</label>
        {field.hint && <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,.35)" }}>{field.hint}</p>}
        <textarea value={val} onChange={e => onVal(e.target.value)} rows={4} placeholder={field.placeholder}
          className={`${inputClass} ${focusStyle} resize-none`} style={style} />
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div className="space-y-2">
        <label className="admin-field-label">{field.label}</label>
        <div className="flex gap-2">
          <input value={val} onChange={e => onVal(e.target.value)} placeholder="https://..."
            className={`${inputClass} ${focusStyle} flex-1`} style={style} />
          <ImageUploadButton onUpload={onVal} />
          <button type="button" onClick={() => toast("Go to Asset Library tab → Copy URL → paste here")}
            className="px-3 py-2 rounded-lg text-xs flex items-center gap-1 shrink-0"
            style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.1)" }}>
            <FolderOpen className="w-3.5 h-3.5" /> Browse
          </button>
        </div>
        {val && (
          <div className="relative inline-block">
            {isVideo(val)
              ? <div className="text-xs text-muted-foreground flex items-center gap-2 bg-black/20 p-2 rounded"><FileVideo className="w-4 h-4"/> Video: {val.split("/").pop()}</div>
              : <img src={val} alt="" className="max-h-32 rounded-md object-cover border border-white/10"
                  onError={e => { e.currentTarget.style.display = "none"; }} />
            }
          </div>
        )}
      </div>
    );
  }

  if (field.type === "image-list") {
    const max = field.max ?? 16;
    // Pad list to at least show one empty slot, up to max
    const items: string[] = list.length > 0 ? [...list] : [];
    // Always show filled slots + 1 empty if room, up to max
    const displayItems = items.length < max ? [...items, ""] : items;

    const updateItem = (i: number, val: string) => {
      const n = [...items];
      n[i] = val;
      onList(n.filter((v, idx) => idx < n.length - 1 || v !== "").slice(0, max));
    };
    const removeItem = (i: number) => onList(items.filter((_, j) => j !== i));

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e;
      if (!over || active.id === over.id) return;
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      onList(arrayMove(list, oldIndex, newIndex));
    };

    return (
      <div>
        <label className="admin-field-label">{field.label} <span style={{ color: "rgba(255,255,255,.25)", fontWeight: 400, textTransform: "none" }}>— images & videos, up to {max}</span></label>
        <div className="grid grid-cols-1 gap-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={displayItems.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
              {displayItems.map((url, i) => (
                <MediaSlot key={i} index={i} url={url}
                  onChange={v => updateItem(i, v)}
                  onRemove={i < items.length ? () => removeItem(i) : undefined}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        {items.length < max && items.length > 0 && (
          <button type="button" onClick={() => onList([...items, ""])}
            className="mt-2 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.45)", border: "1px dashed rgba(255,255,255,.15)", cursor: "pointer" }}>
            <Plus className="w-3.5 h-3.5" /> Add media slot
          </button>
        )}
      </div>
    );
  }

  if (field.type === "list" || field.type === "pair-list") {
    const max = field.max ?? 20;
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e;
      if (!over || active.id === over.id) return;
      onList(arrayMove(list, Number(active.id), Number(over.id)));
    };

    return (
      <div>
        <label className="admin-field-label">{field.label}</label>
        {field.hint && <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,.35)" }}>{field.hint}</p>}
        <div className="space-y-1.5">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={list.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
              {list.map((item, i) => (
                <SortableListItem key={i} index={i} value={item}
                  onChange={v => { const n = [...list]; n[i] = v; onList(n); }}
                  onRemove={() => onList(list.filter((_, j) => j !== i))}
                />
              ))}
            </SortableContext>
          </DndContext>
          {list.length < max && (
            <button onClick={() => onList([...list, ""])}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.55)", border: "1px dashed rgba(255,255,255,.15)" }}>
              <Plus className="w-3.5 h-3.5" /> Add item
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ── ImageUploadButton ─────────────────────────────────────────────
function ImageUploadButton({ onUpload }: { onUpload: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = async (file: File) => {
    setUploading(true); setProgress(0);
    const url = await uploadMedia(file, p => setProgress(p));
    setUploading(false); setProgress(0);
    if (url) { onUpload(url); toast.success("Uploaded!"); }
  };

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs shrink-0"
        style={{ background: uploading ? "rgba(255,119,0,.1)" : "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.65)", cursor: uploading ? "not-allowed" : "pointer" }}>
        {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        {uploading ? `${progress}%` : "Upload"}
      </button>
    </>
  );
}

// ── MediaSlot ─────────────────────────────────────────────────────
function MediaSlot({ index, url, onChange, onRemove }: {
  index: number; url: string;
  onChange: (v: string) => void;
  onRemove?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: index.toString() });
  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };
  
  const inputStyle = { background: "hsl(0 0% 13%)", border: "1px solid rgba(255,255,255,.12)", color: "hsl(0 0% 95%)", borderRadius: "0.4rem", padding: "0.4rem 0.6rem", fontSize: "0.8rem" } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} className="admin-media-slot">
      <div className="flex gap-2 items-center">
        <button {...attributes} {...listeners} className="admin-media-slot-handle shrink-0">
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] w-4 text-center shrink-0 font-bold" style={{ color: "rgba(255,255,255,.2)" }}>{index + 1}</span>
        
        <input value={url} onChange={e => onChange(e.target.value)}
          placeholder="Paste URL or upload →"
          className="flex-1 focus:outline-none focus:border-orange-500" style={inputStyle} />
        
        <ImageUploadButton onUpload={onChange} />

        {onRemove && (
          <button type="button" onClick={onRemove}
            style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171", borderRadius: "0.4rem", padding: "0.35rem", cursor: "pointer" }}>
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Preview */}
      {url && (
        <div className="mt-2 ml-14">
          {isVideo(url)
            ? <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,.4)" }}>
                <FileVideo className="w-4 h-4" />
                <span className="text-xs truncate max-w-[200px]">{url.split("/").pop()}</span>
                <a href={url} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(24 100% 60%)" }}>Preview ↗</a>
              </div>
            : <img src={url} alt="" className="h-16 rounded object-cover border border-white/5"
                onError={e => { e.currentTarget.style.display = "none"; }} />
          }
        </div>
      )}
    </div>
  );
}

function SortableListItem({ index, value, onChange, onRemove }: {
  index: number; value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: index.toString() });
  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };
  
  const inputClass = "w-full px-3 py-2 rounded-lg text-sm";
  const inputStyle = { background: "hsl(0 0% 13%)", border: "1px solid rgba(255,255,255,.12)", color: "hsl(0 0% 95%)" } as React.CSSProperties;
  const focusStyle = "focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500";

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2 items-center bg-white/5 border border-white/5 p-1.5 rounded-lg group">
      <button {...attributes} {...listeners} className="admin-media-slot-handle shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-3.5 h-3.5" />
      </button>
      <input value={value} onChange={e => onChange(e.target.value)}
        className={`${inputClass} ${focusStyle} flex-1`} style={inputStyle} />
      <button onClick={onRemove}
        className="p-2 rounded-lg" style={{ background: "rgba(239,68,68,.15)", color: "#f87171" }}>
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
