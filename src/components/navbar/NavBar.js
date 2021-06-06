import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav} from 'react-bootstrap';
import SearchBar from '../search/SearchBar'

class NavBar extends Component {

  render() {
    return (
    <>
        <Navbar expand="lg" bg='dark' variant='dark' collapseOnSelect style={{marginBottom: "20px", padding: "15px 10px"}}>
        <Navbar.Brand as={Link} to='/'>myEList</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic_navbar_nav" />
          <Navbar.Collapse id="basic_navbar_nav">
            <Nav className="mr-auto" style={{ maxHeight: '100px' }}>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/search'>Search</Nav.Link>
              <SearchBar/>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
    </>
  )
  }

}

export default NavBar;
