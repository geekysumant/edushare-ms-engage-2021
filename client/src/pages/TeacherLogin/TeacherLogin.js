import React, { useEffect, useState } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./TeacherLogin.module.css";
import { USER_LOGIN_REQUEST } from "../../actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../actions/user";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import OnlineClass from "../../assets/svg/online_learning.svg";

const TeacherLogin = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, userInfo, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin());
    console.log(error.message);
  };
  const onSuccessHandler = (res) => {
    console.log(res);
    console.log(props);
    dispatch(userLogin(res.tokenId));
  };
  return (
    <section className="container p-4 flex flex-row justify-between bg-cheese bg-cover xl:w-full md:w-full sm:w-full lg:flex-col lg:align-center">
      <div className="lg:w-6/12">
        <img className="xl:w-8/12" src={OnlineClass} />
      </div>
      <div className="bg-pink-100 p-4 rounded-md">
        <form className="flex flex-col justify-center h-full">
          <Input labelName="Email" type="email" name="email" />
          <Input labelName="Password" type="password" name="password" />
          {!loading && (
            <div className="text-center my-2">
              <input
                className="w-20"
                type="submit"
                value="Login"
                onClick={submitFormHandler}
              />
            </div>
          )}
          <div>
            {loading && <p>Loading.....</p>}
            {error && <p>{error.message}</p>}
          </div>

          <h3 className="text-center my-2">OR</h3>
          <GoogleLogin
            clientId="415689367589-nisg4jqf33c0c48rdq67np63d0m5gujk.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={onSuccessHandler}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
    </section>
  );
};

export default TeacherLogin;
