const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'INCOMPLETE',
      'CANCELLED',
      'PROCESSING',
      'COMPLETE',
      'SHIPPED'
    ),
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  }
})

module.exports = Order
