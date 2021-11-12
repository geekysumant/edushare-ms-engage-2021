import {
  FETCH_ASSIGNMENTS_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
} from "./actionTypes";

import axios from "axios";

export const fetchAssignments = (classId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_ASSIGNMENTS_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //dummy : now only just fetching quizzes
      const { data } = await axios.get(`/api/v1/quiz/fetch/${classId}`, config);

      console.log(data);

      dispatch({
        type: FETCH_ASSIGNMENTS_SUCCESS,
        payload: data.quizzes,
      });
    } catch (err) {
      dispatch({
        type: FETCH_ASSIGNMENTS_FAIL,
        payload: err.message,
      });
    }
  };
};
