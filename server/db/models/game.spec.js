/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Game = db.model('Game')

describe('User model', () => {
  // clear the database before all tests
  before(() => {
    return db.sync({force: true})
  })

  // erase all tasks after each spec
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', async () => {
      let gamesLength = (await Game.findAll()).length
      let smallworld = Game.create({
        name: 'small world'
      })

      it('returns true if the game has been created', async () => {
        expect((await Game.findAll()).length - 1).to.equal(gamesLength)
      })

      // beforeEach(async () => {
      //     smallworld = await Game.create({
      //         name: "smallworld"
      //     })
      // })

      // it('returns true if the password is correct', () => {
      //     // console.log(cody.correctEmail("cody@puppybook.com"));

      // })

      // it('returns false if the password is incorrect', () => {
      //     expect(cody.correctPassword('bonez')).to.be.equal(false)
      // })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
