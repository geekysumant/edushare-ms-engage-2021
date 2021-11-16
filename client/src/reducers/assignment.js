import {
  CREATE_QUIZ_FAIL,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
  FETCH_QUIZ_FAIL,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_SUBMISSIONS_FAIL,
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_USERS_QUIZ_SUBMISSION_FAIL,
  FETCH_USERS_QUIZ_SUBMISSION_REQUEST,
  FETCH_USERS_QUIZ_SUBMISSION_SUCCESS,
  SUBMIT_QUIZ_FAIL,
  SUBMIT_QUIZ_REQUEST,
  SUBMIT_QUIZ_SUCCESS,
} from "../actions/actionTypes";

const initialAssignmentState = {
  loading: true,
  quizzes: [],
};

export const fetchAssignmentsReducer = (
  state = initialAssignmentState,
  action
) => {
  switch (action.type) {
    case FETCH_ASSIGNMENTS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ASSIGNMENTS_SUCCESS:
      return {
        loading: false,
        quizzes: [...action.payload.quizzes],
      };
    case FETCH_ASSIGNMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialCreateQuizState = {
  loading: false,
  success: false,
};
export const createQuizReducer = (state = initialCreateQuizState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_REQUEST:
      return {
        loading: true,
      };
    case CREATE_QUIZ_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_QUIZ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialFetchQuizState = {
  questions: [],
  createdBy: "",
};

export const fetchQuizReducer = (state = initialFetchQuizState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return {
        loading: true,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        loading: false,
        questions: [...action.payload.questions],
        createdBy: action.payload.createdBy,
        hasSubmitted: action.payload.hasSubmitted,
        submission: [...action.payload.submission],
        totalQuizScore: action.payload.totalQuizScore,
        totalUserScore: action.payload.totalUserScore,
      };
    case FETCH_QUIZ_FAIL:
      return {
        loading: false,
        questions: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialSubmitQuizState = {
  loading: false,
};

export const submitQuizReducer = (state = initialSubmitQuizState, action) => {
  switch (action.type) {
    case SUBMIT_QUIZ_REQUEST:
      return {
        loading: true,
      };
    case SUBMIT_QUIZ_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SUBMIT_QUIZ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialFetchSubmissionsState = {
  submissions: [],
};

export const fetchSubmissionsReducer = (
  state = initialFetchSubmissionsState,
  action
) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_SUBMISSIONS_SUCCESS:
      return {
        loading: false,
        submissions: action.payload.submissions,
      };
    case FETCH_SUBMISSIONS_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const initialFetchUserQuizSubmissionState = {
  submission: {},
};

export const fetchUsersQuizSubmissionReducer = (
  state = initialFetchUserQuizSubmissionState,
  action
) => {
  switch (action.type) {
    case FETCH_USERS_QUIZ_SUBMISSION_REQUEST:
      return {
        loading: true,
      };
    case FETCH_USERS_QUIZ_SUBMISSION_SUCCESS:
      return {
        loading: false,
        submission: action.payload.submission,
      };
    case FETCH_USERS_QUIZ_SUBMISSION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
