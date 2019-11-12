const router = require('express').Router()
const {Game, User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const {orderId} = req.params
    const order = await Order.findByPk(orderId, {include: [{model: Game}]})
    if (order.userId === userId) {
      res.json(order)
    } else {
      res.status(401).send("You don't have permission to access this order")
    }
  } catch (error) {
    next(error)
  }
})
