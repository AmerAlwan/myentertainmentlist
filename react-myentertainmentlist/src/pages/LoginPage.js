import React, {Component, useEffect, useState} from 'react';
import SearchBar from '../components/search/SearchBar'
import { Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { connect } from "react-redux";
import NavBar from "../components/navbar/AppNavBar";
import Validator from "../components/backend/validator";
import { loginSuccess } from "../redux/slices/UserSlice";
import {Redirect} from "react-router-dom";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.username);
        this.state = {
            form: {},
            errors: {},
            validated: false,
            isLoading: false,
            isSomethingWrong: false,
            isSomethingWrongError: "Something went wrong!"
         }
    }

    findFormErrors = () => {
        return Validator.validate(true, this.state.form);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = this.findFormErrors();

        if(Object.keys(newErrors).length > 0) {
            this.setState({errors: newErrors, validated: false});
        } else {
            this.setState({isLoading: true}, () => {
                Validator.validateLogin(this.state.form).then(result => {
                    console.log(result);
                    if (result && result.status === 200) {
                        this.props.toggleLoginSuccess(result.data);
                        this.setState({ isLoading: false, errors: {}, validated: true, isSomethingWrong: false });
                    } else if (result && result.status === 401) {
                        this.setState({ isLoading: false, errors: {}, validated: false, isSomethingWrong: true, isSomethingWrongError: "Incorrect username/email or password!" });
                    } else {
                        this.setState({ isLoading: false, isSomethingWrong: true, errors: {}, validated: false, isSomethingWrongError: "Something went wrong!" });
                    }
                });
            });
        }
    }

    setField = (field, value) => {
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [field]: value
            }
        }));
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const username = this.props.username;
        return (
            <>
                <NavBar showSearchBar showRegister/>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    {this.state.isSomethingWrong ?
                        (<Row style={{margin: "1rem 0"}}>
                            <Col>
                                <Alert variant="danger">{this.state.isSomethingWrongError}</Alert>
                            </Col>
                        </Row>) : isLoggedIn ?
                        (<Row style={{margin: "1rem 0"}}>
                            <Col>
                                <Alert variant="success">Successfully logged in as {username}</Alert>
                            </Col>
                        </Row>) : ""
                    }
                    <Row style={{margin: "1rem 0"}}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Username/Email</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.username} type="text" placeholder="Enter Username/Email" onChange={e => this.setField("username", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.username}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{margin: "1rem 0"}}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.password} type="password" placeholder="Enter Password" onChange={e => this.setField("password", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                { this.state.isLoading ? <Spinner variant="primary" animation="border" style={{position: "absolute", top: "50%", left: "50%"}}></Spinner> : <></> }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username,
    lists: state.user.lists
});

const mapDispatchToProps = dispatch => {
    return {
        toggleLoginSuccess: user => dispatch(loginSuccess(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
