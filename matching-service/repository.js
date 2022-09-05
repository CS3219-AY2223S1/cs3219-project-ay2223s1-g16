import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const Match = sequelize.define('Match', {
    userid1: DataTypes.UUID,
    userid1_sockid: DataTypes.TEXT,
    userid2: DataTypes.UUID,
    userid2_sockid: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    ispending: DataTypes.BOOLEAN
});
await Match.sync({ force: true });