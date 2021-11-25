import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchQuiz, fetchUsersQuizSubmission } from "../actions/assignment";
import QuizResultDisplay from "../components/QuizResultDisplay";
import Alert from "../components/UI/Alert";
import Banner from "../components/UI/Banner";
import Spinner from "../components/UI/Spinner";
import WinnerSVG from "../assets/svg/winner.svg";

const ViewUserQuizSubmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { questions, createdBy, loading, error, totalQuizScore } = useSelector(
    (state) => state.fetchQuiz
  );
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const { submission } = useSelector((state) => state.fetchUsersQuizSubmission);

  const quizId = params.quizId;
  const userId = params.userId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/home");
    }
  }, [isAuthenticated, createdBy]);
  useEffect(() => {
    dispatch(fetchQuiz(quizId));
    dispatch(fetchUsersQuizSubmission(quizId, userId));
  }, []);
  return (
    <div>
      <Banner
        SVGComponent={WinnerSVG}
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
