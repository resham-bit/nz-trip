import { useState, useEffect } from "react";
import { UserProvider, useUser } from "./UserContext";
import { DAYS, TAG_COLORS } from "./days";
import { ActivityList } from "./ActivityList";
import { Comments } from "./Comments";
import { Polls } from "./Poll";
import { Bookings } from "./Bookings";
import { BudgetPage } from "./Budget";
import avatarImage from "./avatarImage";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  navy:        "#0B1426",
  navyMid:     "#162040",
  navyLight:   "#1E2D54",
  glacier:     "#5B9BD5",
  glacierLight:"#C8DEF5",
  glacierPale: "#EBF4FF",
  snow:        "#F8FBFF",
  offWhite:    "#F2F6FA",
  sand:        "#E8D5B0",
  sandLight:   "#FBF6EE",
  pine:        "#2D6A4F",
  pineMid:     "#52A07B",
  pineLight:   "#D4EDE0",
  slate:       "#334155",
  slateLight:  "#64748B",
  slatePale:   "#94A3B8",
  border:      "#D8E6F0",
  borderDark:  "#B8CDD8",
  gold:        "#D4922A",
  goldLight:   "#FEF3DC",
  alert:       "#B91C1C",
  alertLight:  "#FEE2E2",
  purple:      "#5B4FCF",
  purpleLight: "#EEF0FD",
  white:       "#FFFFFF",
};

// Region colours for day card left border
const REGION_COLOR = {
  "Queenstown": C.glacier,
  "QT → Aoraki/Mt Cook": C.navyMid,
  "Aoraki/Mt Cook": C.navyMid,
  "Mt Cook → Lake Tekapo": C.pineMid,
  "Lake Tekapo": C.pineMid,
  "Tekapo → Wanaka": C.pine,
  "Wanaka": C.pine,
  "Wanaka → Te Anau": C.gold,
  "Te Anau → Milford Sound": C.gold,
  "Milford Sound → Te Anau": C.gold,
  "Te Anau → Queenstown": C.glacier,
  "Queenstown → Home": C.glacier,
};

const TAG_STYLES = {
  "Relaxed":    { background: C.pineLight,   color: C.pine },
  "Activity":   { background: C.goldLight,   color: C.gold },
  "Drive day":  { background: C.glacierPale, color: C.glacier },
  "Big hike":   { background: C.pineLight,   color: C.pine },
  "Stargazing": { background: C.navyLight,   color: "#93C5FD" },
  "Spare day":  { background: C.purpleLight, color: C.purple },
};

const USER_STYLES = {
  RG: { bg: C.purpleLight, color: C.purple, border: C.purple },
  SB: { bg: C.glacierPale, color: C.glacier, border: C.glacier },
};

