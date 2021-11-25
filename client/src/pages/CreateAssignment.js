import React, { useEffect, useState } from "react";
import Banner from "../components/UI/Banner";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "../actions/assignment";
import { fetchEnterClassDetails } from "../actions/class";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UploadSVG from "../assets/svg/upload.svg";

const CreateAssignment = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [marks, setMarks] = useState(0);
  const [fieldError, setFieldError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const classId = params.classId;
  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.userDetails
  );
  const { loading, success, error } = useSelector(
    (state) => state.createAssignment
  );
  const { createdBy } = useSelector((state) => state.enterClassDetails);

  useEffect(() => {
    dispatch(fetchEnterClassDetails(classId));
  }, []);
  useEffect(() => {
    if (!isAuthenticated || (createdBy && createdBy !== userInfo.id)) {
      return navigate("/welcome");
    }
  }, [isAuthenticated, createdBy]);

  const createAssignmentHandler = async (event) => {
    event.preventDefault();

    if (!title || !marks) {
      setFieldError("One or more fields are invalid.");
      return;
    }
    if (!file) {
      setFieldError("Please upload assignment file");
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("classId", classId);
    formData.append("marks", marks);

    dispatch(createAssignment(formData));
  };
  return (
    <>
      <Banner
        SVGComponent={UploadSVG}
        heading="Create Assignment"
        bannerBackground="cheese"
        customText="All your assignments and quizzes in one place"
        textColor="black"
      />
      <div className="mx-auto flex flex-col items-center p-8">
        <form
          onSubmit={createAssignmentHandler}
          id="myform"
          encType="multipart/form-data"
          className="w-4/5 flex flex-row justify-between sm:flex-col sm:w-full"
        >
          <div>
            <label className="w-96 sm:w-80">
              <span className="text-gray-700">Title</span>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Enter assignment title"
                  className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-96 sm:w-80"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </label>

            <label className="block text-left w-96 my-8 sm:w-80">
              <span className="text-gray-700">Instructions (optional)</span>
              <textarea
                className="form-textarea mt-1 block w-full border border-blue-300 rounded"
                rows="7"
                name="instructions"
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div>
            <label className="w-96">
              <span className="text-gray-700">Marks</span>
              <div className="mb-8 pt-0">
                <input
                  type="number"
                  placeholder="Enter assignment marks"
                  className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-2/3"
                  name="title"
                  min="0"
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
            </label>

            <label className="flex flex-row items-center">
              <span className="text-gray-700 mr-16">
                Additional File (Reqd.)
              </span>

              <div>
                <label className="w-36 flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer bg-green-300 hover:text-white">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
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
              </div>
            </label>
            <div className="mt-8 max-w-md  sm:text-center">
              <input
                className="bg-green-300 cursor-pointer p-2 rounded hover:bg-green-500 mb-4"
                type="submit"
                value="Create assignment"
              />
              {loading ? (
                <Spinner />
              ) : error ? (
                <Alert color="red" message={error} />
              ) : success ? (
                <Alert color="green" message="Assignment created!" />
              ) : (
                fieldError && <Alert color="red" message={fieldError} />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAssignment;
