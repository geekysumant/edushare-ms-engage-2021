import {
  CREATE_CLASS_FAIL,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
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
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: CREATE_CLASS_FAIL,
        payload: e.message,
      });
    }
  };
};
