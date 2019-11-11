const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue:
      'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/'
  }
})

module.exports = Game
