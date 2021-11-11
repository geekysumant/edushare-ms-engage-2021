import React, { useEffect, useState } from "react";
import HeaderHome from "../components/UI/HeaderHome";
import Input from "@material-tailwind/react/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/ClassCard";
import { createClass, fetchClasses } from "../actions/class";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const { createdClasses, joinedClasses, loading } = useSelector(
    (state) => state.classDetails
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login/teacher");
    }
    dispatch(fetchClasses());
  }, []);

  return (
    <div>
      <HeaderHome />
      <section>
        <h3>Classes you've created </h3>
        <div className="my-6 flex flex-row flex-wrap">
          {loading && <p>Loading......</p>}
          {createdClasses &&
            createdClasses.map((element) => {
              return (
                <div className="w-72 m-6">
                  <ClassCard
                    classTitle={element.className}
                    classRoom={element.classRoom}
                    classTeacher="Teacher"
                    classCode={element._id}
                  />
                </div>
              );
            })}
        </div>
      </section>
      <section>
        <h3>Classes you've joined </h3>
        <div className="my-6 flex flex-row justify-between flex-wrap">
          {loading && <p>Loading......</p>}
          {joinedClasses &&
            joinedClasses.map((element) => {
              return (
                <div key={element._id} className="w-72 m-6">
                  <ClassCard
                    classTitle={element.className}
                    classRoom={element.classRoom}
                    classTeacher="Teacher"
                    classCode={element._id}
                  />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Home;
