const express = require("express");
const router = express.Router();

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
router.use("/api", require("./api"));

module.exports = router;
