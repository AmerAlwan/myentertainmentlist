import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import SearchBar from '../search/SearchBar'

class NavBar extends Component {
    // <Nav.Link as={Link} to='/search'>Search</Nav.Link>
  render() {
      if (this.props.showSearchBar) {
          return (
              <>
                  <Navbar expand="lg" bg='dark' variant='dark' collapseOnSelect
                          style={{marginBottom: "20px", padding: "15px 10px"}}>
                      <Navbar.Brand as={Link} to='/'>myEList</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic_navbar_nav"/>
                      <Navbar.Collapse id="basic_navbar_nav">
                          <Nav className="mr-auto" style={{maxHeight: '100px'}}>
                              <Nav.Link as={Link} to='/'>Home</Nav.Link>
                          </Nav>
                          <div style={{width: "calc(200px + 32vw)", margin: "0 1rem"}}>
                              <SearchBar/>
                          </div>
                      </Navbar.Collapse>
                  </Navbar>
              </>
          )
      } else {
          return (
              <>
                  <Navbar expand="lg" bg='dark' variant='dark' collapseOnSelect
                          style={{marginBottom: "20px", padding: "15px 10px"}}>
                      <Navbar.Brand as={Link} to='/'>myEList</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic_navbar_nav"/>
                      <Navbar.Collapse id="basic_navbar_nav">
                          <Nav className="mr-auto" style={{maxHeight: '100px'}}>
                              <Nav.Link as={Link} to='/'>Home</Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                  </Navbar>
              </>
          )
      }
  }

}

export default NavBar;
