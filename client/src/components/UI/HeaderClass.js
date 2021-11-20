import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const HeaderClass = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  const classId = urlPath.split("/")[3];
  return (
    <header className="flex flex-row justify-between  bg-white shadow-xl">
      <div className="mx-4 h-16 flex items-center">
        <Link
          to="/home"
          className="flex flex-row items-center text-lg font-bold ml-8"
        >
          <img
            className="mr-2"
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-online-class-online-learning-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          />
          <p
            style={{
              fontFamily: ["Montserrat", "sans-serif"],
            }}
          >
            edushare
          </p>
        </Link>
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
