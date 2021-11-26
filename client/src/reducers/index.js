import { userLogin, userLogoutReducer, userVideoReducer } from "./users";
import {
  createClassReducer,
  fetchClassesReducer,
  fetchEnterClassDetailsReducer,
  fetchUsersInClassReducer,
  joinClassReducer,
} from "./class";
import { combineReducers } from "redux";
import {
  createAssignmentReducer,
  createAssignmentSubmissionReducer,
  createQuizReducer,
  downloadAssignmentReducer,
  downloadAssignmentSubmissionReducer,
  fetchAssignmentReducer,
  fetchAssignmentsReducer,
  fetchAssignmentSubmissionsReducer,
  fetchQuizReducer,
  fetchQuizSubmissionsReducer,
  fetchUsersAssignmentSubmissionReducer,
  fetchUsersQuizSubmissionReducer,
  gradeAssignmentReducer,
  submitQuizReducer,
} from "./assignment";
import {
  createNewAnnouncementReducer,
  deleteAnnouncementReducer,
  fetchAnnouncementsReducer,
} from "./announcement";

export default combineReducers({
  userDetails: userLogin,
  userLogout: userLogoutReducer,
  classDetails: fetchClassesReducer,
  createClass: createClassReducer,
  joinClass: joinClassReducer,
  fetchAnnouncements: fetchAnnouncementsReducer,
  createNewAnnouncement: createNewAnnouncementReducer,
  deleteAnnouncement: deleteAnnouncementReducer,
  assignmentDetails: fetchAssignmentsReducer,
  enterClassDetails: fetchEnterClassDetailsReducer,
  createQuiz: createQuizReducer,
  createAssignment: createAssignmentReducer,
  fetchQuiz: fetchQuizReducer,
  fetchAssignment: fetchAssignmentReducer,
  submitQuiz: submitQuizReducer,
  fetchQuizSubmissions: fetchQuizSubmissionsReducer,
  fetchAssignmentSubmissions: fetchAssignmentSubmissionsReducer,
  fetchUsersQuizSubmission: fetchUsersQuizSubmissionReducer,
  fetchUsersAssignmentSubmission: fetchUsersAssignmentSubmissionReducer,
  uploadAssignmentSubmission: createAssignmentSubmissionReducer,
  downloadAssignment: downloadAssignmentReducer,
  downloadAssignmentSubmission: downloadAssignmentSubmissionReducer,
  userVideo: userVideoReducer,
  gradeAssignment: gradeAssignmentReducer,
  fetchUsersInClass: fetchUsersInClassReducer,
});
