const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ti2_db', 'ti2_db_user', 'zatHatAVK3FjRejiV2cD4rUZ02qRXMPq', {
  host: 'localhdpg-cpdsmj7sc6pc7396ia2g-aost',
  dialect: 'postgres',
  port: '5432'
});

module.exports = sequelize;