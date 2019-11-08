const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      attributes: ['id', 'name', 'description', 'price', 'imageUrl']
    })
    res.json(game)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      attributes: ['id', 'name', 'description', 'price', 'imageUrl']
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})
