//import packages
const express = require("express");
const jwt = require("jsonwebtoken");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const quizController = require("../../../controllers/api/v1/quizApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/assignment/<route>
router.post("/create", protect, quizController.createAssignment);
router.get("/fetch/:assignmentId", protect, quizController.fetchAssignment);
router.post("/submit", protect, quizController.uploadAssignmentSubmission);
router.get(
  "/download/:assignmentId",
  protect,
  quizController.downloadAssignment
);
router.get(
  "/submission/download/:assignmentId",
  protect,
  quizController.downloadAssignmentSubmission
);

router.get(
  "/getFileExtension/:assignmentId",
  protect,
  quizController.getFileExtensionAssignment
);
router.get(
  "/submission/getFileExtension/:assignmentId",
  protect,
  quizController.getFileExtensionAssignmentSubmission
);

module.exports = router;
