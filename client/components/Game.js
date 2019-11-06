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
        <h1>{game.name}</h1>
        <img src={game.imageUrl} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    student: state.reducerStudents.student
  }
}

const mapDispatch = dispatch => {
  return {
    getGameThunk: id => dispatch(getGameThunk(id))
  }
}

export default connect(mapState, mapDispatch)(Game)
