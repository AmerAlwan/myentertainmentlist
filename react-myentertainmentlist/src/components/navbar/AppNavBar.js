import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import SearchBar from '../search/SearchBar'
import { connect } from "react-redux";
import { logout } from "../../redux/slices/UserSlice";
import {ProfileDropdown} from "./ProfileDropdown";

class AppNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const username = this.props.username;
        return (
            <>
                <Navbar expand="lg" variant='dark' collapseOnSelect
                        style={{marginBottom: "20px", padding: "15px 10px", backgroundColor: "rgb(41, 51, 60) !important"}}>
                    <Navbar.Brand as={Link} to='/'>myEList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic_navbar_nav"/>
                    <Navbar.Collapse className="justify-content-start">
                        <Nav className="mr-auto" style={{maxHeight: '100px'}}>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        </Nav>
                        {isLoggedIn ? <></> :
                        this.props.showRegister ? (
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>) :
                        this.props.showLogin ? (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>) :
                        <></>}
                        <div style={{width: "calc(200px + 32vw)", margin: "0 0.5rem"}}>
                            {this.props.showSearchBar ? (<SearchBar animate/>) : ""}
                        </div>
                        <div style={{marginLeft: "auto", marginRight: 0}}>
                            {isLoggedIn ? (<ProfileDropdown name={username} />) : <></>}
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
});

export default connect(mapStateToProps)(AppNavBar);
