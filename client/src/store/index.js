import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

const initialLoginState = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : {
      isAuthenticated: false,
      loading: false,
      userInfo: null,
    };

export const store = createStore(
  reducers,
  { userDetails: initialLoginState },
  composeWithDevTools(applyMiddleware(...middlewares))
);
