import { addPendingMatch, Match, removeMatch } from './repository.js'
import { MATCH_FAIL, MATCH_SUCCESS, MATCH_START } from './public/events.js'

// TODO: Shift into constants file
const MATCH_TIMEOUT = 30

let _io = undefined;
export function setIo(io) {
    _io = io
}

export async function newMatchHandler({userid, difficulty}) {
    const socket = this
    socket.userid = userid

    const pendingMatch = await Match.findOne({ where: { ispending: true, difficulty: difficulty } })

    if (pendingMatch == null) {
        const m = await addPendingMatch(userid, difficulty)
        socket.join(m.roomid)
        socket.emit(MATCH_START, { timeout: MATCH_TIMEOUT })

        // Server-side Timer logic
        setTimeout(async () => {
            await m.reload()
                .catch(()=> undefined) // undefined if not found
            
            if (m != undefined && m.ispending) {
                socket.emit(MATCH_FAIL)
                removeMatch(userid)
            }
        }, MATCH_TIMEOUT * 1000)
    } else {
        pendingMatch.completePendingMatch(userid)
        socket.join(pendingMatch.roomid)
        _io.to(pendingMatch.roomid).emit(MATCH_SUCCESS, { roomId: pendingMatch.roomid, userIdOne: pendingMatch.userid1, userIdTwo: pendingMatch.userid2})
    }
}

export async function leaveMatchHandler({ roomid }) {
    await Match.destroy({where:{roomid:roomid}})
    // TODO: Should i make the sockets leave the room?
    this.emit(MATCH_FAIL)
    _io.to(Number(roomid)).emit(MATCH_FAIL)
}

export async function disconnectHandler() {
    const socket = this
    if (socket.userid == undefined) return
    const roomids = await removeMatch(socket.userid)
    console.log(roomids)
    // TODO: Iterating through all rooms including partial matches, possible optimization.
    roomids.forEach(rid => {
        console.log(rid)
        _io.to(rid).emit(MATCH_FAIL)
    })
}

