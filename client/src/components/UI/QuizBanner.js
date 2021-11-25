import React from "react";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const QuizBanner = ({
  questions,
  quizId,
  userInfo,
  createdBy,
  title,
  time,
}) => {
  const params = useParams();
  const classId = params.classId;
  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 w-full md:max-w-2xl">
      <div className="flex flex-col items-start px-4 py-6 w-full">
        <div className="flex flex-row w-full">
          <img
            className="w-10  rounded object-cover mr-4 shadow"
            src={"/images/quiz.png"}
            alt="avatar"
          />
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {title}
            </h2>
            <small className="text-sm text-gray-700">
              {new Date(time).toDateString()}
            </small>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-between mt-4 sm:flex-col sm:items-center">
            <p className="mt-3 text-gray-700 text-sm sm:my-4">
              Total question : {questions.length}
            </p>
            <Link
              to={`/enter/class/${classId}/classwork/quiz/${quizId}`}
              className="sm:my-4"
            >
              <Button color="indigo" ripple="light">
                {userInfo.id === createdBy ? "View quiz" : "Take quiz"}
              </Button>
            </Link>
            <Link
              to={`/enter/class/${classId}/classwork/quiz/${quizId}/submissions`}
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

export default QuizBanner;
