import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { fetchEnterClassDetails } from "../actions/class";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";
import HeaderClass from "../components/UI/HeaderClass";
import Classwork from "./Classwork";
import CreateMcq from "./CreateMcq";
import BannerSVG from "../assets/svg/online_class.svg";
import Button from "@material-tailwind/react/Button";
import { v1 as uuid } from "uuid";
import { fetchAnnouncements } from "../actions/announcement";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UserAnnouncement from "../components/UI/UserAnnouncement";
// import Button from "../components/UI/Button/Button";

const EnterClass = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");

  const { loading, error, announcements } = useSelector(
    (state) => state.fetchAnnouncements
  );
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    const classId = urlParams.classId;
    dispatch(fetchEnterClassDetails(classId));
    dispatch(fetchAnnouncements(classId));
  }, []);

  const joinMeetScreen = () => {
    navigate(`/join/meet?roomId=${roomId}`);
  };

  const createMeetScreen = () => {
    navigate("/join/meet");
  };
  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading="Welcome"
        // customText=""
      />
      <div className="flex flex-row justify-around p-6 sm:flex-col sm:p-2">
        <div className="flex flex-col items-center shadow-lg p-6 bg-white h-56 rounded-lg sm:mb-4">
          <div className="flex flex-col items-center">
            <input
              className="w-full shadow appearance-none border rounded w-full my-2 py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter meet id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button
              color="yellow"
              ripple="light"
              onClick={joinMeetScreen}
              buttonType="outline"
              className="w-full"
            >
              Join meet
            </Button>
          </div>
          <p>OR</p>
          <Button
            color="yellow"
            ripple="light"
            onClick={createMeetScreen}
            buttonType="outline"
            className="w-full"
          >
            Create new meet
          </Button>
        </div>
        <div className="shadow-lg rounded bg-white w-2/3 sm:w-full">
          <Announcement />

          <div className="flex flex-col p-4 sm:p-0">
            {loading ? (
              <Spinner />
            ) : error ? (
              <Alert color="red" message={error} />
            ) : (
              announcements &&
              announcements.map((announcement) => (
                <UserAnnouncement
                  name={announcement.user.name}
                  picture={announcement.user.picture}
                  content={announcement.content}
                  time={announcement.createdAt}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterClass;
