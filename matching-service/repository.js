import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
// const sequelize = new Sequelize('sqlite::memory:');
export const Match = sequelize.define('Match', {
    userid1: DataTypes.UUID,
    userid2: DataTypes.UUID,
    difficulty: DataTypes.STRING
});
await Match.sync({ force: true });