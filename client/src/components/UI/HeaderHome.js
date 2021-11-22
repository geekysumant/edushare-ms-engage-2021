import Button from "@material-tailwind/react/Button";
import React, { useState } from "react";
import CreateClassForm from "../CreateClassForm";
import JoinClassForm from "../JoinClassForm";
import Modal from "../Modal";
// import Button from "./Button/Button";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/user";
import Spinner from "./Spinner";

const HeaderHome = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userLogout);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <header className="p-4 h-16 bg-white shadow-lg flex w-full justify-between items-center sm:h-32">
        <div className="ml-8 flex flex-row items-center sm:flex-col">
          <img
            className="mr-2"
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-online-class-online-learning-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          />
          <p
            className="text-lg font-bold  "
            style={{
              fontFamily: ["Montserrat", "sans-serif"],
            }}
          >
            edushare
          </p>
        </div>
        <div className="flex flex-row sm:flex-col items-center">
          <Button
            color="green"
            ripple="light"
            size="sm"
            onClick={(e) => setShowCreateClass(true)}
            buttonType="outline"
            className="p-0 h-8"
          >
            Create class
          </Button>
          <Button
            color="green"
            ripple="light"
            size="sm"
            onClick={(e) => setShowJoinClass(true)}
            buttonType="outline"
            className="p-0 h-8 mx-2 sm:my-2"
          >
            Join class
          </Button>

          {/* <GoogleLogout
            clientId="415689367589-nisg4jqf33c0c48rdq67np63d0m5gujk.apps.googleusercontent.com"
            buttonText="Logout"
            // onLogoutSuccess={logout}
          ></GoogleLogout> */}

          {loading ? (
            <Spinner />
          ) : (
            <Button
              color="blue"
              ripple="light"
              size="sm"
              onClick={logoutHandler}
              // buttonType="outline"
              className="p-0 h-8 mx-2 sm:my-2"
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      <CreateClassForm
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      />
      <JoinClassForm
        showJoinClass={showJoinClass}
        setShowJoinClass={setShowJoinClass}
      />
      {/* <Modal
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      /> */}
    </>
  );
};

export default HeaderHome;
