import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-800 shadow">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex gap-3">
        <button
          onClick={toggleDark}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
        >
          🌙
        </button>
        <button
          onClick={logout}
          className="px-4 py-1 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
