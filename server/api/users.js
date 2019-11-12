const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/profile', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.status(401).send('Unauthorized')
    } else {
      const userId = req.session.passport.user
      const userData = await User.findByPk(userId)
      res.json(userData)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/profile', async (req, res, next) => {
  try {
    if (!req.session.passport) {
      res.status(401).send('Unauthorized')
    } else {
      const userId = req.session.passport.user
      const updateProfileData = req.body
      await User.update(updateProfileData, {
        where: {
          id: userId
        }
      })
      const userData = await User.findByPk(userId)
      res.json(userData)
    }
  } catch (error) {
    next(error)
  }
})
