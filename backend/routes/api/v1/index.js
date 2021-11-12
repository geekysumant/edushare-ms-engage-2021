const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/class", require("./class"));
router.use("/quiz", require("./quiz"));

module.exports = router;
