const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/class", require("./class"));

module.exports = router;
