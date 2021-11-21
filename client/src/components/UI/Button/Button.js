import React from "react";
import classes from "./Button.module.css";

const Button = ({ text, setShowJoinClass, setShowCreateClass, color }) => {
  return (
    <button className={`${classes.Btn} border  border-${color}-500 `}>
      {text}{" "}
    </button>
  );
};

export default Button;
