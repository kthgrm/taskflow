const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "error",
    message: "Too many login attempts. Try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    status: "error",
    message: "Too many refresh attempts. Try again later.",
  },
});

exports.generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Too many requests. Slow down.",
  },
});
