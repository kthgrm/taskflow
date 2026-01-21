const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { validateBody } = require("../middleware/validate");

const { createProjectSchema } = require("../schema/projectSchema");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

router.post("/", protect, validateBody(createProjectSchema), createProject);
router.get("/", protect, getProjects);

module.exports = router;
