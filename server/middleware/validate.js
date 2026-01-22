const AppError = require("../utils/AppError");

exports.validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const message = error.issues[0].message;
    next(new AppError(message, 400));
  }
};

exports.validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    const message = erro.issues[0].message;
    throw new AppError(message, 400);
  }
};
