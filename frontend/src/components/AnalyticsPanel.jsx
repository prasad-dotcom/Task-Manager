import React from "react";
import Icon from "./Icon.jsx";

const AnalyticsPanel = ({ tasks, analytics }) => {
  const total = analytics?.overview?.total ?? tasks.length;
  const done = analytics?.overview?.completed ?? tasks.filter((t) => t.status === "Done").length;
  const inProgress =
    analytics?.overview?.inProgress ??
    tasks.filter((t) => t.status === "In Progress").length;
  const pct = analytics?.overview?.completionRate ?? (total ? Math.round((done / total) * 100) : 0);
  const overdue =
    analytics?.overview?.overdue ??
    tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done").length;

  const highPriPending = tasks.filter(
    (t) => t.priority === "High" && t.status !== "Done"
  ).length;

  const getByStatusCount = (status) =>
    analytics?.byStatus?.find((s) => s._id === status)?.count ?? tasks.filter((t) => t.status === status).length;

  const getByPriorityCount = (priority) =>
    analytics?.byPriority?.find((p) => p._id === priority)?.count ??
    tasks.filter((t) => t.priority === priority).length;

  const StatCard = ({ label, value, icon, accent }) => (
    <div className="rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] flex items-center gap-4 px-[18px] py-[16px]">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}18` }}
      >
        <Icon name={icon} size={18} color={accent} />
      </div>
      <div>
        <div
          className="text-[22px] font-extrabold text-[var(--color-text-primary)] leading-none"
        >
          {value}
        </div>
        <div className="text-[12px] mt-[3px] font-semibold text-[var(--color-text-secondary)]">
          {label}
        </div>
      </div>
    </div>
  );

  const BarRow = ({ label, count, max, color }) => (
    <div className="mb-3.5">
      <div className="flex items-center justify-between text-[12px] font-medium text-[var(--color-text-secondary)] mb-1">
        <span>{label}</span>
        <span className="text-[var(--color-text-primary)] font-semibold">{count}</span>
      </div>
      <div className="h-[7px] bg-[var(--color-background-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-600 ease-out"
          style={{
            width: max ? `${(count / max) * 100}%` : "0%",
            background: color,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="pb-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 mb-5">
        <StatCard label="Total Tasks" value={total} icon="tasks" accent="#6366F1" />
        <StatCard label="Completed" value={done} icon="done" accent="#22C55E" />
        <StatCard
          label="In Progress"
          value={inProgress}
          icon="clock"
          accent="#F97316"
        />
        <StatCard label="Overdue" value={overdue} icon="alert" accent="#EF4444" />
        <StatCard
          label="High Priority"
          value={highPriPending}
          icon="fire"
          accent="#BE123C"
        />
        <StatCard
          label="Completion %"
          value={`${pct}%`}
          icon="target"
          accent="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-4">
          <div className="text-[13px] font-semibold mb-4 text-[var(--color-text-primary)]">
            Status breakdown
          </div>
          <BarRow label="Done" count={getByStatusCount("Done")} max={total} color="#22C55E" />
          <BarRow
            label="In Progress"
            count={getByStatusCount("In Progress")}
            max={total}
            color="#F97316"
          />
          <BarRow label="Todo" count={getByStatusCount("Todo")} max={total} color="#6366F1" />

          <div className="mt-4 px-4 py-3 bg-[#6366F115] rounded-lg flex items-center gap-2.5">
            <div className="flex-1 h-[10px] bg-[var(--color-background-secondary)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                }}
              />
            </div>
            <span className="text-[13px] font-extrabold text-[#6366F1]">{pct}%</span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-4">
          <div className="text-[13px] font-semibold mb-4 text-[var(--color-text-primary)]">
            Priority breakdown
          </div>
          {["High", "Medium", "Low"].map((p) => {
            const c = { High: "#EF4444", Medium: "#F97316", Low: "#22C55E" }[p];
            return (
              <BarRow
                key={p}
                label={p}
                count={getByPriorityCount(p)}
                max={total}
                color={c}
              />
            );
          })}

          <div className="mt-3 p-3 bg-[var(--color-background-secondary)] rounded-lg">
            <div className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
              {highPriPending > 0
                ? `⚡ ${highPriPending} high-priority task${highPriPending > 1 ? "s" : ""} pending`
                : "✅ No urgent tasks pending"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;

