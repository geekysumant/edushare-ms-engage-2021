import React from "react";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const AssignmentBanner = ({
  title,
  marks,
  assignmentId,
  userInfo,
  createdBy,
  time,
}) => {
  const params = useParams();
  const classId = params.classId;
  return (
    <div className="flex bg-white   w-full shadow-lg rounded-lg mx-4 md:mx-auto my-4  md:max-w-2xl ">
      <div className="flex flex-col items-start px-4 py-6 w-full">
        <div className="flex w-full">
          <img
            className="w-10 h-10 rounded object-cover mr-4 shadow"
            src={"/images/quiz.png"}
            alt="avatar"
          />
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {title}{" "}
            </h2>
            <small className="text-sm text-gray-700">
              {new Date(time).toDateString()}
            </small>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-between mt-4 sm:flex-col sm:items-center">
            <p className="mt-3 text-gray-700 text-sm">Total marks : {marks}</p>
            <Link
              className="sm:my-4"
              to={`/enter/class/${classId}/classwork/assignment/${assignmentId}`}
            >
              <Button color="indigo" ripple="light">
                {/* {userInfo.id == createdBy ? "View assignment" : "Take quiz"} */}
                View assignment
              </Button>
            </Link>
            <Link
              to={`/enter/class/${classId}/classwork/assignment/${assignmentId}/submissions`}
            >
              {createdBy === userInfo.id && (
                <Button color="indigo" ripple="light">
                  View Submissions
                </Button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentBanner;
