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
      <Row style={{height:'170px'}}>
        <span style={{fontSize:'0.8rem'}}>{this.state.name + this.state.date}</span>
        <img style={{width: "217px", height: "122px"}} src={this.state.image}></img>
      </Row>
      </>
    );
  }
}

export default Game;
