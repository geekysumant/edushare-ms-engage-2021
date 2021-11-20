import React from "react";
import Option from "./UI/Option";

const DisplayQuiz = ({ questions, setUserSubmission, userSubmission }) => {
  const optionSelectHandler = (e, questionNumber) => {
    const newSubmission = [...userSubmission];
    newSubmission[questionNumber] = e.target.value;
    setUserSubmission([...newSubmission]);
  };
  return (
    <form className="flex justify-center flex-col items-center w-full">
      {questions.map((question, index) => (
        <div
          className="bg-white w-1/2 p-2 rounded mt-4 p-4 sm:w-full"
          key={index}
        >
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-lg mr-4">
              <span>
                Question {index + 1}
                {". "}
                {"  "}
              </span>
              <span>{question.question}</span>
            </h3>
          </div>
          <div
            className="flex justify-between"
            onChange={(e) => optionSelectHandler(e, index)}
          >
            <div>
              {question.options.map((option) => (
                <Option
                  key={option.optionNumber}
                  optionNumber={option.optionNumber}
                  optionDesc={option.option}
                  questionNumber={index}
                />
              ))}
            </div>
            <h3>
              <span className="text-lg text-green-500">
                +{question.correctMarks}
              </span>
              <span className="text-lg ">{" / "}</span>
              <span className="text-lg text-red-500">
                {question.incorrectMarks}
              </span>
            </h3>
          </div>
        </div>
      ))}
    </form>
  );
};

export default DisplayQuiz;
