import React from "react";
import QuestionSVG from "../../assets/svg/question.svg";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto bg-cheese rounded p-4 h-48 my-6 bg-cover flex flex-row justify-between">
      <div>
        <h2 className="text-5xl">Class Name</h2>
        <p>Compile your questions, and distribute with your class easily</p>
      </div>
      <div className="w-3/12">
        <img src={QuestionSVG} />
      </div>
    </div>
  );
};

export default Banner;
