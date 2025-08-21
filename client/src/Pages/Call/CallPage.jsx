import React, {useEffect, useState} from "react";
import "./CallPage.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserIdsByEmails} from "../../Action/UserIds.js";
import {io} from "socket.io-client";

const socket = io("https://youtube-clone-ihgl.onrender.com");

const CallPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const userIds = useSelector((state) => state.userIdReducer);

  const [receiverEmail, setReceiverEmail] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);
  const [callTimeOut, setCallTimeOut] = useState(null);

  // 🔁 [UPDATED] Register user on socket
  useEffect(() => {
    if (currentUser?.result?._id) {
      socket.emit("join", {userId: currentUser?.result?._id}); // backend expects "join"
    }
  }, [currentUser]);

  // Emit call
  const handleCallUser = () => {
    if (!receiverEmail) {
      alert("Enter receiver's email");
      return;
    }
    dispatch(getUserIdsByEmails(currentUser?.result?.email, receiverEmail));
  };

  // 🔁 [UPDATED] Call initiation logic with proper socket events
  useEffect(() => {
    if (!userIds.loading && userIds.callerId && userIds.receiverId) {
      const roomId = `room_${userIds.callerId}_${userIds.receiverId}`;

      socket.emit("call-user", {
        roomId,
        callerId: userIds.callerId,
        receiverId: userIds.receiverId,
      });

      socket.once("receiver-unavailable", ({reason}) => {
        alert(reason); // "Receiver is not logged in" or "on another call"
      });

      socket.once("call-accepted", ({roomId}) => {
        navigate(`/call/${roomId}`);
      });
    }
  }, [userIds, navigate]);

  // 🔁 [UPDATED] Handle incoming call and events
  useEffect(() => {
    socket.on("incoming-call", ({roomId, callerId}) => {
      setIncomingCall({roomId, callerId});

      const timeout = setTimeout(() => {
        socket.emit("reject-call", {callerId});
        setIncomingCall(null);
      }, 30000); // 30s timeout

      setCallTimeOut(timeout);
    });

    socket.on("receiver-unavailable", ({reason}) => {
      alert(reason);
    });

    socket.on("end-call", () => {
      if (callTimeOut) clearTimeout(callTimeOut);
      setIncomingCall(null);
      alert("Call has ended.");
    });

    return () => {
      socket.off("incoming-call");
      socket.off("receiver-unavailable");
      socket.off("end-call");
      socket.off("call-accepted");
    };
  }, [callTimeOut]);

  const acceptCall = () => {
    if (incomingCall) {
      socket.emit("accept-call", {
        callerId: incomingCall.callerId,
        receiverId: currentUser.result._id,
        roomId: incomingCall.roomId,
      });

      if (callTimeOut) clearTimeout(callTimeOut);

      navigate(`/call/${incomingCall.roomId}`);
      setIncomingCall(null);
    }
  };

  const rejectCall = () => {
    if (incomingCall) {
      socket.emit("reject-call", {
        callerId: incomingCall.callerId,
      });

      if (callTimeOut) clearTimeout(callTimeOut);

      setIncomingCall(null);
    }
  };

  return (
    <div className="Call_Page">
      <h2>Start a Call</h2>
      <input
        type="email"
        placeholder="Enter receiver email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
      />
      <button onClick={handleCallUser}>Call</button>

      {incomingCall && (
        <div className="Incoming_Call_Modal">
          <h3>Incoming Call</h3>
          <p>You have an incoming call</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default CallPage;
