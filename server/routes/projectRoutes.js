const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middleware/validate");

const { createProjectSchema } = require("../schemas/projectSchema");
const { paginationSchema } = require("../schemas/paginationSchema");
const { mongoIdParam } = require("../schemas/commonSchema");

const {
  createProject,
  getProjects,
  getProject,
} = require("../controllers/projectController");

router.post("/", protect, validateBody(createProjectSchema), createProject);
router.get("/", protect, validateQuery(paginationSchema), getProjects);
router.get("/:id", protect, validateParams(mongoIdParam), getProject);

module.exports = router;
