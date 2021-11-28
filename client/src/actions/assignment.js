import {
  CREATE_ASSIGNMENT_FAIL,
  CREATE_ASSIGNMENT_REQUEST,
  CREATE_ASSIGNMENT_SUBMISSION_FAIL,
  CREATE_ASSIGNMENT_SUBMISSION_REQUEST,
  CREATE_ASSIGNMENT_SUBMISSION_SUCCESS,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_QUIZ_FAIL,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  DOWNLOAD_ASSIGNMENT_FAIL,
  DOWNLOAD_ASSIGNMENT_REQUEST,
  DOWNLOAD_ASSIGNMENT_SUBMISSION_FAIL,
  DOWNLOAD_ASSIGNMENT_SUBMISSION_REQUEST,
  DOWNLOAD_ASSIGNMENT_SUBMISSION_SUCCESS,
  DOWNLOAD_ASSIGNMENT_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_ASSIGNMENT_FAIL,
  FETCH_ASSIGNMENT_REQUEST,
  FETCH_ASSIGNMENT_SUBMISSIONS_FAIL,
  FETCH_ASSIGNMENT_SUBMISSIONS_REQUEST,
  FETCH_ASSIGNMENT_SUBMISSIONS_SUCCESS,
  FETCH_ASSIGNMENT_SUCCESS,
  FETCH_PENDING_TASKS_FAIL,
  FETCH_PENDING_TASKS_REQUEST,
  FETCH_PENDING_TASKS_SUCCESS,
  FETCH_QUIZ_FAIL,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUBMISSIONS_FAIL,
  FETCH_QUIZ_SUBMISSIONS_REQUEST,
  FETCH_QUIZ_SUBMISSIONS_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FETCH_USERS_ASSIGNMENT_SUBMISSION_FAIL,
  FETCH_USERS_ASSIGNMENT_SUBMISSION_REQUEST,
  FETCH_USERS_ASSIGNMENT_SUBMISSION_SUCCESS,
  FETCH_USERS_QUIZ_SUBMISSION_FAIL,
  FETCH_USERS_QUIZ_SUBMISSION_REQUEST,
  FETCH_USERS_QUIZ_SUBMISSION_SUCCESS,
  GRADE_ASSIGNMENT_FAIL,
  GRADE_ASSIGNMENT_REQUEST,
  GRADE_ASSIGNMENT_SUCCESS,
  SUBMIT_QUIZ_FAIL,
  SUBMIT_QUIZ_REQUEST,
  SUBMIT_QUIZ_SUCCESS,
} from "./actionTypes";
import download from "downloadjs";
import axios from "axios";

