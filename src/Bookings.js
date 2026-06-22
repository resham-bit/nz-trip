import { useShared } from "./useShared";
import { Comments } from "./Comments";

const STATUS_OPTIONS = ["TBD", "Need to book", "Booked ✓", "Confirmed ✓✓"];
const STATUS_COLORS = {
  "TBD": { bg: "#f5f4f0", color: "#888780" },
  "Need to book": { bg: "#faece7", color: "#993c1d" },
  "Booked ✓": { bg: "#faeeda", color: "#854f0b" },
  "Confirmed ✓✓": { bg: "#e1f5ee", color: "#0f6e56" },
};

const DEFAULT_BOOKINGS = [
  { id: 1, name: "Rental car", day: "Day 1", link: "", status: "TBD", notes: "Pick up QT Airport Aug 29. One-way drop Te Anau (Day 9), re-pick same day." },
  { id: 2, name: "Campervan (Fiordland)", day: "Day 9", link: "", status: "TBD", notes: "Apollo or Wilderness. Pick up + drop off Te Anau. 3 nights." },
  { id: 3, name: "Milford Sound Lodge campervan site", day: "Day 10", link: "https://milfordlodge.com", status: "TBD", notes: "Only 20 sites — book immediately." },
  { id: 4, name: "The Hermitage or Glentanner Park", day: "Day 3", link: "", status: "TBD", notes: "Very limited beds at Mt Cook — book immediately." },
  { id: 5, name: "Tekapo Airbnb/hotel", day: "Day 5", link: "", status: "TBD", notes: "" },
  { id: 6, name: "Wanaka hotel", day: "Day 7", link: "", status: "TBD", notes: "Town centre. Proper bed before Roy's Peak." },
  { id: 7, name: "Glendhu Bay Motor Camp", day: "Days 7–8", link: "", status: "TBD", notes: "" },
  { id: 8, name: "QT hotel (nights 1–2 + return)", day: "Days 1–2, 12–14", link: "", status: "TBD", notes: "" },
  { id: 9, name: "Te Anau hotel", day: "Day 11", link: "", status: "TBD", notes: "" },
  { id: 10, name: "Dark Sky Project stargazing", day: "Day 5", link: "https://darkskyproject.co.nz", status: "TBD", notes: "Book well ahead — fills fast." },
  { id: 11, name: "Skydive Mt Cook", day: "Day 4", link: "https://skydivemtcook.com", status: "TBD", notes: "Weather dependent — confirm day before." },
  { id: 12, name: "Te Anau Glowworm Caves", day: "Day 9", link: "https://fiordlandexpeditions.co.nz", status: "TBD", notes: "Book afternoon departure." },
  { id: 13, name: "Milford Sound cruise", day: "Day 11", link: "https://realjourneys.co.nz", status: "TBD", notes: "" },
  { id: 14, name: "Anniversary dinner", day: "Day 1", link: "", status: "TBD", notes: "Amisfield, Rata, or Botswana Butchery. Book ahead." },
];

const inputStyle = { fontSize: 12, padding: "4px 6px", border: "1px solid #e0dfd7", borderRadius: 6, fontFamily: "inherit", outline: "none", background: "#fff", width: "100%" };

export function Bookings() {
  const [bookings, setBookings] = useShared("bookings", DEFAULT_BOOKINGS);
  const safeBookings = bookings || DEFAULT_BOOKINGS;

  const update = (id, field, value) => {
    setBookings(safeBookings.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const booked = safeBookings.filter(b => b.status === "Booked ✓" || b.status === "Confirmed ✓✓").length;
  const total = safeBookings.length;

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#b4b2a9", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
        📋 Booking tracker — {booked}/{total} done
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: "#e0dfd7", borderRadius: 99, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(booked / total) * 100}%`, background: "#0f6e56", borderRadius: 99, transition: "width 0.4s" }} />
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0dfd7", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 130px 1fr", gap: 8, padding: "7px 14px", background: "#f5f4f0", fontSize: 10, fontWeight: 600, color: "#b4b2a9", textTransform: "uppercase" }}>
          <span>Booking</span><span>When</span><span>Status</span><span>Notes + link</span>
        </div>

        {safeBookings.map((b, i) => {
          const sc = STATUS_COLORS[b.status] || STATUS_COLORS["TBD"];
          return (
            <div key={b.id} style={{ display: "grid", gridTemplateColumns: "1fr 70px 130px 1fr", gap: 8, padding: "7px 14px", borderTop: i > 0 ? "1px solid #f0efe8" : "none", alignItems: "start" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a18" }}>{b.name}</div>
              <div style={{ fontSize: 11, color: "#b4b2a9" }}>{b.day}</div>
              <div>
                <select
                  value={b.status}
                  onChange={e => update(b.id, "status", e.target.value)}
                  style={{ ...inputStyle, background: sc.bg, color: sc.color, fontWeight: 500, border: "none", borderRadius: 6 }}
                >
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <input style={inputStyle} placeholder="Notes…" value={b.notes} onChange={e => update(b.id, "notes", e.target.value)} />
                <input style={inputStyle} placeholder="Link…" value={b.link} onChange={e => update(b.id, "link", e.target.value)} />
                {b.link && <a href={b.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#185fa5" }}>↗ Open link</a>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10 }}>
        <Comments storageKey="bookings_comments" label="Booking comments" />
      </div>
    </div>
  );
}
