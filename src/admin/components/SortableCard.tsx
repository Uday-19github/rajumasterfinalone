import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { ContentRow, SECTION_CONFIGS, SECTION_COLORS } from "@/lib/supabase";
import { SectionEditor } from "../SectionEditor";
import { GenericEditor } from "./GenericEditor";

export function SortableCard({ row, idx, isEditing, isDeleting, onEdit, onCancelEdit, onSaved, onAskDelete, onCancelDelete, onConfirmDelete, onToggleVisible }:{
  row:ContentRow; idx:number; isEditing:boolean; isDeleting:boolean;
  onEdit:()=>void; onCancelEdit:()=>void; onSaved:(r:ContentRow)=>void;
  onAskDelete:()=>void; onCancelDelete:()=>void; onConfirmDelete:()=>void; onToggleVisible:()=>void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id:row.id });
  const config = SECTION_CONFIGS[row.section_key];
  const color = SECTION_COLORS[row.section_key] || "bg-slate-500";
  const label = row.section_label || config?.label || row.section_key;
  const icon = config?.icon ?? "📄";
  const preview = (row.body||"").slice(0,120);

  // Extract color hex from Tailwind class for the left bar
  const barColors: Record<string,string> = {
    "bg-purple-500":"#a855f7","bg-teal-500":"#14b8a6","bg-teal-600":"#0d9488",
    "bg-pink-500":"#ec4899","bg-pink-600":"#db2777","bg-orange-500":"#f97316",
    "bg-orange-600":"#ea580c","bg-yellow-500":"#eab308","bg-yellow-600":"#ca8a04",
    "bg-blue-500":"#3b82f6","bg-green-500":"#22c55e","bg-green-600":"#16a34a",
    "bg-red-500":"#ef4444","bg-indigo-500":"#6366f1","bg-purple-400":"#c084fc","bg-slate-500":"#64748b",
  };
  const barColor = barColors[color] || "#64748b";

  return (
    <div ref={setNodeRef} className="admin-slide-up"
      style={{ transform:CSS.Transform.toString(transform), transition, opacity:isDragging?0.5:1, zIndex:isDragging?10:"auto", animationDelay:`${idx*0.03}s` }}>
      <div className={`admin-section-card ${isEditing?"editing":""}`}>
        <div className="flex items-stretch">
          {/* Color bar */}
          <div style={{background:barColor}} className="w-1 shrink-0 rounded-l-xl"/>

          <div className="flex-1 p-[1.125rem_1.25rem]">
            {/* Top row */}
            <div className="flex items-center gap-3.5">
              {/* Drag handle */}
              <button {...attributes} {...listeners} className="admin-drag-handle cursor-grab active:cursor-grabbing text-white/30 hover:text-white/70 hover:bg-white/5 p-1 rounded transition-colors" aria-label="Drag">
                <GripVertical className="w-4.5 h-4.5"/>
              </button>

              {/* Icon badge */}
              <div className="admin-icon-badge">{icon}</div>

              {/* Label & key */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-display text-lg tracking-wide text-white/90">{label}</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{row.section_key}</span>
                  <button onClick={onToggleVisible} className={row.is_visible?"admin-badge-on":"admin-badge-off"}>
                    {row.is_visible?<Eye className="w-3 h-3"/>:<EyeOff className="w-3 h-3"/>}
                    {row.is_visible?"Visible":"Hidden"}
                  </button>
                </div>
                {preview && <p className="text-xs text-white/30 mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[500px]">{preview}{row.body&&row.body.length>120?"…":""}</p>}
              </div>

              {/* Sort order */}
              <div className="text-[0.65rem] text-white/20 font-bold w-6 text-center shrink-0">#{row.sort_order}</div>

              {/* Image thumb */}
              {row.image_url && <img src={row.image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" onError={e=>{e.currentTarget.style.display="none"}}/>}

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button onClick={onEdit} className="admin-ghost-btn px-3 py-1.5 text-xs">
                  <Pencil className="w-3 h-3"/> Edit
                </button>
                <button onClick={onAskDelete} className="admin-danger-btn px-2.5 py-1.5">
                  <Trash2 className="w-3 h-3"/>
                </button>
              </div>
            </div>

            {/* Delete confirm */}
            {isDeleting && (
              <div className="mt-3.5 mb-1 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400 mb-3">⚠️ Delete <strong>"{label}"</strong>? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button onClick={onConfirmDelete} className="admin-danger-btn">Yes, Delete</button>
                  <button onClick={onCancelDelete} className="admin-ghost-btn">Cancel</button>
                </div>
              </div>
            )}

            {/* Edit form */}
            {isEditing && (
              <div className="mt-5 pt-5 border-t border-white/5">
                {config
                  ? <SectionEditor row={row} config={config} onCancel={onCancelEdit} onSaved={onSaved}/>
                  : <GenericEditor row={row} onCancel={onCancelEdit} onSaved={onSaved}/>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
