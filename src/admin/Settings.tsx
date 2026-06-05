import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const inp = { background: "hsl(0 0% 13%)", border: "1px solid rgba(255,255,255,.12)", color: "hsl(0 0% 95%)", borderRadius: "0.5rem", padding: "0.625rem 0.875rem", fontSize: "0.875rem", width: "100%", outline: "none" } as React.CSSProperties;
const card = { background: "hsl(0 0% 9%)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "0.75rem", padding: "1.75rem" } as React.CSSProperties;

const FIELDS = [
  { key: "studio_name", label: "Studio Name", placeholder: "Rajumaster's Riseandshine" },
  { key: "tagline", label: "Tagline", placeholder: "Dance & Fitness Studio in Bengaluru" },
  { key: "phone", label: "Phone", placeholder: "099081 00855" },
  { key: "email", label: "Email", placeholder: "hello@riseandshine.in" },
  { key: "address", label: "Address", placeholder: "3rd Floor, Plot no-4, St No. 2, Manikonda, Hyderabad" },
  { key: "whatsapp", label: "WhatsApp Number", placeholder: "91XXXXXXXXXX" },
  { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/..." },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { key: "youtube_url", label: "YouTube URL", placeholder: "https://youtube.com/..." },
  { key: "google_maps_embed", label: "Google Maps Embed URL", placeholder: "https://www.google.com/maps/embed?..." },
];
const KEYS = FIELDS.map(f => f.key);

export default function Settings() {
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(KEYS.map(k => [k, ""])));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    const { data, err } = await (async () => {
      const { data, error } = await supabase.from("settings").select("key,value").in("key", KEYS);
      return { data, err: error };
    })();
    if (err) { setError(err.message); }
    else {
      const next = Object.fromEntries(KEYS.map(k => [k, ""]));
      (data || []).forEach((r: { key: string; value: string | null }) => { if (r.key in next) next[r.key] = r.value ?? ""; });
      setVals(next);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    const rows = KEYS.map(k => ({ key: k, value: vals[k], updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
    if (error) toast.error(error.message);
    else toast.success("Settings saved ✓");
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", letterSpacing: "0.05em" }}>Settings</h2>

      {error && (
        <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: "0.75rem", padding: "1rem", color: "#f87171" }}>
          <p className="text-sm mb-2">{error}</p>
          <button onClick={load} className="text-xs px-3 py-1.5 rounded" style={{ background: "rgba(239,68,68,.2)", color: "#f87171", border: "none", cursor: "pointer" }}>Retry</button>
        </div>
      )}

      <div style={card}>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "0.05em", color: "rgba(255,255,255,.8)", marginBottom: "1.25rem" }}>Studio Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {FIELDS.map(f => (
            <div key={f.key}>
              <label className="admin-field-label">{f.label}</label>
              <input
                value={vals[f.key]}
                onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))}
                placeholder={loading ? "Loading…" : f.placeholder}
                disabled={loading}
                style={{ ...inp, opacity: loading ? 0.5 : 1 }}
                className="focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-colors"
              />
            </div>
          ))}
        </div>

        <button onClick={save} disabled={saving || loading}
          className="admin-save-btn mt-6 flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> : <><Save className="w-4 h-4" />Save Settings</>}
        </button>
      </div>

      <div style={card}>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "0.05em", color: "rgba(255,255,255,.8)", marginBottom: "0.5rem" }}>Quick Reference</h3>
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,.4)" }}>These settings are read by the website's contact page and footer.</p>
        <ul className="text-xs space-y-1" style={{ color: "rgba(255,255,255,.35)" }}>
          <li>• <strong style={{ color: "rgba(255,255,255,.55)" }}>Studio Name</strong> — appears in Navbar & page title</li>
          <li>• <strong style={{ color: "rgba(255,255,255,.55)" }}>Google Maps Embed URL</strong> — paste the src from Google Maps → Share → Embed a map</li>
          <li>• <strong style={{ color: "rgba(255,255,255,.55)" }}>WhatsApp Number</strong> — used for the WhatsApp chat button (include country code, no +)</li>
        </ul>
      </div>
    </div>
  );
}
