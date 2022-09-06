import { addPendingMatch, Match, removePendingMatch } from './repository.js'
import { MATCH_FAIL, MATCH_SUCCESS, MATCH_START } from './public/events.js'

const MATCH_TIMEOUT = 30

export async function newMatchHandler(payload) {
    const socket = this
    const requesting_userid = payload['userid']
    socket.userid = requesting_userid

    const pendingMatch = await Match.findOne({ where: { ispending: true, difficulty: payload["difficulty"] } })

    if (pendingMatch == null) {
        const m = await addPendingMatch(requesting_userid, this.id, payload["difficulty"])
        setTimeout(async () => {
            if ((await m.reload()).ispending) {
                socket.emit(MATCH_FAIL)
                removePendingMatch(requesting_userid)
            }
        }, MATCH_TIMEOUT * 1000)
        socket.emit(MATCH_START, { timeout: MATCH_TIMEOUT })
    } else {
        pendingMatch.completePendingMatch(requesting_userid, this.id)
        // Emit to the pair
        socket.to(pendingMatch.userid1_sockid).emit(MATCH_SUCCESS, pendingMatch.roomid)
        socket.emit(MATCH_SUCCESS, pendingMatch.roomid)
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

