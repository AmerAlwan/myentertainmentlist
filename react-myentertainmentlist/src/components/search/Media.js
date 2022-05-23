import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import * as config from '../../config.json';
import defaultposter from './../../images/defaultposter.jpg';
import {AddMediaToList} from "./addmediatolist/AddMediaToList";
import {SearchAddMediaToList} from "./searchaddmediatolist/SearchAddMediaToList";


class Media extends Component {

  constructor(props) {
    super(props);
    ////console.log(config.default.config.ids.genres);
    ////console.log(this.props.data.poster_path);
    //console.log(this.props.data);
    let cConfig = config.default.config;
    this.state = {
       title: this.validateDefault(this.props.data.title, this.validate(this.props.data.name)),
       date: this.validateAndInclude(this.validateDefault(this.validate(this.props.data.release_date).split('-')[0], this.validate(this.props.data.first_air_date).split('-')[0]), '', ' (', ')'),
       overview: this.validateAndAdd(this.validate(this.props.data.overview).substring(0, Math.max(this.validate(this.props.data.overview).indexOf(' ', 150), 150)), '', this.validate(this.props.data.overview).length >= 150 ? '...' : ''),
       genres: this.props.data.genre_ids ? this.props.data.genre_ids.map(g => cConfig.ids.tmdb.genres[g]).join(', ') : '',
       posterPath: this.props.data.poster_path ? `${cConfig.links.tmdb.image.link + cConfig.links.tmdb.image.size.w92 + this.props.data.poster_path}` : defaultposter,
       mediaType: this.validateAndInclude(this.validateDefault(this.validateReturn(this.validate(this.props.data.media_type) === "movie", "M", ""), this.validateReturn(this.validate(this.props.data.media_type) === "tv", "TV", "")), '', ' [', ']'),
       playTime: this.props.data.media_type === 'movie' ? this.props.data.release_date : (this.props.data.episode_run_time && this.props.data.episode_run_time.length === 0 ? 0 : this.props.data.episode_run_time && this.props.data.episode_run_time.reduce((acc, curr) => acc + curr))
    };




  //  this.data.overview = this.data.overview.substring(0, this.data.overview.indexOf(' ', 100)) + '...';
  }

  validateReturn = (val, returnVal, defaultVal) => (val ? returnVal : defaultVal);

  validateDefault = (val, defaultVal) => (val ? val : defaultVal);

  validate = (val) => this.validateDefault(val, '');

  validateAndAdd = (val, defaultVal, add) => (val ? val + add : '');

  validateAndInclude = (val, defaultVal, includeLeft, includeRight) => (val ? includeLeft + val + includeRight : defaultVal);

//width='70px' height='100.8px'


  render() {
    return (
      <>
      <Row style={{height:'170px'}}>
        <Col xs={4}>
          <img src={this.state.posterPath}/>
        </Col>
        <Col xs={6} style={{display: 'inline-block', lineHeight: '1rem'}}>
          <Row>
            <Col>
              <span style={{fontSize: '0.8rem'}}> {this.state.title + this.state.date + this.state.mediaType}</span>
              <p style={{fontSize: '0.6rem', color: 'grey'}}>{this.state.genres}</p>
          </Col>
          </Row>
          <Row>
            <Col style={{overflow: 'hidden', height: '80px'}}>
              <p style={{fontSize: '0.6rem'}}> {this.state.overview} </p>
            </Col>
          </Row>
        </Col>
        <Col xs={1}>
          <SearchAddMediaToList
              apiId={this.props.data.id}
              title={this.state.title}
              releaseYear={this.state.date.replace("(", "").replace(")","")}
              playTime={this.state.playTime}
              type={this.props.data.media_type}
              posterPath={this.props.data.poster_path ? `${config.default.config.links.tmdb.image.link + config.default.config.links.tmdb.image.size.poster.medium + this.props.data.poster_path}` : defaultposter}
          />
        </Col>
      </Row>





      </>
   );
  }

}

export default Media;
