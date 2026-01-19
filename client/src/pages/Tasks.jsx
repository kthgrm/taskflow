import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

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

  const columns = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
  };

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

      <DragDropContext
        onDragEnd={async (result) => {
          if (!result.destination) return;

          const taskId = result.draggableId;
          const newStatus = result.destination.droppableId;

          try {
            await api.put(`/tasks/${taskId}`, {
              status: newStatus,
            });

            setTasks((prev) =>
              prev.map((task) =>
                task._id === taskId ? { ...task, status: newStatus } : task,
              ),
            );
          } catch (error) {
            alert("Failed to update status");
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([key, label]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-800 p-4 rounded min-h-[300px]"
                >
                  <h2 className="font-bold mb-3">{label}</h2>

                  {tasks
                    .filter((task) => task.status === key)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task._id}
                        index={index}
                        key={task._id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-700 p-3 rounded mb-2"
                          >
                            {task.title}
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
