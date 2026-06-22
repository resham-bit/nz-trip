import { useState } from "react";
import { useShared } from "./useShared";
import { useUser } from "./UserContext";

function PollBlock({ storageKey, poll, onDelete }) {
  const { user } = useUser();
  const [votes, setVotes, syncing] = useShared(`${storageKey}_${poll.id}`, {});

  const vote = (choice) => {
    if (!user) return;
    const current = votes[user];
    if (current === choice) {
      const updated = { ...votes };
      delete updated[user];
      setVotes(updated);
    } else {
      setVotes({ ...votes, [user]: choice });
    }
  };

  const countFor = (choice) => Object.values(votes || {}).filter(v => v === choice).length;
  const whoVoted = (choice) => Object.entries(votes || {}).filter(([, v]) => v === choice).map(([u]) => u).join(", ");

  const btnStyle = (choice, color) => ({
    fontSize: 12, padding: "5px 12px", borderRadius: 7, border: `1.5px solid ${(votes || {})[user] === choice ? color : "#e0dfd7"}`,
    background: (votes || {})[user] === choice ? color : "#fff", color: (votes || {})[user] === choice ? "#fff" : "#5f5e5a",
    cursor: user ? "pointer" : "default", fontFamily: "inherit", fontWeight: 500, transition: "all 0.15s"
  });

  return (
    <div style={{ background: "#fff", border: "1px solid #e0dfd7", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", flex: 1 }}>{poll.question}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {syncing && <span style={{ fontSize: 10, color: "#b4b2a9" }}>syncing…</span>}
          {onDelete && <button onClick={onDelete} style={{ fontSize: 14, color: "#c4c2ba", background: "none", border: "none", cursor: "pointer" }}>×</button>}
        </div>
      </div>

      {poll.type === "yesno" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Yes", "No"].map(choice => (
            <div key={choice}>
              <button style={btnStyle(choice, choice === "Yes" ? "#0f6e56" : "#993c1d")} onClick={() => vote(choice)}>{choice} {countFor(choice) > 0 && `· ${countFor(choice)}`}</button>
              {countFor(choice) > 0 && <div style={{ fontSize: 10, color: "#b4b2a9", marginTop: 2, textAlign: "center" }}>{whoVoted(choice)}</div>}
            </div>
          ))}
        </div>
      )}

      {poll.type === "reaction" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["👍", "👎", "❤️", "🤔", "🎉"].map(emoji => (
            <div key={emoji} style={{ textAlign: "center" }}>
              <button style={{ ...btnStyle(emoji, "#7a3fa8"), fontSize: 16, padding: "4px 10px" }} onClick={() => vote(emoji)}>{emoji} {countFor(emoji) > 0 && countFor(emoji)}</button>
              {countFor(emoji) > 0 && <div style={{ fontSize: 10, color: "#b4b2a9", marginTop: 2 }}>{whoVoted(emoji)}</div>}
            </div>
          ))}
        </div>
      )}

      {poll.type === "ab" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(poll.options || ["Option A", "Option B"]).map((opt, i) => (
            <div key={i}>
              <button style={btnStyle(opt, "#185fa5")} onClick={() => vote(opt)}>{opt} {countFor(opt) > 0 && `· ${countFor(opt)}`}</button>
              {countFor(opt) > 0 && <div style={{ fontSize: 10, color: "#b4b2a9", marginTop: 2, textAlign: "center" }}>{whoVoted(opt)}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Polls({ storageKey }) {
  const { user } = useUser();
  const [polls, setPolls, syncing] = useShared(`${storageKey}_polls`, []);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [newType, setNewType] = useState("yesno");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");

  const addPoll = () => {
    if (!newQ.trim()) return;
    const poll = {
      id: Date.now(),
      question: newQ.trim(),
      type: newType,
      options: newType === "ab" ? [optA || "Option A", optB || "Option B"] : [],
      createdBy: user
    };
    setPolls([...(polls || []), poll]);
    setNewQ(""); setOptA(""); setOptB(""); setAdding(false);
  };

  const deletePoll = (id) => setPolls((polls || []).filter(p => p.id !== id));

  const count = (polls || []).length;

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: count > 0 ? "#185fa5" : "#b4b2a9", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <span style={{ fontSize: 15 }}>📊</span>
        <span>Polls{count > 0 ? ` (${count})` : ""}</span>
        {syncing && <span style={{ fontSize: 10, color: "#b4b2a9" }}>syncing…</span>}
      </button>

      {open && (
        <div style={{ marginTop: 8 }}>
          {(polls || []).map(p => (
            <PollBlock key={p.id} storageKey={storageKey} poll={p} onDelete={() => deletePoll(p.id)} />
          ))}

          {adding ? (
            <div style={{ background: "#f5e6fb", borderRadius: 10, padding: "10px 12px", border: "1px dashed #c89de0" }}>
              <input
                style={{ width: "100%", fontSize: 13, padding: "6px 8px", border: "1px solid #e0dfd7", borderRadius: 7, fontFamily: "inherit", outline: "none", marginBottom: 8, boxSizing: "border-box" }}
                placeholder="Question…"
                value={newQ}
                onChange={e => setNewQ(e.target.value)}
              />
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {[["yesno", "Yes / No"], ["reaction", "Reactions"], ["ab", "A vs B"]].map(([val, label]) => (
                  <button key={val} onClick={() => setNewType(val)}
                    style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: "1px solid", borderColor: newType === val ? "#7a3fa8" : "#e0dfd7", background: newType === val ? "#7a3fa8" : "#fff", color: newType === val ? "#fff" : "#5f5e5a", cursor: "pointer", fontFamily: "inherit" }}>
                    {label}
                  </button>
                ))}
              </div>
              {newType === "ab" && (
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <input style={{ flex: 1, fontSize: 12, padding: "5px 7px", border: "1px solid #e0dfd7", borderRadius: 7, fontFamily: "inherit", outline: "none" }} placeholder="Option A" value={optA} onChange={e => setOptA(e.target.value)} />
                  <input style={{ flex: 1, fontSize: 12, padding: "5px 7px", border: "1px solid #e0dfd7", borderRadius: 7, fontFamily: "inherit", outline: "none" }} placeholder="Option B" value={optB} onChange={e => setOptB(e.target.value)} />
                </div>
              )}
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={addPoll} style={{ fontSize: 12, padding: "5px 12px", background: "#7a3fa8", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>Add poll</button>
                <button onClick={() => setAdding(false)} style={{ fontSize: 12, padding: "5px 12px", background: "none", border: "1px solid #e0dfd7", borderRadius: 7, cursor: "pointer", color: "#5f5e5a" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} style={{ fontSize: 11, color: "#7a3fa8", background: "none", border: "1px dashed #c89de0", borderRadius: 6, padding: "4px 10px", cursor: "pointer", marginTop: 4 }}>+ Add poll</button>
          )}
        </div>
      )}
    </div>
  );
}
