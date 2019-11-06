import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Welcome} from './index'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const welcome = email ? <Welcome email={email} /> : null
  return (
    <div>
      <h3> GENERAL HOME </h3>
      {welcome}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
