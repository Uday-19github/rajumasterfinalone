import { useCallback, useEffect, useState } from "react";
import { supabase, ContentRow, PULSE_SEED, META_COLUMN_SQL } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Loader2, RefreshCw, ExternalLink, X, Layers } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableCard } from "./components/SortableCard";
import { AddDialog } from "./components/AddDialog";

const LIVE_URL = typeof window !== "undefined" ? window.location.origin : "https://rhythm-radiance-spot.lovable.app";
type State = { kind:"loading" }|{ kind:"ready"; rows:ContentRow[] }|{ kind:"needs-seed" }|{ kind:"error"; message:string };

async function fetchRows() {
  const { data, error } = await supabase.from("content")
    .select("id,section_key,section_label,title,body,image_url,button_text,button_link,is_visible,sort_order,meta")
    .order("sort_order", { ascending: true });
  return { rows: error ? undefined : (data as ContentRow[]) || [], error: error?.message };
}

export default function PagesContent() {
  const [state, setState] = useState<State>({ kind:"loading" });
  const [editingId, setEditingId] = useState<string|null>(null);
  const [confirmId, setConfirmId] = useState<string|null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date|null>(null);

  const load = useCallback(async () => {
    setState({ kind:"loading" });
    const { rows, error } = await fetchRows();
    if (error) { setState({ kind:"error", message:error }); return; }
    setState(rows!.length === 0 ? { kind:"needs-seed" } : { kind:"ready", rows:rows! });
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const { rows, error } = await fetchRows();
    if (!error) setState(rows!.length === 0 ? { kind:"needs-seed" } : { kind:"ready", rows:rows! });
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const seed = async () => {
    setSeeding(true);
    const existing = state.kind === "ready" ? state.rows.map(r => r.section_key) : [];
    const toInsert = PULSE_SEED.filter(r => !existing.includes(r.section_key));
    if (!toInsert.length) { toast("All sections already exist"); setSeeding(false); return; }
    const { error } = await supabase.from("content").insert(toInsert);
    if (error) toast.error(error.message.includes("meta") ? "Run SQL first: " + META_COLUMN_SQL : error.message);
    else { toast.success(`✓ Added ${toInsert.length} sections`); setLastSaved(new Date()); await refresh(); }
    setSeeding(false);
  };

  const rows = state.kind === "ready" ? state.rows : [];
  const visibleCount = rows.filter(r => r.is_visible).length;

  const toggleVisible = async (row: ContentRow) => {
    const next = !row.is_visible;
    if (state.kind === "ready") setState({ kind:"ready", rows: state.rows.map(r => r.id===row.id ? {...r, is_visible:next} : r) });
    const { error } = await supabase.from("content").update({ is_visible:next }).eq("id", row.id);
    if (error) { toast.error("Failed"); await refresh(); }
    else { setLastSaved(new Date()); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("content").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { setConfirmId(null); toast.success("Deleted"); setLastSaved(new Date()); await refresh(); }
  };

  const sensors = useSensors(useSensor(PointerSensor,{activationConstraint:{distance:5}}), useSensor(KeyboardSensor,{coordinateGetter:sortableKeyboardCoordinates}));

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id===over.id) return;
    const oi = rows.findIndex(r => r.id===active.id), ni = rows.findIndex(r => r.id===over.id);
    if (oi<0||ni<0) return;
    const reordered = arrayMove(rows,oi,ni).map((r,i) => ({...r, sort_order:i+1}));
    setState({ kind:"ready", rows:reordered });
    const { error } = await supabase.from("content").upsert(reordered.map(r => ({id:r.id,section_key:r.section_key,sort_order:r.sort_order})),{onConflict:"id"});
    if (error) { toast.error("Reorder failed"); await refresh(); }
    else { setLastSaved(new Date()); await refresh(); }
  };

  const fmtTime = (d:Date) => {
    const s=Math.floor((Date.now()-d.getTime())/1000);
    if(s<5)return"just now"; if(s<60)return`${s}s ago`; if(s<3600)return`${Math.floor(s/60)}m ago`;
    return d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  };

  // ── render states ──────────────────────────────────────────────
  if (state.kind==="loading") return (
    <div className="flex items-center justify-center gap-3 text-white/35 pt-12">
      <Loader2 className="admin-spin w-5 h-5"/>
      <span className="text-sm">Loading content…</span>
    </div>
  );

  if (state.kind==="error") return (
    <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-6">
      <p className="text-red-400 font-bold mb-2">⚠ Could not load content</p>
      <p className="text-red-400/70 text-sm mb-4">{state.message}</p>
      <button onClick={load} className="admin-ghost-btn">Retry</button>
    </div>
  );

  if (state.kind==="needs-seed") return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-4xl tracking-wide">Pages & Content</h2>
      <div className="bg-[#171717] border border-white/10 rounded-2xl p-12 text-center">
        <Layers className="w-12 h-12 mx-auto mb-5 text-white/15"/>
        <p className="text-white/55 text-base mb-6 max-w-[420px] mx-auto">
          No content sections found. Seed all 26 Rise & Shine sections to get started.
        </p>
        <div className="bg-[#ff7700]/10 border border-[#ff7700]/20 rounded-xl p-4 mb-6 text-sm text-white/40 text-left max-w-[560px] mx-auto">
          <strong className="text-[#ff7700]/80">First:</strong> run this in Supabase SQL Editor →
          <code className="block mt-1.5 text-white/60 text-xs break-all">{META_COLUMN_SQL}</code>
        </div>
        <button onClick={seed} disabled={seeding} className="admin-save-btn px-10 py-3.5 text-base">
          {seeding ? <><Loader2 className="admin-spin w-4 h-4"/>Seeding…</> : "🌱 Seed All 26 Sections"}
        </button>
      </div>
    </div>
  );

  const usedKeys = new Set(rows.map(r => r.section_key));

  return (
    <>
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <h2 className="font-display text-4xl tracking-wide leading-none">
            Pages & Content
          </h2>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button onClick={refresh} disabled={refreshing} className="admin-ghost-btn" title="Refresh">
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing?"admin-spin":""}`}/>
              Refresh
            </button>
            <button onClick={seed} disabled={seeding} className="admin-ghost-btn">
              {seeding?<Loader2 className="w-3.5 h-3.5 admin-spin"/>:"🌱"} Add Missing
            </button>
            <button onClick={()=>setShowPreview(p=>!p)} className={`admin-ghost-btn ${showPreview?"border-[#ff7700]/40 text-[#ff7700]":""}`}>
              👁 Preview
            </button>
            <button onClick={()=>setShowAdd(true)} className="admin-fire-btn">
              <Plus className="w-4 h-4"/> Add Section
            </button>
          </div>
        </div>

        {/* Stat strip */}
        <div className="admin-stat-strip">
          {[
            { value: rows.length, label: "Total Sections" },
            { value: visibleCount, label: "Visible" },
            { value: rows.length - visibleCount, label: "Hidden" },
            { value: lastSaved ? fmtTime(lastSaved) : "—", label: "Last Saved" },
          ].map(s => (
            <div key={s.label} className="admin-stat-cell">
              <span className="admin-stat-value">{s.value}</span>
              <span className="admin-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/30">
          ⠿ Drag to reorder &nbsp;·&nbsp; 💾 All edits save instantly to the live website
        </p>

        {/* Section list */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows.map(r=>r.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2.5">
              {rows.map((row,idx) => (
                <SortableCard key={row.id} row={row} idx={idx}
                  isEditing={editingId===row.id}
                  isDeleting={confirmId===row.id}
                  onEdit={()=>setEditingId(row.id)}
                  onCancelEdit={()=>setEditingId(null)}
                  onSaved={async()=>{ setEditingId(null); setLastSaved(new Date()); await refresh(); }}
                  onAskDelete={()=>setConfirmId(row.id)}
                  onCancelDelete={()=>setConfirmId(null)}
                  onConfirmDelete={()=>handleDelete(row.id)}
                  onToggleVisible={()=>toggleVisible(row)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {showAdd && <AddDialog usedKeys={usedKeys} maxOrder={rows.reduce((m,r)=>Math.max(m,r.sort_order),0)}
          onClose={()=>setShowAdd(false)} onCreated={async()=>{ setShowAdd(false); setLastSaved(new Date()); await refresh(); }} />}
      </div>

      {/* Preview panel */}
      <div className="admin-preview-panel" style={{transform:showPreview?"translateX(0)":"translateX(100%)"}}>
        <div className="flex items-center justify-between p-[1rem_1.25rem] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="admin-pulse-dot"/>
            <span className="text-sm font-bold text-white/80">Live Website</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={LIVE_URL} target="_blank" rel="noreferrer" className="admin-ghost-btn text-xs px-2.5 py-1">
              Full Size <ExternalLink className="w-3 h-3"/>
            </a>
            <button onClick={()=>setShowPreview(false)} className="admin-ghost-btn p-1.5">
              <X className="w-4 h-4"/>
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          {showPreview && <iframe src={LIVE_URL} title="Live Preview" className="absolute inset-0 w-full h-full border-none"/>}
        </div>
        <div className="p-[0.75rem_1.25rem] border-t border-white/10 bg-black/20">
          <p className="text-xs text-white/30">
            Last saved: <span className="text-white/55">{lastSaved?fmtTime(lastSaved):"—"}</span>
          </p>
        </div>
      </div>
    </>
  );
}
