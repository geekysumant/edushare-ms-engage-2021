import Button from "@material-tailwind/react/Button";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({
  picture,
  name,
  email,
  userId,
  classId,
  quizId,
  assignmentId,
}) => {
  return (
    <div className="w-1/4 max-w-sm mx-4  mt-8 bg-white shadow-xl rounded-lg text-gray-900 sm:w-full sm:mx-auto ">
      <div className="rounded-t-lg h-32 overflow-hidden bg-constellation"></div>
      <div className="mx-auto w-24 h-24 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src={picture} alt="" />
      </div>
      <div className="text-center mt-2 p-2">
        <h2 className="font-semibold break-words">{name}</h2>
        <p className="text-gray-500 break-words">{email}</p>
      </div>

      <div className="p-4 border-t mt-2">
        <div className="rounded-full py-2 flex items-center justify-evenly">
          {quizId && (
            <Link
              to={`/enter/class/${classId}/classwork/quiz/${quizId}/submissions/${userId}`}
            >
              <Button color="green" ripple="light">
                View submission
              </Button>
            </Link>
          )}
          {assignmentId && (
            <Link
              to={`/enter/class/${classId}/classwork/assignment/${assignmentId}/submissions/${userId}`}
            >
              <Button color="green" ripple="light">
                View submission
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
