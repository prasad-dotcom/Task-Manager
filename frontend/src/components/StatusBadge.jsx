import React from "react";
import { STATUS_BADGES } from "../styles/palette";

const StatusBadge = ({ status }) => {
  const s = STATUS_BADGES[status] || STATUS_BADGES.Todo;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      <span
        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: s.dot }}
      />
      {status}
    </span>
  );
};

export default StatusBadge;

