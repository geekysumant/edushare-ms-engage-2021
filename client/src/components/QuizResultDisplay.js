import React from "react";

const QuizResultDisplay = ({
  totalUserScore,
  totalQuizScore,
  questions,
  submission,
}) => {
  console.log(questions);
  return (
    <div>
      <h1>
        Your score: {totalUserScore} out of {totalQuizScore}{" "}
      </h1>
      <div className="flex flex-col items-center w-full">
        {questions &&
          submission &&
          questions.map((question, quesIndex) => (
            <div
              className="bg-white w-1/2 p-2 rounded mt-4 p-4"
              key={quesIndex}
            >
              <div className="flex flex-row justify-between">
                <h3 className="font-semibold text-lg mr-4">
                  <span>
                    Question {quesIndex + 1}
                    {". "}
                    {"  "}
                  </span>
                  <span>{question.question}</span>
                </h3>
              </div>
              <div className="flex justify-between">
                <div className="w-3/4">
                  {question.options &&
                    question.options.map((option, ind) => (
                      <div
                        className={`flex flex-row my-2 ${
                          option.optionNumber == question.correctOption ||
                          (question.correctOption ===
                            submission[quesIndex].option &&
                            option.optionNumber == question.correctOption)
                            ? "border-green-600 border rounded bg-green-100"
                            : option.optionNumber ===
                                submission[quesIndex].option &&
                              "border-red-600 border rounded bg-red-100"
                        }`}
                      >
                        <div>
                          <span>
                            Option {option.optionNumber}
                            {". "}
                            {"  "}
                          </span>
                          <span>{option.option}</span>
                        </div>
                      </div>
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
      </div>
    </div>
  );
};

export default QuizResultDisplay;
