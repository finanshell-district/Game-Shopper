import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderItemsThunk} from '../store/orderItem'

class Game extends React.Component {
  componentDidMount() {
    this.props.getOrderItemsThunk(this.props.match.params.orderId)
  }
  render() {
    const {order} = this.props
    // console.log("orderItems", orderItems)
    if (order.id) {
      console.log('rendering order items')
      return (
        <div>
          <h1>Order # {this.props.match.params.orderId}</h1>
          {order.games.map(game => (
            <div>
              {game.name + ' '}
              ${game.price / 100} {'Qty: ' + game.orderItem.quantity}
            </div>
          ))}
          Total: ${' '}
          {String(
            order.games.reduce((accum, game) => {
              return accum + game.price * game.orderItem.quantity
            }, 0)
          ) / 100}
        </div>
      )
    } else {
      return null
    }
  }
}
const mapStateToProps = state => {
  return {
    order: state.orderItem.orderItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getOrderItemsThunk: id => dispatch(getOrderItemsThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)
