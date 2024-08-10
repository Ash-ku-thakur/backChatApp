import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import massageRouter from "./routes/massageRouter.js";
import databaseConnection from "./utils/database.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config({});

// let PORT = process.env.PORT || 8082;

// middelwares
let corsOption = {
  origin: true,
  credentials: true,
};

app.use("*", cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, process.env.STATIC)));
app.use(true, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/massage", massageRouter);

server.listen(process.env.PORT, (req, res) => {
  databaseConnection();

  console.log("server started on 8080 port");
});
