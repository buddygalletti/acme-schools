const Sequelize = require('sequelize');
const db = require('../conn');

const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Session;
