import { AlertTriangle } from "lucide-react";

export default function WarningBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "0.75rem", padding: "1rem 1.25rem", color: "#f87171" }}>
      <AlertTriangle style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0, marginTop: "0.05rem", color: "#f87171" }} />
      <div style={{ flex: 1, fontSize: "0.875rem" }}>
        <p style={{ fontWeight: 600, marginBottom: "0.2rem" }}>Could not reach database</p>
        <p style={{ color: "rgba(248,113,113,.75)", wordBreak: "break-word" }}>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} style={{ flexShrink: 0, padding: "0.375rem 0.875rem", borderRadius: "0.5rem", fontSize: "0.8rem", background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", cursor: "pointer" }}>
          Retry
        </button>
      )}
    </div>
  );
}
