import React, {Component} from 'react';
import SearchBar from '../components/search/SearchBar'
import {Row, Col, Form, Button, Spinner, Alert} from 'react-bootstrap';
import NavBar from "../components/navbar/AppNavBar";
import {search} from "../components/search/util.js";
import UserDataService from "../components/backend/user.service";
import Validator from "../components/backend/validator";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            form: {},
            errors: {},
            validated: false,
            isLoading: false,
            isSomethingWrong: false,
            isSomethingWrongError: "Something went wrong!",
            isAccountCreated: false
        };
    }

    findFormErrors = () => {
       return Validator.validate(false, this.state.form);
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = this.findFormErrors();

        if(Object.keys(newErrors).length > 0) {
            this.setState({errors: newErrors, validated: false});
        } else {

            this.setState({isLoading: true}, () => {
                Validator.validateAndCreateUser(this.state.form).then(result => {
                    console.log(result);
                   if (result && result.status == 200) {
                       this.setState({validated: true, isLoading: false, errors: {}, form: {}, isAccountCreated: true, isSomethingWrong: false});
                   } else if(result && result.status == 400) {
                       this.setState({isLoading: false, isSomethingWrong: true, isSomethingWrongError: result.data.message});
                   } else {
                       this.setState({isLoading: false, isSomethingWrong: true, isSomethingWrongMessage: "Something went wrong!"});
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
        return (
            <>
                <NavBar showSearchBar showLogin/>
                <Form validated={this.state.validated} onSubmit={this.handleSubmit} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    {this.state.isSomethingWrong ?
                        ( <Row style={{margin: "1rem 0"}}>
                            <Col>
                                <Alert variant="danger">{this.state.isSomethingWrongError}</Alert>
                            </Col>
                        </Row> ) :
                        this.state.isAccountCreated ?
                            ( <Row style={{margin: "1rem 0"}}>
                                <Col>
                                    <Alert variant="success">Account successfully created! We have sent you an email to verfiy your account.</Alert>
                                </Col>
                            </Row> ) :
                            ""
                    }
                    <Row style={{margin: "1rem 0"}}>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.firstName} type="text" placeholder="Enter First Name" onChange={e => this.setField("firstName", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.lastName} type="text" placeholder="Enter Last Name" onChange={e => this.setField("lastName", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{margin: "1rem 0"}}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.email} value={this.state.form.email} type="text" placeholder="Enter Email" onChange={e => this.setField("email", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{margin: "1rem 0"}}>
                        <Col>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control isInvalid={!!this.state.errors.username} type="text" placeholder="Enter Username" onChange={e => this.setField("username", e.target.value)}/>
                                <Form.Control.Feedback type="invalid">{this.state.errors.username}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
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

export default RegisterPage;
