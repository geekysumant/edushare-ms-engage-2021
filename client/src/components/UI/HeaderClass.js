import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

const HeaderClass = () => {
  const location = useLocation();
  const urlParams = useParams();
  const urlPath = location.pathname;

  const classId = urlPath.split("/")[3];
  return (
    <header className="flex flex-row justify-between p-4">
      <div>edushare</div>
      <div className="flex flex-row ">
        <NavLink to={`enter/class/${classId}`}>Feed</NavLink>
        <NavLink to={`enter/class/${classId}/classwork`}>Classwork</NavLink>
        <NavLink to={`enter/class/${classId}/people`}>People</NavLink>
      </div>
    </header>
  );
};

export default HeaderClass;
