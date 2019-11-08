import React from 'react'

export default class ThankYou extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Thank you for your oder!</h1>
        <div>Your order number is ###</div>
        <img src="/tableGames.jpg" />
      </div>
    )
  }
}
