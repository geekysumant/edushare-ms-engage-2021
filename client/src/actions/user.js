import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

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
    } catch (error) {
      localStorage.removeItem("userDetails");
      dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
    }
  };
};

export const checkAuthentication = () => {
  return async (dispatch, getState) => {
    try {
      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/v1/login/checkAuthentication",
        config
      );
    } catch (error) {
      localStorage.removeItem("userDetails");
      dispatch({ type: USER_LOGIN_FAIL, payload: error });
    }
  };
};
