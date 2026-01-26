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

    return res
      .cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        accessToken: data.accessToken,
        user: data.user,
      });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const data = await authService.refreshAccessToken(refreshToken);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user.id);

    res
      .clearCookie("refreshToken")
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
