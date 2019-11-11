import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
/**
 * INITIAL STATE
 */
const initialState = {
  orders: [],
  order: {}
}
/**
 * ACTION CREATORS
 */
const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})
const getOrder = order => ({
  type: GET_ORDER,
  order
})
/**
 * THUNK CREATORS
 */
export const getOrdersThunk = () => async dispatch => {
  try {
    console.log('trying to get orders')
    const res = await axios.get('/api/orders')
    console.log('get orders', res.data)
    dispatch(getOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const getOrderThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
