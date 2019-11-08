import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './index'

class Cart extends Component {
  render() {
    const {games} = this.props
    console.log('GAME ', games)
    return (
      <div>
        <header>
          <h1>Cart</h1>
        </header>
        {games.map(game => <CartItem game={game} key={games.id} />)}
      </div>
    )
  }
}

export default Cart
