import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { fetchEnterClassDetails } from "../actions/class";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";
import HeaderClass from "../components/UI/HeaderClass";
import Classwork from "./Classwork";
import CreateMcq from "./CreateMcq";
import BannerSVG from "../assets/svg/online_class.svg";
import Button from "@material-tailwind/react/Button";
import { v1 as uuid } from "uuid";

const EnterClass = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const classId = location.pathname.split("/")[3];
    dispatch(fetchEnterClassDetails(classId));
  }, []);

  const joinMeetScreen = () => {
    const rooomId = uuid();
    navigate("/join/meet");
  };
  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading="Welcome"
        // customText=""
      />
      <div className="flex flex-row justify-between items-center">
        <Button
          color="green"
          ripple="light"
          onClick={joinMeetScreen}
          className="ml-16"
        >
          Join class
        </Button>
        <Announcement />
      </div>
    </div>
  );
};

export default EnterClass;
