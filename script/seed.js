'use strict'

const db = require('../server/db')
const {User, Game, Order, OrderItem} = require('../server/db/models')

const users = [
  {
    firstName: 'TestFirstName1',
    lastName: 'TestLastName1',
    email: 'test1@test.com',
    password: 'test1',
    shippingAddress: '1 Test street, Test City, Test State, TEST',
    imageUrl:
      'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/'
  },
  {
    firstName: 'TestFirstName2',
    lastName: 'TestLastName2',
    email: 'test2@test.com',
    password: 'test2',
    shippingAddress: '2 Test street, Test City, Test State, TEST',
    imageUrl:
      'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/'
  }
]

const games = [
  {
    name: 'TestGame1',
    quantity: 1,
    price: 12.99,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://cf.geekdo-images.com/itemrep/img/pc5aIxQ9UFK5-ShY2CrZUDk_qAA=/fit-in/246x300/pic1603292.jpg'
  },
  {
    name: 'TestGame2',
    quantity: 6,
    price: 12.79,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl:
      'https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/'
  }
]

const orders = [
  {
    status: 'INCOMPLETE',
    orderDate: null
  },
  {
    status: 'COMPLETE',
    orderDate: null
  }
]

const orderitems = [
  {
    OrderId: 1,
    GameId: 1,
    quantity: 7
  },
  {
    // Captilized because these are columns that created from the model associations
    OrderId: 1,
    GameId: 2,
    quantity: 6
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    games.map(game => {
      return Game.create(game)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  await Promise.all(
    orderitems.map(orderitem => {
      return OrderItem.create(orderitem)
    })
  )

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
