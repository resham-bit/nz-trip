import { useShared } from "./useShared";
import { useUser } from "./UserContext";
import { Comments } from "./Comments";

const CATEGORIES = ["🏨 Accommodation", "🚗 Transport", "🥾 Activities", "🍽️ Food & drink", "🛒 Other"];

const DEFAULT_ITEMS = [
  { id: 1, category: "🚗 Transport", name: "Rental car", estimatedNZD: 800, actualNZD: "", notes: "", paidBy: "" },
  { id: 2, category: "🚗 Transport", name: "Campervan (Fiordland 3 nights)", estimatedNZD: 600, actualNZD: "", notes: "", paidBy: "" },
  { id: 3, category: "🏨 Accommodation", name: "QT hotel (2 nights)", estimatedNZD: 400, actualNZD: "", notes: "", paidBy: "" },
  { id: 4, category: "🏨 Accommodation", name: "Mt Cook accommodation (2 nights)", estimatedNZD: 500, actualNZD: "", notes: "", paidBy: "" },
  { id: 5, category: "🏨 Accommodation", name: "Tekapo Airbnb (2 nights)", estimatedNZD: 300, actualNZD: "", notes: "", paidBy: "" },
  { id: 6, category: "🏨 Accommodation", name: "Wanaka hotel (2 nights)", estimatedNZD: 350, actualNZD: "", notes: "", paidBy: "" },
  { id: 7, category: "🏨 Accommodation", name: "Milford Sound Lodge campervan site", estimatedNZD: 80, actualNZD: "", notes: "", paidBy: "" },
  { id: 8, category: "🏨 Accommodation", name: "Te Anau hotel (1 night)", estimatedNZD: 180, actualNZD: "", notes: "", paidBy: "" },
  { id: 9, category: "🏨 Accommodation", name: "QT return (3 nights)", estimatedNZD: 500, actualNZD: "", notes: "", paidBy: "" },
  { id: 10, category: "🥾 Activities", name: "Skydive Mt Cook", estimatedNZD: 500, actualNZD: "", notes: "", paidBy: "" },
  { id: 11, category: "🥾 Activities", name: "Dark Sky Project stargazing", estimatedNZD: 160, actualNZD: "", notes: "", paidBy: "" },
  { id: 12, category: "🥾 Activities", name: "Te Anau Glowworm Caves", estimatedNZD: 80, actualNZD: "", notes: "", paidBy: "" },
  { id: 13, category: "🥾 Activities", name: "Milford Sound cruise", estimatedNZD: 160, actualNZD: "", notes: "", paidBy: "" },
  { id: 14, category: "🍽️ Food & drink", name: "Food & drink (14 days est.)", estimatedNZD: 1400, actualNZD: "", notes: "$100/day", paidBy: "" },
];

const inputStyle = { fontSize: 12, padding: "4px 6px", border: "1px solid #e0dfd7", borderRadius: 6, fontFamily: "inherit", outline: "none", background: "#fff", width: "100%" };

