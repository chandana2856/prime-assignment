import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { dark } = useContext(ThemeContext);

  const handleUpdate = () => {
    if (!title.trim()) return;
    onUpdate(task._id, { title, completed: task.completed });
    setEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded shadow-md transition
        ${task.completed ? "opacity-50 line-through" : ""}
        ${dark ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
    >
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`flex-1 mr-2 p-1 border rounded 
            ${
              dark
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
        />
      ) : (
        <span>{task.title}</span>
      )}

      <div className="flex gap-2">
        <button
          onClick={() =>
            onUpdate(task._id, { ...task, completed: !task.completed })
          }
          className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        {editing ? (
          <button
            onClick={handleUpdate}
            className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
