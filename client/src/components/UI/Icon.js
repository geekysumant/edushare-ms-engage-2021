import React from "react";

const Icon = ({ component }) => {
  return (
    <div className="rounded-full w-12 h-12 bg-white text-center text-xl flex items-center">
      {component}
    </div>
  );
};

export default Icon;
