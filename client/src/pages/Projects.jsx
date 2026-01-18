import { useState, useEffect } from "react";
import api from "../services/api";

const Projects = () => {
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
      <form onSubmit={createProject}>
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

      <div>
        {projects.map((project) => (
          <div key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description || "No description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
