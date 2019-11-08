import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GAMES = 'GET_GAMES'
const GET_GAME = 'GET_GAME'
const ADD_CART = 'ADD_CART'
/**
 * INITIAL STATE
 */
const initialState = {
  games: [],
  game: {}
}
/**
 * ACTION CREATORS
 */
const getGames = games => ({
  type: GET_GAMES,
  games
})
const getGame = game => ({
  type: GET_GAME,
  game
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
export const getGameThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${id}`)
    console.log('DATA', res.data)
    dispatch(getGame(res.data))
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
    case GET_GAME:
      return {...state, game: action.game}
    default:
      return state
  }
}
