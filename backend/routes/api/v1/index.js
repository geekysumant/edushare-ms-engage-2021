const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/class", require("./class"));
router.use("/quiz", require("./quiz"));
router.use("/assignment", require("./assignment"));
router.use("/announcement", require("./announcement"));

module.exports = router;
