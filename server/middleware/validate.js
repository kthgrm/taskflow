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
