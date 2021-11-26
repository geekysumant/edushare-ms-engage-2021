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
} from "../actions/actionTypes";

const initialAssignmentState = {
  loading: false,
  quizzes: [],
  assignments: [],
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
        assignments: [...action.payload.assignments],
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
        title: action.payload.title,
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

const initialFetchQuizSubmissionsState = {
  submissions: [],
};

export const fetchQuizSubmissionsReducer = (
  state = initialFetchQuizSubmissionsState,
  action
) => {
  switch (action.type) {
    case FETCH_QUIZ_SUBMISSIONS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_QUIZ_SUBMISSIONS_SUCCESS:
      return {
        loading: false,
        submissions: action.payload.submissions,
      };
    case FETCH_QUIZ_SUBMISSIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialFetchAssignmentSubmissionsState = {
  submissions: [],
};

export const fetchAssignmentSubmissionsReducer = (
  state = initialFetchAssignmentSubmissionsState,
  action
) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT_SUBMISSIONS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ASSIGNMENT_SUBMISSIONS_SUCCESS:
      return {
        loading: false,
        submissions: action.payload.submissions,
      };
    case FETCH_ASSIGNMENT_SUBMISSIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
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

const initialFetchUserAssignmentSubmissionState = {
  submission: {},
};

export const fetchUsersAssignmentSubmissionReducer = (
  state = initialFetchUserAssignmentSubmissionState,
  action
) => {
  switch (action.type) {
    case FETCH_USERS_ASSIGNMENT_SUBMISSION_REQUEST:
      return {
        loading: true,
      };
    case FETCH_USERS_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        loading: false,
        submission: action.payload.submission,
      };
    case FETCH_USERS_ASSIGNMENT_SUBMISSION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialCreateAssignmentState = {
  loading: false,
  success: false,
};
export const createAssignmentReducer = (
  state = initialCreateAssignmentState,
  action
) => {
  switch (action.type) {
    case CREATE_ASSIGNMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_ASSIGNMENT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialFetchAssignmentState = {
  assignment: [],
  createdBy: "",
};
export const fetchAssignmentReducer = (
  state = initialFetchAssignmentState,
  action
) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        assignment: action.payload.assignment,
        createdBy: action.payload.createdBy,
        hasSubmitted: action.payload.hasSubmitted,
      };
    case FETCH_ASSIGNMENT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialAssignmentSubmissionUploadState = {
  success: false,
};
export const createAssignmentSubmissionReducer = (
  state = initialAssignmentSubmissionUploadState,
  action
) => {
  switch (action.type) {
    case CREATE_ASSIGNMENT_SUBMISSION_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case CREATE_ASSIGNMENT_SUBMISSION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const intitalDownloadAssignmentState = {
  loading: false,
  success: false,
};

export const downloadAssignmentReducer = (
  state = intitalDownloadAssignmentState,
  action
) => {
  switch (action.type) {
    case DOWNLOAD_ASSIGNMENT_REQUEST:
      return {
        loading: true,
      };
    case DOWNLOAD_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DOWNLOAD_ASSIGNMENT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const intitalDownloadAssignmentSubmissionState = {
  loading: false,
  success: false,
};

export const downloadAssignmentSubmissionReducer = (
  state = intitalDownloadAssignmentSubmissionState,
  action
) => {
  switch (action.type) {
    case DOWNLOAD_ASSIGNMENT_SUBMISSION_REQUEST:
      return {
        loading: true,
      };
    case DOWNLOAD_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DOWNLOAD_ASSIGNMENT_SUBMISSION_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialGradeAssignmentState = {
  loading: false,
};
export const gradeAssignmentReducer = (
  state = initialGradeAssignmentState,
  action
) => {
  switch (action.type) {
    case GRADE_ASSIGNMENT_REQUEST:
      return {
        loading: true,
      };
    case GRADE_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GRADE_ASSIGNMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialPendingTasksState = {
  loading: true,
  quizzes: [],
  assignments: [],
};

export const fetchPendingTasksReducer = (
  state = initialPendingTasksState,
  action
) => {
  switch (action.type) {
    case FETCH_PENDING_TASKS_REQUEST:
      return {
        loading: true,
        quizzes: [],
        assignments: [],
      };
    case FETCH_PENDING_TASKS_SUCCESS:
      return {
        loading: false,
        success: true,
        quizzes: [...action.payload.quizzes],
        assignments: [...action.payload.assignments],
      };
    case FETCH_PENDING_TASKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
