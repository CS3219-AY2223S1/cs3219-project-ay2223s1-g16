import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { CHAT_JOINED, CHAT_LEAVE, CHAT_MESSAGE, CHAT_NEW } from "./events.js";

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

io.on("connection", (socket) => {
  socket.on(CHAT_NEW, ({ roomId, username }) => {
    socket.join(roomId);
    io.to(roomId).emit(CHAT_JOINED, username);
  });

  socket.on(CHAT_MESSAGE, ({ roomId, username, text }) => {
    console.log("message", username, text, roomId);
    io.to(roomId).emit(CHAT_MESSAGE, { username, text });
  });

  socket.on("disconnect", () => {
    socket
      .to(Array.from(socket.rooms))
      .emit(CHAT_LEAVE, "User has left the room");
  });
});

httpServer.listen(8003);
