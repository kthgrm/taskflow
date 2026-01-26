const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { validateBody } = require("../middleware/validate");
const { loginLimiter, refreshLimiter } = require("../middleware/rateLimiter");

const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../schemas/authSchema");

router.post("/register", validateBody(registerSchema), register);
router.post("/login", loginLimiter, validateBody(loginSchema), login);
router.post("/refresh", refreshLimiter, refreshToken);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});
router.post("/logout", protect, logout);

module.exports = router;
