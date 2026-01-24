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
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const sortBy = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const search = req.query.search || "";

    const result = await projectService.getProjects(
      req.user.id,
      page,
      limit,
      sortBy,
      order,
      search,
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await projectService.getProject(projectId, req.user.id);

    return res.status(200).json({
      message: "Project retrieved",
      project,
    });
  } catch (error) {
    next(error);
  }
};
