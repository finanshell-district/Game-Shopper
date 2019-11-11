import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Games,
  Game,
  Cart,
  SearchResults,
  ThankYou
} from './components'
import {me} from './store'
import MyOrders from './components/MyOrders'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, games, cart, addToCart, KEY} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route
          exact
          path="/games"
          render={() => <Games games={games} addToCart={addToCart} />}
        />
        <Route exact path="/games/:id" component={Game} />
        <Route
          exact
          path="/search/:searchBy"
          render={props => (
            <SearchResults
              {...props}
              key={props.match.params.searchBy}
              games={games}
              addToCart={addToCart}
            />
          )}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/thankYou" component={ThankYou} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/cart"
          render={() => <Cart cart={cart} games={games} KEY={KEY} />}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/orders" component={MyOrders} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
        <Route exact path="/home" component={UserHome} />
        {/* <Route path="/games" component={Games} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
