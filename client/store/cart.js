import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SUBMIT_ORDER = 'SUBMIT_ORDER'
/**
 * INITIAL STATE
 */
const initialState = {
  order: {
    email: '',
    items: []
  }
}
/**
 * ACTION CREATORS
 */

const submitOrder = order => ({
  type: SUBMIT_ORDER,
  order
})
/**
 * THUNK CREATORS
 */
export const submitOrderThunk = () => async dispatch => {
  try {
    const res = await axios.post('/api/orders')
    dispatch(getGames(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
