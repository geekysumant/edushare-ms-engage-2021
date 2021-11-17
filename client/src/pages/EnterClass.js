import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { fetchEnterClassDetails } from "../actions/class";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";
import HeaderClass from "../components/UI/HeaderClass";
import Classwork from "./Classwork";
import CreateMcq from "./CreateMcq";
import BannerSVG from "../assets/svg/online_class.svg";

const EnterClass = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const classId = location.pathname.split("/")[3];
    dispatch(fetchEnterClassDetails(classId));
  }, []);

  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading="Welcome"
        // customText=""
      />
      <Announcement />
    </div>
  );
};

export default EnterClass;
