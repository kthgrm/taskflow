import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Tasks = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tasks", {
        title,
        projectId: id,
      });

      setTasks([res.data.task, ...tasks]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>

      <form onSubmit={createTask} className="mb-6 flex gap-2">
        <input
          required
          className="p-2 bg-gray-800 rounded flex-1"
          placeholder="New task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button
          type="submit"
          className="bg-green-600 px-4 rounded hover:bg-green-700"
        >
          Add
        </button>
      </form>

      <div className="space-y-3">
        {tasks ? (
          tasks.map((task) => (
            <div key={task._id} className="bg-gray-800 p-3 rounded">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-400">Status: {task.status}</p>
            </div>
          ))
        ) : (
          <div>No task found</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
