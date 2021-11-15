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
  fetchAssignmentsReducer,
  fetchQuizReducer,
  fetchSubmissionsReducer,
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
  submitQuiz: submitQuizReducer,
  fetchSubmissions: fetchSubmissionsReducer,
  //not needed questions state
  // allQuestions: addQuestionReducer,
});
