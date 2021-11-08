import React from "react";

const HeaderHome = () => {
  return (
    <header className="h-12 p-2 bg-pink-100 flex w-full justify-between items-center">
      <div>EduShare</div>
      <div className="">
        <button class="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2">
          Create class
        </button>
        <button class="bg-green-500 shadow-xl hover:bg-green-600 text-white font-bold rounded-lg p-1 w-32 m-2">
          Join class
        </button>
      </div>
    </header>
  );
};

export default HeaderHome;
