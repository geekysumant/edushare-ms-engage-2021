import React, { useEffect, useState } from "react";
import HeaderHome from "../components/UI/HeaderHome";
import Input from "@material-tailwind/react/Input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login/teacher");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <HeaderHome />
      <section>
        <h3>Classes you've created </h3>
      </section>
    </div>
  );
};

export default Home;
