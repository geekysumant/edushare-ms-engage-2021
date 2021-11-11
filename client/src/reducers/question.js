import { ADD_QUESTION } from "../actions/actionTypes";

const initialQuestionsState = {
  questions: [],
  totalMarks: 0,
};

export const addQuestionReducer = (state = initialQuestionsState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        questions: [...state.questions, action.payload],
        totalMarks: state.totalMarks + action.payload.correctMarks,
      };
    default:
      return state;
  }
};
