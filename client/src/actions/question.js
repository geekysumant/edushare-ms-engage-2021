import { ADD_QUESTION } from "./actionTypes";

export const addQuestion = (question) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_QUESTION,
      payload: question,
    });
    const { questions } = getState();
    localStorage.setItem("questions", JSON.stringify(questions));
  };
};
