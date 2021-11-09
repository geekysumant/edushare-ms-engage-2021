import { userLogin } from "./users";
import { createClassReducer } from "./class";
import { combineReducers } from "redux";

export default combineReducers({
  userDetails: userLogin,
  classDetails: createClassReducer,
});
