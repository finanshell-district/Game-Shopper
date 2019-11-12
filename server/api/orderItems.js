const router = require('express').Router()
const {Game, User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const {orderId} = req.params
    console.log('xxxxxxxxxx', orderId)
    const order = await Order.findByPk(orderId, {include: [{model: Game}]})
    console.log(order.games)
    if (order.userId === userId) {
      res.json(order)
      // console.log("xxxxxxxxxx", order.games);
    } else {
      res.status(401).send("You don't have permission to access this order")
    }
  } catch (error) {
    next(error)
  }
})
