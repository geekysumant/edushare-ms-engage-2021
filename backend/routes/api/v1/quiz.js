//import packages
const express = require("express");
const jwt = require("jsonwebtoken");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const quizController = require("../../../controllers/api/v1/quiz_api");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/class/ <route>
router.post("/create", protect, quizController.createQuiz);
router.get("/fetch/:classId", protect, quizController.fetchAssignments);

module.exports = router;
