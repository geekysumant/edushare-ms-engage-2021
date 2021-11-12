import React, { useEffect } from "react";
import Dropdown from "../components/UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../actions/assignment";
import { useLocation, useNavigate } from "react-router";
import QuizBanner from "../components/UI/QuizBanner";

const Classwork = () => {
  const { quizzes } = useSelector((state) => state.assignmentDetails);
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const urlPath = location.pathname;
  const classId = urlPath.split("/")[3];

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login/teacher");
    }
    dispatch(fetchAssignments(classId));
    console.log(quizzes);
  }, []);

  useEffect(() => {
    console.log(quizzes);
  }, [quizzes]);

  return (
    <div className="mx-36 my-8">
      <Dropdown />

      {quizzes &&
        quizzes.map((quiz) => <QuizBanner questions={quiz.questions} />)}
    </div>
  );
};

export default Classwork;
