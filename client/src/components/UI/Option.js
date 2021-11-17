import React from "react";

const Option = ({ optionNumber, optionDesc, questionNumber }) => {
  return (
    <label className="my-2 block flex items-center">
      <input
        className="w-4 h-4"
        name={`optionSelect-${questionNumber}`}
        type="radio"
        value={optionNumber}
      />
      <span className="mx-4">Option {optionNumber}.</span>
      <span>{optionDesc}</span>
    </label>
  );
};

export default Option;
