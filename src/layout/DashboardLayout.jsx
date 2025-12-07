import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <p>loading</p>;
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isSidebarOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-gray-700"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {/* Student Routes */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-tuitions"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>📚</span>
                    {isSidebarOpen && <span>My Tuitions</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/post-tuition"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>✏️</span>
                    {isSidebarOpen && <span>Post Tuition</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/applied-tutors"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>👨‍🏫</span>
                    {isSidebarOpen && <span>Applied Tutors</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/payments"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>💳</span>
                    {isSidebarOpen && <span>Payments</span>}
                  </NavLink>
                </li>
              </>
            )}

            {/* Tutor Routes */}
            {role === "tutor" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/active-tuitions"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>📖</span>
                    {isSidebarOpen && <span>Active Tuitions</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>📝</span>
                    {isSidebarOpen && <span>Manage Applications</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/earnings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>💰</span>
                    {isSidebarOpen && <span>Earnings</span>}
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>👥</span>
                    {isSidebarOpen && <span>User Management</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/tuition-management"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>📋</span>
                    {isSidebarOpen && <span>Tuition Management</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/reports"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    <span>📊</span>
                    {isSidebarOpen && <span>Reports</span>}
                  </NavLink>
                </li>
              </>
            )}

            {/* Common Routes */}

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded transition ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <span>👤</span>
                {isSidebarOpen && <span>Profile</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded transition ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <span>⚙️</span>
                {isSidebarOpen && <span>Settings</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Back to Home */}
        <div className="p-4 border-t border-gray-700">
          <NavLink
            to="/"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition"
          >
            <span>🏠</span>
            {isSidebarOpen && <span>Back to Home</span>}
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-gray-100">🔔</button>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
