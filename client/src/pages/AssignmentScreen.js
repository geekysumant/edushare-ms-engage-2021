import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import download from "downloadjs";
import {
  downloadAssignment,
  downloadAssignmentSubmission,
  fetchAssignment,
  uploadAssignmentSubmission,
} from "../actions/assignment";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UserAssignmentSubmissionCard from "../components/UserAssignmentSubmissionCard";
import OnlineClassSVG from "../assets/svg/online_class.svg";
import Banner from "../components/UI/Banner";

const AssignmentScreen = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.userDetails);
  const { assignment, hasSubmitted, createdBy, loading, success, error } =
    useSelector((state) => state.fetchAssignment);

  const uploadedSubmission = useSelector(
    (state) => state.uploadAssignmentSubmission
  );
  const downloadedAssignment = useSelector((state) => state.downloadAssignment);
  const downloadedSubmission = useSelector(
    (state) => state.downloadAssignmentSubmission
  );

  const uploadSubmissionLoading = uploadedSubmission.loading;
  const uploadSubmissionSuccess = uploadedSubmission.success;
  const uploadSubmissionError = uploadedSubmission.error;

  const downloadedAssignmentLoading = downloadedAssignment.loading;
  const downloadedAssignmentError = downloadedAssignment.error;

  const downloadedSubmissionLoading = downloadedSubmission.loading;
  const downloadedSubmissionError = downloadedSubmission.error;

  const assignmentId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(fetchAssignment(assignmentId));
  }, []);

  useEffect(() => {
    console.log(uploadSubmissionLoading);
  }, [uploadSubmissionLoading]);

  const uploadAssignmentHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classId);
    formData.append("assignmentId", assignmentId);

    dispatch(uploadAssignmentSubmission(formData));
  };

  const downloadAssignmentHandler = () => {
    dispatch(downloadAssignment(assignmentId));
  };
  const downloadAssignmentSubmissionHandler = () => {
    dispatch(downloadAssignmentSubmission(assignmentId));
  };
  return (
    <>
      <Banner
        SVGComponent={OnlineClassSVG}
        heading={assignment ? assignment.title : "Loading..."}
        bannerBackground="tornado"
        customText={assignment && `${assignment.marks} marks`}
      />
      <div className="sm:w-full mx-auto">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert color="red" message={error} />
        ) : (
          success && (
            <div className="flex flex-row justify-between w-4/5 items-center mx-auto mt-8 bg-white p-8 rounded-lg sm:flex-col md:flex-row lg:flex-row sm:w-full sm:mx-auto sm:p-2">
              <div className="w-3/4">
                {/* <h1 className="text-3xl text-yellow-600">{assignment.title}</h1> */}
                <p className="text-sm text-gray-600">Teacher name</p>
                <p
                  className="text-sm"
                  style={{
                    borderBottom: "2px solid #d97834",
                  }}
                ></p>
                <div className="mt-4">
                  <h1 className="text-lg font-medium">
                    Additional Instructions:
                  </h1>
                  <p className="text-sm">{assignment.instructions}</p>
                </div>

                <div
                  onClick={downloadAssignmentHandler}
                  className="my-8 border shadow-lg rounded flex flex-row items-center cursor-pointer sm:w-full sm:min-w-full lg:w-56 xl:w-56 hover:bg-yellow-200"
                  //   style={{
                  //     borderBottom: "1px solid black",
                  //   }}
                >
                  {downloadedAssignmentLoading ? (
                    <Spinner />
                  ) : downloadedAssignmentError ? (
                    <Alert color="red" message={downloadedAssignmentError} />
                  ) : (
                    <>
                      <div className="sm:w-full">
                        <img
                          src="https://img.icons8.com/cute-clipart/64/4a90e2/task.png"
                          alt=""
                        />
                      </div>
                      <p className="">Download Attachment</p>
                    </>
                  )}
                </div>
              </div>
              {userInfo && userInfo.id !== createdBy && (
                <UserAssignmentSubmissionCard
                  uploadAssignmentHandler={uploadAssignmentHandler}
                  setFile={setFile}
                  file={file}
                  uploadSubmissionLoading={uploadSubmissionLoading}
                  uploadSubmissionError={uploadSubmissionError}
                  uploadSubmissionSuccess={uploadSubmissionSuccess}
                  hasSubmitted={hasSubmitted}
                  downloadAssignmentSubmissionHandler={
                    downloadAssignmentSubmissionHandler
                  }
                  downloadedSubmissionLoading={downloadedSubmissionLoading}
                  downloadedSubmissionError={downloadedSubmissionError}
                />
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AssignmentScreen;
