import { userLogin } from "./users";
import {
  createClassReducer,
  fetchClassesReducer,
  fetchEnterClassDetailsReducer,
  joinClassReducer,
} from "./class";
import { combineReducers } from "redux";
import { addQuestion, addQuestionReducer } from "./question";
import {
  createQuizReducer,
  fetchAssignmentReducer,
  fetchAssignmentsReducer,
  fetchQuizReducer,
  fetchSubmissionsReducer,
  fetchUsersQuizSubmissionReducer,
  submitQuizReducer,
} from "./assignment";

export default combineReducers({
  userDetails: userLogin,
  //dont keep crated class details here, instead call the fetchClass api to also request the created classes
  classDetails: fetchClassesReducer,
  // fetchClasses: fetchClassesReducer,
  createClass: createClassReducer,
  joinClass: joinClassReducer,
  assignmentDetails: fetchAssignmentsReducer,
  enterClassDetails: fetchEnterClassDetailsReducer,
  createQuiz: createQuizReducer,
  fetchQuiz: fetchQuizReducer,
  fetchAssignment: fetchAssignmentReducer,
  submitQuiz: submitQuizReducer,
  fetchSubmissions: fetchSubmissionsReducer,
  fetchUsersQuizSubmission: fetchUsersQuizSubmissionReducer,

  //not needed questions state
  // allQuestions: addQuestionReducer,
});
