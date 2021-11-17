import React, { useEffect } from "react";
import Button from "../Button/Button";
import classes from "./Header.module.css";
import { GoogleLogin } from "react-google-login";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../actions/user";
import { useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { isAuthenticated, userInfo, loading, error } = userDetails;

  const createClassHandler = () => {
    console.log("creating class");
  };
  const joinClassHandler = () => {
    console.log("joining class");
  };
  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/home");
    }
  }, [isAuthenticated]);
  const onSuccessHandler = (res) => {
    dispatch(userLogin(res.tokenId));
  };
  const userNotLoggedInBtns = (
    <React.Fragment>
      <GoogleLogin
        clientId="415689367589-nisg4jqf33c0c48rdq67np63d0m5gujk.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onSuccessHandler}
        cookiePolicy={"single_host_origin"}
      />
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
