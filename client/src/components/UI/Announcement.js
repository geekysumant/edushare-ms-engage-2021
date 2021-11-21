import Button from "@material-tailwind/react/Button";
import React from "react";
import { useSelector } from "react-redux";

const Announcement = () => {
  const { userInfo } = useSelector((state) => state.userDetails);
  return (
    <div className="flex flex-row justify-between p-6 w-3/5 items-center sm:w-full">
      <div className="mx-2">
        <div className="w-12 h-12">
          <img
            alt="user-profile-img"
            className="rounded-full"
            src={userInfo.picture}
          />
        </div>
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
