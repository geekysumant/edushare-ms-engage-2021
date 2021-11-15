import {
  CREATE_QUIZ_FAIL,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_CLASS_DETAILS_SUCCESS,
  FETCH_QUIZ_FAIL,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  SUBMIT_QUIZ_FAIL,
  SUBMIT_QUIZ_REQUEST,
  SUBMIT_QUIZ_SUCCESS,
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
      dispatch({
        type: FETCH_CLASS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_ASSIGNMENTS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const createQuiz = (classId, questions) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_QUIZ_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/v1/quiz/create",
        {
          classId,
          questions,
        },
        config
      );

      dispatch({
        type: CREATE_QUIZ_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: CREATE_QUIZ_FAIL,
        payload: err.message,
      });
    }
  };
};

export const fetchQuiz = (quizId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_QUIZ_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/quiz/fetch/quiz/${quizId}`,
        config
      );
      console.log(data);
      dispatch({
        type: FETCH_QUIZ_SUCCESS,
        payload: {
          createdBy: data.data.createdBy,
          questions: data.data.questions,
          hasSubmitted: data.data.hasSubmitted,
          submission: data.data.submission.submission
            ? data.data.submission.submission
            : [],
          totalQuizScore: data.data.totalQuizScore,
          totalUserScore: data.data.totalUserScore,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_QUIZ_FAIL,
        payload: err.message,
      });
    }
  };
};

export const submitQuiz = (quizId, submission) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBMIT_QUIZ_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const postData = {
        quizId,
        submission,
      };
      const { data } = await axios.post(
        "/api/v1/quiz/submit",
        postData,
        config
      );

      dispatch({
        type: SUBMIT_QUIZ_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SUBMIT_QUIZ_FAIL,
        payload: err.response.data,
      });
    }
  };
};
