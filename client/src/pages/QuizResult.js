import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchQuiz } from "../actions/assignment";
import QuizResultDisplay from "../components/QuizResultDisplay";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import Banner from "../components/UI/Banner";
import WinnerSVG from "../assets/svg/winner.svg";

const QuizResult = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    questions,
    createdBy,
    loading,
    error,
    hasSubmitted,
    submission,
    totalQuizScore,
    totalUserScore,
  } = useSelector((state) => state.fetchQuiz);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    dispatch(fetchQuiz(quizId));
  }, []);
  return (
    <div>
      <Banner
        bannerBackground="greencheese"
        SVGComponent={WinnerSVG}
        heading="Result"
        customText="View your performance"
        // extraComponent={marksComponent}
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        hasSubmitted && (
          <QuizResultDisplay
            totalUserScore={totalUserScore}
            totalQuizScore={totalQuizScore}
            questions={questions}
            submission={submission}
          />
        )
      )}
    </div>
  );
};

export default QuizResult;
