import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  CHAT_JOINED,
  CHAT_LEAVE,
  CHAT_MESSAGE,
  CHAT_NEW,
  CHAT_TYPING,
} from "./events.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// App Handlers
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const namespace = io.of("/api/communication/");
namespace.on("connection", (socket) => {
  socket.on(CHAT_NEW, ({ roomId, username }) => {
    console.log("CONNECTION: ", roomId, username);
    socket.join(roomId);
    namespace.to(roomId).emit(CHAT_JOINED, username);
  });

  socket.on(CHAT_MESSAGE, ({ roomId, username, text }) => {
    console.log("MESAGE: ", username, text);
    namespace.to(roomId).emit(CHAT_MESSAGE, { username, text });
  });

  socket.on(CHAT_TYPING, ({ roomId, typing }) => {
    console.log("typing");
    socket.to(roomId).emit(CHAT_TYPING, typing);
  });

  socket.on("disconnect", () => {
    socket
      .to(Array.from(socket.rooms))
      .emit(CHAT_LEAVE, "User has left the room");
  });
});

httpServer.listen(8003);
