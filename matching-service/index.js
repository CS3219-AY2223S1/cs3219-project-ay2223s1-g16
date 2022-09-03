import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { findHandler } from './handlers.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(express.static('public'))
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(`Established Connection with ${socket.id}`);

    socket.on("match:find", findHandler)
});

httpServer.listen(8001);
