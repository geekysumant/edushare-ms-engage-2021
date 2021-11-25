import axios from "axios";
import {
  CREATE_ANNOUNCEMENT_FAIL,
  CREATE_ANNOUNCEMENT_REQUEST,
  CREATE_ANNOUNCEMENT_SUCCESS,
  FETCH_ANNOUNCEMENTS_FAIL,
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
} from "./actionTypes";

export const fetchAnnouncements = (classId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_ANNOUNCEMENTS_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/announcement/fetch/${classId}`,
        config
      );

      dispatch({
        type: FETCH_ANNOUNCEMENTS_SUCCESS,
        payload: {
          announcements: data.data.announcements,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_ANNOUNCEMENTS_FAIL,
        payload: err.response.data,
      });
    }
  };
};

export const createAnnouncement = (classId, content) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ANNOUNCEMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/v1/announcement/create/${classId}`,
        {
          content,
        },
        config
      );

      dispatch({
        type: CREATE_ANNOUNCEMENT_SUCCESS,
      });
      dispatch(fetchAnnouncements(classId));
    } catch (err) {
      dispatch({
        type: CREATE_ANNOUNCEMENT_FAIL,
        payload: err.response.data,
      });
    }
  };
};
