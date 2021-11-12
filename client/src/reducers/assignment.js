import {
  CREATE_QUIZ_FAIL,
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  FETCH_ASSIGNMENTS_FAIL,
  FETCH_ASSIGNMENTS_REQUEST,
  FETCH_ASSIGNMENTS_SUCCESS,
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
  }
};
