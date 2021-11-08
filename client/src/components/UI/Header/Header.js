import React from "react";
import Button from "../Button/Button";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <div>
        <h3>classroom</h3>
      </div>
      <div>
        <Button text="Login" />
        <Button text="Signup" />
      </div>
    </header>
  );
};

export default Header;
