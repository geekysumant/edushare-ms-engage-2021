import React from "react";

const Input = ({ labelName, type, name }) => {
  return (
    <div className="my-2">
      <label className="block">{labelName}</label>
      <input
        className="w-56 rounded-sm border border-black"
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
