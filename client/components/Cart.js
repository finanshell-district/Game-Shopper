import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './index'
import {Button} from 'reactstrap'

class Cart extends Component {
  render() {
    const {gamesLS, games} = this.props
    console.log('GAME ', gamesLS)
    console.log('GAME ', games)
    return (
      <div>
        <header>
          <h1>Cart</h1>
        </header>
        {gamesLS.map(game => <CartItem game={game} key={games.id} />)}
        <Button>Submit Order</Button>
      </div>
    )
  }
}

export default Cart
