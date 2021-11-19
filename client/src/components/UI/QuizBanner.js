import React from "react";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const QuizBanner = ({ questions, quizId, userInfo, createdBy }) => {
  const location = useLocation();
  const urlPath = location.pathname;
  const classId = urlPath.split("/")[3];
  return (
    <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 w-full md:max-w-2xl">
      <div class="flex items-start px-4 py-6 w-full">
        <img
          class="w-10 h-10 rounded object-cover mr-4 shadow"
          src={"/images/quiz.png"}
          alt="avatar"
        />
        <div class="flex flex-col w-full">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 -mt-1">
              Quiz Name{" "}
            </h2>
            <small class="text-sm text-gray-700">22h ago</small>
          </div>

          <div className="flex flex-row w-full justify-between mt-4 sm:flex-col sm:items-center">
            <p class="mt-3 text-gray-700 text-sm sm:my-4">
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
