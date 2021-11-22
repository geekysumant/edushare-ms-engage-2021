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
  const { isAuthenticated, userInfo } = userDetails;

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/home");
    }
    console.log(process.env);
  }, [isAuthenticated, navigate]);
  const onSuccessHandler = (res) => {
    console.log(res);
    dispatch(userLogin(res.tokenId));
  };
  const userNotLoggedInBtns = (
    <React.Fragment>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={onSuccessHandler}
        cookiePolicy={"single_host_origin"}
      />
    </React.Fragment>
  );
  return (
    <header className={classes.Header}>
      <div>
        <h3>classroom</h3>
      </div>
      <div> {userNotLoggedInBtns}</div>
    </header>
  );
};

export default Header;
