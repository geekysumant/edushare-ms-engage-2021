import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const HeaderClass = () => {
  const location = useLocation();
  const urlPath = location.pathname;

  const classId = urlPath.split("/")[3];
  return (
    <header
      className="flex flex-row items-center justify-between  bg-white shadow-xl font-semibold"
      style={{
        fontFamily: ["Montserrat", "sans-serif"],
      }}
    >
      <div className="mx-4 h-16 flex items-center sm:mx-0 sm:w-16 sm:justify-center sm:ml-2">
        <Link
          to="/home"
          className="flex flex-row items-center text-lg font-bold ml-8 sm:w-full sm:mx-auto"
        >
          <img
            alt=""
            className=""
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-online-class-online-learning-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          />
          <p
            style={{
              fontFamily: ["Montserrat", "sans-serif"],
            }}
            className="sm:hidden ml-2"
          >
            edushare
          </p>
        </Link>
      </div>
      <div className="flex flex-row justify-between mr-16 sm:mr-0">
        <NavLink
          className="mx-8 h-16 flex items-center sm:mx-4"
          end
          to={`enter/class/${classId}`}
        >
          Feed
        </NavLink>
        <NavLink
          className="mx-8 h-16 flex items-center sm:mx-4"
          end
          to={`enter/class/${classId}/classwork`}
        >
          Classwork
        </NavLink>
        <NavLink
          className="mx-8 h-16 flex items-center sm:mx-4"
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
