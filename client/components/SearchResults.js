import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck,
  Button,
  CardHeader
} from 'reactstrap'
import {Link} from 'react-router-dom'

class SearchResults extends React.Component {
  constructor() {
    super()
    this.state = {
      searchBy: []
    }
  }

  componentDidMount() {
    this.setState({
      searchBy: this.props.match.params.searchBy.split(' ')
    })
  }

  render() {
    let {games, addToCart} = this.props
    games = games ? games : []
    const results = games
      .map(game => {
        const relevance = getRelevance(game.name, this.state.searchBy)
        return {...game, relevance}
      })
      .filter(game => game.relevance > 0)
    return (
      <div className="container mx-auto">
        <CardDeck className="m-0 p-0 d-flex justify-content-center">
          {results.map(game => (
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
                  <CardText>${game.price / 100}</CardText>
                  <Link to={`/games/${game.id}`}>
                    <Button className="m-2" color="info">
                      Learn more
                    </Button>
                  </Link>
                  <Button
                    className="m-1"
                    color="warning"
                    onClick={() => {
                      addToCart(game)
                    }}
                  >
                    Add To Cart
                  </Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </CardDeck>
      </div>
    )
  }
}

function getRelevance(word, searchBy) {
  let relevance = 0
  for (let i = 0; i < searchBy.length; i++) {
    if (word.toLowerCase().includes(searchBy[i].toLowerCase())) {
      relevance++
    }
  }
  return relevance
}

export default SearchResults
