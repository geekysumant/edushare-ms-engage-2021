import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
} from "./actionTypes";

const SOME_ERROR_OCCURRED = "Some error occurred";
export const userLogin = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const config = {
        method: "POST",
      };
      const user = {
        token,
      };
      const { data } = await axios.post("/api/v1/login", user, config);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.message,
      });
      localStorage.setItem(
        "userDetails",
        JSON.stringify(getState().userDetails)
      );
    } catch (err) {
      localStorage.removeItem("userDetails");
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    localStorage.removeItem("userDetails");
    window.location.reload();
  };
};
