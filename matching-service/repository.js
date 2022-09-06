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
    userid2: DataTypes.UUID,
    difficulty: DataTypes.STRING,
    ispending: DataTypes.BOOLEAN
});

Match.prototype.completePendingMatch = function(userid) {
    this.set({
        userid2: userid,
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
export function addPendingMatch(userid, difficulty) {
    return Match.create({
        userid1: userid,
        difficulty:difficulty,
        ispending: true
    });
}
