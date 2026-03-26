import React from "react";
import Icon from "./Icon.jsx";

const Sidebar = ({ tab, setTab }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "tasks", label: "My Tasks", icon: "tasks" },
    { id: "kanban", label: "Board View", icon: "chart" },
    { id: "analytics", label: "Analytics", icon: "sparkle" },
  ];

  return (
    <aside className="w-[200px] flex-shrink-0 border-r border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-4 flex flex-col gap-1.5">
      {items.map((item) => {
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              background: active ? "#6366F115" : "none",
              color: active ? "#6366F1" : "var(--color-text-secondary)",
              fontWeight: active ? 600 : 400,
              fontSize: 13,
              transition: "all 0.15s",
            }}
          >
            <Icon
              name={item.icon}
              size={15}
              color={active ? "#6366F1" : "var(--color-text-secondary)"}
            />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;

