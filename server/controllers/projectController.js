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

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    if (projects.length === 0) {
      res.status(200).json({ message: "No projects found", projects: [] });
    }

    res.status(200).json({ message: "Projects retrieved", projects });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
