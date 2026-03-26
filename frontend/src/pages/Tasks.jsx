import React, { useMemo, useState } from "react";
import Icon from "../components/Icon.jsx";
import TaskCard from "../components/TaskCard.jsx";
import KanbanCol from "../components/KanbanCol.jsx";

const Tasks = ({ tasks, onEdit, onDelete, onToggleDone }) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [view, setView] = useState("list"); // list | kanban

  const filteredTasks = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchSearch = !s || t.title.toLowerCase().includes(s);
      const matchStatus = filterStatus === "All" || t.status === filterStatus;
      const matchPriority =
        filterPriority === "All" || t.priority === filterPriority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5 flex-1 min-w-[200px] rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-background-primary)] px-3 py-[7px]">
          <Icon name="search" size={15} color="var(--color-text-secondary)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="border-none bg-transparent outline-none text-[13px] text-[var(--color-text-primary)] flex-1 font-[inherit]"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-background-primary)] px-[10px] py-[7px] text-[13px] text-[var(--color-text-primary)] cursor-pointer"
        >
          {["All", "Todo", "In Progress", "Done"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-background-primary)] px-[10px] py-[7px] text-[13px] text-[var(--color-text-primary)] cursor-pointer"
        >
          {["All", "High", "Medium", "Low"].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div className="flex gap-1 bg-[var(--color-background-secondary)] rounded-md p-1">
          {["list", "kanban"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-md border-none cursor-pointer text-[12px] font-medium flex items-center gap-2"
              style={{
                background: view === v ? "var(--color-background-primary)" : "transparent",
                color:
                  view === v ? "#6366F1" : "var(--color-text-secondary)",
              }}
            >
              <Icon
                name={v === "list" ? "list" : "grid"}
                size={13}
                color={view === v ? "#6366F1" : "var(--color-text-secondary)"}
              />
              {v === "list" ? "List" : "Board"}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[12px] text-[var(--color-text-secondary)] mb-3 font-semibold">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </div>

      {view === "list" ? (
        <div className="flex flex-col gap-2">
          {filteredTasks.length === 0 ? (
            <div
              className="px-8 py-10 text-center border-2 border-dashed rounded-xl"
              style={{ borderColor: "var(--color-border-tertiary)" }}
            >
              <div className="text-[32px] mb-2">🔍</div>
              <div className="text-[14px] text-[var(--color-text-secondary)] font-semibold">
                No tasks match your filters
              </div>
            </div>
          ) : (
            filteredTasks.map((t) => (
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
      ) : (
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
              tasks={filteredTasks.filter((t) => t.status === col.title)}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleDone={onToggleDone}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;

