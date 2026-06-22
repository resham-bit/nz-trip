import { useState } from "react";
import { useShared } from "./useShared";
import { useUser } from "./UserContext";

const COLORS = { RG: "#7a3fa8", SB: "#185fa5" };
const BG = { RG: "#f5e6fb", SB: "#e6f1fb" };

export function Comments({ storageKey, label = "Comments" }) {
  const { user } = useUser();
  const [comments, setComments, syncing] = useShared(storageKey, []);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const post = () => {
    if (!text.trim() || !user) return;
    const newComment = {
      id: Date.now(),
      user,
      text: text.trim(),
      time: new Date().toLocaleString("en-AU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    };
    setComments([...(comments || []), newComment]);
    setText("");
  };

  const remove = (id) => setComments((comments || []).filter(c => c.id !== id));

  const count = (comments || []).length;

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: count > 0 ? "#7a3fa8" : "#b4b2a9", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <span style={{ fontSize: 15 }}>💬</span>
        <span>{label}{count > 0 ? ` (${count})` : ""}</span>
        {syncing && <span style={{ fontSize: 10, color: "#b4b2a9" }}>syncing…</span>}
      </button>

      {open && (
        <div style={{ marginTop: 8, background: "#fafafa", borderRadius: 10, border: "1px solid #e0dfd7", padding: "10px 12px" }}>
          {(comments || []).length === 0 && (
            <div style={{ fontSize: 12, color: "#b4b2a9", marginBottom: 8 }}>No comments yet.</div>
          )}
          {(comments || []).map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: BG[c.user] || "#f0efe8", color: COLORS[c.user] || "#888", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {c.user}
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 8, padding: "6px 9px", border: "1px solid #e0dfd7" }}>
                <div style={{ fontSize: 11, color: "#b4b2a9", marginBottom: 2 }}>{c.time}</div>
                <div style={{ fontSize: 13, color: "#1a1a18", lineHeight: 1.5 }}>{c.text}</div>
              </div>
              {user === c.user && (
                <button onClick={() => remove(c.id)} style={{ fontSize: 14, color: "#c4c2ba", background: "none", border: "none", cursor: "pointer", padding: "0 2px", flexShrink: 0 }}>×</button>
              )}
            </div>
          ))}

          {user ? (
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: BG[user] || "#f0efe8", color: COLORS[user] || "#888", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {user}
              </div>
              <input
                style={{ flex: 1, fontSize: 12, padding: "6px 8px", border: "1px solid #e0dfd7", borderRadius: 7, fontFamily: "inherit", outline: "none" }}
                placeholder="Add a comment…"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && post()}
              />
              <button
                onClick={post}
                style={{ fontSize: 12, padding: "6px 10px", background: "#7a3fa8", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", flexShrink: 0 }}
              >Post</button>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: "#b4b2a9", marginTop: 6 }}>Select your identity at the top to comment.</div>
          )}
        </div>
      )}
    </div>
  );
}
