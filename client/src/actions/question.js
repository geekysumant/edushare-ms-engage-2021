import { ADD_QUESTION } from "./actionTypes";

export const addQuestion = (classId, question) => {
  return (dispatch, getState) => {
    const payload = getState().allQuestions.questionsCollection;
    if (payload.length == 0) {
      payload[0] = [
        {
          classId,
          question,
        },
      ];
    } else {
      for (let i = 0; i < payload.length; i++) {
        if (payload[i].classId === classId) {
          payload[i] = {
            classId,
            questions: [...payload[i].questions, question],
          };
          break;
        }
      }
    }
    dispatch({
      type: ADD_QUESTION,
      payload,
    });
  };
};
