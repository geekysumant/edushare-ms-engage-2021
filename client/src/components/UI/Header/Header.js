import React from "react";
import Button from "../Button/Button";
import classes from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userDetails);

  const createClassHandler = () => {
    console.log("creating class");
  };
  const joinClassHandler = () => {
    console.log("joining class");
  };
  const userNotLoggedInBtns = (
    <React.Fragment>
      <Button text="Login" />
      <Button text="Signup" />
    </React.Fragment>
  );
  const userLoggedInBtns = (
    <React.Fragment>
      <Button text="Create class" onClick={createClassHandler} />
      <Button text="Join class" onClick={joinClassHandler} />
    </React.Fragment>
  );
  return (
    <header className={classes.Header}>
      <div>
        <h3>classroom</h3>
      </div>
      <div>{userInfo ? userLoggedInBtns : userNotLoggedInBtns}</div>
    </header>
  );
};

export default Header;
