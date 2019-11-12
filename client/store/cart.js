import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const UPDATE_CART = 'UPDATE_CART'
/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  orderStatus: 'incomplete'
}
/**
 * ACTION CREATORS
 */

const submitOrder = status => ({
  type: SUBMIT_ORDER,
  status
})

const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

/**
 * THUNK CREATORS
 */
export const submitOrderThunk = order => async dispatch => {
  try {
    const res = await axios.post('/api/orders', order)
    dispatch(submitOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const updateCartThunk = cart => dispatch => {
  try {
    dispatch(updateCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const getUsersCartThunk = email => async dispatch => {
  try {
    const {data} = await axios.get('api/orders', {
      params: {
        email
      }
    })
    dispatch(updateCart(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {...state, cart: action.cart}
    case SUBMIT_ORDER:
      return {...state, orderStatus: action.status}
    default:
      return state
  }
}
