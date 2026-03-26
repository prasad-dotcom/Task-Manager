import React, { useEffect, useState } from "react";

const TaskForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(
    initial || {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    }
  );

  useEffect(() => {
    setForm(
      initial || {
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
      }
    );
  }, [initial]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const labelClass =
    "mb-1 block text-[12px] font-semibold tracking-[0.05em] uppercase text-[var(--color-text-secondary)]";
  const inputClass =
    "w-full rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-background-secondary)] px-3 py-[9px] font-[inherit] text-[14px] text-[var(--color-text-primary)] outline-none";

  const canSave = !!form.title.trim();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>Title *</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Add more details..."
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            {["Todo", "In Progress", "Done"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Priority</label>
          <select
            className={inputClass}
            value={form.priority}
            onChange={(e) => set("priority", e.target.value)}
          >
            {["Low", "Medium", "High"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Due Date</label>
        <input
          className={inputClass}
          type="date"
          value={form.dueDate}
          onChange={(e) => set("dueDate", e.target.value)}
        />
      </div>

      <div className="mt-1 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-[var(--color-border-secondary)] bg-transparent px-5 py-[9px] text-[14px] font-medium text-[var(--color-text-secondary)]"
          type="button"
        >
          Cancel
        </button>

        <button
          onClick={() => canSave && onSave(form)}
          disabled={!canSave}
          className="rounded-lg px-6 py-[9px] text-[14px] font-semibold text-white transition"
          style={{
            background: canSave
              ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
              : "#cbd5e1",
            cursor: canSave ? "pointer" : "not-allowed",
          }}
          type="button"
        >
          {initial?.id ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;

