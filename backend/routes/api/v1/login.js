//import packages
const express = require("express");

//import controllers
const loginController = require("../../../controllers/api/v1/loginApi");

//initialise express router
const router = express.Router();

//the router here is of form: /api/v1/ <route>
router.post("/", loginController.loginUser);

module.exports = router;
