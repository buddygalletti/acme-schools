const Sequelize = require('sequelize');
const db = require('../conn');

const Student = db.define('student', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.DECIMAL
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Student;
