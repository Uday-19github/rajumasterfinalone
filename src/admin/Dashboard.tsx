import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Image, Settings as SettingsIcon, LogOut, ExternalLink, Flame, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PagesContent from "./PagesContent";
import AssetLibrary from "./AssetLibrary";
import Settings from "./Settings";
import "./admin.css";

type View = "pages" | "media" | "settings";
const LIVE_URL = typeof window !== "undefined" ? window.location.origin : "https://rhythm-radiance-spot.lovable.app";

const NAV: { id: View; label: string; desc: string; icon: typeof FileText }[] = [
  { id: "pages",  label: "Pages & Content", desc: "Edit all website sections",      icon: FileText },
  { id: "media",  label: "Asset Library",   desc: "Website images & your uploads",  icon: Image },
  { id: "settings", label: "Settings",      desc: "Studio info & social links",     icon: SettingsIcon },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("pages");
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.from("content").select("id").limit(1);
        setConnected(!error);
      } catch { setConnected(false); }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  const viewDesc: Record<View, string> = {
    pages:    "Edit, reorder and toggle visibility of every section on your website.",
    media:    "Browse all website photos and upload new images from your device.",
    settings: "Update your studio's contact info, social links and map embed.",
  };

  return (
    <div className="admin-theme flex min-h-screen">

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="admin-sidebar">

        {/* Logo */}
        <div className="admin-logo">
          <div className="admin-logo-icon rounded-full overflow-hidden bg-transparent">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="admin-logo-title">RISEAND<span>SHINE</span></div>
            <div className="admin-logo-sub">Admin Dashboard</div>
          </div>
        </div>

        {/* Live status banner */}
        <div className="m-[0.5rem_0.75rem_0.25rem] p-[0.6rem_0.875rem] rounded-[0.625rem] bg-white/5 border border-white/5 flex items-center gap-3">
          <span className="admin-pulse-dot" style={{ background: connected === false ? "#ef4444" : connected ? "#22c55e" : "#6b7280" }} />
          <div>
            <div className="text-xs font-semibold text-white/70">
              {connected === null ? "Connecting…" : connected ? "Supabase Live" : "Offline"}
            </div>
            <div className="text-[0.65rem] text-white/30 mt-0.5">
              {connected ? "Database connected" : "Check credentials"}
            </div>
          </div>
          {connected && (
            <span className="ml-auto text-[0.6rem] font-bold uppercase tracking-widest text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">LIVE</span>
          )}
        </div>

        {/* Nav */}
        <div className="py-2 flex-1">
          <div className="admin-nav-group-label">Navigation</div>
          {NAV.map(({ id, label, desc, icon: Icon }) => (
            <button key={id} onClick={() => setView(id)} className={`admin-nav-item ${view === id ? "active" : ""}`}>
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <div>
                <div>{label}</div>
                <span className="nav-desc">{desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick links */}
        <div className="px-2 pb-2">
          <div className="admin-nav-group-label">Quick Links</div>
          <a href={LIVE_URL} target="_blank" rel="noreferrer" className="admin-nav-item">
            <ExternalLink className="w-4 h-4 shrink-0 text-orange-500" />
            <div>
              <div className="text-orange-400">View Live Website</div>
              <span className="nav-desc">Opens in new tab</span>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <div className="p-2 mb-1 rounded-[0.625rem] bg-white/5 border border-white/5">
            <div className="text-[0.65rem] uppercase tracking-widest text-white/25 mb-1">Signed in as</div>
            <div className="text-sm font-semibold text-white/60">admin</div>
          </div>
          <button onClick={logout} className="admin-nav-item text-red-400/70">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="admin-topbar">
          <div>
            <h1 className="admin-topbar-title">{NAV.find(n => n.id === view)?.label}</h1>
            <p className="text-xs text-white/35 mt-0.5">{viewDesc[view]}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={LIVE_URL} target="_blank" rel="noreferrer" className="admin-ghost-btn">
              <ExternalLink className="w-3.5 h-3.5" /> Live Preview
            </a>
            <a href={LIVE_URL} target="_blank" rel="noreferrer" className="admin-fire-btn">
              <Zap className="w-3.5 h-3.5" /> Open Website
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-[2rem_2.5rem]">
          <div className="max-w-[900px] mx-auto">
            {view === "pages"    && <PagesContent />}
            {view === "media"    && <AssetLibrary />}
            {view === "settings" && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}
