import React from "react";
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
  return (
    <div className="flex flex-col w-1/3 items-center justify-center border shadow-lg rounded-lg mx-4 my-4 sm:w-full">
      <h1 className="mb-4 text-xl">Your work</h1>
      {!hasSubmitted ? (
        <form
          onSubmit={uploadAssignmentHandler}
          id="myform"
          encType="multipart/form-data"
        >
          <label class="w-full flex flex-row p-2 items-center justify-center   text-blue -lg shadow-lg tracking-wide  border border-blue-400 cursor-pointer  hover:text-blue-500">
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="ml-8 text-base leading-normal">Add file</span>
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
              <input
                className=" w-full p-2 rounded border border-yellow-500 cursor-pointer hover:bg-yellow-600"
                type="submit"
                value="Submit assignment"
              />
            )}
          </div>
        </form>
      ) : (
        <div
          onClick={downloadAssignmentSubmissionHandler}
          className="my-8 border shadow-lg rounded flex flex-row items-center cursor-pointer sm:w-full sm:min-w-full lg:w-56 xl:w-56 hover:bg-yellow-200"
          //   style={{
          //     borderBottom: "1px solid black",
          //   }}
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
        </div>
      )}
    </div>
  );
};

export default UserAssignmentSubmissionCard;
