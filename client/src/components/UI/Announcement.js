import Button from "@material-tailwind/react/Button";
import React from "react";

const Announcement = () => {
  return (
    <div className="flex flex-row justify-between p-6 w-2/4 mx-auto items-center">
      <div className="mx-2">
        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
      </div>
      <div className="w-full mx-2">
        <textarea
          className="form-textarea mt-1 block w-full border border-blue-300 my-4 rounded-2xl p-2"
          rows="3"
          placeholder="Make a new announcement"
        ></textarea>
        <Button color="indigo" ripple="light">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Announcement;
