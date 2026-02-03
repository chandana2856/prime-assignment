import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();

      console.log("TASK API RESPONSE RAW:", res);
      console.log("TASK API RESPONSE DATA:", res.data);

      let list = [];

      // Case 1: backend sends array
      if (Array.isArray(res.data)) {
        list = res.data;
      }

      // Case 2: backend sends { tasks: [] }
      else if (res.data && Array.isArray(res.data.tasks)) {
        list = res.data.tasks;
      }

      // Case 3: backend sends { data: [] }
      else if (res.data && Array.isArray(res.data.data)) {
        list = res.data.data;
      }

      console.log("FINAL TASK LIST:", list);
      setTasks(list);
    } catch (err) {
      console.error(
        "LOAD TASK ERROR:",
        err.response?.status,
        err.response?.data || err.message
      );
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTask(editingId, { title });
        setEditingId(null);
      } else {
        await addTask({ title });
      }
      setTitle("");
      loadTasks();
    } catch (err) {
      console.error("TASK ERROR:", err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* ADD / EDIT FORM */}
        <form onSubmit={handleAddOrUpdate} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 px-3 py-2 rounded text-black"
          />
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        {/* TASK LIST */}
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-slate-800 p-4 mb-3 rounded flex justify-between items-center"
            >
              <span>{task.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No tasks found</p>
        )}
      </div>
    </>
  );
}
