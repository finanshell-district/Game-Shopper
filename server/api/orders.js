const router = require('express').Router()
// const session = require('express-session')
// const passport = require('passport')
const {Game, User, Order, OrderItem} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const userId = req.session.passport.user
//     console.log('TCL:  userId ', userId)
//     // const user = await User.findOne({where: {email}})
//     // const order = await Order.findAll({where: {UserId: user.id}})
//     // const games = await OrderItem.findAll({
//     //   GameId: {where: {OrderId: order.id}}
//     // })
//     // res.send(games)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const {email, items} = req.body
    const user = await User.findOne({where: {email}})

    const order = await Order.create({userId: user.id, status: 'COMPLETE'})

    items.forEach(item => {
      OrderItem.create({orderId: order.id, gameId: item.id, quantity: item.qty})
    })

    res.status(201).send('order complete')
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    console.log('TCL: serId', userId)
    const orders = await Order.findAll({where: {userId}})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
