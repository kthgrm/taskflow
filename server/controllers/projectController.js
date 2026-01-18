const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    if (projects.length === 0) {
      return res
        .status(200)
        .json({ message: "No projects found", projects: [] });
    }

    return res.status(200).json({ message: "Projects retrieved", projects });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
