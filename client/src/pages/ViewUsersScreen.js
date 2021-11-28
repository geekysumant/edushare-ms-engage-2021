import React, { useEffect } from "react";
import Banner from "../components/UI/Banner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUsersInClass } from "../actions/class";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";

const ViewUsersScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const { createdBy, usersInClass, loading, error } = useSelector(
    (state) => state.fetchUsersInClass
  );

  const classId = params.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    dispatch(fetchUsersInClass(classId));
  }, []);
  return (
    <div>
      <Banner
        // SVGComponent={}
        heading="People"
        bannerBackground="greencheese"
      />

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="w-4/5 mx-auto">
          <Alert color="red" message={error} />
        </div>
      ) : (
        <>
          {createdBy && (
            <div className="w-4/5 mx-auto rounded rounded-lg bg-white shadow-lg p-4 sm:w-full">
              <div className="flex ">
                <div className="w-12 h-12">
                  <img
                    alt="user-profile-img"
                    className="rounded-full"
                    src={createdBy.picture}
                  />
                </div>
                <div className="flex justify-between w-full items-center ml-2">
                  <div className="flex flex-col">
                    <h1 className="font-bold">{createdBy.name}</h1>
                    <span className="text-sm">{createdBy.email}</span>
                  </div>
                  <h1 className="text-sm">Teacher</h1>
                </div>
              </div>
            </div>
          )}
          {usersInClass &&
            usersInClass.map((user, index) => (
              <div
                className="w-4/5 mx-auto rounded-lg bg-white shadow-lg p-4 my-2 sm:w-full "
                key={index}
              >
                <div className="flex ">
                  <div className="w-12 h-12">
                    <img
                      alt="user-profile-img"
                      className="rounded-full"
                      src={user.picture}
                    />
                  </div>
                  <div className="flex justify-between w-full items-center ml-2">
                    <div className="flex flex-col">
                      <h1 className="font-bold">{user.name}</h1>
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <h1 className="text-sm">Student</h1>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ViewUsersScreen;
