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
} from "../actions/actionTypes";

const initialFetchAnnouncementsState = {
  loading: false,
};

export const fetchAnnouncementsReducer = (
  state = initialFetchAnnouncementsState,
  action
) => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        loading: false,
        announcements: action.payload.announcements,
      };
    case FETCH_ANNOUNCEMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialNewAnnouncementsState = {
  loading: false,
};

export const createNewAnnouncementReducer = (
  state = initialNewAnnouncementsState,
  action
) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_ANNOUNCEMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialDeleteAnnouncememtState = {
  loading: false,
};
export const deleteAnnouncementReducer = (
  state = initialDeleteAnnouncememtState,
  action
) => {
  switch (action.type) {
    case DELETE_ANNOUNCEMENT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_ANNOUNCEMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
};
