import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';


class Media extends Component {

  constructor(props) {
    super(props);
    this.state = {
       title: this.validateDefault(this.props.data.title, this.validate(this.props.data.name)),
       date: this.validateAndInclude(this.validateDefault(this.validate(this.props.data.release_date).split('-')[0], this.validate(this.props.data.first_air_date).split('-')[0]), '', ' (', ')'),
       overview: this.validateAndAdd(this.validate(this.props.data.overview).substring(0, Math.max(this.validate(this.props.data.overview).indexOf(' ', 70), 70)), '', '...')
       
    };




  //  this.data.overview = this.data.overview.substring(0, this.data.overview.indexOf(' ', 100)) + '...';
  }

  validateDefault = (val, defaultVal) => (val ? val : defaultVal);

  validate = (val) => this.validateDefault(val, '');

  validateAndAdd = (val, defaultVal, add) => (val ? val + add : '');

  validateAndInclude = (val, defaultVal, includeLeft, includeRight) => (val ? includeLeft + val + includeRight : defaultVal);



  render() {
    return (
      <>
      <Row>
        <Col xs={4}>
          <img width='70px' height='100.8px' src={`https://image.tmdb.org/t/p/w92/${this.props.data.poster_path}`}/>
        </Col>
        <Col xs={8}>
          <Row>
            <Col>
              <span style={{display: 'inline-block', lineHeight: '1rem', fontSize: '0.8rem'}}> {this.state.title + this.state.date}</span>
            </Col>
          </Row>
          <Row>
            <Col style={{overflow: 'hidden', height: '46px'}}>
              <p style={{fontSize: '0.6rem'}}> {this.state.overview} </p>
            </Col>
          </Row>
        </Col>
      </Row>





      </>
   );
  }

}

export default Media;
