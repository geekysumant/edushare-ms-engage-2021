import { userLogin } from "./users";
import { combineReducers } from "redux";

export default combineReducers({
  userDetails: userLogin,
});