const SOME_ERROR_OCCURRED = "Some error occurred";
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

      const { data } = await axios.get(
        `/api/v1/quiz/fetch/all/${classId}`,
        config
      );

      dispatch({
        type: FETCH_ASSIGNMENTS_SUCCESS,
        payload: {
          quizzes: data.data.quizzes,
          assignments: data.data.assignments,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_ASSIGNMENTS_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const fetchPendingTasks = (classId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_PENDING_TASKS_REQUEST,
      });

      const { userInfo } = getState().userDetails;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data: pendingQuizzes } = await axios.get(
        `/api/v1/quiz/fetch/pending/${classId}`,
        config
      );
      const { data: pendingAssignments } = await axios.get(
        `/api/v1/assignment/fetch/pending/${classId}`,
        config
      );
      dispatch({
        type: FETCH_PENDING_TASKS_SUCCESS,
        payload: {
          quizzes: pendingQuizzes.data.pendingQuizzes,
          assignments: pendingAssignments.data.pendingAssignments,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_PENDING_TASKS_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const createQuiz = (classId, questions, title) => {
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

      await axios.post(
        "/api/v1/quiz/create",
        {
          classId,
          title,
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
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
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

      const { data } = await axios.get(`/api/v1/quiz/fetch/${quizId}`, config);
      dispatch({
        type: FETCH_QUIZ_SUCCESS,
        payload: {
          createdBy: data.data.createdBy,
          questions: data.data.questions,
          hasSubmitted: data.data.hasSubmitted,
          submission: data.data.submission.submission
            ? data.data.submission.submission
            : [],
          title: data.data.title,
          totalQuizScore: data.data.totalQuizScore,
          totalUserScore: data.data.totalUserScore,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_QUIZ_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
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
      await axios.post("/api/v1/quiz/submit", postData, config);

      dispatch({
        type: SUBMIT_QUIZ_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SUBMIT_QUIZ_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const fetchQuizSubmissions = (quizId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_QUIZ_SUBMISSIONS_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/quiz/submissions/${quizId}`,
        config
      );

      dispatch({
        type: FETCH_QUIZ_SUBMISSIONS_SUCCESS,
        payload: {
          submissions: data.data.submissions,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_QUIZ_SUBMISSIONS_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
export const fetchAssignmentSubmissions = (assignmentId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_ASSIGNMENT_SUBMISSIONS_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/assignment/submissions/${assignmentId}`,
        config
      );

      dispatch({
        type: FETCH_ASSIGNMENT_SUBMISSIONS_SUCCESS,
        payload: {
          submissions: data.data.submissions,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_ASSIGNMENT_SUBMISSIONS_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const fetchUsersQuizSubmission = (quizId, userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_USERS_QUIZ_SUBMISSION_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/quiz/submission/?quizId=${quizId}&userId=${userId}`,
        config
      );

      dispatch({
        type: FETCH_USERS_QUIZ_SUBMISSION_SUCCESS,
        payload: {
          submission: data.data.submission,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_USERS_QUIZ_SUBMISSION_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const fetchUsersAssignmentSubmission = (assignmentId, userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_USERS_ASSIGNMENT_SUBMISSION_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/assignment/submission/?assignmentId=${assignmentId}&userId=${userId}`,
        config
      );

      dispatch({
        type: FETCH_USERS_ASSIGNMENT_SUBMISSION_SUCCESS,
        payload: {
          submission: data.data.submission,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_USERS_ASSIGNMENT_SUBMISSION_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const fetchAssignment = (assignmentId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_ASSIGNMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/assignment/fetch/${assignmentId}`,
        config
      );

      dispatch({
        type: FETCH_ASSIGNMENT_SUCCESS,
        payload: {
          createdBy: data.data.createdBy,
          assignment: data.data.assignment,
          hasSubmitted: data.data.hasSubmitted,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_ASSIGNMENT_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const createAssignment = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ASSIGNMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post("/api/v1/assignment/create", formData, config);

      dispatch({
        type: CREATE_ASSIGNMENT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: CREATE_ASSIGNMENT_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
export const uploadAssignmentSubmission = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ASSIGNMENT_SUBMISSION_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post("/api/v1/assignment/submit", formData, config);

      dispatch({
        type: CREATE_ASSIGNMENT_SUBMISSION_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: CREATE_ASSIGNMENT_SUBMISSION_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
export const downloadAssignment = (assignmentId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/assignment/getFileExtension/${assignmentId}`,
        config
      );
      const res = await axios.get(
        `/api/v1/assignment/download/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          responseType: "blob",
        }
      );
      const fileExtension = data.data.fileExtension;
      download(new Blob([res.data]), `Assignment${fileExtension}`);
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
export const downloadAssignmentSubmission = (assignmentId, userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_SUBMISSION_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/assignment/submission/getFileExtension/${assignmentId}?${
          userId && `userId=${userId}`
        }`,
        config
      );
      const res = await axios.get(
        `/api/v1/assignment/submission/download/${assignmentId}?${
          userId && `userId=${userId}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          responseType: "blob",
        }
      );
      const fileExtension = data.data.fileExtension;
      download(new Blob([res.data]), `Submission${fileExtension}`);
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_SUBMISSION_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: DOWNLOAD_ASSIGNMENT_SUBMISSION_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};

export const gradeAssignment = (assignmentId, userId, grade) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GRADE_ASSIGNMENT_REQUEST,
      });

      const { userInfo } = getState().userDetails;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        "/api/v1/assignment/grade",
        {
          assignmentId,
          userId,
          grade,
        },
        config
      );

      dispatch({
        type: GRADE_ASSIGNMENT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: GRADE_ASSIGNMENT_FAIL,
        payload: err.response ? err.response.data : SOME_ERROR_OCCURRED,
      });
    }
  };
};
