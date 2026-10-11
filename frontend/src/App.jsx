import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks once when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (title) => {
    try {
      const newTask = await addTask(title);
      setTasks([newTask, ...tasks]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <TaskForm onAdd={handleAdd} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="info">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="info">No tasks yet. Add one above!</p>
      ) : (
        <>
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
          <p className="info">
            {remaining} of {tasks.length} task(s) remaining
          </p>
        </>
      )}
    </div>
  );
}

export default App;
