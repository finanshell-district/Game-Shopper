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

const Games = props => {
  let {games, addToCart} = props
  console.log('TCL: props', props)
  games = games ? games : []
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

export default Games
