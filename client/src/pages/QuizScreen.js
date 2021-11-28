import React, { useEffect, useState } from "react";
import Banner from "../components/UI/Banner";
import BannerSVG from "../assets/svg/online_class.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, submitQuiz } from "../actions/assignment";
import DisplayQuiz from "../components/DisplayQuiz";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import Button from "@material-tailwind/react/Button";
import QuestionContainer from "../components/QuestionContainer";

const QuizScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    title,
    questions,
    createdBy,
    loading,
    error,
    hasSubmitted,
    totalQuizScore,
  } = useSelector((state) => state.fetchQuiz);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const submitQuizDetails = useSelector((state) => state.submitQuiz);
  const [userSubmission, setUserSubmission] = useState([]);
  const quizId = params.quizId;
  const classId = params.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    dispatch(fetchQuiz(quizId));
  }, []);

  useEffect(() => {
    if ((submitQuizDetails && submitQuizDetails.success) || hasSubmitted)
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
          <div className="w-96 mx-auto">
            <Alert color="red" message={submitQuizDetails.error} />
          </div>
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
  const marksComponent = questions && (
    <div className=" border rounded shadow-lg p-6 border-green-400 bg-green-200">
      <h2 className="font-medium">Total Questions: {questions.length}</h2>
      <h2 className="font-medium">Total Marks: {totalQuizScore} </h2>
    </div>
  );

  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading={title}
        customText="Take the quiz, and get results within seconds"
      />
      {/* only for students: */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="w-96 mx-auto">
          <Alert color="red" message={error} />
        </div>
      ) : createdBy && createdBy === userInfo.id ? (
        <div className="bg-white py-2 flex flex-col items-center border rounded mx-auto w-4/5 sm:w-full">
          {marksComponent}
          {questions &&
            questions.map((question, index) => (
              <React.Fragment key={index}>
                <QuestionContainer
                  key={index}
                  questionBody={question.question}
                  options={question.options}
                  correctOption={question.correctOption}
                  correctMarks={question.correctMarks}
                  incorrectMarks={question.incorrectMarks}
                />
              </React.Fragment>
            ))}
        </div>
      ) : (
        !hasSubmitted && (
          <div className="flex flex-col items-center">
            {marksComponent}
            {componentIfUserNotSubmitted}
          </div>
        )
      )}
    </div>
  );
};

export default QuizScreen;
