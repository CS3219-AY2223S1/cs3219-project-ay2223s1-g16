import { Sequelize, Model, DataTypes } from 'sequelize';
import { Op } from 'sequelize'


const sequelize = new Sequelize('sqlite::memory:');
export const Match = sequelize.define('Match', {
    roomid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid1: DataTypes.UUID,
    userid1_sockid: DataTypes.TEXT,
    userid2: DataTypes.UUID,
    userid2_sockid: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    ispending: DataTypes.BOOLEAN
});

Match.prototype.completePendingMatch = function(userid,sockid) {
    this.set({
        userid2: userid,
        userid2_sockid: sockid,
        ispending: false
    })
    return this.save()
}


await Match.sync({ force: true });

export function removePendingMatch(userid) {
    return Match.findAll({where: { 
        [Op.or] : [
            {userid1: userid},
            {userid2: userid},
        ]}}).then(arr => arr.forEach(e => e.destroy()))
}
export function addPendingMatch(userid, socketid, difficulty) {
    return Match.create({
        userid1: userid,
        userid1_sockid: socketid,
        difficulty:difficulty,
        ispending: true
    });
}
