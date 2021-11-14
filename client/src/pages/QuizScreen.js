import React, { useEffect, useState } from "react";
import Banner from "../components/UI/Banner";
import BannerSVG from "../assets/svg/online_class.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../actions/assignment";
import DisplayQuiz from "../components/DisplayQuiz";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import Button from "@material-tailwind/react/Button";

const QuizScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate;
  const { questions, createdBy, loading, error } = useSelector(
    (state) => state.fetchQuiz
  );
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const [userSubmission, setUserSubmission] = useState([]);
  const quizId = location.pathname.split("/")[6];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login/teacher");
    }
    dispatch(fetchQuiz(quizId));
  }, []);

  const submitQuizHandler = () => {
    const parsedSubmission = Array(questions.length).fill(-1);
    userSubmission.forEach((submission, index) => {
      if (submission !== undefined)
        parsedSubmission[index] = parseInt(submission);
    });
  };

  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading="Quiz Name!"
        customText="bla bla bla"
      />
      {/* only for students: */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        questions && (
          <div className="flex items-center flex-col w-full">
            <DisplayQuiz
              questions={questions}
              createdBy={createdBy}
              setUserSubmission={setUserSubmission}
              userSubmission={userSubmission}
            />
            {createdBy !== userInfo.id && (
              <Button
                color="yellow"
                ripple="light"
                className="my-4"
                onClick={submitQuizHandler}
              >
                Submit quiz
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default QuizScreen;
