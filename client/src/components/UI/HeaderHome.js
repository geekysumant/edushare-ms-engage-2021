import React, { useState } from "react";
import CreateClassForm from "../CreateClassForm";
import JoinClassForm from "../JoinClassForm";

const HeaderHome = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  return (
    <>
      <header className="h-12 p-2 bg-pink-100 flex w-full justify-between items-center">
        <div>EduShare</div>
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
    </>
  );
};

export default HeaderHome;
