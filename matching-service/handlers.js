
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
    q.idmap[payload['userid']] = socket.id
    console.log("Recieved Find request. Payload : ", payload)
    const userid = q.findMatch(payload['userid'],payload['difficulty'])
    console.log(q.queues)
    if(userid == undefined) return
    socket.broadcast.emit("match:found")
    socket.broadcast.emit("match:found")

    console.log('Found Match', userid)

}