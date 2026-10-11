import { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    if (title.trim() && title.trim() !== task.title) {
      onUpdate(task._id, { title: title.trim() });
    } else {
      setTitle(task.title);
    }
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
      />

      {editing ? (
        <input
          className="edit-input"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
        />
      ) : (
        <span className="title" onDoubleClick={() => setEditing(true)}>
          {task.title}
        </span>
      )}

      <button className="edit-btn" onClick={() => setEditing(true)}>
        Edit
      </button>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
