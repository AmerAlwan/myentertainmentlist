import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import SearchBar from '../search/SearchBar'

class NavBar extends Component {

  render() {
    return (


    <>


        <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
          <Container fluid>
          <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand as={Link} to='/'>myEList</Navbar.Brand>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/search'>Search</Nav.Link>
            </Nav>
            <SearchBar/>
          </Navbar.Collapse>
          </Container>
        </Navbar>


      <ul className="navbar-buttons">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
    </>
  )
  }

}

export default NavBar;
