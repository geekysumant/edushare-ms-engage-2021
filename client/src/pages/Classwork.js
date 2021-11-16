import React, { useEffect } from "react";
import Dropdown from "../components/UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments } from "../actions/assignment";
import { useLocation, useNavigate } from "react-router";
import QuizBanner from "../components/UI/QuizBanner";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import Banner from "../components/UI/Banner";
import TaskSVG from "../assets/svg/tasks.svg";

const Classwork = () => {
  const { quizzes, loading, error } = useSelector(
    (state) => state.assignmentDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userDetails);

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
    <>
      <Banner
        SVGComponent={TaskSVG}
        heading="Classwork"
        bannerBackground="meteor"
        customText="All your assignments and quizzes in one place"
        textColor="gray"
      />
      <div className="mx-36 my-8">
        <div className="my-4 mx-auto">
          {userInfo && userInfo.id === createdBy && <Dropdown />}
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert message={error} color="red" />
        ) : (
          quizzes &&
          quizzes.map((quiz) => (
            <QuizBanner questions={quiz.questions} quizId={quiz._id} />
          ))
        )}
      </div>
    </>
  );
};

export default Classwork;
