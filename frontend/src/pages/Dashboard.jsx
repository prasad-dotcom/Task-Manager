import React from "react";
import Icon from "../components/Icon.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

const Dashboard = ({ tasks, user }) => {
  const done = tasks.filter((t) => t.status === "Done").length;
  const inProg = tasks.filter((t) => t.status === "In Progress").length;
  const high = tasks.filter((t) => t.priority === "High" && t.status !== "Done");
  const recent = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const firstName = (user?.name || "User").split(" ")[0];

  const SummaryCard = ({ label, val, color, icon }) => (
    <div
      className="rounded-xl border border-[var(--color-border-tertiary)] px-4 py-[14px]"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]">
          {label}
        </span>
        <Icon name={icon} size={14} color={color} />
      </div>
      <div className="text-[26px] font-extrabold" style={{ color }}>
        {val}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-[var(--color-text-primary)] mb-1 tracking-[-0.02em]">
          Good day, {firstName} 👋
        </h1>
        <p className="text-[14px] text-[var(--color-text-secondary)] m-0">
          Here's your project overview for today.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3.5 mb-6">
        <SummaryCard label="Total" val={tasks.length} color="#6366F1" icon="tasks" />
        <SummaryCard label="Done" val={done} color="#22C55E" icon="done" />
        <SummaryCard
          label="In Progress"
          val={inProg}
          color="#F97316"
          icon="clock"
        />
        <SummaryCard
          label="High Priority"
          val={high.length}
          color="#EF4444"
          icon="fire"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-[18px]">
          <div className="text-[13px] font-bold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
            <Icon name="fire" size={14} color="#EF4444" />
            High priority tasks
          </div>

          {high.length === 0 ? (
            <p className="text-[13px] text-[var(--color-text-secondary)] m-0">
              All clear! No urgent tasks.
            </p>
          ) : (
            high.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-2 py-[8px] border-b border-[var(--color-border-tertiary)]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#EF4444" }}
                />
                <span className="text-[13px] text-[var(--color-text-primary)] flex-1">
                  {t.title}
                </span>
                <StatusBadge status={t.status} />
              </div>
            ))
          )}
        </div>

        <div className="rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-[18px]">
          <div className="text-[13px] font-bold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
            <Icon name="clock" size={14} color="#6366F1" />
            Recently added
          </div>

          {recent.map((t) => {
            const dot =
              t.priority === "High"
                ? "#EF4444"
                : t.priority === "Medium"
                  ? "#F97316"
                  : "#22C55E";
            return (
              <div
                key={t.id}
                className="flex items-center gap-2 py-[8px] border-b border-[var(--color-border-tertiary)]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: dot }}
                />
                <span
                  className="text-[13px] text-[var(--color-text-primary)] flex-1 overflow-hidden whitespace-nowrap text-ellipsis"
                  title={t.title}
                >
                  {t.title}
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{
                    backgroundColor:
                      t.priority === "High"
                        ? "#FFF1F2"
                        : t.priority === "Medium"
                          ? "#FFFBEB"
                          : "#F0FDF4",
                    color:
                      t.priority === "High"
                        ? "#BE123C"
                        : t.priority === "Medium"
                          ? "#B45309"
                          : "#166534",
                  }}
                >
                  {t.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

