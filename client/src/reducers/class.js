import {
  CREATE_CLASS_FAIL,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
  FETCH_CLASS_DETAILS_FAIL,
  FETCH_CLASS_DETAILS_REQUEST,
  FETCH_CLASS_DETAILS_SUCCESS,
  FETCH_CLASS_FAIL,
  FETCH_CLASS_REQUEST,
  FETCH_CLASS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  JOIN_CLASS_FAIL,
  JOIN_CLASS_REQUEST,
  JOIN_CLASS_SUCCESS,
} from "../actions/actionTypes";

//Reducer Name: createClassReducer
//DESC: This reducer manages the state of create class request
const initialCreateClassState = {
  loading: false,
  success: false,
};
export const createClassReducer = (state = initialCreateClassState, action) => {
  switch (action.type) {
    case CREATE_CLASS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case CREATE_CLASS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_CLASS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const intialClassState = {
  loading: false,
  // joinedClasses: [],
  // createdClasses: [],
};

export const fetchClassesReducer = (state = intialClassState, action) => {
  switch (action.type) {
    case FETCH_CLASS_REQUEST:
      return {
        loading: true,
        // joinedClasses: [...state.joinedClasses],
        // createdClasses: [...state.createdClasses],
      };
    case FETCH_CLASS_SUCCESS:
      return {
        loading: false,
        joinedClasses: [
          ...action.payload.joinedClasses,
          // ...state.joinedClasses,
        ],
        createdClasses: [
          ...action.payload.createdClasses,
          // ...state.createdClasses,
        ],
      };
    case FETCH_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialJoinClassState = {
  loading: false,
  success: false,
};

//Reducer Name: joinClassReducer
//DESC: This reducer manages the state of join class request
export const joinClassReducer = (state = initialJoinClassState, action) => {
  switch (action.type) {
    case JOIN_CLASS_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case JOIN_CLASS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case JOIN_CLASS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialEnterClassState = {
  //posts and announcements

  createdBy: "",
};

export const fetchEnterClassDetailsReducer = (
  state = initialEnterClassState,
  action
) => {
  switch (action.type) {
    case FETCH_CLASS_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_CLASS_DETAILS_SUCCESS:
      return {
        loading: false,
        createdBy: action.payload.createdBy,
        room: action.payload.room,
        subject: action.payload.subject,
        className: action.payload.className,
      };
    case FETCH_CLASS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialFetchUsersState = {
  loading: false,
  usersInClass: [],
  createdBy: {},
};

export const fetchUsersInClassReducer = (
  state = initialFetchUsersState,
  action
) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        success: true,
        usersInClass: [...action.payload.usersInClass],
        createdBy: action.payload.createdBy,
      };
    case FETCH_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
