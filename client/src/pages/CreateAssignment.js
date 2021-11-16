import React, { useState, useEffect } from "react";
import Banner from "../components/UI/Banner";
import axios from "axios";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const CreateAssignment = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const location = useLocation();

  const classId = location.pathname.split("/")[3];
  const { userInfo } = useSelector((state) => state.userDetails);

  const createAssignmentHandler = async (event) => {
    event.preventDefault();
    console.log(file);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("classId", classId);

    const { data } = await axios.post("/test", formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  };
  return (
    <>
      <Banner
        // SVGComponent={TaskSVG}
        heading="Classwork"
        bannerBackground="meteor"
        customText="All your assignments and quizzes in one place"
        textColor="gray"
      />
      <div className="mx-auto flex flex-col items-center p-8">
        <form
          onSubmit={createAssignmentHandler}
          id="myform"
          encType="multipart/form-data"
          className="w-4/5"
        >
          <label className="w-96">
            <span className="text-gray-700">Title</span>
            <div className="mb-3 pt-0">
              <input
                type="text"
                placeholder="Enter assignment title"
                className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-96"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>

          <label className="block text-left w-96 my-8">
            <span className="text-gray-700">Instructions (optional)</span>
            <textarea
              className="form-textarea mt-1 block w-full border border-blue-300 rounded"
              rows="7"
              name="instructions"
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </label>
          <label className="flex flex-row items-center">
            <span className="text-gray-700 mr-16">
              Additional File(optional)
            </span>

            <div>
              <label class="w-36 flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer bg-green-300 hover:text-white">
                <svg
                  class="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </label>
          <div className="mt-8">
            <input
              className="bg-green-400 p-2 rounded"
              type="submit"
              value="Create assignment"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAssignment;
