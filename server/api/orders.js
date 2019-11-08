const router = require('express').Router()
const {Game, User, Order, OrderItem} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {email, items} = req.body
    const user = await User.findOne({where: {email}})

    const order = await Order.create({UserId: user.id, status: 'COMPLETE'})

    items.forEach(item => {
      OrderItem.create({OrderId: order.id, GameId: item.id, quantity: item.qty})
    })

    res.status(201).send('order complete')
  } catch (err) {
    next(err)
  }
})
