import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAnnouncement } from "../../actions/announcement";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
const UserAnnouncement = ({
  picture,
  name,
  time,
  content,
  userId,
  announcementMadeBy,
  announcementId,
  classId,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deleteAnnouncement);

  const deleteAnnouncementHandler = () => {
    dispatch(deleteAnnouncement(announcementId, classId));
  };
  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 my-2">
      <div className="flex  px-4 py-6 w-full">
        <img
          className="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src={picture}
          alt="avatar"
        />
        <div className="w-full">
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {name}{" "}
            </h2>
            <div className="flex justify-between items-center sm:w-full">
              <small className="text-sm text-gray-700">
                {new Date(time).toDateString()}
              </small>
              {userId === announcementMadeBy && (
                <>
                  {loading ? (
                    <div className="mx-4">
                      <Spinner />
                    </div>
                  ) : (
                    <span
                      onClick={deleteAnnouncementHandler}
                      className="mx-4 cursor-pointer"
                    >
                      <DeleteIcon />
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="mt-3 text-gray-700 text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default UserAnnouncement;
