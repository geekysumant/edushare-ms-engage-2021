import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Icon from "./Icon";

const VideoControls = ({
  webcamState,
  toggleVideo,
  micState,
  toggleMic,
  callEnd,
}) => {
  return (
    <div className="bg-gray-200 my-8 w-1/3 h-20 flex justify-evenly items-center rounded mx-auto shadow-lg sm:w-4/5">
      <div className="rounded-full w-12 h-12 bg-white text-center text-xl flex items-center">
        {webcamState ? (
          <Icon
            component={
              <VideocamOffIcon
                className="mx-auto text-xl cursor-pointer"
                onClick={toggleVideo}
                style={{
                  fontSize: "2rem",
                }}
              />
            }
          />
        ) : (
          <Icon
            component={
              <VideocamIcon
                className="mx-auto text-xl cursor-pointer"
                onClick={toggleVideo}
                style={{
                  fontSize: "2rem",
                }}
              />
            }
          />
        )}
      </div>
      <div className="rounded-full w-12 h-12 bg-red-600 text-white text-center text-xl flex items-center">
        <div className="rounded-full w-12 h-12 bg-red-600 text-center text-xl flex items-center">
          <CallEndIcon
            className="mx-auto text-xl cursor-pointer"
            onClick={callEnd}
            style={{
              fontSize: "2rem",
            }}
          />
        </div>
      </div>
      <div className="rounded-full w-12 h-12 bg-white text-center text-xl flex items-center">
        {micState ? (
          <Icon
            component={
              <MicIcon
                className="mx-auto text-xl cursor-pointer"
                onClick={toggleMic}
                style={{
                  fontSize: "2rem",
                }}
              />
            }
          />
        ) : (
          <Icon
            component={
              <MicOffIcon
                className="mx-auto text-xl cursor-pointer"
                onClick={toggleMic}
                style={{
                  fontSize: "2rem",
                }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default VideoControls;
