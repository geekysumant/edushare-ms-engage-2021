import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const HeaderClass = () => {
  const location = useLocation();
  const urlParams = useParams();
  const urlPath = location.pathname;

  const classId = urlPath.split("/")[3];
  return (
    <header className="flex flex-row justify-between p-4">
      <div>
        <Link to="/home">edushare</Link>
      </div>
      <div className="flex flex-row justify-between">
        <NavLink className="mx-4" to={`enter/class/${classId}`}>
          Feed
        </NavLink>
        <NavLink className="mx-4" to={`enter/class/${classId}/classwork`}>
          Classwork
        </NavLink>
        <NavLink className="mx-4" to={`enter/class/${classId}/people`}>
          People
        </NavLink>
      </div>
    </header>
  );
};

export default HeaderClass;
