import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { newMatchHandler } from './handlers.js';
import { NEW_MATCH_REQUEST } from './public/events.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(express.static('public'))
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    socket.on(NEW_MATCH_REQUEST, newMatchHandler)
});

httpServer.listen(8001);
