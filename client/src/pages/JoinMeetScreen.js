import Button from "@material-tailwind/react/Button";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router";
import Spinner from "../components/UI/Spinner";

const JoinMeetScreen = () => {
  const userVideo = useRef();
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  const [mediaLoading, setMediaLoading] = useState(true);

  const setupMediaStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaLoading(false);
        userVideo.current.srcObject = stream;
        setStream(stream);
      })
      .catch((err) => {
        console.log(err);
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
    const roomId = uuid();
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
    <div className="flex flex-col items-center mt-16">
      {mediaLoading ? (
        <Spinner />
      ) : (
        <video
          width="40%"
          height="30%"
          className="video-ref"
          src=""
          ref={userVideo}
          autoPlay
          muted
          className="rounded-lg border border-black"
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
