import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER_ITEMS = 'GET_ORDER_ITEMS'
/**
 * INITIAL STATE
 */
const initialState = {
  orderItems: {}
}
/**
 * ACTION CREATORS
 */
const getOrderItems = orderItems => ({
  type: GET_ORDER_ITEMS,
  orderItems
})
/**
 * THUNK CREATORS
 */
export const getOrderItemsThunk = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/orderItems/${orderId}`)
    dispatch(getOrderItems(res.data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_ITEMS:
      return {...state, orderItems: action.orderItems}
    default:
      return state
  }
}
