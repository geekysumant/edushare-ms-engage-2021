import Button from "@material-tailwind/react/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUsersAssignmentSubmission } from "../actions/assignment";
import Alert from "./UI/Alert";
import Spinner from "./UI/Spinner";

const UserAssignmentSubmissionCard = ({
  uploadAssignmentHandler,
  setFile,
  file,
  uploadSubmissionLoading,
  hasSubmitted,
  uploadSubmissionSuccess,
  uploadSubmissionError,
  downloadAssignmentSubmissionHandler,
  downloadedSubmissionError,
  downloadedSubmissionLoading,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const assignmentId = params.assignmentId;
  const { userInfo } = useSelector((state) => state.userDetails);
  const { submission, loading } = useSelector(
    (state) => state.fetchUsersAssignmentSubmission
  );

  useEffect(() => {
    dispatch(fetchUsersAssignmentSubmission(assignmentId, userInfo.id));
  }, [assignmentId, userInfo]);
  return (
    <div
      className="flex flex-col w-1/3 items-center justify-center border border-yellow-600 shadow-lg rounded-lg mx-4 my-4 sm:w-4/5 p-4"
      style={{
        fontFamily: ["Poppins", "sans-serif"],
      }}
    >
      <span className="flex flex-row justify-between w-full px-2 py-0 items-center mb-4">
        <h1 className="">Your work</h1>
        <span className="font-semibold">
          {submission && submission.grade ? "Graded" : "Ungraded"}
        </span>
      </span>
      {!hasSubmitted ? (
        <form
          onSubmit={uploadAssignmentHandler}
          id="myform"
          encType="multipart/form-data"
        >
          <label className="w-full flex rounded-lg flex-row p-2 items-center justify-center   text-blue -lg shadow-lg tracking-wide  border border-blue-400 cursor-pointer  hover:text-blue-500">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="ml-8 text-base leading-normal">Add file</span>
            <input
              type="file"
              className="hidden"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <div>{file && <p className="normal-case">{file.name}</p>}</div>
          <div className="mt-8 mb-2 mx-auto">
            {uploadSubmissionLoading ? (
              <Spinner />
            ) : uploadSubmissionError ? (
              <Alert color="red" message={uploadSubmissionError} />
            ) : uploadSubmissionSuccess ? (
              <Alert color="green" message="Submission successful!" />
            ) : (
              <Button
                color="yellow"
                ripple="light"
                buttonType="outline"
                className="w-full"
                type="submit"
              >
                Submit assignment
              </Button>
            )}
          </div>
        </form>
      ) : (
        <Button
          color="yellow"
          ripple="light"
          buttonType="outline"
          className="my-2 h-14 w-48 mx-auto my-8"
          onClick={downloadAssignmentSubmissionHandler}
        >
          {downloadedSubmissionLoading ? (
            <Spinner />
          ) : downloadedSubmissionError ? (
            <Alert color="red" message={downloadedSubmissionError} />
          ) : (
            <>
              <div className="sm:w-full">
                <img
                  src="https://img.icons8.com/cute-clipart/64/4a90e2/task.png"
                  alt=""
                />
              </div>
              <p className="">Download submission</p>
            </>
          )}
        </Button>
      )}

      {loading ? (
        <Spinner />
      ) : (
        submission &&
        submission.grade && (
          <div className="flex flex-row justify-between">
            <span className="text-green-500">Grade awarded: </span>
            <span className="font-bold"> {submission.grade}</span>
          </div>
        )
      )}
    </div>
  );
};

export default UserAssignmentSubmissionCard;
