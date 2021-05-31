import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const options = (
  <Fragment>
    <Nav.Link href="#/">About</Nav.Link>
    <Nav.Link href="#search">Search</Nav.Link>
    <Nav.Link href="#history">History</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Hacker News
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { options }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
