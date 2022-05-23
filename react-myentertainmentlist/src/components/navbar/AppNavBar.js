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
        const isMobile = window.innerWidth <= 868;
        return (
            <div style={{position: this.props.position, zIndex: 1000, width: '100%'}}>
                <Navbar expand="lg" collapseOnSelect
                        style={{padding: "15px 10px"}}>
                    <Navbar.Brand as={Link} to='/' style={{
                        textShadow: 'rgb(255, 255, 255) -1px -1px 0px, rgb(255, 255, 255) 1px -1px 0px, rgb(255, 255, 255) -1px 1px 0px, rgb(255, 255, 255) 1px 1px 0px',
                        color: '#e6e6e6'
                    }}>myEList</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic_navbar_nav"/>
                    <Navbar.Collapse className="justify-content-start">
                        <Nav className="mr-auto" style={{maxHeight: '100px'}}>
                            <Nav.Link as={Link} to='/' style={{
                                color: '#e6e6e6'
                            }}>
                                Home
                            </Nav.Link>
                        </Nav>
                        {isLoggedIn ? <></> :
                        this.props.showRegister ? (
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>) :
                        this.props.showLogin ? (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>) :
                        <></>}
                        <div style={{width: "calc(200px + 32vw)"}}>
                            {this.props.showSearchBar ? (<SearchBar animate/>) : ""}
                        </div>
                        <div style={{marginLeft: "auto", marginRight: 0, marginTop: isMobile ? '20px' : ''}}>
                            {isLoggedIn ? (<ProfileDropdown name={username} />) : <></>}
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
});

export default connect(mapStateToProps)(AppNavBar);
