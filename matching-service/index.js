import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  newMatchHandler,
  disconnectHandler,
  leaveMatchHandler,
  setIo,
} from "./handlers.js";
import { MATCH_LEAVE, MATCH_REQUEST_NEW } from "./events.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// Request Logger
app.use((req,res,next) => {
    console.log(req.baseUrl,req.url, req.hostname)
    next()
})

// App Handlers
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const namespace = io.of("/api/match/");
setIo(namespace);
namespace.on("connection", (socket) => {
  socket.on(MATCH_REQUEST_NEW, newMatchHandler);
  socket.on(MATCH_LEAVE, leaveMatchHandler);
  socket.on("disconnect", disconnectHandler);
});

httpServer.listen(8001);
