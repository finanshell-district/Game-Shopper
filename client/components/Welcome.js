import React from 'react'

const Welcome = props => {
  const {email} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

export default Welcome
