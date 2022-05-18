import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {SearchAddMediaToList} from "./searchaddmediatolist/SearchAddMediaToList";
import * as config from "../../config.json";
import defaultposter from "../../images/defaultposter.jpg";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.validate(this.props.data.name),
      date: this.validateAndInclude(this.validate(this.props.data.released).split("-")[0], '', ' (', ')'),
      image: this.validate(this.props.data.background_image)

    }
  }

  validateDefault = (val, defaultVal) => (val ? val : defaultVal);

  validate = (val) => this.validateDefault(val, '');

  validateAndAdd = (val, defaultVal, add) => (val ? val + add : '');

  validateAndInclude = (val, defaultVal, includeLeft, includeRight) => (val ? includeLeft + val + includeRight : defaultVal);

  render() {
    return (
      <>
      <Row style={{height:'170px'}}>
        <Col xs={10}>
          <span style={{fontSize:'0.8rem'}}>{this.state.name + this.state.date}</span>
          <img style={{width: "217px", height: "122px"}} src={this.state.image}></img>
        </Col>
        <Col xs={2}>
          <SearchAddMediaToList
              apiId={this.props.data.id}
              title={this.state.name}
              releaseYear={this.state.date.replace("(", "").replace(")","")}
              type='game'
              posterPath={this.state.image}
          />
        </Col>
      </Row>
      </>
    );
  }
}

export default Game;
