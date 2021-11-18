import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import download from "downloadjs";

const AssignmentScreen = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const { assignments, loading, error } = useSelector(
    (state) => state.assignmentDetails
  );
  useEffect(() => {
    console.log(assignments);
  }, [loading]);

  const downloadFileHandler = async () => {
    const res = await axios.get(
      "/api/v1/quiz/download/6194c991e36a4eeee79bc51c",
      {
        responseType: "blob",
      }
    );
    download(new Blob([res.data]), "test.pdf");
  };
  return (
    <div className="flex flex-row justify-between w-4/5 items center mx-auto mt-8 bg-white p-8 rounded-lg">
      <div className="w-3/4">
        <h1 className="text-3xl">Assignment Title</h1>
        <p className="text-sm text-gray-600">Teacher name</p>
        <p
          className="text-sm"
          style={{
            borderBottom: "1px solid red",
          }}
        >
          marks
        </p>

        <div
          className="my-8 w-56 border border-black rounded flex flex-row justify-between items-center cursor-pointer"
          //   style={{
          //     borderBottom: "1px solid black",
          //   }}
        >
          <div className="bg-red-500 w-28 h-24">
            {/* <img /> */}
            {/* <p>d</p> */}
          </div>
          <p onClick={downloadFileHandler} className="my-8 px-2">
            Attachment
          </p>
        </div>
        <div>Instructions</div>
      </div>
      <div className="flex flex-col w-1/3 items-center justify-center border border-black shadow-lg rounded-lg mx-4 my-4">
        <h1 className="mb-4 text-xl">Your work</h1>
        <form
          //   onSubmit={createAssignmentHandler}
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
            <input
              className=" w-full p-2 rounded border border-yellow-500 cursor-pointer hover:bg-yellow-600"
              type="submit"
              value="Submit assignment"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentScreen;
