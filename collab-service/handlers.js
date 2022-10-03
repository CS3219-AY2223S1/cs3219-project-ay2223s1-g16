import { CODE_JOINED, CODE_LEFT, CODE_UPDATE } from "./events.js";

export const connectionHandler = ({ roomId, username }) => {
  console.log(`New connection to room ${roomId} from ${username}`);
  socket.join(roomId);
  socket.to(roomId).emit(CODE_JOINED, username);
};

export const disconnectHandler = () => {};

export const codeUpdateHandler = ({ roomId, code }) => {
  socket.to(roomId).emit(CODE_UPDATE, code);
};

export const disconnectingHandler = () => {
  socket.to(socket.rooms).emit(CODE_LEFT, "User has left the room");
};
