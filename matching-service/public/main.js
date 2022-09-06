import { MATCH_START, MATCH_FAIL, MATCH_SUCCESS, MATCH_REQUEST_NEW, MATCH_LEAVE } from "./events.js";
import { startTimer, switch_page } from "./utils.js";
const socket = io();

// ------------------
// onClick Handlers
// ------------------
document.getElementById("submit").addEventListener('click', () => {
    socket.emit(MATCH_REQUEST_NEW, { "userid": document.getElementById('userid').value, "difficulty": document.querySelector('input[name="difficulty"]:checked').value })
});
document.getElementById("leave").addEventListener('click', () => {
    socket.emit(MATCH_LEAVE, { "roomid": document.getElementById('roomid').innerHTML })
});

// ------------------
// socket.io listeners
// ------------------
socket.on("connect", () => { console.log(socket.id); });
socket.on(MATCH_START, ({ timeout }) => {
    switch_page('loading')
    startTimer(timeout)
})
socket.on(MATCH_SUCCESS, (roomid) => switch_page('found', roomid))
socket.on(MATCH_FAIL, () => switch_page("select"))

