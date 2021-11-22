import { userLogin, userVideoReducer } from "./users";
import {
  createClassReducer,
  fetchClassesReducer,
  fetchEnterClassDetailsReducer,
  joinClassReducer,
} from "./class";
import { combineReducers } from "redux";
import { addQuestion, addQuestionReducer } from "./question";
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
  fetchAnnouncementsReducer,
} from "./announcement";

export default combineReducers({
  userDetails: userLogin,
  //dont keep crated class details here, instead call the fetchClass api to also request the created classes
  classDetails: fetchClassesReducer,
  // fetchClasses: fetchClassesReducer,
  createClass: createClassReducer,
  joinClass: joinClassReducer,
  fetchAnnouncements: fetchAnnouncementsReducer,
  createNewAnnouncement: createNewAnnouncementReducer,
  assignmentDetails: fetchAssignmentsReducer,
  enterClassDetails: fetchEnterClassDetailsReducer,
  createQuiz: createQuizReducer,
  createAssignment: createAssignmentReducer,
  fetchQuiz: fetchQuizReducer,
  fetchAssignment: fetchAssignmentReducer,
  submitQuiz: submitQuizReducer,
  //change to fetch quiz submissions
  fetchQuizSubmissions: fetchQuizSubmissionsReducer,
  fetchAssignmentSubmissions: fetchAssignmentSubmissionsReducer,
  fetchUsersQuizSubmission: fetchUsersQuizSubmissionReducer,
  fetchUsersAssignmentSubmission: fetchUsersAssignmentSubmissionReducer,
  uploadAssignmentSubmission: createAssignmentSubmissionReducer,
  downloadAssignment: downloadAssignmentReducer,
  downloadAssignmentSubmission: downloadAssignmentSubmissionReducer,
  userVideo: userVideoReducer,
  gradeAssignment: gradeAssignmentReducer,
  //not needed questions state
  // allQuestions: addQuestionReducer,
});
