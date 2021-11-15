import React, { useEffect, useState } from "react";
import Banner from "../components/UI/Banner";
import BannerSVG from "../assets/svg/online_class.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, submitQuiz } from "../actions/assignment";
import DisplayQuiz from "../components/DisplayQuiz";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import Button from "@material-tailwind/react/Button";
import QuizResult from "./QuizResult";

const QuizScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, createdBy, loading, error, hasSubmitted, submission } =
    useSelector((state) => state.fetchQuiz);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const submitQuizDetails = useSelector((state) => state.submitQuiz);
  const [userSubmission, setUserSubmission] = useState([]);
  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login/teacher");
    }
    dispatch(fetchQuiz(quizId));
  }, []);

  useEffect(() => {
    if (submitQuizDetails.success || hasSubmitted)
      navigate(`/enter/class/${classId}/classwork/quiz/${quizId}/results`);
  }, [submitQuizDetails.success, hasSubmitted]);

  const submitQuizHandler = () => {
    const parsedSubmission = Array(questions.length).fill(-1);
    userSubmission.forEach((submission, index) => {
      if (submission !== undefined)
        parsedSubmission[index] = parseInt(submission);
    });

    dispatch(submitQuiz(quizId, parsedSubmission));
  };

  const componentIfUserNotSubmitted = (
    <div className="flex items-center flex-col w-full">
      <DisplayQuiz
        questions={questions}
        createdBy={createdBy}
        setUserSubmission={setUserSubmission}
        userSubmission={userSubmission}
      />
      <div className="my-4">
        {submitQuizDetails && submitQuizDetails.loading ? (
          <Spinner />
        ) : submitQuizDetails.success ? (
          <Alert color="green" message="Quiz submitted successfully" />
        ) : submitQuizDetails.error ? (
          <Alert color="red" message={submitQuizDetails.error} />
        ) : null}
      </div>

      {userInfo && createdBy !== userInfo.id && (
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
  );

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
        !hasSubmitted && componentIfUserNotSubmitted
      )}
    </div>
  );
};

export default QuizScreen;
