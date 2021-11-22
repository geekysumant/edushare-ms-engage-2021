//import packages
const express = require("express");
const jwt = require("jsonwebtoken");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const quizController = require("../../../controllers/api/v1/quizApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/quiz/ <route>
router.post("/create", protect, quizController.createQuiz);
router.get("/fetch/:classId", protect, quizController.fetchAssignments);
router.get("/fetch/quiz/:quizId", protect, quizController.fetchQuiz);
router.get(
  "/fetch/assignment/:assignmentId",
  protect,
  quizController.fetchQuiz
);
router.get(
  "/fetch/pending/:classId",
  protect,
  quizController.fetchPendingAssignments
);
router.post("/submit", protect, quizController.submitQuiz);
router.get(
  "/submissions/:quizId",
  protect,
  quizController.fetchQuizSubmissions
);
router.get("/submission", protect, quizController.fetchUsersQuizSubmission);

module.exports = router;
