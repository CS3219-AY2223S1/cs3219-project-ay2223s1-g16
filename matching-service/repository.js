import { Sequelize, Model, DataTypes } from 'sequelize';
import { Op } from 'sequelize'


const sequelize = new Sequelize('sqlite::memory:');
export const Match = sequelize.define('Match', {
    roomid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username1: DataTypes.UUID,
    username2: DataTypes.UUID,
    difficulty: DataTypes.STRING,
    ispending: DataTypes.BOOLEAN
});

Match.prototype.completePendingMatch = function(username) {
    this.set({
        username2: username,
        ispending: false
    })
    return this.save()
}


await Match.sync({ force: true });

export function removeMatch(username) {
    return Match.findAll({where: { 
        [Op.or] : [
            {username1: username},
            {username2: username},
        ]}}).then(arr => arr.map(e => {e.destroy(); return e.roomid}))
}
export function addPendingMatch(username, difficulty) {
    return Match.create({
        username1: username,
        difficulty:difficulty,
        ispending: true
    });
}
