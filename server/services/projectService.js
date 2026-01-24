const Project = require("../models/Project");

exports.createProject = async (name, description, userId) => {
  const project = await Project.create({
    name,
    description,
    owner: userId,
  });

  return project;
};

exports.getProjects = async (userId, page, limit, sortBy, order, search) => {
  const skip = (page - 1) * limit;

  const query = {
    owner: userId,
    name: { $regex: search, $options: "i" },
  };

  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(query),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    projects,
  };
};

exports.getProject = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  return project;
};
