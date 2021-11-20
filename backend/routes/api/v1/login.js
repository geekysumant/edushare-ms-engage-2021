//import packages
const express = require("express");
const jwt = require("jsonwebtoken");

//import controllers
const loginController = require("../../../controllers/api/v1/loginApi");

//initialise express router
const router = express.Router();

//the router here is of form: /api/v1/ <route>
router.post("/", loginController.loginUser);
router.get("/checkAuthentication", loginController.checkAuthentication);

module.exports = router;
