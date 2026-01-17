const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createTask, getTasks } = require("../controllers/taskController");

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);

module.exports = router;
