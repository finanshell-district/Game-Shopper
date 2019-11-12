import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {logout} from '../store'

import {withRouter} from 'react-router'

import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  InputGroupAddon,
  Input,
  InputGroup
} from 'reactstrap'

const NavbarComponent = props => {
  const {isLoggedIn} = props
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const {history} = props
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/home">
          <img src="logo.png" height="100px" width="100px" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              onClick={() => {
                history.push('/games')
              }}
            >
              Games
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                history.push('/cart')
              }}
            >
              Cart ({props.cart.length})
            </NavLink>
          </NavItem>
          {isLoggedIn ? (
            <>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push('/profile')
                  }}
                >
                  My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push('/orders')
                  }}
                >
                  Order History
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={props.handleClick}>Log Out</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  Sign In
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push('/signup')
                  }}
                >
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <InputGroup style={{maxWidth: '300px'}}>
          <InputGroupAddon addonType="prepend">
            <Button
              onClick={() => {
                history.push(
                  `${
                    searchValue
                      ? `/search/${searchValue}`
                      : props.location.pathname
                  }`
                )
              }}
            >
              Search
            </Button>
          </InputGroupAddon>
          <Input
            placeholder="search"
            onChange={e => {
              e.preventDefault()
              setSearchValue(e.target.value)
            }}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                history.push(
                  `${
                    searchValue
                      ? `/search/${searchValue}`
                      : props.location.pathname
                  }`
                )
              }
            }}
          />
        </InputGroup>
      </Navbar>
    </div>
  )
}

// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(NavbarComponent))
