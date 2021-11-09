import {
  CREATE_CLASS_FAIL,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
  FETCH_CLASS_FAIL,
  FETCH_CLASS_REQUEST,
  FETCH_CLASS_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const createClass = (className, subject, room) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CLASS_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/v1/class/create",
        { className, subject, room },
        config
      );

      dispatch({
        type: CREATE_CLASS_SUCCESS,
        payload: data.message,
      });
    } catch (e) {
      dispatch({
        type: CREATE_CLASS_FAIL,
        payload: e.message,
      });
    }
  };
};

export const fetchClasses = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_CLASS_REQUEST,
      });
      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/v1/class/fetch", config);
      const { joinedClasses, createdClasses } = data.classes;

      dispatch({
        type: FETCH_CLASS_SUCCESS,
        payload: {
          joinedClasses,
          createdClasses,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_CLASS_FAIL,
        payload: err.message,
      });
    }
  };
};
