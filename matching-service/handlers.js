import { Match } from './repository.js'
import {MATCH_FOUND} from './public/events.js'

export async function newMatchHandler(payload) {
    const socket = this
    const requesting_userid = payload['userid']
    
    const pendingMatch = await Match.findOne({ where: { ispending: true, difficulty: payload["difficulty"] }})

    if(pendingMatch == null) {
        Match.create({
            userid1: requesting_userid,
            userid1_sockid: this.id,
            difficulty:payload["difficulty"],
            ispending: true
        });
    } else {
        // Emit to the pair
        pendingMatch.set({
            userid2: requesting_userid,
            userid2_sockid: this.id,
            ispending: false
        })
        await pendingMatch.save()

        socket.to(pendingMatch.userid1_sockid).emit(MATCH_FOUND, pendingMatch.userid2)
        socket.emit(MATCH_FOUND, pendingMatch.userid1) 
    }


}