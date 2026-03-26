import React from "react";
import Icon from "../components/Icon.jsx";
import KanbanCol from "../components/KanbanCol.jsx";

const Kanban = ({ tasks, onEdit, onDelete, onToggleDone }) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-[17px] font-bold m-0 mb-1 text-[var(--color-text-primary)] flex items-center gap-2">
          <Icon name="chart" size={16} color="#6366F1" />
          Board View
        </h2>
        <p className="text-[13px] text-[var(--color-text-secondary)] m-0">
          Drag-and-drop style Kanban overview
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1">
        {[
          { title: "Todo", color: "#6366F1" },
          { title: "In Progress", color: "#F97316" },
          { title: "Done", color: "#22C55E" },
        ].map((col) => (
          <KanbanCol
            key={col.title}
            title={col.title}
            color={col.color}
            tasks={tasks.filter((t) => t.status === col.title)}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleDone={onToggleDone}
          />
        ))}
      </div>
    </div>
  );
};

export default Kanban;

