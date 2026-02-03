import { useState, useEffect } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api/api";
import toast from "react-hot-toast";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetchTasks();
        console.log("TASKS RESPONSE:", res.data); // DEBUG
        setTasks(res.data); // Must be an array
      } catch (err) {
        console.error("FETCH TASKS ERROR:", err.response || err);
        setTasks([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!tasks.length) return <p>No tasks available</p>;

  return (
    <div className="p-4">
      {tasks.map((task) => (
        <div key={task._id} className="mb-2 p-2 border rounded">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <button
            onClick={async () => {
              try {
                await deleteTask(task._id);
                setTasks(tasks.filter((t) => t._id !== task._id));
                toast.success("Task deleted");
              } catch (err) {
                toast.error("Failed to delete");
              }
            }}
            className="text-red-600 mr-2"
          >
            Delete
          </button>
          <button
            onClick={async () => {
              try {
                await updateTask(task._id, { title: task.title + " ✔" });
                toast.success("Task updated");
              } catch (err) {
                toast.error("Failed to update");
              }
            }}
            className="text-blue-600"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
