
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
    
    // Keep track of userids and their associated socketids
    q.idmap[payload['userid']] = socket.id

    console.log("Recieved Find request. Payload : ", payload)
    const userid = q.findMatch(payload['userid'],payload['difficulty'])
    console.log(q.queues)

    if(userid == undefined) return

    // Emit to the pair
    socket.emit("match:found", userid)                                // Waiting    Person
    socket.to(q.idmap[userid]).emit("match:found", payload['userid']) // Requesting Person

    console.log('Found Match', userid)

}