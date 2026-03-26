import React, { useMemo, useState } from "react";
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

const MOCK_USER = { name: "Alex Chen", email: "alex@taskmanager.dev", avatar: "AC" };
const INITIAL_TASKS = [
  {
    id: 1,
    title: "Design system architecture",
    description:
      "Define component hierarchy and state management strategy for the frontend.",
    status: "Done",
    priority: "High",
    dueDate: "2026-03-20",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    title: "Setup Express backend",
    description:
      "Initialize Node.js + Express server with MongoDB connection and folder structure.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-03-28",
    createdAt: "2026-03-05",
  },
  {
    id: 3,
    title: "JWT authentication flow",
    description:
      "Implement signup, login, token refresh and auth middleware.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-03-30",
    createdAt: "2026-03-06",
  },
  {
    id: 4,
    title: "Task CRUD API endpoints",
    description: "Build REST endpoints for create, read, update, delete tasks.",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-04-05",
    createdAt: "2026-03-08",
  },
  {
    id: 5,
    title: "Analytics dashboard",
    description: "Build stats cards and charts for task insights.",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-04-10",
    createdAt: "2026-03-10",
  },
  {
    id: 6,
    title: "Write unit tests",
    description: "Jest tests for auth and task modules.",
    status: "Todo",
    priority: "Low",
    dueDate: "2026-04-15",
    createdAt: "2026-03-12",
  },
  {
    id: 7,
    title: "Responsive UI polish",
    description: "Mobile-first styling, dark mode support.",
    status: "Todo",
    priority: "Low",
    dueDate: "2026-04-20",
    createdAt: "2026-03-14",
  },
  {
    id: 8,
    title: "Deploy to production",
    description: "Configure CI/CD pipeline and deploy to cloud.",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-04-25",
    createdAt: "2026-03-15",
  },
];

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | signup
  const [user] = useState(MOCK_USER);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [tab, setTab] = useState("dashboard");

  // null | {} (create) | task-object (edit)
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      setTasks((p) => p.map((t) => (t.id === form.id ? { ...t, ...form } : t)));
    } else {
      setTasks((p) => [
        ...p,
        { ...form, id: Date.now(), createdAt: new Date().toISOString().split("T")[0] },
      ]);
    }
    setModal(null);
  };

  const handleDelete = (id) => setTasks((p) => p.filter((t) => t.id !== id));

  const handleToggleDone = (task) => {
    setTasks((p) =>
      p.map((t) =>
        t.id === task.id
          ? { ...t, status: t.status === "Done" ? "Todo" : "Done" }
          : t
      )
    );
  };

  const content = useMemo(() => {
    const props = {
      tasks,
      onEdit: (t) => setModal(t),
      onDelete: handleDelete,
      onToggleDone: handleToggleDone,
    };

    return {
      dashboard: <Dashboard tasks={tasks} user={user} />,
      tasks: <Tasks {...props} />,
      kanban: <Kanban {...props} />,
      analytics: <Analytics tasks={tasks} />,
    };
  }, [tasks, user]);

  if (!authed) {
    return authMode === "login" ? (
      <Login
        onSwitch={() => setAuthMode((m) => (m === "login" ? "signup" : "login"))}
        onAuth={() => setAuthed(true)}
      />
    ) : (
      <Signup
        onSwitch={() => setAuthMode((m) => (m === "login" ? "signup" : "login"))}
        onAuth={() => setAuthed(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-tertiary)] flex flex-col">
      <Navbar user={user} onLogout={() => setAuthed(false)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar tab={tab} setTab={setTab} />

        <main className="flex-1 overflow-auto px-7 py-6">
          <div className="max-w-[960px] mx-auto">
            <div className="flex items-center justify-between mb-5">
              <div />
              <button
                type="button"
                onClick={() => setModal({})}
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

