//import packages
const express = require("express");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const classController = require("../../../controllers/api/v1/classApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/class/ <route>
router.post("/create", protect, classController.createClass);
router.get("/fetch", protect, classController.fetchClasses);
router.get("/fetch/:classId", protect, classController.fetchClass);
router.post("/join", protect, classController.joinClass);
router.get("/fetch/users/:classId", protect, classController.fetchUsersInClass);

module.exports = router;
