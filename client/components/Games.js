import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGamesThunk} from '../store/game'

class Games extends React.Component {
  componentDidMount() {
    this.props.getGamesThunk()
  }

  render() {
    const {games} = this.props
    return (
      <div>
        <h1>All Games</h1>
        {games.map(game => (
          <div key={game.id}>
            <h3>{game.name}</h3>
            <img src={game.imageUrl} />
            <p>{`Price:$${game.price}`}</p>
            <p>Description: {game.description}</p>
            <button type="button">VIEW GAME</button>
          </div>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    games: state.game.games
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGamesThunk: () => dispatch(getGamesThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)
