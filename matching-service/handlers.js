import { addPendingMatch, Match, removeMatch } from "./repository.js";
import { MATCH_FAIL, MATCH_SUCCESS, MATCH_START } from "./events.js";
import { getQuestionFromQnSvc } from "./external.js";

// TODO: Shift into constants file
const MATCH_TIMEOUT = 30;

let _io = undefined;
export function setIo(io) {
  _io = io;
}


// If we scale horizontally, we need to rethink this ds
const timeout_store = {}

export async function newMatchHandler({ username, difficulty }) {
  const socket = this;
  socket.username = username;

  const pendingMatch = await Match.findOne({
    where: { ispending: true, difficulty: difficulty },
  });

  if (pendingMatch == null) {
    const m = await addPendingMatch(username, difficulty);
    socket.join(m.roomid);
    socket.emit(MATCH_START, { timeout: MATCH_TIMEOUT });

    // Server-side Timer logic
    timeout_store[username] = setTimeout(async () => {
      await m.reload().catch(() => undefined); // undefined if not found

      if (m != undefined && m.ispending) {
        socket.emit(MATCH_FAIL);
        console.log("timeout cause remove match",m)
        removeMatch(username);
      }
    }, MATCH_TIMEOUT * 1000);
  } else {
    clearTimeout(timeout_store[pendingMatch.username1])
    let question = null;
    try {
      question = await getQuestionFromQnSvc(
        difficulty,
        pendingMatch.username1,
        pendingMatch.username2
      );
    } catch (err) {
      console.log(err);
    }
    pendingMatch.completePendingMatch(username);
    socket.join(pendingMatch.roomid);
    _io.to(pendingMatch.roomid).emit(MATCH_SUCCESS, {
      roomId: pendingMatch.roomid,
      usernameOne: pendingMatch.username1,
      usernameTwo: pendingMatch.username2,
      question: question,
    });
  }
}

export async function leaveMatchHandler({ roomid }) {
   await Match.destroy({ where: { roomid: roomid } });
  // TODO: Should i make the sockets leave the room?
  this.emit(MATCH_FAIL);
  _io.to(Number(roomid)).emit(MATCH_FAIL);
}

export async function disconnectHandler() {
  const socket = this;
  if (socket.username == undefined) return;
  const roomids = await removeMatch(socket.username);
  // TODO: Iterating through all rooms including partial matches, possible optimization.
  roomids.forEach((rid) => {
    _io.to(rid).emit(MATCH_FAIL);
  });
}
