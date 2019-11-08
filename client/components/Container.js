import React from 'react'
import {connect} from 'react-redux'
import {getGamesThunk} from '../store/game'
import {Routes, Navbar} from './index'

class Container extends React.Component {
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
    console.log(
      'TCL: Container -> render -> this.addToLocalStorage',
      this.addToLocalStorage
    )
    return (
      <div>
        <Navbar />
        <Routes
          gamesLS={gamesLS}
          games={games}
          addToLocalStorage={this.addToLocalStorage}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)
