import React, { useState } from "react";
import Icon from "./Icon.jsx";

const AuthCard = ({ mode, onSwitch, onAuth }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputClass =
    "w-full rounded-[10px] border border-[var(--color-border-secondary)] bg-[var(--color-background-secondary)] px-[14px] py-[10px] font-[inherit] text-[14px] text-[var(--color-text-primary)] outline-none mt-1";

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-[var(--color-background-tertiary)] p-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-7">
          <div className="w-[48px] h-[48px] rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mx-auto mb-3">
            <Icon name="sparkle" size={22} color="#fff" />
          </div>
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)] m-0 tracking-[-0.03em]">
            TaskFlow
          </h1>
          <p className="text-[14px] text-[var(--color-text-secondary)] m-0">
            {mode === "login"
              ? "Welcome back"
              : "Start managing tasks smarter"}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] p-7">
          <h2 className="text-[17px] font-semibold m-0 mb-5 text-[var(--color-text-primary)]">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </h2>

          {mode === "signup" && (
            <div className="mb-4">
              <label className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]">
                Full Name
              </label>
              <input
                className={inputClass}
                placeholder="Alex Chen"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]">
              Email
            </label>
            <input
              className={inputClass}
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-secondary)]">
              Password
            </label>
            <input
              className={inputClass}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => onAuth(form)}
            className="w-full rounded-[10px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white py-[11px] font-bold text-[15px] tracking-[0.01em]"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>

          <p className="text-center text-[13px] text-[var(--color-text-secondary)] mt-4 m-0">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={onSwitch}
              className="bg-transparent border-none text-[#6366F1] font-semibold cursor-pointer p-0 ml-1"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;

