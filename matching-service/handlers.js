import { addPendingMatch, Match, removeMatch } from './repository.js'
import { MATCH_FAIL, MATCH_SUCCESS, MATCH_START } from './public/events.js'

const MATCH_TIMEOUT = 30
let _io = undefined;
export function setIo(io) {
    _io = io
}

export async function newMatchHandler(payload) {
    const socket = this
    const requesting_userid = payload['userid']
    socket.userid = requesting_userid

    const pendingMatch = await Match.findOne({ where: { ispending: true, difficulty: payload["difficulty"] } })

    if (pendingMatch == null) {
        const m = await addPendingMatch(requesting_userid, payload["difficulty"])
        socket.join(m.roomid)
        setTimeout(async () => {
            await m.reload()
                .catch(()=> undefined) // undefined if not found
            
            if (m != undefined && m.ispending) {
                socket.emit(MATCH_FAIL)
                removeMatch(requesting_userid)
            }
        }, MATCH_TIMEOUT * 1000)
        socket.emit(MATCH_START, { timeout: MATCH_TIMEOUT })
    } else {
        pendingMatch.completePendingMatch(requesting_userid)
        socket.join(pendingMatch.roomid)
        _io.to(pendingMatch.roomid).emit(MATCH_SUCCESS, pendingMatch.roomid)
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
    // TODO: Iterating through all rooms including partial matches
    roomids.forEach(rid => {
        console.log(rid)
        _io.to(rid).emit(MATCH_FAIL)
    })
}

