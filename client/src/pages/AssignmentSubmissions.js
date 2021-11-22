import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  fetchAssignmentSubmissions,
  fetchSubmissions,
} from "../actions/assignment";
import { fetchEnterClassDetails } from "../actions/class";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import UserCard from "../components/UI/UserCard";
import NoSubmissionSVG from "../assets/svg/no_submission.svg";

const QuizSubmissions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, submissions } = useSelector(
    (state) => state.fetchAssignmentSubmissions
  );
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);

  const assignmentId = location.pathname.split("/")[6];
  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/welcome");
    }
    dispatch(fetchAssignmentSubmissions(assignmentId));
    dispatch(fetchEnterClassDetails(classId));
  }, []);

  return (
    <div className="w-100 flex flex-row flex-wrap">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        <>
          {submissions &&
            submissions.map((submission) => (
              <UserCard
                picture={submission.user.picture}
                email={submission.user.email}
                name={submission.user.name}
                userId={submission.user._id}
                classId={classId}
                assignmentId={assignmentId}
              />
            ))}
          {submissions && submissions.length === 0 && (
            <div className="mx-auto h-56 w-56 my-16">
              <img src={NoSubmissionSVG} />
              <p
                style={{
                  fontFamily: ["Poppins", "sans-serif"],
                }}
              >
                No submissions found
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizSubmissions;
