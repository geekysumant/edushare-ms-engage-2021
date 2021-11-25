import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  downloadAssignmentSubmission,
  fetchAssignment,
  fetchUsersAssignmentSubmission,
  gradeAssignment,
} from "../actions/assignment";
import Alert from "../components/UI/Alert";
import Banner from "../components/UI/Banner";
import Spinner from "../components/UI/Spinner";
import WinnerSVG from "../assets/svg/winner.svg";
import Button from "@material-tailwind/react/Button";

const ViewUserQuizSubmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [grade, setGrade] = useState(0);
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );
  const {
    assignment,
    createdBy,
    loading: fetchAssignmentLoading,
    error: fetchAssignmentError,
  } = useSelector((state) => state.fetchAssignment);
  const {
    loading: gradeAssignmentLoading,
    success: gradeAssignmentSuccess,
    error: gradeAssignmentError,
  } = useSelector((state) => state.gradeAssignment);

  const {
    submission,
    loading: fetchSubmissionLoading,
    error: fetchSubmissionError,
  } = useSelector((state) => state.fetchUsersAssignmentSubmission);
  const { loading, error } = useSelector(
    (state) => state.downloadAssignmentSubmission
  );

  const assignmentId = params.assignmentId;
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
    dispatch(fetchAssignment(assignmentId));
    dispatch(fetchUsersAssignmentSubmission(assignmentId, userId));
  }, []);

  useEffect(() => {
    if (createdBy && createdBy !== userInfo.id) {
      return navigate("/home");
    }
  }, [createdBy]);

  const downloadSubmission = () => {
    dispatch(downloadAssignmentSubmission(assignmentId, userId));
  };
  const gradeAssignmentHandler = () => {
    if (grade > assignment.marks) {
      return;
    }
    dispatch(gradeAssignment(assignmentId, userId, grade));
  };
  return (
    <>
      {fetchAssignmentLoading ? (
        <Spinner />
      ) : fetchAssignmentError ? (
        <div className="w-4/5 mx-auto my-20">
          <Alert color="red" message={fetchAssignmentError} />
        </div>
      ) : (
        <div>
          <Banner
            SVGComponent={WinnerSVG}
            heading="Submission"
            bannerBackground="greencheese"
            customText="View individual student's submissions"
          />

          <div
            className="bg-white rounded shadow-lg p-6 w-4/5 sm:w-full sm:flex-col mx-auto flex"
            style={{
              fontFamily: ["Poppins", "sans-serif"],
            }}
          >
            <div className="w-1/3 flex flex-col items-center border border-blue-500 bg-blue-100 rounded-sm p-4 mr-4 sm:mr-0 sm:w-full sm:items-center sm:justify-center">
              <span>
                <span className="my-2">Total Marks: </span>
                <span className="text-green-600 font-bold">
                  {assignment && assignment.marks}
                </span>
              </span>
              {fetchSubmissionLoading ? (
                <Spinner />
              ) : fetchSubmissionError ? (
                <Alert color="red" message={fetchSubmissionError} />
              ) : submission && submission.grade ? (
                <div className="flex flex-row justify-between my-4">
                  <span className="">Grade awarded: </span>
                  <span className="font-bold text-green-600">
                    {" "}
                    {submission.grade}
                  </span>
                </div>
              ) : (
                <>
                  <label className="flex justify-between  items-center my-2">
                    <span>Assign marks:</span>
                    <input
                      className="h-8 shadow appearance-none border rounded w-full py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Marks"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    />
                  </label>

                  {gradeAssignmentLoading ? (
                    <Spinner />
                  ) : gradeAssignmentError ? (
                    <Alert color="red" message={gradeAssignmentError} />
                  ) : gradeAssignmentSuccess ? (
                    <Alert color="green" message="Grade awarded!" />
                  ) : (
                    <Button
                      color="blue"
                      ripple="light"
                      buttonType="outline"
                      className="my-2"
                      onClick={gradeAssignmentHandler}
                    >
                      Grade submission
                    </Button>
                  )}
                </>
              )}
            </div>

            <div className="w-4/5 sm:w-full sm:mt-4">
              <h1>Submission</h1>
              <p
                className="text-sm"
                style={{
                  borderBottom: "1px solid blue",
                }}
              ></p>
              <Button
                color="blue"
                ripple="light"
                buttonType="outline"
                className="my-2 h-14 w-48 mx-auto my-8"
                onClick={downloadSubmission}
              >
                {loading ? (
                  <Spinner />
                ) : error ? (
                  <Alert color="red" message={error} />
                ) : (
                  <>
                    <div className="sm:w-full">
                      <img
                        src="https://img.icons8.com/cute-clipart/64/4a90e2/task.png"
                        alt=""
                      />
                    </div>
                    <p className="">Download Submission</p>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ViewUserQuizSubmission;
