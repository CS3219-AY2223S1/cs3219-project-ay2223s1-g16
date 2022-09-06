import { addPendingMatch, Match, removePendingMatch } from './repository.js'
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
            if ((await m.reload()).ispending) {
                socket.emit(MATCH_FAIL)
                removePendingMatch(requesting_userid)
            }
        }, MATCH_TIMEOUT * 1000)
        socket.emit(MATCH_START, { timeout: MATCH_TIMEOUT })
    } else {
        pendingMatch.completePendingMatch(requesting_userid)
        socket.join(pendingMatch.roomid)
        _io.to(pendingMatch.roomid).emit(MATCH_SUCCESS, pendingMatch.roomid)
    }
}

export async function cancelMatchHandler({ userid }) {
    await removePendingMatch(userid)
}

export async function disconnectHandler() {
    const socket = this
    if (socket.userid == undefined) return
    await removePendingMatch(socket.userid)
}

