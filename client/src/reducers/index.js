import { userLogin } from "./users";
import {
  createClassReducer,
  fetchClassesReducer,
  joinClassReducer,
} from "./class";
import { combineReducers } from "redux";

export default combineReducers({
  userDetails: userLogin,
  //dont keep crated class details here, instead call the fetchClass api to also request the created classes
  classDetails: fetchClassesReducer,
  // fetchClasses: fetchClassesReducer,
  createClass: createClassReducer,
  joinClass: joinClassReducer,
});
