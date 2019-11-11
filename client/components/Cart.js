import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem, ThankYou} from './index'
import {submitOrderThunk, updateCartThunk} from '../store/cart'
import {Button} from 'reactstrap'
import {Signup, Login} from './auth-form'
// import { state } from 'fs';

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      step: null
    }
    this.submitOrder = this.submitOrder.bind(this)
    this.validSubmit = this.validSubmit.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  submitOrder() {
    const {email, cart, submitOrderThunk, updateCartThunk, KEY} = this.props
    const clearedCart = []
    const order = {
      email,
      items: cart
    }
    submitOrderThunk(order)
    updateCartThunk(clearedCart)
    localStorage.setItem(KEY, JSON.stringify(clearedCart))
  }

  validSubmit() {
    const {email} = this.props
    if (email) {
      this.submitOrder()
      this.setState({
        step: 2
      })
    } else {
      this.setState({
        step: 1
      })
    }
  }

  displayGame() {
    const {cart, games} = this.props

    const gamesToDisplay = []
    for (let i = 0; i < games.length; i++) {
      const game = games[i]
      cart.forEach(item => {
        if (game.id === item.id) {
          gamesToDisplay.push(game)
        }
      })
    }

    return gamesToDisplay
  }

  removeFromCart(game) {
    const {KEY} = this.props
    let _games = this.props.cart

    _games = _games.filter(item => {
      return item.id !== game.id
    })

    this.props.updateCartThunk(_games)
    localStorage.setItem(KEY, JSON.stringify(_games))
  }

  render() {
    const {cart, games} = this.props
    const {step} = this.state
    const displayGame = this.displayGame()
    switch (step) {
      case 1:
        return (
          <div>
            <h4>Sign Up to complete order</h4>
            <Signup />
            <br />
            <h4>Login</h4>
            <Login />
          </div>
        )
      case 2:
        return <ThankYou />
      default:
        return (
          <div>
            <header>
              <h1>Cart</h1>
            </header>
            {displayGame.map(game => (
              <CartItem
                game={game}
                key={games.id}
                removeFromCart={this.removeFromCart}
              />
            ))}
            <Button
              onClick={() => {
                this.validSubmit()
              }}
            >
              Submit Order
            </Button>
          </div>
        )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    email: state.user.email,
    orderStatus: state.cart.orderStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrderThunk: order => dispatch(submitOrderThunk(order)),
    updateCartThunk: cart => dispatch(updateCartThunk(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
