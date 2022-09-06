import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { newMatchHandler, disconnectHandler, leaveMatchHandler, setIo } from './handlers.js';
import { MATCH_LEAVE, MATCH_REQUEST_NEW } from './public/events.js';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// App Handlers
app.use(express.static('public'))
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });
setIo(io)
io.on("connection", (socket) => {
    socket.on(MATCH_REQUEST_NEW, newMatchHandler)
    socket.on(MATCH_LEAVE, leaveMatchHandler)
    socket.on("disconnect", disconnectHandler)
});

httpServer.listen(8001);
