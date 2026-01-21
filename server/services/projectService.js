const Project = require("../models/Project");
const AppError = require("../utils/AppError");

exports.createProject = async (name, description, userId) => {
  if (!name) {
    throw new AppError("Project name required", 400);
  }

  const project = await Project.create({
    name,
    description,
    owner: userId,
  });

  return project;
};

exports.getProjects = async (userId) => {
  const projects = await Project.find({ owner: userId }).sort({
    createdAt: -1,
  });

  return projects;
};
