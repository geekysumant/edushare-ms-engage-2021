import React from "react";
import { useParams } from "react-router";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";
import HeaderClass from "../components/UI/HeaderClass";
import Classwork from "./Classwork";
import CreateMcq from "./CreateMcq";

const EnterClass = () => {
  const urlParams = useParams();

  return (
    <div>
      <Banner />
      <Announcement />
    </div>
  );
};

export default EnterClass;
