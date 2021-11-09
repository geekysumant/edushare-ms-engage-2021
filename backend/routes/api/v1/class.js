//import packages
const express = require("express");
const jwt = require("jsonwebtoken");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const classController = require("../../../controllers/api/v1/class_api");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/class/ <route>
router.post("/create", protect, classController.createClass);
router.get("/fetch", protect, classController.fetchClasses);

module.exports = router;
