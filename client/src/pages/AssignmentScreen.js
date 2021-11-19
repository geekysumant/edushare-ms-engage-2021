import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import download from "downloadjs";
import {
  fetchAssignment,
  uploadAssignmentSubmission,
} from "../actions/assignment";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UserAssignmentSubmissionCard from "../components/UserAssignmentSubmissionCard";

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
  const uploadSubmissionLoading = uploadedSubmission.loading;
  const uploadSubmissionSuccess = uploadedSubmission.success;
  const uploadSubmissionError = uploadedSubmission.error;

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

  const downloadFileHandler = async (fileName, isAssignment) => {
    let fileExtension, res;
    if (!isAssignment) {
      const { data } = await axios.get(
        `/api/v1/assignment/submission/getFileExtension/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      res = await axios.get(
        `/api/v1/assignment/submission/download/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          responseType: "blob",
        }
      );
      fileExtension = data.data.fileExtension;
    } else {
      const { data } = await axios.get(
        `/api/v1/assignment/getFileExtension/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      res = await axios.get(`/api/v1/assignment/download/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        responseType: "blob",
      });
      fileExtension = data.data.fileExtension;
    }

    download(new Blob([res.data]), `${fileName}${fileExtension}`);
  };
  return (
    <div className="sm:w-full mx-auto">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" message={error} />
      ) : (
        success && (
          <div className="flex flex-row justify-between w-4/5 items-center mx-auto mt-8 bg-white p-8 rounded-lg sm:flex-col md:flex-row lg:flex-row sm:w-full sm:mx-auto sm:p-2">
            <div className="w-3/4">
              <h1 className="text-3xl text-yellow-600">{assignment.title}</h1>
              <p className="text-sm text-gray-600">Teacher name</p>
              <p
                className="text-sm"
                style={{
                  borderBottom: "2px solid #d97834",
                }}
              >
                {assignment.marks} marks
              </p>

              <div className="mt-4">
                <h1 className="text-lg font-medium">
                  Additional Instructions:
                </h1>
                <p className="text-sm">{assignment.instructions}</p>
              </div>
              <div
                onClick={() => downloadFileHandler("Assignment", true)}
                className="my-8 border shadow-lg rounded flex flex-row items-center cursor-pointer sm:w-full sm:min-w-full lg:w-56 xl:w-56 hover:bg-yellow-200"
                //   style={{
                //     borderBottom: "1px solid black",
                //   }}
              >
                <div className="sm:w-full">
                  <img
                    src="https://img.icons8.com/cute-clipart/64/4a90e2/task.png"
                    alt=""
                  />
                </div>
                <p className="">Download Attachment</p>
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
                downloadFileHandler={downloadFileHandler}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default AssignmentScreen;
