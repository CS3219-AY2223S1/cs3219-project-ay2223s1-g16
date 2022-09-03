const socket = io();
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
let curr_page = "select"
const pages = {
    "select": document.getElementById('selection-page'),
    "loading": document.getElementById('loading-page'),
    "found": document.getElementById('match-found-page'),
}
function switch_page(name) {
    if (curr_page == name) return
    pages[curr_page].style.display = 'none'
    pages[name].style.display = 'block'
    curr_page = name
}

function submit() {
    // Get Difficulty
    const selected = document.querySelector('input[name="difficulty"]:checked')
    if (selected == undefined) throw "Difficulty not chosen"
    socket.emit("match:find", { "userid": document.getElementById('userid').value, "difficulty": selected.value })
    if(curr_page != 'found')switch_page('loading')
}

socket.on("match:found", () => switch_page('found'))
