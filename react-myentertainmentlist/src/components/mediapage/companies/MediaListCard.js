import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Logo from './Logo';
import '../mediaCard.css';

class MediaListCard extends Component {
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
        console.table(this.props.list);
        console.log(this.props.idValue);
        return this.props.list.map((item, index) =>
            <ul key={this.props.idValue ? item[this.props.idValue ? this.props.idValue : "id"] : index}>
                <li
                    key={this.props.idValue ? item[this.props.idValue ? this.props.idValue : "id"] : index}
                    style={{listStyle: "none"}}>
                    <Logo path={item.logo_path} hasLogo={this.props.hasLogo}
                          name={item[this.props.nameValue ? this.props.nameValue : "name"]}
                          country={item.origin_country}/>
                </li>
            </ul>
        )
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({logos: this.getLogos(), title: this.props.title})
        }
    }

    render() {
        return (
            <>
                <div className="mediaCardBox" style={{maxWidth: "350px"}}>
                    <Row>
                        <Col xs={12}>
                            <h3 className="mediaCardTitle">{this.state.title}</h3>
                            {this.state.logos}
                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}

export default MediaListCard;