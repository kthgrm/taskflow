const Project = require("../models/Project");

exports.createProject = async (name, description, userId) => {
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

exports.getProject = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  return project;
};
