import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import * as config from '../../../config.json';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name + (this.props.country ? " (" + this.props.country + ")" : ""),
            hasImage: this.props.hasLogo,
            image: this.props.path ? this.props.path : ""
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col xs={this.state.hasImage ? 2 : 0}>
                        {this.state.hasImage ? <Image src={this.state.image} fluid roundedCircle style={{width: "3rem", height: "auto"}} /> : ""}
                    </Col>
                    <Col xs={this.state.hasImage ? 10 : 12}>
                        <span>{this.state.name}</span>
                    </Col>
                </Row>

            </>
        )
    }

}

export default Logo;