/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const Game = db.model('game')

describe('Game routes', () => {
  let storedGames
  const gameData = [
    {
      name: 'Star Wars: X-Wing Miniatures Game',
      quantity: 1,
      price: 1299,
      description:
        'quip ex ea commodo eu fugiat nulla sint a qui officia deserunt mollit anim id est laborum.',
      imageUrl:
        'https://cf.geekdo-images.com/itemrep/img/pc5aIxQ9UFK5-ShY2CrZUDk_qAA=/fit-in/246x300/pic1603292.jpg'
    },
    {
      name: 'Alhambra',
      quantity: 6,
      price: 1279,
      description:
        'Lorem ipsum dolor sit amet, consecteting elit, sed do eiusmod tempor a qui officia deserunt mollit anim id est laborum.',
      imageUrl:
        'https://cf.geekdo-images.com/itemrep/img/RhxrVlZj3mmqA1NgLv5ApD3uNAc=/fit-in/246x300/pic4893652.jpg'
    },
    {
      name: 'Star Wars: Imperial Assault',
      quantity: 6,
      price: 1279,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sdeserunt mollit anim id est laborum.',
      imageUrl:
        'https://cf.geekdo-images.com/itemrep/img/nEOFuVi_AQWvpoXc_-lnp0F1vNM=/fit-in/246x300/pic2247647.jpg'
    }
  ]

  beforeEach(async () => {
    const createdGames = await Game.bulkCreate(gameData, {returning: true})
    storedGames = createdGames.map(game => game)
  })

  describe('GET /api/games', () => {
    it('serves up all Games', async () => {
      const res = await request(app)
        .get('/api/games')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(storedGames[0].name)
    })
  })

  describe('GET single Game', () => {
    it('serves up a single Game by its id', async () => {
      const response = await agent.get('/api/games/2').expect(200)
      expect(response.body.name).to.equal('Alhambra')
    })
  })
})
