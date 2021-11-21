import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router";
import VideoControls from "../components/UI/VideoControls";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  border-radius: 8px;
  margin-bottom: 20px;
  width: 600px;
  height: 400px;
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

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Meet = (props) => {
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

  const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }

    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setStream(stream);
        console.log(roomID);
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
          console.log(newUser);
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
        let remainingPeers = [...peers];
        remainingPeers = peersRef.current.filter(
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
    console.log(micState);
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
      <div className="flex flex-row justify-evenly flex-wrap mt-16 w-full sm:flex-col">
        <div
          className="flex flex-col items-center "
          style={{
            width: "600px",
            height: "400px",
          }}
        >
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
          <p>{userInfo.name}</p>
        </div>
        {peers.map((peer, index) => {
          return (
            <div
              className="flex flex-col items-center "
              style={{
                height: "400px",
                width: "600px",
              }}
            >
              <Video key={index} peer={peer} />
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
