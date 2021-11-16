import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchSubmissions } from "../actions/assignment";
import { fetchEnterClassDetails } from "../actions/class";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import UserCard from "../components/UI/UserCard";

const QuizSubmissions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, submissions } = useSelector(
    (state) => state.fetchSubmissions
  );
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);

  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login/teacher");
    }
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/home");
    }
    dispatch(fetchSubmissions(quizId));
    dispatch(fetchEnterClassDetails(classId));
  }, []);

  return (
    <div className="w-100 flex flex-row">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        submissions &&
        submissions.map((submission) => (
          <UserCard
            picture={submission.user.picture}
            email={submission.user.email}
            name={submission.user.name}
            userId={submission.user._id}
            classId={classId}
            quizId={quizId}
          />
        ))
      )}
    </div>
  );
};

export default QuizSubmissions;
