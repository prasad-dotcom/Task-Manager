import React from "react";
import Icon from "./Icon.jsx";

const Navbar = ({ user, onLogout }) => {
  const initials =
    user?.avatar ||
    user?.name
      ?.split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") ||
    "U";

  return (
    <nav className="flex items-center px-6 h-[56px] bg-[var(--color-background-primary)] border-b border-[var(--color-border-tertiary)] sticky top-0 z-40">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
          <Icon name="sparkle" size={16} color="#fff" />
        </div>
        <span className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-[-0.02em]">
          TaskFlow
        </span>
        <span className="text-[11px] bg-[#6366F115] text-[#6366F1] px-2 py-1 rounded-full font-semibold ml-1">
          Pro
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-2 py-1 rounded-lg bg-[var(--color-background-secondary)]">
          <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-bold text-white">
            {initials}
          </div>
          <span className="text-[13px] font-medium text-[var(--color-text-primary)]">
            {user.name}
          </span>
        </div>

        <button
          onClick={onLogout}
          type="button"
          title="Logout"
          className="bg-transparent border-none cursor-pointer text-[var(--color-text-secondary)] p-1.5 rounded-md hover:bg-black/5"
        >
          <Icon name="logout" size={18} color="currentColor" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

