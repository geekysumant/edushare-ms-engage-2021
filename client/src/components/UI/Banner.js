import React from "react";
import QuestionSVG from "../../assets/svg/question.svg";

const Banner = ({ SVGComponent, heading, customText, bannerBackground }) => {
  return (
    <div
      className={`w-11/12 mx-auto bg-${bannerBackground} rounded p-4 h-48 my-6 bg-cover flex flex-row justify-between`}
    >
      <div>
        <h2 className="text-5xl">{heading}</h2>
        <p>{customText}</p>
      </div>
      <div className="w-3/12">
        <img src={SVGComponent} />
      </div>
    </div>
  );
};

export default Banner;
