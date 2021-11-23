import React, { useEffect } from "react";
import classes from "./Header.module.css";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../actions/user";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import MonitorIcon from "@mui/icons-material/Monitor";
import GoogleIcon from "@mui/icons-material/Google";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeScreenSVG from "../../../assets/svg/home_screen.svg";
import GradingIcon from "@mui/icons-material/Grading";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Spinner from "../Spinner";
import Alert from "../Alert";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { isAuthenticated, userInfo, loading, error } = userDetails;

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const onSuccessHandler = (res) => {
    console.log(res);
    dispatch(userLogin(res.tokenId));
  };

  return (
    <>
      <div className="relative w-full mx-auto bg-haikei shadow-xl  rounded p-4 h-screen bg-cover flex flex-row justify-between sm:w-full">
        <header className=" h-16 fixed left-0 top-0 bg-white shadow-lg flex w-full justify-between items-center sm:h-32">
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
          <div className="px-4">
            {loading ? (
              <Spinner />
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                // buttonText="Sign in with Google"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign in with Google
                  </GoogleButton>
                )}
                onSuccess={onSuccessHandler}
                cookiePolicy={"single_host_origin"}
                style={{
                  color: "red",
                }}
              />
            )}
          </div>
          {/* <div className="flex flex-row sm:flex-col items-center z-10"></div> */}
        </header>

        <div
          className="flex justify-between my-16 w-full items-center sm:flex-col"
          style={{
            fontFamily: ["Poppins", "sans-serif"],
          }}
        >
          <div>
            <div className="font-extrabold text-5xl my-2">
              Managing classrooms{" "}
            </div>
            <div className="font-extrabold text-5xl my-2">made easy with </div>
            <div className="text-white font-extrabold text-5xl my-2">
              edushare
            </div>
          </div>
          <div className="w-1/2 sm:w-full">
            <img src={HomeScreenSVG} />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-between w-11/12 mx-auto my-8"
        style={{
          fontFamily: ["Sen", "sans-serif"],
        }}
      >
        <div className="text-4xl font-extrabold">
          <h1
            className="my-8"
            style={{
              color: "#4c4c4c",
            }}
          >
            All features at one place
          </h1>
        </div>
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="flex mx-4 w-72 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-blue-600 text-white text-center text-xl flex items-center justify-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <MonitorIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4 ">
                <h1 className="text-xl font-extrabold">
                  Peer to Peer Video call
                </h1>
                <p className="text-xs break-normal break-words">
                  Create and share video meets with your class easily
                </p>
              </div>
            </div>

            <div className="flex mx-4 w-80 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-red-600 text-white text-center text-xl flex items-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <GoogleIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-extrabold">
                  Google Based Authentication
                </h1>
                <p className="text-xs break-normal break-words">
                  No hassles of remembering your passwords. Sign in easily with
                  your Google account
                </p>
              </div>
            </div>

            <div className="flex mx-4 w-80 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-yellow-600 text-white text-center text-xl flex items-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <PeopleAltIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-extrabold">View Submissions</h1>
                <p className="text-xs break-normal break-words">
                  As an instructor view all submissions made on your MCQ Quiz or
                  assignment
                </p>
              </div>
            </div>

            <div className="flex mx-4 w-80 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-green-400 text-white text-center text-xl flex items-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <GradingIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-extrabold">
                  Create MCQ Quizzes easily and auto-grade them
                </h1>
                <p className="text-xs break-normal break-words">
                  No need of going through all MCQ submissions. Our auto-grader
                  runs on each submission and grades them
                </p>
              </div>
            </div>

            <div className="flex mx-4 w-80 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-pink-400 text-white text-center text-xl flex items-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <FolderSharedIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-extrabold">
                  Share files and assignments
                </h1>
                <p className="text-xs break-normal break-words">
                  Create and upload file based assignments, also allowing the
                  instructor to view all students' submissions and grade them
                  easily
                </p>
              </div>
            </div>

            <div className="flex mx-4 w-80 m-4 sm:w-11/12 sm:mx-auto my-8">
              <div className="rounded-full w-12 h-12 bg-yellow-400 text-white text-center text-xl flex items-center">
                <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                  <SchoolIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <h1 className="text-xl font-extrabold">
                  Create or Join Classroom
                </h1>
                <p className="text-xs break-normal break-words">
                  Depending on who you are, you can create or join as many
                  classrooms as you want
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-between w-11/12 mx-auto "
        style={{
          fontFamily: ["Sen", "sans-serif"],
        }}
      >
        <div className="text-4xl font-extrabold">
          <h1
            className="my-8"
            style={{
              color: "#4c4c4c",
            }}
          >
            Meet the Developer
          </h1>
        </div>

        <div className="flex ">
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-extrabold flex items-center mx-4">
              Sumant Pathak
              <span className="mx-4">
                <a href="https://www.linkedin.com/in/geekysumant/">
                  <LinkedInIcon
                    className="mx-4 text-xl cursor-pointer "
                    style={{
                      fontSize: "2rem",
                      color: "#0a66c2",
                    }}
                  />
                </a>

                <a href="https://github.com/geekysumant">
                  <GitHubIcon
                    className="mx-auto text-xl cursor-pointer"
                    style={{
                      fontSize: "2rem",
                      color: "black",
                    }}
                  />
                </a>
              </span>
            </div>
            <div className="flex sm:flex-col mt-8">
              {/* <div className="flex  mx-2">
                <div className="flex">
                  {"img   "}
                  <h1>feature</h1>
                </div>
              </div> */}

              <div className="flex mx-4 w-64 m-4">
                <div className="rounded-full w-12 h-12 bg-blue-600 text-white text-center text-xl flex items-center">
                  <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                    <LanguageIcon
                      className="mx-auto text-lg cursor-pointer"
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                </div>

                <h1 className="text-lg font-extrabold flex items-center ml-2">
                  Full Stack Developer
                </h1>
              </div>

              <div className="flex mx-4 w-64 m-4">
                <div className="rounded-full w-12 h-12 bg-yellow-400 text-white text-center text-xl flex items-center">
                  <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                    <CodeIcon
                      className="mx-auto text-xl cursor-pointer"
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                </div>

                <h1 className="text-lg font-extrabold flex items-center ml-2">
                  Competitive Programmer
                </h1>
              </div>

              <div className="flex mx-4 w-64 m-4">
                <div className="rounded-full w-12 h-12 bg-green-300 text-white text-center text-xl flex items-center">
                  <div className="rounded-full w-12 h-12  text-center text-xl flex items-center">
                    <MusicNoteIcon
                      className="mx-auto text-xl cursor-pointer"
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                </div>

                <h1 className="text-lg font-extrabold flex items-center ml-2">
                  Guitar Hobbyist
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
