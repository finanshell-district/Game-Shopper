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
      <div className="container">
        <h1>All Games</h1>
        {games.map(game => (
          <div key={game.id}>
            <Link to={`/games/${game.id}`}>
              <h3>{game.name}</h3>
            </Link>
            <img src={game.imageUrl} />
            <p>{`Price:$${game.price}`}</p>
            <p>Description: {game.description}</p>
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
