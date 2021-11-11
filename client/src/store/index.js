import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

// if user closes the browser, fetch their details from local storage
const initialLoginState = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : {
      isAuthenticated: false,
      loading: false,
      userInfo: null,
    };

// if user closes the browser, fetch created questions till now from local storage
const initialQuestionsState = localStorage.getItem("questions")
  ? JSON.parse(localStorage.getItem("questions"))
  : {
      questions: [],
      totalMarks: 0,
    };

export const store = createStore(
  reducers,
  { userDetails: initialLoginState, questions: initialQuestionsState },
  composeWithDevTools(applyMiddleware(...middlewares))
);
