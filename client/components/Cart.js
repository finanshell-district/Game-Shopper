import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './index'
import {submitOrderThunk, updateCartThunk} from '../store/cart'
import {Button} from 'reactstrap'
// import { state } from 'fs';

class Cart extends Component {
  constructor() {
    super()
    this.submitOrder = this.submitOrder.bind(this)
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
  render() {
    const {cart, games, orderStatus} = this.props
    return (
      <div>
        <header>
          <h1>Cart</h1>
        </header>
        {cart.map(game => <CartItem game={game} key={games.id} />)}
        <Button
          onClick={() => {
            this.submitOrder()
          }}
        >
          Submit Order
        </Button>
      </div>
    )
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
