import React from "react";
import Icon from "./Icon.jsx";
import StatusBadge from "./StatusBadge.jsx";
import PriorityBadge from "./PriorityBadge.jsx";

const ActionBtn = ({ icon, label, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 10px",
      borderRadius: 7,
      border: `1.5px solid ${color}20`,
      background: `${color}10`,
      color,
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 600,
      transition: "all 0.15s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `${color}20`;
      e.currentTarget.style.transform = "translateY(-1px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = `${color}10`;
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <Icon name={icon} size={13} color={color} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const TaskCard = ({ task, onEdit, onDelete, onToggleDone }) => {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
  const isDone = task.status === "Done";

  const leftBorderColor = isDone
    ? "#22C55E"
    : isOverdue
      ? "#EF4444"
      : task.priority === "High"
        ? "#EF4444"
        : task.priority === "Medium"
          ? "#F97316"
          : "#6366F1";

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: `1px solid ${
          isDone
            ? "#22C55E30"
            : isOverdue
              ? "#EF444430"
              : "var(--color-border-tertiary)"
        }`,
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: isDone ? 0.75 : 1,
        transition: "all 0.2s ease",
        borderLeft: `3px solid ${leftBorderColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div
            className="text-[14px] font-semibold text-[var(--color-text-primary)]"
            style={{
              textDecoration: isDone ? "line-through" : "none",
              marginBottom: 4,
              lineHeight: 1.4,
            }}
          >
            {task.title}
          </div>
          {task.description && (
            <div
              className="text-[12px] text-[var(--color-text-secondary)]"
              style={{
                lineHeight: 1.5,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {task.description}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />

        {task.dueDate && (
          <span
            className="flex items-center gap-1.5 text-[11px] font-medium"
            style={{
              color: isOverdue ? "#EF4444" : "var(--color-text-secondary)",
            }}
          >
            <Icon
              name="clock"
              size={11}
              color={isOverdue ? "#EF4444" : "var(--color-text-secondary)"}
            />
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            {isOverdue ? " · Overdue" : null}
          </span>
        )}
      </div>

      <div
        className="flex gap-2 border-t border-[var(--color-border-tertiary)] pt-2 mt-1"
      >
        <ActionBtn
          icon={isDone ? "undo" : "check"}
          label={isDone ? "Mark undone" : "Mark done"}
          color={isDone ? "#6366F1" : "#22C55E"}
          onClick={() => onToggleDone(task)}
        />
        <ActionBtn
          icon="edit"
          label="Edit"
          color="#F97316"
          onClick={() => onEdit(task)}
        />
        <ActionBtn
          icon="trash"
          label="Delete"
          color="#EF4444"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
};

export default TaskCard;

