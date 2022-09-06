import { MATCH_START, MATCH_FAIL, MATCH_SUCCESS, MATCH_REQUEST_NEW, MATCH_LEAVE } from "./events.js";
import { startTimer } from './timer.js'
const socket = io();
let curr_page = "select"
const pages = {
    "select": document.getElementById('selection-page'),
    "loading": document.getElementById('loading-page'),
    "found": document.getElementById('match-found-page'),
}

function switch_page(name, userid = undefined) {
    if (curr_page == name) return
    pages[curr_page].style.display = 'none'
    pages[name].style.display = 'block'
    curr_page = name
    if (curr_page == 'found') document.getElementById('roomid').innerHTML = userid
}

document.getElementById("submit").addEventListener('click', () => {
    // Get Difficulty
    const selected = document.querySelector('input[name="difficulty"]:checked')
    if (selected == undefined) throw "Difficulty not chosen"
    socket.emit(MATCH_REQUEST_NEW, { "userid": document.getElementById('userid').value, "difficulty": selected.value })
});

document.getElementById("leave").addEventListener('click', () => {
    // Get Difficulty
    socket.emit(MATCH_LEAVE, { "roomid": document.getElementById('roomid').innerHTML })
});

socket.on("connect", () => {
    console.log(socket.id);
});
socket.on(MATCH_SUCCESS, (roomid) => switch_page('found', roomid))
socket.on(MATCH_FAIL, () => switch_page("select"))
socket.on(MATCH_START, ({ timeout }) => {
    switch_page('loading')
    startTimer(timeout)
})
