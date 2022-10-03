import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  connectionHandler,
  disconnectHandler,
  codeUpdateHandler,
  disconnectingHandler,
} from "./handlers.js";
import {
  CODE_CONNECT_NEW,
  CODE_DISCONNECT,
  CODE_UPDATE,
  CODE_JOINED,
  CODE_LEFT,
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

io.on("connection", (socket) => {
  socket.on(CODE_CONNECT_NEW, ({ roomId, username }) => {
    console.log(`New connection to room ${roomId} from ${username}`);
    console.log(`Socket ID: ${socket.id}`);
    socket.join(roomId);
    socket.to(roomId).emit(CODE_JOINED, username);
  });
  socket.on(CODE_DISCONNECT, disconnectHandler);

  socket.on(CODE_UPDATE, ({ roomId, code }) => {
    // console.log(`Code Update, ${code}`);
    socket.to(roomId).emit(CODE_UPDATE, code);
  });

  socket.on("disconnecting", () => {
    console.log(`Disconnection from socket id: ${socket.id}`);
    console.log(`Leaving rooms: ${Array.from(socket.rooms)}`);
    socket
      .to(Array.from(socket.rooms))
      .emit(CODE_LEFT, "User has left the room");
  });
});

httpServer.listen(8002);
