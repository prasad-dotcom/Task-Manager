// Extracted color palette + badge styling from `TaskManager.jsx`
// Keep values as hex strings so we can reuse them for inline/dynamic styles.

export const GRADIENT = {
  from: "#6366F1",
  to: "#8B5CF6",
};

export const ACCENTS = {
  indigo: "#6366F1",
  violet: "#8B5CF6",
  green: "#22C55E",
  orange: "#F97316",
  red: "#EF4444",
};

export const STATUS_BADGES = {
  Todo: { bg: "#EEF2FF", color: "#4338CA", dot: "#6366F1" },
  "In Progress": { bg: "#FFF7ED", color: "#C2410C", dot: "#F97316" },
  Done: { bg: "#F0FDF4", color: "#15803D", dot: "#22C55E" },
};

export const PRIORITY_BADGES = {
  High: { icon: "fire", bg: "#FFF1F2", color: "#BE123C" },
  Medium: { icon: "alert", bg: "#FFFBEB", color: "#B45309" },
  Low: { icon: "star", bg: "#F0FDF4", color: "#166534" },
};

