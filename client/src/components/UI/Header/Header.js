import React, { useEffect } from "react";
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
    <header className="flex w-11/12 justify-between items-center p-4">
      <div>
        <h3>classroom</h3>
      </div>
      <div display="flex">
        <div> {userNotLoggedInBtns}</div>
        {/* <div> Home</div>
        <div> Features</div>
        <div> Contact Us</div> */}
      </div>
    </header>
  );
};

export default Header;
