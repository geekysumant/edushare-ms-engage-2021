//import packages
const express = require("express");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const announcementController = require("../../../controllers/api/v1/announcementApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/announcement/ <route>
router.post(
  "/create/:classId",
  protect,
  announcementController.createAnnouncement
);
router.get(
  "/fetch/:classId",
  protect,
  announcementController.fetchAnnouncements
);
router.delete(
  "/delete/:announcementId",
  protect,
  announcementController.deleteAnnouncement
);
module.exports = router;
