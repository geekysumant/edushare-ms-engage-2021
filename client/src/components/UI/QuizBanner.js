import React from "react";

const QuizBanner = ({ questions }) => {
  return (
    <div className="bg-red-400 h-32">
      <h2>Quiz name</h2>
      <p>Total questions: {questions.length}</p>
    </div>
  );
};

export default QuizBanner;
