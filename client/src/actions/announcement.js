import axios from "axios";
import {
  CREATE_ANNOUNCEMENT_FAIL,
  CREATE_ANNOUNCEMENT_REQUEST,
  CREATE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  DELETE_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_SUCCESS,
  FETCH_ANNOUNCEMENTS_FAIL,
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
} from "./actionTypes";

const SOME_ERROR_OCCURRED = "Some error occurred";

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
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
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
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const deleteAnnouncement = (announcementId, classId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_ANNOUNCEMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `/api/v1/announcement/delete/${announcementId}`,
        config
      );

      dispatch({
        type: DELETE_ANNOUNCEMENT_SUCCESS,
      });
      dispatch(fetchAnnouncements(classId));
    } catch (err) {
      dispatch({
        type: DELETE_ANNOUNCEMENT_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
