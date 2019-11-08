import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGamesThunk} from '../store/game'
import {Button} from 'reactstrap'
import {Cart, Games} from './index'

class ParentGames extends React.Component {
  constructor() {
    super()
    this.state = {
      KEY: 'bkasjbdfkjasdkfjhaksdfjskd',
      gamesLS: []
    }
    this.addToLocalStorage = this.addToLocalStorage.bind(this)
  }
  componentDidMount() {
    this.props.getGamesThunk()
    let _games = localStorage.getItem(this.state.KEY)
    if (_games) {
      _games = JSON.parse(_games)
      this.setState({
        gamesLS: _games
      })
    }
  }

  addToLocalStorage(game) {
    let _games = this.state.gamesLS
    // const found
    const order = {
      id: game.id,
      qty: 1
    }
    _games.push(order)
    this.setState({
      gamesLS: _games
    })
    localStorage.setItem(this.state.KEY, JSON.stringify(_games))
  }

  render() {
    const {games} = this.props
    const {gamesLS} = this.state
    console.log('ON STATE', gamesLS)
    return (
      <div>
        <Games games={games} addToLocalStorage={this.addToLocalStorage} />
        <Cart games={gamesLS} />
        <Button>Submit Order</Button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    games: state.game.games,
    cart: state.game.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGamesThunk: () => dispatch(getGamesThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentGames)
