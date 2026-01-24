const AppError = require("../utils/AppError");
const { ZodError } = require("zod");

const handleZodError = (error, next) => {
  if (error instanceof ZodError) {
    const message = error.issues[0].message;
    return next(new AppError(message, 400));
  }
};

exports.validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    handleZodError(error, next);
  }
};

exports.validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    handleZodError(error, next);
  }
};

exports.validateQuery = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    handleZodError(error, next);
  }
};
