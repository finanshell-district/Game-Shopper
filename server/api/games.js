const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id)
    res.json(game)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (err) {
    next(err)
  }
})
