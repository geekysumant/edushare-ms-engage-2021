import React, { useState } from "react";
import CreateClassForm from "../CreateClassForm";

const HeaderHome = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  return (
    <>
      <header className="h-12 p-2 bg-pink-100 flex w-full justify-between items-center">
        <div>EduShare</div>
        <div className="">
          <button
            class="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2"
            onClick={(e) => setShowCreateClass(true)}
          >
            Create class
          </button>
          <button class="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2">
            Join class
          </button>
        </div>
      </header>

      <CreateClassForm
        showCreateClass={showCreateClass}
        setShowCreateClass={setShowCreateClass}
      />
    </>
  );
};

export default HeaderHome;
