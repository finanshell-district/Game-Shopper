import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGamesThunk} from '../store/game'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck,
  Button,
  CardHeader
} from 'reactstrap'

const GameCard = game => {
  return (
    <div key={game.id}>
      <Card
        className="text-center mt-3"
        inverse
        style={{width: '18rem', backgroundColor: '#333', borderColor: '#333'}}
      >
        <CardHeader>{game.name}</CardHeader>
        <CardBody>
          <Link to={`/games/${game.id}`}>
            <CardImg width="100%" src={game.imageUrl} alt="Card image cap" />
          </Link>
          <CardText>${game.price / 100}</CardText>
          <Link to={`/games/${game.id}`}>
            <Button className="m-2" color="info">
              Learn more
            </Button>
          </Link>
          <Button className="m-1" color="warning">
            Add To Cart
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

class Games extends React.Component {
  componentDidMount() {
    this.props.getGamesThunk()
  }

  render() {
    const {games} = this.props
    return (
      <div className="container mx-auto">
        <CardDeck className="m-0 p-0 d-flex justify-content-center">
          {games.map(game => GameCard(game))}
        </CardDeck>
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
