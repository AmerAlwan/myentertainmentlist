import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';


class Media extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.data.overview = this.data.overview ? this.data.overview : '';

  //  this.data.overview = this.data.overview.substring(0, this.data.overview.indexOf(' ', 100)) + '...';
  }





  render() {
    return (
      <>
      <Row>
        <Col xs={3}>
          <img width='50px' height='72px' src={`https://image.tmdb.org/t/p/w92/${this.props.data.poster_path}`}/>
        </Col>
        <Col xs={9}>
          <Row>
            <Col>
              <h6> {this.props.data.title ? this.props.data.title : this.props.data.name}</h6>
            </Col>
          </Row>
          <Row>
            <Col style={{overflow: 'hidden', height: '36px'}}>
              <p style={{fontSize: '0.5rem'}}> {this.data.overview} </p>
            </Col>
          </Row>
        </Col>
      </Row>





      </>
   );
  }

}

export default Media;
