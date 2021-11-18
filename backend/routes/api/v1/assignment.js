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

module.exports = router;
