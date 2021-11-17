import React, { useEffect, useState } from "react";
import HeaderHome from "../components/UI/HeaderHome";
import Input from "@material-tailwind/react/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/ClassCard";
import { createClass, fetchClasses } from "../actions/class";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import StudySVG from "../assets/svg/study.svg";
import Banner from "../components/UI/Banner";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const { createdClasses, joinedClasses, loading, error } = useSelector(
    (state) => state.classDetails
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/home");
    }
    dispatch(fetchClasses());
  }, []);

  return (
    <div>
      <Banner
        SVGComponent={StudySVG}
        heading="Classes"
        bannerBackground="boxes"
        customText="All your classes at one place"
        textColor="gray"
      />
      <div className="my-2 flex flex-row flex-wrap">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert color="red" message={error} />
        ) : (
          <div className="p-4 flex flex-row flex-wrap">
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
        )}
      </div>
    </div>
  );
};

export default Home;
