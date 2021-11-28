import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchQuizSubmissions } from "../actions/assignment";
import { fetchEnterClassDetails } from "../actions/class";
import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import UserCard from "../components/UI/UserCard";
import NoSubmissionSVG from "../assets/svg/no_submission.svg";

const QuizSubmissions = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, submissions } = useSelector(
    (state) => state.fetchQuizSubmissions
  );
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);

  const quizId = params.quizId;
  const classId = params.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/home");
    }
  }, [isAuthenticated, createdBy]);

  useEffect(() => {
    dispatch(fetchQuizSubmissions(quizId));
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
                key={submission.user._id}
                picture={submission.user.picture}
                email={submission.user.email}
                name={submission.user.name}
                userId={submission.user._id}
                classId={classId}
                quizId={quizId}
              />
            ))}

          {submissions && submissions.length === 0 && (
            <div className="mx-auto h-56 w-56 my-16">
              <img src={NoSubmissionSVG} alt="" />
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
