import React from "react";
import AnalyticsPanel from "../components/AnalyticsPanel.jsx";
import Icon from "../components/Icon.jsx";

const Analytics = ({ tasks, analytics }) => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-[17px] font-bold m-0 mb-1 text-[var(--color-text-primary)] flex items-center gap-2">
          <Icon name="sparkle" size={16} color="#6366F1" />
          Analytics
        </h2>
        <p className="text-[13px] text-[var(--color-text-secondary)] m-0">
          Real-time insights from your task data
        </p>
      </div>
      <AnalyticsPanel tasks={tasks} analytics={analytics} />
    </div>
  );
};

export default Analytics;

