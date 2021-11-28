import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchQuiz } from "../actions/assignment";
import QuizResultDisplay from "../components/QuizResultDisplay";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import Banner from "../components/UI/Banner";
import WinnerSVG from "../assets/svg/winner.svg";

const QuizResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    questions,
    loading,
    error,
    hasSubmitted,
    submission,
    totalQuizScore,
    totalUserScore,
  } = useSelector((state) => state.fetchQuiz);
  const { isAuthenticated } = useSelector((state) => state.userDetails);

  const quizId = params.quizId;

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
        <div className="w-80 mx-auto">
          <Alert color="red" message={error} />
        </div>
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
