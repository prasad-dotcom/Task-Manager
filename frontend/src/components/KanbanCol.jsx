import React from "react";
import TaskCard from "./TaskCard.jsx";

const KanbanCol = ({
  title,
  tasks,
  color,
  onEdit,
  onDelete,
  onToggleDone,
}) => {
  return (
    <div className="flex-1 min-w-[260px] max-w-[360px]">
      <div
        className="flex items-center gap-2.5 mb-3 px-3 py-2 rounded-lg"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}25`,
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        <span className="text-[13px] font-bold text-[var(--color-text-primary)] flex-1">
          {title}
        </span>
        <span
          className="text-[11px] font-bold rounded-full px-2 py-0.5"
          style={{ color, background: `${color}25` }}
        >
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-h-[100px]">
        {tasks.length === 0 ? (
          <div
            className="px-3 py-5 text-center text-[12px] text-[var(--color-text-secondary)] border-2 border-dashed rounded-lg"
            style={{ borderColor: "var(--color-border-tertiary)" }}
          >
            No tasks here
          </div>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanCol;

