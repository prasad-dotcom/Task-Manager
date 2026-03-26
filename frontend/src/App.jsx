import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Modal from "./components/Modal.jsx";
import TaskForm from "./components/TaskForm.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Kanban from "./pages/Kanban.jsx";
import Analytics from "./pages/Analytics.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import { authLogin, authMe, authSignup } from "./api/authApi.js";
import { completeTask, createTask, deleteTask, getTaskById, getTasks, updateTask } from "./api/tasksApi.js";
import { getAnalytics } from "./api/analyticsApi.js";

const formatDueDateInput = (dueDate) => {
  if (!dueDate) return "";
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

const mapUser = (u) => ({
  name: u?.name ?? "",
  email: u?.email ?? "",
});

const mapTask = (t) => ({
  id: t?._id || t?.id,
  title: t?.title ?? "",
  description: t?.description ?? "",
  status: t?.status ?? "Todo",
  priority: t?.priority ?? "Medium",
  dueDate: formatDueDateInput(t?.dueDate),
  createdAt: t?.createdAt ?? "",
});

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | signup
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [tab, setTab] = useState("dashboard");

  // null | {} (create) | task-object (edit)
  const [modal, setModal] = useState(null);

  const [busy, setBusy] = useState(false);

  const fetchTasks = async () => {
    const res = await getTasks({ page: 1, limit: 1000 });
    const list = res?.data?.data?.tasks ?? [];
    setTasks(list.map(mapTask));
  };

  const fetchAnalytics = async () => {
    const res = await getAnalytics();
    setAnalytics(res?.data?.data ?? null);
  };

  const refreshAll = async () => {
    await Promise.all([fetchTasks(), fetchAnalytics()]);
  };

  const loadSession = async () => {
    if (!token) return;
    setBusy(true);
    try {
      const res = await authMe();
      setUser(mapUser(res?.data?.data?.user));
      await refreshAll();
      setAuthed(true);
    } catch (e) {
      localStorage.removeItem("token");
      setToken(null);
      setAuthed(false);
      setUser(null);
      setTasks([]);
      setAnalytics(null);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizeTaskPayload = (form, extra) => {
    const dueDate = form?.dueDate ? form.dueDate : null; // input uses "" for empty
    return {
      title: form.title,
      description: form.description || "",
      status: form.status,
      priority: form.priority,
      dueDate,
      isCompleted: form.status === "Done",
      ...extra,
    };
  };

  const handleSave = async (form) => {
    setBusy(true);
    try {
      if (form?.id) {
        const payload = normalizeTaskPayload(form);
        await updateTask(form.id, payload);
      } else {
        const payload = normalizeTaskPayload(form);
        await createTask(payload);
      }
      await refreshAll();
      setModal(null);
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = async (task) => {
    // Fetch fresh data from server before opening the edit modal.
    try {
      const res = await getTaskById(task.id);
      setModal(mapTask(res?.data?.data?.task));
    } catch {
      // Fallback: use the locally-cached task object.
      setModal(task);
    }
  };

  const handleDelete = async (id) => {
    setBusy(true);
    try {
      await deleteTask(id);
      await refreshAll();
    } finally {
      setBusy(false);
    }
  };

  const handleToggleDone = async (task) => {
    setBusy(true);
    try {
      if (task.status === "Done") {
        // Backend has no "undo complete" endpoint; use PUT update with status.
        const payload = normalizeTaskPayload(
          task,
          {
            status: "Todo",
            isCompleted: false,
          }
        );
        // Ensure we send required fields for PUT validation (title required).
        await updateTask(task.id, payload);
      } else {
        await completeTask(task.id);
      }
      await refreshAll();
    } finally {
      setBusy(false);
    }
  };

  const content = useMemo(() => {
    const props = {
      tasks,
      onEdit: handleEdit,
      onDelete: handleDelete,
      onToggleDone: handleToggleDone,
    };

    return {
      dashboard: <Dashboard tasks={tasks} user={user} />,
      tasks: <Tasks {...props} />,
      kanban: <Kanban {...props} />,
      analytics: <Analytics tasks={tasks} analytics={analytics} />,
    };
  }, [tasks, user, analytics]);

  if (!authed) {
    return authMode === "login" ? (
      <Login
        isBusy={busy}
        onSwitch={() => setAuthMode((m) => (m === "login" ? "signup" : "login"))}
        onAuth={async (form) => {
          setBusy(true);
          try {
            const res = await authLogin({ email: form.email, password: form.password });
            const tokenFromApi = res?.data?.data?.token;
            localStorage.setItem("token", tokenFromApi);
            setToken(tokenFromApi);
            const meRes = await authMe();
            setUser(mapUser(meRes?.data?.data?.user));
            await refreshAll();
            setAuthed(true);
          } catch (err) {
            setBusy(false);
            throw err;
          } finally {
            setBusy(false);
          }
        }}
      />
    ) : (
      <Signup
        isBusy={busy}
        onSwitch={() => setAuthMode((m) => (m === "login" ? "signup" : "login"))}
        onAuth={async (form) => {
          setBusy(true);
          try {
            const res = await authSignup({
              name: form.name,
              email: form.email,
              password: form.password,
            });
            const tokenFromApi = res?.data?.data?.token;
            localStorage.setItem("token", tokenFromApi);
            setToken(tokenFromApi);
            const meRes = await authMe();
            setUser(mapUser(meRes?.data?.data?.user));
            await refreshAll();
            setAuthed(true);
          } catch (err) {
            setBusy(false);
            throw err;
          } finally {
            setBusy(false);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-tertiary)] flex flex-col">
      <Navbar user={user} onLogout={() => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthed(false);
        setUser(null);
        setTasks([]);
        setAnalytics(null);
      }} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar tab={tab} setTab={setTab} />

        <main className="flex-1 overflow-auto px-7 py-6">
          <div className="max-w-[960px] mx-auto">
            <div className="flex items-center justify-between mb-5">
              <div />
              <button
                type="button"
                onClick={() => setModal({})}
                disabled={busy}
                className="flex items-center gap-2 px-5 py-[9px] rounded-xl text-white font-bold text-[13px] cursor-pointer bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_2px_8px_rgba(99,102,241,0.25)]"
              >
                <span className="inline-flex">
                  {/* inline svg to keep design in sync */}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                New Task
              </button>
            </div>

            {content[tab]}
          </div>
        </main>
      </div>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.id ? "Edit Task" : "Create New Task"}
      >
        {modal !== null && (
          <TaskForm
            initial={modal?.id ? modal : null}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}

