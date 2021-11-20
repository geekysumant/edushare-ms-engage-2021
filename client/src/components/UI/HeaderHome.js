import React, { useState } from "react";
import CreateClassForm from "../CreateClassForm";
import JoinClassForm from "../JoinClassForm";
import Modal from "../Modal";
import Button from "./Button/Button";

const HeaderHome = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  return (
    <>
      <header className="p-4 h-16 bg-white shadow-lg flex w-full justify-between items-center">
        <div className="ml-8 flex flex-row items-center">
          <img
            className="mr-2"
            src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-online-class-online-learning-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
          />
          <p
            className="text-lg font-bold"
            style={{
              fontFamily: ["Montserrat", "sans-serif"],
            }}
          >
            edushare
          </p>
        </div>
        <div className="">
          <button
            className="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2"
            onClick={(e) => setShowCreateClass(true)}
          >
            Create class
          </button>
          <button
            className="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2"
            onClick={(e) => setShowJoinClass(true)}
          >
            Join class
          </button>
          <Button
            text="Nice"
            setShowJoinClass={setShowJoinClass}
            setShowCreateClass={setShowCreateClass}
          />
        </div>
      </header>

      <CreateClassForm
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      />
      <JoinClassForm
        showJoinClass={showJoinClass}
        setShowJoinClass={setShowJoinClass}
      />
      {/* <Modal
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      /> */}
    </>
  );
};

export default HeaderHome;
