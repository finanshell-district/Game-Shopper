import React from 'react'
import {connect} from 'react-redux'
import {getGamesThunk} from '../store/game'
import {updateCartThunk, getUsersCartThunk} from '../store/cart'
import {Routes, Navbar} from './index'

class Container extends React.Component {
  constructor() {
    super()
    this.state = {
      KEY: 'bkasjbdfkjasdkfjhaksdfjskd'
    }
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    const {getGamesThunk} = this.props
    getGamesThunk()
    let _games = localStorage.getItem(this.state.KEY)
    if (_games) {
      _games = JSON.parse(_games)
      this.props.updateCartThunk(_games)
    }
  }

  addToCart(game) {
    let _games = this.props.cart
    // const found
    const order = {
      id: game.id,
      qty: 1
    }
    _games.push(order)
    this.props.updateCartThunk(_games)
    localStorage.setItem(this.state.KEY, JSON.stringify(_games))
    // this.setState(this.state)
  }

  render() {
    const {games, cart, email} = this.props
    const {KEY} = this.state
    return (
      <div>
        <Navbar key={cart.length} cart={cart} />
        <Routes
          cart={cart}
          games={games}
          addToCart={this.addToCart}
          KEY={KEY}
          removefromCart={this.removeFromCart}
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
    cart: state.cart.cart,
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGamesThunk: () => dispatch(getGamesThunk()),
    updateCartThunk: cart => dispatch(updateCartThunk(cart)),
    getUsersCartThunk: email => dispatch(getUsersCartThunk(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
