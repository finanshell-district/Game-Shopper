/* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const agent = require('supertest')(app);
// const Order = db.model('order')
// // const OrderItem = db.model('order-item')

// describe('Order routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/orders/', () => {
//     const orderStatus = 'COMPLETE'

//     beforeEach(() => {
//       return Order.create({
//         status: orderStatus
//       })
//     })

//     it('GET /api/orders', async () => {
//       const res = await request(app)
//         .get('/api/orders')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].status).to.be.equal(orderStatus)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
