import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./Routes/User.js";
import videoRoutes from "./Routes/Video.js";
import commentRoutes from "./Routes/Comments.js";
import path from "path";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
      cors: { origin: "*" }
});

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("YouTube Clone is working!"));
app.use("/user", userRoutes);
app.use("/uploads", express.static(path.join("Uploads")));
app.use("/video", videoRoutes);
app.use("/comment", commentRoutes);

const port = process.env.port || 5000;
const DB_URL = process.env.DB_URL;

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
mongoose.connect(DB_URL).then(() => console.log("MongoDB Connected")).catch(console.log);

// ---------------- Socket.IO Logic ---------------- //

const onlineUsers = new Map();   // userId => socket.id
const activeCalls = new Map();   // roomId => { caller, receiver, ... }

io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // When user joins (after login)
      socket.on("join", ({ userId }) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} connected as ${socket.id}`);
      });

      // When a call is initiated
      socket.on("call-user", ({ callerId, receiverId, roomId }) => {
            const receiverSocket = onlineUsers.get(receiverId);

            if (!receiverSocket) {
                  io.to(socket.id).emit("receiver-unavailable", {
                        reason: "Receiver is not logged in or not registered.",
                  });
                  return;
            }

            if (activeCalls.has(receiverId)) {
                  io.to(socket.id).emit("receiver-unavailable", {
                        reason: "Receiver is on another call.",
                  });
                  return;
            }

            activeCalls.set(callerId, true);
            activeCalls.set(receiverId, true);

            io.to(receiverSocket).emit("incoming-call", {
                  callerId,
                  roomId,
            });
      });

      // When receiver accepts the call
      socket.on("accept-call", ({ callerId, receiverId, roomId }) => {
            const callerSocket = onlineUsers.get(callerId);
            if (callerSocket) {
                  io.to(callerSocket).emit("call-accepted", { roomId });
            }
      });

      // When receiver rejects the call
      socket.on("reject-call", ({ callerId }) => {
            const callerSocket = onlineUsers.get(callerId);
            if (callerSocket) {
                  io.to(callerSocket).emit("receiver-unavailable", {
                        reason: "Receiver has cut your call.",
                  });
            }
      });

      // Join video call room
      socket.on("join-room", ({ roomId, userId }) => {
            socket.join(roomId);
            socket.to(roomId).emit("user-joined", { userId });
      });

      // WebRTC signaling
      socket.on("send-signal", ({ userToCall, signal, callerId }) => {
            const receiverSocket = onlineUsers.get(userToCall);
            if (receiverSocket) {
                  io.to(receiverSocket).emit("receiving-signal", { signal, userId: callerId });
            }
      });

      socket.on("stream", ({ signal, callerId }) => {
            const callerSocket = onlineUsers.get(callerId);
            if (callerSocket) {
                  io.to(callerSocket).emit("returning-signal", { signal });
            }
      });

      // End call logic
      socket.on("end-call", ({ callerId, receiverId, roomId }) => {
            const receiverSocket = onlineUsers.get(receiverId);
            if (receiverSocket) {
                  io.to(receiverSocket).emit("end-call");
            }

            activeCalls.delete(callerId);
            activeCalls.delete(receiverId);
            socket.leave(roomId);
      });

      // On disconnect
      socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                  if (socketId === socket.id) {
                        onlineUsers.delete(userId);
                        activeCalls.delete(userId);
                        break;
                  }
            }
            console.log("Client disconnected:", socket.id);
      });
});
