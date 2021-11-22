import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_VIDEO_REQUEST,
  USER_VIDEO_SUCCESS,
  USER_VIDEO_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../actions/actionTypes";

const loginInitialState = {
  isAuthenticated: false,
  loading: false,
  userInfo: null,
};

export const userLogin = (state = loginInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialUserVideoState = {
  loading: false,
};

export const userVideoReducer = (state = initialUserVideoState, action) => {
  switch (action.type) {
    case USER_VIDEO_REQUEST:
      return {
        loading: true,
      };

    case USER_VIDEO_SUCCESS:
      return {
        loading: false,
        stream: action.payload,
      };
    case USER_VIDEO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const logoutInitialState = {
  isAuthenticated: false,
  loading: false,
  userInfo: null,
};

export const userLogoutReducer = (state = logoutInitialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
