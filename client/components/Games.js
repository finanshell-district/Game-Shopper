import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGamesThunk} from '../store/game'

class Games extends React.Component {
  // componentDidMount() {
  //   this.props.getGamesThunk()
  // }

  render() {
    return (
      <div>
        <h1>All Games</h1>
        <div>
          <h1>map through games here</h1>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = games => {
  return {
    games
  }
}

const mapDispatch = dispatch => {
  return {
    getGamesThunk: dispatch(getGamesThunk())
  }
}

export default connect(mapState, mapDispatch)(Games)
