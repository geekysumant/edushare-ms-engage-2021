import React from "react";

const Banner = ({
  SVGComponent,
  heading,
  customText,
  bannerBackground,
  textColor,
}) => {
  return (
    <div
      className={`w-11/12 mx-auto bg-${bannerBackground} rounded p-4 h-56 my-6 bg-cover flex flex-row justify-between`}
    >
      <div>
        <h2 className={`text-5xl text-${textColor}-50`}>{heading}</h2>
        <p className={textColor && `text-${textColor}-50`}>{customText}</p>
      </div>
      <div className="w-3/12">
        <img src={SVGComponent} />
      </div>
    </div>
  );
};

export default Banner;
