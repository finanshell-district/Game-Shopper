import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGamesThunk, getGameThunk} from '../store/game'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck,
  Button,
  CardHeader
} from 'reactstrap'
import {Cart} from './index'

class Games extends React.Component {
  constructor() {
    super()
    this.state = {
      KEY: 'bkasjbdfkjasdkfjhaksdfjskd',
      gamesLS: []
    }

    this.addToLocalStorage = this.addToLocalStorage.bind(this)
  }
  componentDidMount() {
    this.props.getGamesThunk()
    let _games = localStorage.getItem(this.state.KEY)
    if (_games) {
      _games = JSON.parse(_games)
      this.setState({
        gamesLS: _games
      })
    }
  }

  addToLocalStorage(game) {
    let _games = this.state.gamesLS
    // const found
    const order = {
      id: game.id,
      qty: 1
    }
    _games.push(order)
    localStorage.setItem(this.state.KEY, JSON.stringify(_games))
  }

  render() {
    const {games} = this.props
    const {gamesLS} = this.state
    console.log('ON STATE', gamesLS)
    return (
      <div className="container mx-auto">
        <CardDeck className="m-0 p-0 d-flex justify-content-center">
          {games.map(game => (
            <div key={game.id}>
              <Card
                className="text-center mt-3"
                inverse
                style={{
                  width: '18rem',
                  backgroundColor: '#333',
                  borderColor: '#333'
                }}
              >
                <CardHeader>{game.name}</CardHeader>
                <CardBody>
                  <Link to={`/games/${game.id}`}>
                    <CardImg
                      width="100%"
                      src={game.imageUrl}
                      alt="Card image cap"
                    />
                  </Link>
                  <CardText>${game.price}</CardText>
                  <Link to={`/games/${game.id}`}>
                    <Button className="m-2" color="info">
                      Learn more
                    </Button>
                  </Link>
                  <Button
                    className="m-1"
                    color="warning"
                    onClick={() => {
                      this.addToLocalStorage(game)
                    }}
                  >
                    Add To Cart
                  </Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </CardDeck>
        <Cart games={gamesLS} />
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
