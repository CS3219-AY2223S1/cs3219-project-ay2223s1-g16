import { Match } from './repository.js'
import {MATCH_FOUND} from './public/events.js'
import { Op } from 'sequelize'

export async function newMatchHandler(payload) {
    const socket = this
    const requesting_userid = payload['userid']
    socket.userid = requesting_userid
    
    const pendingMatch = await Match.findOne({ where: { ispending: true, difficulty: payload["difficulty"] }})

    if(pendingMatch == null) {
        Match.create({
            userid1: requesting_userid,
            userid1_sockid: this.id,
            difficulty:payload["difficulty"],
            ispending: true
        });
    } else {
        pendingMatch.set({
            userid2: requesting_userid,
            userid2_sockid: this.id,
            ispending: false
        })
        await pendingMatch.save()
        
        // Emit to the pair
        socket.to(pendingMatch.userid1_sockid).emit(MATCH_FOUND, pendingMatch.roomid)
        socket.emit(MATCH_FOUND, pendingMatch.roomid) 
    }


}

export async function disconnectHandler() {
    const socket = this
    if (socket.userid == undefined) return
    await Match.findAll({where: { 
        [Op.or] : [
            {userid1: socket.userid},
            {userid2: socket.userid},
        ]}}).then(arr => arr.forEach(e => e.destroy()))
}