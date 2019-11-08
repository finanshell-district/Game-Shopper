import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGameThunk} from '../store/game'

class Game extends React.Component {
  componentDidMount() {
    this.props.getGameThunk(this.props.match.params.id)
  }
  render() {
    const {game} = this.props
    if (!game) {
      return (
        <div>
          <h1>Sorry But This Game Does Not Exist</h1>
        </div>
      )
    }
    return (
      <div className="container">
        <Link to={`/games/${game.id}`}>
          <h3>{game.name}</h3>
        </Link>
        <img src={game.imageUrl} />
        <p>{`Price:$${game.price / 100}`}</p>
        <p>Description: {game.description}</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    game: state.game.game
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getGameThunk: id => dispatch(getGameThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)
