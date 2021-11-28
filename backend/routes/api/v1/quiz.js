//import packages
const express = require("express");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const taskController = require("../../../controllers/api/v1/taskApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/quiz/ <route>
router.post("/create", protect, taskController.createQuiz);
router.get("/fetch/all/:classId", protect, taskController.fetchTasks);
router.get("/fetch/:quizId", protect, taskController.fetchQuiz);
router.get(
  "/fetch/pending/:classId",
  protect,
  taskController.fetchPendingQuizzes
);
router.post("/submit", protect, taskController.submitQuiz);
router.get(
  "/submissions/:quizId",
  protect,
  taskController.fetchQuizSubmissions
);
router.get("/submission", protect, taskController.fetchUsersQuizSubmission);

module.exports = router;
