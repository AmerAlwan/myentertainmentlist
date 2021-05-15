import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import * as config from './config.json';
import defaultposter from './../../images/defaultposter.jpg';


class Media extends Component {

  constructor(props) {
    super(props);
    //console.log(config.default.config.ids.genres);
    console.log(this.props.data.poster_path);
    this.state = {
       title: this.validateDefault(this.props.data.title, this.validate(this.props.data.name)),
       date: this.validateAndInclude(this.validateDefault(this.validate(this.props.data.release_date).split('-')[0], this.validate(this.props.data.first_air_date).split('-')[0]), '', ' (', ')'),
       overview: this.validateAndAdd(this.validate(this.props.data.overview).substring(0, Math.max(this.validate(this.props.data.overview).indexOf(' ', 150), 150)), '', this.validate(this.props.data.overview).length >= 150 ? '...' : ''),
       genres: this.props.data.genre_ids ? this.props.data.genre_ids.map(g => config.default.config.ids.genres[g]).join(', ') : '',
       posterPath: this.props.data.poster_path ? `https://image.tmdb.org/t/p/w92/${this.props.data.poster_path}` : defaultposter
    };




  //  this.data.overview = this.data.overview.substring(0, this.data.overview.indexOf(' ', 100)) + '...';
  }

  validateDefault = (val, defaultVal) => (val ? val : defaultVal);

  validate = (val) => this.validateDefault(val, '');

  validateAndAdd = (val, defaultVal, add) => (val ? val + add : '');

  validateAndInclude = (val, defaultVal, includeLeft, includeRight) => (val ? includeLeft + val + includeRight : defaultVal);

//width='70px' height='100.8px'


  render() {
    return (
      <>
      <Row>
        <Col xs={4}>
          <img src={this.state.posterPath}/>
        </Col>
        <Col xs={8} style={{display: 'inline-block', lineHeight: '1rem'}}>
          <Row>
            <Col>
              <span style={{fontSize: '0.8rem'}}> {this.state.title + this.state.date}</span>
              <p style={{fontSize: '0.6rem'}}>{this.state.genres}</p>
          </Col>
          </Row>
          <Row>
            <Col style={{overflow: 'hidden', height: '80px'}}>
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
