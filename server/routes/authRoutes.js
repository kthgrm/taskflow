const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../schemas/authSchema");

const { validateBody } = require("../middleware/validate");
const protect = require("../middleware/authMiddleware");

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
