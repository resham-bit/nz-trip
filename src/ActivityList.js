import { useState } from "react";
import { useShared } from "./useShared";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, item, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(item.text);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 5 }}>
      {/* Drag handle */}
      <div {...attributes} {...listeners} style={{ cursor: "grab", color: "#c4c2ba", fontSize: 14, padding: "6px 2px", flexShrink: 0, touchAction: "none" }}>⠿</div>

      {editing ? (
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          <input
            autoFocus
            style={{ flex: 1, fontSize: 13, padding: "5px 7px", border: "1px solid #c89de0", borderRadius: 7, fontFamily: "inherit", outline: "none" }}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { onEdit(val); setEditing(false); } if (e.key === "Escape") setEditing(false); }}
          />
          <button onClick={() => { onEdit(val); setEditing(false); }} style={{ fontSize: 12, padding: "5px 8px", background: "#0f6e56", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>✓</button>
        </div>
      ) : (
        <div
          onClick={() => { setEditing(true); setVal(item.text); }}
          style={{ flex: 1, fontSize: 13, color: item.text ? "#5f5e5a" : "#c4c2ba", lineHeight: 1.5, padding: "5px 8px", background: item.text ? "#fff" : "#fafafa", border: "1px solid #e0dfd7", borderRadius: 8, cursor: "text", minHeight: 32 }}
        >
          {item.icon && <span style={{ marginRight: 6 }}>{item.icon}</span>}
          {item.text || "Tap to add…"}
        </div>
      )}
      <button onClick={onDelete} style={{ fontSize: 14, color: "#c4c2ba", background: "none", border: "none", cursor: "pointer", padding: "5px 2px", flexShrink: 0 }}>×</button>
    </div>
  );
}

export function ActivityList({ storageKey, initialItems = [], heading, headingColor = "#0f6e56", headingLabel = "★ Main" }) {
  const defaultItems = initialItems.map((item, i) => ({
    id: `init_${i}`,
    icon: item.icon || "",
    text: item.text || item,
    editable: false
  }));

  const [items, setItems, syncing] = useShared(storageKey, defaultItems);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const safeItems = items || defaultItems;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = safeItems.findIndex(i => i.id === active.id);
      const newIndex = safeItems.findIndex(i => i.id === over.id);
      setItems(arrayMove(safeItems, oldIndex, newIndex));
    }
  };

  const addItem = () => {
    setItems([...safeItems, { id: `custom_${Date.now()}`, icon: "", text: "", editable: true }]);
  };

  const editItem = (id, text) => {
    setItems(safeItems.map(item => item.id === id ? { ...item, text } : item));
  };

  const deleteItem = (id) => {
    setItems(safeItems.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "10px 14px", borderBottom: "1px solid #f5f4f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: headingColor }}>{headingLabel}</div>
        {syncing && <span style={{ fontSize: 10, color: "#b4b2a9" }}>syncing…</span>}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={safeItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
          {safeItems.map(item => (
            <SortableItem key={item.id} id={item.id} item={item} onEdit={(text) => editItem(item.id, text)} onDelete={() => deleteItem(item.id)} />
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={addItem} style={{ fontSize: 11, color: headingColor, background: "none", border: `1px dashed ${headingColor}40`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", marginTop: 4, opacity: 0.7 }}>+ Add item</button>
    </div>
  );
}
