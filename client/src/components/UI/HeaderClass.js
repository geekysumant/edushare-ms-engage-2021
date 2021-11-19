import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const HeaderClass = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  const classId = urlPath.split("/")[3];
  return (
    <header className="flex flex-row justify-between  bg-white shadow-xl">
      <div className="mx-4 h-16 flex items-center">
        <Link to="/home">edushare</Link>
      </div>
      <div className="flex flex-row justify-between">
        <NavLink
          className="mx-4 h-16 flex items-center"
          end
          to={`enter/class/${classId}`}
        >
          Feed
        </NavLink>
        <NavLink
          className="mx-4 h-16 flex items-center"
          end
          to={`enter/class/${classId}/classwork`}
        >
          Classwork
        </NavLink>
        <NavLink
          className="mx-4 h-16 flex items-center"
          end
          to={`enter/class/${classId}/people`}
        >
          People
        </NavLink>
      </div>
    </header>
  );
};

export default HeaderClass;
