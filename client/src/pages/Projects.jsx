import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/projects", {
        name,
      });

      setProjects([res.data.project, ...projects]);
      setName("");
    } catch (error) {
      console.log("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <form onSubmit={createProject} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New project name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              navigate(`/projects/${project._id}`);
            }}
            className="bg-gray-800 p-4 rounded shadow"
          >
            <h3 className="font-bold">{project.name}</h3>
            <p className="text-sm text-gray-400">
              {project.description || "No description"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
