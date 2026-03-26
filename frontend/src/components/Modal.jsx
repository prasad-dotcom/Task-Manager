import React from "react";
import Icon from "./Icon.jsx";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border-tertiary)] px-6 py-4">
          <h2 className="m-0 text-[16px] font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-lg p-1 text-[var(--color-text-secondary)] hover:bg-black/5"
            aria-label="Close modal"
            type="button"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

