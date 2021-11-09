import {
  CREATE_CLASS_FAIL,
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
  FETCH_CLASS_FAIL,
  FETCH_CLASS_REQUEST,
  FETCH_CLASS_SUCCESS,
} from "../actions/actionTypes";

const intialClassState = {
  createClassLoading: false,
  fetchClassesLoading: true,
  classDetails: {
    joinedClasses: [],
    createdClasses: [],
  },
};

// export const createClassReducer = (state = intialClassState, action) => {
//   switch (action.type) {

//   }
// };

export const fetchClassesReducer = (state = intialClassState, action) => {
  switch (action.type) {
    case CREATE_CLASS_REQUEST:
      return {
        createClassLoading: true,
        fetchClassesLoading: state.fetchClassesLoading,
        classDetails: state.classDetails,
      };
    case CREATE_CLASS_SUCCESS:
      return {
        createClassLoading: false,
        fetchClassesLoading: state.fetchClassesLoading,
        classDetails: {
          joinedClasses: state.classDetails.joinedClasses,
          createdClasses: [
            ...state.classDetails.createdClasses,
            action.payload.class,
          ],
        },
      };
    case CREATE_CLASS_FAIL:
      return {
        createClassLoading: true,
        fetchClassesLoading: state.fetchClassesLoading,
        classDetails: state.classDetails,
        error: action.payload,
      };

    case FETCH_CLASS_REQUEST:
      return {
        createClassLoading: state.createClassLoading,
        fetchClassesLoading: true,
        classDetails: state.classDetails,
      };
    case FETCH_CLASS_SUCCESS:
      return {
        createClassLoading: state.createClassLoading,
        fetchClassesLoading: false,
        classDetails: {
          joinedClasses: [
            ...state.classDetails.joinedClasses,
            ...action.payload.joinedClasses,
          ],
          createdClasses: [
            ...state.classDetails.createdClasses,
            ...action.payload.createdClasses,
          ],
        },
      };
    case FETCH_CLASS_FAIL:
      return {
        createClassLoading: state.createClassLoading,
        fetchClassesLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
