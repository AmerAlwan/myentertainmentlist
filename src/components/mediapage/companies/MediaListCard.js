import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import '../mediaCard.css';

class ProductionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logos: this.getLogos(),
            hasLogo: this.props.hasLogo,
            title: this.props.title,
            id: this.props.id
        }
    }

    getLogos() {
        return this.props.list.map(item =>
            <ul key={item[this.props.idValue ? this.props.idValue : "id"]}>
                <Logo path={item.logo_path} hasLogo={this.props.hasLogo}name={item[this.props.nameValue ? this.props.nameValue : "name"]} country={item.origin_country} />
             </ul>
         )
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps) {
            this.setState({logos: this.getLogos(), title: this.props.title})
        }
    }

    render() {
        return (
            <>
                <div className="mediaCardBox" style={{maxWidth:"350px"}}>
                    <Row>
                        <Col xs={12}>
                            <h3 className="mediaCardTitle">{this.state.title}</h3>
                            <li key={this.state.id} style={{listStyle: "none"}}>
                                {this.state.logos}
                            </li>
                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}

export default ProductionCard;