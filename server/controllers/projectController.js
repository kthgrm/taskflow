const projectService = require("../services/projectService");

exports.createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const project = await projectService.createProject(
      name,
      description,
      req.user.id,
    );

    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user.id);

    return res.status(200).json({ message: "Projects retrieved", projects });
  } catch (error) {
    next(error);
  }
};
