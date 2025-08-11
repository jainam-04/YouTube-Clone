import React, {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaDesktop,
  FaStop,
  FaRecordVinyl,
} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Peer from "simple-peer";
import "./CallRoom.css";
import {saveCallHistory} from "../../Action/Call.js";

const socket = io("http://localhost:5000");

const CallRoom = () => {
  const {roomId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [callConnected, setCallConnected] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [wasRecorded, setWasRecorded] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();
  const mediaRecorderRef = useRef();
  const recordedChunks = useRef([]);
  const localStreamRef = useRef();
  const startTime = useRef();
  const endTime = useRef();

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        userVideo.current.srcObject = stream;
        localStreamRef.current = stream;

        if (currentUser?.result?._id) {
          socket.emit("join", {userId: currentUser.result._id});
        }

        socket.emit("join-room", {
          roomId,
          userId: currentUser?.result?._id,
        });

        socket.on("user-joined", ({userId}) => {
          const peer = createPeer(userId, stream);
          connectionRef.current = peer;
        });

        socket.on("receiving-signal", ({signal, userId}) => {
          const peer = addPeer(signal, userId, stream);
          connectionRef.current = peer;
          setCallConnected(true);
          startTime.current = Date.now();
        });

        socket.on("returning-signal", ({signal}) => {
          connectionRef.current && connectionRef.current.signal(signal);
          setCallConnected(true);
        });

        socket.on("end-call", () => handleEndCall());

        socket.on("receiver-not-registered", () => {
          alert("Receiver is not registered.");
          navigate("/");
        });

        socket.on("receiver-unavailable", () => {
          alert("Receiver is not logged in or already on another call.");
          navigate("/");
        });

        socket.on("call-rejected", () => {
          alert("Receiver has cut your call.");
          navigate("/");
        });
      } catch (error) {
        console.error("Media Access Error:", error.message);
      }
    };

    init();

    return () => {
      try {
        socket.off("user-joined");
        socket.off("receiving-signal");
        socket.off("returning-signal");
        socket.off("end-call");
        socket.disconnect();
      } catch (e) {}
    };
  }, [currentUser, roomId, navigate]);

  const createPeer = (userToCall, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream,
    });

    peer.on("connect", () => {
      console.log("Peer connected (initiator)");
    });

    peer.on("close", () => {
      console.log("Peer closed (initiator)");
    });

    peer.on("error", (err) => {
      console.error("Peer error (initiator): ", err);
    });

    peer.on("signal", (signal) => {
      socket.emit("send-signal", {
        userToCall,
        signal,
        callerId: currentUser?.result?._id,
      });
    });

    peer.on("stream", (remoteStream) => {
      console.log("Received remote stream (initiator)");
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = remoteStream;
        partnerVideo.current.play().catch((e) => {});
      }
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream,
    });

    peer.on("connect", () => {
      console.log("Peer connected (receiver)");
    });

    peer.on("close", () => {
      console.log("Peer closed (receiver)");
    });

    peer.on("error", (err) => {
      console.error("Peer error (receiver): ", err);
    });

    peer.on("signal", (signal) => {
      socket.emit("stream", {signal, callerId});
    });

    peer.on("stream", (remoteStream) => {
      console.log("Received remote stream (receiver)");
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = remoteStream;
        partnerVideo.current.play().catch((e) => {});
      }
    });

    peer.signal(incomingSignal);
    return peer;
  };

  const toggleMic = () => {
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    });
  };

  const toggleVideo = () => {
    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setVideoOn(track.enabled);
    });
  };

  const toggleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      setScreenShared(true);

      const screenTrack = screenStream.getVideoTracks()[0];
      const pc = connectionRef.current && connectionRef.current._pc;
      const sender =
        pc && pc.getSenders().find((s) => s.track && s.track.kind === "video");
      if (!sender) {
        console.error("Video sender not found for screen share");
        return;
      }

      sender.replaceTrack(screenTrack);

      screenTrack.onended = () => {
        const originalVideoTrack = localStreamRef.current.getVideoTracks()[0];
        sender.replaceTrack(originalVideoTrack);
        setScreenShared(false);
      };
    } catch (error) {
      console.error("Share Screen Error:", error.message);
    }
  };

  const startRecording = () => {
    const stream = userVideo.current.srcObject;
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    recordedChunks.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, {type: "video/webm"});
      const url = URL.createObjectURL(blob);
      setRecordingUrl(url);
      setWasRecorded(true);
      setIsRecording(false);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleEndCall = () => {
    setCallConnected(false);
    localStreamRef.current?.getTracks().forEach((track) => track.stop());

    const parts = roomId.split("_");
    const callerId = parts[1];
    const receiverId = parts[2];

    endTime.current = Date.now();

    const callData = {
      sender: callerId,
      receiver: receiverId,
      room_id: roomId,
      start_time: startTime.current,
      end_time: endTime.current,
      screen_shared: screenShared,
      was_recorded: wasRecorded,
      recording_url: recordingUrl,
      was_connected: true,
    };

    dispatch(saveCallHistory(callData));

    socket.emit("end-call", {
      callerId,
      receiverId,
      roomId,
      screenShared,
      wasRecorded,
      recordingUrl,
    });

    navigate("/");
  };

  return (
    <div className="Call_Room">
      <h2>Call Room - {roomId}</h2>
      <div className="Video_Container">
        <video ref={userVideo} autoPlay muted playsInline className="Video" />
        <video ref={partnerVideo} autoPlay playsInline className="Video" />
      </div>
      <div className="Controls">
        <button onClick={toggleMic} title={micOn ? "Mute Mic" : "Unmute Mic"}>
          {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button
          onClick={toggleVideo}
          title={videoOn ? "Turn Off Camera" : "Turn On Camera"}
        >
          {videoOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button onClick={toggleScreenShare} title="Share Screen">
          <FaDesktop />
        </button>
        {!isRecording ? (
          <button onClick={startRecording} title="Start Recording">
            <FaRecordVinyl />
          </button>
        ) : (
          <button onClick={stopRecording} title="Stop Recording">
            <FaStop />
          </button>
        )}
        <button onClick={handleEndCall} title="End Call">
          <FaStop />
        </button>
      </div>

      {recordingUrl && (
        <div className="Download_Section">
          <a href={recordingUrl} download="recorded_call.webm">
            Download Recorded Call
          </a>
        </div>
      )}
    </div>
  );
};

export default CallRoom;