// ─── SVG Mountain Hero ────────────────────────────────────────────────────────
function MountainHero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const aurora = `hsl(${200 + Math.sin(tick * 0.01) * 20}, 70%, ${30 + Math.sin(tick * 0.013) * 8}%)`;
  const aurora2 = `hsl(${160 + Math.cos(tick * 0.008) * 25}, 60%, ${25 + Math.cos(tick * 0.011) * 6}%)`;

  return (
    <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 24, boxShadow: "0 8px 40px rgba(11,20,38,0.35)" }}>
      <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
        <defs>
          <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={C.navy} />
            <stop offset="50%" stopColor={aurora} />
            <stop offset="100%" stopColor={aurora2} />
          </linearGradient>
          <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B8D4E8" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="midMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A3F6A" />
            <stop offset="100%" stopColor="#162040" />
          </linearGradient>
          <linearGradient id="fgMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A2E4A" />
            <stop offset="100%" stopColor="#0B1426" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="680" height="320" fill="url(#sky)" />

        {/* Stars */}
        {[[60,30],[120,18],[180,45],[250,22],[310,38],[380,15],[440,28],[510,42],[580,20],[630,35],[90,55],[200,12],[350,50],[470,25],[560,48],[140,8],[420,55]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={Math.sin(i * 1.7 + tick * 0.02) * 0.5 + 1} fill="white" opacity={0.5 + Math.sin(i + tick * 0.03) * 0.3} />
        ))}

        {/* Aurora bands */}
        <ellipse cx="200" cy="80" rx="220" ry="35" fill={aurora} opacity="0.12" style={{ filter: "blur(20px)" }} />
        <ellipse cx="480" cy="65" rx="180" ry="28" fill={aurora2} opacity="0.10" style={{ filter: "blur(18px)" }} />

        {/* Far mountains (snow-capped) */}
        <polygon points="0,220 80,120 160,200 240,100 320,180 400,90 480,160 560,95 640,150 680,130 680,260 0,260" fill="url(#midMtn)" />
        {/* Snow caps */}
        <polygon points="80,120 65,155 95,155" fill="url(#snowGrad)" opacity="0.9" />
        <polygon points="240,100 218,148 262,148" fill="url(#snowGrad)" opacity="0.9" />
        <polygon points="400,90 375,145 425,145" fill="url(#snowGrad)" opacity="0.95" />
        <polygon points="560,95 540,140 580,140" fill="url(#snowGrad)" opacity="0.85" />

        {/* Foreground mountains */}
        <polygon points="0,280 60,195 140,250 220,170 300,230 380,155 460,215 540,175 620,220 680,190 680,320 0,320" fill="url(#fgMtn)" />
        {/* Foreground snow */}
        <polygon points="220,170 202,210 238,210" fill="url(#snowGrad)" opacity="0.8" />
        <polygon points="380,155 360,200 400,200" fill="url(#snowGrad)" opacity="0.85" />

        {/* Lake reflection */}
        <rect x="0" y="280" width="680" height="40" fill={C.navy} opacity="0.6" />
        <rect x="0" y="280" width="680" height="2" fill={C.glacier} opacity="0.2" />

        {/* Moon */}
        <circle cx="580" cy="42" r="18" fill="#FFF9F0" opacity="0.92" filter="url(#glow)" />
        <circle cx="587" cy="38" r="14" fill={aurora} opacity="0.85" />

        {/* Overlay gradient for text readability */}
        <defs>
          <linearGradient id="textOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="rgba(11,20,38,0.4)" />
            <stop offset="100%" stopColor="rgba(11,20,38,0.85)" />
          </linearGradient>
        </defs>
        <rect width="680" height="320" fill="url(#textOverlay)" />
      </svg>

      {/* Text overlay */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px 22px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.pineMid, marginBottom: 5 }}>Aug 29 – Sep 12, 2025</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>South Island, NZ 🇳🇿</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["QT", "Mt Cook", "Tekapo", "Wanaka", "Fiordland"].map((s, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{s}</span>
                {i < arr.length - 1 && <span style={{ color: C.glacier, fontSize: 10, opacity: 0.8 }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Circular photo */}
        <div style={{ flexShrink: 0, position: "relative" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid rgba(255,255,255,0.9)`, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
            <img src={avatarImage} alt="Resham & Shashank" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: -6, right: -4, background: C.white, borderRadius: 99, padding: "1px 6px", fontSize: 9, fontWeight: 700, color: C.navy, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>R + S ✨</div>
        </div>
      </div>
    </div>
  );
}

// ─── User picker ──────────────────────────────────────────────────────────────
function UserPicker() {
  const { user, selectUser } = useUser();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "10px 14px", background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 12, color: C.slatePale, fontWeight: 500, marginRight: 2 }}>You are:</span>
      {["RG", "SB"].map(u => {
        const s = USER_STYLES[u];
        return (
          <button key={u} onClick={() => selectUser(u)} style={{
            fontSize: 12, fontWeight: 700, padding: "5px 18px", borderRadius: 99,
            background: user === u ? s.bg : C.offWhite,
            color: user === u ? s.color : C.slatePale,
            border: `1.5px solid ${user === u ? s.border : "transparent"}`,
            cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", transition: "all 0.15s"
          }}>{u}</button>
        );
      })}
      {!user && <span style={{ fontSize: 11, color: C.alert, marginLeft: 4 }}>← pick one to comment & vote</span>}
    </div>
  );
}

// ─── Link group ───────────────────────────────────────────────────────────────
function LinkGroup({ dayIdx, groupName }) {
  const { useShared } = require("./useShared");
  const [links, setLinks, syncing] = useShared(`d${dayIdx}_${groupName.replace(/\s+/g, "_")}`, []);
  const add = () => setLinks([...(links || []), { label: "", url: "" }]);
  const remove = i => setLinks((links || []).filter((_, idx) => idx !== i));
  const update = (i, f, v) => setLinks((links || []).map((l, idx) => idx === i ? { ...l, [f]: v } : l));
  const inp = { fontSize: 12, padding: "5px 7px", border: `1px solid ${C.border}`, borderRadius: 7, fontFamily: "inherit", outline: "none", background: C.white };
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.slate, marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
        <span>{groupName}</span>
        {syncing && <span style={{ fontSize: 10, color: C.slatePale }}>syncing…</span>}
      </div>
      {(links || []).map((l, i) => (
        <div key={i} style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}>
          <input style={{ ...inp, width: 90, flexShrink: 0 }} placeholder="Name" value={l.label} onChange={e => update(i, "label", e.target.value)} />
          <input style={{ ...inp, flex: 1, minWidth: 0 }} placeholder="Paste URL" value={l.url} onChange={e => update(i, "url", e.target.value)} />
          {l.url ? <a href={l.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: C.glacier, textDecoration: "none" }}>↗</a> : <span style={{ width: 18 }} />}
          <button onClick={() => remove(i)} style={{ fontSize: 16, color: C.border, background: "none", border: "none", cursor: "pointer" }}>×</button>
        </div>
      ))}
      <button onClick={add} style={{ fontSize: 11, color: C.purple, background: "none", border: `1px dashed ${C.purple}60`, borderRadius: 6, padding: "4px 8px", cursor: "pointer", marginTop: 2 }}>+ Add link</button>
    </div>
  );
}

// ─── Day card ─────────────────────────────────────────────────────────────────
function DayCard({ day, idx }) {
  const [open, setOpen] = useState(false);
  const hasLinks = day.linkGroups && day.linkGroups.length > 0;
  const regionColor = REGION_COLOR[day.loc] || C.glacier;

  return (
    <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 7, overflow: "hidden", boxShadow: "0 1px 6px rgba(11,20,38,0.06)", display: "flex" }}>
      {/* Left colour bar */}
      <div style={{ width: 4, flexShrink: 0, background: regionColor, borderRadius: "14px 0 0 14px" }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          onClick={() => setOpen(o => !o)}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px 11px 12px", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.background = C.offWhite}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div style={{ flexShrink: 0, width: 56 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.slatePale, textTransform: "uppercase", letterSpacing: "0.1em" }}>Day {idx + 1}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.slateLight }}>{day.date}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 2 }}>{day.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.slatePale }}>{day.loc}</span>
              {day.drive && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 99, background: C.glacierPale, color: C.glacier, fontWeight: 600 }}>🚗 {day.drive}</span>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {day.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 99, fontWeight: 600, ...(TAG_STYLES[t] || {}) }}>{t}</span>)}
            </div>
          </div>
          <span style={{ fontSize: 11, color: C.slatePale, transition: "transform .2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}>▼</span>
        </div>

        {open && (
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {day.admin && <ActivityList storageKey={`day${idx}_admin`} initialItems={day.admin.map(a => ({ icon: "⚙️", text: a }))} headingLabel="⚙ Admin" headingColor={C.glacier} />}
            {day.main && <ActivityList storageKey={`day${idx}_main`} initialItems={day.main} headingLabel="★ Main" headingColor={C.pine} />}
            {day.optional && <ActivityList storageKey={`day${idx}_optional`} initialItems={day.optional} headingLabel="◎ Optional" headingColor={C.gold} />}

            {hasLinks && (
              <div style={{ padding: "10px 14px", background: "#F7F5FF", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: C.purple, marginBottom: 10 }}>📌 Options to discuss</div>
                {day.linkGroups.map(gn => <LinkGroup key={gn} dayIdx={idx} groupName={gn} />)}
              </div>
            )}

            <div style={{ padding: "10px 14px", background: C.offWhite, borderTop: `1px solid ${C.border}`, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Comments storageKey={`day${idx}_comments`} label="Comments" />
              <Polls storageKey={`day${idx}`} />
            </div>

            {day.sleep && <div style={{ padding: "8px 14px", background: C.glacierPale, fontSize: 12, color: C.slate, borderTop: `1px solid ${C.border}` }}><strong>Sleep:</strong> {day.sleep}</div>}
            {day.weather && <div style={{ padding: "5px 14px 8px", background: C.glacierPale, fontSize: 11, color: C.slateLight, fontStyle: "italic" }}>🌡 {day.weather}</div>}
            {day.alert && <div style={{ margin: "8px 14px", fontSize: 12, padding: "8px 11px", borderRadius: 8, background: C.alertLight, color: C.alert, fontWeight: 500 }}>⚡ {day.alert}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Region divider ───────────────────────────────────────────────────────────
function RegionDivider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 10px" }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color, flex: 1 }}>{label}</div>
      <div style={{ flex: 3, height: 1, background: `${color}40` }} />
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SL({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: C.slatePale, textTransform: "uppercase", letterSpacing: "0.1em", margin: "24px 0 10px" }}>{children}</div>;
}

// ─── Itinerary page ───────────────────────────────────────────────────────────
const REGIONS = [
  { label: "Queenstown", color: C.glacier, days: [0, 1] },
  { label: "Aoraki / Mt Cook", color: C.navyLight, days: [2, 3] },
  { label: "Lake Tekapo", color: C.pineMid, days: [4, 5] },
  { label: "Wanaka", color: C.pine, days: [6, 7] },
  { label: "Fiordland", color: C.gold, days: [8, 9, 10] },
  { label: "Back to Queenstown", color: C.glacier, days: [11, 12, 13, 14] },
];

function ItineraryPage() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: C.offWhite, minHeight: "100vh", padding: "20px 16px 60px", maxWidth: 680, margin: "0 auto" }}>
      <MountainHero />

      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 99, fontWeight: 600, background: C.glacierPale, color: C.glacier }}>🚗 Rental car — Days 1–9 & 12–14</span>
        <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 99, fontWeight: 600, background: C.goldLight, color: C.gold }}>🚐 Campervan — Days 9–11</span>
      </div>

      <div style={{ fontSize: 12, color: C.pine, background: C.pineLight, border: `1px solid ${C.pineMid}50`, borderRadius: 10, padding: "9px 13px", marginBottom: 16, fontWeight: 500 }}>
        🔄 <strong>Shared + synced</strong> — everything updates in real time for both of you.
      </div>

      <UserPicker />

      {REGIONS.map(r => (
        <div key={r.label}>
          <RegionDivider label={r.label} color={r.color} />
          {r.days.filter(i => i < DAYS.length).map(i => <DayCard key={i} day={DAYS[i]} idx={i} />)}
        </div>
      ))}

      <SL>💬 General comments</SL>
      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: "12px 14px", marginBottom: 4 }}>
        <Comments storageKey="global_comments" label="Add a comment" />
      </div>

      <Bookings />

      <SL>🗓 2 spare nights — TBD</SL>
      <div style={{ background: C.purpleLight, border: `1px dashed ${C.purple}50`, borderRadius: 14, padding: 16, marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.purple, marginBottom: 8 }}>Days 13–14 · TBD</div>
        <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.85 }}>
          🏹 <strong>Glenorchy</strong> — 45 min from QT, Lord of the Rings scenery, Dart River jet boat<br />
          🪙 <strong>Arrowtown</strong> — best gold rush town in NZ, Arrow River walk<br />
          🍷 <strong>Bannockburn wine</strong> — Central Otago pinot noir, self-drive cellar doors<br />
          🧘 <strong>Slow QT days</strong> — Onsen Hot Pools, Ben Lomond hike, lakefront
        </div>
        <div style={{ marginTop: 12 }}><Polls storageKey="spare_days" /></div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("itinerary");
  return (
    <UserProvider>
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: C.navy, padding: "0 20px", display: "flex", alignItems: "center", gap: 0, boxShadow: "0 2px 12px rgba(11,20,38,0.3)" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.white, marginRight: 16, letterSpacing: "-0.02em", padding: "14px 0" }}>🏔 NZ '25</div>
        {[["itinerary", "🗺 Itinerary"], ["budget", "💰 Budget"]].map(([key, label]) => (
          <button key={key} onClick={() => setPage(key)} style={{
            fontSize: 13, fontWeight: page === key ? 700 : 400, padding: "14px 14px",
            background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            color: page === key ? C.white : C.slatePale,
            borderBottom: `2px solid ${page === key ? C.glacier : "transparent"}`,
            transition: "all 0.15s"
          }}>{label}</button>
        ))}
      </div>
      {page === "itinerary" ? <ItineraryPage /> : <BudgetPage />}
    </UserProvider>
  );
}
