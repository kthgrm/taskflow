const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { validateBody, validateParams } = require("../middleware/validate");

const { createProjectSchema } = require("../schemas/projectSchema");
const { mongoIdParam } = require("../schemas/commonSchema");

const {
  createProject,
  getProjects,
  getProject,
} = require("../controllers/projectController");

router.post("/", protect, validateBody(createProjectSchema), createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, validateParams(mongoIdParam), getProject);

module.exports = router;
