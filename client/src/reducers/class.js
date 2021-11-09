import {
  CREATE_CLASS_FAIL,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
} from "../actions/actionTypes";

const initialCreateClassState = {
  loading: false,
  classDetails: [],
};

export const createClassReducer = (state = initialCreateClassState, action) => {
  switch (action.type) {
    case CREATE_CLASS_REQUEST:
      return {
        loading: true,
        classDetails: null,
      };
    case CREATE_CLASS_SUCCESS:
      return {
        loading: false,
        classDetails: [...state.classDetails, action.payload],
      };
    case CREATE_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