export function BudgetPage() {
  const { user } = useUser();
  const [items, setItems] = useShared("budget_items", DEFAULT_ITEMS);
  const [newName, setNewName] = useState_("");
  const [newCat, setNewCat] = useState_("🏨 Accommodation");
  const [newEst, setNewEst] = useState_("");

  function useState_(def) {
    const [v, sv] = require("react").useState(def);
    return [v, sv];
  }

  const safeItems = items || DEFAULT_ITEMS;

  const updateItem = (id, field, value) => {
    setItems(safeItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    if (!newName) return;
    setItems([...safeItems, { id: Date.now(), category: newCat, name: newName, estimatedNZD: parseFloat(newEst) || 0, actualNZD: "", notes: "", paidBy: "" }]);
    setNewName(""); setNewEst("");
  };

  const deleteItem = (id) => setItems(safeItems.filter(i => i.id !== id));

  const totalEst = safeItems.reduce((s, i) => s + (parseFloat(i.estimatedNZD) || 0), 0);
  const totalAct = safeItems.reduce((s, i) => s + (parseFloat(i.actualNZD) || 0), 0);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f5f4f0", minHeight: "100vh", padding: "20px 16px 60px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18" }}>💰 Trip Budget</h1>
      </div>
      <div style={{ fontSize: 13, color: "#888780", marginBottom: 16 }}>NZ South Island · Aug 29 – Sep 12 · All amounts in NZD</div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Estimated total", value: `$${totalEst.toLocaleString()}`, color: "#185fa5", bg: "#e6f1fb" },
          { label: "Actual so far", value: `$${totalAct.toLocaleString()}`, color: "#0f6e56", bg: "#e1f5ee" },
          { label: "Remaining estimate", value: `$${(totalEst - totalAct).toLocaleString()}`, color: "#854f0b", bg: "#faeeda" },
          { label: "Per person (est.)", value: `$${Math.round(totalEst / 2).toLocaleString()}`, color: "#7a3fa8", bg: "#f5e6fb" },
        ].map(s => (
          <div key={s.label} style={{ flex: "1 1 140px", background: s.bg, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table by category */}
      {CATEGORIES.map(cat => {
        const catItems = safeItems.filter(i => i.category === cat);
        if (catItems.length === 0) return null;
        const catEst = catItems.reduce((s, i) => s + (parseFloat(i.estimatedNZD) || 0), 0);
        return (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5f5e5a", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
              <span>{cat}</span>
              <span style={{ color: "#b4b2a9" }}>Est. ${catEst.toLocaleString()}</span>
            </div>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e0dfd7", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 24px", gap: 6, padding: "6px 10px", background: "#f5f4f0", fontSize: 10, fontWeight: 600, color: "#b4b2a9", textTransform: "uppercase" }}>
                <span>Item</span><span>Est. NZD</span><span>Actual NZD</span><span>Paid by</span><span></span>
              </div>
              {catItems.map(item => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 24px", gap: 6, padding: "6px 10px", borderTop: "1px solid #f0efe8", alignItems: "center" }}>
                  <div>
                    <input style={inputStyle} value={item.name} onChange={e => updateItem(item.id, "name", e.target.value)} />
                    {item.notes && <div style={{ fontSize: 11, color: "#b4b2a9", marginTop: 2 }}>{item.notes}</div>}
                  </div>
                  <input style={inputStyle} type="number" value={item.estimatedNZD} onChange={e => updateItem(item.id, "estimatedNZD", e.target.value)} />
                  <input style={{ ...inputStyle, borderColor: item.actualNZD ? "#0f6e56" : "#e0dfd7" }} type="number" placeholder="—" value={item.actualNZD} onChange={e => updateItem(item.id, "actualNZD", e.target.value)} />
                  <select style={{ ...inputStyle, color: item.paidBy ? "#1a1a18" : "#c4c2ba" }} value={item.paidBy} onChange={e => updateItem(item.id, "paidBy", e.target.value)}>
                    <option value="">—</option>
                    <option value="RG">RG</option>
                    <option value="SB">SB</option>
                    <option value="Split">Split</option>
                  </select>
                  <button onClick={() => deleteItem(item.id)} style={{ fontSize: 14, color: "#c4c2ba", background: "none", border: "none", cursor: "pointer" }}>×</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add item */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px dashed #c89de0", padding: "10px 12px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7a3fa8", marginBottom: 8 }}>+ Add budget item</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <select style={{ ...inputStyle, width: "auto", flex: "0 0 180px" }} value={newCat} onChange={e => setNewCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <input style={{ ...inputStyle, flex: 1, minWidth: 120 }} placeholder="Item name" value={newName} onChange={e => setNewName(e.target.value)} />
          <input style={{ ...inputStyle, width: 90, flex: "0 0 90px" }} type="number" placeholder="Est. NZD" value={newEst} onChange={e => setNewEst(e.target.value)} />
          <button onClick={addItem} style={{ fontSize: 12, padding: "5px 12px", background: "#7a3fa8", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>Add</button>
        </div>
      </div>

      {/* Comments */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e0dfd7", padding: "12px 14px" }}>
        <Comments storageKey="budget_comments" label="Budget comments" />
      </div>
    </div>
  );
}
