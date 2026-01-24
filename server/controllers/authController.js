const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    return res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await authService.loginUser(email, password);

    return res.status(200).json({
      message: "Login Successful",
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = await authService.refreshAccessToken(refreshToken);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user.id);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
