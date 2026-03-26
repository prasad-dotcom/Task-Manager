import React from "react";
import Icon from "./Icon.jsx";
import { PRIORITY_BADGES } from "../styles/palette";

const PriorityBadge = ({ priority }) => {
  const p = PRIORITY_BADGES[priority] || PRIORITY_BADGES.Low;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide"
      style={{ backgroundColor: p.bg, color: p.color }}
    >
      <Icon name={p.icon} size={11} color={p.color} />
      {priority}
    </span>
  );
};

export default PriorityBadge;

