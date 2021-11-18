const express = require("express");
const router = express.Router();
const test = require("../controllers/api/v1/quizApi").createAssignment;
const protect = require("../middleware/authMiddleware").protect;

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
router.use("/api", require("./api"));

router.post("/test", protect, test);

module.exports = router;
