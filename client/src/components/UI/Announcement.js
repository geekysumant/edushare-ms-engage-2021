import Button from "@material-tailwind/react/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createAnnouncement } from "../../actions/announcement";
import Alert from "./Alert";
import Spinner from "./Spinner";

const Announcement = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [content, setContent] = useState("");
  const { userInfo } = useSelector((state) => state.userDetails);
  const { loading, error, success } = useSelector(
    (state) => state.createNewAnnouncement
  );

  const classId = params.classId;
  const makeNewAnnouncement = () => {
    setContent("");
    dispatch(createAnnouncement(classId, content));
  };
  return (
    <div className="flex flex-row justify-between p-6 w-full items-center sm:w-full">
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
          className="form-textarea mt-1 block w-full border border-blue-300 my-4 rounded-lg p-2"
          rows="3"
          placeholder="Announce something to your class"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Button color="indigo" ripple="light" onClick={makeNewAnnouncement}>
          Post
        </Button>
        <div className="my-2">
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert color="red" message={error} />
          ) : (
            success && <Alert color="green" message="Announcement created!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
