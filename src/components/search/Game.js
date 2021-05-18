import React, {Component} from 'react';
import {Row} from 'react-bootstrap';

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
      <Row>
        <span style={{fontSize:'1rem'}}>{this.state.name + this.state.date}</span>
      </Row>
      <Row>
        <img style={{width: "200px", height: "120px"}} src={this.state.image}></img>
      </Row>
      </>
    );
  }
}

export default Game;
