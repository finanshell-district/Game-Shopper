import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrdersThunk} from '../store/order'

class MyOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orders: []}
  }

  componentDidMount() {
    this.props.getOrdersThunk()
  }
  render() {
    let {orders} = this.props
    orders = orders ? orders : []
    console.log(orders)
    return (
      <div className="container">
        {orders.map(order => {
          return <div key={order.id}>{order.id}</div>
        })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    email: state.user.email
    // orders: state.order.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getOrdersThunk: () => dispatch(getOrdersThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
