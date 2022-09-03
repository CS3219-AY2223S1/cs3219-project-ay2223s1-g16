import { Match } from './repository.js'
class Queue {
    queues = {
        'easy' : [],
        'medium' : [],
        'hard' : []
    }
    idmap = {}
    findMatch(userid, difficulty) {
        if (this.queues[difficulty].length !== 0) return this.queues[difficulty].shift() 
        this.queues[difficulty].push(userid)
    }
}
const q = new Queue

export function findHandler(payload) {
    const socket = this
    const requesting_userid = payload['userid']
    
    // Keep track of userids and their associated socketids
    q.idmap[requesting_userid] = socket.id

    console.log("Recieved Find request. Payload : ", payload)
    const waiting_userid = q.findMatch(requesting_userid,payload['difficulty'])
    console.log(q.queues)

    // Match Not Found
    if(waiting_userid == undefined) return

    // Match Found
    Match.create({
        userid1: requesting_userid,
        userid2: waiting_userid,
        difficulty:"easy"
    });
      
    // Emit to the pair
    socket.emit("match:found", waiting_userid)
    socket.to(q.idmap[waiting_userid]).emit("match:found", requesting_userid) 

}