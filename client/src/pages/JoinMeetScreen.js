import Button from "@material-tailwind/react/Button";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router";
import Spinner from "../components/UI/Spinner";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const JoinMeetScreen = () => {
  const userVideo = useRef();
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const [mediaLoading, setMediaLoading] = useState(true);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const roomId = params.get("roomId") ? params.get("roomId") : uuid();
  const cameFromCreateMeet = !params.get("roomId");

  const setupMediaStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaLoading(false);
        userVideo.current.srcObject = stream;
        setStream(stream);
      })
      .catch((err) => {
        alert("Please allow camera access", err.message);
      });
  };
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }
    setupMediaStream();
    return async () => {
      if (stream) {
        stream.getVideoTracks()[0].enabled = false;
        stream.getAudioTracks()[0].enabled = false;
        await stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const joinMeet = async () => {
    stream.getVideoTracks()[0].enabled = false;
    stream.getAudioTracks()[0].enabled = false;
    await stream.getTracks().forEach((track) => track.stop());
    navigate(`/join/meet/${roomId}`);
  };
  const callEnd = async () => {
    stream.getVideoTracks()[0].enabled = false;
    stream.getAudioTracks()[0].enabled = false;
    await stream.getTracks().forEach((track) => track.stop());
    return navigate("/home");
  };
  return (
    <div className="flex flex-col items-center mt-8">
      {cameFromCreateMeet && (
        <div className="border border-green-400 bg-green-100 p-4 mb-4 flex flex-col items-center">
          <div>
            <span>Share meet id for others to join: </span>
            <span className="font-semibold">
              <span className="mr-2">{roomId}</span>

              <span
                onClick={() => navigator.clipboard.writeText(roomId)}
                className="cursor-pointer"
              >
                <ContentCopyIcon />{" "}
              </span>
            </span>
          </div>
          <p>OR</p>
          <div>
            <span>Copy link: </span>
            <span className="font-semibold">
              {/* <span className="mr-2">{`/join/meet?roomId=${roomId}`}</span> */}

              <span
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://stormy-hamlet-67915.herokuapp.com/join/meet?roomId=${roomId}`
                  )
                }
                className="cursor-pointer"
              >
                <ContentCopyIcon />{" "}
              </span>
            </span>
          </div>
        </div>
      )}
      {mediaLoading ? (
        <Spinner />
      ) : (
        <video
          width="384px"
          height="384px"
          className="video-ref rounded-lg border border-black"
          src=""
          ref={userVideo}
          autoPlay
          muted
        ></video>
      )}

      <div className="bg-gray-200 my-8 w-1/3 h-20 flex justify-evenly items-center rounded mx-auto shadow-lg sm:w-full">
        <Button color="green" ripple="light" onClick={joinMeet}>
          Join
        </Button>
        <Button color="red" ripple="light" onClick={callEnd}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default JoinMeetScreen;
