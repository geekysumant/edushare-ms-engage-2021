import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router";
import VideoControls from "../components/UI/VideoControls";
import { useSelector } from "react-redux";

const StyledVideo = styled.video`
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Meet = () => {
  const [peers, setPeers] = useState([]);
  const [webcamState, setWebcamState] = useState(true);
  const [micState, setMicState] = useState(true);
  const [stream, setStream] = useState(null);
  const [usersInCall, setUsersInCall] = useState([]);

  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userDetails
  );

  const navigate = useNavigate();

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const params = useParams();

  const roomID = params.roomID;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }

    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setStream(stream);

        socketRef.current.emit("join room", {
          roomID: roomID,
          userName: userInfo.name,
        });
        socketRef.current.on("all users", (users) => {
          const peers = [];
          const usersInCall = [];
          users.forEach(({ userID, userName }) => {
            usersInCall.push(userName);
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setUsersInCall(usersInCall);
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          const newUser = payload.userName;
          setUsersInCall((users) => [...users, newUser]);
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });

    return () => {
      socketRef.current.emit("pre_disconnect");
      socketRef.current.disconnect();
      if (stream) {
        stream.getVideoTracks()[0].enabled = false;
        stream.getAudioTracks()[0].enabled = false;
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("disconnect successful", (userId) => {
        const remainingPeers = peersRef.current.filter(
          (peer) => peer.peerID !== userId
        );

        peersRef.current = [...remainingPeers];
        setPeers(remainingPeers);
      });
    }
  }, [socketRef]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        userName: userInfo.name,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "!H6fD9KUZGMW@XZ",
            username: "sumantk778@gmail.com",
          },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const toggleVideo = () => {
    if (!webcamState === false) {
      stream.getVideoTracks()[0].enabled = false;
      userVideo.current.srcObject = stream;
    } else {
      stream.getVideoTracks()[0].enabled = true;
      userVideo.current.srcObject = stream;
    }

    setWebcamState(!webcamState);
  };
  const toggleMic = () => {
    if (!micState === false) {
      stream.getAudioTracks()[0].enabled = false;
      userVideo.current.srcObject = stream;
    } else {
      stream.getAudioTracks()[0].enabled = true;
      userVideo.current.srcObject = stream;
    }

    setMicState(!micState);
  };
  const callEnd = async () => {
    stream.getVideoTracks()[0].enabled = false;
    stream.getAudioTracks()[0].enabled = false;
    await stream.getTracks().forEach((track) => track.stop());
    socketRef.current.emit("pre_disconnect");
    socketRef.current.disconnect();
    return navigate("/home");
  };
  return (
    <>
      <div className="flex flex-row justify-evenly items-center flex-wrap mt-16 w-full sm:flex-col">
        <div className="flex flex-col items-center w-96 sm:w-56 ">
          <div className="sm:w-full ">
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
          </div>
          <p>You</p>
        </div>
        {peers.map((peer, index) => {
          return (
            <div
              className="flex flex-col items-center w-96 sm:w-56 "
              key={index}
            >
              <div className="sm:w-full ">
                <Video key={index} peer={peer} />
              </div>
              <p>{usersInCall[index]}</p>
            </div>
          );
        })}
      </div>
      <VideoControls
        webcamState={webcamState}
        toggleVideo={toggleVideo}
        micState={micState}
        toggleMic={toggleMic}
        callEnd={callEnd}
      />
    </>
  );
};

export default Meet;
