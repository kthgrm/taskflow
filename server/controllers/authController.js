const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = authService.loginUser(email, password);

    return res.status(200).json({
      message: "Login Successful",
      ...data,
    });
  } catch (error) {
    next(error);
  }
};
