import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GAMES = 'GET_GAMES'

/**
 * INITIAL STATE
 */
const initialState = {
  games: []
}

/**
 * ACTION CREATORS
 */
const getGames = games => ({
  type: GET_GAMES,
  games
})

/**
 * THUNK CREATORS
 */
export const getGamesThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/games')
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
    case GET_GAMES:
      return {...state, games: action.games}
    default:
      return state
  }
}
