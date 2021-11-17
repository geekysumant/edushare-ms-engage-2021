import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchQuiz, fetchUsersQuizSubmission } from "../actions/assignment";
import QuizResultDisplay from "../components/QuizResultDisplay";
import Alert from "../components/UI/Alert";
import Banner from "../components/UI/Banner";
import Spinner from "../components/UI/Spinner";
import QuizSVG from "../assets/svg/quiz.svg";

const ViewUserQuizSubmission = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    questions,
    createdBy,
    loading,
    error,
    hasSubmitted,
    totalQuizScore,
    totalUserScore,
  } = useSelector((state) => state.fetchQuiz);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const { submission } = useSelector((state) => state.fetchUsersQuizSubmission);

  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];
  const userId = location.pathname.split("/")[8];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/home");
    }
    dispatch(fetchQuiz(quizId));
    dispatch(fetchUsersQuizSubmission(quizId, userId));
  }, []);
  return (
    <div>
      <Banner
        SVGComponent={QuizSVG}
        heading="Result"
        bannerBackground="greencheese"
        customText="View individual student's results"
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        submission && (
          <QuizResultDisplay
            totalUserScore={submission.totalScore}
            totalQuizScore={totalQuizScore}
            questions={questions}
            submission={submission.submission}
          />
        )
      )}
    </div>
  );
};
export default ViewUserQuizSubmission;
