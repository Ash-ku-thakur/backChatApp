import { Server } from "socket.io";
import express from "express";
import http from "http";

let app = express();

let server = http.createServer(app);

let io = new Server(server, {
  cors: {
    origin: [""],
    methods: ["GET", "POST"],
  },
});

export let getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId]
}

let userSocketMap = {}; // userId = socketId

io.on("connection", (socket) => {
  let userId = socket.handshake.query.userId;

  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log("user disconnect", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
