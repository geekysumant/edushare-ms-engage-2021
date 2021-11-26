//import packages
const express = require("express");

//authetication middleware
const protect = require("../../../middleware/authMiddleware").protect;

//import controllers
const taskController = require("../../../controllers/api/v1/taskApi");

//initialise express router
const router = express.Router();

//the route here is of form: /api/v1/assignment/<route>
router.post("/create", protect, taskController.createAssignment);
router.get("/fetch/:assignmentId", protect, taskController.fetchAssignment);
router.post("/submit", protect, taskController.uploadAssignmentSubmission);
router.get(
  "/fetch/pending/:classId",
  protect,
  taskController.fetchPendingAssignments
);
router.get(
  "/download/:assignmentId",
  protect,
  taskController.downloadAssignment
);
router.get(
  "/submissions/:assignmentId",
  protect,
  taskController.fetchAssignmentSubmissions
);
router.get(
  "/submission/download/:assignmentId",
  protect,
  taskController.downloadAssignmentSubmission
);

router.get(
  "/getFileExtension/:assignmentId",
  protect,
  taskController.getFileExtensionAssignment
);
router.get(
  "/submission/getFileExtension/:assignmentId",
  protect,
  taskController.getFileExtensionAssignmentSubmission
);
router.get(
  "/submission",
  protect,
  taskController.fetchUsersAssignmentSubmission
);
router.post("/grade", protect, taskController.gradeAssignment);

module.exports = router;
